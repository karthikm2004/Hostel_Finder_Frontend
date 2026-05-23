import React from 'react'
import { Navigate } from 'react-router-dom'

function AuthProtect({ children }) {

    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")

    if (token && role === "owner") {
        return <Navigate to="/owner-dashboard" />
    }

    if (token) {
        return <Navigate to="/" />
    }

    return children
}

export default AuthProtect