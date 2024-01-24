import { z } from 'zod'

const candidateSchema = z.object({
  name: z.string().min(1, 'required'),
  key: z.coerce.number(),
})

export type candidatesAttribute = z.infer<typeof candidateSchema>

const dateSchema = z
  .object({
    start_vote: z.date(),
    end_vote: z.date(),
  })
  .refine((data) => data.end_vote > data.start_vote, {
    message: 'End date vote cannot be earlier than start date.',
    path: ['end_vote'],
  })

export const createVoteSchema = z
  .object({
    title: z.string().min(1, 'title is required').max(100),
    candidates: z.array(candidateSchema).min(2, 'Please at least 2 candidates'),
  })
  .and(dateSchema)

export type CreateVoteAttribute = z.infer<typeof createVoteSchema>

export const voteCandidateSchema = z.object({
  candidate: z
    .string({
      invalid_type_error: 'required choose 1 candidate',
    })
    .min(1, 'required'),
})

export type VoteCandidateAttribute = z.infer<typeof voteCandidateSchema>
