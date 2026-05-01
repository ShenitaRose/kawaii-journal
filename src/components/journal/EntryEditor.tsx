'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { motion } from 'framer-motion'
import { EntryDecoration } from '@/types'
import { FONTS } from '@/lib/stickers'

const TEXT_COLORS = [
  '#3d2c3e', '#c96ca3', '#9b6b9b', '#6b6b9b', '#6b9b8a',
  '#c96c6c', '#9b8a3e', '#2c3e50', '#e74c3c', '#8e44ad',
]

interface EntryEditorProps {
  content: string
  decoration: EntryDecoration
  onChange: (content: string) => void
  onDecorationChange: (d: Partial<EntryDecoration>) => void
}

export default function EntryEditor({ content, decoration, onChange, onDecorationChange }: EntryEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div className="flex flex-col gap-3">
      {/* Formatting toolbar */}
      <div className="flex flex-wrap gap-2 p-3 rounded-2xl border-2 bg-white"
        style={{ borderColor: '#ffb3d1' }}>

        {/* Bold / Italic */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded-full text-sm font-bold border-2 transition-colors ${editor.isActive('bold') ? 'bg-pink-200 border-pink-400' : 'border-pink-200'}`}
          style={{ color: '#c96ca3' }}>
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded-full text-sm italic border-2 transition-colors ${editor.isActive('italic') ? 'bg-pink-200 border-pink-400' : 'border-pink-200'}`}
          style={{ color: '#c96ca3' }}>
          I
        </button>

        <div className="w-px bg-pink-200 mx-1" />

        {/* Font picker */}
        <select
          onChange={e => {
            editor.chain().focus().setFontFamily(e.target.value).run()
            onDecorationChange({ font: e.target.value })
          }}
          className="px-2 py-1 rounded-full border-2 text-sm outline-none"
          style={{ borderColor: '#ffb3d1', color: '#9b6b9b' }}
        >
          {FONTS.map(f => (
            <option key={f.id} value={f.value} style={{ fontFamily: f.value }}>{f.label}</option>
          ))}
        </select>

        <div className="w-px bg-pink-200 mx-1" />

        {/* Text color */}
        <div className="flex gap-1 items-center">
          {TEXT_COLORS.map(c => (
            <button
              key={c}
              onClick={() => editor.chain().focus().setColor(c).run()}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
              style={{ background: c, borderColor: editor.isActive('textStyle', { color: c }) ? '#333' : 'transparent' }}
            />
          ))}
        </div>
      </div>

      {/* Editor area */}
      <motion.div
        className="rounded-2xl border-2 overflow-hidden min-h-64 tiptap-editor"
        style={{
          background: decoration.background,
          borderColor: decoration.borderColor,
          fontFamily: decoration.font,
          color: decoration.textColor,
        }}
        whileFocus={{ boxShadow: '0 0 0 3px rgba(201,108,163,0.2)' }}
      >
        <EditorContent
          editor={editor}
          className="min-h-64 p-4"
        />
      </motion.div>
    </div>
  )
}
