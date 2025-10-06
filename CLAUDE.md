# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: ChipOS

ChipOS is a fork of Archon, customized with modern tech-focused UI and branding. It serves as a command center for AI coding assistants with knowledge management and task tracking capabilities connected via Model Context Protocol (MCP).

## Beta Development Guidelines

**Local-only deployment** - each user runs their own instance.

### Core Principles

- **No backwards compatibility** - remove deprecated code immediately
- **Detailed errors over graceful failures** - we want to identify and fix issues fast
- **Break things to improve them** - beta is for rapid iteration

### Error Handling

**Core Principle**: In beta, we need to intelligently decide when to fail fast to quickly address issues, and when to allow processes to complete in critical services despite failures.

#### When to Fail Fast (Let it Crash!)

These errors should stop execution and bubble up immediately (except for crawling flows):

- **Service startup failures** - If credentials, database, or any service can't initialize
- **Missing configuration** - Missing environment variables or invalid settings
- **Database connection failures** - Don't hide connection issues
- **Authentication/authorization failures** - Security errors must be visible
- **Data corruption or validation errors** - Never silently accept bad data
- **Critical dependencies unavailable** - If a required service is down
- **Invalid data that would corrupt state** - Never store zero embeddings or malformed JSON

#### When to Complete but Log Detailed Errors

These operations should continue but track and report failures clearly:

- **Batch processing** - When crawling websites or processing documents
- **Background tasks** - Embedding generation, async jobs should finish the queue
- **WebSocket events** - Don't crash on a single event failure
- **Optional features** - If projects/tasks are disabled, log and skip
- **External API calls** - Retry with exponential backoff, then fail with clear message

#### Critical: Never Accept Corrupted Data

When a process should continue despite failures, it must **skip the failed item entirely** rather than storing corrupted data:

```python
# CORRECT - Skip Failed Items:
try:
    embedding = create_embedding(text)
    store_document(doc, embedding)  # Only store on success
except Exception as e:
    failed_items.append({'doc': doc, 'error': str(e)})
    logger.error(f"Skipping document {doc.id}: {e}")
    # Continue with next document, don't store anything
```

### Code Quality

- Remove dead code immediately rather than maintaining it
- Prioritize functionality over production-ready patterns
- Focus on user experience and feature completeness
- When updating code, focus on comments that document just the functionality
- When commenting, only comment on functionality and reasoning

## First Time Setup

1. Copy environment file: `cp .env.example .env`
2. Add Supabase credentials to `.env` (SUPABASE_URL and SUPABASE_SERVICE_KEY)
3. Run database migration: Execute `migration/complete_setup.sql` in Supabase SQL Editor
4. Start services: `make dev` or `docker compose --profile backend up -d`
5. Configure API keys: Open http://localhost:3737 → Settings → Add OpenAI API key

## Development Commands

### Frontend (chipos-ui-main/)

```bash
npm run dev              # Start development server on port 3737
npm run build            # Build for production
npm run preview          # Preview production build

# Linting - Dual strategy for migration
npm run lint             # Run ESLint on legacy code (excludes /features)
npm run lint:files path/to/file.tsx  # Lint specific files

# Biome for /src/features directory only
npm run biome            # Check features directory
npm run biome:fix        # Auto-fix issues
npm run biome:format     # Format code (120 char lines)
npm run biome:lint       # Lint only (no format)
npm run biome:ci         # CI mode (no fixes)
npm run biome:ai         # Machine-readable JSON output for AI
npm run biome:ai-fix     # Auto-fix with JSON output

# Testing
npm run test             # Run all tests in watch mode
npm run test:ui          # Run with Vitest UI interface
npm run test:coverage:stream  # Run once with streaming output and coverage
npm run test:coverage:force  # Force run with coverage (no fail on missing tests)
vitest run src/features/projects  # Test specific directory
vitest run src/features/projects/tasks  # Test specific sub-feature

# TypeScript
npx tsc --noEmit         # Check all TypeScript errors
npx tsc --noEmit 2>&1 | grep "src/features"  # Check features only
```

### Backend (python/)

