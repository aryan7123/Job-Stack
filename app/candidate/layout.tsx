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
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <SidebarProvider>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar collapsible="icon" className="transition-transform">
                    {/* Mobile sidebar header */}
                    <SidebarContent className="py-28 px-6 md:px-8">
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

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
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

                            {/* Desktop nav */}
                            <div className="hidden md:flex items-center justify-center gap-10">
                                <Link href="/" className="text-base font-semibold">
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

                    {/* Page Content (with header height offset) */}
                    <main className="w-full pt-20 md:pt-24">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
