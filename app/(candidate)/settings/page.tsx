"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import SkillsSelectComponent from "@/components/comp-235";
import FileInputComponent from "@/components/comp-30";

import { useDispatch, useSelector } from "react-redux";
import {
  candidatePersonalDetails,
  resetStatus,
} from "@/app/store/features/candidates/personalDetails";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.candidate);

  useEffect(() => {
    if (status === "unauthenticated" || (!session && status !== "loading")) {
      router.push("/login");
    }
  }, [status, session, router]);

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

  const [btnText, setBtnText] = useState("Save Changes");
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

  useEffect(() => {
    if (session?.user?.id) {
      setPersonalDetails((prev) => ({
        ...prev,
        userId: session.user.id,
      }));
    }
  }, [session?.user?.id]);

  const {
    your_name,
    email,
    occupation,
    location,
    education,
    experience,
    skills,
    resume,
    phone,
    website_url,
    description,
    userId,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPersonalDetails((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleUpdatePersonalDetails = async () => {
    setBtnText("Saving...");

    try {
      const formData = new FormData();

      if (your_name) formData.append("your_name", your_name);
      if (email) formData.append("email", email);
      if (occupation) formData.append("occupation", occupation);
      if (location) formData.append("location", location);
      if (education) formData.append("education", education);
      if (experience) formData.append("experience", experience);
      if (phone) formData.append("phone", phone);
      if (website_url) formData.append("website_url", website_url);
      if (description) formData.append("description", description);
      if (userId) formData.append("userId", userId);

      if (skills.length > 0) {
        skills.forEach((skill) => {
          formData.append("skills", skill);
        });
      }

      if (resume) {
        formData.append("resume", resume);
      }

      const result = dispatch(candidatePersonalDetails(formData));
      if (result) {
        setBtnText("Success!");
      } else {
        setBtnText("Save Changes");
      }

      setTimeout(() => setBtnText("Save Changes"), 2000);
    } catch (error) {
      console.error(error);
      setBtnText("Save Changes");
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <>
      <Navbar />

      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-0 py-24">
          <div className="relative text-transparent">
            <input
              type="file"
              name="background"
              id="background"
              className="hidden"
            />
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
              <label
                htmlFor="background"
                className="absolute inset-0 cursor-pointer"
              ></label>
            </div>
            <div className="absolute -bottom-12 left-3 flex items-end gap-2 w-full">
              <input
                type="file"
                name="profile"
                id="profile"
                className="hidden"
              />
              <Image
                src="/assets/01--4QesCJS.jpg"
                width={100}
                height={100}
                className="object-cover rounded-full size-28"
                alt="profile-banner"
                quality={100}
                priority
              />
              <label
                htmlFor="profile"
                className="absolute inset-0 cursor-pointer"
              ></label>
              <div className="text-gray-800 text-lg font-semibold w-full">
                {session?.user?.name}
              </div>
            </div>
          </div>
          <form
            encType="multipart/form-data"
            className="bg-white shadow-sm p-6 mt-28 rounded-md"
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
                  value={your_name}
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
                  value={email}
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
              <div className="flex flex-col gap-1.5">
                <FileInputComponent handleFileChange={handleFileChange} />
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
            {error && (
              <div className="text-sm font-semibold text-red-600 my-3">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm font-semibold text-green-600 my-3">
                {success}
              </div>
            )}
            <button
              disabled={loading}
              onClick={handleUpdatePersonalDetails}
              type="button"
              className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
            >
              {btnText}
            </button>
          </form>

          <form className="bg-white shadow-sm p-6 mt-14 rounded-md">
            <h3 className="text-xl mb-6 font-semibold text-gray-800">
              Social Media
            </h3>
            <div className="md:flex">
              <div className="md:w-1/3">
                <span className="font-medium">Twitter</span>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="form-icon relative">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 absolute top-5 start-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  <input
                    className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12 font-medium"
                    placeholder="Twitter Profile Name"
                    id="twitter_name"
                    type="text"
                    name="name"
                  />
                </div>
                <p className="text-slate-400 mt-1">
                  Add your Twitter username.
                </p>
              </div>
            </div>
            <div className="md:flex mt-8">
              <div className="md:w-1/3">
                <span className="font-medium">Instagram</span>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="form-icon relative">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 absolute top-5 start-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <input
                    className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12"
                    placeholder="Instagram Profile Name"
                    id="insta_name"
                    type="text"
                    name="name"
                  />
                </div>
                <p className="text-slate-400 mt-1">
                  Add your Instagram username.
                </p>
              </div>
            </div>
            <div className="md:flex mt-8">
              <div className="md:w-1/3">
                <span className="font-medium">Linkedin</span>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="form-icon relative">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 absolute top-5 start-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <input
                    className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12"
                    placeholder="Linkedin Profile Name"
                    id="linkedin_name"
                    type="text"
                    name="name"
                  />
                </div>
                <p className="text-slate-400 mt-1">
                  Add your Linkedin username.
                </p>
              </div>
            </div>
            <div className="md:flex mt-8">
              <div className="md:w-1/3">
                <span className="font-medium">Youtube</span>
              </div>
              <div className="md:w-2/3 mt-4 md:mt-0">
                <div className="form-icon relative">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 absolute top-5 start-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                  <input
                    className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12"
                    placeholder="Youtube url"
                    id="you_url"
                    type="url"
                    name="url"
                  />
                </div>
                <p className="text-slate-400 mt-1">Add your Youtube url.</p>
              </div>
            </div>
            <button
              type="button"
              className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default page;
