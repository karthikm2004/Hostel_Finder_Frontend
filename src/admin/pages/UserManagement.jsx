import React, { useEffect, useState } from 'react'

import { FaSearch } from 'react-icons/fa'

import { getAllUsersApi } from '../../Services/allApi'

function UserManagement() {

    const [users, setUsers] = useState([])

    const [searchKey, setSearchKey] = useState("")

    // GET USERS

    const getUsers = async () => {

        try {

            const response = await getAllUsersApi()

            if (response.status === 200) {

                setUsers(response.data)

            }

        }

        catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {

        getUsers()

    }, [])

    // FILTER USERS

    const filteredUsers = users.filter((item) =>

        item.username?.toLowerCase().includes(searchKey.toLowerCase())

    )

    return (

        <div className="animate-fade-in">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

                <h2 className="text-3xl font-bold text-slate-800">

                    Manage Users

                </h2>

                {/* SEARCH */}

                <div className="relative w-full sm:w-auto text-slate-500">

                    <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3" />

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full sm:w-72 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
                    />

                </div>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        {/* TABLE HEAD */}

                        <thead className="bg-slate-50 border-b border-slate-100">

                            <tr>

                                <th className="p-5 text-xs font-semibold text-slate-500 uppercase">
                                    User Name
                                </th>

                                <th className="p-5 text-xs font-semibold text-slate-500 uppercase">
                                    Email
                                </th>

                                <th className="p-5 text-xs font-semibold text-slate-500 uppercase">
                                    Role
                                </th>

                                <th className="p-5 text-xs font-semibold text-slate-500 uppercase">
                                    Joined
                                </th>

                                <th className="p-5 text-xs font-semibold text-slate-500 uppercase">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        {/* TABLE BODY */}

                        <tbody className="divide-y divide-slate-100">

                            {

                                filteredUsers.length > 0 ?

                                    filteredUsers.map((user) => (

                                        <tr
                                            key={user._id}
                                            className="hover:bg-slate-50 transition-all"
                                        >

                                            {/* USER */}

                                            <td className="p-5">

                                                <div>

                                                    <p className="font-semibold text-slate-800">

                                                        {user.username}

                                                    </p>

                                                </div>

                                            </td>

                                            {/* EMAIL */}

                                            <td className="p-5 text-slate-600 text-sm">

                                                {user.email}

                                            </td>

                                            {/* ROLE */}

                                            <td className="p-5">

                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold

                                                    ${user.role === "owner"
                                                        ? "bg-indigo-100 text-indigo-600"
                                                        : "bg-emerald-100 text-emerald-600"
                                                    }

                                                `}>

                                                    {user.role}

                                                </span>

                                            </td>

                                            {/* DATE */}

                                            <td className="p-5 text-sm text-slate-500">

                                                {

                                                    new Date(user.createdAt)
                                                        .toLocaleDateString()

                                                }

                                            </td>

                                            {/* STATUS */}

                                            <td className="p-5">

                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600">

                                                    Active

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-10 text-slate-500"
                                        >

                                            No Users Found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )

}

export default UserManagement