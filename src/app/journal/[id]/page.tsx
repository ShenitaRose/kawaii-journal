'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getEntry } from '@/lib/storage'
import { JournalEntry } from '@/types'

export default function ViewEntryPage() {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const router = useRouter()

  useEffect(() => {
    const e = getEntry(id)
    if (!e) router.push('/journal')
    else setEntry(e)
  }, [id, router])

  if (!entry) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <motion.span className="text-5xl" animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}>🌸</motion.span>
      </main>
    )
  }

  const { decoration, stickers } = entry
  const washiTop = decoration?.washiTape?.find(w => w.position === 'top')
  const date = new Date(entry.created_at).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <main className="min-h-screen pb-16">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b-2 px-4 py-3 flex items-center justify-between"
        style={{ borderColor: '#ffb3d1' }}>
        <button onClick={() => router.push('/journal')} className="text-sm font-bold" style={{ color: '#b89ab8' }}>
          ← My Entries
        </button>
        <Link href={`/journal/${id}/edit`}>
          <motion.button
            className="px-5 py-1.5 rounded-full text-white font-bold text-sm shadow"
            style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Edit ✏️
          </motion.button>
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Entry card */}
        <div className="relative">
          {/* Stickers rendered at saved positions */}
          {stickers?.map(s => (
            <div
              key={s.id}
              className="absolute select-none pointer-events-none z-10"
              style={{
                left: s.x,
                top: s.y,
                fontSize: '2.2rem',
                lineHeight: 1,
                transform: `rotate(${s.rotation}deg) scale(${s.scale})`,
              }}
            >
              {s.stickerId}
            </div>
          ))}

          <div
            className="rounded-2xl border-2 overflow-hidden shadow-lg"
            style={{
              borderColor: decoration?.borderColor ?? '#ffb3d1',
              background: decoration?.background ?? '#fff',
            }}
          >
            {/* Washi tape */}
            {washiTop && washiTop.color !== 'transparent' && (
              <div className="h-6 w-full flex items-center justify-center overflow-hidden"
                style={{ background: washiTop.color, opacity: 0.85 }}>
                <span className="text-xs tracking-[0.3em] opacity-50 select-none">
                  {washiTop.pattern === 'stars' && '✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦'}
                  {washiTop.pattern === 'dots' && '· · · · · · · · · · · · · · · · · · · ·'}
                  {washiTop.pattern === 'check' && '▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫ ▪ ▫'}
                  {washiTop.pattern === 'floral' && '❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿ ❀ ✿'}
                  {washiTop.pattern === 'stripe' && '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'}
                </span>
              </div>
            )}

            {/* Date + title */}
            <div className="px-5 pt-4 pb-0">
              <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: '#c4a0c4' }}>{date}</p>
              <h1
                className="text-xl font-bold mb-1"
                style={{ color: '#3d2c3e', fontFamily: decoration?.font ?? 'Nunito, sans-serif' }}
              >
                {entry.title}
              </h1>
              <div className="border-b-2 mb-0" style={{ borderColor: (decoration?.borderColor ?? '#ffb3d1') + '66' }} />
            </div>

            {/* Content */}
            <div
              className="px-5 py-4 prose-entry"
              style={{
                fontFamily: decoration?.font ?? 'Nunito, sans-serif',
                color: decoration?.textColor ?? '#3d2c3e',
                lineHeight: 1.85,
                fontSize: '1rem',
              }}
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