```bash
# Using uv package manager (preferred)
uv sync --group all      # Install all dependencies (server + mcp + agents + dev)
uv sync --group server   # Server dependencies only
uv sync --group mcp      # MCP server dependencies only
uv sync --group agents   # Agents service dependencies only
uv sync --group dev      # Development tools (pytest, ruff, mypy)

# Running services locally (outside Docker)
uv run python -m src.server.main     # Run server locally on 8181
uv run python -m src.mcp_server.main # Run MCP server locally on 8051

# Testing
uv run pytest            # Run all tests
uv run pytest -v         # Verbose output
uv run pytest -m unit    # Run unit tests only
uv run pytest -m integration  # Run integration tests only
uv run pytest tests/test_api_essentials.py -v  # Run specific test file
uv run pytest --cov      # Run with coverage report

# Code Quality
uv run ruff check        # Run linter
uv run ruff check --fix  # Auto-fix linting issues
uv run mypy src/         # Type check

# Docker operations
docker compose up --build -d       # Start default services (server + mcp + frontend)
docker compose --profile backend up -d  # Backend only (server + mcp, for hybrid dev)
docker compose --profile full up -d     # All services including frontend
docker compose --profile agents up -d   # Include agents service (opt-in)

# Service management
docker compose logs -f chipos-server   # View server logs
docker compose logs -f chipos-mcp      # View MCP server logs
docker compose logs -f chipos-agents   # View agents service logs
docker compose restart chipos-server   # Restart after code changes
docker compose ps                      # Check service status

# Cleanup
docker compose down      # Stop all services
docker compose down -v   # Stop and remove volumes (fresh start)
```

### Quick Workflows

```bash
# Hybrid development (recommended) - backend in Docker, frontend local
make dev                 # Or manually: docker compose --profile backend up -d && cd chipos-ui-main && npm run dev

# Full Docker mode
make dev-docker          # Or: docker compose up --build -d

# Run linters before committing
make lint                # Runs both frontend and backend linters
make lint-fe             # Frontend only (ESLint + Biome)
make lint-be             # Backend only (Ruff + MyPy)

# Testing
make test                # Run all tests
make test-fe             # Frontend tests only
make test-be             # Backend tests only
```

## Architecture Overview

ChipOS is a microservices-based knowledge management system with MCP (Model Context Protocol) integration:

### Service Architecture

- **Frontend (port 3737)**: React + TypeScript + Vite + TailwindCSS
  - **Dual UI Strategy**:
    - `/features` - Modern vertical slice with Radix UI primitives + TanStack Query
    - `/components` - Legacy custom components (being migrated)
  - **State Management**: TanStack Query for all data fetching (no prop drilling)
  - **Styling**: Tron-inspired glassmorphism with Tailwind CSS
  - **Linting**: Biome for `/features`, ESLint for legacy code

- **Main Server (port 8181)**: FastAPI with Socket.IO support
  - Handles all business logic, database operations, and external API calls
  - WebSocket support for real-time updates

- **MCP Server (port 8051)**: Lightweight HTTP-based MCP protocol server
  - Provides tools for AI assistants (Claude, Cursor, Windsurf)
  - Exposes knowledge search, task management, and project operations

- **Agents Service (port 8052)**: PydanticAI agents for AI/ML operations
  - Handles complex AI workflows and document processing

- **Database**: Supabase (PostgreSQL + pgvector for embeddings)
  - Cloud or local Supabase both supported
  - pgvector for semantic search capabilities

### Frontend Architecture Details

#### Dual UI Strategy (Migration in Progress)

ChipOS frontend is transitioning from custom components to modern vertical slice architecture:

**New Code (`/features`):**
- Use Radix UI primitives for all new components
- Organized by domain with self-contained modules
- Linted with Biome (120 char lines, modern rules)
- TanStack Query for all data fetching
- Full TypeScript strict mode

**Legacy Code (`/components`):**
- Custom components being gradually migrated
- Linted with ESLint (legacy rules)
- Some prop drilling and context usage
- Will eventually be merged into `/features`

**When to use which:**
- New features → Always use `/features` structure
- Fixing bugs → Update in place, consider migrating to `/features` if significant work
- Refactoring → Good opportunity to migrate to `/features`

#### Vertical Slice Architecture (/features)

Features are organized by domain hierarchy with self-contained modules:

```
src/features/
├── ui/
│   ├── primitives/    # Radix UI base components (Button, Dialog, Select, etc)
│   ├── hooks/         # Shared UI hooks (useSmartPolling, etc)
│   └── types/         # UI type definitions
├── projects/
│   ├── components/    # Project UI components
│   ├── hooks/         # Project hooks (useProjectQueries, etc)
│   ├── services/      # Project API services
│   ├── types/         # Project type definitions
│   ├── tasks/         # Tasks sub-feature (nested under projects)
│   │   ├── components/
│   │   ├── hooks/     # Task-specific hooks
│   │   ├── services/  # Task API services
│   │   └── types/
│   └── documents/     # Documents sub-feature
│       ├── components/
│       ├── services/
│       └── types/
├── mcp/               # MCP integration features
└── testing/           # Test infrastructure components
```

