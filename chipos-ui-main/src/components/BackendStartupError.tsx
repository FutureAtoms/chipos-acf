import React from 'react';
import { AlertCircle, Terminal, RefreshCw } from 'lucide-react';

export const BackendStartupError: React.FC = () => {
  const handleRetry = () => {
    // Reload the page to retry
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-gray-900 to-chip-dark border border-red-800/30 rounded shadow-2xl p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div className="space-y-4 flex-1">
              <h2 className="text-2xl font-bold text-red-200">
                Backend Service Startup Failure
              </h2>
              
              <p className="text-gray-300">
                The ChipOS backend service failed to start. This is typically due to a configuration issue.
              </p>

              <div className="bg-chip-dark/50 rounded border border-chip-silver/20 p-4">
                <div className="flex items-center gap-2 mb-3 text-chip-gold">
                  <Terminal className="w-5 h-5" />
                  <span className="font-semibold">Check Docker Logs</span>
                </div>
                <p className="text-gray-300 font-mono text-sm mb-3">
                  Check the <span className="text-chip-gold font-bold">ChipOS API server</span> container logs in Docker Desktop for detailed error information.
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>1. Open Docker Desktop</p>
                  <p>2. Go to Containers tab</p>
                  <p>3. Look for the ChipOS server container (typically named <span className="text-chip-gold font-semibold">chipos-server</span> or similar)</p>
                  <p>4. View the logs for the specific error message</p>
                </div>
              </div>

              <div className="bg-chip-gold/10 border border-chip-gold/30 rounded p-3">
                <p className="text-chip-gold text-sm font-semibold">
                  Common issues:
                </p>
                <ul className="text-gray-300 text-sm mt-1 space-y-1 list-disc list-inside">
                  <li>Using an ANON key instead of SERVICE key in your .env file</li>
                  <li>Database not set up - run <code className="bg-chip-dark px-1 rounded text-chip-gold">migration/complete_setup.sql</code> in Supabase SQL Editor</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-chip-silver/20">
                <p className="text-gray-300 text-sm">
                  After fixing the issue in your .env file, recreate the Docker containers:
                </p>
                <code className="block mt-2 p-2 bg-chip-dark/70 rounded text-chip-gold font-mono text-sm border border-chip-silver/20">
                  docker compose down && docker compose up --build -d
                </code>
                <div className="text-gray-400 text-xs mt-2">
                  <p>Note:</p>
                  <p>• Use 'down' and 'up' (not 'restart') so new env vars are picked up.</p>
                  <p>• If you originally started with a specific profile (backend, frontend, or full),</p>
                  <p>&nbsp;&nbsp;run the same profile again:</p>
                  <br />
                  <code className="bg-chip-dark/50 px-1 rounded text-chip-gold">docker compose --profile full up --build -d</code>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-chip-gold/20 to-chip-gold/10 hover:from-chip-gold/30 hover:to-chip-gold/20 border border-chip-gold/40 rounded text-chip-gold transition-all shadow-[inset_0_1px_0_rgba(255,184,77,0.2)]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};