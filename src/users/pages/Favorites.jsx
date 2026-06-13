import React, { useState, useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFavoritesApi, removeFavoriteApi } from '../../Services/allApi';

function Favorites() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {

        getFavorites()

    }, [])

    const getFavorites = async () => {

        try {

            const response = await getFavoritesApi()

            if (response.status === 200) {

                setFavorites(response.data)

            }

        } catch (err) {

            console.log(err)

        }

    }

    const handleRemoveFavorite = async (id) => {

        try {

            const response = await removeFavoriteApi(id)

            if (response.status === 200) {

                // remove instantly from UI
                setFavorites((prev) =>
                    prev.filter((item) => item._id !== id)
                )

                toast.success("Removed From Favorites")

            }

        } catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="animate-fade-in">

            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Saved Hostels
            </h2>

            {
                favorites.length > 0 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {
                            favorites.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-52 overflow-hidden">

                                        <img
                                            src={
                                                item.hostelId?.uploadImg?.length > 0

                                                    ? `https://hostel-finder-backend-2.onrender.com/uploadImg/${item.hostelId.uploadImg[0]}`

                                                    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                                            }

                                            alt={item.hostelId?.propertyname}

                                            className="w-full h-full object-cover"
                                        />

                                        {/* REMOVE FAVORITE BUTTON */}
                                        <button
                                            onClick={() => handleRemoveFavorite(item._id)}
                                            className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-all"
                                        >

                                            <FaHeart className="text-red-500 text-lg" />

                                        </button>

                                        {/* HOSTEL TYPE */}
                                        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold">

                                            {item.hostelId.hostelfor}

                                        </div>

                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5">

                                        <h3 className="text-xl font-bold text-slate-800 mb-2">

                                            {item.hostelId.propertyname}

                                        </h3>

                                        <p className="text-slate-500 mb-3">

                                            {item.hostelId.area}, {item.hostelId.city}

                                        </p>

                                        {/* FACILITIES */}
                                        <div className="flex flex-wrap gap-2 mb-4">

                                            {
                                                item.hostelId?.facilities?.slice(0, 3).map((facility, index) => (

                                                    <span
                                                        key={index}
                                                        className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-lg whitespace-nowrap"
                                                    >
                                                        {facility}
                                                    </span>

                                                ))
                                            }

                                        </div>
                                        {/* PRICE */}
                                        <div className="flex items-center justify-between border-t pt-4">

                                            <div>

                                                <span className="text-2xl font-bold text-indigo-600">

                                                    ₹{item.hostelId.price}

                                                </span>

                                                <span className="text-slate-500 text-sm">

                                                    /month

                                                </span>

                                            </div>

                                            <Link
                                                to={`/hostel-details/${item._id}`}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                                            >

                                                View

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-10 text-center">

                        <h3 className="text-2xl font-bold text-slate-700 mb-2">

                            No Saved Hostels

                        </h3>

                        <p className="text-slate-500">

                            Your favorite hostels will appear here.

                        </p>

                    </div>

                )
            }

        </div>
    )
}

export default Favorites