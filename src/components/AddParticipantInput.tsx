import { Plus } from 'lucide-react'
import React from 'react'

interface AddParticipantInputProps {
  onAppend: () => void
}

const AddParticipantInput = (props: AddParticipantInputProps) => {
  return (
    <div
      className="flex aspect-square md:w-1/2 cursor-pointer flex-col items-center justify-center bg-zinc-100 text-zinc-400 hover:bg-zinc-800 hover:text-white"
      onClick={props.onAppend}
    >
      <Plus size={20} />
      <span className="text-sm">Add Candidate</span>
    </div>
  )
}

export default AddParticipantInput
