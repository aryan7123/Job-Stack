import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
                <div className="flex flex-col items-center">
                    <div
                        className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-emerald-600"
                    ></div>
                    <h2 className="text-zinc-900 text-2xl font-semibold dark:text-white mt-4">
                        Loading...
                    </h2>
                </div>
            </div>
        </>
    )
}

export default Loader