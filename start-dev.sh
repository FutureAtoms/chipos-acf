#!/usr/bin/env bash
set -euo pipefail

# ChipOS ACF Development Start Script (portable)
# Starts backend and frontend services for local development

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
echo "🚀 Starting ChipOS ACF Development Environment..."

# Derive repo paths relative to this script (works on any machine)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"           # chipos-acf
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"              # repo root
UI_DIR="$SCRIPT_DIR/chipos-ui-main"

# Helpers
check_port() {
  local p=${1:-}
  if command -v lsof >/dev/null 2>&1 && lsof -Pi :"$p" -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port $p is in use. Killing the process bound to it...${NC}"
    lsof -ti:"$p" | xargs kill -9 2>/dev/null || true
    sleep 1
  fi
}

wait_for_service() {
  local url=$1; local service=$2; local max_attempts=${3:-30}; local attempt=0
  while [ $attempt -lt $max_attempts ]; do
    if curl -s "$url" >/dev/null 2>&1; then
      echo -e "${GREEN}✅ $service is ready!${NC}"; return 0
    fi
    echo -n "."; sleep 1; attempt=$((attempt+1))
  done
  echo -e "${RED}❌ $service failed to start${NC}"; return 1
}

# Safer restart: only affect this compose project
echo -e "\n${YELLOW}🐳 Restarting backend services (docker compose)${NC}"
pushd "$SCRIPT_DIR" >/dev/null
docker compose down || true

check_port "${CHIPOS_SERVER_PORT:-8181}"
check_port "${CHIPOS_MCP_PORT:-8051}"

docker compose --profile backend up -d
popd >/dev/null

echo -e "\n⏳ Waiting for backend services..."
wait_for_service "http://localhost:${CHIPOS_SERVER_PORT:-8181}/health" "Backend API (${CHIPOS_SERVER_PORT:-8181})"
wait_for_service "http://localhost:${CHIPOS_MCP_PORT:-8051}" "MCP Server (${CHIPOS_MCP_PORT:-8051})"

# Start frontend dev server (optional)
VITE_PORT="${CHIPOS_UI_PORT:-3737}"
export VITE_API_URL="http://localhost:${CHIPOS_SERVER_PORT:-8181}"
export VITE_CHIPOS_SERVER_PORT="${CHIPOS_SERVER_PORT:-8181}"
echo -e "\n${YELLOW}⚡ Starting frontend dev server on :$VITE_PORT...${NC}"
pushd "$UI_DIR" >/dev/null
if [ -f package.json ]; then
  nohup npm run dev -- --port "$VITE_PORT" --host 127.0.0.1 >/dev/null 2>&1 &
  FRONTEND_PID=$!
else
  echo -e "${YELLOW}UI project not found at $UI_DIR; skipping UI dev server${NC}"
  FRONTEND_PID=""
fi
popd >/dev/null

echo -e "\n⏳ Waiting for frontend..."
wait_for_service "http://localhost:$VITE_PORT" "Frontend ($VITE_PORT)" 20 || true

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✨ ChipOS ACF is ready!${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "\n📍 Services running at:"
echo -e "   ${GREEN}Frontend:${NC} http://localhost:$VITE_PORT"
echo -e "   ${GREEN}Backend API:${NC} http://localhost:${CHIPOS_SERVER_PORT:-8181}"
echo -e "   ${GREEN}MCP Server:${NC} http://localhost:${CHIPOS_MCP_PORT:-8051}"
echo -e "\n💡 To stop these services:"
echo -e "   ${YELLOW}(cd $SCRIPT_DIR && docker compose down)${NC}"

trap 'echo -e "\n🛑 Stopping services..."; (cd "$SCRIPT_DIR" && docker compose down || true); [ -n "${FRONTEND_PID:-}" ] && kill "$FRONTEND_PID" 2>/dev/null || true; echo -e "${GREEN}✅ Stopped${NC}"; exit 0' INT TERM

# Keep script alive if frontend is running; otherwise exit
if [ -n "${FRONTEND_PID:-}" ]; then
  wait "$FRONTEND_PID"
fi
