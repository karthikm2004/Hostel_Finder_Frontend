import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ownerSignInApi, ownerSignUpApi } from '../../Services/allApi';

function OwnerAuth({ OwnerSignup }) {
    const [showPassword, setShowPassword] = useState(false);
    const [ownerUser, setOwnerUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const { username, email, password } = ownerUser

            if (!username || !email || !password) {
                toast.info("Enter Valid Data")
            } else {
                const response = await ownerSignUpApi(ownerUser)

                if (response.status === 200) {
                    toast.success("Signup Successful")
                    setOwnerUser({ username: "", email: "", password: "" })
                    navigate('/owner-signin')
                }
            }

        } catch (err) {
            console.log(err);

            if (err?.response?.status === 400) {
                toast.error("User Already Exists")
            } else {
                toast.error("Signup Failed")
            }
        }
    }


    const handleLogin = async () => {
        try {
            const { email, password } = ownerUser

            if (!email || !password) {
                toast.info("Enter Valid data")
            } else {
                const response = await ownerSignInApi(ownerUser)

                if (response.status === 200) {
                    sessionStorage.setItem('token', response.data.token)
                    sessionStorage.setItem('uname', response.data.username)
                    sessionStorage.setItem('role', response.data.role)
                    sessionStorage.setItem('dp', response.data.profile)

                    toast.success("Signin Successful")

                    setOwnerUser({ username: "", email: "", password: "" })
                    navigate('/owner-profile')
                    console.log(response.data)

                }
            }

        } catch (err) {
            console.log(err);

            if (err?.response?.status === 400) {
                toast.error("Invalid Credentials")
            } else {
                toast.error("Signin Failed")
            }
        }
    }

    return (
        <>
            <div className="fixed inset-0 w-full h-full flex bg-slate-900 font-sans z-50">

                {/* Left Side - Form Area */}
                <div className="w-full lg:w-1/2 h-full flex flex-col bg-slate-900 shadow-2xl z-20">

                    {/* Top Navbar Area inside Left Side */}
                    <div className="p-6 sm:p-8 flex-none">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-medium hover:-translate-x-1">
                            <FaArrowLeft /> Back to Home
                        </Link>
                    </div>

                    {/* Scrollable Form Container */}
                    <div className="flex-grow overflow-y-auto px-6 sm:px-12 md:px-20 xl:px-32 pb-12 flex flex-col justify-start pt-10">
                        <div className="max-w-md w-full mx-auto py-8">
                            <div className="mb-8">
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                                    {OwnerSignup ? "Create an account" : "Welcome back,"}
                                </h1>
                                <p className="text-slate-400 text-sm sm:text-base">
                                    {OwnerSignup
                                        ? "Join HostelFinder as a hostel owner today."
                                        : "Manage your hostels, bookings, and enquiries in one place."}
                                </p>
                            </div>

                            {/* Social Auth */}
                            <div className="mb-6">
                                <button className="w-full flex items-center justify-center gap-3 border border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-200 p-3.5 rounded-xl transition-all hover:shadow-lg">
                                    <FaGoogle className="text-rose-500 text-lg" /> <span className="font-semibold text-sm">Continue with Google</span>
                                </button>
                            </div>

                            <div className="relative flex items-center py-4 mb-2">
                                <div className="flex-grow border-t border-slate-700"></div>
                                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider font-semibold">Or continue with email</span>
                                <div className="flex-grow border-t border-slate-700"></div>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                                {OwnerSignup && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            onChange={(e) => { setOwnerUser({ ...ownerUser, username: e.target.value }) }}
                                            value={ownerUser.username}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        onChange={(e) => { setOwnerUser({ ...ownerUser, email: e.target.value }) }}
                                        value={ownerUser.email}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-slate-300">Password</label>
                                        {!OwnerSignup && (
                                            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot password?</a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                            onChange={(e) => { setOwnerUser({ ...ownerUser, password: e.target.value }) }}
                                            value={ownerUser.password}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </div>
                                </div>

                                <button onClick={OwnerSignup ? handleRegister : handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 mt-4 text-sm sm:text-base">
                                    {OwnerSignup ? "Create Account" : "Sign In"}
                                </button>
                            </form>

                            <p className="mt-8 text-center text-sm text-slate-400">
                                {OwnerSignup ? "Already have an account? " : "Don't have an account? "}
                                <Link to={OwnerSignup ? "/owner-signin" : "/owner-signup"} className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                                    {OwnerSignup ? "Sign In" : "Sign Up"}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image/Decoration */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-slate-800 h-full z-10">
                    <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop"
                        alt="Hostel Room"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
                        <div className="max-w-lg transform translate-y-0 hover:-translate-y-2 transition-transform duration-500">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Find your next home away from home.</h2>
                            <p className="text-slate-300 text-lg md:text-xl font-light">Join thousands of students and professionals discovering the best accommodations.</p>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-lg" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                    <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-lg" src="https://i.pravatar.cc/100?img=2" alt="User" />
                                    <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-lg" src="https://i.pravatar.cc/100?img=3" alt="User" />
                                    <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                        +10k
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">Users already joined</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}

export default OwnerAuth