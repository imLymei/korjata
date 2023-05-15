import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

require('dotenv').config();

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.JWT_SECRET,
});

export { handler as GET, handler as POST };
