"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetStatus } from "../store/features/candidates/loginSlice";
import { signIn } from "next-auth/react";

const page = () => {
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [btnText, setBtnText] = useState("Login");

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

  const handleLoginUser = async () => {
    setBtnText("Signing in...");
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      setBtnText("Success!");
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: "/candidate/profile",
        role: "candidate"
      });
    } catch (error) {
      setBtnText("Try Again");
      setTimeout(() => setBtnText("Login"), 2000);
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
          <h3 className="text-center my-3 font-bold text-[#161e2d] text-3xl">
            Login Form
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
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
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
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                className="rounded text-sm font-semibold p-2 border border-[#e4e4e4] focus:outline-1 outline-emerald-300"
              />
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
              type="button"
              onClick={handleLoginUser}
              disabled={loading}
              className="w-full mt-1.5 rounded-md py-2 px-5 transition-colors duration-500 bg-emerald-600 text-white font-semibold tetx-base hover:bg-emerald-700 text-center cursor-pointer"
            >
              {btnText}
            </button>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-slate-400 text-sm font-semibold">
                Don&apos;t have an account ?
              </span>
              <Link
                className="text-[#161e2d] font-semibold text-sm"
                href="/candidate-signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default page;
