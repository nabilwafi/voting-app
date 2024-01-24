import nextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  secret: String(process.env.NEXTAUTH_SECRET),
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return session
    },
  },
}

const handler = nextAuth(authOptions)

export {
  handler as GET,
  handler as POST,
  handler as DELETE,
  handler as PUT,
  handler as PATCH,
}
