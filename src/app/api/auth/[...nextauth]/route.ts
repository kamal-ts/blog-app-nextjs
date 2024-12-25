import NextAuth, { NextAuthOptions }  from "next-auth"

import {authOptions as options} from '@/utils/auth'

export const authOptions: NextAuthOptions = options;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };