'use client'

import React from 'react'

import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { useFetchAllJobs } from '../queries/jobs/all-jobs';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Loader from '@/components/ui/Loader';

const categories = [
    "Web Designer",
    "Web Developer",
    "UI/UX Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "WordPress Developer",
    "Project Manager",
    "Software Developer",
    "Android Developer",
    "Data Analyst",
    "Bussines Analyst",
    "Software Engineer"
];

const page = () => {
    const { data, error, isFetching } = useFetchAllJobs();

    if(isFetching) return <Loader />

    return (
        <>
            <Navbar />

            <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
                <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
                <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
                    Job Vacancies
                </div>

                <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-base font-semibold' />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-base font-semibold text-white'>Job List</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className='w-full relative py-24'>
                <div className='max-w-6xl mx-auto md:px-0 px-5'>
                    <div className='grid md:grid-cols-12 grid-cols-1 gap-[30px]'>
                        <div className='lg:col-span-4 md:col-span-6'>
                            <div className='shadow-sm shadow-gray-200 p-6 rounded-md bg-white sticky top-20'>
                                <form>
                                    <div className="flex flex-col gap-2">
                                        <label className='font-semibold' htmlFor="">Search Company</label>
                                        <input className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="">Categories</label>
                                        <select className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' name="job_category" id="job_category">
                                            <option value="">Select Category</option>
                                            {categories.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="">Location</label>
                                        <input className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='lg:col-span-8 md:col-span-6'>
                            <div className='grid grid-cols-1 gap-[30px]'>
                                {data?.map((job, item: React.Key) => (
                                    <div className='group relative overflow-hidden lg:flex justify-between items-center rounded shadow-sm hover:shadow-md shadow-gray-200 transition-all duration-500 p-5'>
                                        
                                    </div>
                                ))}
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