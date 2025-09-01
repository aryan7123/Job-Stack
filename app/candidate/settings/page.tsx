'use client';

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Loader from '@/components/ui/Loader';

import Socials from '../components/Socials';
import Passwords from '../components/Passwords';

import SkillsSelectComponent from '@/components/ui/comp-235';
import { useUpdateProfile } from '@/app/queries/candidates/update-profile';
import { useUpdateCandidatePhotos } from '@/app/queries/candidates/upload-photos';

interface PersonalDetails {
  your_name: string;
  email: string;
  occupation: string;
  location: string;
  education: string;
  experience: string;
  phone: string;
  website_url: string;
  skills: string[];
  resume: File | null;
  description: string;
  userId: string;
}

const page = () => {
  const { data: session, status } = useSession();
  const { mutate, data, isError, isPending, error, isSuccess } = useUpdateProfile(session?.user?.id);
  const mutation = useUpdateCandidatePhotos(session?.user?.id);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    your_name: "",
    email: "",
    occupation: "",
    location: "",
    education: "",
    experience: "",
    skills: [],
    phone: "",
    website_url: "",
    resume: null,
    description: "",
    userId: "",
  });
  const [photos, setPhotos] = useState({
    profile_picture: null,
    background: null
  });

  const occupations = [
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
  ];

  const {
    your_name,
    email,
    occupation,
    location,
    education,
    experience,
    phone,
    website_url,
    description
  } = personalDetails;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) { 
      const file = e.target.files[0]; 
      setPersonalDetails((prev) => ({ ...prev, resume: file, })); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setPhotos((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  }

  const handleUpdatePersonalDetails = async () => {
    try {
      mutate(personalDetails);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUploadPhotos = async () => {
    try {
      mutation.mutate(photos);
    } catch (error) {
      console.log(error);
    }
  }

  if (status === "loading") return <Loader />

  return (
    <>
      <Navbar />

      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-0 py-24">
          <div className="relative text-transparent">
            <div className="relative shrink-0">
              <Image
                src={"/assets/bg5-BQCe0yqf.jpg"}
                width={1024}
                height={256}
                className="object-cover rounded-xl w-full h-64"
                alt="profile-banner"
                quality={100}
                priority
              />
            </div>
            <div className="absolute -bottom-12 left-3 flex items-end gap-2 w-full">
              <Image
                src="/assets/01--4QesCJS.jpg"
                width={100}
                height={100}
                className="object-cover rounded-full size-28"
                alt="profile-banner"
                quality={100}
                priority
              />
              <div className="text-gray-800 text-lg font-semibold w-full">
                {session?.user?.name}
              </div>
            </div>
          </div>
          <form encType="multipart/form-data" className="bg-white shadow-sm p-6 mt-28 rounded-md">
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Upload Your Profile Picture
            </h3>
            <div className="flex flex-col gap-1.5 mb-4">
              <label htmlFor="profile_picture" className="form-label font-medium">
                Profile Picture :<span className="text-red-600">*</span>
              </label>
              <Input type='file' name='profile_picture' onChange={handleFileChange} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="background" className="form-label font-medium">
                Background Picture :<span className="text-red-600">*</span>
              </label>
              <Input type='file' name='background' onChange={handleFileChange} />
            </div>
            <button onClick={handleUploadPhotos} type="button" className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5">Upload</button>
          </form>
          <form
            encType="multipart/form-data"
            className="bg-white shadow-sm p-6 mt-14 rounded-md"
          >
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Personal Details
            </h3>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="your_name" className="form-label font-medium">
                  Your Name :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Your Name"
                  id="your_name"
                  type="text"
                  name="your_name"
                  onChange={handleInputChange}
                  value={your_name ?? session?.user?.name ?? ""}
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
                  onChange={handleInputChange}
                  value={email ?? session?.user?.email ?? ""}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="occupation" className="form-label font-medium">
                  Occupation :<span className="text-red-600">*</span>
                </label>
                <select
                  value={occupation}
                  name="occupation"
                  id="occupation"
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  onChange={handleInputChange}
                >
                  <option defaultValue="Select Occupation">
                    Select Occupation
                  </option>
                  {occupations.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="form-label font-medium">
                  Location :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Location"
                  id="location"
                  type="text"
                  name="location"
                  onChange={handleInputChange}
                  value={location}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="education" className="form-label font-medium">
                  Education :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Education"
                  id="education"
                  type="text"
                  name="education"
                  onChange={handleInputChange}
                  value={education}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="experience" className="form-label font-medium">
                  Experience :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Experience"
                  id="experience"
                  type="text"
                  name="experience"
                  onChange={handleInputChange}
                  value={experience}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="form-label font-medium">
                  Phone Number :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Phone Number"
                  id="phone"
                  type="text"
                  name="phone"
                  onChange={handleInputChange}
                  value={phone}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="website_url" className="form-label font-medium">
                  Website URL :<span className="text-red-600">*</span>
                </label>
                <input
                  className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                  placeholder="Website URL"
                  id="website_url"
                  type="text"
                  name="website_url"
                  onChange={handleInputChange}
                  value={website_url}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <SkillsSelectComponent
                  skills={personalDetails.skills}
                  handleSkillsChange={(selected: string[]) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      skills: selected,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5 md:mt-[-8px] mt-0">
                <label htmlFor="resume" className="form-label font-medium">
                  Select Resume :<span className="text-red-600">*</span>
                </label>
                <Input type='file' name='resume' onChange={handleResumeChange} />
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
                  onChange={handleInputChange}
                  value={description}
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
              onClick={handleUpdatePersonalDetails}
              type="button"
              disabled={isPending}
              className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <Socials />
          <Passwords />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default page