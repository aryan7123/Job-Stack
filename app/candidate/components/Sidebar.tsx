import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { IoIosLogOut } from 'react-icons/io';
import { IoHomeOutline, IoSettingsOutline, IoCloseCircleOutline } from "react-icons/io5";
import { LuCircleUserRound, LuBriefcaseBusiness } from "react-icons/lu";
import { PiReadCvLogo } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <>
            <aside className={`
                fixed bottom-0 left-0 h-full w-[280px] bg-white shadow-md border border-[#ecedf2]
                transition-transform overflow-auto z-20 hide-scrollbar
                ${showSidebar ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:block hidden
            `}>
                <div className='w-[inherit] md:hidden flex items-center justify-between px-6 py-4 border-b border-[#ecedf2] shadow-md'>
                    <div className='flex items-center gap-2'>
                        <Image
                            className="object-cover"
                            src="/logo-2.png"
                            alt="jobstack"
                            width={50}
                            height={50}
                            priority
                        />
                        <h4 className='font-semibold text-xl'>Job Stack</h4>
                    </div>
                    <button type="button" className='cursor-pointer' onClick={handleShowSidebar}>
                        <IoCloseCircleOutline size={25} />
                    </button>
                </div>
                <div className='md:py-28 py-10 md:px-8 px-6'>
                    <ul className='space-y-3'>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <IoHomeOutline className='' />
                            <span className='font-medium'>Dashboard</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <LuCircleUserRound className='' />
                            <span className='font-medium'>My Profile</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <PiReadCvLogo className='' />
                            <span className='font-medium'>My Resume</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <LuBriefcaseBusiness className='' />
                            <span className='font-medium'>Applied Jobs</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <IoSettingsOutline className='' />
                            <span className='font-medium'>Settings</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <IoIosLogOut className='' />
                            <span className='font-medium'>Logout</span>
                        </li>
                        <li className='flex items-center gap-3 hover:bg-emerald-600 hover:text-white px-3 py-4 rounded-md cursor-pointer transition-all'>
                            <RiDeleteBin6Line className='' />
                            <span className='font-medium'>Delete Profile</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar