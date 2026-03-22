# Assets Folder — Expense Manager

Place your generated image files here. All filenames must match exactly.

## Required Files

| File | Size | Description | Status |
|------|------|-------------|--------|
| `icon.png` | 1024 x 1024 px | Main app icon (iOS + Android) | NEEDED |
| `splash.png` | 1284 x 2778 px | Splash / loading screen | NEEDED |
| `adaptive-icon.png` | 1024 x 1024 px | Android adaptive icon foreground | NEEDED |
| `favicon.png` | 196 x 196 px | Web browser favicon | NEEDED |

## How to Generate

See `IMAGE_PROMPTS.md` in this folder for ready-to-use AI prompts for each asset.

## Quick Checklist

- [ ] icon.png — green background, white wallet + leaf
- [ ] splash.png — full-screen, green bg, centered logo
- [ ] adaptive-icon.png — transparent bg, white icon only (center-safe)
- [ ] favicon.png — tiny, recognizable at 16px

## After Adding Images

No code changes needed. `app.json` already references all these paths correctly.
Just run `npx expo start` to verify the splash screen loads properly.

## Important Notes

- `splash.png` uses `resizeMode: "contain"` — the image floats on the `#4CAF50` background
- `adaptive-icon.png` needs transparent background — Android adds the green bg itself
- All images must be PNG format
- Do NOT rename files — paths are hardcoded in `app.json`
