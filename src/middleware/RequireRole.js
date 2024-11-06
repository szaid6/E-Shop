import { useLocation, Navigate, Outlet, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";


const RequireRole = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        auth.isAdmin
            ? <Outlet />
            : <Navigate to={"/login"} state={{ from: location }} replace />

    )
}

export default RequireRole;