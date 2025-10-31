import type { BatteryData } from '../types'

interface BatteryWidgetProps {
  phoneBattery: BatteryData | null
  pcBattery: BatteryData | null
}

export default function BatteryWidget({ phoneBattery, pcBattery }: BatteryWidgetProps) {
  const renderBatteryCircle = (battery: BatteryData | null, label: string) => {
    if (!battery) return null

    const circumference = 2 * Math.PI * 54 // radius 54
    const offset = circumference - (battery.level / 100) * circumference

    return (
      <div className="widget-card rounded-xl p-6 flex flex-col justify-between mb-4 last:mb-0">
        <div className="flex gap-4 justify-between items-start">
          <p className="text-white text-lg font-medium leading-normal">{label}</p>
          {battery.isCharging && (
            <p className="text-primary text-sm font-normal leading-normal">Charging</p>
          )}
        </div>
        <div className="relative flex items-center justify-center my-4">
          <svg className="size-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              fill="none"
              r="54"
              stroke="rgba(19, 200, 236, 0.2)"
              strokeWidth="12"
            />
            <circle
              className="text-primary"
              cx="60"
              cy="60"
              fill="none"
              r="54"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="12"
              style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-white text-3xl font-bold">{battery.level}%</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderBatteryCircle(phoneBattery, 'Phone Battery')}
      {pcBattery && renderBatteryCircle(pcBattery, 'PC Battery')}
      {!phoneBattery && !pcBattery && (
        <div className="widget-card rounded-xl p-6">
          <p className="text-white/70">No battery data</p>
        </div>
      )}
    </div>
  )
}

