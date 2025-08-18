'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import MultipleFileComponent from '@/components/comp-547';

interface EmployerDetails {
  employerId?: string;
  name: string;
  email: string;
  industry?: string;
  companySize?: string;
  yearFounded?: string;
  founder?: string;
  headquarters?: string;
  website?: string;
  description?: string;
  specialties?: string[];
  companyLogo?: File | null;
  photos?: File[] | null;
}

const page = () => {
  const [employerDetails, setEmployerDetails] = useState<EmployerDetails>({
    employerId: "",
    name: "",
    email: "",
    industry: "",
    companySize: "",
    yearFounded: "",
    founder: "",
    headquarters: "",
    website: "",
    description: "",
    specialties: [],
    companyLogo: null,
    photos: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEmployerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEmployerDetails((prev) => ({
        ...prev,
        companyLogo: file,
      }));
    }
  };

  return (
    <>
      <Navbar />

      <section className='w-full bg-white'>
        <div className="max-w-6xl mx-auto px-5 md:px-0 py-24">
          <form className="bg-white shadow-sm p-6 rounded-md">
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Employer Details
            </h3>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="your_name" className="form-label font-medium">
                  Company Name :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Company Name"
                  id="company_name"
                  type="text"
                  name="company_name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="form-label font-medium">
                  Email Address :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Email Address"
                  id="email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="occupation" className="form-label font-medium">
                  Industry :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Industry"
                  id="industry"
                  type="email"
                  name="industry"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="form-label font-medium">
                  Company Size :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Company Size"
                  id="companySize"
                  type="text"
                  name="companySize"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="education" className="form-label font-medium">
                  Year Founded :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Year Founded"
                  id="yearFounded"
                  type="text"
                  name="yearFounded"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="experience" className="form-label font-medium">
                  Headquarters :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Headquarters"
                  id="headquarters"
                  type="text"
                  name="headquarters"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="form-label font-medium">
                  Founder :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Founder"
                  id="founder"
                  type="text"
                  name="founder"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="form-label font-medium">
                  Specialties :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Specialties"
                  id="specialties"
                  type="text"
                  name="specialties"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="form-label font-medium">
                  Company Logo :<span className="text-red-600">*</span>
                </label>
                <input
                  className="mt-2 block border rounded-sm w-full text-sm
                  file:mr-4 file:py-2.5 file:px-2
                  file:rounded-lg file:border-slate-300
                  file:text-sm file:font-semibold
                  file:bg-gray-300 file:text-white
                  hover:file:bg-gray-400
                  cursor-pointer"
                  placeholder="Company Logo"
                  id="companyLogo"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  name="companyLogo"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="website_url" className="form-label font-medium">
                  Website URL :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Website URL"
                  id="website"
                  type="text"
                  name="website"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mt-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="form-label font-medium">
                  Description :<span className="text-red-600">*</span>
                </label>
                <textarea
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  name="description"
                  id="description"
                ></textarea>
              </div>
            </div>
            {/* {error && (
              <div className="text-sm font-semibold text-red-600 my-3">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm font-semibold text-green-600 my-3">
                {success}
              </div>
            )} */}
            <button
              type="button"
              className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
            >
              Save Changes
            </button>
          </form>
          <form encType='multipart/form-data' className='bg-white shadow-sm p-6 rounded-md mt-10'>
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Upload Photos
            </h3>
            <MultipleFileComponent />
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page