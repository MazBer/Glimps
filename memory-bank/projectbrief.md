# Project Brief

## Working Title
Glimps – Turn your PC into your glance screen

## One-line Summary
Mobile device sends live glanceable data to a PC client or web app, which displays a fullscreen StandBy-style dashboard (clock/date, media info, battery, weather, and other widgets).

## Goals
- Deliver a reliable end-to-end path from phone → LAN → PC/web display.
- Show core widgets: clock/date, media playback info, phone/PC battery percentage, weather.
- Provide a fullscreen, legible, always-on-friendly UI suitable for a desk or docked monitor.
- Fully customizable grid-based layout with movable, resizable widgets.
- Multiple themes with glassmorphism design aesthetic.
- Responsive design scaling from 1080p to 1440p and 4K.

## Non-Goals (for initial phase)
- Third-party integrations beyond free weather API.
- Widget marketplace (build-in widgets only initially).
- Multi-user support.
- Advanced analytics and historical data.

## Success Criteria (MVP)
- Phone app (Android & iOS) connects and pushes data updates every 1 second.
- Web app receives updates via WebSocket and refreshes UI in real-time.
- Core widgets render cleanly at 1080p, 1440p, and 4K with responsive grid system.
- QR code pairing works reliably on same Wi-Fi network.
- Grid layout supports drag-and-drop widget rearrangement and resizing.

## Constraints/Assumptions
- **Budget: $0** - Free APIs only (Open-Meteo for weather, no paid services).
- Same LAN/Wi-Fi network required for communication.
- Cross-platform mobile priority (Flutter or React Native acceptable).
- Web app first, Electron wrapper to follow.
- Privacy and security must be maintained (TLS, session tokens).

## Risks
- Cross-platform phone APIs for media/battery may vary.
- NAT/firewall traversal if using direct LAN communication.
- Rate limits for public weather APIs.

