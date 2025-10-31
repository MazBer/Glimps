import type { MediaData } from '../types'

interface MediaWidgetProps {
  data: MediaData | null
}

export default function MediaWidget({ data }: MediaWidgetProps) {
  if (!data) {
    return (
      <div className="widget-card rounded-xl p-6">
        <p className="text-white/70">No media playing</p>
      </div>
    )
  }

  const progressPercent = data.duration > 0 
    ? (data.position / data.duration) * 100 
    : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="widget-card rounded-xl p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 overflow-hidden">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
            style={{ backgroundImage: data.albumArt ? `url(${data.albumArt})` : 'none' }}
            aria-label={`Album art for ${data.title} by ${data.artist}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-lg font-bold leading-tight truncate">{data.title}</p>
            <p className="text-[#92c0c9] text-base font-normal leading-normal truncate">{data.artist}</p>
          </div>
        </div>

        <div className="pt-1.5">
          <div className="flex h-4 items-center justify-center gap-1">
            <div 
              className="h-1.5 flex-1 rounded-full bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="relative">
              <div className="absolute -left-2 -top-2 size-4 rounded-full bg-primary ring-2 ring-background-dark" />
            </div>
            <div 
              className="h-1.5 flex-1 rounded-full bg-primary/30"
              style={{ width: `${100 - progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-[#92c0c9] text-xs font-medium leading-normal tracking-[0.015em]">
              {formatTime(data.position)}
            </p>
            <p className="text-[#92c0c9] text-xs font-medium leading-normal tracking-[0.015em]">
              {formatTime(data.duration)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button className="flex shrink-0 items-center justify-center rounded-full text-white/80 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-4xl">skip_previous</span>
          </button>
          <button className="flex shrink-0 items-center justify-center rounded-full size-14 bg-primary text-background-dark shadow-[0_0_12px_rgba(19,200,236,0.5)]">
            <span className="material-symbols-outlined text-4xl">
              {data.isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="flex shrink-0 items-center justify-center rounded-full text-white/80 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-4xl">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

