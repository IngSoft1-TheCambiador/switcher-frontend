import React from "react";
import "./CartaMovimiento.css";

function CartaMovimiento({ movimientos }) {
  return (
    <div className="carta-movimiento-container">
      {movimientos.map((movimiento, index) => (
        <div key={index} className="carta-movimiento">
          <img src={movimiento.imagen} alt={`Movimiento ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default CartaMovimiento;
