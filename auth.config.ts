import type { NextAuthConfig } from 'next-auth';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
} as const;

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = Boolean(auth?.user);
      const isLoginPage = nextUrl.pathname.includes(ROUTES.LOGIN);

      // Grant access to the login page for unauthenticated users, ensuring they can log in.
      if (isLoginPage && !isAuthenticated) {
        return true;
      }

      // Redirect authenticated users from the login page to the dashboard
      if (isLoginPage && isAuthenticated) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }

      // Determine access to dashboard routes based on authentication
      return isAuthenticated;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
