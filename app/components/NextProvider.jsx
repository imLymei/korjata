'use client';

import { SessionProvider } from 'next-auth/react';

export default function NextProvider({ children }) {
	return <SessionProvider>{children}</SessionProvider>;
}
