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
    <div className="widget-card rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center lg:col-span-3 xl:col-span-2">
      <h1 className="text-white tracking-tight text-5xl sm:text-7xl font-bold leading-tight">{time}</h1>
      <p className="text-white/80 text-lg font-normal leading-normal pt-2">{date}</p>
    </div>
  )
}

