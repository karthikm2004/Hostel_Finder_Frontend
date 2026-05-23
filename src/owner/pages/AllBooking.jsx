import React, { useEffect, useState } from 'react'

import { getAllBookingsApi } from '../../Services/allApi'

function AllBooking() {

    const [bookings, setBookings] = useState([])

    const getBookings = async () => {

        try {

            const response = await getAllBookingsApi()

            console.log(response)

            if (response.status === 200) {

                setBookings(response.data)

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {

        getBookings()

    }, [])

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

            <div className="p-6 border-b border-slate-100">

                <h2 className="text-2xl font-bold text-slate-800">

                    All Bookings

                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-left">

                    <thead className="bg-slate-50 border-b border-slate-100">

                        <tr>

                            <th className="p-4">Guest</th>

                            <th className="p-4">Hostel</th>

                            <th className="p-4">Phone</th>

                            <th className="p-4">Members</th>

                            <th className="p-4">Check In</th>

                            <th className="p-4">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            bookings.length > 0 ?

                                bookings.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-b border-slate-100 hover:bg-slate-50"
                                    >

                                        <td className="p-4">

                                            <div>

                                                <p className="font-semibold">

                                                    {item.fullName}

                                                </p>

                                                <p className="text-sm text-slate-500">

                                                    {item.userId?.email}

                                                </p>

                                            </div>

                                        </td>

                                        <td className="p-4">

                                            {item.hostelId?.propertyname}

                                        </td>

                                        <td className="p-4">

                                            {item.phone}

                                        </td>

                                        <td className="p-4">

                                            {item.members}

                                        </td>

                                        <td className="p-4">

                                            {item.checkInDate}

                                        </td>

                                        <td className="p-4">

                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold

                                                ${item.status === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }
                                            `}>

                                                {item.status}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center p-8 text-slate-500"
                                    >

                                        No bookings found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default AllBooking