import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StateContext } from "../context/useContext";

const ProtectedRoutes = () => {
    const { globalUser: user } = useContext(StateContext);
    const userSignedIn = Object.keys(user).length !== 0 ? true : false;
    if (userSignedIn) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" />
    }
};
export default ProtectedRoutes;