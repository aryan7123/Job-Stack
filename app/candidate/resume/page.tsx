'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useCandidateProfile } from '@/app/queries/candidates/candidate';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';

const page = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const { isPending, data } = useCandidateProfile(userId);

  if (isPending) return <Loader />

  return (
    <>
      <section className="w-full relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-3 mt-5">
            <h2 className="text-4xl font-semibold">My Resume</h2>
            <span className="text-slate-400 text-sm font-medium">
              Ready to jump back in?
            </span>
          </div>

          <div className="w-full mt-10 rounded-md shadow-md bg-white border border-[#ecedf2] p-6">
            {data?.candidate.resumeUrl && (
              <>
                {/* Inline Preview */}
                <div className="mt-4 w-full h-[600px] border">
                  <iframe
                    src={data.candidate.resumeUrl}
                    className="w-full h-full"
                    style={{ border: "none" }}
                  />
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <Link
                    className="py-1 px-5 font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white rounded-md w-full flex items-center justify-center"
                    download
                    href={data?.candidate.resumeUrl}
                  >
                    Download CV
                  </Link>

                  <button
                    type="button"
                    onClick={() => window.open(data.candidate.resumeUrl, "_blank")}
                    className="text-emerald-500 cursor-pointer rounded-md px-5 py-1 font-semibold transition-colors duration-500 text-base bg-emerald-600/5 border-emerald-600/10 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                  >
                    Preview
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </>
  )
}

export default page