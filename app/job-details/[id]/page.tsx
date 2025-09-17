'use client';

import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from "date-fns";
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useFetchJobDetails } from '@/app/queries/jobs/job-details';
import Loader from '@/components/ui/Loader';
import { MdLocationPin } from 'react-icons/md';
import Link from 'next/link';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const { data, error, isFetching } = useFetchJobDetails(id);

    if (isFetching) return <Loader />

    return (
        <>
            <Navbar />

            <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
                <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
                <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
                    {data?.details.title}
                </div>

                <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-base font-semibold' />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-base font-semibold text-white'>Job Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className='bg-slate-50 w-full relative py-24'>
                <div className='max-w-6xl mx-auto md:px-0 px-5'>
                    <div className='grid md:grid-cols-12 grid-cols-1 gap-[30px]'>
                        <div className='lg:col-span-8 md:col-span-6'>
                            <div className='flex items-center md:gap-5 gap-3 p-6 shadow-sm shadow-gray-200 rounded-md bg-white'>
                                <div className='size-28 bg-white rounded-full flex items-center justify-center shadow shadow-gray-200 p-4'>
                                    <Image
                                        className='rounded-full'
                                        src={data?.details?.company.companyLogo}
                                        alt={data?.details?.company.name}
                                        width={100}
                                        height={100}
                                        quality={100}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xl font-semibold'>{data?.details?.title}</h3>
                                    <div className='flex items-center gap-1'>
                                        <MdLocationPin className='text-base text-emerald-600' />
                                        <span className='text-slate-400 text-base'>{data?.details.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <h3 className='text-lg font-semibold'>Job Description</h3>
                                <div className="mt-4 text-slate-400">
                                    <p className='mt-4 text-slate-400 whitespace-pre-line'>{data?.details.description}</p>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <h3 className='text-lg font-semibold'>Qualifications & Skills</h3>
                                <p className='mt-4 text-slate-400 whitespace-pre-line'>{data?.details.qualification}</p>
                            </div>
                            <div className='mt-6'>
                                <Link href={{
                                    pathname: `/job-apply/${data?.details.id}`,
                                    query: {
                                        title: data?.details.title
                                    }
                                }} className='text-white rounded-md bg-emerald-600 text-base font-semibold tracking-wide py-2 px-4 transition-colors duration-500 hover:bg-emerald-700 cursor-pointer'>Apply Now</Link>
                            </div>
                        </div>
                        <div className='lg:col-span-4 md:col-span-6'>
                            <div className='shadow-sm shadow-gray-200 rounded-md bg-white sticky top-20'>
                                <div className='p-6'>
                                    <h3 className='text-lg font-semibold'>Job Information</h3>
                                </div>
                                <div className='border-t border-slate-200 p-6'>
                                    <ul className='list-none'>
                                        <li className='flex items-center'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Employee Type:</p>
                                                <span className="text-emerald-600 font-medium text-sm">{data?.details.type}</span>
                                            </div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            <div className="ms-4"><p className="font-medium">Location:</p><span className="text-emerald-600 font-medium text-sm">{data?.details.location}</span></div>
                                        </li>
                                        <li className="flex items-center mt-3">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Job Category:</p>
                                                <span className="text-emerald-600 font-medium text-sm">{data?.details.categories}</span>
                                            </div>
                                        </li>
                                        <li className="flex items-center mt-3">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Industry:</p>
                                                <span className="text-emerald-600 font-medium text-sm">{data?.details.industry}</span>
                                            </div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Experience:</p>
                                                <span className="text-emerald-600 font-medium text-sm">{data?.details.experience} Years</span>
                                            </div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Salary:</p>
                                                <span className="text-emerald-600 font-medium text-sm">${data?.details.salary}</span>
                                            </div>
                                        </li>
                                        <li className='flex items-center mt-3'>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            <div className="ms-4">
                                                <p className="font-medium">Date Posted:</p>
                                                <span className="text-emerald-600 font-medium text-sm">{formatDistanceToNow(data?.details.postedAt, { addSuffix: true })}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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