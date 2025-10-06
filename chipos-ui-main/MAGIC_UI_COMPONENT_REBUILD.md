# Magic UI Component-by-Component Rebuild Plan

## Current Status
- ✅ Base Magic UI primitives created (Particles, BorderBeam, AnimatedGradientText, BentoGrid, ShimmerButton)
- ✅ KnowledgeBasePageMagic demo created
- 🔄 Need to rebuild ALL components systematically

## Component Inventory & Redesign Strategy

### 1. Base UI Components (src/components/ui/)
**Current → Magic UI Replacement**

| Component | Current Tech | Magic UI Replacement | Status |
|-----------|-------------|---------------------|---------|
| Button.tsx | Custom glass | ShimmerButton / RainbowButton | ⏳ Pending |
| NeonButton.tsx | Custom neon | ShimmerButton with Border | ⏳ Pending |
| PowerButton.tsx | Custom toggle | Magic Toggle with Shine | ⏳ Pending |
| Card.tsx | Glass card | Magic Card + BorderBeam | ⏳ Pending |
| Input.tsx | Glass input | Magic Input + Shine Border | ⏳ Pending |
| Select.tsx | Custom dropdown | Magic Select with Animated List | ⏳ Pending |
| Badge.tsx | Simple badge | Shimmer Badge | ⏳ Pending |
| Toggle.tsx | Standard toggle | Animated Toggle | ⏳ Pending |
| Checkbox.tsx | Standard checkbox | Animated Checkbox | ⏳ Pending |

### 2. Knowledge Base Components (src/components/knowledge-base/)
| Component | Magic UI Strategy | Status |
|-----------|------------------|---------|
| AddKnowledgeModal.tsx | Modal with BorderBeam, ShimmerButton | ⏳ Pending |
| CrawlingTab.tsx | AnimatedList for progress items | ⏳ Pending |
| DocumentBrowser.tsx | BentoGrid for documents, AnimatedList | ⏳ Pending |
| KnowledgeItemCard.tsx | MagicCard + BorderBeam + Hover effects | ⏳ Pending |

### 3. Projects Components (src/features/projects/components/)
| Component | Magic UI Strategy | Status |
|-----------|------------------|---------|
| Project cards | MagicCard + BorderBeam | ⏳ Pending |
| Task kanban | AnimatedList + DragDrop | ⏳ Pending |
| Task cards | MagicCard with status indicators | ⏳ Pending |
| Project stats | Orbiting Circles + Animated Numbers | ⏳ Pending |

### 4. Settings Components (src/components/settings/)
| Component | Magic UI Strategy | Status |
|-----------|------------------|---------|
| APIKeysSection.tsx | BentoGrid layout, ShimmerButton | ⏳ Pending |
| RAGSettings.tsx | Animated sliders, Magic toggles | ⏳ Pending |
| FeaturesSection.tsx | Interactive cards with BorderBeam | ⏳ Pending |
| CodeExtractionSettings.tsx | BentoGrid with animated icons | ⏳ Pending |

### 5. MCP Components (src/features/mcp/components/)
| Component | Magic UI Strategy | Status |
|-----------|------------------|---------|
| MCP server cards | MagicCard + Pulsating status | ⏳ Pending |
| Connection status | Orbiting Circles animation | ⏳ Pending |
| Tool browser | BentoGrid + AnimatedList | ⏳ Pending |

### 6. Layout Components
| Component | Magic UI Strategy | Status |
|-----------|------------------|---------|
| MainLayout.tsx | Particles background, Dock navigation | ⏳ Pending |
| Sidebar | Dock component with icons | ⏳ Pending |
| Navigation | TextReveal on hover | ⏳ Pending |

## Implementation Order (Priority)

### Phase 1: Core UI Primitives (2-3 hours)
1. ✅ Already created: Particles, BorderBeam, AnimatedGradientText, BentoGrid, ShimmerButton
2. Create: MagicCard component
3. Create: MagicButton component (ShimmerButton wrapper)
4. Create: MagicInput component
5. Create: MagicSelect component
6. Create: AnimatedToggle component
7. Create: AnimatedBadge component

### Phase 2: Knowledge Base Components (3-4 hours)
1. Rebuild KnowledgeItemCard with MagicCard
2. Rebuild AddKnowledgeModal with Magic UI
3. Rebuild CrawlingTab with AnimatedList
4. Rebuild DocumentBrowser with BentoGrid
5. Replace KnowledgeBasePage with KnowledgeBasePageMagic

### Phase 3: Projects Components (4-5 hours)
1. Rebuild ProjectCard with MagicCard
2. Rebuild TaskCard with MagicCard + status animations
3. Rebuild Kanban board with AnimatedList
4. Rebuild project stats with animated numbers
5. Replace ProjectPage

### Phase 4: Settings Components (2-3 hours)
1. Rebuild APIKeysSection with BentoGrid
2. Rebuild all settings sections with Magic UI
3. Replace SettingsPage

### Phase 5: MCP Components (2-3 hours)
1. Rebuild MCP server cards
2. Rebuild connection status visualizations
3. Replace MCPPage

### Phase 6: Layout & Navigation (2-3 hours)
1. Rebuild MainLayout with Particles
2. Rebuild Sidebar as Dock
3. Add navigation animations
4. Polish all transitions

## Total Estimated Time: 15-21 hours

## Magic UI Components to Create

### New Components Needed:
1. `src/features/ui/magic/magic-card.tsx` - Enhanced card with mouse tracking
2. `src/features/ui/magic/magic-button.tsx` - Unified button component
3. `src/features/ui/magic/magic-input.tsx` - Input with shine border
4. `src/features/ui/magic/magic-select.tsx` - Select with animations
5. `src/features/ui/magic/animated-toggle.tsx` - Toggle with animations
6. `src/features/ui/magic/animated-badge.tsx` - Badge with shimmer
7. `src/features/ui/magic/dock.tsx` - macOS-style dock navigation
8. `src/features/ui/magic/orbiting-circles.tsx` - Animated orbiting elements
9. `src/features/ui/magic/number-ticker.tsx` - Animated number counter
10. `src/features/ui/magic/text-reveal.tsx` - Text reveal on hover

## Design Principles

### Colors (Tron Theme)
- Primary: `#00d9ff` (cyan)
- Secondary: `#0066ff` (blue)
- Background: `#000000` (black)
- Glass: `rgba(0, 0, 0, 0.4)` with backdrop-blur
- Borders: `rgba(0, 217, 255, 0.2)`

### Animations
- Border beams: 12-15s duration
- Particles: 80 ease, 100 quantity
- List items: Spring animation (stiffness: 350, damping: 40)
- Hover effects: 0.3s transition
- Entrance delays: staggered by 0.05s

### Spacing
- Cards: 1.5rem padding
- Grid gaps: 1rem
- Section spacing: 2rem
- Container padding: 2rem

## Next Steps
1. Create all missing Magic UI primitive components
2. Rebuild one component at a time, testing thoroughly
3. Replace old components progressively
4. Ensure zero breaking changes to functionality