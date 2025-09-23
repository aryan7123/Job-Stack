"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
import Image from "next/image"
import { IoIosLogOut } from "react-icons/io"
import {
    IoHomeOutline,
    IoSettingsOutline,
    IoCloseCircleOutline,
} from "react-icons/io5"
import { LuCircleUserRound, LuBriefcaseBusiness } from "react-icons/lu"
import { PiReadCvLogo } from "react-icons/pi"
import { RiDeleteBin6Line } from "react-icons/ri"
import Link from "next/link"
import { MdMenu } from "react-icons/md"

interface AppSidebarProps {
    showSidebar: boolean
    handleShowSidebar: () => void
}

export function AppSidebar({ showSidebar, handleShowSidebar }: AppSidebarProps) {
    const items = [
        { icon: IoHomeOutline, label: "Dashboard" },
        { icon: LuCircleUserRound, label: "My Profile" },
        { icon: PiReadCvLogo, label: "My Resume" },
        { icon: LuBriefcaseBusiness, label: "Applied Jobs" },
        { icon: IoSettingsOutline, label: "Settings" },
        { icon: IoIosLogOut, label: "Logout" },
        { icon: RiDeleteBin6Line, label: "Delete Profile" },
    ]

    return (
        <>
            <header className='w-full fixed bg-white shadow-md border-b border-[#ecedf2] top-0 left-0 z-[99] transition-all'>
                <div className='flex items-center justify-between md:px-[45px] px-6 md:py-7 py-5'>
                    <Link href="/" className='flex items-center gap-2'>
                        <Image
                            className="object-cover hidden md:block"
                            src="/logo.png"
                            alt="jobstack"
                            width={140}
                            height={100}
                            priority
                        />
                        <Image
                            className="object-cover md:hidden block"
                            src="/logo-2.png"
                            alt="jobstack"
                            width={50}
                            height={50}
                            priority
                        />
                    </Link>
                    <SidebarTrigger className="md:hidden block">
                        <MdMenu size={35} />
                    </SidebarTrigger>
                    <div className="hidden md:flex items-center justify-center gap-10">
                        <Link href="" className='text-base font-semibold'>
                            Home
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            About Us
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            Services
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            Companies
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            Jobs
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </header>

            <SidebarProvider>
                <Sidebar
                    collapsible="icon"
                    className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}
                >
                    {/* Mobile header */}
                    <div className="w-full md:hidden flex items-center justify-between px-6 py-4 border-b border-[#ecedf2] shadow-md">
                        <div className="flex items-center gap-2">
                            <Image
                                className="object-cover"
                                src="/logo-2.png"
                                alt="jobstack"
                                width={50}
                                height={50}
                                priority
                            />
                            <h4 className="font-semibold text-xl">Job Stack</h4>
                        </div>
                        <button type="button" className="cursor-pointer" onClick={handleShowSidebar}>
                            <IoCloseCircleOutline size={25} />
                        </button>
                    </div>

                    <SidebarContent className="py-10 md:py-28 px-6 md:px-8">
                        <SidebarGroup>
                            <SidebarGroupLabel className="hidden">Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item, idx) => (
                                        <SidebarMenuItem key={idx}>
                                            <SidebarMenuButton className="flex items-center gap-3 px-3 py-4 rounded-md hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-pointer">
                                                <item.icon className="shrink-0" />
                                                <span className="font-medium">{item.label}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </>
    )
}