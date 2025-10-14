'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import MultipleFileComponent from '@/components/ui/comp-547';
import { useUpdateEmployerProfile } from '@/app/queries/employers/update-profile';

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
  const { data: session } = useSession();

  const [employerDetails, setEmployerDetails] = useState<EmployerDetails>({
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
    photos: [] as File[],
  });

  const { name, email, industry, companySize, yearFounded, founder, headquarters, website, description, specialties } = employerDetails;
  const employerId = session?.user?.id ?? "";

  const { mutate, isPending, isSuccess, isError, data, error } = useUpdateEmployerProfile(employerId);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialties = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployerDetails((prev) => ({
      ...prev,
      specialties: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEmployerDetails((prev) => ({
        ...prev,
        companyLogo: file,
      }));
    }
  }

  const handleSubmit = () => {
    try {
      mutate(employerDetails);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className='md:w-[78rem] w-screen bg-white relative'>
        <div className="px-5 sm:px-5 md:px-12 py-12">
          <form encType='multipart/form-data' className="bg-white shadow-sm p-6 rounded-md w-full">
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Employer Details
            </h3>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="form-label font-medium">
                  Company Name :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Company Name"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
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
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="industry" className="form-label font-medium">
                  Industry :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Industry"
                  id="industry"
                  type="text"
                  name="industry"
                  value={industry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="companySize" className="form-label font-medium">
                  Company Size :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Company Size"
                  id="companySize"
                  type="text"
                  name="companySize"
                  value={companySize}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="yearFounded" className="form-label font-medium">
                  Year Founded :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Year Founded"
                  id="yearFounded"
                  type="text"
                  name="yearFounded"
                  value={yearFounded}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="headquarters" className="form-label font-medium">
                  Headquarters :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Headquarters"
                  id="headquarters"
                  type="text"
                  name="headquarters"
                  value={headquarters}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="founder" className="form-label font-medium">
                  Founder :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Founder"
                  id="founder"
                  type="text"
                  value={founder}
                  onChange={handleInputChange}
                  name="founder"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="specialties" className="form-label font-medium">
                  Specialties :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Specialties"
                  id="specialties"
                  type="text"
                  name="specialties"
                  value={specialties?.join(", ")}
                  onChange={handleSpecialties}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="companyLogo" className="form-label font-medium">
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
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="website" className="form-label font-medium">
                  Website URL :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Website URL"
                  id="website"
                  type="text"
                  name="website"
                  onChange={handleInputChange}
                  value={website}
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
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
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
            <button
              onClick={handleSubmit}
              type="button"
              disabled={isPending}
              className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
            >
            {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
          <form encType='multipart/form-data' className='bg-white shadow-sm p-6 rounded-md mt-10 w-full'>
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Upload Photos
            </h3>
            <MultipleFileComponent employerId={employerId} />
          </form>
        </div>
      </section>
    </>
  )
}

export default page