**Feature ownership principle:** Each feature owns its sub-features. Tasks are nested under projects because tasks cannot exist without a project context.

#### TanStack Query Patterns

All data fetching uses TanStack Query with consistent patterns:

```typescript
// Query keys factory pattern
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
};

// Smart polling with visibility awareness
const { refetchInterval } = useSmartPolling(10000); // Pauses when tab inactive

// Optimistic updates with rollback
useMutation({
  onMutate: async (data) => {
    await queryClient.cancelQueries(key);
    const previous = queryClient.getQueryData(key);
    queryClient.setQueryData(key, optimisticData);
    return { previous };
  },
  onError: (err, vars, context) => {
    if (context?.previous) {
      queryClient.setQueryData(key, context.previous);
    }
  },
});
```

### Backend Architecture Details

#### Dependency Groups (pyproject.toml)

ChipOS uses uv dependency groups for isolated service dependencies:

- **`server`**: Main API server (FastAPI, crawl4ai, OpenAI, document processing)
- **`mcp`**: Lightweight MCP server (MCP protocol, minimal HTTP client)
- **`agents`**: PydanticAI agents service (pydantic-ai, structlog)
- **`dev`**: Development tools (pytest, ruff, mypy, factory-boy)
- **`all`**: Combined for local development (server + mcp + agents + dev)

Each Docker container installs only its required group, keeping images lean.

#### Service Discovery

Services find each other via `SERVICE_DISCOVERY_MODE` environment variable:

- **`docker_compose`** (default): Uses Docker service names (chipos-server, chipos-mcp)
- **`kubernetes`**: Uses K8s service discovery
- **`local`**: Uses localhost for all services

#### Service Layer Pattern

```python
# API Route -> Service -> Database
# src/server/api_routes/projects.py
@router.get("/{project_id}")
async def get_project(project_id: str):
    return await project_service.get_project(project_id)

# src/server/services/project_service.py
async def get_project(project_id: str):
    # Business logic here
    return await db.fetch_project(project_id)
```

#### Health Check Endpoints

All services expose `/health` endpoints for monitoring:

```bash
curl http://localhost:8181/health  # Server
curl http://localhost:8051/health  # MCP
curl http://localhost:8052/health  # Agents (if enabled)
```

#### Error Handling Patterns

```python
# Use specific exceptions
class ProjectNotFoundError(Exception): pass
class ValidationError(Exception): pass

# Rich error responses
@app.exception_handler(ProjectNotFoundError)
async def handle_not_found(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": str(exc), "type": "not_found"}
    )
```

## Database Schema

Key tables in Supabase:

- `sources` - Crawled websites and uploaded documents
  - Stores metadata, crawl status, and configuration
- `documents` - Processed document chunks with embeddings
  - Text chunks with vector embeddings for semantic search
- `projects` - Project management (optional feature)
  - Contains features array, documents, and metadata
- `tasks` - Task tracking linked to projects
  - Status: todo, doing, review, done
  - Assignee: User, ChipOS, AI IDE Agent
- `code_examples` - Extracted code snippets
  - Language, summary, and relevance metadata

## API Naming Conventions

### Task Status Values

Use database values directly (no UI mapping):

- `todo`, `doing`, `review`, `done`

### Service Method Patterns

- `get[Resource]sByProject(projectId)` - Scoped queries
- `get[Resource](id)` - Single resource
- `create[Resource](data)` - Create operations
- `update[Resource](id, updates)` - Updates
- `delete[Resource](id)` - Soft deletes

### State Naming

- `is[Action]ing` - Loading states (e.g., `isSwitchingProject`)
- `[resource]Error` - Error messages
- `selected[Resource]` - Current selection

## Environment Variables

Required in `.env`:

```bash
SUPABASE_URL=https://your-project.supabase.co  # Or http://host.docker.internal:8000 for local
SUPABASE_SERVICE_KEY=your-service-key-here      # Use service role key for full access
```

Optional:

```bash
LOGFIRE_TOKEN=your-logfire-token      # For observability
LOG_LEVEL=INFO                         # DEBUG, INFO, WARNING, ERROR
ARCHON_SERVER_PORT=8181               # Server port
ARCHON_MCP_PORT=8051                 # MCP server port
ARCHON_UI_PORT=3737                  # Frontend port
```

## Common Development Tasks

### Add a new API endpoint

