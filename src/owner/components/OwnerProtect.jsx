import { Navigate } from "react-router-dom";

function OwnerProtect({ children }) {

    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/signin" />;
    }

    if (role !== "owner") {
        return <Navigate to="/" />;
    }

    return children;
}

export default OwnerProtect;