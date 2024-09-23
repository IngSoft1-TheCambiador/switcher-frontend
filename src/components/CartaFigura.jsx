import React from "react";
import "./CartaFigura.css";

function CartaFigura({ figuras }) {
  return (
    <div className="carta-figura-container">
      {figuras.map((figura, index) => (
        <div key={index} className="carta-figura">
          <img src={figura.imagen} alt={`Figura ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default CartaFigura;
