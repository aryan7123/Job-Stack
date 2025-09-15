'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { formatDistanceToNow } from "date-fns";
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
import { MdOutlineLocationOn } from "react-icons/md";
import Link from 'next/link'

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
    const [page, setPage] = useState(1);
    const { data, error, isFetching } = useFetchAllJobs(page);

    const [searchTerm, setSearchTerm] = useState({
        name: "",
        location: "",
    });

    const [selectedSalary, setSelectedSalary] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    }
    
    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSalary(e.target.value);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const filteredJobs = data?.jobs?.filter(
        (job: { type: string; location: string; salary: string; company: { name: string }; categories: string }) => {
            const matchesName =
                searchTerm.name === "" ||
                job.company.name.toLowerCase().includes(searchTerm.name.toLowerCase());

            const matchesLocation =
                searchTerm.location === "" ||
                job.location.toLowerCase().includes(searchTerm.location.toLowerCase());

            const matchesType =
                selectedTypes.length === 0 || selectedTypes.includes(job.type);

            const matchesCategory =
                selectedCategory === "" || job.categories === selectedCategory;

            const matchesSalary =
                selectedSalary === "" ||
                (selectedSalary === "<$500" && Number(job.salary) < 500) ||
                (selectedSalary === "$1000-$5000" &&
                    Number(job.salary) >= 1000 &&
                    Number(job.salary) <= 5000) ||
                (selectedSalary === ">$5000" && Number(job.salary) > 5000);

            return matchesName && matchesLocation && matchesType && matchesCategory && matchesSalary;
        }
    );

    const handleResetFilters = () => {
        setSearchTerm({ name: "", location: "" });
        setSelectedTypes([]);
        setSelectedCategory("");
        setSelectedSalary("");
    };

    if (isFetching) return <Loader />

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
                                        <label className='font-semibold' htmlFor="name">Search Company</label>
                                        <input onChange={handleSearchChange} name='name' value={searchTerm.name} className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="categories">Categories</label>
                                        <select className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' name="categories" id="categories" value={selectedCategory} onChange={handleCategoryChange}>
                                            <option value="">Select Category</option>
                                            {categories.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="location">Location</label>
                                        <input onChange={handleSearchChange} name='location' value={searchTerm.location} className='w-full border border-gray-200 text-[14px] rounded outline-0 py-2 px-3' type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="">Job Types</label>
                                        <div className='flex flex-col gap-2 mt-2'>
                                            {["Full Time", "Part Time", "Internship", "Contract"].map((type) => (
                                                <label key={type} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTypes.includes(type)}
                                                        onChange={() => handleCheckboxChange(type)}
                                                        className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-green-600 checked:appearance-auto dark:accent-green-600 focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
                                                    />
                                                    <span className="ms-1 text-slate-400">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3.5">
                                        <label className='font-semibold' htmlFor="salary">Salary</label>
                                        <div className='flex flex-col gap-2 mt-2'>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="salary"
                                                    value="<$500"
                                                    checked={selectedSalary === "<$500"}
                                                    onChange={handleSalaryChange}
                                                    className="form-radio size-4 appearance-none rounded-full border border-gray-200 accent-green-600 checked:appearance-auto focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
                                                />
                                                <span className="ms-2 text-slate-400">&lt;$500</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="salary"
                                                    value="$1000-$5000"
                                                    checked={selectedSalary === "$1000-$5000"}
                                                    onChange={handleSalaryChange}
                                                    className="form-radio size-4 appearance-none rounded-full border border-gray-200 accent-green-600 checked:appearance-auto focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
                                                />
                                                <span className="ms-2 text-slate-400">$1000-$5000</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="salary"
                                                    value=">$5000"
                                                    checked={selectedSalary === ">$5000"}
                                                    onChange={handleSalaryChange}
                                                    className="form-radio size-4 appearance-none rounded-full border border-gray-200 accent-green-600 checked:appearance-auto focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
                                                />
                                                <span className="ms-2 text-slate-400">&gt;$5000</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button type="button" className='py-1 mt-4 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white' onClick={handleResetFilters}>Reset Filters</button>
                                </form>
                            </div>
                        </div>
                        <div className='lg:col-span-8 md:col-span-6'>
                            <div className='grid grid-cols-1 gap-[30px]'>
                                {filteredJobs.length > 1 ? (
                                    filteredJobs.map((job, item: React.Key) => (
                                        <Link href={{
                                            pathname: `/job-details/${job?.id}`,
                                            query: {
                                                title: job?.title
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
                                                        src={job?.company.companyLogo}
                                                        alt={job?.title}
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <h3 className='text-base font-semibold group-hover:text-emerald-600'>{job?.title}</h3>
                                            </div>
                                            <div className='flex items-center justify-between mb-3'>
                                                <span className='bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full'>{job?.type}</span>
                                                <span className='text-slate-400 text-sm'>{formatDistanceToNow(job?.postedAt, { addSuffix: true })}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-1 text-slate-400'>
                                                    <MdOutlineLocationOn />
                                                    <span>{job?.location}</span>
                                                </div>
                                                <span className='font-semibold text-sm'>${job?.salary}</span>
                                            </div>
                                            <button type="button" className='py-1 mt-3 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white w-full'>
                                                Apply Now
                                            </button>
                                        </Link>
                                    ))
                                ) : (
                                    <h3 className='text-slate-400 text-base'>No Jobs Found</h3>
                                )}
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
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default page