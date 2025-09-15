'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'

import Link from 'next/link'
import Loader from '@/components/ui/Loader'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFetchAllEmployers } from '../queries/employers/all-employers';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FaIndustry } from "react-icons/fa";

const page = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState({
        name: '',
        location: '',
        industry: ''
    });
    const { data, error, isFetching } = useFetchAllEmployers(page);

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchTerm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const filteredEmployers = data?.employers.filter((employer: { headquarters: string, name: string, industry: string }) => {
        const matchesName = searchTerm.name === "" || employer.name.toLowerCase().includes(searchTerm.name.toLowerCase());
        const matchesLocation = searchTerm.location === "" || employer.headquarters.toLowerCase().includes(searchTerm.location.toLowerCase());
        const matchesIndustry = searchTerm.industry === "" || employer.industry.toLowerCase().includes(searchTerm.industry.toLowerCase());

        return matchesName && matchesLocation && matchesIndustry;
    });

    const resetFilters = () => {
        setSearchTerm({
            name: '',
            location: '',
            industry: ''
        });
    }

    if (isFetching) return <Loader />

    return (
        <>
            <Navbar />

            <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
                <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
                <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
                    Employers / Companies
                </div>

                <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-base font-semibold' />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-base font-semibold text-white'>Employers / Companies</BreadcrumbPage>
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
                                        <label className='font-semibold' htmlFor="name">Search Company</label>
                                        <input className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" name='name' onChange={handleSearchTermChange} value={searchTerm.name} />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="location">Location</label>
                                        <input className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" name='location' onChange={handleSearchTermChange} value={searchTerm.location} />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="industry">Industry</label>
                                        <input className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" name='industry' onChange={handleSearchTermChange} value={searchTerm.industry} />
                                    </div>
                                    <button type="button" className='mt-6 bg-emerald-600 text-base text-white py-2 px-4 tracking-wide transition-colors duration-300 hover:bg-emerald-700 rounded cursor-pointer font-semibold' onClick={resetFilters}>Reset Filters</button>
                                </form>
                            </div>
                        </div>
                        {filteredEmployers?.length > 0 ? (
                            <div className='lg:col-span-8 md:col-span-6'>
                                <div className='grid grid-cols-1 gap-[30px]'>
                                    {filteredEmployers.map((employer, item: React.Key) => (
                                        <Link href={{
                                            pathname: `/company-details/${employer?.id}`,
                                            query: {
                                                title: employer?.name
                                            }
                                        }} key={item} className='group relative overflow-hidden rounded shadow-sm hover:scale-105 shadow-gray-200 transition-transform duration-500 p-5 cursor-pointer'>
                                            <span className="w-24 text-white p-1 text-center absolute ltr:-rotate-45 rtl:rotate-45 -start-[30px] top-3 bg-yellow-400 flex justify-center">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <div className='flex items-center gap-3 mb-6'>
                                                <div className='size-14 flex items-center justify-center bg-white shadow-sm shadow-gray-200 rounded-md'>
                                                    <Image
                                                        src={employer?.companyLogo}
                                                        alt={employer?.name}
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <h3 className='text-base font-semibold group-hover:text-emerald-600'>{employer?.name}</h3>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-2 text-slate-400'>
                                                    <FaIndustry />
                                                    <span>{employer?.industry}</span>
                                                </div>
                                                <div className='flex items-center gap-1 text-slate-400'>
                                                    <MdOutlineLocationOn />
                                                    <span>{employer?.headquarters}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <nav className='mx-auto text-center mt-6'>
                                    <ul className="inline-flex items-center justify-center -space-x-px">
                                        <li>
                                            <button
                                                disabled={page === 1}
                                                onClick={() => setPage((prev) => prev - 1)} type='button' className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[20px] rtl:rotate-180 rtl:-mt-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
                                                </svg>
                                            </button>
                                        </li>
                                        {data?.totalPages > 1 && (
                                            [...Array(data.totalPages)].map((_, index) => {
                                                const pageNumber = index + 1;
                                                return (
                                                    <li key={pageNumber}>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPage(pageNumber)}
                                                            className={`size-[40px] inline-flex justify-center items-center 
                                                        ${page === pageNumber
                                                                    ? "bg-emerald-600 text-white border-emerald-600"
                                                                    : "text-slate-400 bg-white border border-gray-100 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                                                                }`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                );
                                            })
                                        )}
                                        <li>
                                            <button disabled={page === data.totalPages}
                                                onClick={() => setPage((prev) => prev + 1)} type='button' className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[20px] rtl:rotate-180 rtl:-mt-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        ) : (
                            <div className='lg:col-span-8 md:col-span-6'>
                                <h3 className='text-slate-400 text-base font-semibold'>No Companies Found</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default page