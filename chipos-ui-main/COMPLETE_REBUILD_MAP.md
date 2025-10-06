# Complete Magic UI Rebuild - Comprehensive Component Map

## 🎯 Rebuild Strategy

Each component will be rebuilt one by one, ensuring:
1. ✅ All props preserved
2. ✅ All handlers/callbacks preserved
3. ✅ All state management preserved
4. ✅ All functionality tested
5. ✅ Only visual layer changed to Magic UI

## 📋 Complete Inventory

### Pages (5 total)
1. ☐ KnowledgeBasePage.tsx (816 lines)
2. ☐ ProjectPage.tsx
3. ☐ MCPPage.tsx
4. ☐ SettingsPage.tsx
5. ☐ OnboardingPage.tsx

### Knowledge Base Components (9 files)
1. ☐ KnowledgeItemCard.tsx - Individual knowledge item display
2. ☐ GroupedKnowledgeItemCard.tsx - Grouped items display
3. ☐ KnowledgeTable.tsx - Table view
4. ☐ KnowledgeGridSkeleton.tsx - Loading skeleton
5. ☐ KnowledgeTableSkeleton.tsx - Loading skeleton
6. ☐ AddKnowledgeModal.tsx - Add/upload modal
7. ☐ CrawlingTab.tsx - Progress tracking
8. ☐ DocumentBrowser.tsx - Document viewer
9. ☐ GroupCreationModal.tsx - Group creation

### Layout Components (2 files)
1. ☐ MainLayout.tsx - App shell with sidebar
2. ☐ Sidebar.tsx (or navigation within MainLayout)

### Project Components (~10 files)
1. ☐ ProjectCard.tsx
2. ☐ ProjectHeader.tsx
3. ☐ TaskCard.tsx
4. ☐ TaskKanban.tsx
5. ☐ TaskList.tsx
6. ☐ CreateProjectModal.tsx
7. ☐ EditProjectModal.tsx
8. ☐ CreateTaskModal.tsx
9. ☐ EditTaskModal.tsx
10. ☐ ProjectStats.tsx

### Settings Components (~8 files)
1. ☐ APIKeysSection.tsx
2. ☐ RAGSettings.tsx
3. ☐ IDEGlobalRules.tsx
4. ☐ CodeExtractionSettings.tsx
5. ☐ FeaturesSection.tsx
6. ☐ CollapsibleSettingsCard.tsx
7. ☐ ThemeToggle.tsx
8. ☐ Other settings sections

### MCP Components (~5 files)
1. ☐ MCPServerCard.tsx
2. ☐ MCPClientCard.tsx
3. ☐ MCPToolBrowser.tsx
4. ☐ MCPConnectionStatus.tsx
5. ☐ Other MCP components

### Base UI Components (Already in Magic UI or need replacement)
1. ✅ Button → MagicButton
2. ✅ Card → MagicCard
3. ✅ Input → MagicInput
4. ✅ Badge → AnimatedBadge
5. ✅ Toggle → AnimatedToggle
6. ☐ Select → Need to create MagicSelect
7. ☐ Checkbox → Need to create MagicCheckbox
8. ☐ Modal wrapper → Need to create MagicModal

## 📊 Rebuild Order (Bottom-Up Approach)

### Phase 1: Missing Base Components (2-3 hours)
1. Create MagicSelect component
2. Create MagicCheckbox component
3. Create MagicModal component
4. Create MagicTooltip component

### Phase 2: Knowledge Base Components (4-5 hours)
**Order: Smallest to Largest**

1. **KnowledgeItemCard.tsx** (PRIORITY 1)
   - Props: item, onDelete, onRefresh, onBrowse, onClick, selected, selectionMode
   - Features: Hover effects, status badges, action buttons
   - Magic UI: MagicCard + BorderBeam + AnimatedBadge + MagicButton

2. **GroupedKnowledgeItemCard.tsx** (PRIORITY 2)
   - Props: group, onDelete, onBrowse
   - Features: Group display, item count, actions
   - Magic UI: MagicCard + BorderBeam + AnimatedCounter

3. **KnowledgeGridSkeleton.tsx** (PRIORITY 3)
   - Simple loading skeleton
   - Magic UI: MagicCard + shimmer animation

4. **KnowledgeTableSkeleton.tsx** (PRIORITY 4)
   - Table loading skeleton
   - Magic UI: Shimmer rows

5. **GroupCreationModal.tsx** (PRIORITY 5)
   - Props: isOpen, onClose, onSuccess, selectedItems
   - Features: Form, input, buttons
   - Magic UI: MagicModal + MagicInput + MagicButton

