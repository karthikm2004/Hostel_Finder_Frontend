import React, { useEffect, useState } from 'react'

import {
    FaCalendarCheck,
    FaCheckCircle,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUsers
} from "react-icons/fa"

import {
    getOwnerBookingsApi,
    updateBookingStatusApi
} from '../../Services/allApi'

import { toast } from 'react-toastify'

function OwnerBookings() {

    const [bookings, setBookings] = useState([])

    // GET OWNER BOOKINGS

    const getOwnerBookings = async () => {

        try {

            const response = await getOwnerBookingsApi()

            if (response.status === 200) {

                setBookings(response.data)

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {

        getOwnerBookings()

    }, [])

    // UPDATE STATUS

    const handleStatusUpdate = async (id, status) => {

        try {

            const response = await updateBookingStatusApi(id, { status })

            if (response.status === 200) {

                toast.success(`Booking ${status}`)

                getOwnerBookings()

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="p-6 md:p-8 min-h-screen bg-slate-50">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

                Booking Requests

            </h2>

            {
                bookings.length > 0 ? (

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {
                            bookings.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300"
                                >

                                    {/* IMAGE */}

                                    <div className="relative h-56">

                                        <img
                                            src={
                                                item.hostelId?.uploadImg?.length > 0
                                                    ? `https://hostel-finder-backend-2.onrender.com/uploadImg/${item.hostelId.uploadImg[0]}`
                                                    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
                                            }
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />

                                        {/* STATUS */}

                                        <div
                                            className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-bold

                                            ${item.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : item.status === "Confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            
                                            `}
                                        >

                                            {item.status}

                                        </div>

                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-6">

                                        {/* HOSTEL NAME */}

                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">

                                            {item.hostelId?.propertyname}

                                        </h3>

                                        {/* LOCATION */}

                                        <p className="flex items-center gap-2 text-slate-500 mb-6">

                                            <FaMapMarkerAlt className="text-indigo-500" />

                                            {item.hostelId?.area},
                                            {" "}
                                            {item.hostelId?.city}

                                        </p>

                                        {/* USER DETAILS */}

                                        <div className="space-y-4 mb-6">

                                            <div className="flex justify-between items-center border-b pb-3">

                                                <span className="text-slate-500">
                                                    Booking Name
                                                </span>

                                                <span className="font-semibold text-slate-700">
                                                    {item.fullName}
                                                </span>

                                            </div>
                                            

                                            <div className="flex justify-between items-center border-b pb-3">

                                                <span className="flex items-center gap-2 text-slate-500">

                                                    <FaPhoneAlt />

                                                    Phone

                                                </span>

                                                <span className="font-semibold text-slate-700">
                                                    {item.phone}
                                                </span>

                                            </div>

                                            <div className="flex justify-between items-center border-b pb-3">

                                                <span className="flex items-center gap-2 text-slate-500">

                                                    <FaUsers />

                                                    Members

                                                </span>

                                                <span className="font-semibold text-slate-700">
                                                    {item.members}
                                                </span>

                                            </div>

                                            <div className="flex justify-between items-center border-b pb-3">

                                                <span className="text-slate-500">
                                                    Check In
                                                </span>

                                                <span className="font-semibold text-slate-700">
                                                    {item.checkInDate}
                                                </span>

                                            </div>

                                            <div className="flex justify-between items-center">

                                                <span className="text-slate-500">
                                                    Monthly Rent
                                                </span>

                                                <span className="font-bold text-indigo-600 text-lg">
                                                    ₹{item.hostelId?.price}
                                                </span>

                                            </div>
                                            
                                            

                                        </div>

                                        {/* ACTION BUTTONS */}

                                        {
                                            item.status === "Pending" && (

                                                <div className="flex gap-4">

                                                    {/* CONFIRM */}

                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                item._id,
                                                                "Confirmed"
                                                            )
                                                        }
                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                                                    >

                                                        <FaCheckCircle />

                                                        Confirm

                                                    </button>

                                                    {/* REJECT */}

                                                    <button
                                                        onClick={() =>
                                                            handleStatusUpdate(
                                                                item._id,
                                                                "Rejected"
                                                            )
                                                        }
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                                                    >

                                                        <FaTimesCircle />

                                                        Reject

                                                    </button>

                                                </div>

                                            )
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center">

                        <FaCalendarCheck className="text-slate-300 w-16 h-16 mx-auto mb-5" />

                        <h3 className="text-2xl font-bold text-slate-700 mb-2">

                            No Booking Requests

                        </h3>

                        <p className="text-slate-500">

                            Booking requests from users will appear here.

                        </p>

                    </div>

                )
            }

        </div>

    )

}

export default OwnerBookings