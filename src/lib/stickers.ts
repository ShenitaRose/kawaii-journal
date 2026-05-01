import { StickerPack } from '@/types'

export const STICKER_PACKS: StickerPack[] = [
  {
    id: 'food',
    name: 'Yummy Food 🍓',
    stickers: [
      { id: 'f1', name: 'Strawberry', emoji: '🍓', pack: 'food' },
      { id: 'f2', name: 'Cake', emoji: '🍰', pack: 'food' },
      { id: 'f3', name: 'Donut', emoji: '🍩', pack: 'food' },
      { id: 'f4', name: 'Lollipop', emoji: '🍭', pack: 'food' },
      { id: 'f5', name: 'Ice Cream', emoji: '🍦', pack: 'food' },
      { id: 'f6', name: 'Peach', emoji: '🍑', pack: 'food' },
      { id: 'f7', name: 'Cherry', emoji: '🍒', pack: 'food' },
      { id: 'f8', name: 'Candy', emoji: '🍬', pack: 'food' },
      { id: 'f9', name: 'Croissant', emoji: '🥐', pack: 'food' },
      { id: 'f10', name: 'Boba', emoji: '🧋', pack: 'food' },
      { id: 'f11', name: 'Cupcake', emoji: '🧁', pack: 'food' },
      { id: 'f12', name: 'Macaroon', emoji: '🫧', pack: 'food' },
    ],
  },
  {
    id: 'nature',
    name: 'Pretty Nature 🌸',
    stickers: [
      { id: 'n1', name: 'Cherry Blossom', emoji: '🌸', pack: 'nature' },
      { id: 'n2', name: 'Rainbow', emoji: '🌈', pack: 'nature' },
      { id: 'n3', name: 'Star', emoji: '⭐', pack: 'nature' },
      { id: 'n4', name: 'Sparkles', emoji: '✨', pack: 'nature' },
      { id: 'n5', name: 'Moon', emoji: '🌙', pack: 'nature' },
      { id: 'n6', name: 'Sun', emoji: '☀️', pack: 'nature' },
      { id: 'n7', name: 'Snowflake', emoji: '❄️', pack: 'nature' },
      { id: 'n8', name: 'Leaf', emoji: '🍃', pack: 'nature' },
      { id: 'n9', name: 'Tulip', emoji: '🌷', pack: 'nature' },
      { id: 'n10', name: 'Sunflower', emoji: '🌻', pack: 'nature' },
      { id: 'n11', name: 'Butterfly', emoji: '🦋', pack: 'nature' },
      { id: 'n12', name: 'Cloud', emoji: '☁️', pack: 'nature' },
    ],
  },
  {
    id: 'animals',
    name: 'Cute Animals 🐱',
    stickers: [
      { id: 'a1', name: 'Cat', emoji: '🐱', pack: 'animals' },
      { id: 'a2', name: 'Bunny', emoji: '🐰', pack: 'animals' },
      { id: 'a3', name: 'Frog', emoji: '🐸', pack: 'animals' },
      { id: 'a4', name: 'Panda', emoji: '🐼', pack: 'animals' },
      { id: 'a5', name: 'Fox', emoji: '🦊', pack: 'animals' },
      { id: 'a6', name: 'Duck', emoji: '🐥', pack: 'animals' },
      { id: 'a7', name: 'Hamster', emoji: '🐹', pack: 'animals' },
      { id: 'a8', name: 'Unicorn', emoji: '🦄', pack: 'animals' },
      { id: 'a9', name: 'Penguin', emoji: '🐧', pack: 'animals' },
      { id: 'a10', name: 'Koala', emoji: '🐨', pack: 'animals' },
      { id: 'a11', name: 'Bear', emoji: '🐻', pack: 'animals' },
      { id: 'a12', name: 'Axolotl', emoji: '🦎', pack: 'animals' },
    ],
  },
  {
    id: 'vibes',
    name: 'Good Vibes 💫',
    stickers: [
      { id: 'v1', name: 'Bow', emoji: '🎀', pack: 'vibes' },
      { id: 'v2', name: 'Heart', emoji: '💖', pack: 'vibes' },
      { id: 'v3', name: 'Sparkle Heart', emoji: '💝', pack: 'vibes' },
      { id: 'v4', name: 'Dizzy', emoji: '💫', pack: 'vibes' },
      { id: 'v5', name: 'Crown', emoji: '👑', pack: 'vibes' },
      { id: 'v6', name: 'Gem', emoji: '💎', pack: 'vibes' },
      { id: 'v7', name: 'Magic', emoji: '🪄', pack: 'vibes' },
      { id: 'v8', name: 'Balloon', emoji: '🎈', pack: 'vibes' },
      { id: 'v9', name: 'Gift', emoji: '🎁', pack: 'vibes' },
      { id: 'v10', name: 'Party', emoji: '🎉', pack: 'vibes' },
      { id: 'v11', name: 'Music', emoji: '🎵', pack: 'vibes' },
      { id: 'v12', name: 'Rainbow Heart', emoji: '🌈', pack: 'vibes' },
    ],
  },
]

export const BACKGROUNDS = [
  { id: 'white', label: 'White', value: '#ffffff', type: 'color' as const },
  { id: 'pink', label: 'Blush Pink', value: '#fff0f5', type: 'color' as const },
  { id: 'lavender', label: 'Lavender', value: '#f5f0ff', type: 'color' as const },
  { id: 'mint', label: 'Mint', value: '#f0fff8', type: 'color' as const },
  { id: 'peach', label: 'Peach', value: '#fff5f0', type: 'color' as const },
  { id: 'sky', label: 'Sky Blue', value: '#f0f8ff', type: 'color' as const },
  { id: 'yellow', label: 'Butter', value: '#fffdf0', type: 'color' as const },
]

export const FONTS = [
  { id: 'nunito', label: 'Nunito', value: 'Nunito, sans-serif' },
  { id: 'quicksand', label: 'Quicksand', value: 'Quicksand, sans-serif' },
  { id: 'pacifico', label: 'Pacifico', value: 'Pacifico, cursive' },
  { id: 'georgia', label: 'Georgia', value: 'Georgia, serif' },
  { id: 'courier', label: 'Typewriter', value: 'Courier New, monospace' },
]

export const WASHI_PATTERNS = [
  { id: 'none', label: 'None', color: 'transparent', pattern: 'none' },
  { id: 'pink-dots', label: 'Pink Dots', color: '#ffb3d1', pattern: 'dots' },
  { id: 'purple-stripe', label: 'Purple Stripe', color: '#d4b8ff', pattern: 'stripe' },
  { id: 'mint-check', label: 'Mint Check', color: '#b8f0e0', pattern: 'check' },
  { id: 'yellow-star', label: 'Yellow Stars', color: '#fff0b3', pattern: 'stars' },
  { id: 'peach-floral', label: 'Peach Floral', color: '#ffd4b3', pattern: 'floral' },
]
