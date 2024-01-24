'use client'

import Image from 'next/image'
import React, { SyntheticEvent, useState } from 'react'
import ParticipantImage from '@/assets/participant.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { votes } from '@prisma/client'

const Page = () => {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/votes/${code}`)

      if (!res.ok) {
        throw new Error(await res.json())
      }

      const data: votes = await res.json()

      router.push(`/participant/${data.code}`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-5">
      <Image
        src={ParticipantImage}
        width={300}
        height={300}
        alt="participant image"
      />
      <h1 className="text-center text-4xl font-bold">Ikutan Voting</h1>

      <p className="w-1/2 text-center text-muted-foreground">
        Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
        berikan panitia/penyelenggara
      </p>

      <div className="flex w-1/3 flex-col gap-3">
        <form onSubmit={handleSubmit} className="space-y-3" method="POST">
          <Input
            type="text"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Please Input Vote Code"
          />
          <Button type="submit" className="w-full">
            Submit Code
          </Button>
        </form>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Back
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default Page
