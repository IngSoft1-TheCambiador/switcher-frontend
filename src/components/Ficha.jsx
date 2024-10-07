import React from "react";
import "./Ficha.css";

const imagenesFichas = {
  1: "A.svg",
  2: "B.svg",
  3: "C.svg",
  4: "D.svg",
};

function Ficha({ id, x, y }) {
  // Asigno una imagen a la ficha de acuerdo al id
  const imagenIndex = (id % 4) + 1; //Indice entre 1 y 4
  const imagen = imagenesFichas[imagenIndex];

  return (
    <div className="ficha">
      <img src={imagen} alt={`Ficha ${id}`} />
    </div>
  );
}

export default Ficha;
