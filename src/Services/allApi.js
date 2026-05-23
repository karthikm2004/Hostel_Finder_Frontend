import commonApi from "./commonApi";
import baseUrl from "./baseUrl";


// Signup api request
export const signUpApi = async (data) => {
  return await commonApi(`${baseUrl}/signup`, "POST", data, "")
}

// SignIn api request

export const signInApi = async (data) => {

  return await commonApi(
    `${baseUrl}/signin`, "POST", data, ""
  )

}

// get all user list
export const getAllUsersApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(`${baseUrl}/all-users`, "GET", "", header)
}

// owner signup api
export const ownerSignUpApi = async (data) => {
  return await commonApi(`${baseUrl}/owner/signup`, "POST", data, "")
}

// owner signin api 
export const ownerSignInApi = async (data) => {
  return await commonApi(`${baseUrl}/owner/signin`, "POST", data, "")
}

// Add hostel api
export const addHostelApi = async (data) => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // ✅ fixed
    "Content-Type": "multipart/form-data"
  }

  return await commonApi(`${baseUrl}/add-hostel`, "POST", data, header)
}

// latest 4 hostels
export const getLatestHostelApi = async () => {
  return await commonApi(`${baseUrl}/home-hostels`, 'GET', "", "")
}

// get all hostels
export const getAllHostelsApi = async (search = "") => {

  let url = `${baseUrl}/all-hostels`

  if (search.trim() !== "") {
    url = `${baseUrl}/all-hostels?search=${search}`
  }

  return await commonApi(url, "GET", "", "")
}


export const getRecentHostelsApi = async () => {

  return await commonApi(`${baseUrl}/recent-hostels`, "GET")
}

// Fetch hostel details
export const getHostelApi = async (id) => {
  return await commonApi(`${baseUrl}/get-hostel/${id}`, "GET");
};

// Get owner's own hostels
export const getOwnerHostelsApi = async () => {
  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }
  return await commonApi(`${baseUrl}/owner-hostels`, "GET", "", header)
}

// Update hostelfor on an existing hostel
export const updateHostelApi = async (id, data) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json"
  }

  return await commonApi(`${baseUrl}/update-hostel/${id}`, "PUT", data, header)
}

// ADD FAVORITE
export const addFavoriteApi = async (data) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(`${baseUrl}/add-favorite`, "POST", data, header)
}

// GET FAVORITES
export const getFavoritesApi = async () => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(`${baseUrl}/get-favorites`, "GET", "", header)
}

// Removed from favorites
export const removeFavoriteApi = async (id) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/remove-favorite/${id}`,
    "DELETE",
    {},
    header
  )
}

// ADD BOOKING
export const addBookingApi = async (reqBody) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/add-booking`,
    "POST",
    reqBody,
    header
  )

}


// USER BOOKINGS
export const getUserBookingsApi = async () => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/user-bookings`,
    "GET",
    "",
    header
  )

}


// OWNER BOOKINGS
export const getOwnerBookingsApi = async () => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/owner-bookings`,
    "GET",
    "",
    header
  )
}


// CONFIRM BOOKING
export const confirmBookingApi = async (id) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/confirm-booking/${id}`,
    "PUT",
    {},
    header
  )
}

// UPDATE BOOKING STATUS
export const updateBookingStatusApi = async (id, reqBody) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/update-booking-status/${id}`,
    "PUT",
    reqBody,
    header
  )

}

export const getAllBookingsApi = async () => {

  return await commonApi(
    `${baseUrl}/all-bookings`,
    "GET"
  )

}

export const getRecentBookingsApi = async () => {

  return await commonApi(`${baseUrl}/recent-bookings`, "GET")
}

export const getPendingHostelsApi = async () => {

  const token = sessionStorage.getItem("token")

  return await commonApi(
    `${baseUrl}/pending-hostels`,
    "GET",
    "",
    {
      Authorization: `Bearer ${token}`
    }
  )
}

// DELETE HOSTEL

export const deleteHostelApi = async (id) => {

  const header = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }

  return await commonApi(
    `${baseUrl}/delete-hostel/${id}`,
    "DELETE",
    {},
    header
  )

}


export const approveHostelApi = async (id) => {

  const token = sessionStorage.getItem("token")

  return await commonApi(
    `${baseUrl}/approve-hostel/${id}`,
    "PUT",
    {},
    {
      Authorization: `Bearer ${token}`
    }
  )
}

export const rejectHostelApi = async (id) => {

  const token = sessionStorage.getItem("token")

  return await commonApi(
    `${baseUrl}/reject-hostel/${id}`,
    "DELETE",
    {},
    {
      Authorization: `Bearer ${token}`
    }
  )
}
