'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [filter, setFilter] = useState('All')
  const [userId, setUserId] = useState<string | null>(null)

  // Wait for session properly
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    if (!userId) return

    fetchBookmarks(userId)

    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        () => {
          fetchBookmarks(userId)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const remove = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  const visible =
    filter === 'All'
      ? bookmarks
      : bookmarks.filter((b) => b.tag === filter)

  return (
    <>
      <div className="flex gap-2 mb-4">
        {['All', 'Learning', 'Work', 'Personal'].map((t) => (
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
        {visible.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            <div className="font-semibold">{b.title}</div>

            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm"
            >
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
