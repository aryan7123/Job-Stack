import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUpdatePassword } from '@/app/queries/candidates/update-password';

const Passwords = () => {
    const { data: session } = useSession();
    const { mutate, isError, error, data, isPending, isSuccess } = useUpdatePassword(session?.user?.id);

    const [passwords, setPasswords] = useState({
        old_password: "",
        new_password: "",
        retype_password: "",
    });

    const { old_password, new_password, retype_password } = passwords;

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdatePassword = async () => {
        try {
            mutate(passwords);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="bg-white shadow-sm p-6 mt-14 rounded-md">
                <h3 className="text-xl mb-6 font-semibold text-gray-800">
                    Change Password
                </h3>
                <div className="flex flex-col gap-1.5 mb-3">
                    <label htmlFor="old_password" className="form-label font-medium">
                        Old Password :<span className="text-red-600">*</span>
                    </label>
                    <input
                        className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                        placeholder="Old Password"
                        id="old_password"
                        type="password"
                        name="old_password"
                        value={old_password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-1.5 mb-3">
                    <label htmlFor="new_password" className="form-label font-medium">
                        New Password :<span className="text-red-600">*</span>
                    </label>
                    <input
                        className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                        placeholder="New Password"
                        id="new_password"
                        type="password"
                        name="new_password"
                        value={new_password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="retype_password" className="form-label font-medium">
                        Re-Type New Password :<span className="text-red-600">*</span>
                    </label>
                    <input
                        className="border border-slate-100 rounded-sm mt-2 p-2 focus:outline-emerald-700"
                        placeholder="Re-Type New Password"
                        id="retype_password"
                        type="password"
                        name="retype_password"
                        value={retype_password}
                        onChange={handleInputChange}
                    />
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
                    onClick={handleUpdatePassword}
                    className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </>
    )
}

export default Passwords