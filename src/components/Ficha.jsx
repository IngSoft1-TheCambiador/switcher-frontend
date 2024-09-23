import React from "react";
import "./Ficha.css";

function Ficha({ id, x, y, color }) {
  return <div className={`ficha ${color}`}></div>;
}
export default Ficha;