1. Create route handler in `python/src/server/api_routes/`
2. Add service logic in `python/src/server/services/`
3. Include router in `python/src/server/main.py`
4. Update frontend service in `chipos-ui-main/src/features/[feature]/services/`

### Add a new UI component in features directory

1. Use Radix UI primitives from `src/features/ui/primitives/`
2. Create component in relevant feature folder under `src/features/[feature]/components/`
3. Define types in `src/features/[feature]/types/`
4. Use TanStack Query hook from `src/features/[feature]/hooks/`
5. Apply Tron-inspired glassmorphism styling with Tailwind

### Debug MCP connection issues

1. Check MCP health: `curl http://localhost:8051/health`
2. View MCP logs: `docker compose logs chipos-mcp`
3. Test tool execution via UI MCP page
4. Verify Supabase connection and credentials

### Fix TypeScript/Linting Issues

```bash
# TypeScript errors in features
npx tsc --noEmit 2>&1 | grep "src/features"

# Biome auto-fix for features
npm run biome:fix

# ESLint for legacy code
npm run lint:files src/components/SomeComponent.tsx
```

## Testing

### Frontend Testing

ChipOS frontend uses Vitest with React Testing Library:

```bash
# Watch mode (default for active development)
npm run test              # Run all tests in watch mode
vitest                    # Same as above

# Run once (for CI or verification)
npm run test:coverage:stream   # Run with coverage, streaming output
npm run test:coverage:force    # Force run even with no tests
vitest run                     # Run once without coverage

# Specific test targeting
vitest run src/features/projects              # Test a feature directory
vitest run src/features/projects/tasks        # Test a sub-feature
vitest src/features/ui/primitives/Button.test.tsx  # Test specific file

# UI mode (visual test runner)
npm run test:ui           # Opens browser-based test UI
```

**Test file patterns:**
- Place tests next to source: `Button.tsx` → `Button.test.tsx`
- Or in `__tests__` folder: `components/__tests__/Button.test.tsx`
- Use `.test.tsx` or `.spec.tsx` extension

**Coverage reports:**
- Generated in `coverage/` directory
- View HTML report: `open coverage/index.html`
- View JSON summary: `cat coverage/test-results.json`

### Backend Testing

ChipOS backend uses pytest with async support:

```bash
# Run all tests
uv run pytest            # Run all tests
uv run pytest -v         # Verbose output with test names

# Test markers (defined in pytest.ini or pyproject.toml)
uv run pytest -m unit           # Unit tests only
uv run pytest -m integration    # Integration tests only
uv run pytest -m "not slow"     # Skip slow tests

# Specific test targeting
uv run pytest tests/test_api_essentials.py          # Run specific file
uv run pytest tests/test_api_essentials.py::test_health  # Run specific test
uv run pytest tests/services/                        # Run directory

# Coverage and reporting
uv run pytest --cov                    # Run with coverage
uv run pytest --cov --cov-report=html  # Generate HTML coverage report
uv run pytest --cov --cov-report=term  # Terminal coverage report

# Useful flags
uv run pytest -x          # Stop on first failure
uv run pytest --lf        # Run last failed tests only
uv run pytest --ff        # Run failures first, then others
uv run pytest -k "test_project"  # Run tests matching pattern
uv run pytest --timeout=30       # Set timeout for tests
```

**Test structure:**
- Unit tests: Test individual functions/classes in isolation
- Integration tests: Test multiple components working together
- Use `pytest.mark` decorators to categorize tests
- Use fixtures for common setup/teardown

**Running tests in Docker:**
```bash
# Server tests run inside container
docker compose exec chipos-server pytest
docker compose exec chipos-server pytest -v tests/test_api_essentials.py
```

## Code Quality Standards

### Frontend

- **TypeScript**: Strict mode enabled, no implicit any
- **Biome** for `/src/features/`: 120 char lines, double quotes, trailing commas
- **ESLint** for legacy code: Standard React rules
- **Testing**: Vitest with React Testing Library
- **Coverage threshold**: Aim for >70% on new features

### Backend

- **Python 3.12** with 120 character line length
- **Ruff** for linting - checks for errors, warnings, unused imports
- **Mypy** for type checking - ensures type safety
- **Pytest** for testing with async support
- **Coverage threshold**: Aim for >80% on new services

## MCP Tools Available

When connected to Claude/Cursor/Windsurf:

