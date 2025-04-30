import { Navigate,Outlet,useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { BounceLoader } from "react-spinners"



export default function ProtectedRoute({allowedRoles}) {

  const { role, loader } = useSelector(state => state.auth);
  const location = useLocation();

  if (loader) {
    return <BounceLoader/>; 
  }


  return (
    allowedRoles.includes(role)
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );

  

}
