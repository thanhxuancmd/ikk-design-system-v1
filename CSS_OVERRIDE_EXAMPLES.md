# Cartographer Overlay CSS Override Examples

If you need to hide or make the Replit Visual Editor overlays transparent, add one of these CSS snippets to `client/src/index.css`.

## Option 1: Completely Hide All Overlays

```css
/* Hide Replit Visual Editor overlays completely */
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

## Option 2: Make Overlays Invisible but Keep Structure

```css
/* Make Replit Visual Editor overlays invisible */
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

## Option 3: Reduce Visibility (Semi-transparent)

```css
/* Make Replit Visual Editor overlays semi-transparent */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-label,
.beacon-hover-label,
.beacon-selected-label,
.beacon-sibling-highlighter {
  opacity: 0.2 !important;
  pointer-events: none !important;
}
```

## Option 4: Hide Only Labels (Keep Outlines)

```css
/* Hide only the labels, keep the highlighting outlines */
.beacon-label,
.beacon-hover-label,
.beacon-selected-label {
  display: none !important;
}

/* Ensure all overlays are non-interactive */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-sibling-highlighter {
  pointer-events: none !important;
}
```

## Option 5: Custom Styling (Change Colors/Opacity)

```css
/* Customize Replit Visual Editor overlay appearance */
.beacon-highlighter,
.beacon-hover-highlighter,
.beacon-selected-highlighter,
.beacon-sibling-highlighter {
  outline-color: rgba(0, 121, 242, 0.3) !important;
  background: rgba(0, 121, 242, 0.05) !important;
  pointer-events: none !important;
}

.beacon-label,
.beacon-hover-label,
.beacon-selected-label {
  opacity: 0.5 !important;
  font-size: 10px !important;
  pointer-events: none !important;
}
```

## How to Apply

1. Open `client/src/index.css`
2. Add your chosen CSS snippet at the end of the file
3. Save the file
4. The changes will apply immediately in development

## Notes

- These overlays only appear in development mode
- They are automatically disabled in production builds
- Press `Escape` key to dismiss the Visual Editor
- Most overlays already have `pointer-events: none` by default
