
import React, { useEffect, useState } from 'react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaCoffee,
  FaCheckCircle
} from 'react-icons/fa'

import { MdLocalLaundryService } from "react-icons/md"
import { LiaToiletSolid } from "react-icons/lia"
import { GiCctvCamera } from "react-icons/gi"
import { LiaCentos } from "react-icons/lia"

import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import HostelBooking from './HostelBooking'

import { getHostelApi } from '../Services/allApi'

function HostelDetails() {

  const { id } = useParams()

  const [hostel, setHostel] = useState({})

  const [activeImage, setActiveImage] = useState(0)

  const [showModal, setShowModal] = useState(false)

  // GET HOSTEL DETAILS

  const getHostelDetails = async () => {

    try {

      const response = await getHostelApi(id)

      if (response.status === 200) {

        setHostel(response.data)

      }

    }

    catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    getHostelDetails()

  }, [id])

  // HOSTEL IMAGES

  const images =
    hostel.uploadImg?.length > 0
      ? hostel.uploadImg.map(
        (img) => `http://localhost:3000/uploadImg/${img}`
      )
      : [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=100&w=1200&auto=format&fit=crop"
      ]

  return (

    <div className="min-h-screen bg-slate-50 flex flex-col">

      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* TITLE */}

        <div className="mb-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">

                {hostel.propertyname}

              </h1>

              <p className="flex items-center gap-2 text-slate-500 mt-2">

                <FaMapMarkerAlt className="text-indigo-500" />

                {hostel.area}, {hostel.city}

              </p>

            </div>

            <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl flex items-center gap-2 font-bold">

              <FaStar />

              4.5

            </div>

          </div>

        </div>

        {/* IMAGE SECTION */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          {/* MAIN IMAGE */}

          <div className="md:col-span-3 h-[450px] rounded-3xl overflow-hidden shadow-lg">

            <img
              src={images[activeImage]}
              alt="Hostel"
              className="w-full h-full object-cover"
            />

          </div>

          {/* SIDE IMAGES */}

          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">

            {
              images.map((img, index) => (

                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-28 md:h-full rounded-2xl overflow-hidden cursor-pointer border-4 ${activeImage === index
                    ? "border-indigo-600"
                    : "border-transparent"
                    }`}
                >

                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                </div>

              ))
            }

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT */}

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

              <h2 className="text-2xl font-bold mb-4">

                About Hostel

              </h2>

              <p className="text-slate-600 leading-relaxed">

                {hostel.description}

              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

              <h2 className="text-lg font-bold text-slate-800 mb-2">
                Availability
              </h2>

              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">

                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                <p className="text-green-700 font-semibold">
                  {hostel.availability}
                </p>

              </div>

            </div>

            {/* FACILITIES */}

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

              <h2 className="text-2xl font-bold mb-6">

                Facilities

              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {
                  hostel.facilities?.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 bg-slate-50 border rounded-2xl p-4"
                    >

                      <div className="text-indigo-600 text-xl">

                        {item === "WiFi" && <FaWifi />}
                        {item === "Food" && <FaCoffee />}
                        {item === "Laundry" && <MdLocalLaundryService />}
                        {item === "Attached Bathroom" && <LiaToiletSolid />}
                        {item === "CCTV" && <GiCctvCamera />}
                        {item === "AC" && <LiaCentos />}

                      </div>

                      <p className="font-medium text-slate-700">

                        {item}

                      </p>

                    </div>

                  ))
                }

              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

              <h2 className="text-lg font-bold mb-3">
                Hostel Rules
              </h2>

              <ul className="space-y-2">

                {hostel.rules?.map((rule, index) => (

                  <li
                    key={index}
                    className="flex items-center gap-2 text-slate-700"
                  >

                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>

                    {rule}

                  </li>

                ))}

              </ul>

            </div>
          </div>

          {/* RIGHT SIDE */}

          <div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border sticky top-24">

              <div className="pb-6 border-b mb-6">

                <h2 className="text-4xl font-bold text-indigo-600">

                  ₹{hostel.price}

                </h2>

                <p className="text-slate-500 mt-1">

                  Per Month

                </p>

              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all"
              >

                Request Booking

              </button>

            </div>

          </div>

        </div>

      </main>

      <Footer />

      {/* BOOKING MODAL */}

      {
        showModal && (

          <HostelBooking
            hostel={hostel}
            closeModal={() => setShowModal(false)}
          />

        )
      }

    </div>

  )

}

export default HostelDetails

