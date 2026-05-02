'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { saveEntry } from '@/lib/storage'
import EntryEditor from '@/components/journal/EntryEditor'
import StickerPicker from '@/components/stickers/StickerPicker'
import BeautifyPanel from '@/components/journal/BeautifyPanel'
import { EntryDecoration, Sticker, StickerPlacement } from '@/types'

const DEFAULT_DECORATION: EntryDecoration = {
  background: '#ffffff',
  backgroundType: 'color',
  font: 'Nunito, sans-serif',
  textColor: '#3d2c3e',
  borderStyle: 'solid',
  borderColor: '#ffb3d1',
  washiTape: [],
}

type Panel = 'stickers' | 'beautify' | null

export default function NewEntryPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [decoration, setDecoration] = useState<EntryDecoration>(DEFAULT_DECORATION)
  const [stickers, setStickers] = useState<StickerPlacement[]>([])
  const [activePanel, setActivePanel] = useState<Panel>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  function handleDecorationChange(partial: Partial<EntryDecoration>) {
    setDecoration(prev => ({ ...prev, ...partial }))
  }

  function handleAddSticker(sticker: Sticker) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setStickers(prev => [...prev, {
      id: crypto.randomUUID(),
      stickerId: sticker.emoji,
      // place roughly in the upper area of the card
      x: 40 + Math.random() * (rect.width - 100),
      y: 20 + Math.random() * 80,
      scale: 1,
      rotation: (Math.random() - 0.5) * 24,
    }])
  }

  function moveStickerBy(id: string, dx: number, dy: number) {
    setStickers(prev => prev.map(s =>
      s.id === id ? { ...s, x: s.x + dx, y: s.y + dy } : s
    ))
  }

  function handleSave() {
    saveEntry({ title: title || 'Untitled entry', content, decoration, stickers })
    router.push('/journal')
  }

  const washiTop = decoration.washiTape?.find(w => w.position === 'top')

  return (
    <main className="min-h-screen pb-24" >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b-2 px-4 py-3 flex items-center justify-between"
        style={{ borderColor: '#ffb3d1' }}>
        <button onClick={() => router.back()} className="text-sm font-bold" style={{ color: '#b89ab8' }}>← Back</button>
        <h1 className="text-xl" style={{ fontFamily: 'Pacifico, cursive', color: '#c96ca3' }}>New Entry ✨</h1>
        <motion.button
          onClick={handleSave}
          className="px-5 py-1.5 rounded-full text-white font-bold text-sm shadow"
          style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Save 🌸
        </motion.button>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 flex flex-col gap-4">

        {/* Entry card */}
        <div
          ref={cardRef}
          className="relative rounded-2xl border-2 overflow-hidden shadow-lg"
          style={{ borderColor: decoration.borderColor, background: decoration.background }}
        >
          {/* Washi tape strip */}
          {washiTop && washiTop.color !== 'transparent' && (
            <div className="h-6 w-full flex items-center justify-center overflow-hidden"
              style={{ background: washiTop.color, opacity: 0.85 }}>
              <span className="text-xs tracking-[0.3em] opacity-50 select-none">
                {washiTop.pattern === 'stars' && '✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦'}
                {washiTop.pattern === 'dots' && '· · · · · · · · · · · · · · · · · · · ·'}
                {washiTop.pattern === 'check' && '▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫'}
                {washiTop.pattern === 'floral' && '❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿'}
                {washiTop.pattern === 'stripe' && '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'}
              </span>
            </div>
          )}

          {/* Sticker overlay — sits above text, full card width */}
          {stickers.map(s => (
            <motion.div
              key={s.id}
              className="absolute cursor-grab active:cursor-grabbing select-none z-10"
              style={{
                left: s.x,
                top: s.y,
                fontSize: '2.2rem',
                rotate: s.rotation,
                touchAction: 'none',
              }}
              drag
              dragMomentum={false}
              dragElastic={0}
              onDragEnd={(_, info) => moveStickerBy(s.id, info.offset.x, info.offset.y)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onDoubleClick={() => setStickers(prev => prev.filter(st => st.id !== s.id))}
              title="Drag to move · Double-click to remove"
            >
              {s.stickerId}
            </motion.div>
          ))}

          {/* Date + title */}
          <div className="px-5 pt-4 pb-0">
            <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: '#c4a0c4' }}>{today}</p>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full text-xl font-bold bg-transparent border-none outline-none placeholder-pink-200 mb-1"
              style={{ color: '#3d2c3e', fontFamily: decoration.font }}
            />
            <div className="border-b-2 mb-0" style={{ borderColor: decoration.borderColor + '66' }} />
          </div>

          {/* Editor — toolbar + text area */}
          <EntryEditor
            content={content}
            decoration={decoration}
            onChange={setContent}
            onDecorationChange={handleDecorationChange}
          />
        </div>

        {stickers.length > 0 && (
          <p className="text-xs text-center -mt-2" style={{ color: '#c4a0c4' }}>
            Drag stickers to move them · Double-click to remove ✨
          </p>
        )}

        {/* Panel toggle buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={() => setActivePanel(activePanel === 'stickers' ? null : 'stickers')}
            className="flex-1 py-2.5 rounded-full font-bold text-sm border-2 transition-colors"
            style={{
              borderColor: '#ffb3d1',
              color: '#c96ca3',
              background: activePanel === 'stickers' ? '#ffe4ef' : 'white',
            }}
            whileTap={{ scale: 0.97 }}
          >
            🎀 Stickers
          </motion.button>
          <motion.button
            onClick={() => setActivePanel(activePanel === 'beautify' ? null : 'beautify')}
            className="flex-1 py-2.5 rounded-full font-bold text-sm border-2 transition-colors"
            style={{
              borderColor: '#ffb3d1',
              color: '#c96ca3',
              background: activePanel === 'beautify' ? '#ffe4ef' : 'white',
            }}
            whileTap={{ scale: 0.97 }}
          >
            ✨ Beautify
          </motion.button>
        </div>

        {/* Slide-in panels */}
        <AnimatePresence>
          {activePanel === 'stickers' && (
            <motion.div key="stickers"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              <StickerPicker onSelect={handleAddSticker} />
            </motion.div>
          )}
          {activePanel === 'beautify' && (
            <motion.div key="beautify"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}
              className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: '#ffb3d1' }}>
              <BeautifyPanel decoration={decoration} onChange={handleDecorationChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
