import React from 'react'

const Passwords = () => {
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
                    />
                </div>
                <button
                    type="button"
                    className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5"
                >
                    Save Changes
                </button>
            </form>
        </>
    )
}

export default Passwords