import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import moment from 'moment'
import { Link } from 'lucide-react'
import { headers } from 'next/headers'
import { votes } from '@prisma/client'
import DeleteButton from '@/components/DeleteButton'
import NextLink from 'next/link'

const getVotes = async () => {
  const res = await fetch('http://localhost:3000/api/votes', {
    method: 'GET',
    headers: headers(),
  })

  if (!res.ok) {
    throw new Error(await res.json())
  }

  return res.json()
}

const YourVoterSection = async () => {
  const votes: votes[] = await getVotes()

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Your Vote:</h1>

      <div className="w-full overflow-x-auto p-3">
        <Table>
          <TableCaption>A list of your voters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Voting Name</TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Start Vote</TableHead>
              <TableHead>End Vote</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {votes.map((vote, index) => (
              <TableRow key={vote.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{vote.title}</TableCell>
                <TableCell>
                  {vote.candidates.map((candidate: any, index: number) => (
                    <span key={index}>
                      {candidate.name +
                        (index < vote.candidates.length - 1 ? ' vs ' : '')}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="font-bold">{vote.code}</TableCell>
                <TableCell>
                  {moment(vote.start_vote).format('DD MMM YYYY hh:mm A')}
                </TableCell>
                <TableCell>
                  {moment(vote.end_vote).format('DD MMM YYYY hh:mm A')}
                </TableCell>
                <TableCell>
                  <span className="flex gap-2">
                    <NextLink href={`/vote/${vote.code}`}>
                      <Link size={16} className="cursor-pointer" />
                    </NextLink>
                    <DeleteButton code={vote.code} />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default YourVoterSection
