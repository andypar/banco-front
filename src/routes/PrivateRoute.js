
import localStorage from "../services/localStorage";
import React from "react";
import { Navigate, Outlet} from "react-router-dom";

const isAuthenticated = () => {
  // Check if the user is authenticated
  // Return true if authenticated, false otherwise
  const logged = localStorage.get();
  console.log(logged)

  if (!logged) {
    return false;
  }
  return true;
};


const PrivateRoute = () => {
  const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
