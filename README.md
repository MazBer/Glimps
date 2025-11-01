# Glimps - Turn your PC into your glance screen

A StandBy-style glance screen that displays your phone's information on your PC. Mobile app sends real-time data (clock, media, battery, weather) to a web app via WebSocket over your local network.

![Sample 1](sample1.png)

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
- Node.js 18+ (for web app and server)
- Flutter SDK (for mobile app)
- Same Wi-Fi network for mobile and PC

### 1. Start the WebSocket Server
```bash
cd server
npm install
npm start
```
The server will run on port 8080 and display your local IP address.

### 2. Start the Web App (PC Display)
```bash
cd web
npm install
npm run dev
```
Open `http://localhost:3000` on your PC. You'll see a QR code for pairing.

### 3. Start the Mobile App
```bash
cd mobile
flutter pub get
flutter run
```
On Android/iOS device, scan the QR code displayed on the PC to connect.

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

✅ **MVP Complete** - Core functionality implemented

- ✅ Web app with responsive grid layout
- ✅ WebSocket relay server with token pairing
- ✅ Flutter mobile app with QR scanner
- ✅ Real-time data collection and transmission
- ✅ Core widgets (Clock, Media, Battery, Weather)

See `memory-bank/progress.md` for detailed status updates.