6. **CrawlingTab.tsx** (PRIORITY 6)
   - Props: progressItems, onComplete, onCancel
   - Features: Progress bars, live updates
   - Magic UI: AnimatedList + MagicCard + progress animations

7. **DocumentBrowser.tsx** (PRIORITY 7)
   - Props: sourceId, isOpen, onClose
   - Features: Document list, search, pagination
   - Magic UI: MagicModal + BentoGrid + MagicInput + MagicButton

8. **KnowledgeTable.tsx** (PRIORITY 8)
   - Props: items, onDelete, onRefresh, onBrowse, onSelect
   - Features: Sortable table, selection
   - Magic UI: MagicCard table wrapper + custom styled rows

9. **AddKnowledgeModal.tsx** (PRIORITY 9)
   - Props: isOpen, onClose, onSuccess, progressItems
   - Features: Tabs (URL, File, Web), forms, file upload
   - Magic UI: MagicModal + MagicInput + MagicButton + tabs with border beams

### Phase 3: KnowledgeBasePage (2-3 hours)
10. **KnowledgeBasePage.tsx** (PRIORITY 10)
    - Main page assembly
    - Features: Search, filters, view modes, selection
    - Magic UI: Particles background + AnimatedGradientText header + all child components

### Phase 4: Layout (2 hours)
11. **MainLayout.tsx** (PRIORITY 11)
    - App shell
    - Features: Sidebar, navigation, content area
    - Magic UI: Dock navigation + Particles background

### Phase 5: Project Components (4-5 hours)
12. **ProjectCard.tsx**
13. **TaskCard.tsx**
14. **TaskKanban.tsx**
15. **Project modals**
16. **ProjectPage.tsx**

### Phase 6: Settings Components (3-4 hours)
17. **All settings sections**
18. **SettingsPage.tsx**

### Phase 7: MCP Components (2-3 hours)
19. **MCP components**
20. **MCPPage.tsx**

### Phase 8: OnboardingPage (1 hour)
21. **OnboardingPage.tsx**

## 🔍 Component Analysis Template

For each component, I will:

1. **Read original file** - Understand current implementation
2. **Extract functionality map**:
   - All props and their types
   - All state variables
   - All handlers/callbacks
   - All API calls
   - All conditional rendering logic
3. **Create Magic UI version**:
   - Replace visual components (Card → MagicCard, etc.)
   - Keep ALL functionality identical
   - Add Magic UI animations
   - Maintain same props interface
4. **Test functionality**:
   - Verify all interactions work
   - Verify all data flows correctly
   - Verify no regressions

## 📝 Functionality Preservation Checklist

For each component:
- [ ] All props accepted and used correctly
- [ ] All state managed identically
- [ ] All handlers fire correctly
- [ ] All API calls unchanged
- [ ] All conditional rendering preserved
- [ ] All error handling preserved
- [ ] All loading states preserved
- [ ] All tooltips/labels preserved
- [ ] All keyboard interactions preserved
- [ ] All accessibility preserved

## 🎨 Magic UI Mapping Rules

| Current Component | Magic UI Replacement | Animation |
|-------------------|---------------------|-----------|
| Card | MagicCard | Border beam, hover glow |
| Button | MagicButton (shimmer) | Shimmer effect |
| Primary Button | MagicButton (glow) | Glow effect |
| Ghost Button | MagicButton (ghost) | Subtle hover |
| Input | MagicInput | Focus glow |
| Textarea | MagicTextarea | Focus glow |
| Badge | AnimatedBadge | Shimmer variant |
| Status Badge | StatusBadge | Pulse on active |
| Toggle | AnimatedToggle | Spring animation |
| Numbers | AnimatedCounter | Count up animation |
| List items | AnimatedList | Spring entrance |
| Grid | BentoGrid | Staggered entrance |
| Background | Particles | Cyan particles |
| Headers | AnimatedGradientText | Flowing gradient |
| Modal | MagicModal (new) | Fade + scale |
| Select | MagicSelect (new) | Dropdown animation |
| Checkbox | MagicCheckbox (new) | Check animation |

## 🚀 Estimated Timeline

- **Phase 1** (Base components): 3 hours
- **Phase 2** (Knowledge Base): 5 hours
- **Phase 3** (KnowledgeBasePage): 3 hours
- **Phase 4** (Layout): 2 hours
- **Phase 5** (Projects): 5 hours
- **Phase 6** (Settings): 4 hours
- **Phase 7** (MCP): 3 hours
- **Phase 8** (Onboarding): 1 hour

**Total: ~26 hours** (3-4 working days)

## 📦 Current Progress

- ✅ 17 Magic UI base components created
- ✅ Documentation completed
- ✅ Dev environment running
- ⏳ Starting Phase 1: Missing base components