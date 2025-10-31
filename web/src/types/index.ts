export interface ClockData {
  time: string
  date: string
  format: '12h' | '24h'
  timezone: string
}

export interface MediaData {
  title: string
  artist: string
  album: string
  albumArt: string
  position: number
  duration: number
  isPlaying: boolean
  source: 'spotify' | 'apple' | 'youtube' | 'other'
}

export interface BatteryData {
  level: number
  isCharging: boolean
}

export interface WeatherData {
  tempC: number
  tempF: number
  condition: string
  location: string
  icon: string
  lastUpdated: number
}

export interface GlimpsData {
  clock: ClockData
  media: MediaData
  battery: {
    phone: BatteryData
    pc: BatteryData | null
  }
  weather: WeatherData
}

export interface WebSocketMessage {
  type: 'data' | 'heartbeat' | 'error' | 'ack'
  payload?: GlimpsData
  role?: 'phone' | 'display'
}

