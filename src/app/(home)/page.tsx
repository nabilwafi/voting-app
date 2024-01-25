import { Button } from '@/components/ui/button'
import VoterImage from '@/assets/home-girl-looking-a-photo.png'
import Image from 'next/image'
import YourVoterSection from '@/app/(home)/YourVoterSection'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { headers } from 'next/headers'
import { votes } from '@prisma/client'

export async function generateMetadata() {
  return {
    title: 'Landing Page',
  }
}

const getVotes = async () => {
  const res = await fetch('http://localhost:3000/api/votes', {
    method: 'GET',
    headers: headers(),
  })

  return res.json()
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const votes: votes[] = await getVotes()

  return (
    <main className="space-y-28 py-44">
      <div className="flex flex-col place-items-center space-y-5 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Welcome to Pollify!</h1>

        <p className="max-w-[550px] text-lg text-accent-foreground">
          it&apos;s easier than ever to make your choice from the palm of your
          hand.{' '}
          <span className="rounded-md bg-yellow-200 p-1">
            Make your choice now and wherever you are!
          </span>
        </p>

        <Image
          src={VoterImage}
          width={300}
          height={300}
          alt="pollify homepage"
        />

        <div className="space-x-10">
          <Link href="/vote/create">
            <Button>Create Vote</Button>
          </Link>
          <Link href="/participant">
            <Button variant="outline">Join Vote</Button>
          </Link>
        </div>
      </div>

      {session && <YourVoterSection votes={votes} />}
    </main>
  )
}
