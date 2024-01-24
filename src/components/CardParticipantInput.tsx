'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { CreateVoteAttribute } from '@/lib/validation'
import { X } from 'lucide-react'

interface CardParticipantInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  num: number
  register: UseFormRegister<CreateVoteAttribute>
  onRemove: () => void
  errors: FieldErrors<CreateVoteAttribute>
}

const CardParticipantInput = ({
  num,
  register,
  onRemove,
  errors,
  ...props
}: CardParticipantInput) => {
  return (
    <Card>
      <CardHeader className="flex flex-col">
        <button
          type="button"
          className="cursor-pointer self-end rounded-full p-2 hover:bg-gray-200"
          onClick={onRemove}
        >
          <X size={16} />
        </button>
        <h1 className="flex aspect-square w-1/2 items-center justify-center self-center rounded-full bg-zinc-200 text-center text-4xl">
          {num + 1}
        </h1>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Candidate Name</Label>
          <Input
            type="hidden"
            {...register(`candidates.${num}.key`)}
            value={num + 1}
          />
          <Input
            type="text"
            {...props}
            {...register(`candidates.${num}.name`)}
          />
          {errors.candidates && (
            <p className=" text-red-600">
              {errors.candidates?.[num]?.name?.message}
            </p>
          )}
          {errors.candidates && (
            <p className=" text-red-600">
              {errors.candidates?.[num]?.key?.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardParticipantInput
