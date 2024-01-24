import Image from 'next/image'
import React from 'react'
import WrittingImage from '@/assets/create-vote-man-writting.png'
import CreateVoteForm from './CreateVoteForm'

const Page = () => {
  return (
    <main className="flex flex-col place-items-center space-y-10 py-24 md:place-items-start">
      <Image src={WrittingImage} alt="Create Vote" width={284} height={198} />

      <div className="space-y-3 text-center md:text-start">
        <h1 className="text-4xl font-bold">Create Voting</h1>
        <p className="text-muted-foreground">
          Please enter the required data before creating an online vote
        </p>
      </div>

      <CreateVoteForm />
    </main>
  )
}

export default Page
