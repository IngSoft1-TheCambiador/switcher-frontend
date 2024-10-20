import React from "react";
import "./CartasRestantes.css";

export default function CartasRestantes({ cantidad, className}) {
    return (
      <div className={`cartas-restantes ${className}`}>
        <img src="back.svg" alt="back" className="back-image" />
        <div className="cantidad">{cantidad}</div>
      </div>
    );
  }
