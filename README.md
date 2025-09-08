<p align="center">
  <img src="./chiposchipos-ui-main/public/chiposlogo-neon.png" alt="ChipOSChipOS Logo" width="200" height="200">
</p>

<p align="center">
  <h1 align="center">ChipOS</h1>
</p>

<p align="center">
  <em>Power up your AI coding assistants with your own custom knowledge base and task management as an MCP server</em>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#upgrading">Upgrading</a> •
  <a href="#whats-included">What's Included</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#troubleshooting">Troubleshooting</a>
</p>

---

## 🎯 What is ChipOSChipOS?

> ChipOSChipOS is a fork of Archon, customized with a modern tech-focused UI and branding. It maintains full compatibility with upstream ChipOS updates while providing a unique visual experience.

ChipOSChipOS is the **command center** for AI coding assistants. For you, it's a sleek interface to manage knowledge, context, and tasks for your projects. For the AI coding assistant(s), it's a **Model Context Protocol (MCP) server** to collaborate on and leverage the same knowledge, context, and tasks. Connect Claude Code, Kiro, Cursor, Windsurf, etc. to give your AI agents access to:

- **Your documentation** (crawled websites, uploaded PDFs/docs)
- **Smart search capabilities** with advanced RAG strategies
- **Task management** integrated with your knowledge base
- **Real-time updates** as you add new content and collaborate with your coding assistant on tasks
- **Much more** coming soon to build ChipOSChipOS into an integrated environment for all context engineering

> It doesn't matter what you're building or if it's a new/existing codebase - ChipOSChipOS's knowledge and task management capabilities will improve the output of **any** AI driven coding.

## 🔗 Important Links

- **[GitHub Discussions](https://github.com/coleam00/ChipOS/discussions)** - Join the conversation and share ideas about ChipOS
- **[Contributing Guide](CONTRIBUTING.md)** - How to get involved and contribute to ChipOS
- **[Introduction Video](https://youtu.be/8pRc_s2VQIo)** - Getting started guide and vision for ChipOS
- **[ChipOS Kanban Board](https://github.com/users/coleam00/projects/1)** - Where maintainers are managing issues/features
- **[Dynamous AI Mastery](https://dynamous.ai)** - The birthplace of ChipOS - come join a vibrant community of other early AI adopters all helping each other transform their careers and businesses!
- **[GitHub Discussions](https://github.com/coleam00/Archon/discussions)** - Join the conversation about the original Archon project
- **[Contributing Guide](CONTRIBUTING.md)** - How to get involved and contribute to ChipOS
- **[Sync Strategy](SYNC_STRATEGY.md)** - How ChipOS stays updated with upstream Archon

## Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js 18+](https://nodejs.org/) (for hybrid development mode)
- [Supabase](https://supabase.com/) account (free tier or local Supabase both work)
- [OpenAI API key](https://platform.openai.com/api-keys) (Gemini and Ollama are supported too!)

### 1. Clone and Setup

```bash
# Clone the ChipOS repository
git clone [your-chipos-repo-url] chipos
cd chipos

# Copy the example environment file
cp .env.example .env
```

### 2. Configure Environment

Edit your `.env` file with your API keys and settings:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# ChipOS Configuration
CHIPOS_SERVER_PORT=3000
CHIPOS_MCP_PORT=3001
CHIPOS_FRONTEND_PORT=5173
```

### 3. Start ChipOS

#### Using Docker (Recommended)

```bash
# Start all services
docker-compose up

# Or run in background
docker-compose up -d
```

#### Using Hybrid Mode (Development)

```bash
# Start backend services in Docker
docker-compose up chipos-server chipos-mcp

# In a new terminal, start the frontend
cd chipos-ui-main
npm install
npm run dev
```

### 4. Access ChipOS

Open your browser and navigate to:
- Frontend: http://localhost:5173
- API Server: http://localhost:3000
- MCP Server: http://localhost:3001

## 🚀 Upgrading

To sync with the latest Archon updates:

```bash
# Fetch latest from upstream
git fetch upstream

# Merge updates
git checkout chipos-custom
git merge upstream/main

# Resolve any conflicts (preserve ChipOS branding)
# Then rebuild
docker-compose build
docker-compose up
```

See [SYNC_STRATEGY.md](SYNC_STRATEGY.md) for detailed instructions.

## 📦 What's Included

### Core Features
- **Knowledge Management**: Store and search through documentation, code, and resources
- **Task Tracking**: Manage development tasks with AI assistance
- **MCP Server**: Connect multiple AI coding assistants
- **RAG System**: Advanced retrieval-augmented generation
- **Multi-Agent Support**: Coordinate multiple AI agents

### Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python + FastAPI
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI, Gemini, Ollama support
- **Infrastructure**: Docker + Docker Compose

## 🏗️ Architecture

```
chipos/
├── chipos-ui-main/      # React frontend
├── python/              # Python backend
│   ├── src/server/      # FastAPI server
│   └── src/mcp_server/  # MCP server
├── docs/                # Documentation
└── docker-compose.yml   # Container orchestration
```

## 🐛 Troubleshooting

### Common ChipOSIssues

1. **Port conflicts**: Make sure ports 3000, 3001, and 5173 are available
2. **Docker not running**: Ensure Docker Desktop is running
3. **Environment variables**: Double-check your `.env` file configuration
4. **Database connection**: Verify Supabase credentials are correct

### Getting Help

- Check the [documentation](docs/)
- Review [existing issues](https://github.com/coleam00/Archon/issues) on the original Archon project
- Start a [discussion](https://github.com/coleam00/Archon/discussions)

## 📄 License

ChipOSThis project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

ChipOS is built on top of [Archon](https://github.com/coleam00/Archon) by Cole Medin and the Archon community. We're grateful for their excellent work and ongoing development.

---

<p align="center">
  Made with 💙 by the ChipOS Team
  <br>
  <em>Powered by the circuit of innovation</em>
</p>