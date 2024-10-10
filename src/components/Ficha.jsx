import React from "react";
import "./Ficha.css";

const imagenesFichas = {
  "r": "A.svg",
  "y": "B.svg",
  "g": "C.svg",
  "b": "D.svg",
};

function Ficha({ id, x, y, color}) {
  const imagen = imagenesFichas[color];

  return (
    <div className="ficha">
      <img src={imagen} alt={`Ficha ${id}`} />
    </div>
  );
}

export default Ficha;

