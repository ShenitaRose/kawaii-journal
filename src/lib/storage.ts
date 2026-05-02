import { JournalEntry, EntryDecoration, StickerPlacement } from '@/types'

const KEY = 'kawaii-journal-entries'

export function getEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function getEntry(id: string): JournalEntry | null {
  return getEntries().find(e => e.id === id) ?? null
}

export function saveEntry(entry: Omit<JournalEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>): JournalEntry {
  const entries = getEntries()
  const now = new Date().toISOString()
  const newEntry: JournalEntry = {
    ...entry,
    id: crypto.randomUUID(),
    user_id: 'local',
    created_at: now,
    updated_at: now,
  }
  localStorage.setItem(KEY, JSON.stringify([newEntry, ...entries]))
  return newEntry
}

export function updateEntry(id: string, changes: Partial<Pick<JournalEntry, 'title' | 'content' | 'decoration' | 'stickers'>>): void {
  const entries = getEntries()
  const updated = entries.map(e =>
    e.id === id ? { ...e, ...changes, updated_at: new Date().toISOString() } : e
  )
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter(e => e.id !== id)
  localStorage.setItem(KEY, JSON.stringify(entries))
}
