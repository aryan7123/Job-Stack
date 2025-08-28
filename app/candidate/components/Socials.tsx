import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiFacebook } from "react-icons/fi";

import { useUpdateSocial } from '@/app/queries/candidates/update-social';

const Socials = () => {
    const { data: session } = useSession();
    const { mutate, isPending, isSuccess, isError, data, error } = useUpdateSocial(session?.user?.id);
    const [socialLinks, setSocialLinks] = useState({
        twitter: "",
        instagram: "",
        linkedin: "",
        facebook: "",
        userId: ""
    });

    const { twitter, instagram, linkedin, facebook, userId } = socialLinks;

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {
        const { name, value } = e.target;
        setSocialLinks((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateSocialLinks = async () => {
        try {
            mutate(socialLinks);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="bg-white shadow-sm p-6 mt-14 rounded-md">
                <h3 className="text-xl mb-6 font-semibold text-gray-800">
                    Social Media
                </h3>
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <span className="font-medium">Twitter</span>
                    </div>
                    <div className="md:w-2/3 mt-4 md:mt-0">
                        <div className="form-icon relative">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-4 absolute top-5 start-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                            <input
                                className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12 font-medium"
                                placeholder="Twitter Profile Name"
                                id="twitter"
                                type="text"
                                name="twitter"
                                value={twitter}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className="text-slate-400 mt-1">
                            Add your Twitter username.
                        </p>
                    </div>
                </div>
                <div className="md:flex mt-8">
                    <div className="md:w-1/3">
                        <span className="font-medium">Instagram</span>
                    </div>
                    <div className="md:w-2/3 mt-4 md:mt-0">
                        <div className="form-icon relative">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-4 absolute top-5 start-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <input
                                className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12 font-medium"
                                placeholder="Instagram Profile Name"
                                id="instagram"
                                type="text"
                                name="instagram"
                                value={instagram}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className="text-slate-400 mt-1">
                            Add your Instagram username.
                        </p>
                    </div>
                </div>
                <div className="md:flex mt-8">
                    <div className="md:w-1/3">
                        <span className="font-medium">Linkedin</span>
                    </div>
                    <div className="md:w-2/3 mt-4 md:mt-0">
                        <div className="form-icon relative">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-4 absolute top-5 start-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                            <input
                                className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12 font-medium"
                                placeholder="Linkedin Profile Name"
                                id="linkedin"
                                type="text"
                                name="linkedin"
                                value={linkedin}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className="text-slate-400 mt-1">
                            Add your Linkedin username.
                        </p>
                    </div>
                </div>
                <div className="md:flex mt-8">
                    <div className="md:w-1/3">
                        <span className="font-medium">Facebook</span>
                    </div>
                    <div className="md:w-2/3 mt-4 md:mt-0">
                        <div className="form-icon relative">
                            <FiFacebook className="size-4 absolute top-5 start-4" />
                            <input
                                className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent mt-2 ps-12 font-medium"
                                placeholder="Facebook url"
                                id="facebook"
                                type="text"
                                name="facebook"
                                value={facebook}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p className="text-slate-400 mt-1">Add your Youtube url.</p>
                    </div>
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
                <button
                    type="button"
                    disabled={isPending}
                    onClick={handleUpdateSocialLinks}
                    className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </>
    )
}

export default Socials