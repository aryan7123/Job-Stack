'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Loader from '@/components/ui/Loader';
import { useRecentlyAppliedJobs } from '@/app/queries/applications/recently-applied';

import { formatDistanceToNow } from "date-fns";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdBookmarkBorder, MdOutlinePendingActions } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';

interface ApplicationsProps {
  appliedAt: string,
  status: string
  job: {
    id: string,
    location: string,
    postedAt: string,
    type: string,
    title: string,
    salary: string,
    company: {
      name: string,
      companyLogo: string
    }
  }
}

const Page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? '';

  const { data: applications, isLoading, isError, error } = useRecentlyAppliedJobs(userId);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="w-full relative">
        {/* Outer wrapper, no padding on mobile */}
        <div className="w-full px-0 sm:px-6 md:px-12 lg:px-20">

          {/* Heading with its own safe padding */}
          <div className="flex flex-col gap-3 mt-5 px-4 sm:px-0">
            <h2 className="text-4xl font-semibold">Howdy, {session?.user?.name}!!</h2>
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
                <span className="text-[#202124] font-medium text-sm">Applied</span>
              </div>
            </div>

            {/* Repeat for the other 3 cards */}
            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#d930251a] rounded-md flex items-center justify-center text-[#d93025] p-3">
                <FaRegBell size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#d93025] text-3xl font-semibold">07</span>
                <span className="text-[#202124] font-medium text-sm">Pending</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#f9ab001a] rounded-md flex items-center justify-center text-[#f9ab00] p-3">
                <MdOutlinePendingActions size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#f9ab00] text-3xl font-semibold">05</span>
                <span className="text-[#202124] font-medium text-sm">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
              <div className="w-20 h-20 bg-[#33a85314] rounded-md flex items-center justify-center text-[#34a853] p-3">
                <MdBookmarkBorder size={40} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#34a853] text-3xl font-semibold">09</span>
                <span className="text-[#202124] font-medium text-sm">Shortlisted</span>
              </div>
            </div>
          </div>
          {applications && applications.length > 0 && (
            <div className='w-[inherit] mt-10 bg-white shadow-md border border-[#ecedf2] rounded-md p-6'>
              <h3 className='text-xl font-semibold'>Jobs Applied Recently</h3>
              <div className='grid md:grid-cols-2 gap-6 mt-6'>
                {applications.map((item: ApplicationsProps, index: React.Key) => (
                  <Link target='_blank' href={{
                    pathname: `/job-details/${item.job?.id}`,
                    query: {
                      title: item.job?.title
                    }
                  }} key={index} className='flex items-start gap-4 bg-white border border-[#ecedf2] rounded-md p-4 transition-transform duration-500 hover:scale-[1.02] cursor-pointer'>
                    <Image
                      src={item.job?.company.companyLogo}
                      alt={item.job?.company.name}
                      width={50}
                      height={50}
                      className='w-12 h-12 object-contain rounded-md'
                      priority
                      quality={100}
                    />
                    <div className='flex flex-col items-start justify-start'>
                      <h3 className='md:text-base text-sm font-semibold'>{item.job?.title}</h3>
                      <div className='flex md:flex-row flex-col md:items-center items-start gap-3 mt-2'>
                        <div className='flex items-center gap-1'>
                          <IoLocationOutline size={14} />
                          <span className='text-sm text-slate-500 font-medium'>{item.job?.location}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <CiClock1 size={14} />
                          <span className='text-sm text-slate-500 font-medium'>{formatDistanceToNow(item?.appliedAt)}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <BsCashCoin size={14} />
                          <span className='text-xs text-slate-500 font-medium'>{item.job?.salary}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-3 mt-2'>
                        <div className='bg-[#1967d226] text-[#1967d2] text-xs rounded-full px-4 py-2'>{item.job?.type}</div>
                        <div className='bg-[#34a85326] text-[#34a853] text-xs rounded-full px-4 py-2'>{item?.status}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Page