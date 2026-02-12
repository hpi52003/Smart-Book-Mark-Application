'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmark({ user }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('Learning')

  const add = async () => {
    if (!title || !url) return

    await supabase.from('bookmarks').insert({
      title,
      url,
      tag,
      user_id: user.id
    })

    setTitle('')
    setUrl('')
  }

  return (
    <div className="mb-6 space-y-2">
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        placeholder="URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <select
        value={tag}
        onChange={e => setTag(e.target.value)}
        className="border p-2 w-full"
      >
        <option>Learning</option>
        <option>Work</option>
        <option>Personal</option>
      </select>
      <button
        onClick={add}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Bookmark
      </button>
    </div>
  )
}
