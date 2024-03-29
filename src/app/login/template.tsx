import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const Template = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return <div>{children}</div>
}

export default Template
