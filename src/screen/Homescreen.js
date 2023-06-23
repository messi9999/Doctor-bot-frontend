import React from "react";
import Header from "../components/Header";
import "./Homescreen.css";
import { useNavigate } from "react-router-dom";

export default function Homescreen() {
  const navigate = useNavigate();
  return (
    <div className="background-image">
      <div>
        <Header />
      </div>
      <button
        type="button"
        onClick={() => {
          navigate("/login");
        }}
        className="btn-home"
      >
        GET STARTED
      </button>
    </div>
  );
}
