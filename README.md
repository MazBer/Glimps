# Glimps - Turn your PC into your glance screen

A StandBy-style glance screen that displays your phone's information on your PC. Mobile app sends real-time data (clock, media, battery, weather) to a web app via WebSocket over your local network.

## Project Structure

```
Glimps/
├── mobile/          # Flutter mobile app (Android & iOS)
├── web/            # React + Vite web app (PC display)
├── memory-bank/    # Project documentation
└── README.md       # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ (for web app)
- Flutter SDK (for mobile app)
- Same Wi-Fi network for mobile and PC

### Web App (PC Display)
```bash
cd web
npm install
npm run dev
```

### Mobile App
```bash
cd mobile
flutter pub get
flutter run
```

## Features

- 📱 Cross-platform mobile app (Android & iOS)
- 💻 Web-based PC display (Electron wrapper coming soon)
- 🔄 Real-time updates (1 second refresh)
- 📊 Customizable grid layout with drag-and-drop
- 🎨 Multiple themes with glassmorphism design
- 📡 Direct LAN connection (no internet required)
- 🔒 Secure pairing via QR code

## Core Widgets

- Clock & Date (from phone)
- Media Player (title, artist, album art, progress)
- Battery Status (phone + PC)
- Weather (free Open-Meteo API)

## Technology Stack

- **Mobile**: Flutter (cross-platform)
- **Web**: React + Vite + Tailwind CSS
- **Communication**: WebSocket (direct LAN)
- **Weather**: Open-Meteo API (free)

## Development Status

🚧 **Early Development** - Core functionality being built

See `memory-bank/progress.md` for detailed status updates.
