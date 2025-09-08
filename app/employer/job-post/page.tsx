'use client';

import React, { useState } from 'react'

import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { useSession } from 'next-auth/react';
import { usePostJob } from '@/app/queries/jobs/add-jobs';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const jobType = [
  "Full Time",
  "Part Time",
  "Temporary",
  "Permanent",
  "Contract",
  "Internship"
];

interface JobDetails {
  job_title: string
  job_category: string
  industry: string
  job_type: string
  location: string
  salary: string
  experience: string
  qualification: string
  description: string
}

const page = () => {
  const { data: session } = useSession();
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    job_title: "",
    location: "",
    job_category: "",
    industry: "",
    job_type: "",
    salary: "",
    experience: "",
    qualification: "",
    description: ""
  });

  const { job_title, location, job_category, industry, job_type, salary, experience, qualification, description } = jobDetails;
  const employerId = session?.user?.id;

  const { mutate, isPending, data, isError, isSuccess, error } = usePostJob(employerId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePostJob = async () => {
    try {
      mutate(jobDetails);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
        <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
        <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
          Job Post
        </div>

        <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-base font-semibold' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-base font-semibold text-white'>Job Post</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className='w-full bg-slate-50 py-24'>
        <div className='px-5 md:px-0 flex justify-center mx-auto'>
          <div className='w-full md:w-2/4 p-6 bg-white shadow-sm shadow-gray-200 rounded-md'>
            <form className='w-full text-left'>
              <h3 className='text-xl font-semibold mb-5'>Job Details</h3>
              <div className='flex flex-col gap-3'>
                <label className='font-semibold' htmlFor="job_title">Job Title</label>
                <input onChange={handleInputChange} value={job_title} className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name="job_title" id="job_title" />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="job_category">Job Category</label>
                <select onChange={handleInputChange} value={job_category} className='w-full border border-slate-100 outline-0 text-sm p-2' name="job_category" id="job_category">
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="industry">Industry</label>
                <input onChange={handleInputChange} value={industry} className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='industry' id='industry' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="job_type">Job Type</label>
                <select onChange={handleInputChange} value={job_type} className='w-full border border-slate-100 outline-0 text-sm p-2' name="job_type" id="job_type">
                  <option value="">Select Job Type</option>
                  {jobType.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="location">Location</label>
                <input onChange={handleInputChange} value={location} className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='location' id='location' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="salary">Salary</label>
                <div className='relative'>
                  <span className="size-10 bg-slate-50 border border-slate-100 absolute top-0 start-0 overflow-hidden rounded"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-4 absolute top-3 start-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                  <input onChange={handleInputChange} value={salary} className='w-full border border-slate-100 outline-0 text-sm pr-2 py-2 pl-[50px]' type="tel" name='salary' id='salary' />
                </div>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="experience">Experience</label>
                <input onChange={handleInputChange} value={experience} className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='experience' id='experience' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="qualification">Qualification</label>
                <textarea onChange={handleInputChange} value={qualification} className='w-full border border-slate-100 outline-0 text-sm p-2' name='qualification' id='qualification' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="description">Job Description</label>
                <textarea onChange={handleInputChange} value={description} className='w-full border border-slate-100 outline-0 text-sm p-2' name='description' id='description' />
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
              <button disabled={isPending} onClick={handlePostJob} type="button" className='text-emerald-500 mt-5 cursor-pointer rounded-md px-4 py-2 text-base font-semibold transition-colors duration-500 bg-emerald-600/5 border-emerald-600/10 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white'>
                {isPending ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page