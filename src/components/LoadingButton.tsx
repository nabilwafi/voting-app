'use client'

import React, { ButtonHTMLAttributes } from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const LoadingButton = ({ loading, children, ...props }: LoadingButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button {...props} disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {(loading || pending) && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  )
}

export default LoadingButton
