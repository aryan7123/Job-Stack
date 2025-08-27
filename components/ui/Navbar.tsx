'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { CiUser, CiSettings, CiMenuBurger } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const { data: session } = useSession();
    const [stickyNavbar, setStickyNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setStickyNavbar(true);
            } else {
                setStickyNavbar(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`w-full ${stickyNavbar ? "bg-white shadow" : "bg-emerald-600/5 shadow-none"} sticky transition-all ease-in-out duration-300 top-0 left-0 z-[99] md:px-0 px-5 py-5`}>
                <div className='max-w-6xl mx-auto flex items-center justify-between'>
                    <Link href={'/'}>
                        <Image
                            className="object-cover md:block hidden"
                            src="/logo.png"
                            alt="jobstack"
                            width={140}
                            height={100}
                            priority
                        />
                    </Link>
                    <Link href={'/'} className='md:mr-0 mr-auto'>
                        <Image
                            className="object-cover md:hidden block"
                            src="/logo-2.png"
                            alt="jobstack"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                    <div className='md:flex hidden items-center justify-center gap-6'>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            Home
                        </Link>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            About Us
                        </Link>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            Services
                        </Link>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            Blogs
                        </Link>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            Contact Us
                        </Link>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <div className="relative">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-lg absolute top-[8px] end-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            <input className="py-2 px-3 text-[14px] border border-gray-100 outline-none h-9 !pe-10 rounded-3xl sm:w-44 w-36 bg-white" id="searchItem" placeholder="Search..." type="text" name="s" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="/user.png" />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-44" align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer font-medium text-sm text-gray-800 hover:text-emerald-600 transition-colors">
                                        <Link className='flex items-center gap-2' href={'/'}>
                                            <CiUser size={16} className='text-inherit' />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer font-medium text-sm text-gray-800 hover:text-emerald-600 transition-colors">
                                        <Link className='flex items-center gap-2' href={'/'}>
                                            <CiSettings size={16} className='text-inherit' />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="group flex cursor-pointer items-center gap-2 font-medium text-sm text-gray-800 hover:text-emerald-600 transition-colors">
                                    <IoIosLogOut size={16} className='text-inherit' />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Sheet>
                            <SheetTrigger asChild>
                                <CiMenuBurger size={24} className='md:hidden block text-gray-800' />
                            </SheetTrigger>
                            <SheetContent side='top' className='z-[100]'>
                                <SheetHeader>
                                    <SheetTitle>
                                        <Image
                                            className="object-cover"
                                            src="/logo.png"
                                            alt="jobstack"
                                            width={140}
                                            height={100}
                                            priority
                                        />
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col items-start justify-start px-4 gap-4 pb-6">
                                    <Link href="" className='text-emerald-600 text-sm font-semibold'>
                                        Home
                                    </Link>
                                    <Link href="" className='text-emerald-600 text-sm font-semibold'>
                                        About Us
                                    </Link>
                                    <Link href="" className='text-emerald-600 text-sm font-semibold'>
                                        Services
                                    </Link>
                                    <Link href="" className='text-emerald-600 text-sm font-semibold'>
                                        Blogs
                                    </Link>
                                    <Link href="" className='text-emerald-600 text-sm font-semibold'>
                                        Contact Us
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar