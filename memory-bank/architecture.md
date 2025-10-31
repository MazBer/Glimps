# Architecture Overview

## System Components

### 1. Mobile App (Flutter - Android & iOS)
**Location**: `/mobile` (to be created)

**Responsibilities**:
- Collect device data (clock, media, battery)
- Fetch weather data (Open-Meteo API)
- Scan QR code for pairing
- Establish WebSocket connection
- Send data updates every 1 second

**Key Packages**:
- `web_socket_channel` - WebSocket client
- `qr_code_scanner` - QR code scanning
- `battery_plus` - Battery status
- `just_audio` / `audioplayers` - Media playback info
- `geolocator` - Location (for weather)
- `http` - Weather API calls

### 2. Web App (React + Vite)
**Location**: `/web`

**Responsibilities**:
- Display fullscreen dashboard
- Generate QR code for pairing
- Run WebSocket server for LAN connection
- Render widgets in responsive grid layout
- Handle drag-and-drop widget arrangement

**Key Libraries**:
- React 19 + TypeScript
- Tailwind CSS (design system)
- `ws` or native WebSocket API (server)
- `qrcode.react` or similar (QR generation)
- `react-grid-layout` (drag-and-drop grid)

### 3. Communication Layer

**Protocol**: WebSocket over LAN (ws://)

**Connection Flow**:
1. Web app starts WebSocket server on port 3000 (or configurable)
2. Web app displays QR code with connection URL: `ws://[local-ip]:3000/session/[token]`
3. Mobile app scans QR code
4. Mobile app connects to WebSocket endpoint
5. Session token validated on connection
6. Real-time bidirectional communication established

**Data Format**: JSON
```typescript
{
  type: "data" | "heartbeat" | "error",
  payload: {
    clock: {...},
    media: {...},
    battery: {...},
    weather: {...}
  }
}
```

## Project Structure

```
Glimps/
├── mobile/                 # Flutter mobile app
│   ├── lib/
│   │   ├── main.dart
│   │   ├── services/       # WebSocket, APIs
│   │   ├── widgets/       # UI components
│   │   └── models/        # Data models
│   └── pubspec.yaml
├── web/                    # React web app
│   ├── src/
│   │   ├── components/    # Widgets, Grid, QR
│   │   ├── services/      # WebSocket server
│   │   ├── hooks/         # React hooks
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── memory-bank/           # Documentation
└── README.md
```

## Next Steps

1. ✅ Web app scaffolded (React + Vite + Tailwind)
2. ⏳ Create Flutter mobile app structure
3. ⏳ Implement WebSocket server in web app
4. ⏳ Build core widgets (Clock, Media, Battery, Weather)
5. ⏳ Implement grid layout system
6. ⏳ Add QR code pairing
7. ⏳ Test end-to-end communication

