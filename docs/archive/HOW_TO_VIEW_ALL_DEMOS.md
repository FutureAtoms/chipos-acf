# How to View All ChipOS UI Demos

All 4 UI library implementations are complete and ready to view! Since they all use port 3737, you can only run one at a time.

## Quick Start

```bash
cd /Users/abhilashchadhar/uncloud/chipos-acf

# View any demo:
./view-aceternity.sh   # Aceternity UI demo
./view-magic.sh        # Magic UI demo
./view-park.sh         # Park UI demo
./view-nextui.sh       # NextUI demo

# To switch demos:
# 1. Press Ctrl+C to stop current server
# 2. Run a different script
```

## What Each Script Does

Each script automatically:
1. Navigates to the correct worktree
2. Installs dependencies if needed (first run only)
3. Starts the dev server on port 3737
4. Shows you the demo URL

## Demo URLs

Once the server starts, visit:

- **Aceternity**: http://localhost:3737/aceternity-demo
- **Magic UI**: http://localhost:3737/magic-demo
- **Park UI**: http://localhost:3737/park-demo
- **NextUI**: http://localhost:3737/nextui-demo

## First Run Notes

The first time you run each script, it will install dependencies. This takes ~1-2 minutes per demo. Subsequent runs start instantly.

## Recommendation

Start with **Aceternity** for maximum visual impact:

```bash
./view-aceternity.sh
```

Then compare with **Magic UI** for dashboard components:

```bash
# Press Ctrl+C first, then:
./view-magic.sh
```

## Implementation Summary

| Library    | Components           | Bundle Size | Best For              |
|------------|---------------------|-------------|-----------------------|
| Aceternity | Beams, Grids, Cards | ~15KB       | Hero sections, impact |
| Magic UI   | Bento, Particles    | ~13KB       | Dashboards, grids     |
| Park UI    | 5 base components   | ~130KB      | Safe, consistent      |
| NextUI     | 20+ components      | ~200KB      | Comprehensive library |

## Troubleshooting

**Port already in use:**
Make sure you stopped the previous demo with Ctrl+C

**Dependencies not installing:**
Manually run `npm install` in the worktree's `chipos-ui-main` directory

**Script not executable:**
Run: `chmod +x view-*.sh`