'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const floatingStickers = ['🌸', '⭐', '🍓', '🌈', '🎀', '🍑', '💫', '🌙', '🍰', '🦋']

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">

      {floatingStickers.map((sticker, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl select-none pointer-events-none"
          style={{ top: `${10 + (i * 9) % 80}%`, left: `${5 + (i * 17) % 90}%` }}
          animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {sticker}
        </motion.span>
      ))}

      <motion.div
        className="z-10 text-center max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-6xl mb-4"
          style={{ fontFamily: 'Pacifico, cursive', color: '#c96ca3' }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Kawaii Journal ✨
        </motion.h1>

        <p className="text-lg mb-2" style={{ color: '#9b6b9b', fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
          Your super cute personal diary 🌸
        </p>
        <p className="text-base mb-10" style={{ color: '#b89ab8', fontFamily: 'Nunito, sans-serif' }}>
          Decorate your entries with stickers, washi tape, pretty fonts and more!
        </p>

        <Link href="/journal">
          <motion.button
            className="px-10 py-3 rounded-full text-white font-bold text-lg shadow-lg"
            style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)', fontFamily: 'Nunito, sans-serif' }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201,108,163,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Open My Journal 🎀
          </motion.button>
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-around pb-4 px-8 pointer-events-none">
        {['🍓', '🌸', '⭐', '🎀', '🍑'].map((s, i) => (
          <motion.span key={i} className="text-2xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
            {s}
          </motion.span>
        ))}
      </div>
    </main>
  )
}
