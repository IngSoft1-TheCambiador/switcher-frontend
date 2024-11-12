import React from "react";
import "./Ficha.css";
import sync from "css-animation-sync";

sync('resplandorAnimation');

const imagenesFichas = {
  "r": "A.svg",
  "y": "B.svg",
  "g": "C.svg",
  "b": "D.svg",
};

function Ficha({ id, x, y, color, setSelectedCell, cellOpacity, isHighlighted, forbiddenColor }) {
  const imagen = imagenesFichas[color];
  const isForbidden = color === forbiddenColor;
  const classAttr = (isHighlighted === '1' && !isForbidden)? "intermitente" : "";
  return (
    <div className="ficha" onClick={() => setSelectedCell(x, y)}
    data-testid="ficha" >
      <img 
        src={imagen}  alt={`Ficha ${id}`} className={classAttr} 
        style = {{
          filter: `${cellOpacity ? 'drop-shadow(0px 0px 20px black)' : ''} ${isForbidden ? 'grayscale(100%)' : ''}`
        }} 
      />
    </div>
  );
}

export default Ficha;


