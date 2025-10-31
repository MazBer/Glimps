# System Patterns

## Architecture
- **Mobile App** (Android/iOS) → WebSocket client → connects to web app on same LAN
- **Web App** → WebSocket server → receives updates and renders widgets in real-time
- **Direct LAN Connection**: No relay server needed, same Wi-Fi network required

## Data Model
```typescript
{
  clock: {
    time: "10:09",           // Phone time
    date: "Tuesday, August 27, 2024",
    format: "12h" | "24h",
    timezone: string
  },
  media: {
    title: string,
    artist: string,
    album: string,
    albumArt: string,         // URL or base64
    position: number,         // seconds
    duration: number,         // seconds
    isPlaying: boolean,
    source: "spotify" | "apple" | "youtube" | "other"
  },
  battery: {
    phone: {
      level: number,          // 0-100
      isCharging: boolean
    },
    pc: {
      level: number | null,   // null if desktop
      isCharging: boolean | null
    }
  },
  weather: {
    tempC: number,
    tempF: number,
    condition: string,        // "Sunny", "Cloudy", etc.
    location: string,
    icon: string,
    lastUpdated: timestamp
  }
}
```

## Update Strategy
- **Push every 1 second** from mobile app
- Client-side smooth transitions (no flicker)
- WebSocket heartbeat to maintain connection
- Graceful degradation on connection loss

## Pairing Pattern
1. Web app displays QR code with: `ws://[local-ip]:[port]/session/[token]`
2. Mobile app scans QR code
3. Mobile app connects to WebSocket endpoint
4. Session token validated, connection established
5. Real-time data streaming begins

## Error/Recovery
- Exponential backoff reconnects (1s, 2s, 4s, 8s, max 30s)
- Last-known-good UI with stale indicator
- Network status widget shows connection state
