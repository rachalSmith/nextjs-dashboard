import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
