'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
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
    extensions: [StarterKit, TextStyle, Color, FontFamily],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div className="flex flex-col gap-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-white/70 border-b-2 rounded-t-2xl"
        style={{ borderColor: '#ffe4ef' }}>

        <button
          onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
          className={`w-7 h-7 rounded-full text-sm font-extrabold border-2 transition-colors ${editor.isActive('bold') ? 'bg-pink-200 border-pink-400' : 'border-transparent hover:border-pink-200'}`}
          style={{ color: '#c96ca3' }}>
          B
        </button>
        <button
          onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
          className={`w-7 h-7 rounded-full text-sm italic border-2 transition-colors ${editor.isActive('italic') ? 'bg-pink-200 border-pink-400' : 'border-transparent hover:border-pink-200'}`}
          style={{ color: '#c96ca3' }}>
          I
        </button>
        <button
          onMouseDown={e => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
          className={`w-7 h-7 rounded-full text-sm border-2 transition-colors ${editor.isActive('strike') ? 'bg-pink-200 border-pink-400' : 'border-transparent hover:border-pink-200'}`}
          style={{ color: '#c96ca3', textDecoration: 'line-through' }}>
          S
        </button>

        <div className="w-px h-4 bg-pink-200 mx-0.5" />

        <select
          onMouseDown={e => e.stopPropagation()}
          onChange={e => {
            editor.chain().focus().setFontFamily(e.target.value).run()
            onDecorationChange({ font: e.target.value })
          }}
          value={decoration.font}
          className="px-2 py-0.5 rounded-full border-2 text-xs outline-none cursor-pointer"
          style={{ borderColor: '#ffb3d1', color: '#9b6b9b', maxWidth: 110 }}
        >
          {FONTS.map(f => (
            <option key={f.id} value={f.value}>{f.label}</option>
          ))}
        </select>

        <div className="w-px h-4 bg-pink-200 mx-0.5" />

        <div className="flex gap-1 items-center flex-wrap">
          {TEXT_COLORS.map(c => (
            <button
              key={c}
              onMouseDown={e => { e.preventDefault(); editor.chain().focus().setColor(c).run() }}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-125"
              style={{
                background: c,
                borderColor: editor.isActive('textStyle', { color: c }) ? '#333' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>

      {/* Editable area — no extra wrapper, sits inside the entry card */}
      <div
        className="tiptap-editor"
        style={{ fontFamily: decoration.font, color: decoration.textColor }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
