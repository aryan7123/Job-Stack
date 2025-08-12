'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { candidateProfileDetails } from '@/app/store/features/candidates/profileDetails';

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profile, error, loading } = useSelector(state => state.candidateProfile);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      handleProfileDetails(session.user.id);
    }
  }, [status, session]);

  const handleProfileDetails = async (uid: string) => {
    try {
      const result = await dispatch(candidateProfileDetails(uid)).unwrap();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative">
            {/* Banner Image */}
            <div className="relative">
              <Image
                src="/assets/bg5-BQCe0yqf.jpg"
                width={1024}
                height={256}
                className="object-cover rounded-xl w-full h-40 sm:h-56 md:h-64"
                alt="profile-banner"
                quality={100}
                priority
              />
            </div>

            {/* Avatar + Name + Occupation */}
            <div className="absolute -bottom-14 left-4 sm:left-6 flex flex-wrap items-center gap-4">
              <div className="shrink-0">
                <Image
                  src="/assets/01--4QesCJS.jpg"
                  width={100}
                  height={100}
                  className="object-cover rounded-full size-24 sm:size-28"
                  alt="profile-avatar"
                  quality={100}
                  priority
                />
              </div>
              <div className="flex flex-col mt-12">
                <span className="text-gray-800 text-base sm:text-lg font-semibold">
                  {session?.user?.name}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {profile?.occupation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="w-full mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="relative">
            <p className="text-slate-400 selection:bg-emerald-600 selection:text-white break-words leading-relaxed">
              {profile?.description}
            </p>
          </div>
        </div>
      </section>


      <Footer />
    </>
  )
}

export default page