export interface JournalEntry {
  id: string
  user_id: string
  title: string
  content: string
  decoration: EntryDecoration
  stickers: StickerPlacement[]
  created_at: string
  updated_at: string
}

export interface EntryDecoration {
  background: string
  backgroundType: 'color' | 'pattern'
  font: string
  textColor: string
  borderStyle: string
  borderColor: string
  washiTape: WashiTape[]
}

export interface WashiTape {
  id: string
  pattern: string
  position: 'top' | 'bottom' | 'left' | 'right'
  color: string
}

export interface StickerPlacement {
  id: string
  stickerId: string
  x: number
  y: number
  scale: number
  rotation: number
}

export interface Sticker {
  id: string
  name: string
  emoji: string
  pack: string
}

export interface StickerPack {
  id: string
  name: string
  stickers: Sticker[]
}
