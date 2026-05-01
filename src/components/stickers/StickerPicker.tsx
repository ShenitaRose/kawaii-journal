'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STICKER_PACKS } from '@/lib/stickers'
import { Sticker } from '@/types'

interface StickerPickerProps {
  onSelect: (sticker: Sticker) => void
}

export default function StickerPicker({ onSelect }: StickerPickerProps) {
  const [activePack, setActivePack] = useState(STICKER_PACKS[0].id)
  const pack = STICKER_PACKS.find(p => p.id === activePack)!

  return (
    <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#ffb3d1' }}>
      {/* Pack tabs */}
      <div className="flex overflow-x-auto border-b-2" style={{ borderColor: '#ffe4ef' }}>
        {STICKER_PACKS.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePack(p.id)}
            className={`px-3 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
              activePack === p.id ? 'bg-pink-100' : 'hover:bg-pink-50'
            }`}
            style={{ color: activePack === p.id ? '#c96ca3' : '#b89ab8' }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePack}
          className="grid grid-cols-6 gap-1 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {pack.stickers.map(sticker => (
            <motion.button
              key={sticker.id}
              onClick={() => onSelect(sticker)}
              className="text-2xl p-1.5 rounded-xl hover:bg-pink-50 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={sticker.name}
            >
              {sticker.emoji}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
