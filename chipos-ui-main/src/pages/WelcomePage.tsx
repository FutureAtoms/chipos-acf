import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Zap, Settings, FolderKanban, CheckCircle2, Circle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Particles } from "../features/ui/magic/particles";
import { MagicCard } from "../features/ui/magic/magic-card";
import { AnimatedGradientText } from "../features/ui/magic/animated-gradient-text";
import { ShimmerButton } from "../features/ui/magic/shimmer-button";
import { useSettings } from "../contexts/SettingsContext";

interface DockFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
  delay: number;
}

const DockFeature = ({ icon, title, description, gradient, onClick, delay }: DockFeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <MagicCard
        gradientColor={gradient}
        showBorderBeam={true}
        beamDuration={12}
        beamDelay={delay}
        className="group h-full cursor-pointer p-6 transition-all duration-300 hover:scale-105"
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="rounded-2xl p-4 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${gradient}15, ${gradient}05)`,
              boxShadow: `0 0 40px ${gradient}30`,
            }}
          >
            <div style={{ color: gradient }} className="w-12 h-12">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#FFD700]">{title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
      </MagicCard>
    </motion.div>
  );
};

const SetupModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const setupSteps = [
    {
      title: "Install Docker Desktop",
      description: "Install Docker Desktop first so containers can run.",
    },
    {
      title: "Clone ACF Backend Repo",
      description: "Clone the ACF backend repo next if you don't already have it locally.",
    },
    {
      title: "Confirm Docker Configuration",
      description: "Open docker-compose.yml to confirm service configuration (env vars, ports).",
    },
    {
      title: "Run Supabase Onboarding",
      description: "Run Supabase Onboarding in the welcome view to save project ref, URL, and keys into secure storage.",
    },
    {
      title: "Set Repo Root Path",
      description: "Set/change the repo root path so the extension knows where your backend lives.",
    },
    {
      title: "Switch UI Source",
      description: "Switch the UI source: use Local Dev UI when running the local Vite dev server, otherwise Use Hosted UI.",
    },
    {
      title: "Start All Servers",
      description: "Once env vars and UI source are in place, Start All Servers to bring up the backend stack.",
    },
    {
      title: "Open ChipOS Dashboard",
      description: "After everything is running, Open ChipOS Dashboard to verify the app loads and can reach the backend.",
    },
  ];

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        style={{ margin: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
        >
          <div className="relative rounded-2xl border border-[#FFD700]/30 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col">
            <div
              className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15), transparent 70%)",
              }}
            />

            <div className="relative flex items-center justify-between p-6 sm:p-8 border-b border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700]">Setup Guide</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="relative overflow-y-auto flex-1 p-6 sm:p-8">
              <div className="space-y-3 sm:space-y-4">
                {setupSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFD700]/30 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF9900] flex items-center justify-center text-black font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative p-6 sm:p-8 border-t border-white/10">
              <ShimmerButton
                onClick={onClose}
                className="w-full px-6 py-3 text-base sm:text-lg font-semibold"
                shimmerColor="rgba(255, 215, 0, 0.3)"
                shimmerDuration="4s"
                background="linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 153, 0, 0.12))"
              >
                Got It!
              </ShimmerButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { projectsEnabled } = useSettings();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  const features = [
    {
      icon: <BookOpen className="w-full h-full" />,
      title: "Knowledge Base",
      description: "Store and search through documentation, code examples, and technical resources with AI-powered semantic search.",
      gradient: "#FFD700",
      path: "/knowledge",
      delay: 0.2,
    },
    ...(projectsEnabled
      ? [
          {
            icon: <FolderKanban className="w-full h-full" />,
            title: "Projects",
            description: "Manage your development projects with integrated task tracking, documentation, and AI assistance.",
            gradient: "#FF9900",
            path: "/projects",
            delay: 0.3,
          },
        ]
      : []),
    {
      icon: <Zap className="w-full h-full" />,
      title: "MCP Server",
      description: "Connect to AI assistants via Model Context Protocol. Expose your knowledge base to Claude, Cursor, and more.",
      gradient: "#E8B923",
      path: "/mcp",
      delay: projectsEnabled ? 0.4 : 0.3,
    },
    {
      icon: <Settings className="w-full h-full" />,
      title: "Settings",
      description: "Configure API keys, manage integrations, and customize ChipOS to fit your workflow.",
      gradient: "#D97706",
      path: "/settings",
      delay: projectsEnabled ? 0.5 : 0.4,
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={200}
        ease={80}
        color="#FFD700"
        refresh
      />

      <div className="relative z-10 w-full max-w-7xl px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-6"
        >
          {/* ChipOS Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <img
                src="/chipos-logo.png"
                alt="ChipOS"
                className="w-32 h-32 object-contain"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))",
                }}
              />
              {/* Glow effect */}
              <div
                className="absolute inset-0 blur-3xl opacity-50 -z-10"
                style={{
                  background: "radial-gradient(circle, #FFD700 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>

          {/* Welcome Text */}
          <h1
            className="text-7xl font-black text-white tracking-wider uppercase"
            style={{
              fontFamily: "'Orbitron', 'SF Mono', 'Menlo', monospace",
              textShadow: "0 0 40px rgba(255, 215, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.1em",
              fontWeight: 900
            }}
          >
            Welcome to ChipOS
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', system-ui, sans-serif",
            }}
          >
            An AI operating system designed for the complete chip design cycle.
            Integrating knowledge management, workflow automation, and intelligent assistance.
          </motion.p>

          {/* Quick Start Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4"
          >
            <ShimmerButton
              onClick={() => setIsSetupModalOpen(true)}
              className="px-8 py-4 text-lg font-semibold"
              shimmerColor="rgba(255, 215, 0, 0.3)"
              shimmerDuration="4s"
              background="linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 153, 0, 0.12))"
            >
              Get Started
            </ShimmerButton>
          </motion.div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature) => (
            <DockFeature
              key={feature.path}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              onClick={() => navigate(feature.path)}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 space-y-4"
        >
          <p className="text-sm text-gray-500">
            Use the dock at the bottom to navigate between features
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <span>Powered by</span>
            <a
              href="https://www.futureatoms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] font-semibold hover:text-[#FF9900] transition-colors"
            >
              FutureAtoms
            </a>
            <span>•</span>
            <span className="text-gray-500">Created by Abhilash Chadhar</span>
          </div>
        </motion.div>
      </div>

      <SetupModal isOpen={isSetupModalOpen} onClose={() => setIsSetupModalOpen(false)} />
    </div>
  );
};
