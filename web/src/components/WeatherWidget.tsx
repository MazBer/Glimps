import type { WeatherData } from '../types'

interface WeatherWidgetProps {
  data: WeatherData | null
}

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  if (!data) {
    return (
      <div className="widget-card rounded-xl p-6">
        <p className="text-white/70">No weather data</p>
      </div>
    )
  }

  // Map weather condition to Material Symbols icon
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes('sun') || lower.includes('clear')) return 'sunny'
    if (lower.includes('cloud')) return 'cloud'
    if (lower.includes('rain')) return 'rainy'
    if (lower.includes('snow')) return 'ac_unit'
    if (lower.includes('storm')) return 'thunderstorm'
    return 'wb_cloudy'
  }

  return (
    <div className="glass-card h-full flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Weather Icon */}
        <div className="text-[100px] leading-none mb-2 text-white/90">
          <span className="material-symbols-outlined">{getWeatherIcon(data.condition)}</span>
        </div>
        
        {/* Temperature */}
        <p 
          className="text-white font-light leading-none mb-1"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 5rem)',
            fontFamily: 'Comfortaa, sans-serif',
            fontWeight: 300,
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          {Math.round(data.temperature)}°
        </p>
        
        {/* Condition */}
        <p 
          className="text-white/80 text-xl mb-2"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            textTransform: 'capitalize',
            letterSpacing: '0.02em'
          }}
        >
          {data.condition.toLowerCase()}
        </p>
        
        {/* Location */}
        <div className="flex items-center justify-center text-white/60 mb-4">
          <span className="material-symbols-outlined text-base mr-1">location_on</span>
          <span className="text-sm">{data.location}</span>
        </div>
        
        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-3 mt-2 w-full max-w-[180px] mx-auto">
          <div className="flex items-center justify-center">
            <span className="material-symbols-outlined text-white/60 mr-1 text-lg">air</span>
            <span className="text-white/80 text-sm">{data.windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="material-symbols-outlined text-white/60 mr-1 text-lg">water_drop</span>
            <span className="text-white/80 text-sm">{data.humidity}%</span>
          </div>
            humidity_percentage
          </span>
          <p className="text-[rgba(250,250,250,0.8)] text-sm">
            {data.humidity}%
          </p>
          <p className="text-[rgba(250,250,250,0.5)] text-xs">Humidity</p>
        </div>
      </div>
    </div>
  )
}

