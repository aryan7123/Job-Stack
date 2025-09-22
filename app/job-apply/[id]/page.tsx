'use client';

import React, { use } from 'react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

import { useSearchParams } from 'next/navigation';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from 'next-auth/react';
import { useSendJobApplication } from '@/app/queries/applications/send-application';

interface JobApplyPageProps {
    cover_letter: File | null;
    resume: File | null;
    userId: string | undefined;
    jobId: string | undefined;
}

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { data: session } = useSession();
    const { id } = React.use(params);
    const [jobApplication, setJobApplication] = React.useState<JobApplyPageProps>({
        cover_letter: null,
        resume: null,
        userId: "",
        jobId: "",
    });
    const { mutate, isPending, error, isSuccess, data, isError } = useSendJobApplication();

    const searchParams = useSearchParams();
    const jobTitle = searchParams.get("title");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobApplication({
            ...jobApplication,
            [e.target.name]: e.target.type === 'file' ? e.target.files ? e.target.files[0] : null : e.target.value
        });
    }

    const handleSendApplication = () => {
        mutate({
            ...jobApplication,
            userId: session?.user?.id,
            jobId: id
        });
    }

    return (
        <>
            <Navbar />

            <section className='w-full relative py-32 bg-top bg-no-repeat bg-cover bg-[url("/banner/bg-CyJjcuYR.jpg")]'>
                <div className="absolute inset-0 bg-emerald-900/90 z-0"></div>
                <div className='relative z-10 flex items-center justify-center text-white md:text-3xl text-2xl tracking-wide font-semibold'>
                    {jobTitle}
                </div>

                <Breadcrumb className='w-[inherit] absolute bottom-5 z-10 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className='text-base font-semibold text-white/50 transition-colors duration-500 hover:text-white'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='text-base font-semibold' />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-base font-semibold text-white'>Job Application</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className='bg-slate-50 w-full relative py-24'>
                <div className='max-w-6xl mx-auto md:px-0 px-5'>
                    <div className="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                        <form className="text-left">
                            <h3 className='text-2xl font-semibold mb-4'>Application Form</h3>
                            <div className="grid grid-cols-1">
                                <div className="mb-4 flex flex-col gap-2">
                                    <label htmlFor="cover_letter" className="font-semibold">Cover Letter:</label>
                                    <input className="relative border border-slate-100 file:h-10 file:-mx-3 file:-my-2 file:cursor-pointer file:rounded-none file:border-0 file:px-3 file:text-neutral-700 bg-clip-padding px-3 py-1.5 file:me-3 mt-1" id="cover_letter" name='cover_letter' type="file" onChange={handleChange} />
                                </div>
                                <div className="mb-4 flex flex-col gap-2">
                                    <label className="font-semibold" htmlFor="resume">Upload Resume:</label>
                                    <input className="relative border border-slate-100 file:h-10 file:-mx-3 file:-my-2 file:cursor-pointer file:rounded-none file:border-0 file:px-3 file:text-neutral-700 bg-clip-padding px-3 py-1.5 file:me-3 mt-1" id="resume" name='resume' type="file" onChange={handleChange} />
                                </div>
                                {isError && (
                                    <div className="text-sm font-semibold text-red-600 my-3">
                                        {(error as Error).message}
                                    </div>
                                )}

                                {isSuccess && data?.message && (
                                    <div className="text-sm font-semibold text-green-600 my-3">
                                        {data.message}
                                    </div>
                                )}
                                <div>
                                    <button type="button" disabled={isPending} onClick={handleSendApplication} className="py-1 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white">
                                        {isPending ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default page