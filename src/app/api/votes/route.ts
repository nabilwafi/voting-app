import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { code } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  const votes = await prisma.votes.findMany({
    where: {
      publisher: session?.user?.email!,
    },
  })

  return NextResponse.json(votes, {
    status: 200,
  })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  const data = await request.json()

  try {
    await prisma.votes.create({
      data: { ...data, code: code(6) },
    })

    return NextResponse.json('Successfully Created Vote', {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json('something went error, please try again', {
      status: 500,
    })
  }
}
