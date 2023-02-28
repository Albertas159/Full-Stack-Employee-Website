import { Outlet, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
  let auth = {'token':true}
  return(
      auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
