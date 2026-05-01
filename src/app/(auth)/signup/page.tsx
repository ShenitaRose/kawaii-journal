'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/journal'), 2000)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #fff5f9 0%, #f0e8ff 100%)' }}>
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-2"
        style={{ borderColor: '#ffb3d1' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl text-center mb-1" style={{ fontFamily: 'Pacifico, cursive', color: '#c96ca3' }}>
          Join the fun! ✨
        </h1>
        <p className="text-center text-sm mb-6" style={{ color: '#b89ab8' }}>Create your kawaii journal account</p>

        {success ? (
          <motion.div className="text-center py-8" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-bold" style={{ color: '#c96ca3' }}>Account created! Redirecting...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: '#9b6b9b' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-full border-2 outline-none focus:border-pink-300 transition-colors"
                style={{ borderColor: '#ffb3d1', fontFamily: 'Nunito, sans-serif' }}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: '#9b6b9b' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 rounded-full border-2 outline-none focus:border-pink-300 transition-colors"
                style={{ borderColor: '#ffb3d1', fontFamily: 'Nunito, sans-serif' }}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              className="mt-2 py-3 rounded-full text-white font-bold text-lg"
              style={{ background: 'linear-gradient(135deg, #ff8fc2, #c96ca3)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating account...' : 'Create Account 🌸'}
            </motion.button>
          </form>
        )}

        <p className="text-center mt-4 text-sm" style={{ color: '#b89ab8' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-bold" style={{ color: '#c96ca3' }}>Log in 🎀</Link>
        </p>
      </motion.div>
    </main>
  )
}
