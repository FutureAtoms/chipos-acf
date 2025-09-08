# ChipOS Sync Strategy with Upstream Archon

## Overview
This document outlines the strategy for maintaining ChipOS as a fork of Archon while preserving custom branding and UI modifications.

## Git Repository Structure

### Remote Configuration
- `upstream`: Points to the original Archon repository (https://github.com/coleam00/Archon.git)
- `origin`: Points to your ChipOS repository (to be configured)

### Branch Strategy
- `chipos-custom`: Main development branch with all ChipOS customizations
- `upstream-sync`: Temporary branch for pulling and merging upstream changes
- `main` or `master`: Production-ready ChipOS version

## Syncing Process

### 1. Initial Setup (Already Completed)
```bash
# Clone Archon repository
git clone https://github.com/coleam00/Archon.git .

# Rename origin to upstream
git remote rename origin upstream

# Add your ChipOS repository as origin (when ready)
git remote add origin <your-chipos-repo-url>

# Create custom branch
git checkout -b chipos-custom
```

### 2. Regular Sync from Upstream Archon

#### Step 1: Fetch Latest Changes
```bash
# Fetch all changes from upstream
git fetch upstream

# View available branches and tags
git branch -r
git tag
```

#### Step 2: Create Sync Branch
```bash
# Create a new branch from current ChipOS custom branch
git checkout chipos-custom
git checkout -b upstream-sync-$(date +%Y%m%d)
```

#### Step 3: Merge Upstream Changes
```bash
# Merge upstream main into sync branch
git merge upstream/main

# Resolve conflicts if any
# Key areas to watch for conflicts:
# - package.json (keep ChipOS naming)
# - UI components (preserve ChipOS styling)
# - Docker configs (maintain ChipOS service names)
# - Documentation (keep ChipOS branding)
```

#### Step 4: Test Integration
```bash
# Install dependencies
cd chipos-ui-main && npm install
cd ../python && pip install -e .

# Run tests
npm test
python -m pytest

# Start development environment
docker-compose up
```

#### Step 5: Merge to Custom Branch
```bash
# After successful testing
git checkout chipos-custom
git merge upstream-sync-$(date +%Y%m%d)

# Delete temporary sync branch
git branch -d upstream-sync-$(date +%Y%m%d)
```

## Protected Files During Merge

The following files should NEVER be overwritten during merges:

### Branding Assets
- `chipos-ui-main/public/*.png`
- `chipos-ui-main/public/favicon.png`
- `docs/static/img/*`

### Configuration Files
- `chipos-ui-main/package.json` (name field)
- `python/pyproject.toml` (name field)
- `docker-compose.yml` (service names)
- `.env.example` (CHIPOS_ prefixed variables)

### UI Components (Customized)
- `chipos-ui-main/src/styles/globals.css`
- `chipos-ui-main/tailwind.config.js`
- Any heavily modified UI components

## Conflict Resolution Strategy

### 1. Package Dependencies
- **Accept**: New dependencies from upstream
- **Keep**: ChipOS package name and description
- **Merge**: Version updates carefully

### 2. Feature Additions
- **Accept**: New features from upstream
- **Adapt**: Integrate with ChipOS branding
- **Test**: Ensure compatibility with custom UI

### 3. Bug Fixes
- **Accept**: All bug fixes from upstream
- **Verify**: Test in ChipOS context

### 4. UI Changes
- **Review**: Each UI change individually
- **Adapt**: Apply ChipOS styling to new components
- **Preserve**: Custom theme and color scheme

## Automation Scripts

### Create Sync Script
Create `scripts/sync-upstream.sh`:

```bash
#!/bin/bash

# Fetch latest from upstream
echo "Fetching latest from upstream..."
git fetch upstream

# Create sync branch
SYNC_BRANCH="upstream-sync-$(date +%Y%m%d-%H%M%S)"
echo "Creating sync branch: $SYNC_BRANCH"
git checkout chipos-custom
git checkout -b $SYNC_BRANCH

# Attempt merge
echo "Merging upstream/main..."
if git merge upstream/main --no-edit; then
    echo "Merge successful! No conflicts."
    echo "Run tests and review changes before merging to chipos-custom"
else
    echo "Conflicts detected! Please resolve manually."
    echo "After resolving, run:"
    echo "  git add ."
    echo "  git commit"
    echo "  git checkout chipos-custom"
    echo "  git merge $SYNC_BRANCH"
fi
```

### Create Branding Protection Script
Create `scripts/protect-branding.sh`:

```bash
#!/bin/bash

# List of files to protect
PROTECTED_FILES=(
    "chipos-ui-main/public/logo-neon.png"
    "chipos-ui-main/public/favicon.png"
    "chipos-ui-main/package.json"
    "docker-compose.yml"
)

# Backup protected files before merge
for file in "${PROTECTED_FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$file.chipos-backup"
        echo "Backed up: $file"
    fi
done

echo "Branding files protected. After merge, run restore-branding.sh"
```

## Best Practices

1. **Frequency**: Sync with upstream weekly or bi-weekly
2. **Testing**: Always run full test suite after syncing
3. **Documentation**: Document any custom changes that might conflict
4. **Backup**: Keep backups of heavily customized files
5. **Communication**: Monitor Archon's changelog and breaking changes

## Tracking Custom Changes

Maintain a file `CHIPOS_CUSTOMIZATIONS.md` listing all significant customizations:

```markdown
# ChipOS Customizations

## Branding Changes
- Logo files replaced in /public and /docs/static
- Color scheme updated in globals.css and tailwind.config.js
- Package names changed from "archon" to "chipos"

## UI Modifications
- Custom theme implementation
- Modified navigation component
- Custom animations and transitions

## Configuration Changes
- Docker service names prefixed with "chipos-"
- Environment variables prefixed with "CHIPOS_"
```

## Emergency Rollback

If a sync causes critical issues:

```bash
# Rollback to previous state
git checkout chipos-custom
git reset --hard HEAD~1

# Or revert specific merge
git revert -m 1 <merge-commit-hash>
```

## Conclusion

This strategy ensures:
1. ChipOS maintains its unique identity
2. Benefits from Archon's updates and bug fixes
3. Minimizes merge conflicts
4. Provides clear rollback procedures

Regular syncing and careful conflict resolution will keep ChipOS up-to-date while preserving its custom branding and features.