'use client';

import Image from "next/image";

import { FaBriefcase, FaSearch, FaDesktop, FaStopwatch, FaCameraRetro, FaPlay } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline, IoIosMail } from "react-icons/io";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const categories = [
    "Human Resource",
    "It & Networking",
    "Sales & Marketing",
    "Accounting",
    "Project Manager",
    "Consultant",
    "Data Science",
    "Help Centre",
    "Software Developer",
    "Full Stack Developer"
  ];

  return (
    <>
      <Navbar />
      <section className="w-full relative">
        <div className="absolute inset-0 bg-emerald-600/5 pointer-events-none"></div>
        <div className="relative py-24 w-full bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 to-transparent">
          <div className="w-[inherit] max-w-6xl mx-auto flex md:flex-row flex-col-reverse items-center justify-center md:px-0 px-5 md:gap-14 gap-10">
            <div className="bg-white w-full md:w-1/2 rounded-xl shadow-sm p-6">
              <h3 className="text-gray-800 font-semibold text-3xl mb-3">Find Your Expected Job</h3>
              <p className="text-slate-400">Find Jobs, Employment & Career Opportunities. Some of the companies we&apos;ve helped recruit excellent applicants over the years.</p>
              <form action="" className="mt-6">
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="" className="font-medium text-gray-800">Search:</label>
                  <div className="w-full flex items-center gap-3 bg-gray-50 px-3 py-3.5">
                    <FaSearch className="text-emerald-600" />
                    <input type="text" className="w-[inherit] outline-none text-sm" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="" className="font-medium text-gray-800">Location:</label>
                  <div className="w-full flex items-center gap-3 bg-gray-50 px-3 py-3.5">
                    <FaLocationDot className="text-emerald-600" />
                    <select name="" id="" className="w-[inherit] outline-none text-sm">
                      <option defaultValue="Select Country">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Germany">Germany</option>
                      <option value="Cannada">Cannada</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="France">France</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="" className="font-medium text-gray-800">Job Type:</label>
                  <div className="w-full flex items-center gap-3 bg-gray-50 px-3 py-3.5">
                    <FaBriefcase className="text-emerald-600" />
                    <select name="" id="" className="w-[inherit] outline-none text-sm">
                      <option defaultValue="Select Type">Select Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Remote">Remote</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="bg-emerald-600 mt-2 text-white rounded-md font-semibold text-base transition-colors duration-300 hover:bg-emerald-700 px-7 py-3 cursor-pointer">
                  Search
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                className="w-[inherit] md:w-[540px] md:h-[450px] h-auto object-contain"
                src="banner/woman_working_2-CtRt_vob.svg"
                width={100}
                height={100}
                alt="woman-banner"
                priority
                quality={100}
              />
            </div>
          </div>
          <div className="w-full mx-auto max-w-6xl mt-16 flex flex-wrap md:justify-between justify-center gap-10 px-5 md:px-0">
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/android-DxDSUxh3.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/whatsapp-DI6pEZsf.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/circle-logo-De1zeqcD.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/facebook-logo-BA8KIyWJ.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/google-logo-BMGBKr3O.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/lenovo-logo-CWm1nm3g.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/linkedin-Df_VHV2-.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/skype-8LcG9xH2.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/spotify-C55lgJAb.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
            <div className="animate-bounce size-12 bg-white shadow-sm shadow-gray-200 flex items-center justify-center py-4 rounded-md transition duration-300">
              <Image
                src="/assets/telegram-hDmYG96g.png"
                width={30}
                height={30}
                alt="android-logo"
              />
            </div>
          </div>
        </div>
        <div className="w-full pb-16 bg-white max-w-6xl mx-auto px-5 md:px-0">
          <div className="flex flex-col gap-5 items-center justify-center">
            <h3 className="text-3xl font-semibold">How it&apos;s Work?</h3>
            <span className="text-slate-400 text-sm text-center max-w-xl font-medium">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</span>
          </div>
          <div className="flex md:flex-row flex-col gap-8 items-center justify-between mt-6">
            <div className="p-6 bg-white flex flex-col items-center justify-center transition hover:shadow-xl hover:shadow-gray-100 rounded-2xl duration-500">
              <div className="size-14 bg-emerald-600/5 text-emerald-500 rounded-xl shadow-xs flex items-center justify-center transition">
                <FaDesktop size={20} />
              </div>
              <h3 className="text-base font-semibold mt-3.5 hover:text-emerald-500">Create Account</h3>
              <p className="text-slate-400 text-sm text-center mt-3">Sign up quickly to access job listings or start posting openings as a recruiter.</p>
              <div className="mt-5">
                <Link href="#" className="inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-emerald-600 hover:text-emerald-600 after:bg-emerald-600">
                  Read More
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ms-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path></svg>
                </Link>
              </div>
            </div>
            <div className="p-6 bg-white flex flex-col items-center justify-center shadow-xl shadow-gray-100 transition duration-500 rounded-2xl">
              <div className="size-14 bg-emerald-600/5 text-emerald-500 rounded-xl shadow-xs flex items-center justify-center transition">
                <FaStopwatch size={20} />
              </div>
              <h3 className="text-base font-semibold mt-3.5 hover:text-emerald-500">Complete Your Profile</h3>
              <p className="text-slate-400 text-sm text-center mt-3">Add your skills, experience, and preferences to get matched with the right opportunities.</p>
              <div className="mt-5">
                <Link href="#" className="inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-emerald-600 hover:text-emerald-600 after:bg-emerald-600">
                  Read More
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ms-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path></svg>
                </Link>
              </div>
            </div>
            <div className="p-6 bg-white flex flex-col items-center justify-center transition hover:shadow-xl hover:shadow-gray-100 rounded-2xl duration-500">
              <div className="size-14 bg-emerald-600/5 text-emerald-500 rounded-xl shadow-xs flex items-center justify-center transition">
                <FaCameraRetro size={20} />
              </div>
              <h3 className="text-base font-semibold mt-3.5 hover:text-emerald-500">Apply For Job or Hire</h3>
              <p className="text-slate-400 text-sm text-center mt-3">Start applying for your dream job or connect with the perfect candidate.</p>
              <div className="mt-5">
                <Link href="#" className="inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-emerald-600 hover:text-emerald-600 after:bg-emerald-600">
                  Read More
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ms-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pb-16 bg-white max-w-6xl flex md:flex-row flex-col md:items-center items-start md:justify-center justify-start mx-auto px-5 md:px-0 md:gap-0 gap-10">
          <div className="relative w-full md:w-1/2">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-6">
                <div className="grid grid-cols-1 gap-6">
                  <Image
                    className="shadow-sm w-56 h-52 rounded-md object-cover"
                    src="/assets/ab03-sCMv19D3.jpg"
                    width={100}
                    height={100}
                    priority
                    quality={100}
                    alt=""
                  />
                  <Image
                    className="shadow-sm w-56 h-52 rounded-md object-cover"
                    src="/assets/ab02-Dnw9ga1r.jpg"
                    width={100}
                    priority
                    quality={100}
                    height={100}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-span-6 md:-ml-14 -ml-0">
                <div className="grid grid-cols-1 gap-6">
                  <Image 
                    className="shadow-sm w-56 h-[260px] rounded-md object-cover" 
                    src="/assets/ab01-Dky8rhyA.jpg"
                    alt="" 
                    width={100}
                    priority
                    quality={100}
                    height={100} 
                  />
                </div>
              </div>
            </div>
            <div className="absolute cursor-pointer size-20 bg-white rounded-full flex items-center justify-center text-emerald-600 top-1/2 md:left-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaPlay />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="md:text-4xl text-3xl font-bold mb-6">Get the job of you dreams <br /> quick & easy.</h3>
            <p className="text-base text-slate-400 max-w-xl">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
            <ul className="mt-6">
              <li className="flex items-start gap-2 mb-2.5">
                <IoIosCheckmarkCircleOutline size={20} className="text-emerald-600 font-bold" />
                <span className="text-base text-slate-400 -mt-1">Digital Marketing Solutions for Tomorrow</span>
              </li>
              <li className="flex items-start gap-2 mb-2.5">
                <IoIosCheckmarkCircleOutline size={20} className="text-emerald-600 font-bold" />
                <span className="text-base text-slate-400 -mt-1">Our Talented & Experienced Marketing Agency</span>
              </li>
              <li className="flex items-start gap-2">
                <IoIosCheckmarkCircleOutline size={20} className="text-emerald-600 font-bold" />
                <span className="text-base text-slate-400 -mt-1">Create your own skin to match your brand</span>
              </li>
            </ul>
            <button type="button" className="flex items-center mt-6 gap-1.5 text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300 cursor-pointer rounded-md font-semibold py-3.5 px-3">
              <IoIosMail size={20} />
              <span className="-mt-[2px]">Contact Us</span>
            </button>
          </div>
        </div>
        <div className="w-full pb-16 bg-white max-w-6xl mx-auto px-5 md:px-0">
          <h3 className="text-3xl md:text-4xl font-semibold mb-6">Browse by Categories</h3>
          <div className="flex md:flex-row flex-col md:gap-0 gap-3 md:items-center items-start justify-between">
            <p className="text-slate-400 text-base font-medium">Search your career opportunity with our categories</p>
            <Link href="#" className="inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-emerald-600 hover:text-emerald-600 after:bg-emerald-600">
              All Categories
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ms-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path></svg>
            </Link>
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-[30px]">
            {categories.map((item, index) => (
              <div key={index} className="group rounded-md shadow-sm shadow-gray-200 bg-slate-50 transition-all duration-500 hover:bg-emerald-600 p-4 cursor-pointer">
                <h3 className="text-lg font-semibold group-hover:text-white mb-2.5">{item}</h3>
                <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:text-white">
                  <span>Read More</span>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="ms-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
