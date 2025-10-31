import { useState } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
import ClockWidget from './components/ClockWidget'
import MediaWidget from './components/MediaWidget'
import BatteryWidget from './components/BatteryWidget'
import WeatherWidget from './components/WeatherWidget'
import Pairing from './components/Pairing'

function App() {
  const [wsUrl, setWsUrl] = useState<string | null>(null)
  const { data, status } = useWebSocket({
    wsUrl,
    onConnect: () => console.log('WebSocket connected'),
    onDisconnect: () => console.log('WebSocket disconnected'),
  })

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden p-4 sm:p-6 md:p-8">
        <main className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {/* Clock Widget */}
          <ClockWidget data={data?.clock || null} />

          {/* Pairing/QR - Only show if not connected */}
          {status !== 'connected' && (
            <Pairing onConnect={setWsUrl} connected={status === 'connected'} />
          )}

          {/* Weather Widget */}
          <WeatherWidget data={data?.weather || null} />

          {/* Media Widget */}
          <MediaWidget data={data?.media || null} />

          {/* Battery Widget */}
          <BatteryWidget 
            phoneBattery={data?.battery.phone || null}
            pcBattery={data?.battery.pc || null}
          />
        </main>
      </div>
    </div>
  )
}

export default App

