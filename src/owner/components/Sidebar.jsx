import React, { useState, useEffect } from 'react';
import OwnerDashboard from '../pages/OwnerDashboard';
import AddHostel from '../pages/AddHostel';
import HostelList from '../pages/HostelList';
import OwnerBookings from '../pages/OwnerBookings';
import Settings from '../pages/Settings';
import { FaBuilding, FaPlusCircle, FaListUl, FaCalendarCheck, FaCommentDots, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");




    // LOGOUT FUNCTION
    const handleLogout = () => {

        sessionStorage.clear();

        window.location.href = "/owner-signin";

    };

    const menuItems = [
        { id: 'dashboard', icon: <FaBuilding />, label: 'Dashboard' },
        { id: 'add-hostel', icon: <FaPlusCircle />, label: 'Add Property' },
        { id: 'my-hostels', icon: <FaListUl />, label: 'My Properties' },
        { id: 'bookings', icon: <FaCalendarCheck />, label: 'Bookings' },
        { id: 'enquiries', icon: <FaCommentDots />, label: 'Enquiries' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden bg-indigo-600 text-white p-4 flex justify-between items-center z-20 shadow-md">
                <h1 className="font-bold text-lg tracking-wide">Owner Portal</h1>
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-indigo-700 rounded-lg">
                    <FaBars className="w-5 h-5" />
                </button>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:shadow-none md:border-r md:border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </span>
                        Owner Panel
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600 p-2">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-12 h-12 rounded-full border-2 border-indigo-50" />
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg">{sessionStorage.getItem("uname")}</h2>
                        <p className="text-xs text-slate-500">Property Owner</p>
                    </div>
                </div>

                <nav className="p-4 flex flex-col gap-1 flex-grow">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>


            </aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col overflow-x-hidden">

                {/* Desktop Topbar */}
                <header className="hidden md:flex bg-white border-b border-slate-200 h-16 items-center px-8 justify-end sticky top-0 z-30">
                    <div className="p-4 border-t border-slate-100">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 hover:bg-rose-600 hover:text-white transition-colors text-left">
                            <FaSignOutAlt /> Log Out
                        </button>
                    </div>
                </header>

                <div className="flex-grow">
                    {activeTab === "dashboard" && <OwnerDashboard />}
                    {activeTab === "add-hostel" && <AddHostel />}
                    {activeTab === "my-hostels" && <HostelList />}

                    {activeTab === "bookings" && <OwnerBookings/>}
                    {activeTab === "enquiries" && (
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Enquiries</h2>
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                                <FaCommentDots className="text-slate-300 w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-700">Messages</h3>
                                <p className="text-slate-500">Read messages from potential guests.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}

export default Sidebar;