- `chipos:perform_rag_query` - Search knowledge base
- `chipos:search_code_examples` - Find code snippets
- `chipos:create_project` - Create new project
- `chipos:list_projects` - List all projects
- `chipos:create_task` - Create task in project
- `chipos:list_tasks` - List and filter tasks
- `chipos:update_task` - Update task status/details
- `chipos:get_available_sources` - List knowledge sources

## Troubleshooting

### Common Issues

#### Supabase "Permission Denied" Errors

**Problem:** All saves fail with "permission denied" or "Failed to save" errors.

**Cause:** Using the wrong Supabase API key (anon key instead of service_role key).

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the **service_role** key (NOT the anon/public key)
3. Update `SUPABASE_SERVICE_KEY` in `.env`
4. Restart services: `docker compose restart`

**How to identify:**
- Anon key is shorter, contains "anon" in JWT payload
- Service_role key is longer, contains "service_role" in JWT payload

#### Port Conflicts

**Problem:** Cannot start services due to port already in use.

**Solution:**
```bash
# Find process using port
lsof -i :8181  # or :8051, :3737
kill -9 <PID>  # Kill the process

# Or change ports in .env
ARCHON_SERVER_PORT=8182
ARCHON_MCP_PORT=8052
ARCHON_UI_PORT=3738
```

#### MCP Connection Issues

**Problem:** AI assistant cannot connect to MCP server.

**Diagnosis:**
```bash
# Check MCP health
curl http://localhost:8051/health

# Check logs
docker compose logs chipos-mcp

# Verify Supabase connection
docker compose exec chipos-mcp python -c "from src.mcp_server.config import get_supabase_client; print(get_supabase_client())"
```

**Common fixes:**
1. Ensure MCP server is running: `docker compose ps`
2. Check MCP port in `.env` matches Claude Code config
3. Restart MCP server: `docker compose restart chipos-mcp`
4. Verify SUPABASE_SERVICE_KEY is correct

#### Docker Build Failures

**Problem:** Docker build fails or services won't start.

**Solutions:**
```bash
# Clean rebuild everything
docker compose down -v
docker system prune -a  # Warning: removes all unused images
docker compose up --build -d

# Check Docker resources
docker system df  # View disk usage
docker stats      # View resource usage

# View build logs
docker compose build --no-cache chipos-server
```

#### Frontend Won't Connect to Backend

**Problem:** Frontend shows connection errors, API calls fail.

**Diagnosis:**
1. Check backend is running: `curl http://localhost:8181/health`
2. Check Vite proxy config in `chipos-ui-main/vite.config.ts`
3. Verify `ARCHON_SERVER_PORT` in `.env` matches backend port

**Solution:**
```bash
# Hybrid mode: Ensure backend profile running
docker compose --profile backend ps

# Check Vite environment variables
cd chipos-ui-main
echo $VITE_ARCHON_SERVER_PORT

# Restart frontend with correct env
VITE_ARCHON_SERVER_PORT=8181 npm run dev
```

#### Database Migration Not Applied

**Problem:** Features missing, tables don't exist.

**Solution:**
1. Go to Supabase Dashboard → SQL Editor
2. Run `migration/complete_setup.sql`
3. Verify tables exist: Check Table Editor in Supabase Dashboard
4. Restart services: `docker compose restart`

#### Memory/Performance Issues

**Problem:** System slow, containers using too much memory.

**Solutions:**
```bash
# Check resource usage
docker stats

# Reduce concurrent crawling (in Settings UI or .env)
CRAWL_MAX_CONCURRENT=5  # Default is 10
CRAWL_BATCH_SIZE=25     # Default is 50

# Restart with fresh state
docker compose down -v
docker compose up -d
```

#### Test Failures

**Frontend tests:**
```bash
# Clear cache and retry
rm -rf node_modules/.vitest
npm run test

# Check specific failing test
vitest run src/features/path/to/test.test.tsx -t "test name"
```

**Backend tests:**
```bash
# Clear pytest cache
rm -rf .pytest_cache
uv run pytest -v

# Run with more details
uv run pytest --tb=short  # Shorter traceback
uv run pytest --tb=long   # Full traceback
```

## Important Notes

- Projects feature is optional - toggle in Settings UI
- All services communicate via HTTP, not gRPC
- Socket.IO handles real-time updates
- Frontend uses Vite proxy for API calls in development
- Python backend uses `uv` for dependency management
- Docker Compose handles service orchestration
- TanStack Query for all data fetching - NO PROP DRILLING
- Vertical slice architecture in `/features` - features own their sub-features
- **Port configuration**: ARCHON_* environment variables control all ports
- **Supabase key**: MUST use service_role key, not anon key