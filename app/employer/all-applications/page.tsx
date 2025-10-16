'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Loader from '@/components/ui/Loader';
import { useFetchEmployerApplications } from '@/app/queries/applications/employer-applications';

interface ApplicationsProps {

}

const page = () => {
    const { data: session } = useSession();
    const employerId = session?.user?.id ?? '';

    

    return (
        <>
            <section className="w-full relative">
                <div className="w-full px-0 sm:px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col gap-3 mt-5 px-4 sm:px-0">
                        <h2 className="text-4xl font-semibold">Howdy, {session?.user?.name}!!</h2>
                        <span className="text-slate-400 text-sm font-medium">
                            Ready to jump back in?
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page