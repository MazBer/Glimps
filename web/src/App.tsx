import Pairing from './components/Pairing'

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden p-4 sm:p-6 md:p-8">
        <main className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {/* Clock placeholder */}
          <div className="widget-card rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center lg:col-span-3 xl:col-span-2">
            <h1 className="text-white tracking-tight text-5xl sm:text-7xl font-bold leading-tight">Glimps</h1>
            <p className="text-white/80 text-lg leading-normal pt-2">Turn your PC into your glance screen</p>
          </div>

          {/* Pairing/QR */}
          <Pairing />

          {/* Other widgets placeholders */}
          <div className="widget-card rounded-xl p-6"><p className="text-white/70">Weather widget</p></div>
          <div className="widget-card rounded-xl p-6"><p className="text-white/70">Media widget</p></div>
          <div className="widget-card rounded-xl p-6"><p className="text-white/70">Battery widget</p></div>
        </main>
      </div>
    </div>
  )
}

export default App

