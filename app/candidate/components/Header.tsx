import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdMenu } from "react-icons/md";

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    }
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
                    <button type="button" className="md:hidden block" onClick={handleShowSidebar}>
                        <MdMenu size={35} />
                    </button>
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
        </>
    )
}

export default Header