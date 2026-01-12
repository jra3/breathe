import { useState } from 'react'

const TIMERS = [
  { id: 'box', name: 'Box Breathing', pattern: '4-4-4-4', description: 'Equal inhale, hold, exhale, hold' },
  { id: '478', name: '4-7-8 Relaxing', pattern: '4-7-8', description: 'Calming breath for sleep' },
  { id: 'calm', name: 'Calming Breath', pattern: '4-6', description: 'Simple inhale-exhale flow' },
  { id: 'energy', name: 'Energizing', pattern: '2-2', description: 'Quick awakening breath' },
  { id: 'deep', name: 'Deep Relaxation', pattern: '4-7-8', description: 'Extended exhale focus' },
]

function App() {
  const [selectedTimer, setSelectedTimer] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-light tracking-wide mb-2">breathe</h1>
          <p className="text-slate-400">Guided breathing for calm and focus</p>
        </header>

        {!selectedTimer ? (
          <div className="grid gap-4 max-w-md mx-auto">
            {TIMERS.map((timer) => (
              <button
                key={timer.id}
                onClick={() => setSelectedTimer(timer)}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium">{timer.name}</h2>
                  <span className="text-slate-400 font-mono text-sm">{timer.pattern}</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{timer.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={() => setSelectedTimer(null)}
              className="mb-8 text-slate-400 hover:text-white transition-colors"
            >
              ← Back to timers
            </button>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-80 animate-pulse" />
              <h2 className="text-2xl mt-8">{selectedTimer.name}</h2>
              <p className="text-slate-400 mt-2">Timer coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
