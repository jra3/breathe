import { useState, useEffect, useCallback, useRef } from 'react'

export const PHASES = {
  INHALE: 'inhale',
  HOLD_IN: 'hold_in',
  EXHALE: 'exhale',
  HOLD_OUT: 'hold_out',
}

export const PHASE_LABELS = {
  [PHASES.INHALE]: 'Breathe In',
  [PHASES.HOLD_IN]: 'Hold',
  [PHASES.EXHALE]: 'Breathe Out',
  [PHASES.HOLD_OUT]: 'Hold',
}

export function useBreathTimer(pattern) {
  // pattern: { inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 }
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(PHASES.INHALE)
  const [timeInPhase, setTimeInPhase] = useState(0)
  const [cycles, setCycles] = useState(0)

  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)
  const phaseStartTimeRef = useRef(null)

  const getPhaseDuration = useCallback((phase) => {
    switch (phase) {
      case PHASES.INHALE: return pattern.inhale
      case PHASES.HOLD_IN: return pattern.holdIn
      case PHASES.EXHALE: return pattern.exhale
      case PHASES.HOLD_OUT: return pattern.holdOut
      default: return 0
    }
  }, [pattern])

  const getNextPhase = useCallback((phase) => {
    switch (phase) {
      case PHASES.INHALE: return pattern.holdIn > 0 ? PHASES.HOLD_IN : PHASES.EXHALE
      case PHASES.HOLD_IN: return PHASES.EXHALE
      case PHASES.EXHALE: return pattern.holdOut > 0 ? PHASES.HOLD_OUT : PHASES.INHALE
      case PHASES.HOLD_OUT: return PHASES.INHALE
      default: return PHASES.INHALE
    }
  }, [pattern])

  const tick = useCallback(() => {
    const now = Date.now()
    const elapsedInPhase = (now - phaseStartTimeRef.current) / 1000
    const phaseDuration = getPhaseDuration(currentPhase)

    if (elapsedInPhase >= phaseDuration) {
      // Move to next phase
      const nextPhase = getNextPhase(currentPhase)

      // Count cycle when returning to inhale
      if (nextPhase === PHASES.INHALE) {
        setCycles(c => c + 1)
      }

      setCurrentPhase(nextPhase)
      phaseStartTimeRef.current = now
      setTimeInPhase(0)
    } else {
      setTimeInPhase(elapsedInPhase)
    }
  }, [currentPhase, getPhaseDuration, getNextPhase])

  useEffect(() => {
    if (isRunning) {
      if (!phaseStartTimeRef.current) {
        phaseStartTimeRef.current = Date.now()
      }
      intervalRef.current = setInterval(tick, 50) // Update every 50ms for smooth animation
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, tick])

  const start = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }
    phaseStartTimeRef.current = Date.now() - (timeInPhase * 1000)
    setIsRunning(true)
  }, [timeInPhase])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setCurrentPhase(PHASES.INHALE)
    setTimeInPhase(0)
    setCycles(0)
    startTimeRef.current = null
    phaseStartTimeRef.current = null
  }, [])

  const phaseDuration = getPhaseDuration(currentPhase)
  const progress = phaseDuration > 0 ? timeInPhase / phaseDuration : 0

  return {
    isRunning,
    currentPhase,
    phaseLabel: PHASE_LABELS[currentPhase],
    timeInPhase,
    phaseDuration,
    progress,
    cycles,
    start,
    pause,
    reset,
  }
}
