import { useBreathTimer } from '../hooks/useBreathTimer'
import { BreathCircle } from '../components/BreathCircle'

const BOX_PATTERN = {
  inhale: 4,
  holdIn: 4,
  exhale: 4,
  holdOut: 4,
}

export function BoxBreathing({ onBack }) {
  const {
    isRunning,
    currentPhase,
    phaseLabel,
    timeInPhase,
    phaseDuration,
    progress,
    cycles,
    start,
    pause,
    reset,
  } = useBreathTimer(BOX_PATTERN)

  const timeRemaining = Math.ceil(phaseDuration - timeInPhase)

  return (
    <div className="flex flex-col items-center">
      {/* Back button */}
      <button
        onClick={() => {
          reset()
          onBack()
        }}
        className="self-start mb-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to timers
      </button>

      {/* Title */}
      <h2 className="text-2xl font-light mb-2">Box Breathing</h2>
      <p className="text-slate-400 text-sm mb-8">4-4-4-4 pattern</p>

      {/* Breath circle */}
      <div className="mb-8">
        <BreathCircle
          phase={currentPhase}
          progress={progress}
          isRunning={isRunning}
        />
      </div>

      {/* Phase label and countdown */}
      <div className="text-center mb-8">
        <p className="text-3xl font-light mb-2">{phaseLabel}</p>
        {isRunning && (
          <p className="text-6xl font-extralight tabular-nums">{timeRemaining}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-lg"
          >
            {cycles > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-lg"
          >
            Pause
          </button>
        )}

        {(cycles > 0 || timeInPhase > 0) && (
          <button
            onClick={reset}
            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-lg text-slate-400"
          >
            Reset
          </button>
        )}
      </div>

      {/* Cycle counter */}
      {cycles > 0 && (
        <p className="mt-8 text-slate-400">
          {cycles} cycle{cycles !== 1 ? 's' : ''} completed
        </p>
      )}

      {/* Pattern guide */}
      <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-sm">
        <h3 className="text-sm font-medium text-slate-300 mb-3">Pattern Guide</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
            <p className="font-medium">Inhale</p>
            <p className="text-lg mt-1">4s</p>
          </div>
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
            <p className="font-medium">Hold</p>
            <p className="text-lg mt-1">4s</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <p className="font-medium">Exhale</p>
            <p className="text-lg mt-1">4s</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
            <p className="font-medium">Hold</p>
            <p className="text-lg mt-1">4s</p>
          </div>
        </div>
      </div>
    </div>
  )
}
