import type { NextAuthConfig } from 'next-auth';

// Edge-safe auth config (no Prisma, no Node.js-only APIs)
// Used by middleware
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const PROTECTED_PREFIXES = [
        '/producer-dashboard',
        '/producer-offer-creation',
        '/producer-verification',
        '/buyer-marketplace-feed',
        '/offer-details',
        '/transaction-history',
        '/transaction-detail',
        '/producer-profile',
      ];
      const isProtected = PROTECTED_PREFIXES.some((p) => nextUrl.pathname.startsWith(p));
      if (isProtected && !isLoggedIn) return false;
      return true;
    },
  },
  providers: [], // providers added in src/lib/auth.ts
  session: { strategy: 'jwt' },
};
