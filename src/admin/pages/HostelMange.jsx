import React, { useEffect, useState } from 'react'

import {
    FaCheck,
    FaTimes,
    FaMapMarkerAlt
} from "react-icons/fa"

import {
    getPendingHostelsApi,
    approveHostelApi,
    rejectHostelApi
} from '../../Services/allApi'

import { toast } from 'react-toastify'

function HostelManage() {

    const [hostels, setHostels] = useState([])

    const getPendingHostels = async () => {

        try {

            const response = await getPendingHostelsApi()

            console.log(response)

            if (response.status === 200) {

                setHostels(response.data)

            }

        }

        catch (err) {

            console.log(err)

            toast.error("Failed to fetch hostels")

        }

    }

    useEffect(() => {

        getPendingHostels()

    }, [])

    // APPROVE

    const handleApprove = async (id) => {

        try {

            const response = await approveHostelApi(id)

            if (response.status === 200) {

                toast.success("Hostel Approved")

                getPendingHostels()

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    // REJECT

    const handleReject = async (id) => {

        try {

            const response = await rejectHostelApi(id)

            if (response.status === 200) {

                toast.success("Hostel Rejected")

                getPendingHostels()

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="p-8">

            <h2 className="text-3xl font-bold mb-8">
                Hostel Approvals
            </h2>

            {
                hostels.length > 0 ?

                    (

                        <div className="grid gap-6">

                            {
                                hostels.map((item) => (

                                    <div
                                        key={item._id}
                                        className="bg-white rounded-3xl shadow-md border overflow-hidden flex flex-col md:flex-row"
                                    >

                                        <div className="md:w-72 h-64">

                                            <img
                                                src={
                                                    item.uploadImg?.length > 0
                                                        ? `http://localhost:3000/hostelImages/${item.uploadImg[0]}`
                                                        : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000"
                                                }
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />

                                        </div>

                                        <div className="flex-1 p-6">

                                            <div className="flex justify-between mb-4">

                                                <div>

                                                    <h3 className="text-2xl font-bold">
                                                        {item.propertyname}
                                                    </h3>

                                                    <p className="flex items-center gap-2 text-slate-500 mt-2">

                                                        <FaMapMarkerAlt />

                                                        {item.area},
                                                        {item.city}

                                                    </p>

                                                </div>

                                            </div>

                                            <p className="mb-5">
                                                {item.description}
                                            </p>

                                            <div className="flex gap-4">

                                                <button
                                                    onClick={() => handleApprove(item._id)}
                                                    className="flex-1 bg-green-600 text-white py-3 rounded-xl"
                                                >

                                                    <FaCheck className="inline me-2" />

                                                    Approve

                                                </button>

                                                <button
                                                    onClick={() => handleReject(item._id)}
                                                    className="flex-1 bg-red-600 text-white py-3 rounded-xl"
                                                >

                                                    <FaTimes className="inline me-2" />

                                                    Reject

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    )

                    :

                    (

                        <div className="text-center">

                            <h2>No Pending Hostels</h2>

                        </div>

                    )
            }

        </div>

    )

}

export default HostelManage