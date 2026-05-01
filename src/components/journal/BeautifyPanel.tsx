'use client'

import { motion } from 'framer-motion'
import { EntryDecoration } from '@/types'
import { BACKGROUNDS, WASHI_PATTERNS } from '@/lib/stickers'

const BORDER_STYLES = [
  { id: 'none', label: 'None', value: 'transparent' },
  { id: 'pink', label: 'Pink', value: '#ffb3d1' },
  { id: 'purple', label: 'Purple', value: '#d4b8ff' },
  { id: 'mint', label: 'Mint', value: '#b8f0e0' },
  { id: 'peach', label: 'Peach', value: '#ffd4b3' },
  { id: 'gold', label: 'Gold', value: '#ffd700' },
]

interface BeautifyPanelProps {
  decoration: EntryDecoration
  onChange: (d: Partial<EntryDecoration>) => void
}

export default function BeautifyPanel({ decoration, onChange }: BeautifyPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Background */}
      <section>
        <h3 className="text-sm font-bold mb-2" style={{ color: '#9b6b9b' }}>Background 🎨</h3>
        <div className="flex flex-wrap gap-2">
          {BACKGROUNDS.map(bg => (
            <motion.button
              key={bg.id}
              onClick={() => onChange({ background: bg.value })}
              className="w-8 h-8 rounded-full border-2 transition-transform"
              style={{
                background: bg.value,
                borderColor: decoration.background === bg.value ? '#c96ca3' : '#ffb3d1',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={bg.label}
            />
          ))}
        </div>
      </section>

      {/* Border color */}
      <section>
        <h3 className="text-sm font-bold mb-2" style={{ color: '#9b6b9b' }}>Border 🖼️</h3>
        <div className="flex flex-wrap gap-2">
          {BORDER_STYLES.map(b => (
            <motion.button
              key={b.id}
              onClick={() => onChange({ borderColor: b.value })}
              className="w-8 h-8 rounded-full border-2"
              style={{
                background: b.value === 'transparent' ? 'white' : b.value,
                borderColor: decoration.borderColor === b.value ? '#c96ca3' : '#ffb3d1',
                backgroundImage: b.value === 'transparent' ? 'repeating-linear-gradient(45deg, #ddd 0, #ddd 2px, transparent 2px, transparent 8px)' : undefined,
              }}
              whileHover={{ scale: 1.15 }}
              title={b.label}
            />
          ))}
        </div>
      </section>

      {/* Washi tape top */}
      <section>
        <h3 className="text-sm font-bold mb-2" style={{ color: '#9b6b9b' }}>Washi Tape 🎀</h3>
        <div className="flex flex-wrap gap-2">
          {WASHI_PATTERNS.map(w => (
            <motion.button
              key={w.id}
              onClick={() => {
                const existing = decoration.washiTape ?? []
                const hasTop = existing.find(t => t.position === 'top')
                const updated = hasTop
                  ? existing.map(t => t.position === 'top' ? { ...t, color: w.color, pattern: w.pattern } : t)
                  : [...existing, { id: `washi-top`, color: w.color, pattern: w.pattern, position: 'top' as const }]
                onChange({ washiTape: updated })
              }}
              className="h-6 w-12 rounded-sm border-2 relative overflow-hidden"
              style={{
                background: w.color,
                borderColor: '#ffb3d1',
                opacity: w.id === 'none' ? 0.4 : 1,
              }}
              title={w.label}
              whileHover={{ scale: 1.1 }}
            >
              {w.pattern === 'dots' && <span className="absolute inset-0 flex items-center justify-center text-xs opacity-60">···</span>}
              {w.pattern === 'stars' && <span className="absolute inset-0 flex items-center justify-center text-xs">✦✦</span>}
            </motion.button>
          ))}
        </div>
        <p className="text-xs mt-1" style={{ color: '#c4a0c4' }}>Applied to top of entry</p>
      </section>
    </div>
  )
}
