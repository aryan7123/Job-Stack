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

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const { data, error, isFetching } = useFetchJobDetails(id);

    if(isFetching) return <Loader />

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
                        </div>
                        <div className='lg:col-span-4 md:col-span-6'>
                            <div className='shadow-sm shadow-gray-200 rounded-md bg-white sticky top-20'>

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