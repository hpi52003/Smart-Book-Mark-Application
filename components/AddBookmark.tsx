'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmark({ user }: any) {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')   // no default Learning
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = ['Learning', 'Work', 'Personal']

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

    // validation
    if (!title || !url || !tag) {
      setMessage('⚠️ Please fill Title, URL and Category')
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

    // success
    setMessage('✅ Bookmark added successfully!')
    setTitle('')
    setUrl('')
    setTag('')          // reset category
    setLoading(false)
  }

  return (
    <div className="mb-6 space-y-3">

      {message && (
        <div className="text-sm font-medium">
          {message}
        </div>
      )}

      {/* Title */}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />

      {/* URL */}
      <input
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full rounded"
      />

      {/* Select Category Dropdown */}
<div className="relative" ref={dropdownRef}>

  {/* Input box */}
  <div
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="border w-full rounded px-3 py-2 bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 transition"
  >
    <span className={`${tag ? 'text-black' : 'text-gray-400'}`}>
      {tag || 'Select Category'}
    </span>

    {/* Arrow Icon */}
    <svg
      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
        dropdownOpen ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {/* Dropdown menu */}
  {dropdownOpen && (
    <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden">

      {categories.map((c) => (
        <div
          key={c}
          onClick={() => {
            setTag(c)
            setDropdownOpen(false)
          }}
          className={`px-3 py-2 cursor-pointer transition-colors
            ${tag === c
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          {c}
        </div>
      ))}

    </div>
  )}
</div>

      {/* Add Button */}
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
     
       
     
