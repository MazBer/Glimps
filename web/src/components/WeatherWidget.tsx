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
    <div className="widget-card flex items-stretch justify-between gap-4 rounded-xl p-6">
      <div className="flex flex-col gap-2 flex-[2_2_0px]">
        <p className="text-white text-5xl font-bold leading-tight">{data.tempF}°F</p>
        <p className="text-[#92c0c9] text-base font-normal leading-normal">{data.condition}</p>
        <p className="text-white/80 text-sm font-light leading-normal mt-auto">{data.location}</p>
      </div>
      <div className="flex items-center justify-center flex-1">
        <span
          className="material-symbols-outlined text-primary text-8xl"
          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
        >
          {getWeatherIcon(data.condition)}
        </span>
      </div>
    </div>
  )
}

