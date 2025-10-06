# ChipOS Updates Summary - Contact & Bug Reporting

**Date:** 2025-10-06
**Status:** ✅ Complete

---

## Changes Made

### 1. Bug Report Configuration ✅

**Updated Files:**
- `python/src/server/api_routes/bug_report_api.py`
- `python/src/server/config/version.py`

**Changes:**
- **Repository:** `dynamous-community/ChipOS-V2-Alpha` → `FutureAtoms/chipos-acf`
- **Owner:** `coleam00` → `FutureAtoms`
- **Repo Name:** `ChipOS` → `chipos-acf`

**Bug reports will now go to:**
https://github.com/FutureAtoms/chipos-acf/issues

---

### 2. Contact Information ✅

**New File:** `SUPPORT.md`

**Contact Email:** abhilash@futureatoms.com

**For:**
- Bug reports: GitHub Issues or in-app reporter
- Feature requests: GitHub Issues/Discussions
- General questions: abhilash@futureatoms.com
- Security issues: abhilash@futureatoms.com (with [SECURITY] in subject)

---

### 3. Verification ✅

**Bug Report API Health Check:**
```bash
curl http://localhost:8181/api/bug-report/health
```

**Response:**
```json
{
  "status": "degraded",
  "github_token_configured": false,
  "github_repo_configured": false,
  "repo": "FutureAtoms/chipos-acf",
  "message": "GitHub token not configured"
}
```

✅ Repository is correctly set to `FutureAtoms/chipos-acf`

---

## How Bug Reporting Works

### In-App Bug Reporter

1. User encounters bug in ChipOS UI
2. Clicks bug report button (or error boundary triggers)
3. Bug report modal opens with auto-collected context:
   - Error details (message, stack trace)
   - App version and URL
   - System info (platform, browser, memory)
   - Service health status
   - Recent logs

4. User fills out:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Severity and component

5. Submit options:
   - **With GitHub Token:** Creates issue directly via API
   - **Without Token:** Opens pre-filled GitHub issue URL for manual submission

### Backend API

**Endpoint:** `POST /api/bug-report/github`

**Default Repository:** `FutureAtoms/chipos-acf`

**Can be overridden with env var:**
```bash
GITHUB_REPO=YourOrg/your-repo
GITHUB_TOKEN=your_github_token  # Optional for auto-creation
```

---

## Environment Variables

### Bug Reporting (Optional)

Add to `.env` if you want automatic GitHub issue creation:

```bash
# Bug Reporting (optional - for auto-issue creation)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO=FutureAtoms/chipos-acf  # Default, can override
```

**Without these:** Users get a pre-filled GitHub URL to submit manually (still works!)

---

## Testing Bug Reports

### 1. Test Health Endpoint

```bash
curl http://localhost:8181/api/bug-report/health
```

Should show:
- `repo: "FutureAtoms/chipos-acf"`

### 2. Test In-App Reporter

1. Open ChipOS UI: http://localhost:3737
2. Trigger an error or use bug report button
3. Fill out bug report
4. Submit
5. Should get GitHub URL to: https://github.com/FutureAtoms/chipos-acf/issues

### 3. Test with GitHub Token (Optional)

```bash
# Add to .env
GITHUB_TOKEN=your_token_here

# Restart server
docker compose restart chipos-server

# Now bug reports will be created automatically
```

---

## Git Commits

```bash
git log --oneline -5
```

Output:
```
19259ea Update bug reports and contact info to FutureAtoms
d297be7 Add NEXT_STEPS guide for post-sync setup
75e39bb Use chipos_ prefix for database tables
1ae8e8b Fix database table references - keep archon_ prefix for schema
60c623e Sync latest Archon features to ChipOS
```

---

## Files Changed

### Modified
- `python/src/server/api_routes/bug_report_api.py` - Updated default repo
- `python/src/server/config/version.py` - Updated GitHub owner/repo

### Added
- `SUPPORT.md` - Contact information and support guidelines

---

## Next Steps

### Optional: Enable Auto Bug Report Creation

If you want bug reports to be created automatically (without manual GitHub submission):

1. **Create GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Create token with `repo` scope
   - Copy the token

2. **Add to .env:**
   ```bash
   GITHUB_TOKEN=your_token_here
   GITHUB_REPO=FutureAtoms/chipos-acf
   ```

3. **Restart server:**
   ```bash
   docker compose restart chipos-server
   ```

4. **Verify:**
   ```bash
   curl http://localhost:8181/api/bug-report/health
   # Should show: "github_token_configured": true
   ```

---

## Summary

✅ **All bug reports** now point to `FutureAtoms/chipos-acf`
✅ **Contact email** is `abhilash@futureatoms.com`
✅ **Support documentation** added in `SUPPORT.md`
✅ **Version config** updated to FutureAtoms
✅ **Changes committed** to git
✅ **Server restarted** with new configuration

Everything is ready! Bug reports will go to the correct repository and support requests to the right email.
