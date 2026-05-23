import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto pt-12 pb-6 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-indigo-400 flex items-center gap-2 mb-4 hover:scale-105 transition-transform w-max">
                            <span className="bg-indigo-500 text-white p-1.5 rounded-lg shadow-md shadow-indigo-500/20">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                            </span>
                            HostelFinder
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Find the best hostels and PGs easily. Compare prices, facilities, and book your stay with confidence.
                        </p>
                        <div className='flex items-center gap-4 text-slate-400'>
                            <a href="#" className="hover:text-indigo-400 hover:-translate-y-1 transition-all"><FaInstagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-indigo-400 hover:-translate-y-1 transition-all"><FaLinkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-indigo-400 hover:-translate-y-1 transition-all"><FaFacebookSquare className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-indigo-400 hover:-translate-y-1 transition-all"><FaTwitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h2 className="text-white font-bold mb-4">Explore</h2>
                        <ul className="space-y-3">
                            <li><Link to="/hostel-filter" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Find Hostels</Link></li>
                            <li><Link to="/hostel-filter" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Popular Cities</Link></li>
                            <li><Link to="/hostel-filter" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Boys Hostels</Link></li>
                            <li><Link to="/hostel-filter" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Girls Hostels</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h2 className="text-white font-bold mb-4">Company</h2>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">About Us</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Careers</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Press & Media</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* For Owners */}
                    <div>
                        <h2 className="text-white font-bold mb-4">For Property Owners</h2>
                        <p className="text-slate-400 text-sm mb-4">List your property with us and reach thousands of students and professionals.</p>
                        <Link to="/owner-signin" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all text-sm">
                            Become a Host
                        </Link>
                    </div>

                </div>

                {/* Bottom */}
                <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © 2026 HostelFinder. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;