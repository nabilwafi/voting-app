import React from 'react'
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DialogSubmitProps {
  nameButton: string
  dialogTitle: string
  dialogDescription: string
  nameSubmit: string
  container: HTMLElement | null
}

const DialogSubmit = (props: DialogSubmitProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{props.nameButton}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {props.dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="ghost">Cancel</Button>
          </AlertDialogCancel>
          <Button type="submit">{props.nameSubmit}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogSubmit
