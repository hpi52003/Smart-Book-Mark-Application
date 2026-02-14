'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmark({ user }: any) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('Learning')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const add = async () => {
    setMessage('')

    if (!title || !url) {
      setMessage('⚠️ Title and URL are required')
      return
    }

    if (!isValidUrl(url)) {
      setMessage('⚠️ Please enter a valid URL (include https://)')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        tag,
        user_id: user.id
      })

    if (error) {
      if (error.code === '23505') {
        setMessage('⚠️ You already added this URL!')
      } else {
        setMessage('❌ Error adding bookmark')
        console.error(error)
      }
      setLoading(false)
      return
    }

    setMessage('✅ Bookmark added successfully!')
    setTitle('')
    setUrl('')
    setLoading(false)
  }

  return (
    <div className="mb-6 space-y-3">
      {message && (
        <div className="text-sm font-medium">
          {message}
        </div>
      )}

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <input
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <select
        value={tag}
        onChange={e => setTag(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option>Learning</option>
        <option>Work</option>
        <option>Personal</option>
      </select>

      <button
        onClick={add}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </div>
  )
}
