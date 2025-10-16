"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";

import { MdSpaceDashboard, MdMenu } from "react-icons/md";
import { BsGearFill, BsFillBriefcaseFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut, IoMdApps } from "react-icons/io";

export default function Layout({ children }: { children: React.ReactNode }) {
    const items = [
        {
            icon: MdSpaceDashboard,
            label: "Dashboard",
            path: "/employer/dashboard"
        },
        {
            icon: BsFillBriefcaseFill,
            label: "Post a Job",
            path: "/employer/job-post"
        },
        {
            icon: IoMdApps,
            label: "Applications",
            path: "/employer/all-applications"
        },
        {
            icon: CgProfile,
            label: "Profile",
            path: "/employer/profile"
        },
        {
            icon: BsGearFill,
            label: "Settings",
            path: "/employer/settings"
        },
        {
            icon: IoIosLogOut,
            label: "Logout",
            path: "/employer-login"
        }
    ];

    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <>
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
                                                {item.path === "/employer-login" ? (
                                                    <SidebarMenuButton
                                                        onClick={() => signOut()}
                                                        className={`px-3 py-5 rounded-md flex items-center gap-3 ${pathname === item.path
                                                            ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                                                            : "bg-transparent text-inherit hover:bg-emerald-600 hover:text-white"
                                                            } transition-all duration-300 cursor-pointer`}
                                                    >
                                                        <item.icon className="shrink-0" />
                                                        <span className="font-medium text-base">{item.label}</span>
                                                    </SidebarMenuButton>
                                                ) : (
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`px-3 py-5 rounded-md ${pathname === item.path
                                                            ? "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                                                            : "bg-transparent text-inherit hover:bg-emerald-600 hover:text-white"
                                                            } transition-all duration-300 cursor-pointer`}
                                                    >
                                                        <Link href={item.path} className="flex items-center gap-3">
                                                            <item.icon className="shrink-0" />
                                                            <span className="font-medium text-base">{item.label}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                )}
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>

                    {/* Main Content */}
                    <div className="flex flex-col">
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
        </>
    )
}