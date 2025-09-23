'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCandidateProfile } from '@/app/queries/candidates/candidate';
import Loader from '@/components/ui/Loader';

import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdBookmarkBorder, MdOutlinePendingActions } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";

const Page = () => {
  return (
    <>
      <section className="w-full relative">
        {/* Outer wrapper, no padding on mobile */}
        <div className="w-full px-0 sm:px-6 md:px-12 lg:px-20">

          {/* Heading with its own safe padding */}
          <div className="flex flex-col gap-3 mt-5 px-4 sm:px-0">
            <h2 className="text-4xl font-semibold">Howdy, Aryan!!</h2>
            <span className="text-slate-400 text-sm font-medium">
              Ready to jump back in?
            </span>
          </div>

          {/* Full-width grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#1967d21a] rounded-md flex items-center justify-center text-[#1967d2] p-3">
                <LuBriefcaseBusiness size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#1967d2] text-3xl font-semibold">22</span>
                <span className="text-[#202124] font-medium text-sm">Applied Jobs</span>
              </div>
            </div>

            {/* Repeat for the other 3 cards */}
            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#d930251a] rounded-md flex items-center justify-center text-[#d93025] p-3">
                <FaRegBell size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#d93025] text-3xl font-semibold">07</span>
                <span className="text-[#202124] font-medium text-sm">Pending Jobs</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#f9ab001a] rounded-md flex items-center justify-center text-[#f9ab00] p-3">
                <MdOutlinePendingActions size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#f9ab00] text-3xl font-semibold">05</span>
                <span className="text-[#202124] font-medium text-sm">Active Jobs</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#33a85314] rounded-md flex items-center justify-center text-[#34a853] p-3">
                <MdBookmarkBorder size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#34a853] text-3xl font-semibold">09</span>
                <span className="text-[#202124] font-medium text-sm">Shortlisted Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page