import React from "react";
import { ReactComponent as UserLogo } from "../assets/logos/UserLogo.svg";
import { ReactComponent as PolygonUser } from "../assets/logos/PolygonUser.svg";

export default function Chatquestion(props) {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-end align-items-end"
        style={{
          marginLeft: "200px",
          marginBottom: "46px",
          marginRight: "80px"
        }}
      >
        <div className="d-flex flex-row ms-3">
          <div
            className="border-0 rounded-3"
            style={{
              padding: "20px",
              backgroundColor: "#1999e3",
              marginRight: "-5px"
            }}
          >
            <label className="fs-4" style={{ color: "white" }}>
              {props.content}
            </label>
          </div>
          <div className="pt-1" style={{ transform: "rotate(180deg)" }}>
            <PolygonUser />
          </div>
        </div>
        <div className=" d-flex justify-content-end align-items-end ms-2">
          <div style={{ width: "50px", height: "50px" }}>
            <UserLogo />
          </div>
        </div>
      </div>
    </>
  );
}
