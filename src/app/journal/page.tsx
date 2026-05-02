'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getEntries, deleteEntry } from '@/lib/storage'
import { JournalEntry } from '@/types'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  function handleDelete(id: string) {
    deleteEntry(id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <main className="min-h-screen pb-16" style={{ background: 'linear-gradient(135deg, #fff5f9 0%, #f0e8ff 100%)' }}>
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
            <p className="text-sm" style={{ color: '#b89ab8' }}>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl shadow-md border-2 overflow-hidden group"
                  style={{
                    background: entry.decoration?.background ?? '#fff',
                    borderColor: entry.decoration?.borderColor ?? '#ffb3d1',
                  }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base truncate pr-2"
                        style={{ color: '#3d2c3e', fontFamily: entry.decoration?.font ?? 'Nunito, sans-serif' }}>
                        {entry.title || 'Untitled entry'}
                      </h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/journal/${entry.id}`}>
                          <button className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-500 font-bold">Edit</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-400 font-bold"
                        >✕</button>
                      </div>
                    </div>
                    <p className="text-xs mb-3" style={{ color: '#b89ab8' }}>{formatDate(entry.created_at)}</p>
                    {entry.stickers?.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-2">
                        {entry.stickers.slice(0, 5).map(s => (
                          <span key={s.id} className="text-lg">{s.stickerId}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
