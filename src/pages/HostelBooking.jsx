import React, { useState } from "react";
import {
    FaTimes,
    FaMapMarkerAlt,
    FaUserFriends
} from "react-icons/fa";

import { toast } from "react-toastify";
import { addBookingApi } from "../Services/allApi";

function HostelBooking({ hostel, closeModal }) {

    const [bookingData, setBookingData] = useState({

        fullName: "",
        phone: "",
        checkInDate: "",
        members: ""

    })
    

    // HANDLE INPUTS
    const handleChange = (e) => {

        const { name, value } = e.target

        setBookingData({

            ...bookingData,
            [name]: value

        })

    }

    // HANDLE BOOKING
    const handleBooking = async () => {

        if (!hostel?._id) {

            toast.error("Hostel data not found")

            return

        }

        const {
            fullName,
            phone,
            checkInDate,
            members
        } = bookingData

        if (!fullName || !phone || !checkInDate || !members) {

            toast.warning("Please fill all fields")

            return

        }

        try {

            const reqBody = {

                hostelId: hostel._id,
                fullName,
                phone,
                checkInDate,
                members

            }

            const response = await addBookingApi(reqBody)

            if (response.status === 200) {

                toast.success("Booking Request Sent")

                closeModal()

            }

        } catch (err) {

            console.log(err)

            toast.error("Booking Failed")

        }

    }
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

            {/* MODAL */}
            <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-fade-in">

                {/* HEADER IMAGE */}
                <div className="relative h-44">

                    <img
                        src={
                            hostel?.uploadImg?.length > 0
                                ? `https://hostel-finder-backend-2.onrender.com/uploadImg/${hostel.uploadImg[0]}`
                                : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80"
                        }
                        alt={hostel?.propertyname}
                        className="w-full h-full object-cover"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
                    >

                        <FaTimes className="text-slate-700" />

                    </button>

                    {/* HOSTEL DETAILS */}
                    <div className="absolute bottom-5 left-5 text-white">

                        <h2 className="text-3xl font-bold">
                            {hostel?.propertyname}
                        </h2>

                        <div className="flex items-center gap-2 mt-2 text-sm">

                            <FaMapMarkerAlt />

                            <span>
                                {hostel?.area}, {hostel?.city}
                            </span>

                        </div>

                    </div>

                </div>

                {/* BODY */}
                <div className="p-6">

                    {/* PRICE */}
                    <div className="mb-6">

                        <h3 className="text-3xl font-bold text-indigo-600">

                            ₹{hostel?.price}

                        </h3>

                        <p className="text-slate-500 text-sm">
                            per month
                        </p>

                    </div>

                    {/* FORM */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">

                        {/* FULL NAME */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={bookingData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* PHONE */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={bookingData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* CHECK IN */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Check In Date
                            </label>

                            <input
                                type="date"
                                name="checkInDate"
                                value={bookingData.checkInDate}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* MEMBERS */}
                        <div>

                            <label className="block text-sm font-semibold mb-2">
                                Members
                            </label>

                            <div className="relative">

                                <FaUserFriends className="absolute left-4 top-4 text-slate-400" />

                                <input
                                    type="number"
                                    name="members"
                                    value={bookingData.members}
                                    onChange={handleChange}
                                    placeholder="No of members"
                                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                            </div>

                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center justify-end gap-4">

                        <button
                            onClick={closeModal}
                            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition-all"
                        >

                            Cancel

                        </button>

                        <button
                            onClick={handleBooking}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg"
                        >

                            Confirm Booking

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default HostelBooking