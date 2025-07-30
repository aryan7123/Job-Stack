import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaDribbble, FaBehance } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <section className='w-full bg-slate-900'>
        <div className='max-w-6xl mx-auto flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between py-8'>
          <Image
            className="object-cover"
            src="/footer-logo.png"
            alt="jobstack"
            width={140}
            height={100}
            priority
          />
          <div className='flex items-center justify-center gap-5'>
            <Link href="" className='text-gray-300 hover:text-gray-400 text-base transition-colors font-semibold'>
              Home
            </Link>
            <Link href="" className='text-gray-300 hover:text-gray-400 text-base transition-colors font-semibold'>
              About Us
            </Link>
            <Link href="" className='text-gray-300 hover:text-gray-400 text-base transition-colors font-semibold'>
              Services
            </Link>
            <Link href="" className='text-gray-300 hover:text-gray-400 text-base transition-colors font-semibold'>
              Blogs
            </Link>
            <Link href="" className='text-gray-300 hover:text-gray-400 text-base transition-colors font-semibold'>
              Contact Us
            </Link>
          </div>
        </div>
        <div className='w-full border-b border-gray-800'></div>
        <div className='max-w-6xl mx-auto flex md:flex-row flex-col md:gap-0 gap-5 items-center justify-between py-8'>
          <span className='text-gray-300 font-semibold'>©2025 Jobstack. All Rights Reserved</span>
          <ul className="flex items-center gap-2">
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaFacebookF />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaInstagram />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaLinkedin />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaTwitter />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaDribbble />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <FaBehance />
            </li>
            <li className='border border-gray-800 rounded-md flex items-center justify-center size-8 text-white text-base transition-colors hover:bg-emerald-600 duration-500 cursor-pointer p-2'>
              <MdMailOutline />
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Footer