import React from 'react'

const Loader = () => {
    return (
        <>
            <div className="w-full h-screen text-center flex items-center justify-center">
                <div className='flex flex-col'>
                    <div
                        className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-emerald-600 mx-auto"
                    ></div>
                    <h2 className="text-zinc-900 text-2xl font-semibold dark:text-white mt-4">Loading...</h2>
                </div>
            </div>

        </>
    )
}

export default Loader