# OneScan

A React Native (Expo) app for scanning QR codes, bar codes, and Indian vehicle number plates.

## Features

- **Splash Screen**: 5-second animated splash with branded logo
- **QR Scanner**: Scan QR codes with pinch-to-zoom. URLs open in the browser, text goes to the result screen.
- **Bar Code Scanner**: Scan multiple barcode formats (EAN13, EAN8, Code128, Code39, Code93, Codabar, ITF14, UPC_A, UPC_E)
- **Number Plate Recognition**: Upload a vehicle number plate image from the gallery and get the plate number, state, and vehicle type
- **Result Screen**: Clean display of scanned data with copy and scan-again options

## Tech Stack

| Technology | Version / Details |
| --- | --- |
| React Native | Latest version bundled with Expo SDK 54 |
| TypeScript | Type-safe codebase |
| Expo | SDK 54 |
| Expo Router | File-based navigation |
| `expo-camera` | QR / bar code scanning |
| `expo-image-picker` | Gallery access |
| `react-native-gesture-handler` | Pinch-to-zoom |
| Plate Recognizer API | Number plate recognition (Snapshot API) |
| Node.js | v18 or higher recommended |
| npm | v9 or higher recommended |

> Check `package.json` for the exact installed package versions.

## Project Structure

```
src/
├── app/                  # Screens (expo-router)
│   ├── _layout.tsx       # Root navigation
│   ├── index.tsx         # Splash screen
│   ├── home.tsx          # Home (3 scan options)
│   ├── qr-scan.tsx       # QR scanner
│   ├── barcode-scan.tsx  # Bar code scanner
│   ├── result.tsx        # QR / Bar code result
│   ├── plate-scan.tsx    # Number plate upload
│   └── plate-result.tsx  # Plate recognition result
├── components/
│   └── Logo.tsx          # Branded logo component
└── constants/
    └── theme.ts          # Colors, sizes, shadows
```

## Getting Started

### 1. Clone the repository

```bash
git clone OneScan
cd OneScan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_USE_RN_FETCH=1
EXPO_PUBLIC_PLATE_RECOGNIZER_TOKEN=your_actual_token
```

### 4. Run the project

```bash
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone, or press `a` for an Android emulator / `i` for an iOS simulator.

## API

Number plate recognition uses the [Plate Recognizer](https://platerecognizer.com/) Snapshot API. The free tier includes 2,500 scans per month.