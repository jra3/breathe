import { PHASES } from '../hooks/useBreathTimer'

const PHASE_COLORS = {
  [PHASES.INHALE]: {
    inner: 'from-cyan-400 to-blue-500',
    outer: 'from-cyan-400/30 to-blue-500/30',
    glow: 'shadow-cyan-500/50',
  },
  [PHASES.HOLD_IN]: {
    inner: 'from-purple-400 to-violet-500',
    outer: 'from-purple-400/30 to-violet-500/30',
    glow: 'shadow-purple-500/50',
  },
  [PHASES.EXHALE]: {
    inner: 'from-emerald-400 to-teal-500',
    outer: 'from-emerald-400/30 to-teal-500/30',
    glow: 'shadow-emerald-500/50',
  },
  [PHASES.HOLD_OUT]: {
    inner: 'from-amber-400 to-orange-500',
    outer: 'from-amber-400/30 to-orange-500/30',
    glow: 'shadow-amber-500/50',
  },
}

export function BreathCircle({ phase, progress, isRunning }) {
  // Calculate scale based on phase and progress
  const getScale = () => {
    if (!isRunning) return 0.6

    switch (phase) {
      case PHASES.INHALE:
        // Scale from 0.6 to 1.0
        return 0.6 + (progress * 0.4)
      case PHASES.HOLD_IN:
        // Stay at 1.0
        return 1.0
      case PHASES.EXHALE:
        // Scale from 1.0 to 0.6
        return 1.0 - (progress * 0.4)
      case PHASES.HOLD_OUT:
        // Stay at 0.6
        return 0.6
      default:
        return 0.6
    }
  }

  const scale = getScale()
  const colors = PHASE_COLORS[phase]

  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Outer glow ring */}
      <div
        className={`absolute rounded-full bg-gradient-to-br ${colors.outer} blur-xl transition-colors duration-500`}
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale * 1.2})`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Middle ring */}
      <div
        className={`absolute rounded-full bg-gradient-to-br ${colors.outer} transition-colors duration-500`}
        style={{
          width: '85%',
          height: '85%',
          transform: `scale(${scale})`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Inner circle */}
      <div
        className={`absolute rounded-full bg-gradient-to-br ${colors.inner} shadow-2xl ${colors.glow} transition-colors duration-500`}
        style={{
          width: '70%',
          height: '70%',
          transform: `scale(${scale})`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-white/80" />
    </div>
  )
}
