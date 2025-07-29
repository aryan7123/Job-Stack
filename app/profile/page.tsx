'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log('Profile page - Session:', session, 'Status:', status);

  useEffect(() => {
    if (status === 'unauthenticated' || (!session && status !== 'loading')) {
      router.push('/login');
    }
  }, [status, session, router]);

  return (
    <>

    </>
  )
}

export default page