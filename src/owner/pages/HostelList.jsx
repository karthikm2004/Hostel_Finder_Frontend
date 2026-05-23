import React, { useEffect, useState } from 'react'

import {
    FaListUl,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaEdit,
    FaTrash
} from "react-icons/fa"

import {
    getOwnerHostelsApi,
    deleteHostelApi
} from '../../Services/allApi'

import { toast } from 'react-toastify'

function HostelList() {

    const [ownerHostels, setOwnerHostels] = useState([])

    // FETCH OWNER HOSTELS

    const fetchOwnerHostels = async () => {

        try {

            const response = await getOwnerHostelsApi()

            if (response.status === 200) {

                setOwnerHostels(response.data)

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {

        fetchOwnerHostels()

    }, [])

    // DELETE HOSTEL

    const handleDelete = async (id) => {

        try {

            const response = await deleteHostelApi(id)

            if (response.status === 200) {

                toast.success("Property Deleted")

                fetchOwnerHostels()

            }

        }

        catch (err) {

            console.log(err)

            toast.error("Delete Failed")

        }

    }

    return (

        <div className="p-4 sm:p-8 min-h-screen bg-slate-50">

            {/* TITLE */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-3xl font-bold text-slate-800">

                        My Properties

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Manage all your hostel listings

                    </p>

                </div>

            </div>

            {
                ownerHostels.length > 0 ?

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                        {
                            ownerHostels.map((hostel) => (

                                <div
                                    key={hostel._id}
                                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
                                >

                                    {/* IMAGE */}

                                    <div className="relative h-56 overflow-hidden">

                                        <img
                                            src={
                                                hostel.uploadImg?.length > 0
                                                    ? `http://localhost:3000/uploadImg/${hostel.uploadImg[0]}`
                                                    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                                            }
                                            alt={hostel.propertyname}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* STATUS BADGE */}

                                        <div className="absolute top-4 right-4">

                                            {
                                                hostel.isapproved ?

                                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold shadow">

                                                        <FaCheckCircle />

                                                        Approved

                                                    </div>

                                                    :

                                                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold shadow">

                                                        <FaClock />

                                                        Pending

                                                    </div>
                                            }

                                        </div>

                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-5">

                                        {/* TITLE */}

                                        <div className="flex items-start justify-between gap-3 mb-3">

                                            <h3 className="text-xl font-bold text-slate-800 line-clamp-1">

                                                {hostel.propertyname}

                                            </h3>

                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                                
                                                ${hostel.hostelfor === "Boys"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : hostel.hostelfor === "Girls"
                                                        ? "bg-pink-100 text-pink-600"
                                                        : "bg-purple-100 text-purple-600"
                                                }
                                                
                                            `}>

                                                {hostel.hostelfor}

                                            </span>

                                        </div>

                                        {/* LOCATION */}

                                        <p className="flex items-center gap-2 text-slate-500 text-sm mb-3">

                                            <FaMapMarkerAlt className="text-indigo-500" />

                                            {hostel.area}, {hostel.city}

                                        </p>

                                        {/* PRICE */}

                                        <div className="mb-4">

                                            <span className="text-2xl font-bold text-indigo-600">

                                                ₹{hostel.price}

                                            </span>

                                            <span className="text-slate-500 text-sm">

                                                {" "} / month

                                            </span>

                                        </div>

                                        {/* FACILITIES */}

                                        <div className="flex flex-wrap gap-2 mb-5">

                                            {
                                                hostel.facilities?.slice(0, 3).map((item, index) => (

                                                    <span
                                                        key={index}
                                                        className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-lg"
                                                    >

                                                        {item}

                                                    </span>

                                                ))
                                            }

                                        </div>

                                        {/* APPROVAL MESSAGE */}

                                        <div className={`mb-5 p-3 rounded-2xl text-sm font-medium
                                            
                                            ${hostel.isapproved
                                                ? "bg-green-50 text-green-700 border border-green-100"
                                                : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                                            }
                                        
                                        `}>

                                            {
                                                hostel.isapproved

                                                    ?

                                                    "Your property is live and visible to users."

                                                    :

                                                    "Waiting for admin approval. Users cannot see this property yet."
                                            }

                                        </div>

                                        {/* BUTTONS */}

                                        <div className="flex gap-3">

                                            {/* EDIT */}

                                            <button
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                                            >

                                                <FaEdit />

                                                Edit

                                            </button>

                                            {/* DELETE */}

                                            <button
                                                onClick={() => handleDelete(hostel._id)}
                                                className="flex-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                                            >

                                                <FaTrash />

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                    :

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center">

                        <FaListUl className="text-slate-300 w-14 h-14 mx-auto mb-5" />

                        <h3 className="text-2xl font-bold text-slate-700 mb-2">

                            No Properties Added

                        </h3>

                        <p className="text-slate-500">

                            Your hostel listings will appear here.

                        </p>

                    </div>
            }

        </div>

    )

}

export default HostelList