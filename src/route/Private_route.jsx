import { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute({childer}){
let {user}=useContext(Authcontext)
console.log("private routes", user)
return user ? <Outlet/> : <Navigate to="/login"/>

}