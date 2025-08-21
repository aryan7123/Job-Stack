'use client';

import { RootState } from '@/app/store';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from '@/app/store/features/employers/employerProfile';
import Link from 'next/link';

const page = () => {
  const [employerId, setEmployerId] = useState<string>("");

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { employer, error, loading } = useSelector(
    (state: RootState) => state.employerProfile
  );

  useEffect(() => {
    if (session?.user?.id) {
      setEmployerId(session.user.id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (!employerId) return;
    dispatch(fetchProfileDetails(employerId));
  }, [employerId, dispatch]);

  return (
    <>
      <Navbar />

      <section className={`relative w-full py-24 bg-center bg-cover bg-no-repeat bg-[url(${employer?.photos[0]})]`}>
        <div className='absolute inset-0 bg-emerald-900/80'></div>
      </section>

      <Footer />
    </>
  )
}

export default page
