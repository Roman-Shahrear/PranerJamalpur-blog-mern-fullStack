import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminAndUserPrivateRoute() {
    const { currentUser } = useSelector((state)=> state.user);
    if(!currentUser){
        return <Navigate to="sign-in" />;
    }
    return currentUser.isAdmin || !currentUser.isAdmin ? <Outlet /> : <Navigate to="sign-in" />;
}