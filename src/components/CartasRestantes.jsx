import React from "react";
import "./CartasRestantes.css";

export function CartasRestantes({ cantidad }) {
    return (
      <div className="cartas-restantes">
        <img src="back.svg" alt="back" className="back-image" />
        <div className="cantidad">{cantidad}</div>
      </div>
    );
  }
