'use client'

import AddParticipantInput from '@/components/AddParticipantInput'
import CardParticipantInput from '@/components/CardParticipantInput'
import DateInput from '@/components/DateInput'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateVoteAttribute, createVoteSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import LoadingButton from '@/components/LoadingButton'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const CreateVoteForm = () => {
  const { data: session } = useSession()

  const form = useForm<CreateVoteAttribute>({
    resolver: zodResolver(createVoteSchema),
    defaultValues: {
      start_vote: new Date(),
      end_vote: new Date(),
      candidates: [{ name: '' }],
    },
  })

  const {
    handleSubmit,
    watch,
    register,
    control,
    formState: { isSubmitting, errors },
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidates',
    rules: {
      required: 'Please append at least 2 candidate',
    },
  })

  const onSubmit = async (values: CreateVoteAttribute) => {
    try {
      const res = await fetch('/api/votes', {
        method: 'post',
        body: JSON.stringify({ ...values, publisher: session?.user?.email }),
      })

      if (!res.ok) {
        throw new Error(await res.json())
      }

      toast.success(await res.json())
      redirect('/')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Detail Voting</h1>

      <Form {...form}>
        <form
          className="w-full space-y-5"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="e.g. President Voting"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h1 className="text-md font-semibold">When Does Voting Start?</h1>
              <div className="flex items-center justify-between">
                <FormField
                  control={control}
                  name="start_vote"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <DateInput
                            placeholderText="Select Start Date"
                            wrapperClassName="w-full"
                            showTimeSelect
                            dateFormat="Pp"
                            selected={field.value}
                            minDate={new Date()}
                            onChange={(date) => date && field.onChange(date)}
                          />
                          <span className="mx-2">until</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="end_vote"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <DateInput
                          placeholderText="Select End Date"
                          wrapperClassName="w-full"
                          showTimeSelect
                          dateFormat="Pp"
                          selected={field.value}
                          minDate={watch('start_vote')}
                          onChange={(date) => date && field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {fields.map((item, index) => (
                <CardParticipantInput
                  register={register}
                  num={index}
                  key={index}
                  errors={errors}
                  onRemove={() => remove(index)}
                />
              ))}
              <AddParticipantInput
                onAppend={() =>
                  append({
                    name: '',
                    key: 0,
                  })
                }
              />
            </div>
            {errors.candidates && (
              <p className=" text-red-600">
                {errors.candidates?.root?.message}
              </p>
            )}
          </div>

          <LoadingButton loading={isSubmitting} type="submit">
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}

export default CreateVoteForm
