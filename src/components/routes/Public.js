import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export const Public = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("PUBLIC", user);
  return user.logged ? <Navigate to={"/products"} /> : children;
};
