'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AppSidebar } from '../components/Sidebar';
import Loader from '@/components/ui/Loader';

import { MdOutlineAttachEmail, MdOutlinePermPhoneMsg, MdOutlineLocationOn, MdMenuBook } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoShareSocialSharp } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCandidateProfile } from '@/app/queries/candidates/candidate';

const page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const { isPending, data } = useCandidateProfile(userId);

  if (isPending) return <Loader />;

  return (
    <>
      <section className="w-full relative">
        <div className="max-w-6xl mx-auto md:pl-36 px-6 pt-16">
          <div className="relative">
            {/* Banner Image */}
            <div className="relative">
              <Image
                src={data?.candidate?.background || "/assets/bg5-BQCe0yqf.jpg"}
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
                  src={data?.candidate.user?.avatar || "/assets/01--4QesCJS.jpg"}
                  width={100}
                  height={100}
                  className="object-cover rounded-full size-24 sm:size-28"
                  alt="profile-avatar"
                  quality={100}
                  priority
                />
              </div>
              <div className="flex flex-col mt-14">
                <span className="text-gray-800 text-base sm:text-lg font-semibold">
                  {data?.candidate.user?.name}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {data?.candidate.occupation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='w-full relative'>
        <div className="w-[inherit] md:max-w-6xl mx-auto md:pl-36 md:pt-20 px-6 pt-24 pb-16">
          <div className="relative">
            <h3 className='text-gray-800 text-2xl font-semibold mb-4'>Summary</h3>
            <p className="text-slate-400 selection:bg-emerald-600 selection:text-white break-words leading-relaxed">
              {data?.candidate.description}
            </p>
          </div>
          <div className='mt-8'>
            <h3 className='text-gray-800 text-2xl font-semibold'>Skills</h3>
            <div className="w-full mt-6 bg-white shadow-lg rounded-xl shadow-gray-200 overflow-hidden p-4">
              {data?.candidate.skills && data?.candidate.skills.length > 0 && (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {data?.candidate.skills.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="capitalize cursor-pointer py-1 px-5 font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white rounded-md"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className='bg-slate-50 mt-8 dark:bg-slate-800 rounded-md shadow-sm shadow-gray-200 p-6'>
            <h3 className='text-gray-800 text-2xl font-semibold'>Personal Details</h3>
            <div className='mt-4'>
              <ul className='list-none'>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <MdOutlineAttachEmail size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Email: </span>
                  </div>
                  <span className='text-gray-800 font-semibold text-base mt-[-1px]'>{data?.candidate.user?.email}</span>
                </li>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <MdOutlinePermPhoneMsg size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Phone Number: </span>
                  </div>
                  <span className='text-gray-800 font-semibold text-base mt-[-1px]'>{data?.candidate.phoneNumber}</span>
                </li>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <MdOutlineLocationOn size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Location: </span>
                  </div>
                  <span className='text-gray-800 font-semibold text-base mt-[-1px]'>{data?.candidate.location}</span>
                </li>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <LuBriefcaseBusiness size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Experience: </span>
                  </div>
                  <span className='text-gray-800 font-semibold text-base mt-px'>{data?.candidate.experience}</span>
                </li>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <MdMenuBook size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Education: </span>
                  </div>
                  <span className='text-gray-800 font-semibold text-base mt-[-1px]'>{data?.candidate.education}</span>
                </li>
                <li className='flex items-center gap-2 mb-3'>
                  <div className="flex items-center gap-1.5">
                    <IoShareSocialSharp size={16} className='text-slate-400 mt-[4px]' />
                    <span className='text-slate-400 text-sm font-semibold'>Social: </span>
                  </div>
                  <ul className="flex items-center gap-2 list-none">
                    {data?.candidate.facebook && (
                      <li>
                        <Link
                          href={data?.candidate.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <FaFacebookF />
                        </Link>
                      </li>
                    )}
                    {data?.candidate.instagram && (
                      <li>
                        <Link
                          href={data?.candidate.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <FaInstagram />
                        </Link>
                      </li>
                    )}
                    {data?.candidate.linkedin && (
                      <li>
                        <Link
                          href={data?.candidate.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <FaLinkedin />
                        </Link>
                      </li>
                    )}
                    {data?.candidate.twitter && (
                      <li>
                        <Link
                          href={data?.candidate.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <FaTwitter />
                        </Link>
                      </li>
                    )}
                    {data?.candidate.user?.email && (
                      <li>
                        <Link
                          href={`mailto:${data?.candidate.user?.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <MdOutlineAttachEmail />
                        </Link>
                      </li>
                    )}
                    {data?.candidate.website && (
                      <li>
                        <Link
                          href={data?.candidate.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center text-lg border-2 border-gray-200 rounded-md text-slate-400 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition duration-500 ease-in-out"
                        >
                          <BsGlobe2 />
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="mt-6 w-full bg-white p-3 rounded-md shadow-sm shadow-gray-200">
                  <div className="flex items-center mb-3">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-8 text-slate-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <span className="font-medium ms-2">{data?.candidate.resumeUrl.split("/")[3]}</span>
                  </div>
                  {data?.candidate.resumeUrl && (
                    <Link className="py-1 px-5 font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-md w-full flex items-center justify-center" download href={data?.candidate.resumeUrl} data-discover="true"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="me-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Download CV</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page