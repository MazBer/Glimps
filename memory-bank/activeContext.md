# Active Context

## Current Focus
- Establish core communication: mobile (Android/iOS) → LAN WebSocket → PC/web display
- Build responsive grid-based UI with customizable widgets
- Implement drag-and-drop widget layout system

## Recent Decisions
- **Platforms**: Android & iOS (cross-platform mobile), Web app for PC (Electron wrapper later)
- **Communication**: Same LAN/Wi-Fi only, WebSocket direct connection
- **Update Frequency**: Every 1 second (real-time updates)
- **Pairing**: QR code scanning from phone to pair with web app
- **Weather API**: Open-Meteo (free, no API key required)
- **Mobile Framework**: Cross-platform (Flutter acceptable, React Native also considered)
- **UI Framework**: Tailwind CSS with glassmorphism design, grid layout system
- **Account System**: Optional, for saving user settings/preferences

## Next Steps
- Set up project structure (mobile app + web app)
- Implement WebSocket server for LAN communication
- Build responsive grid layout component
- Create core widgets (clock, media, battery, weather)
- Implement QR code pairing flow

## Design Reference
- Sample HTML provided with Tailwind CSS grid layout
- Glassmorphism widget cards with backdrop blur
- Space Grotesk font, Material Symbols icons
- Primary color: #13c8ec (cyan)
- Dark background: #101f22, Light background: #f6f8f8
