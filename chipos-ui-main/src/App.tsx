import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { KnowledgeBasePageMagic } from './pages/KnowledgeBasePageMagic';
import { WelcomePage } from './pages/WelcomePage';
import { SettingsPage } from './pages/SettingsPage';
import { MCPPage } from './pages/MCPPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { MainLayout } from './components/layout/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { ToastProvider as FeaturesToastProvider } from './features/ui/components/ToastProvider';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { TooltipProvider } from './features/ui/primitives/tooltip';
import { ProjectPage } from './pages/ProjectPage';
import { DisconnectScreenOverlay } from './components/DisconnectScreenOverlay';
import { ErrorBoundaryWithBugReport } from './components/bug-report/ErrorBoundaryWithBugReport';
import { MigrationBanner } from './components/ui/MigrationBanner';
import { serverHealthService } from './services/serverHealthService';
import { useMigrationStatus } from './hooks/useMigrationStatus';
import { MagicUIDemo } from './pages/MagicUIDemo';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
      gcTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppRoutes = () => {
  const { projectsEnabled } = useSettings();
  const migrationStatus = useMigrationStatus();
  const [migrationBannerDismissed, setMigrationBannerDismissed] = useState(false);

  return (
    <Routes>
      {/* Demo routes - full screen, no layout */}
      <Route path="/magic-demo" element={<MagicUIDemo />} />
      <Route path="/knowledge-magic" element={<KnowledgeBasePageMagic />} />

      {/* All other routes use MainLayout */}
      <Route path="/*" element={
        <MainLayout>
          {migrationStatus.migrationRequired && !migrationBannerDismissed && (
            <MigrationBanner
              message={migrationStatus.message || "Database migration required"}
              onDismiss={() => setMigrationBannerDismissed(true)}
            />
          )}
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/mcp" element={<MCPPage />} />
            {projectsEnabled ? (
              <>
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/:projectId" element={<ProjectPage />} />
              </>
            ) : (
              <Route path="/projects" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </MainLayout>
      } />
    </Routes>
  );
};

const AppContent = () => {
  const [disconnectScreenActive, setDisconnectScreenActive] = useState(false);
  const [disconnectScreenDismissed, setDisconnectScreenDismissed] = useState(false);
  const [disconnectScreenSettings, setDisconnectScreenSettings] = useState({
    enabled: true,
    delay: 10000
  });

  useEffect(() => {
    const settings = serverHealthService.getSettings();
    setDisconnectScreenSettings(settings);
    serverHealthService.stopMonitoring();
    serverHealthService.startMonitoring({
      onDisconnected: () => {
        if (!disconnectScreenDismissed) {
          setDisconnectScreenActive(true);
        }
      },
      onReconnected: () => {
        setDisconnectScreenActive(false);
        setDisconnectScreenDismissed(false);
        window.location.reload();
      }
    });
    return () => {
      serverHealthService.stopMonitoring();
    };
  }, [disconnectScreenDismissed]);

  const handleDismissDisconnectScreen = () => {
    setDisconnectScreenActive(false);
    setDisconnectScreenDismissed(true);
  };

  return (
    <>
      <Router>
        <ErrorBoundaryWithBugReport>
          <AppRoutes />
        </ErrorBoundaryWithBugReport>
      </Router>
      <DisconnectScreenOverlay
        isActive={disconnectScreenActive && disconnectScreenSettings.enabled}
        onDismiss={handleDismissDisconnectScreen}
      />
    </>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
        <ThemeProvider>
          <ToastProvider>
            <FeaturesToastProvider>
              <TooltipProvider>
                <SettingsProvider>
                  <AppContent />
                </SettingsProvider>
              </TooltipProvider>
            </FeaturesToastProvider>
          </ToastProvider>
        </ThemeProvider>
      
      {import.meta.env.VITE_SHOW_DEVTOOLS === 'true' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
