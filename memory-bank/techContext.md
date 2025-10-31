# Tech Context

## Technology Stack

### Mobile App (Cross-platform)
- **Framework**: Flutter (primary choice) or React Native
- **Platforms**: Android & iOS
- **Dependencies**:
  - QR code scanner
  - WebSocket client
  - Platform APIs: media playback info, battery status, device time
  - Location services (for weather, optional)

### Web App (PC Display)
- **Framework**: React with Vite
- **UI Library**: Tailwind CSS
- **Icons**: Material Symbols
- **Fonts**: Space Grotesk (Google Fonts)
- **Features**:
  - WebSocket server (Node.js/Express or WebSocket API)
  - QR code generator
  - Drag-and-drop grid layout (react-grid-layout or similar)
  - Responsive design system

### Backend/Communication
- **Transport**: WebSocket (direct LAN connection)
- **Server**: Node.js with `ws` library (lightweight, no HTTPS needed on LAN)
- **Protocol**: JSON over WebSocket
- **Port**: Configurable (default 8080 or similar)

### Weather API
- **Service**: Open-Meteo (https://open-meteo.com)
- **Free**: No API key required
- **Endpoints**: Current weather, forecast
- **Mobile**: Fetches weather on phone, sends to web app

## Dev Constraints
- **Budget: $0** - All services must be free
- Fast iteration, minimal infrastructure
- Simple auth (session token via QR code)
- No external dependencies beyond free APIs

## Build/Deploy
- **Web App**: Static hosting (Netlify, Vercel, GitHub Pages) or local dev server
- **Mobile App**: Flutter build for Android APK and iOS (Xcode)
- **No Backend Required**: Direct WebSocket connection on LAN

## Design System
- **CSS Framework**: Tailwind CSS
- **Theme**: Dark mode default (#101f22), light mode (#f6f8f8)
- **Primary Color**: #13c8ec (cyan)
- **Widget Style**: Glassmorphism (backdrop-filter blur, semi-transparent)
- **Layout**: CSS Grid with responsive breakpoints
- **Typography**: Space Grotesk font family
