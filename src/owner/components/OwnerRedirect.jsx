import React from 'react'
import { Navigate } from 'react-router-dom'

function OwnerRedirect({ children }) {

    const role = sessionStorage.getItem("role")

    // IF OWNER TRYING TO ACCESS USER PAGES
    if (role === "owner") {
        return <Navigate to="/owner-dashboard" />
    }

    return children
}

export default OwnerRedirect