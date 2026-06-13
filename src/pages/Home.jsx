import React, { useState, useEffect } from 'react';
import { getAllHostelsApi } from '../Services/allApi';
import {
    FaSearch,
    FaMapMarkerAlt,
    FaStar,
    FaBuilding,
    FaBed
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getLatestHostelApi } from '../Services/allApi';

function Home() {

    const [latestHostels, setLatestHostels] = useState([]);
    const [allHostels, setAllHostels] = useState([])
    const [searchKey, setSearchKey] = useState("")


    const navigate = useNavigate()
    


    // FETCH HOSTELS
    useEffect(() => {
        getLatestHostels();
        getAllHostels()
    }, []);

    const getLatestHostels = async () => {

        try {

            const response = await getLatestHostelApi();

            if (response.status === 200) {
                console.log(response.data);
                setLatestHostels(response.data);
            }

        } catch (err) {
            console.log(err);
        }

    };

    const getAllHostels = async () => {

        try {

            const response = await getAllHostelsApi(searchKey)

            if (response.status === 200) {

                setAllHostels(response.data)

            }

        } catch (err) {

            console.log(err)

        }

    }

    const handleSearch = () => {

        navigate(`/hostel-filter?search=${searchKey}`)

    }

    return (

        <div className="bg-slate-900 min-h-screen flex flex-col font-sans">

            <Header />

            {/* HERO SECTION */}

            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[600px]">

                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop')"
                    }}
                >

                    <span className="w-full h-full absolute opacity-75 bg-slate-900"></span>

                </div>

                <div className="container relative mx-auto px-4">

                    <div className="items-center flex flex-wrap">

                        <div className="w-full lg:w-8/12 mx-auto text-center">

                            <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">

                                Find Your Perfect{" "}

                                <span className="text-indigo-400">
                                    Stay
                                </span>

                            </h1>

                            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto mb-8">

                                Discover the best hostels, PGs, and co-living spaces tailored for students and professionals.

                            </p>

                            {/* SEARCH BOX */}

                            <div className="bg-slate-800 p-2 sm:p-3 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto border border-slate-700">

                                <div className="flex-grow flex items-center bg-slate-900 rounded-xl px-4 py-3 border border-slate-700 focus-within:border-indigo-500 transition-colors">

                                    <FaMapMarkerAlt className="text-indigo-400 mr-3 text-lg" />

                                    <input
                                        type="text"
                                        placeholder="Where do you want to live?"
                                        className="bg-transparent w-full outline-none text-white placeholder-slate-400"
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />

                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25"
                                >
                                    Search
                                </button>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* MAIN CONTENT */}

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-10">

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex items-center gap-4 hover:-translate-y-1 transition-transform">

                        <div className="bg-indigo-500/20 p-4 rounded-xl text-indigo-400">

                            <FaBuilding className="text-2xl" />

                        </div>

                        <div>

                            <h3 className="font-bold text-white text-lg">
                                500+ Properties
                            </h3>

                            <p className="text-slate-400 text-sm">
                                Verified listings across cities
                            </p>

                        </div>

                    </div>

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex items-center gap-4 hover:-translate-y-1 transition-transform">

                        <div className="bg-amber-500/20 p-4 rounded-xl text-amber-400">

                            <FaBed className="text-2xl" />

                        </div>

                        <div>

                            <h3 className="font-bold text-white text-lg">
                                Comfortable Living
                            </h3>

                            <p className="text-slate-400 text-sm">
                                Fully furnished modern rooms
                            </p>

                        </div>

                    </div>

                    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 flex items-center gap-4 hover:-translate-y-1 transition-transform">

                        <div className="bg-emerald-500/20 p-4 rounded-xl text-emerald-400">

                            <FaStar className="text-2xl" />

                        </div>

                        <div>

                            <h3 className="font-bold text-white text-lg">
                                Top Rated
                            </h3>

                            <p className="text-slate-400 text-sm">
                                Trusted by thousands of students
                            </p>

                        </div>

                    </div>

                </div>

                {/* POPULAR CITIES */}

                <div className="mb-20">

                    <div className="flex justify-between items-end mb-8">

                        <div>

                            <h2 className="text-3xl font-bold text-white tracking-tight">

                                Popular Cities

                            </h2>

                            <p className="text-slate-400 mt-2">

                                Explore accommodations in top educational hubs.

                            </p>

                        </div>

                        <Link
                            to="/hostel-filter"
                            className="hidden sm:block text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
                        >

                            View all cities →

                        </Link>

                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

                        {[
                            {
                                city: "Kochi",
                                image:
                                    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
                            },

                            {
                                city: "Calicut",
                                image:
                                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                            },

                            {
                                city: "Trivandrum",
                                image:
                                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
                            },

                            {
                                city: "Thrissur",
                                image:
                                    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
                            }

                        ].map((item, idx) => (

                            <Link
                                key={idx}
                                to={`/hostel-filter?city=${item.city}`}
                                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-700"
                            >

                                <img
                                    src={item.image}
                                    alt={item.city}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                                <div className="absolute bottom-4 left-4">

                                    <h3 className="text-xl font-bold text-white">
                                        {item.city}
                                    </h3>

                                    <p className="text-sm text-slate-200">
                                        Explore Hostels
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>

                </div>

                {/* FEATURED HOSTELS */}

                <div>

                    <div className="flex justify-between items-end mb-8">

                        <div>

                            <h2 className="text-3xl font-bold text-white tracking-tight">

                                Featured Hostels

                            </h2>

                            <p className="text-slate-400 mt-2">

                                Latest added hostels from owners.

                            </p>

                        </div>

                        <Link
                            to="/hostel-filter"
                            className="hidden sm:block text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
                        >

                            Explore more →

                        </Link>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {latestHostels.length > 0 ? (

                            latestHostels.map((hostel) => (

                                <div
                                    key={hostel._id}
                                    className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 group hover:-translate-y-2 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-2xl"
                                >

                                    {/* IMAGE */}

                                    <div className="relative h-56 overflow-hidden">

                                        <img
                                            src={
                                                hostel.uploadImg?.length > 0
                                                    ? `https://hostel-finder-backend-2.onrender.com//uploadImg/${hostel.uploadImg[0]}`
                                                    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                                            }
                                            alt={hostel.propertyname}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                                            }}
                                        />

                                        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold border border-white/20">

                                            {hostel.hostelfor}

                                        </div>

                                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-md">

                                            <FaStar />

                                            {hostel.rating || 0}

                                        </div>

                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-6">

                                        <h3 className="text-xl font-bold text-white line-clamp-1 mb-2">

                                            {hostel.propertyname}

                                        </h3>

                                        <p className="text-slate-400 text-sm flex items-center gap-1 mb-4">

                                            <FaMapMarkerAlt />

                                            {hostel.area}, {hostel.city}

                                        </p>

                                        <div className="flex flex-wrap items-center gap-2 mb-6">

                                            {hostel.facilities?.slice(0, 3).map((item, index) => (

                                                <span
                                                    key={index}
                                                    className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-600"
                                                >

                                                    {item}

                                                </span>

                                            ))}

                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-700 pt-4">

                                            <div className="font-bold text-xl text-indigo-400">

                                                ₹{hostel.price}

                                                <span className="text-sm text-slate-500 font-normal">

                                                    /mo

                                                </span>

                                            </div>

                                            <Link
                                                to={`/hostel-details/${hostel._id}`}
                                                className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all"
                                            >

                                                View Details

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="text-white text-lg">
                                No Hostels Found
                            </div>

                        )}

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Home;