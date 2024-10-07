import React from "react";
import "./CartaMovimiento.css";

const imagenes = {
  1: "mov1.svg",
  2: "mov2.svg",
  3: "mov3.svg",
  4: "mov4.svg",
  5: "mov5.svg",
  6: "mov6.svg",
  7: "mov7.svg",
};

function CartaMovimiento({ movimientos }) {
  return (
    <div className="carta-movimiento-container">
      {movimientos.map((movimiento, index) => (
        <div key={index} className="carta-movimiento">
          <img
            src={imagenes[movimiento.id]}
            alt={`Movimiento ${movimiento.id}`}
          />
        </div>
      ))}
    </div>
  );
}

export default CartaMovimiento;
