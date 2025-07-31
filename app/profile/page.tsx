'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

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
      <Navbar />

      <section className='w-full bg-white'>
        <div className='max-w-6xl mx-auto px-5 md:px-0 py-24'>
          <div className='relative text-transparent'>
            <input type="file" name="background" id="background" className='hidden' />
            <div className='relative shrink-0'>
              <Image
                src={"/assets/bg5-BQCe0yqf.jpg"}
                width={1024}
                height={256}
                className='object-cover rounded-xl w-full h-64'
                alt='profile-banner'
                quality={100}
                priority
              />
              <label htmlFor="background" className='absolute inset-0 cursor-pointer'></label>
            </div>
            <div className="absolute -bottom-12 left-3 flex items-end gap-2 w-full">
              <Image
                src="/assets/01--4QesCJS.jpg"
                width={100}
                height={100}
                className="object-cover rounded-full size-28"
                alt="profile-banner"
                quality={100}
                priority
              />
              <div className="text-gray-800 text-lg font-semibold w-full">
                {session?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page