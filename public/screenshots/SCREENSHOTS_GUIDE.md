# Screenshots Guide

## How to Capture

### On Android (Expo Go)
1. Run `npx expo start` and open in Expo Go
2. Use `adb shell screencap -p /sdcard/screenshot.png && adb pull /sdcard/screenshot.png`
   or simply use your phone's built-in screenshot button
3. Crop to remove phone chrome if needed

### On iOS Simulator (macOS)
1. `npx expo start --ios`
2. In simulator: Device > Screenshot (or Cmd+S)
3. Screenshots save to Desktop

### Recommended Dimensions
- **Portrait:** 1080 x 1920 px or 1242 x 2688 px (iPhone 14 Pro Max)

---

## Screens to Capture

| Filename | Screen | Notes |
|----------|--------|-------|
| `01_login.png` | Login screen | Show full branding |
| `02_home_light.png` | Home (nature theme) | With some transactions showing |
| `03_home_dark.png` | Home (dark theme) | Same data, dark mode |
| `04_add_transaction.png` | Add Transaction | Credit tab selected, amount filled |
| `05_add_transaction_debit.png` | Add Transaction | Debit tab selected |
| `06_reports.png` | Daily Reports | Multiple days showing |
| `07_report_detail.png` | Report Detail Sheet | Expanded day with transactions |
| `08_converter.png` | Currency Converter | Show USD to INR conversion |
| `09_settings.png` | Settings | All sections visible |
| `10_export.png` | Export/Import | Show the screen |

---

## Phone Mockup Tools (Free)

After capturing, wrap screenshots in phone frames using:
- **shots.so** — Drag and drop, beautiful frames, free tier
- **mockuphone.com** — Free, many device options
- **previewed.app** — Browser-based, free
- **Canva** — Use "Phone Mockup" element templates

---

## For README

Rename final mockup images to match and place them in this folder:
- `readme_home.png`
- `readme_converter.png`
- `readme_reports.png`
- `readme_settings.png`
- `readme_dark.png`

Then update the Screenshots section in README.md with the correct paths.
