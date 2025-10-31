# Glimps Mobile App

Flutter mobile app for Glimps - sends glance data to PC via WebSocket.

## Setup

1. Install Flutter dependencies:
```bash
flutter pub get
```

2. For Android:
   - Permissions are already configured in `AndroidManifest.xml`
   - Run on Android device/emulator: `flutter run`

3. For iOS:
   - Permissions are configured in `Info.plist`
   - Run on iOS device/simulator: `flutter run`

## Features

- ✅ QR code scanner for pairing
- ✅ WebSocket connection to PC
- ✅ Real-time data collection:
  - Clock/time from device
  - Phone battery status
  - Media playback info (basic)
  - Weather data via Open-Meteo API
- ✅ Automatic data transmission every 1 second

## Dependencies

- `web_socket_channel` - WebSocket client
- `mobile_scanner` - QR code scanning
- `battery_plus` - Battery status
- `just_audio` - Audio/media detection
- `http` - Weather API calls
- `geolocator` - Location for weather
- `provider` - State management

## Building

### Android APK
```bash
flutter build apk
```

### iOS
```bash
flutter build ios
```

