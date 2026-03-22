# Asset Image Generation Prompts
# Expense Manager — Hachi wa Studios

All prompts below are ready for use in Midjourney, DALL-E 3, Adobe Firefly, or Stable Diffusion.
Required dimensions and specs are listed before each prompt.

---

## 1. App Icon — `icon.png`

**Size:** 1024 x 1024 px
**Format:** PNG, transparent or solid background
**Used in:** iOS home screen, Android launcher, App Store, Play Store

### Midjourney Prompt
```
A modern minimalist app icon for a personal expense manager app.
A sleek green wallet icon with a subtle leaf or nature motif incorporated into the design.
Flat design, clean white wallet shape with a small green leaf accent,
on a rich forest green (#4CAF50) circular background with rounded corners.
No text. Ultra-clean vector style, soft shadow.
Professional mobile app icon, 1024x1024, --style raw --ar 1:1 --v 6
```

### DALL-E 3 Prompt
```
Create a clean, modern mobile app icon at 1024x1024 pixels.
Design a white minimalist wallet icon with a small stylized leaf on a vibrant green
background (#4CAF50). The icon should have a rounded square shape like iOS app icons.
Flat vector design, no gradients, no text, professional and elegant.
The leaf represents "nature theme". Keep it extremely simple and recognizable at small sizes.
```

### Stable Diffusion Prompt
```
minimalist app icon, white wallet symbol, small leaf motif, green background #4CAF50,
rounded corners, flat design, vector style, clean, professional,
no text, simple shapes, 1024x1024, high quality
```

---

## 2. Splash Screen — `splash.png`

**Size:** 1284 x 2778 px (iPhone 14 Pro Max — safe for all devices)
**Format:** PNG
**Background in app.json:** `#4CAF50` (green)
**Note:** The image is centered on the background color. Keep the logo centered and padded well.

### Midjourney Prompt
```
Minimalist app splash screen artwork.
A glowing white wallet icon with a delicate leaf/nature motif, centered on a clean
forest green background (#4CAF50). Below the icon, subtle text area placeholder.
Soft, premium feel. No gradients. Slight depth with very soft shadow under the icon.
Portrait orientation 9:19.5 ratio. The design feels like a premium banking or finance app.
Flat art direction. --ar 9:19 --style raw --v 6
```

### DALL-E 3 Prompt
```
Design a mobile app splash screen background image at 1284x2778 pixels.
Solid forest green (#4CAF50) background.
In the center: a large clean white wallet logo with a small nature/leaf accent (about 200px wide),
below it space for an app name.
Very minimal. Premium. Think Google Pay meets nature.
Absolutely no text in the image itself. Just the centered logo on green.
```

### Canva / Manual Design Tip
```
Canvas: 1284 x 2778 px
Background fill: #4CAF50
Center element: White wallet SVG icon (use Ionicons "wallet" export as SVG, scale to 200x200px)
Below icon: white dot-separator or thin line
Font (if adding text): Inter Bold, white, 36px — "Expense Manager"
Subtitle: Inter Regular, rgba(255,255,255,0.75), 16px — "Hachi wa Studios"
Padding from center: icon sits 80px above center vertical
```

---

## 3. Android Adaptive Icon — `adaptive-icon.png`

**Size:** 1024 x 1024 px
**Format:** PNG with transparent background
**Note:** Android will mask this to various shapes (circle, squircle, etc.). Keep the logo centered in the safe zone (within the inner 66% of the image — ~672x672px area).

### Midjourney Prompt
```
Android adaptive icon foreground layer. A white wallet icon with a small leaf/sprout detail,
centered on a transparent background. Vector flat design. Ultra clean.
The icon should be smaller than the canvas — centered with generous padding all around.
No background color (will be applied separately as #4CAF50 green).
Safe zone focused. --ar 1:1 --style raw --v 6
```

### DALL-E 3 Prompt
```
Android adaptive icon foreground image, 1024x1024 px, transparent background.
White minimalist wallet icon with small leaf detail, perfectly centered,
occupying about 50-60% of the canvas width.
Flat vector design. The icon needs to look good when Android clips it into circles,
rounded squares, or other shapes. Pure white icon, no background fill.
```

---

## 4. Web Favicon — `favicon.png`

**Size:** 196 x 196 px (or 48 x 48 px minimum)
**Format:** PNG

### Prompt (any tool)
```
Tiny favicon icon 196x196 pixels. A simple white wallet shape on a solid green (#4CAF50)
square background. Ultra minimal — only 2 elements. Must be recognizable at 16x16 pixels.
Flat design, no details, bold silhouette. PNG format.
```

---

## 5. Feature Banner (for README / Store listing) — `public/banner.png`

**Size:** 1280 x 640 px
**Format:** PNG

### Midjourney Prompt
```
App store feature graphic for a personal expense manager app called "Expense Manager"
by Hachi wa Studios. Clean, modern design.
Left side: app name in bold white sans-serif font on dark green background.
Right side: floating phone mockup showing a clean finance dashboard with green accents,
balance card, transaction list. Minimal, premium, professional.
Inspired by Revolut and Google Pay design language.
Nature-inspired green color palette. --ar 2:1 --style raw --v 6
```

---

## 6. Phone Mockup Screenshots (for README)

Use any of these free tools to wrap your screenshots in phone frames:
- **shots.so** — premium phone mockups (free tier)
- **mockuphone.com** — free, many frames
- **previewed.app** — free phone frame generator
- **rotato.app** — 3D rotating mockups

### Screenshot sizes to capture (on device or emulator):
| Screen | Description |
|--------|-------------|
| Login | App branding, login form |
| Home | Balance card, green stats |
| Add Transaction | Credit/debit toggle, amount form |
| Reports | Daily report cards |
| Currency Converter | Live converter with disclaimer |
| Settings | Theme toggle, language pills |
| Dark Mode | Any screen in dark theme |

---

## Color Reference for All Assets

| Color | Hex | Use |
|-------|-----|-----|
| Primary Green | `#4CAF50` | Backgrounds, buttons |
| Dark Green | `#2E7D32` | Credit amounts |
| Light Green | `#E8F5E9` | Credit background tint |
| Nature Beige | `#F5F5DC` | App background (light mode) |
| Dark BG | `#121212` | Dark mode background |
| White | `#FFFFFF` | Icons on colored backgrounds |
| Text Dark | `#2C2C2C` | Main text |

---

## Recommended AI Tools

| Tool | Best For | Free? |
|------|----------|-------|
| DALL-E 3 (ChatGPT Plus) | Precise, instruction-following | Paid |
| Midjourney | Beautiful, aesthetic results | Paid |
| Adobe Firefly | Commercial use safe | Free tier |
| Canva AI | Quick, editable results | Free tier |
| Leonardo.ai | High quality, generous free tier | Free |
| Stable Diffusion (local) | Fully free, total control | Free |
