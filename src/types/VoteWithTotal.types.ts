import { Candidate, votes } from '@prisma/client'

export interface CandidateWithVote extends Candidate {
  votes: number
}

export interface VoteWithTotal extends Omit<votes, 'candidates'> {
  candidates: CandidateWithVote[]
  totalVotes: number
}
