import type { ClockData } from '../types'

interface ClockWidgetProps {
  data: ClockData | null
}

export default function ClockWidget({ data }: ClockWidgetProps) {
  // Fallback to local time if no data
  const now = new Date()
  const time = data?.time || now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: data?.format === '12h' 
  })
  const date = data?.date || now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="w-full px-8 py-12 text-center">
      <h1 
        className="text-white font-light tracking-tight leading-none"
        style={{ 
          fontSize: 'clamp(5rem, 25vw, 20rem)',
          fontFamily: 'Comfortaa, sans-serif',
          fontWeight: 300,
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        {time}
      </h1>
      <p 
        className="text-white/70 font-light mt-2"
        style={{ 
          fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
          fontFamily: 'Comfortaa, sans-serif',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '0.02em',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        {date}
      </p>
    </div>
  )
}
