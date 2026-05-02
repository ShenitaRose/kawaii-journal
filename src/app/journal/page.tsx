'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getEntries, deleteEntry } from '@/lib/storage'
import { JournalEntry } from '@/types'

function extractPreview(html: string): { image: string | null; text: string } {
  if (typeof window === 'undefined') return { image: null, text: '' }
  const div = document.createElement('div')
  div.innerHTML = html
  const img = div.querySelector('img')
  const image = img?.src ?? null
  img?.remove()
  const text = (div.textContent ?? '').trim().replace(/\s+/g, ' ')
  return { image, text }
}

function WashiStrip({ washiTape }: { washiTape: JournalEntry['decoration']['washiTape'] }) {
  const top = washiTape?.find(w => w.position === 'top')
  if (!top || top.color === 'transparent') return null
  return (
    <div className="h-4 w-full flex items-center justify-center overflow-hidden"
      style={{ background: top.color, opacity: 0.85 }}>
      <span className="text-[9px] tracking-[0.25em] opacity-50 select-none">
        {top.pattern === 'stars' && '✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦'}
        {top.pattern === 'dots' && '· · · · · · · · · · · · · · · · · · · ·'}
        {top.pattern === 'check' && '▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫'}
        {top.pattern === 'floral' && '❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿'}
        {top.pattern === 'stripe' && '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'}
      </span>
    </div>
  )
}

function EntryCard({ entry, index, onDelete }: { entry: JournalEntry; index: number; onDelete: (id: string) => void }) {
  const { image, text } = extractPreview(entry.content)
  const preview = text.slice(0, 120) + (text.length > 120 ? '…' : '')
  const date = new Date(entry.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl shadow-md border-2 overflow-hidden group flex flex-col"
      style={{
        background: entry.decoration?.background ?? '#fff',
        borderColor: entry.decoration?.borderColor ?? '#ffb3d1',
        fontFamily: entry.decoration?.font ?? 'Nunito, sans-serif',
      }}
    >
      <WashiStrip washiTape={entry.decoration?.washiTape} />

      {/* Cover image */}
      {image && (
        <div className="w-full h-36 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Card body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base leading-tight"
            style={{ color: '#3d2c3e' }}>
            {entry.title || 'Untitled entry'}
          </h3>
          {/* Action buttons — visible on hover */}
          <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/journal/${entry.id}`}>
              <button className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-500 font-bold hover:bg-pink-200 transition-colors">
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(entry.id)}
              className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-400 font-bold hover:bg-red-200 transition-colors"
            >✕</button>
          </div>
        </div>

        <p className="text-xs" style={{ color: '#c4a0c4' }}>{date}</p>

        {preview && (
          <p className="text-sm mt-1 leading-relaxed line-clamp-3" style={{ color: '#7a5c7a' }}>
            {preview}
          </p>
        )}

        {entry.stickers?.length > 0 && (
          <div className="flex gap-0.5 flex-wrap mt-2">
            {entry.stickers.slice(0, 6).map(s => (
              <span key={s.id} className="text-base">{s.stickerId}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  function handleDelete(id: string) {
    deleteEntry(id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return (
    <main className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b-2 px-6 py-3 flex items-center justify-between"
        style={{ borderColor: '#ffb3d1' }}>
        <h1 className="text-2xl" style={{ fontFamily: 'Pacifico, cursive', color: '#c96ca3' }}>
          Kawaii Journal ✨
        </h1>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#9b6b9b' }}>My Entries</h2>
            <p className="text-sm" style={{ color: '#b89ab8' }}>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <Link href="/journal/new">
            <motion.button
              className="px-6 py-2 rounded-full text-white font-bold shadow-md"
              style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              + New Entry 🌸
            </motion.button>
          </Link>
        </div>

        {entries.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-6xl mb-4">📖</p>
            <p className="text-xl font-bold mb-2" style={{ color: '#9b6b9b' }}>No entries yet!</p>
            <p className="mb-6" style={{ color: '#b89ab8' }}>Start writing your first kawaii journal entry ✨</p>
            <Link href="/journal/new">
              <motion.button
                className="px-8 py-3 rounded-full text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
                whileHover={{ scale: 1.05 }}
              >
                Write your first entry 🎀
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {entries.map((entry, i) => (
                <EntryCard key={entry.id} entry={entry} index={i} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
