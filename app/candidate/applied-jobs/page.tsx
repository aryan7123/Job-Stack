'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Loader from '@/components/ui/Loader';
import { useRecentlyAppliedJobs } from '@/app/queries/applications/recently-applied';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { CiClock1 } from 'react-icons/ci';
import { formatDistanceToNow } from "date-fns";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Link from 'next/link';
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

const page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? '';

  const { data: applications, isLoading, isError, error } = useRecentlyAppliedJobs(userId);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className='w-full relative'>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-3 mt-5">
            <h2 className="text-4xl font-semibold">Recently Applied Jobs</h2>
            <span className="text-slate-400 text-sm font-medium">
              Ready to jump back in?
            </span>
          </div>
          {applications && applications.length && (
            <div className='w-full mt-10 rounded-md shadow-md bg-white p-6'>
              <table className="hidden md:table w-full border-collapse">
                <thead className="bg-emerald-600/5 border-b border-[#ecedf2]">
                  <tr>
                    <th className="w-[400px] text-left p-2">Job Title</th>
                    <th className="text-left p-2">Date Applied</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item: ApplicationsProps, index: React.Key) => (
                    <tr key={index} className='border-b border-[#ecedf2]'>
                      <td className='w-[500px] flex items-start justify-start gap-3 py-2.5'>
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
                          <div className='flex md:flex-row flex-col md:items-center items-start gap-2 mt-2'>
                            <div className='flex items-center gap-1'>
                              <IoLocationOutline size={14} />
                              <span className='text-sm text-slate-500 font-medium'>{item.job?.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='w-[200px] text-slate-400 text-sm font-semibold'>{formatDistanceToNow(item?.appliedAt, { addSuffix: true })}</td>
                      <td className={`w-[150px] ${item?.status == "Pending" && "text-[#d93025]"} ${item?.status == "Active" && "text-[#f9ab00]"} ${item?.status == "Shortlisted" && "text-[#34a853]"} text-sm font-semibold`}>{item?.status}</td>
                      <td className='w-[180px] flex items-center gap-2'>
                        <Link target='_blank' href={{
                          pathname: `/job-details/${item.job?.id}`,
                          query: {
                            title: item.job?.title
                          }
                        }} type="button" className='bg-green-500 text-white p-2 rounded-md cursor-pointer text-sm duration-300 transition-colors hover:bg-green-600'><FaEye /></Link>
                        <button type="button" className='bg-red-500 text-white p-2 rounded-md cursor-pointer text-sm duration-300 transition-colors hover:bg-red-600'><FaTrashCan /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile view as cards */}
              <div className="md:hidden space-y-4">
                {applications.map((item: ApplicationsProps, index: React.Key) => (
                  <div key={index} className="bg-white border border-[#ecedf2] rounded-lg p-4 shadow-sm">
                    <p className='mb-2'><span className="font-semibold">Job Title:</span> {item.job?.title}</p>
                    <p className='mb-2'><span className="font-semibold">Date Applied:</span> {formatDistanceToNow(item?.appliedAt, { addSuffix: true })}</p>
                    <p className={`${item?.status == "Pending" && "text-[#d93025]"} ${item?.status == "Active" && "text-[#f9ab00]"} ${item?.status == "Shortlisted" && "text-[#34a853]"} text-sm font-semibold mb-2`}><span>Status:</span> {item?.status}</p>
                    <div className='flex items-center gap-2'><Link target='_blank' href={{
                      pathname: `/job-details/${item.job?.id}`,
                      query: {
                        title: item.job?.title
                      }
                    }} type="button" className='bg-green-500 text-white p-2 rounded-md cursor-pointer text-sm duration-300 transition-colors hover:bg-green-600'><FaEye /></Link>
                      <button type="button" className='bg-red-500 text-white p-2 rounded-md cursor-pointer text-sm duration-300 transition-colors hover:bg-red-600'><FaTrashCan /></button></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default page