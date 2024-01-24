'use client'

import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="py-3">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Pollify</h1>
        </Link>

        {session ? (
          <div className="flex items-center gap-3">
            <p>{session.user?.name}</p>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </nav>
    </header>
  )
}

export default Header
