'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
      else setUser(data.user)
    })
  }, [])

  if (!user) return null

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
      <AddBookmark user={user} />
      <BookmarkList user={user} />
    </main>
  )
}
