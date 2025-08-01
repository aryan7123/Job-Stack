'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import SkillsSelectComponent from '@/components/comp-235';
import FileInputComponent from '@/components/comp-30';

interface PersonalDetails {
    your_name: string;
    email: string;
    occupation: string;
    location: string;
    education: string;
    experience: string;
    skills: string[];
    resume: string;
    description: string;
}

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log('Profile page - Session:', session, 'Status:', status);

    useEffect(() => {
        if (status === 'unauthenticated' || (!session && status !== 'loading')) {
            router.push('/login');
        }
    }, [status, session, router]);

    const occupations = [
        "Web Designer",
        "Web Developer",
        "UI/UX Developer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "WordPress Developer",
        "Project Manager",
        "Software Developer",
        "Android Developer"
    ];

    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        your_name: "",
        email: "",
        occupation: "",
        location: "",
        education: "",
        experience: "",
        skills: [],
        resume: "",
        description: ""
    });

    const { your_name, email, occupation, location, education, experience, skills, resume, description } = personalDetails;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPersonalDetails((prev) => ({
                ...prev,
                resume: fileUrl,
            }));
        }
    };

    return (
        <>
            <Navbar />

            <section className='w-full bg-white'>
                <div className='max-w-6xl mx-auto px-5 md:px-0 py-24'>
                    <div className='relative text-transparent'>
                        <input type="file" name="background" id="background" className='hidden' />
                        <div className='relative shrink-0'>
                            <Image
                                src={"/assets/bg5-BQCe0yqf.jpg"}
                                width={1024}
                                height={256}
                                className='object-cover rounded-xl w-full h-64'
                                alt='profile-banner'
                                quality={100}
                                priority
                            />
                            <label htmlFor="background" className='absolute inset-0 cursor-pointer'></label>
                        </div>
                        <div className="absolute -bottom-12 left-3 flex items-end gap-2 w-full">
                            <input type="file" name="profile" id="profile" className='hidden' />
                            <Image
                                src="/assets/01--4QesCJS.jpg"
                                width={100}
                                height={100}
                                className="object-cover rounded-full size-28"
                                alt="profile-banner"
                                quality={100}
                                priority
                            />
                            <label htmlFor="profile" className='absolute inset-0 cursor-pointer'></label>
                            <div className="text-gray-800 text-lg font-semibold w-full">
                                {session?.user?.name}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow-sm p-6 mt-28 rounded-md'>
                        <h3 className='text-lg mb-6 font-semibold text-gray-800'>Personal Details</h3>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Your Name :
                                    <span className="text-red-600">*</span>
                                </label>
                                <input className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700" placeholder="Your Name" id="your_name" type="text" name="your_name" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Email Address :
                                    <span className="text-red-600">*</span>
                                </label>
                                <input className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700" placeholder="Email Address" id="email" type="email" name="email" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Occupation :
                                    <span className="text-red-600">*</span>
                                </label>
                                <select name="occupation" id="occupation" className='border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700'>
                                    <option defaultValue="Select Occupation">Select Occupation</option>
                                    {occupations.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Location :
                                    <span className="text-red-600">*</span>
                                </label>
                                <input className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700" placeholder="Location" id="location" type="text" name="location" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Education :
                                    <span className="text-red-600">*</span>
                                </label>
                                <input className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700" placeholder="Education" id="education" type="text" name="education" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Experience :
                                    <span className="text-red-600">*</span>
                                </label>
                                <input className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700" placeholder="Experience" id="experience" type="text" name="experience" />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <SkillsSelectComponent
                                    skills={personalDetails.skills}
                                    handleSkillsChange={(selected: string[]) =>
                                        setPersonalDetails(prev => ({
                                            ...prev,
                                            skills: selected
                                        }))
                                    }
                                />
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <FileInputComponent handleFileChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 mt-4'>
                            <div className='flex flex-col gap-1.5'>
                                <label className="form-label font-medium">Description :
                                    <span className="text-red-600">*</span>
                                </label>
                                <textarea className='border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700' name="description" id="description"></textarea>
                            </div>
                        </div>
                        <button type="button" className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default page