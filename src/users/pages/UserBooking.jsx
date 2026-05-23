
import React, { useEffect, useState } from 'react'
import { getUserBookingsApi } from '../../Services/allApi'

function MyBookings() {

    const [bookings, setBookings] = useState([])

    const getBookings = async () => {

        try {

            const response = await getUserBookingsApi()

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

        <div className="space-y-5">

            {
                bookings.length > 0 ? (

                    bookings.map((item) => (

                        <div
                            key={item._id}
                            className="bg-white p-5 rounded-2xl shadow border"
                        >

                            <h2 className="text-xl font-bold">

                                {item.hostelId?.propertyname}

                            </h2>

                            <p className="text-slate-500 mt-1">

                                {item.hostelId?.city}

                            </p>

                            <p className="mt-3">

                                Check In :
                                <span className="font-semibold">
                                    {" "}
                                    {item.checkInDate}
                                </span>

                            </p>

                            <div className="mt-3">

                                <span className={`px-4 py-1 rounded-full text-sm font-semibold
                                
                                    ${item.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }
                                `}>

                                    {item.status}

                                </span>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="bg-white p-10 rounded-2xl text-center">

                        <h2 className="text-2xl font-bold text-slate-700">

                            No Bookings Yet

                        </h2>

                    </div>

                )
            }

        </div>

    )

}

export default MyBookings

