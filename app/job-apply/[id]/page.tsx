'use client';

import React from 'react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

import { useSearchParams } from 'next/navigation';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);

    const searchParams = useSearchParams();
    const title = searchParams.get("title");

    return (
        <>
            <Navbar />

            <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
                <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
                <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
                    {title}
                </div>

                <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-base font-semibold' />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-base font-semibold text-white'>Job Application</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className='bg-slate-50 w-full relative py-24'>
                <div className='max-w-6xl mx-auto md:px-0 px-5'>
                    <div className="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                        <form className="text-left">
                            <h3 className='text-2xl font-semibold mb-4'>Application Form</h3>
                            <div className="grid grid-cols-1">
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor='title'>Title</label>
                                    <input id="title" name='title' className="border border-slate-100 w-full text-sm p-2 outline-0" type="text" value={title ?? ""} readOnly />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="name">Your Name:</label>
                                    <input id="name" name='name' className="border border-slate-100 w-full text-sm p-2 outline-0" placeholder="Harry" type="text" />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="email">Email Address:</label>
                                    <input id="email" name='email' className="border border-slate-100 w-full text-sm p-2 outline-0" placeholder="name@example.com" type="email" />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="phone">Phone No.:</label>
                                    <input id="phone" name='phone' className="border border-slate-100 w-full text-sm p-2 outline-0" placeholder="+458 854-8965" type="tel" />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label htmlFor="cover_letter" className="font-semibold">Cover Letter:</label>
                                    <input className="relative border border-slate-100 file:h-10 file:-mx-3 file:-my-2 file:cursor-pointer file:rounded-none file:border-0 file:px-3 file:text-neutral-700 bg-clip-padding px-3 py-1.5 file:me-3 mt-1" id="cover_letter" name='cover_letter' type="file" />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="resume">Upload Resume:</label>
                                    <input className="relative border border-slate-100 file:h-10 file:-mx-3 file:-my-2 file:cursor-pointer file:rounded-none file:border-0 file:px-3 file:text-neutral-700 bg-clip-padding px-3 py-1.5 file:me-3 mt-1" id="resume" name='resume' type="file" />
                                </div>
                                <div>
                                    <button type="button" className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default page