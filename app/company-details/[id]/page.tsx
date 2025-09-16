'use client';

import React, { use, useState } from 'react'

import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { useEmployerProfile } from '@/app/queries/employers/employer'
import Loader from '@/components/ui/Loader';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from "date-fns";
import { IoMdTime } from "react-icons/io";
import { useSendUserComment } from '@/app/queries/employers/send-comment';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { data: employer, isPending } = useEmployerProfile(id);
  const { mutate, isError, isSuccess, data, error, isPending: commentStatus } = useSendUserComment(id);

  const [comments, setComments] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { name, email, message } = comments;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
  }

  const handleSendComment = () => {
    mutate(comments);
  }

  if (isPending) return <Loader />

  return (
    <>
      <Navbar />

      <section
        className="relative w-full py-24 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${employer?.photos?.[0] || "/default-bg.jpg"})` }}
      >
        <div className="absolute inset-0 bg-emerald-900/80 z-0"></div>
        <div className="relative z-10 px-5 sm:px-6 lg:px-8">
          <div className='max-w-6xl mx-auto flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-5 bg-white rounded-md p-6 shadow-sm shadow-gray-200'>
            <div className="flex items-center gap-4">
              <Image
                className='shadow-sm rounded-md shadow-gray-200 bg-slate-50 p-3'
                src={employer?.companyLogo}
                alt={employer?.name}
                width={100}
                height={100}
                quality={100}
                priority
              />
              <div className="flex flex-col justify-start gap-2">
                <h3 className='text-xl font-bold'>{employer?.name}</h3>
                <div className='flex items-center'>
                  <svg stroke="currentColor" fill="#90a1b9" strokeWidth="0" viewBox="0 0 256 256" className="me-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>
                  <span className='text-slate-400'>{employer?.headquarters}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button type="button" className='text-white cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-500 bg-emerald-600 hover:bg-emerald-700'>Follow</button>
              <button type="button" className='text-emerald-500 cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-500 bg-emerald-600/5 border-emerald-600/10 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white'>See Jobs</button>
            </div>
          </div>
        </div>
      </section>

      <section className='relative w-full'>
        <div className='max-w-6xl mx-auto md:px-0 px-5 mt-14'>
          <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(employer?.headquarters)}&output=embed`} width="600" height="450" className='border-0 w-full rounded-md' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          <div className='w-[inherit] mt-10'>
            <h3 className='text-2xl font-semibold'>Overview</h3>
            <p className='text-slate-400 mt-5'>{employer?.description}</p>
            <div className="grid grid-cols-12 gap-6 mt-10">
              {employer?.photos?.map((photo: string, index: React.Key) => (
                <div
                  key={index}
                  className={`relative h-48 md:h-60 rounded-md overflow-hidden 
                  ${index === 0 ? "col-span-12" : "col-span-6"}`}
                >
                  <Image
                    src={photo}
                    alt={employer?.name || "employer"}
                    fill
                    className="object-cover bg-center bg-cover bg-no-repeat rounded-md"
                    quality={100}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            {employer?.jobs.length > 0 && (
              <div className='mt-10'>
                <h5 className='text-2xl font-semibold'>Recent Openings</h5>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-5'>
                  {employer?.jobs.map((post, index: React.Key) => (
                    <Link href={{
                      pathname: `/job-details/${post?.id}`,
                      query: {
                        title: post?.title
                      }
                    }} key={index} className='relative overflow-hidden rounded-md shadow-sm cursor-pointer transition-transform duration-500 hover:scale-105'>
                      <div className='p-6'>
                        <h4 className='text-lg font-semibold mb-2'>{post.title}</h4>
                        <div className="flex items-center gap-1">
                          <IoMdTime className='text-emerald-600' />
                          <span className='text-slate-400 text-sm'>
                            {formatDistanceToNow(post.postedAt, { addSuffix: true })}
                          </span>
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                          <div className='bg-emerald-600/5 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded h-5'>
                            {post.type}
                          </div>
                          <span className='text-slate-400 text-sm'>$ {post.salary}/mo</span>
                        </div>
                      </div>
                      <div className='border-t border-gray-100 p-6'>
                        <div className='flex items-center gap-4'>
                          <Image
                            src={employer?.companyLogo}
                            alt={employer?.name}
                            width={100}
                            height={100}
                            className='bg-white rounded-md p-2 size-10 shadow-md'
                          />
                          <div className='flex flex-col gap-0.5'>
                            <h5 className='font-semibold mb-0'>{employer?.name}</h5>
                            <span className='text-slate-400'>{post.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='p-6 rounded-md shadow-sm mt-10'>
            <h3 className='text-xl font-semibold'>Leave a Comment</h3>
            <form className='mt-8'>
              <div className="grid lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-6 mb-5">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-sm font-medium'>Your Name:</label>
                    <div className='relative'>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-4 absolute top-3 start-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <input className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent !ps-11" placeholder="Name :" type="text" name="name" onChange={handleChange} value={name} />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 mb-5">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-sm font-medium'>Your Email:</label>
                    <div className='relative'>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-4 absolute top-3 start-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      <input className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent !ps-11" placeholder="Email :" type="email" name="email" onChange={handleChange} value={email} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="message" className='text-sm font-medium'>Your Message:</label>
                  <div className='relative'>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-4 absolute top-3 start-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <textarea name="message" className="w-full py-2 px-3 text-[14px] border border-gray-200 rounded h-24 outline-none bg-transparent !ps-11" placeholder="Message :" onChange={handleChange} value={message}></textarea>
                  </div>
                </div>
              </div>
              {isError && (
                <div className="text-sm font-semibold text-red-600 my-3">
                  {(error as Error).message}
                </div>
              )}
              {isSuccess && data?.message && (
                <div className="text-sm font-semibold text-green-600 my-3">
                  {data.message}
                </div>
              )}
              <button disabled={commentStatus} onClick={handleSendComment} type="button" className='w-full mt-4 rounded cursor-pointer py-2 bg-emerald-600 text-base font-semibold text-white duration-300 transition-colors hover:bg-emerald-700'>{commentStatus ? "Sending..." : "Send Message"}</button>
            </form>
          </div>
        </div>
      </section>

      <section className='w-full bg-slate-50 mt-14'>
        <div className='max-w-6xl mx-auto px-5 md:px-0 py-10'>
          <h3 className='text-2xl font-semibold'>Company Details</h3>
          <div className='mt-5'>
            <h5 className='text-slate-400 font-medium mb-1'>Website</h5>
            <Link className='font-medium' href={employer?.website} target='_blank'>{employer?.website}</Link>
          </div>
          <div className='mt-5'>
            <h5 className='text-slate-400 font-medium mb-1'>Email Address</h5>
            <Link className='font-medium' href={`mailto:${employer?.email}`} target='_blank'>{employer?.email}</Link>
          </div>
          {employer?.founder && (
            <div className='mt-5'>
              <h5 className='text-slate-400 font-medium mb-1'>Founder</h5>
              <span className='font-medium'>{employer?.founder}</span>
            </div>
          )}
          {employer?.yearFounded && (
            <div className='mt-5'>
              <h5 className='text-slate-400 font-medium mb-1'>Founded</h5>
              <span className='font-medium'>{employer?.yearFounded}</span>
            </div>
          )}
          <div className='mt-5'>
            <h5 className='text-slate-400 font-medium mb-1'>Company Size</h5>
            <span className='font-medium'>{employer?.companySize}</span>
          </div>
          <div className='mt-5'>
            <h5 className='text-slate-400 font-medium mb-1'>Industry</h5>
            <span className='font-medium'>{employer?.industry}</span>
          </div>
          <div className='mt-5'>
            <h5 className='text-slate-400 font-medium mb-1'>Specialties</h5>
            <span className='font-medium'>{employer?.specialties?.join(", ")}</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page