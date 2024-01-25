import Countdown from '@/components/Countdown'
import { participant, votes } from '@prisma/client'
import { headers } from 'next/headers'
import React from 'react'
import CandidateForm from './CandidateForm'
import { VoteWithTotal } from '@/types/VoteWithTotal.types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params: { code },
}: {
  params: { code: string }
}): Promise<Metadata> {
  const res = await fetch(`http://localhost:3000/api/votes/${code}`, {
    headers: headers(),
  })

  const data: votes = await res.json()

  return {
    title: data ? data.title : 'NO TITLE',
  }
}

const getVote = async (code: string) => {
  const res = await fetch(`http://localhost:3000/api/votes/${code}`, {
    headers: headers(),
  })

  if (!res.ok) notFound()

  return res.json()
}

const getParticipant = async (code: string) => {
  const res = await fetch(`http://localhost:3000/api/participants/${code}`, {
    headers: headers(),
  })

  if (!res.ok) {
    throw new Error(await res.json())
  }

  return res.json()
}

const Page = async ({ params: { code } }: { params: { code: string } }) => {
  const vote: VoteWithTotal = await getVote(code)
  const participant: participant = await getParticipant(code)

  return (
    <main className="space-y-16 py-44">
      <h1 className="text-center text-4xl font-bold">{vote.title}</h1>

      <Countdown startDateTime={vote.start_vote} endDateTime={vote.end_vote} />

      {new Date(Date.now()) < new Date(vote.start_vote) && (
        <span className="bg-zinc-100 text-center">Wait Vote</span>
      )}

      {new Date(Date.now()) >= new Date(vote.start_vote) &&
        new Date(Date.now()) <= new Date(vote.end_vote) && (
          <CandidateForm vote={vote} code={code} participant={participant} />
        )}

      {new Date(Date.now()) > new Date(vote.end_vote) && (
        <span className="bg-zinc-100 text-center">Vote Ended</span>
      )}
    </main>
  )
}

export default Page
