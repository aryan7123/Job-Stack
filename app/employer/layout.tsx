"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link";

import { MdSpaceDashboard } from "react-icons/md";
import { BsGearFill, BsFillBriefcaseFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

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

            </SidebarProvider>
        </>
    )
}