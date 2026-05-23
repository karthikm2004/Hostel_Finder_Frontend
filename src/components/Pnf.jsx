import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

function Pnf() {

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 overflow-hidden relative">

            {/* Background Glow */}

            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

            {/* Main Content */}

            <div className="relative z-10 text-center max-w-2xl">

                {/* 404 Text */}

                <h1 className="text-[120px] sm:text-[170px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 leading-none drop-shadow-lg">
                    404
                </h1>

                {/* Title */}

                <h2 className="text-3xl sm:text-5xl font-bold text-white mt-4">
                    Page Not Found
                </h2>

                {/* Description */}

                <p className="text-slate-400 text-base sm:text-lg mt-5 leading-relaxed max-w-xl mx-auto">
                    The page you are looking for does not exist or may have been moved.
                    Explore hostels, properties, and accommodations from the homepage.
                </p>

                {/* Illustration */}

                <div className="mt-10 flex justify-center">

                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-found-illustration-download-in-svg-png-gif-file-formats--web-search-empty-state-pack-design-development-illustrations-4850245.png"
                        alt="404"
                        className="w-72 sm:w-96 object-contain drop-shadow-2xl"
                    />

                </div>

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:-translate-y-1"
                    >
                        <FaHome />
                        Back To Home
                    </Link>

                    <Link
                        to="/hostel-filter"
                        className="flex items-center gap-2 border border-slate-700 hover:border-indigo-500 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
                    >
                        <FaSearch />
                        Explore Hostels
                    </Link>

                </div>

            </div>

        </div>

    )

}

export default Pnf