import { AlertCircle, WifiOff, BookOpen, Settings, Home, FolderKanban } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../features/ui/hooks/useToast";
import { cn } from "../../lib/utils";
import { credentialsService } from "../../services/credentialsService";
import { isLmConfigured } from "../../utils/onboarding";
import { Particles } from "../../features/ui/magic/particles";
import { Dock, DockIcon } from "../../features/ui/magic/dock";
import { AnimatedBadge } from "../../features/ui/magic/animated-badge";
import { useSettings } from "../../contexts/SettingsContext";
import { BackendStartupError } from "../BackendStartupError";
import { useBackendHealth } from "./hooks/useBackendHealth";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface BackendStatusProps {
  isHealthLoading: boolean;
  isBackendError: boolean;
  healthData: { ready: boolean } | undefined;
}

function BackendStatus({ isHealthLoading, isBackendError, healthData }: BackendStatusProps) {
  if (isHealthLoading) {
    return (
      <AnimatedBadge variant="warning" pulse className="pointer-events-none">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2" />
        Connecting
      </AnimatedBadge>
    );
  }

  if (isBackendError) {
    return (
      <AnimatedBadge variant="error" pulse className="pointer-events-none">
        <WifiOff className="w-3 h-3 mr-1" />
        Offline
      </AnimatedBadge>
    );
  }

  if (healthData?.ready === false) {
    return (
      <AnimatedBadge variant="warning" pulse className="pointer-events-none">
        <AlertCircle className="w-3 h-3 mr-1" />
        Starting
      </AnimatedBadge>
    );
  }

  return null;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { projectsEnabled } = useSettings();

  const {
    data: healthData,
    isError: isBackendError,
    error: backendError,
    isLoading: isHealthLoading,
    failureCount,
  } = useBackendHealth();

  const backendStartupFailed = isBackendError && failureCount >= 5;

  useEffect(() => {
    const checkOnboarding = async () => {
      if (backendStartupFailed) return;
      if (!healthData?.ready || location.pathname === "/onboarding") return;
      if (localStorage.getItem("onboardingDismissed") === "true") return;

      try {
        const [ragCreds, apiKeyCreds] = await Promise.all([
          credentialsService.getCredentialsByCategory("rag_strategy"),
          credentialsService.getCredentialsByCategory("api_keys"),
        ]);

        const configured = isLmConfigured(ragCreds, apiKeyCreds);
        if (!configured) {
          navigate("/onboarding", { replace: true });
        }
      } catch (error) {
        console.error("ONBOARDING_CHECK_FAILED:", error);
        showToast(`Configuration check failed. You can manually configure in Settings.`, "warning");
      }
    };

    checkOnboarding();
  }, [healthData?.ready, backendStartupFailed, location.pathname, navigate, showToast]);

  useEffect(() => {
    if (isBackendError && backendError) {
      const errorMessage = backendError instanceof Error ? backendError.message : "Backend connection failed";
      showToast(`Backend unavailable: ${errorMessage}. Some features may not work.`, "error");
    }
  }, [isBackendError, backendError, showToast]);

  const MCP_ICON = (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MCP Server"
    >
      <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" />
      <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" />
    </svg>
  );

  return (
    <div className={cn("relative min-h-screen bg-black overflow-hidden", className)}>
      {backendStartupFailed && <BackendStartupError />}

      {/* Particles Background - Golden Circuit Board inspired */}
      <Particles
        className="fixed inset-0 z-0"
        quantity={150}
        ease={60}
        color="#FFD700"
        refresh
      />

      {/* Main Content Area - full screen with bottom padding for dock */}
      <div className="relative z-10 min-h-screen pb-48">
        <div className="container mx-auto px-8">
          <div className="min-h-screen pt-8 pb-32">{children}</div>
        </div>
      </div>

      {/* macOS-style Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock direction="horizontal" magnification={70} distance={150}>
          {/* ChipOS Home/Welcome */}
          <DockIcon
            icon={
              <img
                src="/chipos-logo.png"
                alt="ChipOS"
                className="w-10 h-10 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' }}
              />
            }
            label="Home"
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
          />

          {/* Knowledge Base */}
          <DockIcon
            icon={<BookOpen className="h-5 w-5" />}
            label="Knowledge Base"
            active={location.pathname === "/knowledge" || location.pathname === "/knowledge-magic"}
            onClick={() => navigate("/knowledge")}
          />

          {/* Projects - Only show if enabled */}
          {projectsEnabled && (
            <DockIcon
              icon={<FolderKanban className="h-5 w-5" />}
              label="Projects"
              active={location.pathname.startsWith("/projects")}
              onClick={() => navigate("/projects")}
            />
          )}

          {/* MCP Server */}
          <DockIcon
            icon={MCP_ICON}
            label="MCP Server"
            active={location.pathname === "/mcp"}
            onClick={() => navigate("/mcp")}
          />

          {/* Settings */}
          <DockIcon
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={location.pathname === "/settings"}
            onClick={() => navigate("/settings")}
          />
        </Dock>
      </div>

      {/* Backend Status Badge - Top Right like macOS */}
      <div className="fixed top-6 right-6 z-40">
        <BackendStatus
          isHealthLoading={isHealthLoading}
          isBackendError={isBackendError}
          healthData={healthData}
        />
      </div>
    </div>
  );
}

/**
 * Minimal layout for special pages (no dock)
 */
export function MinimalLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-black flex items-center justify-center overflow-hidden", className)}>
      <Particles
        className="fixed inset-0 z-0"
        quantity={100}
        ease={80}
        color="#00d9ff"
        refresh
      />
      <div className="relative z-10 w-full max-w-4xl px-6">{children}</div>
    </div>
  );
}