'use client'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: '/dashboard' }
    })
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <button
        onClick={login}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Sign in with Google
      </button>
    </main>
  )
}
