"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Passwords from "../components/Passwords";
import Image from "next/image";
import SkillsSelectComponent from "@/components/comp-235";
import FileInputComponent from "@/components/comp-30";

import { useDispatch, useSelector } from "react-redux";
import {
    candidatePersonalDetails,
    resetStatus,
} from "@/app/store/features/candidates/personalDetails";
import Socials from "../components/Socials";
import Loader from "@/app/components/Loader";
import axios from "axios";
interface PersonalDetails {
    your_name: string;
    email: string;
    occupation: string;
    location: string;
    education: string;
    experience: string;
    phone: string;
    website_url: string;
    skills: string[];
    resume: File | null;
    description: string;
    userId: string;
}

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.candidate);

    useEffect(() => {
        if (status === "unauthenticated" || (!session && status !== "loading")) {
            router.push("/login");
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
        "Android Developer",
    ];

    const [btnText, setBtnText] = useState("Save Changes");
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        your_name: "",
        email: "",
        occupation: "",
        location: "",
        education: "",
        experience: "",
        skills: [],
        phone: "",
        website_url: "",
        resume: null,
        description: "",
        userId: "",
    });
    const [clearBtn, setClearBtn] = useState(false);
    const [promptBtnText, setPromptBtnText] = useState("Generate");
    const [uploadBtnText, setUploadBtnText] = useState("Upload");
    const [prompt, setPrompt] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        if (session?.user?.id) {
            setPersonalDetails((prev) => ({
                ...prev,
                userId: session.user.id,
            }));
        }
    }, [session?.user?.id]);

    const {
        your_name,
        email,
        occupation,
        location,
        education,
        experience,
        skills,
        resume,
        phone,
        website_url,
        description,
        userId,
    } = personalDetails;

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handleClearImage = () => {
        setPromptBtnText("Generate");
        setPrompt("");
        setAvatarUrl("");
        setClearBtn(false);
    }

    const handleGenerateAvatar = async () => {
        setPromptBtnText("Generating...");
        try {
            const res = await axios.post("/api/generate-avatar", { prompt });
            setResponseMessage(res.data.message);
            if (res.data.image) {
                setAvatarUrl(res.data.image);
                setClearBtn(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setResponseMessage(error.response.data.message);
            } else {
                setResponseMessage("Something went wrong");
            }
        } finally {
            setPromptBtnText("Generate");
        }
    };

    const handleUploadAvatar = async () => {
        setPromptBtnText("Uploading...");
        try {
            const req = await axios.post("/api/upload-avatar", { avatarUrl, userId });
            console.log(req.data);
            setResponseMessage(req.data.message);
        } catch (error) {
            setPromptBtnText("Upload");
            console.log(error);
        }
        finally {
            setPromptBtnText("Upload");
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setPersonalDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPersonalDetails((prev) => ({
                ...prev,
                resume: file,
            }));
        }
    };

    const handleUpdatePersonalDetails = async () => {
        setBtnText("Saving...");

        try {
            const formData = new FormData();

            if (your_name) formData.append("your_name", your_name);
            if (email) formData.append("email", email);
            if (occupation) formData.append("occupation", occupation);
            if (location) formData.append("location", location);
            if (education) formData.append("education", education);
            if (experience) formData.append("experience", experience);
            if (phone) formData.append("phone", phone);
            if (website_url) formData.append("website_url", website_url);
            if (description) formData.append("description", description);
            if (userId) formData.append("userId", userId);

            if (skills.length > 0) {
                skills.forEach((skill) => {
                    formData.append("skills", skill);
                });
            }

            if (resume) {
                formData.append("resume", resume);
            }

            const result = dispatch(candidatePersonalDetails(formData));
            if (result) {
                setBtnText("Success!");
            } else {
                setBtnText("Save Changes");
            }

            setTimeout(() => setBtnText("Save Changes"), 2000);
        } catch (error) {
            console.error(error);
            setBtnText("Save Changes");
        }
    };

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                dispatch(resetStatus());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />

            <section className="w-full bg-white">
                <div className="max-w-6xl mx-auto px-5 md:px-0 py-24">
                    <div className="relative text-transparent">
                        <div className="relative shrink-0">
                            <Image
                                src={"/assets/bg5-BQCe0yqf.jpg"}
                                width={1024}
                                height={256}
                                className="object-cover rounded-xl w-full h-64"
                                alt="profile-banner"
                                quality={100}
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-12 left-3 flex items-end gap-2 w-full">
                            <Image
                                src="/assets/01--4QesCJS.jpg"
                                width={100}
                                height={100}
                                className="object-cover rounded-full size-28"
                                alt="profile-banner"
                                quality={100}
                                priority
                            />
                            <div className="text-gray-800 text-lg font-semibold w-full">
                                {session?.user?.name}
                            </div>
                        </div>
                    </div>
                    <form encType="multipart/form-data" className="bg-white shadow-sm p-6 mt-28 rounded-md">
                        <h3 className="text-xl mb-6 font-semibold text-gray-800">
                            Generate AI Avatars
                        </h3>
                        <div className="w-full flex flex-col items-start justify-start">
                            <input type="text" name="avatar" id="avatar" value={prompt} onChange={handlePromptChange} placeholder="Write Your Prompt..." className="border w-[inherit] border-slate-100 rounded-sm p-2 focus:outline-emerald-700" />
                            {responseMessage && (
                                <span className="text-red-400 font-medium text-sm mt-3">{responseMessage}</span>
                            )}
                            {avatarUrl && (
                                <Image
                                    className="object-cover rounded-full my-2"
                                    src={avatarUrl}
                                    alt="Generated Avatar"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            )}
                            <div className="flex items-center gap-3">
                                {avatarUrl ? (
                                    <button
                                        type="button"
                                        disabled={uploadBtnText === "Uploading..." ? true : false}
                                        onClick={handleUploadAvatar}
                                        className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                                    >
                                        {uploadBtnText}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={promptBtnText === "Generating..." ? true : false}
                                        onClick={handleGenerateAvatar}
                                        className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                                    >
                                        {promptBtnText}
                                    </button>
                                )}
                                {clearBtn && (
                                    <button
                                        type="button"
                                        onClick={handleClearImage}
                                        className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-red-600 hover:bg-red-700 text-white rounded-md mt-5"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                    <form
                        encType="multipart/form-data"
                        className="bg-white shadow-sm p-6 mt-14 rounded-md"
                    >
                        <h3 className="text-xl mb-6 font-semibold text-gray-800">
                            Personal Details
                        </h3>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="your_name" className="form-label font-medium">
                                    Your Name :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Your Name"
                                    id="your_name"
                                    type="text"
                                    name="your_name"
                                    onChange={handleInputChange}
                                    value={your_name}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="form-label font-medium">
                                    Email Address :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Email Address"
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={email}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="occupation" className="form-label font-medium">
                                    Occupation :<span className="text-red-600">*</span>
                                </label>
                                <select
                                    value={occupation}
                                    name="occupation"
                                    id="occupation"
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    onChange={handleInputChange}
                                >
                                    <option defaultValue="Select Occupation">
                                        Select Occupation
                                    </option>
                                    {occupations.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="location" className="form-label font-medium">
                                    Location :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Location"
                                    id="location"
                                    type="text"
                                    name="location"
                                    onChange={handleInputChange}
                                    value={location}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="education" className="form-label font-medium">
                                    Education :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Education"
                                    id="education"
                                    type="text"
                                    name="education"
                                    onChange={handleInputChange}
                                    value={education}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="experience" className="form-label font-medium">
                                    Experience :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Experience"
                                    id="experience"
                                    type="text"
                                    name="experience"
                                    onChange={handleInputChange}
                                    value={experience}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="phone" className="form-label font-medium">
                                    Phone Number :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Phone Number"
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    onChange={handleInputChange}
                                    value={phone}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="website_url" className="form-label font-medium">
                                    Website URL :<span className="text-red-600">*</span>
                                </label>
                                <input
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    placeholder="Website URL"
                                    id="website_url"
                                    type="text"
                                    name="website_url"
                                    onChange={handleInputChange}
                                    value={website_url}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <SkillsSelectComponent
                                    skills={personalDetails.skills}
                                    handleSkillsChange={(selected: string[]) =>
                                        setPersonalDetails((prev) => ({
                                            ...prev,
                                            skills: selected,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <FileInputComponent handleFileChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 mt-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="form-label font-medium">
                                    Description :<span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                                    name="description"
                                    id="description"
                                    onChange={handleInputChange}
                                    value={description}
                                ></textarea>
                            </div>
                        </div>
                        {error && (
                            <div className="text-sm font-semibold text-red-600 my-3">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-sm font-semibold text-green-600 my-3">
                                {success}
                            </div>
                        )}
                        <button
                            disabled={loading}
                            onClick={handleUpdatePersonalDetails}
                            type="button"
                            className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                        >
                            {btnText}
                        </button>
                    </form>

                    <Socials />
                    <Passwords />
                </div>
            </section>

            <Footer />
        </>
    );
};

export default page;
