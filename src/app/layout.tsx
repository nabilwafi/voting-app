import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Session } from 'next-auth'
import NextAuthProvider from '@/components/NextAuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Voting app',
    default: 'Voting App',
  },
  description: 'vote just in your hand',
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <div className="m-auto max-w-screen-xl px-2 py-3">
            {children}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
