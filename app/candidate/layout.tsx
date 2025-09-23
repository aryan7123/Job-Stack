"use client"

import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { MdMenu } from "react-icons/md"
import { IoCloseCircleOutline, IoHomeOutline, IoSettingsOutline, IoLogOut } from "react-icons/io5"
import { LuCircleUserRound, LuBriefcaseBusiness } from "react-icons/lu"
import { PiReadCvLogo } from "react-icons/pi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoIosLogOut } from "react-icons/io"

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <SidebarProvider className="">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar collapsible="icon" className="transition-transform">
                    {/* Mobile sidebar header */}
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
                        <IoCloseCircleOutline size={25} className="cursor-pointer" />
                    </div>

                    <SidebarContent className="py-10 md:py-28 px-6 md:px-8">
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel className="hidden">Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-4 md:space-y-6">
                                    {items.map((item, idx) => (
                                        <SidebarMenuItem key={idx}>
                                            <SidebarMenuButton
                                                className="
                                                    flex items-center gap-4
                                                    px-4 py-5
                                                    rounded-lg
                                                    hover:bg-emerald-600 hover:text-white
                                                    transition-all cursor-pointer
                                                "
                                            >
                                                <item.icon className="shrink-0 text-xl md:text-2xl" />
                                                <span className="font-semibold text-base md:text-lg lg:text-xl">
                                                    {item.label}
                                                </span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header with SidebarTrigger */}
                    <header className="w-full fixed bg-white shadow-md border-b border-[#ecedf2] top-0 left-0 z-[99] h-16 md:h-20">
                        <div className="flex items-center justify-between h-full px-6 md:px-[45px]">
                            <Link href="/" className="flex items-center gap-2">
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

                            {/* Sidebar toggle button on mobile */}
                            <SidebarTrigger className="md:hidden block">
                                <MdMenu size={35} />
                            </SidebarTrigger>

                            <div className="hidden md:flex items-center justify-center gap-10">
                                <Link href="" className="text-base font-semibold">Home</Link>
                                <Link href="" className="text-base font-semibold">About Us</Link>
                                <Link href="" className="text-base font-semibold">Services</Link>
                                <Link href="" className="text-base font-semibold">Companies</Link>
                                <Link href="" className="text-base font-semibold">Jobs</Link>
                                <Link href="" className="text-base font-semibold">Contact Us</Link>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
