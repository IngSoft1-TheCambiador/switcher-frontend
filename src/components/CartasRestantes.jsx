import React from "react";
import "./CartasRestantes.css";

export default function CartasRestantes({ cantidad }) {
  return (
    <div className="carta-figura">
      <div className="image-withText">
        <img src="back.svg" alt="back" />
        <div className="text-overlay">{cantidad}</div>
      </div>
    </div>
  );
}
