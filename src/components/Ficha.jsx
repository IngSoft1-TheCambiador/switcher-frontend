import React from "react";
import "./Ficha.css";

const imagenesFichas = {
  "r": "A.svg",
  "y": "B.svg",
  "g": "C.svg",
  "b": "D.svg",
};

function Ficha({ id, x, y, color, setSelectedCell, cellOpacity, isHighlighted}) {
  const imagen = imagenesFichas[color];
  const classAttr = isHighlighted === '1' ? "intermitente" : "";
  return (
    <div className="ficha" onClick={()=>setSelectedCell(x,y)}>
      <img src={imagen} alt={`Ficha ${id}`} className={classAttr} style={{filter: cellOpacity[x][y] ? 'drop-shadow(0px 0px 20px black)' : ''}} />
    </div>
  );
}

export default Ficha;