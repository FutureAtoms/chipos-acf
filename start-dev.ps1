Param(
  [int]$ServerPort = 8181,
  [int]$McpPort = 8051,
  [int]$UiPort = 3737
)

$ErrorActionPreference = 'Stop'
Write-Host "🚀 Starting ChipOS ACF (Windows)" -ForegroundColor Yellow

function Test-Port($port) {
  try { (New-Object System.Net.Sockets.TcpClient).Connect('127.0.0.1', $port); return $true } catch { return $false }
}

# Stop compose (this project only)
Push-Location $PSScriptRoot
try {
  docker compose down | Out-Null
} catch {}

# Free ports
foreach ($p in @($ServerPort, $McpPort, $UiPort)) {
  try {
    $pids = (Get-NetTCPConnection -State Listen -LocalPort $p -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique
    foreach ($pid in $pids) { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue }
  } catch {}
}

# Start backend profile
docker compose --profile backend up -d

Write-Host "⏳ Waiting for backend..." -ForegroundColor Yellow
$deadline = (Get-Date).AddSeconds(60)
while ((Get-Date) -lt $deadline) {
  try {
    $code = (Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$ServerPort/health" -TimeoutSec 2).StatusCode
    if ($code -ge 200 -and $code -lt 500) { break }
  } catch {}
  Start-Sleep -Milliseconds 500
}
Write-Host "✅ Backend API ($ServerPort) is ready!" -ForegroundColor Green

# Start UI dev server if UI present
$uiDir = Join-Path $PSScriptRoot 'chipos-ui-main'
if (Test-Path (Join-Path $uiDir 'package.json')) {
  Write-Host "⚡ Starting Vite on port $UiPort" -ForegroundColor Yellow
  Push-Location $uiDir
  Start-Process -WindowStyle Hidden -FilePath "npm" -ArgumentList @('run','dev','--','--port',"$UiPort",'--host','127.0.0.1')
  Pop-Location
}

Write-Host "✨ ChipOS ACF ready: UI=http://127.0.0.1:$UiPort API=http://127.0.0.1:$ServerPort MCP=http://127.0.0.1:$McpPort" -ForegroundColor Green
Pop-Location

