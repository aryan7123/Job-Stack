import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
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
            Employer Signup Form
          </h3>
          <form className="w-full mt-3">
            <div className="flex flex-col gap-2.5 mb-3">
              <label
                htmlFor="your_name"
                className="text-base font-bold text-[#161e2d]"
              >
                Your Name:
              </label>
              <input
                type="text"
                name="your_name"
                id="your_name"
                placeholder="Your Name"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
            </div>
            <div className="flex flex-col gap-2.5 mb-3">
              <label
                htmlFor="email"
                className="text-base font-bold text-[#161e2d]"
              >
                Email:
              </label>
              <input
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
                id="password"
                placeholder="Password"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
            </div>
            <div className="flex flex-col gap-2.5 mb-3">
              <label
                htmlFor="confirm_password"
                className="text-base font-bold text-[#161e2d]"
              >
                Confirm Your Password:
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Your Password"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
            </div>
            <div className="flex items-center w-full mt-3">
              <input
                className="size-4 cursor-pointer appearance-none rounded border border-gray-200 dark:border-gray-800 accent-green-600 checked:appearance-auto dark:accent-green-600 focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
                id="terms_conditions"
                type="checkbox"
                name="terms_conditions"
              />
              <label
                className="text-slate-400 font-semibold"
                htmlFor="terms_conditions"
              >
                I Accept{" "}
                <Link
                  className="text-emerald-600 font-semibold"
                  href="#"
                  data-discover="true"
                >
                  Terms And Condition
                </Link>
              </label>
            </div>
            <button
              type="button"
              className={`w-full mt-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 cursor-pointer py-2 px-5 transition-colors duration-500 text-white font-semibold text-base text-center`}
            >
              Register
            </button>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-slate-400 text-sm font-semibold">
                Already have an account ?
              </span>
              <Link
                className="text-[#161e2d] font-semibold text-sm"
                href="/employer-login"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default page