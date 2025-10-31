# Product Context

## Why this exists
Enable a docked/desk monitor to act like Apple StandBy but powered by a phone, shown on a PC.

## Users
- Desk workers docking their phone
- Streamers/creators needing a clean status monitor
- Home users wanting ambient info on a spare monitor

## Core Experience (MVP)
- Open PC client or web app → fullscreen dashboard
- Start phone app → pair with PC/web via QR or short code
- Phone pushes data periodically/on change; PC updates live

## Initial Widgets
- **Clock + Date**: Phone time (configurable 12h/24h format, timezone)
- **Media Player**: Title, artist, play state, position, duration, album art
- **Battery**: Phone battery level (0-100%), charging status
- **PC Battery**: PC/laptop battery level, charging status (if applicable)
- **Weather**: Current temperature, conditions, location (from free API)

## UX Goals
- Large, legible typography; glanceable at 1-2 meters distance
- Multiple themes (not just light/dark) with glassmorphism effects
- Fully customizable grid layout
- Movable and resizable widgets via drag-and-drop
- Smooth, non-distracting transitions
- Responsive grid system (1080p → 1440p → 4K)

## Design System
- Tailwind CSS for styling
- Material Symbols icons
- Space Grotesk font family
- Glassmorphism widget cards (backdrop blur, semi-transparent backgrounds)
- Grid-based responsive layout

## Settings & Customization
- Account system (optional) for persisting user settings/preferences
- Clock format settings (12h/24h)
- Theme selection (multiple themes beyond light/dark)
- Widget visibility and layout preferences

## Out of Scope (MVP)
- Widget marketplace
- Third-party widget integrations
- Notification previews
- Complex animations
