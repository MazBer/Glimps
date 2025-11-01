import type { BatteryData } from '../types'

interface BatteryWidgetProps {
  phoneBattery: BatteryData | null
  pcBattery: BatteryData | null
}

export default function BatteryWidget({ phoneBattery, pcBattery }: BatteryWidgetProps) {
  const renderBatteryCircle = (battery: BatteryData | null, label: string) => {
    if (!battery) return null

    return (
      <div className="glass-card h-full p-6">
        <h3 
          className="text-white/80 font-light mb-4 text-lg"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.02em'
          }}
        >
          Battery Status
        </h3>
        
        <div className="space-y-4">
          {[
            { type: 'phone', data: phoneBattery, label: 'Phone' },
            { type: 'pc', data: pcBattery, label: 'PC' }
          ].map(({ type, data, label }) => (
            data && (
              <div key={type} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white/60 text-sm">{label}</span>
                  <div className="flex items-center">
                    {data.isCharging && (
                      <span className="material-symbols-outlined text-[#4ade80] text-base mr-1">
                        {Math.round(data.level)}%
                      </span>
                    )}
                    <span 
                      className="font-light"
                      style={{
                        fontSize: '1.75rem',
                        fontFamily: 'Comfortaa, sans-serif',
                        fontWeight: 300,
                        color: data.level < 20 ? '#ef4444' : 'white'
                      }}
                    >
                      {data.level}%
                    </span>
                  </div>
                </div>
                
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${data.level}%`,
                      background: `linear-gradient(90deg, ${data.level < 20 ? '#ef4444' : data.isCharging ? '#4ade80' : '#3b82f6'} 0%, ${data.level < 20 ? '#f87171' : data.isCharging ? '#86efac' : '#60a5fa'} 100%)`
                    }}
                  />
                        : 'bg-gradient-to-r from-[#13C8EC] to-[#0ea5e9]'
                    }`}
                    style={{ width: `${data.level}%` }}
                  >
                    {data.isCharging && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                {data.level < 20 && !data.isCharging && (
                  <p className="text-red-400 text-xs mt-1 flex items-center">
                    <span className="material-symbols-outlined text-sm mr-1">warning</span>
                    Low battery
                  </p>
                )}
              </div>
            )
          ))}
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

