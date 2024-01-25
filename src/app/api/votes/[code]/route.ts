import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Candidate } from '@prisma/client'
import { CandidateWithVote } from '@/types/VoteWithTotal.types'

export async function GET(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  try {
    const vote = await prisma.votes.findUnique({
      where: {
        code,
        publisher: session.user?.email!,
      },
    })

    if (!vote) {
      return NextResponse.json('Vote not found', {
        status: 404,
      })
    }

    const participants = await prisma.participant.findMany({
      select: {
        candidate: true,
        email: true,
        participateAt: true,
      },
      where: {
        code,
      },
    })

    let candidates: CandidateWithVote[] = []
    if (participants) {
      candidates = vote?.candidates.map((candidate) => {
        const votes =
          participants.filter(
            (participant) => participant.candidate === candidate.name
          ).length || 0
        return {
          ...candidate,
          votes,
        }
      }) as CandidateWithVote[]
    }

    const result = {
      ...vote,
      candidates: [...candidates],
      totalVotes: candidates
        ? candidates.reduce(
            (acc, candidate) => acc + (candidate.votes ? candidate.votes : 0),
            0
          )
        : 0,
    }

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went wrong, please try again', {
      status: 500,
    })
  }
}

export async function PUT(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  const data = await req.json()

  try {
    const votes = await prisma.votes.update({
      where: {
        publisher: session.user?.email!,
        code,
      },
      data,
    })

    return NextResponse.json('Successfully updated vote', {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went wrong, please try again', {
      status: 200,
    })
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  try {
    const votes = await prisma.votes.delete({
      where: {
        publisher: session.user?.email!,
        code,
      },
    })

    return NextResponse.json('Successfully delete vote', {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went wrong, please try again', {
      status: 200,
    })
  }
}
