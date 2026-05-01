'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import EntryEditor from '@/components/journal/EntryEditor'
import StickerPicker from '@/components/stickers/StickerPicker'
import BeautifyPanel from '@/components/journal/BeautifyPanel'
import { EntryDecoration, Sticker, StickerPlacement, WashiTape } from '@/types'

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
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function handleDecorationChange(partial: Partial<EntryDecoration>) {
    setDecoration(prev => ({ ...prev, ...partial }))
  }

  function handleAddSticker(sticker: Sticker) {
    const placement: StickerPlacement = {
      id: crypto.randomUUID(),
      stickerId: sticker.emoji,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      scale: 1,
      rotation: (Math.random() - 0.5) * 30,
    }
    setStickers(prev => [...prev, placement])
  }

  function removeSticker(id: string) {
    setStickers(prev => prev.filter(s => s.id !== id))
  }

  async function handleSave() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { error } = await supabase.from('entries').insert({
      user_id: user.id,
      title: title || 'Untitled entry',
      content,
      decoration,
      stickers,
    })

    if (!error) router.push('/journal')
    else { setSaving(false); alert('Something went wrong saving your entry 😢') }
  }

  const washiTop = decoration.washiTape?.find(w => w.position === 'top')

  return (
    <main className="min-h-screen pb-20" style={{ background: 'linear-gradient(135deg, #fff5f9 0%, #f0e8ff 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b-2 px-4 py-3 flex items-center justify-between"
        style={{ borderColor: '#ffb3d1' }}>
        <button onClick={() => router.back()} className="text-sm font-bold" style={{ color: '#b89ab8' }}>
          ← Back
        </button>
        <h1 className="text-xl" style={{ fontFamily: 'Pacifico, cursive', color: '#c96ca3' }}>New Entry ✨</h1>
        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-1.5 rounded-full text-white font-bold text-sm shadow"
          style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {saving ? 'Saving...' : 'Save 🌸'}
        </motion.button>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Entry title..."
          className="w-full text-2xl font-bold bg-transparent border-none outline-none mb-4 placeholder-pink-200"
          style={{ color: '#3d2c3e', fontFamily: decoration.font }}
        />

        {/* Entry card with washi tape */}
        <div className="relative rounded-2xl border-2 overflow-hidden shadow-md mb-4"
          style={{ borderColor: decoration.borderColor, background: decoration.background }}>

          {/* Washi tape top */}
          {washiTop && washiTop.color !== 'transparent' && (
            <div className="h-5 w-full opacity-80 flex items-center justify-center"
              style={{ background: washiTop.color }}>
              {washiTop.pattern === 'stars' && <span className="text-xs tracking-widest opacity-60">✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦</span>}
              {washiTop.pattern === 'dots' && <span className="text-xs tracking-widest opacity-60">· · · · · · · · · · · · ·</span>}
            </div>
          )}

          {/* Sticker layer */}
          {stickers.length > 0 && (
            <div className="relative h-0">
              {stickers.map(s => (
                <motion.div
                  key={s.id}
                  className="absolute cursor-pointer select-none z-10"
                  style={{
                    left: `${s.x}%`,
                    top: 8,
                    transform: `rotate(${s.rotation}deg) scale(${s.scale})`,
                    fontSize: '2rem',
                  }}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: s.scale * 1.2 }}
                  whileTap={{ scale: s.scale * 0.9 }}
                  onDoubleClick={() => removeSticker(s.id)}
                  title="Double-click to remove"
                >
                  {s.stickerId}
                </motion.div>
              ))}
            </div>
          )}

          <div className="p-2">
            <EntryEditor
              content={content}
              decoration={decoration}
              onChange={setContent}
              onDecorationChange={handleDecorationChange}
            />
          </div>
        </div>

        {stickers.length > 0 && (
          <p className="text-xs text-center mb-3" style={{ color: '#c4a0c4' }}>
            Double-click a sticker to remove it ✨
          </p>
        )}

        {/* Bottom toolbar */}
        <div className="flex gap-2 mb-4">
          <motion.button
            onClick={() => setActivePanel(activePanel === 'stickers' ? null : 'stickers')}
            className={`flex-1 py-2 rounded-full font-bold text-sm border-2 transition-colors ${activePanel === 'stickers' ? 'bg-pink-100' : 'bg-white'}`}
            style={{ borderColor: '#ffb3d1', color: '#c96ca3' }}
            whileTap={{ scale: 0.97 }}
          >
            🎀 Stickers
          </motion.button>
          <motion.button
            onClick={() => setActivePanel(activePanel === 'beautify' ? null : 'beautify')}
            className={`flex-1 py-2 rounded-full font-bold text-sm border-2 transition-colors ${activePanel === 'beautify' ? 'bg-pink-100' : 'bg-white'}`}
            style={{ borderColor: '#ffb3d1', color: '#c96ca3' }}
            whileTap={{ scale: 0.97 }}
          >
            ✨ Beautify
          </motion.button>
        </div>

        {/* Slide-in panels */}
        <AnimatePresence>
          {activePanel === 'stickers' && (
            <motion.div
              key="stickers"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <StickerPicker onSelect={handleAddSticker} />
            </motion.div>
          )}
          {activePanel === 'beautify' && (
            <motion.div
              key="beautify"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-white rounded-2xl border-2 p-4"
              style={{ borderColor: '#ffb3d1' }}
            >
              <BeautifyPanel decoration={decoration} onChange={handleDecorationChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
