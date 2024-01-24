'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

interface DeleteButtonProps {
  code: string
}

const DeleteButton = ({ code }: DeleteButtonProps) => {
  const router = useRouter()

  const handleClick = async (code: string) => {
    try {
      const res = await fetch(`/api/votes/${code}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error(await res.json())
      }

      router.refresh()
      toast.success(await res.json())
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Trash2
      onClick={() => handleClick(code)}
      size={16}
      className="cursor-pointer text-red-500"
    />
  )
}

export default DeleteButton
