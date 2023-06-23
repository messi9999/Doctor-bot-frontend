import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Content from "../components/content/Content";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

export default function Maindashborad() {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className="h-100">
      <Header />
      <Content />
    </div>
  );
}
