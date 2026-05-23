import React, { useEffect, useState } from 'react';
import { FaBuilding, FaClipboardCheck, FaWallet, FaStar, FaArrowUp, FaArrowDown, FaEdit, FaCheck,FaCalendarCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOwnerHostelsApi, updateHostelApi, getOwnerBookingsApi, getRecentBookingsApi } from '../../Services/allApi';
import AllBooking from './AllBooking';

function OwnerDashboard() {

  const [ownerHostels, setOwnerHostels] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([])
  const [editingId, setEditingId] = useState(null);      // which hostel is being edited
  const [editValue, setEditValue] = useState("");         // current dropdown selection
  const [activeTab, setActiveTab] = useState("allBookings");
  const [recentBookings, setRecentBookings] = useState([])
  const [editData, setEditData] = useState({
    propertyname: "",
    city: "",
    area: "",
    price: "",
    hostelfor: ""
  })

  // Fetch owner's hostels on mount
  useEffect(() => {
    fetchOwnerHostels();
    fetchOwnerBookings()
    getRecentBookings()
  }, []);

  const fetchOwnerHostels = async () => {
    try {
      const res = await getOwnerHostelsApi();
      if (res && res.status === 200) {
        setOwnerHostels(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOwnerBookings = async () => {
    try {
      const res = await getOwnerBookingsApi()
      if (res && res.status === 200) {
        setOwnerBookings(res.data)
      }
    }
    catch (err) {
      console.log(err);

    }
  }

  //  editing option for a hostel
  const startEdit = (hostel) => {

    setEditingId(hostel._id)

    setEditData({
      propertyname: hostel.propertyname,
      city: hostel.city,
      area: hostel.area,
      price: hostel.price,
      hostelfor: hostel.hostelfor
    })

  }

  // Save the updated hostelfor
  const saveHostel = async (id) => {

    try {

      const response = await updateHostelApi(id, editData)

      if (response.status === 200) {

        toast.success("Updated Successfully")

        fetchOwnerHostels()

        setEditingId(null)

      }

    } catch (err) {

      console.log(err)

    }

  }

  const getRecentBookings = async () => {

    try {

      const response = await getRecentBookingsApi()

      if (response.status === 200) {

        setRecentBookings(response.data)

      }

    }

    catch (err) {

      console.log(err)

    }

  }

  const viewAll = {
    id: 'AllBookings',
    icon: <FaCalendarCheck />,
    label: 'All Bookings'
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <h1 className="text-slate-500 text-md mt-1">Welcome back,<span className='text-xl text-indigo-600 font-bold'>{sessionStorage.getItem("uname")}!</span> Here's what's happening today.</h1>
        </div>
        <Link to={'/add-hostel'} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200">
          + Add New Hostel
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
              <FaBuilding className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <FaArrowUp className="w-3 h-3 mr-1" /> 12%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Properties</h3>
          <p className="text-2xl font-bold text-slate-800">{ownerHostels.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
              <FaClipboardCheck className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <FaArrowUp className="w-3 h-3 mr-1" /> 5%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Bookings</h3>
          <p className="text-2xl font-bold text-slate-800">{ownerBookings.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
              <FaWallet className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <FaArrowUp className="w-3 h-3 mr-1" /> 18%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Earnings</h3>
          <p className="text-2xl font-bold text-slate-800">₹1,24,500</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-rose-50 p-3 rounded-lg text-rose-600">
              <FaStar className="w-6 h-6" />
            </div>
            <span className="flex items-center text-sm font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded">
              <FaArrowDown className="w-3 h-3 mr-1" /> 2%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Average Rating</h3>
          <p className="text-2xl font-bold text-slate-800">4.6/5</p>
        </div>

      </div>

      {/* MY HOSTELS — Fix hostelfor for existing records */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">My Listed Hostels</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              If You Want to Edit Hostels, click
              <span className="text-indigo-600 font-medium"> Edit</span> Button.And Show Your Latest Updated Hostel
            </p>
          </div>
          <Link to="/add-hostel" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
            + Add New
          </Link>
        </div>

        {ownerHostels.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No hostels listed yet.{" "}
            <Link to="/add-hostel" className="text-indigo-600 hover:underline font-medium">Add one now</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                  <th className="p-4 font-medium">Property Name</th>
                  <th className="p-4 font-medium">City</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Hostel For</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">

                {ownerHostels.map((h) => (

                  <tr
                    key={h._id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >

                    {/* PROPERTY NAME */}

                    <td className="p-4">

                      {editingId === h._id ? (

                        <input
                          type="text"
                          value={editData.propertyname}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              propertyname: e.target.value
                            })
                          }
                          className="border border-gray-300 rounded-lg px-2 py-1 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />

                      ) : (

                        <span className="font-medium text-slate-800">
                          {h.propertyname}
                        </span>

                      )}

                    </td>

                    {/* CITY + AREA */}

                    <td className="p-4">

                      {editingId === h._id ? (

                        <div className="flex flex-col gap-2">

                          <input
                            type="text"
                            value={editData.area}
                            placeholder="Area"
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                area: e.target.value
                              })
                            }
                            className="border  border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          />

                          <input
                            type="text"
                            value={editData.city}
                            placeholder="City"
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                city: e.target.value
                              })
                            }
                            className="border  border-gray-300 rounded-lg px-2 py-1 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          />

                        </div>

                      ) : (

                        <span className="text-slate-600">
                          {h.area}, {h.city}
                        </span>

                      )}

                    </td>

                    {/* PRICE */}

                    <td className="p-4">

                      {editingId === h._id ? (

                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              price: e.target.value
                            })
                          }
                          className="border  border-gray-300 rounded-lg px-2 py-1 w-28 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />

                      ) : (

                        <span className="text-slate-600">
                          ₹{h.price}/mo
                        </span>

                      )}

                    </td>

                    {/* HOSTEL FOR */}

                    <td className="p-4">

                      {editingId === h._id ? (

                        <select
                          value={editData.hostelfor}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              hostelfor: e.target.value
                            })
                          }
                          className="border border-indigo-400 rounded-lg px-2 py-1 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        >
                          <option value="">Select</option>
                          <option value="Boys">Boys</option>
                          <option value="Girls">Girls</option>
                          <option value="Both">Both</option>
                        </select>

                      ) : (

                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${h.hostelfor === "Girls"
                            ? "bg-pink-50 text-pink-600"
                            : h.hostelfor === "Boys"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-purple-50 text-purple-600"
                            }`}
                        >
                          {h.hostelfor}
                        </span>

                      )}

                    </td>

                    {/* ACTION */}

                    <td className="p-4">

                      {editingId === h._id ? (

                        <button
                          onClick={() => saveHostel(h._id)}
                          className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium"
                        >
                          <FaCheck className="text-xs" />
                          Save
                        </button>

                      ) : (

                        <button
                          onClick={() => startEdit(h)}
                          className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium"
                        >
                          <FaEdit className="text-xs" />
                          Edit
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">

          <div className="p-6 border-b border-slate-100 flex justify-between items-center">

            <h2 className="text-lg font-bold text-slate-800">

              Recent Bookings

            </h2>

            <button
              onClick={() => setActiveTab("allBookings")}
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
            >
              view all

            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">

                  <th className="p-4 font-medium">Guest Name</th>

                  <th className="p-4 font-medium">Property</th>

                  <th className="p-4 font-medium">Check-in</th>

                  <th className="p-4 font-medium">Status</th>

                  <th className="p-4 font-medium">Amount</th>

                </tr>

              </thead>

              <tbody className="text-sm">

                {

                  recentBookings.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                    >

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold uppercase">

                            {item.fullName?.charAt(0)}

                          </div>

                          <span className="font-medium text-slate-800">

                            {item.fullName}

                          </span>

                        </div>

                      </td>

                      <td className="p-4 text-slate-600">

                        {item.hostelId?.propertyname}

                      </td>

                      <td className="p-4 text-slate-600">

                        {item.checkInDate}

                      </td>

                      <td className="p-4">

                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold

                  ${item.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-rose-50 text-rose-600"
                          }

                `}>

                          {item.status}

                        </span>

                      </td>

                      <td className="p-4 font-medium text-slate-800">

                        ₹{item.hostelId?.price}

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-left transition-colors border border-transparent hover:border-slate-100">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <FaBuilding />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Update Availability</h4>
                <p className="text-xs text-slate-500 mt-0.5">Manage your rooms</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-left transition-colors border border-transparent hover:border-slate-100">
              <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                <FaWallet />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm">Withdraw Funds</h4>
                <p className="text-xs text-slate-500 mt-0.5">Transfer to bank</p>
              </div>
            </button>
          </div>

          <div className="p-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Recent Reviews</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-400 text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <span className="text-xs text-slate-400">2d ago</span>
                </div>
                <p className="text-sm text-slate-600">"Great place, very clean and food is good!"</p>
                <p className="text-xs text-slate-500 font-medium mt-2">- Aman D.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default OwnerDashboard;

