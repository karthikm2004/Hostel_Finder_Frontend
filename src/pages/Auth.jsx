import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signUpApi, signInApi } from '../Services/allApi';

function Auth({ signup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const { username, email, password } = user
      if (!username || !email || !password) {
        toast.info("Enter Valid Data")
      }
      else {
        const response = await signUpApi(user)
        console.log(response);
        if (response.status === 200) {
          toast.success("Signup Successfull")
          setUser({ username: "", email: "", password: "" })
          navigate('/signin')
        }

      }
    }
    catch (err) {
      console.log(err);
      if (response.status === 400) {
        toast.error("User Already Exist")
      }
      else {
        toast.error("Signup Failed")
      }

    }

  }

  const handleLogin = async () => {

    try {

      const response = await signInApi(user)

      console.log(response.data)

      if (response.status === 200) {

        sessionStorage.clear()
        localStorage.clear()

        sessionStorage.setItem(
          "token",
          response.data.token
        )

        sessionStorage.setItem(
          "role",
          response.data.role
        )

        sessionStorage.setItem(
          "uname",
          response.data.username
        )

        toast.success("Login Success")

        // ADMIN LOGIN
        if (response.data.role === "admin") {

          navigate('/admin-dashboard')

        }

        // NORMAL USER LOGIN
        else {

          navigate('/')

        }

      }

    }

    catch (err) {

      console.log(err)

      toast.error("Login Failed")

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
          <div className="flex-grow overflow-y-auto px-6 sm:px-12 md:px-20 xl:px-32 pb-12 flex flex-col justify-center ">
            <div className="max-w-md w-full mx-auto py-8">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                  {signup ? "Create an account" : "Welcome back"}
                </h1>
                <p className="text-slate-400 text-sm sm:text-base">
                  {signup
                    ? "Join HostelFinder today and find your perfect stay."
                    : "Enter your details to access your account."}
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

                {signup && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                      value={user.username}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                    value={user.email}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    {!signup && (
                      <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot password?</a>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                      value={user.password}
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

                <button onClick={signup ? handleRegister : handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 mt-4 text-sm sm:text-base">
                  {signup ? "Create Account" : "Sign In"}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-400">
                {signup ? "Already have an account? " : "Don't have an account? "}
                <Link to={signup ? "/signin" : "/signup"} className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                  {signup ? "Sign In" : "Sign Up"}
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

export default Auth;