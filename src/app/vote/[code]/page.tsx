import Image from 'next/image'
import React from 'react'
import WrittingImage from '@/assets/create-vote-man-writting.png'
import UpdateVoteForm from './UpdateVoteForm'
import { headers } from 'next/headers'
import { votes } from '@prisma/client'

const getVote = async (code: string) => {
  const res = await fetch(`http://localhost:3000/api/votes/${code}`, {
    headers: headers(),
  })

  if (!res.ok) {
    throw new Error(await res.json())
  }

  return res.json()
}

const Page = async ({ params: { code } }: { params: { code: string } }) => {
  const vote: votes = await getVote(code)

  return (
    <main className="flex flex-col place-items-center space-y-10 py-24 md:place-items-start">
      <Image src={WrittingImage} alt="Create Vote" width={284} height={198} />

      <div className="space-y-3 text-center md:text-start">
        <h1 className="text-4xl font-bold">Update Voting</h1>
        <p className="text-muted-foreground">
          Please enter the required data before creating an online vote
        </p>
      </div>

      <UpdateVoteForm vote={vote} />
    </main>
  )
}

export default Page
