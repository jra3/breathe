import { PHASES } from '../hooks/useBreathTimer'

const PHASE_COLORS = {
  [PHASES.INHALE]: {
    inner: 'from-cyan-400 to-blue-500',
    outer: 'from-cyan-400/30 to-blue-500/30',
  },
  [PHASES.HOLD_IN]: {
    inner: 'from-purple-400 to-violet-500',
    outer: 'from-purple-400/30 to-violet-500/30',
  },
  [PHASES.EXHALE]: {
    inner: 'from-emerald-400 to-teal-500',
    outer: 'from-emerald-400/30 to-teal-500/30',
  },
  [PHASES.HOLD_OUT]: {
    inner: 'from-amber-400 to-orange-500',
    outer: 'from-amber-400/30 to-orange-500/30',
  },
}

const ALL_PHASES = [PHASES.INHALE, PHASES.HOLD_IN, PHASES.EXHALE, PHASES.HOLD_OUT]

// Duration of the color crossfade in ms
const COLOR_TRANSITION_MS = 600

export function BreathCircle({ phase, progress, isRunning }) {
  // Calculate scale based on phase and progress
  const getScale = () => {
    if (!isRunning) return 0.6

    switch (phase) {
      case PHASES.INHALE:
        return 0.6 + (progress * 0.4)
      case PHASES.HOLD_IN:
        return 1.0
      case PHASES.EXHALE:
        return 1.0 - (progress * 0.4)
      case PHASES.HOLD_OUT:
        return 0.6
      default:
        return 0.6
    }
  }

  const scale = getScale()

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Render all phase color layers, crossfade with opacity */}
      {ALL_PHASES.map((p) => {
        const colors = PHASE_COLORS[p]
        const isActive = p === phase

        return (
          <div key={p} className="absolute inset-0 flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className={`absolute rounded-full bg-gradient-to-br ${colors.outer} blur-xl`}
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${scale * 1.2})`,
                opacity: isActive ? 1 : 0,
                transition: `opacity ${COLOR_TRANSITION_MS}ms ease-in-out, transform 0.1s linear`,
              }}
            />

            {/* Middle ring */}
            <div
              className={`absolute rounded-full bg-gradient-to-br ${colors.outer}`}
              style={{
                width: '85%',
                height: '85%',
                transform: `scale(${scale})`,
                opacity: isActive ? 1 : 0,
                transition: `opacity ${COLOR_TRANSITION_MS}ms ease-in-out, transform 0.1s linear`,
              }}
            />

            {/* Inner circle */}
            <div
              className={`absolute rounded-full bg-gradient-to-br ${colors.inner} shadow-2xl`}
              style={{
                width: '70%',
                height: '70%',
                transform: `scale(${scale})`,
                opacity: isActive ? 1 : 0,
                transition: `opacity ${COLOR_TRANSITION_MS}ms ease-in-out, transform 0.1s linear`,
              }}
            />
          </div>
        )
      })}

      {/* Center dot - always visible */}
      <div className="absolute w-3 h-3 rounded-full bg-white/80 z-10" />
    </div>
  )
}
