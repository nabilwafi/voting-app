'use client'

import React from 'react'
import CardParticipant from '@/components/CardParticipant'
import { participant, votes } from '@prisma/client'
import { FormProvider, useForm } from 'react-hook-form'
import { VoteCandidateAttribute, voteCandidateSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { VoteWithTotal } from '@/types/VoteWithTotal.types'

interface CandidateFormProps {
  vote: VoteWithTotal
  code: string
  participant: participant
}

const CandidateForm = ({ vote, code, participant }: CandidateFormProps) => {
  const { data: session } = useSession()
  const form = useForm<VoteCandidateAttribute>({
    resolver: zodResolver(voteCandidateSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (value: VoteCandidateAttribute) => {
    try {
      const res = await fetch(`/api/participants/${code}`, {
        method: 'POST',
        body: JSON.stringify(value),
      })

      if (!res.ok) {
        throw new Error(await res.json())
      }

      toast.success(await res.json())
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-12">
          {vote.candidates.map((candidate, index) => (
            <CardParticipant
              index={index}
              candidateName={candidate.name}
              key={index}
              percentage={candidate.votes}
              disabled={
                Boolean(participant) || session?.user?.email === vote.publisher
              }
              checked={participant && candidate.name === participant.candidate}
              value={candidate.name}
              id={candidate.name}
            />
          ))}
          <p className="mt-5 text-center text-red-500">
            {errors.candidate?.message}
          </p>

          <div className="text-center">
            {!session?.user?.email && Boolean(!participant) && (
              <Button type="submit">Submit Vote</Button>
            )}

            <div className="flex flex-col items-center justify-center gap-2">
              {Boolean(participant) && (
                <span className="bg-zinc-100 px-3 py-2">
                  You have already made your choice, and you are not allowed to
                  change your choice.
                </span>
              )}
              {session?.user?.email === vote?.publisher && (
                <span className="bg-zinc-100 px-3 py-2">
                  Voters cannot vote
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default CandidateForm
