import type { MediaData } from '../types'

interface MediaWidgetProps {
  data: MediaData | null
}

export default function MediaWidget({ data }: MediaWidgetProps) {
  if (!data) {
    return (
      <div className="glass-card p-8">
        <p className="text-[rgba(250,250,250,0.5)] text-2xl">No media playing</p>
      </div>
    )
  }

  const progressPercent = data.duration > 0 
    ? Math.min(100, Math.max(0, (data.position / data.duration) * 100))
    : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex flex-col h-full">
        {/* Main content with album art and text */}
        <div className="flex flex-col items-center gap-6 mb-6 flex-1">
          {/* Album Art */}
          <div 
            className="relative w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
            style={{
              backgroundImage: data.albumArt ? `url(${data.albumArt})` : 'none',
              backgroundColor: data.albumArt ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            aria-label={`Album art for ${data.title} by ${data.artist}`}
          >
            {!data.albumArt && (
              <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white/20">
                music_note
              </span>
            )}
          </div>

          {/* Track Info */}
          <div className="w-full text-center">
            <h2 
              className="text-white font-light leading-tight mb-1 break-words px-2"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                fontFamily: 'Comfortaa, sans-serif',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {data.title}
            </h2>
            <p 
              className="text-white/70 text-lg mb-4 break-words"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 300,
                letterSpacing: '0.01em'
              }}
            >
              {data.artist}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-1">
            <div 
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(data.position)}</span>
            <span>{formatTime(data.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-2">
          <button className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors">
            <span className="material-symbols-outlined text-2xl">
              {data.isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

