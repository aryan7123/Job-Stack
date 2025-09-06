import React from 'react'

import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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

const page = () => {
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
                <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name="job_title" id="job_title" />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="job_category">Job Category</label>
                <select className='w-full border border-slate-100 outline-0 text-sm p-2' name="job_category" id="job_category">
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="industry">Industry</label>
                <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='industry' id='industry' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="job_type">Job Type</label>
                <select className='w-full border border-slate-100 outline-0 text-sm p-2' name="job_type" id="job_type">
                  <option value="">Select Job Type</option>
                  {jobType.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="location">Location</label>
                <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='location' id='location' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="salary">Salary</label>
                <div className='relative'>
                  <span className="size-10 bg-slate-50 border border-slate-100 absolute top-0 start-0 overflow-hidden rounded"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="size-4 absolute top-3 start-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                  <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="tel" name='salary' id='salary' />
                </div>
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="experience">Experience</label>
                <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='experience' id='experience' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="qualification">Qualification</label>
                <input className='w-full border border-slate-100 outline-0 text-sm p-2' type="text" name='qualification' id='qualification' />
              </div>
              <div className='flex flex-col gap-3 mt-5'>
                <label className='font-semibold' htmlFor="description">Job Description</label>
                <textarea className='w-full border border-slate-100 outline-0 text-sm p-2' name='description' id='description' />
              </div>
              <button type="button" className='text-emerald-500 mt-5 cursor-pointer rounded-md px-4 py-2 text-base font-semibold transition-colors duration-500 bg-emerald-600/5 border-emerald-600/10 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white'>Post</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page