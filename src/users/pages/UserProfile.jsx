import React, { useState,useEffect } from 'react';
import { FaUser, FaHeart, FaCalendarCheck, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Favorites from './Favorites';
import UserBooking from './UserBooking';

function UserProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    
    useEffect(()=>{
        if(sessionStorage.getItem("token")){

        }
    })

    const menuItems = [
        { id: 'profile', icon: <FaUser />, label: 'Personal Info' },
        { id: 'favorites', icon: <FaHeart />, label: 'Saved Hostels' },
        { id: 'bookings', icon: <FaCalendarCheck />, label: 'My Bookings' },
        { id: 'settings', icon: <FaCog />, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden bg-white p-4 border-b border-slate-200 flex items-center gap-3">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    <FaBars />
                </button>
                <h1 className="font-bold text-slate-800">My Account</h1>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                
                {/* Sidebar */}
                <aside className={`fixed  inset-y-0 left-0 z-50 w-72 bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:shadow-none lg:bg-transparent flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    
                    {/* Mobile Close Btn */}
                    <div className="p-4 flex justify-end lg:hidden">
                        <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border lg:border-slate-100 overflow-hidden flex-grow lg:flex-grow-0">
                        {/* User Summary Box */}
                        <div className="p-6 text-center border-b border-slate-100">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-indigo-50" />
                            <h2 className="font-bold text-lg text-slate-800">{sessionStorage.getItem("uname")}</h2>
                            <p className="text-sm text-slate-500">Student</p>
                        </div>
                        
                        <nav className="p-4 flex flex-col gap-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left mt-4">
                                <FaSignOutAlt /> Log Out
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                )}

                {/* Content Area */}
                <div className="flex-grow">
                    
                    {/* PROFILE TAB */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Information</h2>
                            <form className="space-y-6 max-w-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                        <input type="text" defaultValue="Karthik" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                        <input type="text" defaultValue="M" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                        <input type="email" defaultValue="karthik@gmail.com" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                        <input type="tel" defaultValue="+91 9876543210" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location / City</label>
                                        <input type="text" defaultValue="Kasaragod, Kerala" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-indigo-200 transition-all">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* FAVORITES TAB */}
                    {activeTab === "favorites" && <Favorites/>}

                    {/* BOOKINGS TAB */}
                    {activeTab === "bookings" && <UserBooking/> }

                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Account Settings</h2>
                            
                            <div className="space-y-6 max-w-2xl">
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="font-bold text-slate-800 mb-2">Notifications</h3>
                                    <div className="space-y-3 mt-4">
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
                                            <span className="text-slate-700">Email alerts for booking updates</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
                                            <span className="text-slate-700">SMS alerts for booking updates</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300" />
                                            <span className="text-slate-700">Promotional emails and offers</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Danger Zone</h3>
                                    <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                    <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 font-medium transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default UserProfile;