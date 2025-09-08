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
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
                    {/* LEFT: Logo */}
                    <Link href={'/'} className="flex items-center">
                        {/* Desktop Logo */}
                        <Image
                            className="object-cover hidden md:block"
                            src="/logo.png"
                            alt="jobstack"
                            width={140}
                            height={100}
                            priority
                        />
                        {/* Mobile Logo */}
                        <Image
                            className="object-cover md:hidden block"
                            src="/logo-2.png"
                            alt="jobstack"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>

                    {/* CENTER: Nav Links (desktop only) */}
                    <div className="hidden md:flex flex-1 items-center justify-center gap-10">
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
                            Jobs
                        </Link>
                        <Link href="" className={`${stickyNavbar ? "text-emerald-600" : "text-gray-800"} text-base font-semibold`}>
                            Contact Us
                        </Link>
                    </div>

                    {/* RIGHT: Avatar + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        {/* Avatar dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="/user.png" />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-44" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link className="flex items-center gap-2" href={'/'}>
                                            <CiUser size={16} />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className="flex items-center gap-2" href={'/'}>
                                            <CiSettings size={16} />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <IoIosLogOut size={16} />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <CiMenuBurger size={24} className="md:hidden block text-gray-800" />
                            </SheetTrigger>
                            <SheetContent side="top" className="z-[100]">
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
                                <div className="flex flex-col items-start gap-4 px-4 pb-6">
                                    <Link href="" className="text-emerald-600 text-sm font-semibold">Home</Link>
                                    <Link href="" className="text-emerald-600 text-sm font-semibold">About Us</Link>
                                    <Link href="" className="text-emerald-600 text-sm font-semibold">Services</Link>
                                    <Link href="" className="text-emerald-600 text-sm font-semibold">Jobs</Link>
                                    <Link href="" className="text-emerald-600 text-sm font-semibold">Contact Us</Link>
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