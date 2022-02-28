import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const Private = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("PRIVATE", user);
  return user.logged ? children : <Navigate to={"/"} />;
};
