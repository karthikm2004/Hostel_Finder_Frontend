import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";

function Settings() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold mb-4">Settings</h2>

                <div className="space-y-4">
                    <button className="bg-gray-800 text-white flex justify-center items-center gap-1 px-4 py-2 rounded-md">
                        <IoLogOutOutline className='text-xl' /> Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Settings     