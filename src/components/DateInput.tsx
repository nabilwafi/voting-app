import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default React.forwardRef<DatePicker, ReactDatePickerProps>(
  function DateInput({ className, ...props }, ref) {
    return (
      <DatePicker
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
