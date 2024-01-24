'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import GoogleSVG from '@/assets/google.svg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-5 py-52">
      <h1 className="text-4xl font-bold">Pollify</h1>
      <Button
        onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
        variant="outline"
        className="w-1/4 space-x-2"
      >
        <Image src={GoogleSVG} width={20} height={20} alt="google icon" />
        <span>Login With Google</span>
      </Button>
    </main>
  )
}

export default Page
