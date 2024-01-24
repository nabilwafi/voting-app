import React, { InputHTMLAttributes, forwardRef } from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Input, InputProps } from './ui/input'
import { Label } from './ui/label'
import { Check } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { VoteCandidateAttribute } from '@/lib/validation'

interface CardParticipantProps extends InputHTMLAttributes<HTMLInputElement> {
  index: number
  candidateName: string
  percentage: number
  value: string
}

export default function CardParticipant({
  index,
  candidateName,
  percentage,
  value,
  ...props
}: CardParticipantProps) {
  const { register } = useFormContext<VoteCandidateAttribute>()

  return (
    <Card className="flex flex-row space-x-3 rounded-md border-zinc-200 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-200 text-center text-lg font-bold">
        {index + 1}
      </div>

      <div className="w-full space-y-3">
        <h1 className="text-2xl font-bold">{candidateName}</h1>
        <p className="text-muted-foreground">Candidate {index + 1}</p>

        <div className="flex flex-row items-center space-x-2">
          <Progress value={percentage} />
          <span className="text-slate-500">{percentage}%</span>
        </div>
      </div>

      <div className="relative w-24 overflow-hidden rounded-lg">
        <Input
          type="radio"
          className="peer hidden"
          {...register('candidate', { required: true })}
          {...props}
          id={props.id}
          value={value}
        />
        <Label
          htmlFor={props.id}
          className="absolute left-0 top-0 flex h-full w-full items-center justify-center peer-checked:bg-green-600"
        >
          <Check size={16} />
        </Label>
      </div>
    </Card>
  )
}
