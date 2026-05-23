import { Navigate } from "react-router-dom";

function UserProtect({ children }) {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/signin" />;
    }

    if (role === "owner" || role === "admin") {
        return <Navigate to="/owner-dashboard" />;
    }

    return children;
}

export default UserProtect;