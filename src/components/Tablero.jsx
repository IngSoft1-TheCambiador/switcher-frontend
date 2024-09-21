import React from "react";
import Ficha from "./Ficha";

const Tablero = ({ datos }) => {
  return (
    <div className="grid aspect-square h-[60vh] w-[60vh] grid-cols-6 grid-rows-6 gap-1 bg-slate-100">
      {datos.map(({ id, x, y, color }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} />
      ))}
    </div>
  );
};

export default Tablero;
