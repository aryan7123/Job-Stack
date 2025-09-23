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
import { usePathname } from "next/navigation"
import { MdMenu } from "react-icons/md"

interface AppSidebarProps {
    showSidebar: boolean
    handleShowSidebar: () => void
}

export function AppSidebar({ showSidebar, handleShowSidebar }: AppSidebarProps) {
    const items = [
        { icon: IoHomeOutline, label: "Dashboard", path: "/candidate/dashboard" },
        { icon: LuCircleUserRound, label: "My Profile", path: "/candidate/profile" },
        { icon: PiReadCvLogo, label: "My Resume", path: "/candidate/resume" },
        { icon: LuBriefcaseBusiness, label: "Applied Jobs", path: "/candidate/applied-jobs" },
        { icon: IoSettingsOutline, label: "Settings", path: "/candidate/settings" },
        { icon: IoIosLogOut, label: "Logout", path: "/candidate/logout" },
        { icon: RiDeleteBin6Line, label: "Delete Profile", path: "/candidate/delete-profile" },
    ];

    const pathname = usePathname();

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
                        <Link href="/" className='text-base font-semibold'>
                            Home
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            About Us
                        </Link>
                        <Link href="" className="text-base font-semibold">
                            Services
                        </Link>
                        <Link href="/companies" className="text-base font-semibold">
                            Companies
                        </Link>
                        <Link href="/jobs" className="text-base font-semibold">
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
                        <SidebarGroup className="p-0">
                            <SidebarGroupLabel className="hidden">Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-3">
                                    {items.map((item, idx) => (
                                        <SidebarMenuItem key={idx}>
                                            <SidebarMenuButton className={`px-3 py-5 rounded-md ${pathname === item.path ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white" : "bg-transparent text-inherit hover:bg-emerald-600 hover:text-white"} transition-all duration-300 cursor-pointer`}>
                                                <Link href={item.path} className="flex items-center gap-3">
                                                    <item.icon className="shrink-0" />
                                                    <span className="font-medium text-base">{item.label}</span>
                                                </Link>
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