import React, { useEffect, useState } from 'react';

import { FaFilter, FaStar, FaMapMarkerAlt, FaWifi, FaCoffee, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa";

import { FaCheckCircle } from 'react-icons/fa';
import { MdLocalLaundryService } from "react-icons/md";
import { LiaToiletSolid } from "react-icons/lia";
import { GiCctvCamera } from "react-icons/gi";
import { LiaCentos } from "react-icons/lia";
import { toast } from 'react-toastify';

import { Link, useSearchParams } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getAllHostelsApi, addFavoriteApi } from '../Services/allApi';

function HostelFilter() {

  const [showFilters, setShowFilters] = useState(false);

  // URL QUERY PARAMS
  const [searchParams] = useSearchParams();

  const selectedCity = searchParams.get("city") || "";

  const searchKey = searchParams.get("search") || ""

  // FILTER STATE
  const [formData, setFormData] = useState({
    city: selectedCity,
    propertyname: "",
    hostelFor: "",
    amenities: [],
  });

  // HOSTELS STATE
  const [hostels, setHostels] = useState([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const hostelsPerPage = 8;

  // FETCH HOSTELS
  useEffect(() => {

    const fetchHostels = async () => {

      try {

        const response = await getAllHostelsApi(searchKey);

        if (response.status === 200) {

          console.log(response.data);

          setHostels(response.data);

        }

      } catch (err) {

        console.log(err);

      }

    };

    fetchHostels();

  }, [searchKey]);


  // const getFilteredHostels = async () => {

  //   const response = await getAllHostelsApi(searchKey)

  //   if (response.status === 200) {
  //     setAllHostels(response.data)
  //   }
  // }


  // UPDATE CITY FROM URL
  useEffect(() => {

    setFormData((prev) => ({
      ...prev,
      city: selectedCity
    }));

  }, [selectedCity]);

  // TOGGLE AMENITIES
  const toggleAmenity = (amenity) => {

    setFormData((prev) => ({

      ...prev,

      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]

    }));

  };

  // CLEAR FILTERS
  const clearFilters = () => {

    setFormData({
      city: "",
      propertyname: "",
      hostelFor: "",
      amenities: [],
    });

  };

  // FILTER LOGIC
  const filteredHostels = hostels.filter((hostel) => {

    // CITY FILTER
    const cityMatch =
      formData.city === "" ||
      hostel.city
        ?.toLowerCase()
        .includes(formData.city.toLowerCase()) ||
      hostel.area
        ?.toLowerCase()
        .includes(formData.city.toLowerCase());

    // PROPERTY NAME FILTER
    const hostelNameMatch =
      formData.propertyname === "" ||
      hostel.propertyname
        ?.toLowerCase()
        .includes(formData.propertyname.toLowerCase());

    // GENDER FILTER
    const genderMatch =
      formData.hostelFor === "" ||
      hostel.hostelfor?.includes(formData.hostelFor);

    // AMENITIES FILTER
    const amenitiesMatch =
      formData.amenities.length === 0 ||
      formData.amenities.every((item) =>
        hostel.facilities?.includes(item)
      );

    return (
      cityMatch &&
      hostelNameMatch &&
      genderMatch &&
      amenitiesMatch
    );

  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(
    filteredHostels.length / hostelsPerPage
  );

  const indexOfLastHostel =
    currentPage * hostelsPerPage;

  const indexOfFirstHostel =
    indexOfLastHostel - hostelsPerPage;

  const currentHostels = filteredHostels.slice(
    indexOfFirstHostel,
    indexOfLastHostel
  );

  // PAGINATION
  const paginate = (pageNumber) => {

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  // RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {

    setCurrentPage(1);

  }, [formData]);

  const handleFavorite = async (id) => {

    try {

      const response = await addFavoriteApi({
        hostelId: id
      })

      if (response.data === "Already Added") {

        toast.info("Already Added to Favorites")

      } else {

        toast.success("Added to Favorites")

      }

    } catch (err) {

      toast.error("Something went wrong")

      console.log(err)

    }

  }
  return (

    <div className="bg-slate-900 min-h-screen flex flex-col font-sans">

      <Header />

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center sticky top-16 z-30 shadow-md">

        <h1 className="font-bold text-white">
          Search Results
        </h1>

        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-lg font-medium"
        >
          <FaFilter />
          Filters
        </button>

      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative">

        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/4 lg:shadow-none lg:bg-transparent overflow-y-auto ${showFilters ? "translate-x-0" : "-translate-x-full"}`}>

          <div className="p-6 lg:p-0">

            {/* MOBILE CLOSE */}
            <div className="flex justify-between items-center lg:hidden mb-6">

              <h2 className="text-xl font-bold text-white">
                Filters
              </h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-slate-400 hover:text-white p-2"
              >
                <FaTimes className="text-xl" />
              </button>

            </div>

            <div className="space-y-8 lg:bg-slate-800 lg:p-6 lg:rounded-2xl lg:shadow-md lg:border lg:border-slate-700">

              {/* LOCATION */}
              <div>

                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">
                  Location
                </h3>

                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value
                    })
                  }
                  placeholder="Enter city or area..."
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500"
                />

              </div>

              {/* HOSTEL NAME */}
              <div>

                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">
                  Hostel Name
                </h3>

                <input
                  type="text"
                  value={formData.propertyname}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyname: e.target.value
                    })
                  }
                  placeholder="Enter hostel name"
                  className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500"
                />

              </div>

              {/* GENDER */}
              <div>

                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">
                  Gender Setup
                </h3>

                <div className="flex flex-wrap gap-2">

                  {["Boys", "Girls", "Both"].map((type) => (

                    <button
                      key={type}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          hostelFor:
                            formData.hostelFor === type
                              ? ""
                              : type
                        })
                      }
                      className={`px-4 py-2 rounded-full font-medium text-sm border transition-all ${formData.hostelFor === type
                        ? "border-indigo-500 bg-indigo-500/20 text-indigo-400"
                        : "border-slate-700 bg-slate-900 text-slate-400 hover:text-white"
                        }`}
                    >
                      {type}
                    </button>

                  ))}

                </div>

              </div>

              {/* AMENITIES */}
              <div>

                <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">
                  Amenities
                </h3>

                <div className="space-y-2">

                  {[
                    "WiFi",
                    "Food",
                    "Parking",
                    "Laundry",
                    "AC",
                    "CCTV"
                  ].map((amenity, i) => (

                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                    >

                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-5 h-5"
                      />

                      <span className="text-slate-300">
                        {amenity}
                      </span>

                    </label>

                  ))}

                </div>

              </div>

              {/* CLEAR BUTTON */}
              <div className="pt-6 border-t border-slate-700">

                <button
                  onClick={clearFilters}
                  className="w-full py-3 rounded-xl border border-red-700/30 bg-red-500/10 text-red-400 font-semibold tracking-wide hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                >
                  Clear All
                </button>

              </div>

            </div>

          </div>

        </aside>

        {/* OVERLAY */}
        {showFilters && (

          <div
            className="fixed inset-0 bg-slate-900/80 z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          ></div>

        )}

        {/* RESULTS */}
        <section className="flex-grow w-full lg:w-3/4">

          <div className="hidden lg:flex justify-between items-end mb-6">

            <div>

              <h2 className="text-2xl font-bold text-white">
                {filteredHostels.length} Properties Found
              </h2>

              <p className="text-slate-400">
                Showing best matches in {formData.city || "your area"}
              </p>

            </div>

          </div>

          {/* HOSTEL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {currentHostels.length > 0 ? (

              currentHostels.map((hostel) => (

                <div
                  key={hostel._id}
                  className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700"
                >

                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden group">

                    <img
                      src={
                        hostel.uploadImg?.length > 0
                          ? `http://localhost:3000/uploadImg/${hostel.uploadImg[0]}`
                          : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={hostel.propertyname}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                      }}
                    />

                    {/* FAVORITE BUTTON */}
                    <button
                      className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                      onClick={() => handleFavorite(hostel._id)}
                    >
                      <FaHeart />
                    </button>

                    {/* HOSTEL FOR */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white px-2 py-1 rounded text-xs font-bold">
                      {hostel.hostelfor}
                    </div>

                  </div>
                  {/* CONTENT */}
                  <div className="p-5">

                    <div className="flex justify-between items-start mb-1">

                      <h3 className="font-bold text-lg text-white line-clamp-1">
                        {hostel.propertyname}
                      </h3>

                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">

                        <FaStar />

                        {hostel.rating || 4.5}

                      </div>

                    </div>

                    <p className="text-slate-400 text-sm flex items-center gap-1 mb-4">

                      <FaMapMarkerAlt />

                      {hostel.area}, {hostel.city}

                    </p>

                    {/* FACILITIES */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">

                      {hostel.facilities?.map((item, index) => (

                        <span
                          key={index}
                          className="bg-slate-900 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-700 flex items-center gap-1"
                        >

                          {item === "WiFi" && <FaWifi />}
                          {item === "Food" && <FaCoffee />}
                          {item === "Laundry" && <MdLocalLaundryService />}
                          {item === "Attached Bathroom" && <LiaToiletSolid />}
                          {item === "CCTV" && <GiCctvCamera />}
                          {item === "AC" && <LiaCentos />}

                          <span className="text-sm font-medium text-slate-700">

                            {item}

                          </span>

                        </span>


                      ))}

                    </div>

                    {/* PRICE */}
                    <div className="flex items-center justify-between border-t border-slate-700 pt-4">

                      <div>

                        <div className="text-xs text-slate-500 uppercase font-bold">
                          Starts from
                        </div>

                        <div className="font-bold text-xl text-indigo-400">

                          ₹{hostel.price}

                          <span className="text-xs text-slate-500 font-normal">
                            /month
                          </span>

                        </div>

                      </div>

                      <Link
                        to={`/hostel-details/${hostel._id}`}
                        className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="text-white text-lg">
                No Hostels Found
              </div>

            )}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-lg font-bold ${currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300"
                    }`}
                >
                  {index + 1}
                </button>

              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                <FaChevronRight />
              </button>

            </div>

          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default HostelFilter;