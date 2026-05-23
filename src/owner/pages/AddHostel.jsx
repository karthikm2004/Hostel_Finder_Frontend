import React, { useState } from 'react';
import { FaUpload, FaMapMarkerAlt, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addHostelApi } from '../../Services/allApi';


function AddHostel() {

  const [hostelDetails, setHostelDetails] = useState({
    propertyname: "",
    description: "",
    city: "",
    area: "",
    address: "",
    price: "",
    hostelfor: "",
    propertytype: "",
    facilities: [],
    uploadImg: [],
    avalaavailability: "",
    rules: ""
  })
  // const [hostel, setHostel] = useState({
  //   price: "",
  //   facilities: []
  // });

  const handleFacilities = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setHostelDetails({
        ...hostelDetails,
        facilities: [...hostelDetails.facilities, value]
      });
    } else {
      setHostelDetails({
        ...hostelDetails,
        facilities: hostelDetails.facilities.filter(f => f !== value)
      });
    }
  };
  const handleAddhostel = async () => {
    console.log(hostelDetails)
    const { propertyname, description, city, area, address, price, hostelfor, availability, rules, facilities } = hostelDetails

    const { uploadImg } = hostelDetails

    if (!propertyname || !description || !city || !area || !address || !price || !availability || !rules || !hostelfor || hostelDetails.facilities.length === 0 || hostelDetails.uploadImg.length === 0) {
      toast.info("Enter Valid Inputs")
    }
    else {
      const formdata = new FormData()
      formdata.append("propertyname", propertyname)
      formdata.append("description", description)
      formdata.append("city", city)
      formdata.append("area", area)
      formdata.append("address", address)
      formdata.append("price", price)
      formdata.append("hostelfor", hostelfor)
      formdata.append("availability", availability)
      formdata.append("rules", rules)
      formdata.append("facilities", hostelDetails.facilities.join(","))
      uploadImg.forEach((file) => {
        formdata.append("uploadImg", file)
      })
      const response = await addHostelApi(formdata)
      if (response.status === 200) {
        toast.success("Hostel added successfully!!")
        setHostelDetails({ propertyname: "", description: "", city: "", area: "", address: "", price: "", availability: "", rules: "", facilities: [], uploadImg: [] })
      }
      else {
        toast.error("Hostel added failed")
      }
    }

  }


  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add New Property</h1>
          <p className="text-slate-500 text-sm mt-1">List your hostel or PG to reach thousands of students.</p>
        </div>
        <Link to="/owner-profile" className="text-indigo-600 font-medium hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg">
          Cancel
        </Link>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Main Form Area */}
        <div className="flex-grow space-y-6">

          {/* Section 1: Basic Details */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <FaInfoCircle className="text-indigo-500 text-xl" />
              <h2 className="text-lg font-bold text-slate-800">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Property Name *</label>
                <input type="text" placeholder="e.g. Sunshine Premium Men's Hostel" value={hostelDetails.propertyname} onChange={(e) => { setHostelDetails({ ...hostelDetails, propertyname: e.target.value }) }} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Property Type *</label>
                  <select
                    value={hostelDetails.propertytype}
                    onChange={(e) =>
                      setHostelDetails({ ...hostelDetails, propertytype: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option>Hostel</option>
                    <option>PG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Hostel For *</label>
                  <select
                    value={hostelDetails.hostelfor}
                    onChange={(e) =>
                      setHostelDetails({ ...hostelDetails, hostelfor: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option>Boys</option>
                    <option>Girls</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea rows="4" placeholder="Describe your property, rules, and vibe..." value={hostelDetails.description} onChange={(e) => { setHostelDetails({ ...hostelDetails, description: e.target.value }) }} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100">

            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <FaCheckCircle className="text-green-500 text-xl" />
              <h2 className="text-lg font-bold text-slate-800">Pricing & Amenities</h2>
            </div>

            <div className="space-y-6">

              {/*  Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Price (per month) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
                  value={hostelDetails.price}
                  onChange={(e) => setHostelDetails({ ...hostelDetails, price: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Availability *
                </label>

                <input
                  type="text"
                  placeholder="e.g. 5 Room Available"

                  value={hostelDetails.availability}

                  onChange={(e) =>
                    setHostelDetails({
                      ...hostelDetails,
                      availability: e.target.value
                    })
                  }

                  className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50"
                />
              </div>

              {/* Rules */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Hostel Rules *
                </label>

                <textarea

                  rows="5"

                  placeholder={`Enter one rule per line

Example:
No Smoking
No Alcohol
Visitors not allowed`}

                  value={hostelDetails.rules}

                  onChange={(e) =>
                    setHostelDetails({
                      ...hostelDetails,
                      rules: e.target.value
                    })
                  }

                  className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none resize-none"
                />

              </div>

              {/*  Amenities */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Amenities *
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                  {[
                    "WiFi",
                    "Food",
                    "Parking",
                    "Laundry",
                    "AC",
                    "CCTV",
                    "Power Backup",
                    "Attached Bathroom"
                  ].map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                    >
                      <input
                        type="checkbox"
                        value={item}
                        className="accent-indigo-600"
                        onChange={handleFacilities}
                      />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}

                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <FaMapMarkerAlt className="text-amber-500 text-xl" />
              <h2 className="text-lg font-bold text-slate-800">Location Details</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">City *</label>
                  <input type="text" placeholder="e.g. Kochi" value={hostelDetails.city} onChange={(e) => { setHostelDetails({ ...hostelDetails, city: e.target.value }) }} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Area/Locality *</label>
                  <input type="text" placeholder="e.g. Kakkanad" value={hostelDetails.area} onChange={(e) => { setHostelDetails({ ...hostelDetails, area: e.target.value }) }} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Complete Address *</label>
                <textarea rows="2" placeholder="House no, street name, landmark..." value={hostelDetails.address} onChange={(e) => { setHostelDetails({ ...hostelDetails, address: e.target.value }) }} className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <FaUpload className="text-emerald-500 text-xl" />
              <h2 className="text-lg font-bold text-slate-800">Photos & Media</h2>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 sm:p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <FaUpload className="text-indigo-500 text-lg sm:text-xl" />
              </div>

              <h3 className="text-sm font-bold text-slate-700 mb-1">
                Click to upload or drag and drop
              </h3>

              <p className="text-xs text-slate-500 mb-4">
                PNG, JPG (max 3 images)
              </p>

              <label className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files)

                    // limit to 3 images
                    if (files.length > 3) {
                      // alert("You can upload only 3 images")
                      return res.status(400).json("Max 3 images allowed")
                      // return
                    }

                    setHostelDetails({
                      ...hostelDetails,
                      uploadImg: files
                    })
                  }}
                />
              </label>

              {/* Preview images */}
              {hostelDetails.uploadImg.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {hostelDetails.uploadImg.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
              Save as Draft
            </button>
            <button onClick={handleAddhostel} className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
              <FaCheckCircle /> Publish Property
            </button>
          </div>

        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-80 hidden lg:block">
          <div className="bg-slate-900  border-amber-100 p-6 rounded-xl sticky top-24">
            <h3 className="font-bold text-white flex items-center gap-2 mb-3">
              <FaInfoCircle className="text-amber-500" /> Pro Tips
            </h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                <p>Properties with high-quality photos get <strong>3x more bookings</strong>.</p>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                <p>Be specific in your description. Mention curfews, food menus, and rules clearly.</p>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                <p>Ensure your address includes a known landmark.</p>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AddHostel;