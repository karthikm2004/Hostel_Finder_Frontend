import React, { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaExclamationTriangle, FaChartLine, FaCheck, FaTimes, FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HostelMange from './HostelMange';
import UserManagement from './UserManagement';
import { getAllUsersApi, getAllHostelsApi, getRecentHostelsApi } from '../../Services/allApi';



function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalHostels, setTotalHostels] = useState(0)
  const [recentHostels, setRecentHostels] = useState([])

  const menuItems = [
    { id: 'overview', icon: <FaChartLine />, label: 'Analytics Overview' },
    { id: 'users', icon: <FaUsers />, label: 'Manage Users' },
    { id: 'hostels', icon: <FaBuilding />, label: 'Manage Hostels' },
    { id: 'reports', icon: <FaExclamationTriangle />, label: 'Reports & Complaints' },
  ];



  const getUsers = async () => {

    try {

      const response = await getAllUsersApi()

      if (response.status === 200) {

        setTotalUsers(response.data.length)

      }

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    getUsers()
    getHostels()
    getRecentHostels()

  }, [])


  const getHostels = async () => {

    try {

      const response = await getAllHostelsApi()

      if (response.status === 200) {

        setTotalHostels(response.data.length)

      }

    }

    catch (err) {

      console.log(err)

    }

  }

  const getRecentHostels = async () => {

    try {

      const response = await getRecentHostelsApi()

      if (response.status === 200) {

        setRecentHostels(response.data)

      }

    }

    catch (err) {

      console.log(err)

    }

  }

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
        <h1 className="font-bold text-slate-800">Admin Panel</h1>
      </div>

      <main className="flex-grow flex">

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-xl text-white tracking-wide">Admin Portal</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <FaTimes />
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-2 flex-grow">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Main Content Area */}
        <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Platform Analytics</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="bg-indigo-50 p-4 rounded-full text-indigo-600 mb-4"><FaUsers className="w-8 h-8" /></div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">Total Users</h3>
                  <p className="text-3xl font-bold text-slate-800">{totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="bg-amber-50 p-4 rounded-full text-amber-600 mb-4"><FaBuilding className="w-8 h-8" /></div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">Listed Hostels</h3>
                  <p className="text-3xl font-bold text-slate-800">{totalHostels}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 mb-4"><FaChartLine className="w-8 h-8" /></div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">Monthly Bookings</h3>
                  <p className="text-3xl font-bold text-slate-800">3,210</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="bg-rose-50 p-4 rounded-full text-rose-600 mb-4"><FaExclamationTriangle className="w-8 h-8" /></div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">Pending Reports</h3>
                  <p className="text-3xl font-bold text-slate-800">14</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">

                <h3 className="text-lg font-bold text-slate-800 mb-4">

                  Recent Hostel Registrations

                </h3>

                <div className="space-y-4">

                  {

                    recentHostels.map((item) => (

                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>

                          <p className="text-sm text-slate-600">

                            <span className="font-semibold text-slate-800">

                              {item.propertyname}

                            </span>

                            {"  "}added in{"  "}

                            {item.city}

                          </p>

                        </div>

                        <span className="text-xs text-slate-400 whitespace-nowrap">

                          {

                            new Date(item.createdAt).toLocaleDateString()

                          }

                        </span>

                      </div>

                    ))

                  }

                </div>

              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && <UserManagement />}

          {/* HOSTELS TAB */}
          {activeTab === "hostels" && <HostelMange />}

          {/* REPORTS TAB */}
          {activeTab === "reports" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Reports & Complaints</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                {[
                  { id: 'RP-092', issue: 'Fake Listing - Photos do not match', hostel: 'Sunshine PG', priority: 'High', color: 'rose' },
                  { id: 'RP-091', issue: 'Owner not refunding deposit', hostel: 'Elite Co-living', priority: 'Medium', color: 'amber' },
                ].map((report) => (
                  <div key={report.id} className="p-6 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-${report.color}-100 text-${report.color}-700`}>{report.priority} Priority</span>
                        <span className="text-xs text-slate-400 font-medium">{report.id}</span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg">{report.issue}</h3>
                      <p className="text-sm text-slate-500">Reported against: <span className="font-semibold text-indigo-600">{report.hostel}</span></p>
                    </div>
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                      Investigate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
