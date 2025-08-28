'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Loader from '@/components/ui/Loader';

import { MdOutlineAttachEmail, MdOutlinePermPhoneMsg, MdOutlineLocationOn, MdMenuBook } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoShareSocialSharp } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Navbar />

      

      <Footer />
    </>
  )
}

export default page