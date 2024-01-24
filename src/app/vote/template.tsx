import Header from '@/components/Header'
import React from 'react'

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Template
