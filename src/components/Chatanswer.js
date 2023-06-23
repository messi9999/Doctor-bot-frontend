import React from "react";
import { ReactComponent as Polygon } from "../assets/logos/Polygon.svg";
import { ReactComponent as Ellipse } from "../assets/logos/Ellipse.svg";

export default function Chatanswer(props) {
  return (
    <>
      <div
        className="d-flex flex-row"
        style={{
          marginLeft: "80px",
          marginBottom: "46px",
          marginRight: "200px"
        }}
      >
        <div>
          <Ellipse />
        </div>
        <div className="d-flex flex-row ms-3">
          <div className="pt-1">
            <Polygon />
          </div>
          <div
            className="border-0 rounded-3"
            style={{
              padding: "20px",
              backgroundColor: "#ECECEC",
              marginLeft: "-5px"
            }}
          >
            <label className="fs-4">{props.content}</label>
          </div>
        </div>
      </div>
    </>
  );
}
