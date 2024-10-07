import React from "react";
import "./CartaFigura.css";

const imagenesFiguras = {
  1: "fig01.svg",
  2: "fig02.svg",
  3: "fig03.svg",
  4: "fig04.svg",
  5: "fig05.svg",
  6: "fig06.svg",
  7: "fig07.svg",
  8: "fig08.svg",
  9: "fig09.svg",
  10: "fig10.svg",
  11: "fig11.svg",
  12: "fig12.svg",
  13: "fig13.svg",
  14: "fig14.svg",
  15: "fig15.svg",
  16: "fig16.svg",
  17: "fig17.svg",
  18: "fig18.svg",
  19: "fige01.svg",
  20: "fige02.svg",
  21: "fige03.svg",
  22: "fige04.svg",
  23: "fige05.svg",
  24: "fige06.svg",
  25: "fige07.svg",
};

function CartaFigura({ figuras }) {
  return (
    <div className="carta-figura-container">
      {figuras.map((figura, index) => (
        <div key={index} className="carta-figura">
          <img src={imagenesFiguras[figura.id]} alt={`Figura ${figura.id}`} />
        </div>
      ))}
    </div>
  );
}

export default CartaFigura;
