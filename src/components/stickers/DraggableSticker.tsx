'use client'

import { useMotionValue } from 'framer-motion'
import { motion } from 'framer-motion'
import { StickerPlacement } from '@/types'

interface DraggableStickerProps {
  sticker: StickerPlacement
  onMove: (id: string, x: number, y: number) => void
  onRemove: (id: string) => void
}

export default function DraggableSticker({ sticker, onMove, onRemove }: DraggableStickerProps) {
  const x = useMotionValue(sticker.x)
  const y = useMotionValue(sticker.y)

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        rotate: sticker.rotation,
        fontSize: '2.2rem',
        touchAction: 'none',
        zIndex: 10,
        cursor: 'grab',
        userSelect: 'none',
        lineHeight: 1,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => onMove(sticker.id, x.get(), y.get())}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      onDoubleClick={() => onRemove(sticker.id)}
      title="Drag to move · Double-click to remove"
    >
      {sticker.stickerId}
    </motion.div>
  )
}
