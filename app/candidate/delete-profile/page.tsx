'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { FaTrashCan } from "react-icons/fa6";
import { useCandidateDeleteProfile } from '@/app/queries/candidates/delete-profile';
import Loader from '@/components/ui/Loader';

const page = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? '';
  const { mutate, isPending } = useCandidateDeleteProfile();

  const handleDeleteProfile = () => {
    mutate({ candidateId: userId });
  }

  if(status === "loading") return <Loader />

  return (
    <>
      <section className="w-full relative">
        <div className="w-full px-0 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-3 mt-5 px-4 sm:px-0">
            <h2 className="text-4xl font-semibold">Howdy, {session?.user?.name}!!</h2>
            <span className="text-slate-400 text-sm font-medium">
              Ready to jump back in?
            </span>
          </div>
          <div className='bg-white mt-10 shadow rounded-md w-[inherit] p-6'>
            <h3 className='text-2xl font-semibold mb-2'>Delete Account</h3>
            <span className='text-slate-400 text-sm font-medium'>Do you want to delete the account? Please press below "Delete" button</span>
            <br /><br />
            <button disabled={isPending} onClick={handleDeleteProfile} type="button" className='bg-red-600 text-white flex items-center font-semibold gap-1.5 py-2 cursor-pointer px-4 rounded-md transition-colors duration-300 hover:bg-red-700'>
              <FaTrashCan />
              <span>{isPending ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default page