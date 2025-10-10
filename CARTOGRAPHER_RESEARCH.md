# @replit/vite-plugin-cartographer Research

## Overview
The `@replit/vite-plugin-cartographer` plugin powers Replit's Visual Editor / Element Selector feature. It enables click-to-edit functionality by mapping UI components to their source code locations.

**Version:** 0.3.0  
**Purpose:** Enable visual editing by linking DOM elements to source code  
**Framework Support:** Works with JavaScript-based apps (React, Vue, etc.)

---

## 1. Visual Overlays & Badges Rendered

The plugin injects CSS and JavaScript that creates the following visual overlays:

### CSS Classes Injected:
1. **`.beacon-highlighter`**
   - Base highlighter style
   - Uses dashed blue outline (#0079F2)
   - Semi-transparent background (#0079F210)
   - Position: absolute
   - z-index: Number.MAX_SAFE_INTEGER-3
   - **Already has `pointer-events: none`**
   - Initial opacity: 0

2. **`.beacon-hover-highlighter`**
   - Shown when hovering over elements
   - Position: fixed
   - z-index: Number.MAX_SAFE_INTEGER
   - **Does NOT have pointer-events: none by default**

3. **`.beacon-selected-highlighter`**
   - Shown when element is selected
   - Solid blue outline (2px solid #0079F2)
   - Position: fixed
   - **Has `pointer-events: none`**
   - outline-offset: 3px

4. **`.beacon-label`**
   - Displays component name/path
   - Blue background (#0079F2)
   - White text
   - Position: absolute
   - z-index: Number.MAX_SAFE_INTEGER-2
   - **Has `pointer-events: none`**
   - Initial opacity: 0

5. **`.beacon-hover-label`**
   - Label shown on hover
   - Position: fixed
   - z-index: Number.MAX_SAFE_INTEGER

6. **`.beacon-selected-label`**
   - Label for selected element
   - Position: fixed
   - **Has `pointer-events: none`**

7. **`.beacon-sibling-highlighter`**
   - Highlights sibling elements
   - Position: fixed
   - **Has `pointer-events: none`**
   - Dashed outline with semi-transparent background

### Data Attributes Added:
The plugin transforms JSX/TSX files to add metadata attributes:
- `data-replit-metadata`: Contains file path and line/column info (e.g., "client/src/App.tsx:42:10")
- `data-component-name`: Contains the component/element name

---

## 2. Configuration Options

### Plugin Configuration:
**The cartographer() function accepts NO configuration parameters.**

```typescript
// From TypeScript definition:
declare function cartographer(): Plugin;
```

The plugin is zero-config and cannot be customized through parameters.

### Current vite.config.ts Implementation:
```typescript
plugins: [
  react(),
  runtimeErrorOverlay(),
  ...(process.env.NODE_ENV !== "production" &&
  process.env.REPL_ID !== undefined
    ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer(),
        ),
      ]
    : []),
],
```

The plugin is already conditionally loaded:
- ✅ Only loads when `NODE_ENV !== "production"`
- ✅ Only loads when `REPL_ID !== undefined` (Replit environment)

---

## 3. Disabling/Controlling the Overlay

### A. Environment Variable Approach:
**No specific cartographer environment variables found.**

The plugin already respects:
- `NODE_ENV` - Won't load in production
- `REPL_ID` - Won't load outside Replit environment

### B. Visual Editor Toggle:
The plugin responds to postMessage events:
- `TOGGLE_REPLIT_VISUAL_EDITOR` - Enable/disable the visual editor
- `REPLIT_VISUAL_EDITOR_ENABLED` - Notifies when enabled
- `REPLIT_VISUAL_EDITOR_DISABLED` - Notifies when disabled

**User can press `Escape` key to dismiss the Visual Editor overlay.**

The Visual Editor is opt-in and only activates when:
1. User toggles the "Element Selector" tool in Agent/Assistant chat
2. User clicks on UI elements in the preview

### C. CSS Override Approach:
Most overlays already have `pointer-events: none`, but you can add additional CSS overrides:

**Option 1: Hide all beacon overlays**
```css
/* Add to client/src/index.css */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-label,
.beacon-hover-label,
.beacon-selected-label,
.beacon-sibling-highlighter {
  display: none !important;
}
```

**Option 2: Make all beacon overlays transparent and non-interactive**
```css
/* Add to client/src/index.css */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-label,
.beacon-hover-label,
.beacon-selected-label,
.beacon-sibling-highlighter {
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}
```

**Option 3: Reduce visibility (semi-transparent)**
```css
/* Add to client/src/index.css */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-label,
.beacon-hover-label,
.beacon-selected-label,
.beacon-sibling-highlighter {
  opacity: 0.3 !important;
  pointer-events: none !important;
}
```

---

## 4. Production Behavior

**The overlay is DEV-ONLY and will NOT appear in production.**

The conditional loading in vite.config.ts ensures:
- ✅ Plugin is NOT loaded when `NODE_ENV === "production"`
- ✅ No performance impact in production builds
- ✅ No visual overlays in production
- ✅ No data attributes added in production builds

---

## 5. How It Works (Technical Details)

### Build-time Transformation:
1. Plugin uses Babel to parse JSX/TSX files
2. Adds `data-replit-metadata` and `data-component-name` attributes to JSX elements
3. Injects metadata about file path, line number, and column

### Runtime Behavior:
1. Injects client-side script (`beacon/index.global.js`) via transformIndexHtml
2. Script listens for postMessage events from Replit's Visual Editor
3. On element hover/click, highlights element with overlays
4. Captures element metadata (styles, position, content, screenshot)
5. Sends metadata back to Replit for editing

### Constants Used:
```javascript
HIGHLIGHT_COLOR: "#0079F2" (Replit blue)
HIGHLIGHT_BG: "#0079F210" (Semi-transparent blue)
ALLOWED_DOMAIN: ".replit.dev"
```

---

## 6. Recommendations

### For Development:
1. **Keep the plugin enabled** - It's useful for Replit Agent/Assistant features
2. **Press Escape** to dismiss overlays when they interfere
3. The overlays are intentionally non-intrusive (most have `pointer-events: none`)

### If Overlays Are Problematic:
1. **CSS Override** (Recommended): Add CSS rules to hide/make transparent
2. **Environment Variable**: Set `NODE_ENV=production` temporarily (not recommended as it changes build behavior)
3. **Remove REPL_ID**: Not recommended as it may break other Replit features

### For Production:
- ✅ **No action needed** - Plugin automatically disabled in production builds
- ✅ No performance or visual impact

---

## 7. Message Types Supported

The plugin communicates via postMessage with these message types:

- `TOGGLE_REPLIT_VISUAL_EDITOR` - Toggle editor on/off with optional editing mode
- `REPLIT_VISUAL_EDITOR_ENABLED` - Notification that editor is enabled
- `REPLIT_VISUAL_EDITOR_DISABLED` - Notification that editor is disabled
- `ELEMENT_SELECTED` - Element was selected with metadata
- `ELEMENT_UNSELECTED` - Element was deselected
- `ELEMENT_TEXT_CHANGED` - Element text was modified
- `SELECTOR_SCRIPT_LOADED` - Script initialization complete
- `CLEAR_SELECTION` - Clear current selection
- `UPDATE_SELECTED_ELEMENT` - Update element attributes (style, textContent, className, src)
- `CLEAR_ELEMENT_DIRTY` - Clear dirty state
- `APPLY_THEME_PREVIEW` - Preview theme changes
- `CLEAR_THEME_PREVIEW` - Remove theme preview

---

## 8. Summary

**Key Findings:**
1. ✅ Plugin renders 7 different overlay types (highlighters and labels)
2. ❌ No configuration options to disable via plugin parameters
3. ✅ Most overlays already have `pointer-events: none` built-in
4. ✅ Can be hidden/styled via CSS overrides
5. ❌ No specific environment variables to control behavior
6. ✅ Already conditionally loaded (dev-only, Replit-only)
7. ✅ Automatically disabled in production builds
8. ✅ User can press Escape to dismiss the Visual Editor

**Recommended Solution:**
If the overlays are interfering with development, add CSS overrides to `client/src/index.css` to hide or make them fully transparent. The plugin is essential for Replit's Visual Editor features and is already optimized to be non-intrusive.
