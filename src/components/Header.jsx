import { Link } from "react-router-dom";
import {FaSearch,FaBell,FaSignOutAlt,FaSignInAlt} from "react-icons/fa";

function Header() {

  // CHECK LOGIN STATUS
  const isLoggedIn = !!sessionStorage.getItem("token");

  // LOGOUT FUNCTION
  const handleLogout = () => {

    sessionStorage.clear();

    window.location.href = "/signin";

  };

  return (

    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16 gap-3">

          {/* LOGO */}

          <div className="flex-shrink-0 flex items-center">

            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-indigo-400 flex items-center gap-2 hover:scale-105 transition-transform"
            >

              <span className="bg-indigo-500 text-white p-1.5 rounded-lg shadow-md shadow-indigo-500/20">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>

                </svg>

              </span>

              HostelFinder

            </Link>

          </div>

          {/* SEARCH BAR */}

          <div className="hidden md:flex flex-1 max-w-md relative">

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

              <FaSearch className="text-slate-400" />

            </div>

            <input
              type="text"
              placeholder="Search hostels..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
            />

          </div>

          {/* RIGHT SECTION */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* NOTIFICATION */}

            {isLoggedIn && (

              <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-all">

                <FaBell className="w-5 h-5" />

                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-amber-500 ring-2 ring-slate-900"></span>

              </button>

            )}

            {/* USER PROFILE */}

            {isLoggedIn && (

              <Link
                to={
                  sessionStorage.getItem("role") === "owner"
                    ? "/owner-dashboard"
                    : "/user-profile"
                }
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-2 sm:px-3 py-1.5 rounded-full transition-all"
              >

                <img
                  src={
                    sessionStorage.getItem("dp") ||
                    "https://static.vecteezy.com/system/resources/previews/026/434/417/non_2x/default-avatar-profile-icon-of-social-media-user-photo-vector.jpg"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border border-slate-600"
                />

                <span className="hidden sm:block text-slate-200 text-sm font-medium">
                  {sessionStorage.getItem("uname")}
                </span>

              </Link>

            )}

            {/* LOGIN BUTTON */}

            {!isLoggedIn && (

              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-all"
              >

                <FaSignInAlt />

                <span className="hidden sm:block">
                  Login
                </span>

              </Link>

            )}

            {/* LOGOUT BUTTON */}

            {isLoggedIn && (

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all"
              >

                <FaSignOutAlt />

                <span className="hidden sm:block">
                  Logout
                </span>

              </button>

            )}

          </div>

        </div>

      </div>

    </header>

  );
}

export default Header;