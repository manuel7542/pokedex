import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })
        const user = await response.json();
        if (user && user.token) {
          return user;
        }
        throw new Error(user.message);
      }
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session = token.user as any;
        return session;
      }
      return session;
    }
  }
});