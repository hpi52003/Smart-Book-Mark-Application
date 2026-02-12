'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        fetchBookmarks
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  const remove = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  const visible =
    filter === 'All'
      ? bookmarks
      : bookmarks.filter(b => b.tag === filter)

  return (
    <>
      <div className="flex gap-2 mb-4">
        {['All', 'Learning', 'Work', 'Personal'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 border rounded ${
              filter === t ? 'bg-black text-white' : ''
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {visible.map(b => (
          <li key={b.id} className="border p-3 rounded">
            <div className="font-semibold">{b.title}</div>
            <a href={b.url} className="text-blue-600 text-sm">
              {b.url}
            </a>
            <div className="flex justify-between mt-2">
              <span className="text-xs bg-gray-200 px-2 rounded">
                {b.tag}
              </span>
              <button
                onClick={() => remove(b.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
