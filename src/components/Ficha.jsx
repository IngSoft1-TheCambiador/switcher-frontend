import React from "react";

function Ficha({ id, x, y, color }) {
  return <div className={`size-[9vh] ${color} border-2 border-gray-800`}></div>;
}
export default Ficha;
