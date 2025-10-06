import { BentoCard, BentoGrid } from "@/features/ui/magic/bento-grid";
import { Particles } from "@/features/ui/magic/particles";
import { ShimmerButton } from "@/features/ui/magic/shimmer-button";
import {
  Sparkles,
  Database,
  Network,
  Brain,
  Search,
  Code2,
  Zap,
  Layers
} from "lucide-react";

export const MagicUIDemo = () => {
  const features = [
    {
      Icon: Database,
      name: "Knowledge Management",
      description: "Advanced RAG-powered knowledge base with semantic search and intelligent document processing.",
      href: "/",
      cta: "Explore Knowledge",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/10 via-transparent to-[#0066ff]/10" />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: Network,
      name: "MCP Integration",
      description: "Connect with AI assistants through Model Context Protocol for seamless workflow automation.",
      href: "/mcp",
      cta: "View MCP Tools",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/10 via-transparent to-[#00d9ff]/10" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Brain,
      name: "AI Agents",
      description: "PydanticAI-powered agents for complex workflows and intelligent document analysis.",
      href: "/settings",
      cta: "Configure Agents",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Search,
      name: "Semantic Search",
      description: "Find relevant content with pgvector-powered semantic search and hybrid ranking.",
      href: "/",
      cta: "Try Search",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Code2,
      name: "Code Examples",
      description: "Extract and search through code snippets with syntax-aware analysis.",
      href: "/",
      cta: "Browse Code",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#00d9ff"
        refresh={false}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Sparkles className="h-12 w-12 text-[#00d9ff]" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#0066ff] bg-clip-text text-transparent">
              Magic UI Demo
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
            Experience the power of animated components with ChipOS's Tron-inspired aesthetic.
            Featuring Bento Grid layouts, Particle effects, and Shimmer buttons.
          </p>
          <div className="flex items-center justify-center gap-4">
            <ShimmerButton
              shimmerColor="#00d9ff"
              background="rgba(0, 102, 255, 0.8)"
              className="text-white font-semibold"
              onClick={() => window.location.href = "/"}
            >
              <Zap className="mr-2 h-4 w-4" />
              Get Started
            </ShimmerButton>
            <ShimmerButton
              shimmerColor="#00d9ff"
              background="rgba(0, 0, 0, 0.6)"
              className="text-white font-semibold border-[#00d9ff]/30"
              onClick={() => window.location.href = "/settings"}
            >
              <Layers className="mr-2 h-4 w-4" />
              View Settings
            </ShimmerButton>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ChipOS Features
          </h2>
          <BentoGrid className="lg:grid-rows-3 auto-rows-[18rem]">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Bento Grid Card */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#00d9ff]/20">
            <div className="mb-4 flex items-center gap-3">
              <Layers className="h-8 w-8 text-[#00d9ff]" />
              <h3 className="text-xl font-bold text-white">Bento Grid</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Responsive grid layout for showcasing features with animated hover effects and custom backgrounds.
            </p>
            <div className="text-sm text-neutral-500">
              <code>@/features/ui/magic/bento-grid</code>
            </div>
          </div>

          {/* Particles Card */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#00d9ff]/20">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-[#00d9ff]" />
              <h3 className="text-xl font-bold text-white">Particles</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Canvas-based particle system with mouse interaction and customizable colors and physics.
            </p>
            <div className="text-sm text-neutral-500">
              <code>@/features/ui/magic/particles</code>
            </div>
          </div>

          {/* Shimmer Button Card */}
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-[#00d9ff]/20">
            <div className="mb-4 flex items-center gap-3">
              <Zap className="h-8 w-8 text-[#00d9ff]" />
              <h3 className="text-xl font-bold text-white">Shimmer Button</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Animated button with shimmer effect, customizable colors, and smooth transitions.
            </p>
            <div className="text-sm text-neutral-500">
              <code>@/features/ui/magic/shimmer-button</code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-neutral-500 border-t border-[#00d9ff]/20 pt-8">
          <p className="mb-2">Magic UI components integrated with ChipOS</p>
          <p className="text-sm">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
};