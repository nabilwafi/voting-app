import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { VoteCandidateAttribute } from '@/lib/validation'

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
    const participant = await prisma.participant.findFirst({
      where: {
        code,
        email: session.user?.email!,
      },
    })

    return NextResponse.json(participant, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went wrong, please try again', {
      status: 200,
    })
  }
}

export async function POST(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  const data: VoteCandidateAttribute = await req.json()

  try {
    await prisma.participant.create({
      data: {
        email: session.user?.email!,
        candidate: data.candidate,
        code,
      },
    })

    return NextResponse.json('Successfully choose candidate', {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went wrong, please try again', {
      status: 200,
    })
  }
}
