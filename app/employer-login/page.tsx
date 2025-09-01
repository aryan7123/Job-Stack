'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginEmployer = async () => {
    try {

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='w-full h-screen flex items-center justify-center relative overflow-hidden bg-center bg-no-repeat bg-cover bg-[url("/banner/bg3-BPJFnXM6.jpg")]'>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="w-[400px] md:w-[500px] bg-white relative overflow-hidden p-6 rounded-xl shadow-md">
          <Image
            className="object-cover text-center mx-auto"
            src="/logo.png"
            alt="jobstack"
            width={100}
            height={100}
            priority
          />
          <h3 className="text-center my-4 font-bold text-[#161e2d] text-3xl">
            Employer Login Form
          </h3>
          <form className="w-full mt-3">
            <div className="flex flex-col gap-2.5 mb-3">
              <label
                htmlFor="email"
                className="text-base font-bold text-[#161e2d]"
              >
                Email:
              </label>
              <input
                value={email}
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
            </div>
            <div className="flex flex-col gap-2.5 mb-3">
              <label
                htmlFor="password"
                className="text-base font-bold text-[#161e2d]"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                id="password"
                placeholder="Password"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
            </div>
            <button
              onClick={handleLoginEmployer}
              type="button"
              className="w-full mt-1.5 rounded-md py-2 px-5 transition-colors duration-500 bg-emerald-600 text-white font-semibold tetx-base hover:bg-emerald-700 text-center cursor-pointer"
            >
              Login
            </button>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-slate-400 text-sm font-semibold">
                Don&apos;t have an account ?
              </span>
              <Link
                className="text-[#161e2d] font-semibold text-sm"
                href="/employer-signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default page