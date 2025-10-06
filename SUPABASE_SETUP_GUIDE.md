# ChipOS Supabase Database Setup

**Important:** Run this BEFORE starting Docker containers!

---

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on **SQL Editor** in the left sidebar (or go to https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql)

---

## Step 2: Run the Migration Script

1. Open the file: `migration/complete_setup.sql`
2. Copy the **entire contents** of the file
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

### What This Creates

The migration script will create:

- ✅ **Settings Table** (`chipos_settings`) - Configuration and API keys
- ✅ **Knowledge Base Tables** - For document storage and search
  - `chipos_sources` - Crawled websites/documents
  - `chipos_crawled_pages` - Document chunks with embeddings
  - `chipos_code_examples` - Extracted code snippets
- ✅ **Projects & Tasks Tables** - For project management
  - `chipos_projects`
  - `chipos_tasks`
  - `chipos_project_sources`
  - `chipos_document_versions`
  - `chipos_prompts`
- ✅ **Search Functions** - Vector and hybrid search capabilities
- ✅ **Security Policies** - Row Level Security (RLS) policies
- ✅ **Initial Configuration** - Default settings and prompts

---

## Step 3: Verify the Setup

After running the script, verify the tables were created:

1. In Supabase Dashboard, go to **Table Editor**
2. You should see these tables:
   - `chipos_settings`
   - `chipos_sources`
   - `chipos_crawled_pages`
   - `chipos_code_examples`
   - `chipos_projects`
   - `chipos_tasks`
   - `chipos_project_sources`
   - `chipos_document_versions`
   - `chipos_prompts`

---

## Step 4: Get Your Supabase Credentials

You need two values for your `.env` file:

### 1. SUPABASE_URL
Go to: **Settings** → **API** → **Project URL**
- Copy the URL (looks like: `https://xxxxxxxxxxxxx.supabase.co`)

### 2. SUPABASE_SERVICE_KEY
Go to: **Settings** → **API** → **Project API keys** → **service_role** (secret)
- ⚠️ **Important:** Use the `service_role` key, NOT the `anon` key!
- Click "Reveal" and copy the long key

---

## Step 5: Update Your .env File

Edit `/Users/abhilashchadhar/uncloud/archon/chipos-acf/.env`:

```bash
# Required - Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Optional - LLM Provider (add at least one)
OPENAI_API_KEY=sk-your-openai-key
# Or
GOOGLE_API_KEY=your-google-api-key
# Or for local models
OLLAMA_BASE_URL=http://localhost:11434
```

---

## Step 6: Start ChipOS

Now you can start the Docker containers:

```bash
cd /Users/abhilashchadhar/uncloud/archon/chipos-acf
docker compose down
docker compose up -d
```

Wait ~30 seconds for services to start, then check:

```bash
# Check container status
docker compose ps

# Check server health
curl http://localhost:8181/health

# Check MCP health
curl http://localhost:8051/health
```

All services should be **healthy** ✅

---

## Step 7: Access ChipOS UI

Open your browser: **http://localhost:3737**

You should see the ChipOS welcome page!

### First-Time Setup

1. Go to **Settings** (gear icon)
2. Add your API keys:
   - **OpenAI API Key** (for embeddings and LLM)
   - Or configure Gemini/Ollama
3. Configure RAG settings (optional)
4. Enable Projects feature (optional)

---

## Troubleshooting

### Error: "Table chipos_settings does not exist"

**Problem:** Migration script wasn't run or failed

**Solution:**
1. Go to Supabase SQL Editor
2. Re-run `migration/complete_setup.sql`
3. Check for any error messages in the SQL Editor
4. Restart Docker: `docker compose down && docker compose up -d`

### Error: "Could not find table chipos_settings, hint: archon_settings"

**Problem:** You're using an old Archon database

**Solution:**
Either:
- **Option A (Recommended):** Create a fresh database and run the ChipOS migration
- **Option B:** Rename all `archon_*` tables to `chipos_*` manually in Supabase

### Error: "SUPABASE_URL environment variable is required"

**Problem:** `.env` file is missing or not loaded

**Solution:**
1. Verify `.env` exists: `ls -la .env`
2. Check it has correct values (see Step 5)
3. Restart Docker: `docker compose down && docker compose up -d`

### Error: "Permission denied"

**Problem:** Using `anon` key instead of `service_role` key

**Solution:**
1. Go to Supabase → Settings → API
2. Copy the `service_role` (secret) key
3. Update `SUPABASE_SERVICE_KEY` in `.env`
4. Restart: `docker compose restart`

### Containers Keep Restarting

**Check logs:**
```bash
docker compose logs chipos-server --tail=50
docker compose logs chipos-mcp --tail=50
```

Common causes:
- Missing/invalid Supabase credentials
- Database tables not created
- Port conflicts (change ports in `.env`)

---

## Need to Start Fresh?

### Reset Database (Nuclear Option)

⚠️ **Warning:** This deletes ALL ChipOS data!

1. In Supabase SQL Editor, run: `migration/RESET_DB.sql`
2. Then run: `migration/complete_setup.sql`
3. Restart containers: `docker compose down -v && docker compose up -d`

---

## Success Checklist

- [ ] Supabase migration ran successfully
- [ ] All `chipos_*` tables visible in Table Editor
- [ ] `.env` file has SUPABASE_URL and SUPABASE_SERVICE_KEY
- [ ] `.env` has at least one LLM provider API key
- [ ] All Docker containers are healthy
- [ ] Server health check responds: `http://localhost:8181/health`
- [ ] MCP health check responds: `http://localhost:8051/health`
- [ ] UI loads: `http://localhost:3737`
- [ ] Can navigate through UI pages
- [ ] API keys added in Settings

Once all checked, you're ready to use ChipOS! 🎉

---

## Next Steps

1. **Add Knowledge:**
   - Go to Knowledge Base → Crawl Website
   - Or upload PDFs/documents

2. **Create Projects** (optional):
   - Enable Projects in Settings
   - Create your first project
   - Add tasks

3. **Connect AI Assistants:**
   - Go to MCP Dashboard
   - Copy config for Claude Code/Cursor/Windsurf
   - Test MCP tools

4. **Customize Settings:**
   - Configure RAG strategies
   - Adjust code extraction rules
   - Set crawling performance

Enjoy ChipOS! 🚀
