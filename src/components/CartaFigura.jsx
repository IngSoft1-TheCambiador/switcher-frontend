import React from "react";
import "./CartaFigura.css";

const imagenesFiguras = {
  h1: "fig01.svg",
  h2: "fig02.svg",
  h3: "fig03.svg",
  h4: "fig04.svg",
  h5: "fig05.svg",
  h6: "fig06.svg",
  h7: "fig07.svg",
  h8: "fig08.svg",
  h9: "fig09.svg",
  h10: "fig10.svg",
  h11: "fig11.svg",
  h12: "fig12.svg",
  h13: "fig13.svg",
  h14: "fig14.svg",
  h15: "fig15.svg",
  h16: "fig16.svg",
  h17: "fig17.svg",
  h18: "fig18.svg",
  s1: "fige01.svg",
  s2: "fige02.svg",
  s3: "fige03.svg",
  s4: "fige04.svg",
  s5: "fige05.svg",
  s6: "fige06.svg",
  s7: "fige07.svg",
};

export function CartaFiguraAjena({ FCardsType, cantFiguras, selectedFCard, setSelectedFCard }) {
  return (
    <div className="carta-figura-container">
      <CartaFigura FCardsType={FCardsType} selectedFCard={selectedFCard} setSelectedFCard={setSelectedFCard} />
      <div className="carta-figura">
        <div className="image-withText">
          <img src="back.svg" alt="back" />
          <div className="text-overlay">{cantFiguras}</div>
        </div>
      </div>
    </div>
  );
}

export function CartaFigura({ FCardsType, selectedFCard, setSelectedFCard }) {
  return (
    <div className="carta-figura-container">
      {FCardsType.slice(0, 3).map((figura, index) => (
        <div key={index} className="carta-figura" onClick={() => setSelectedFCard(index)}>
          <img src={imagenesFiguras[figura]} alt={`Figura ${figura}`}
            style={{ filter: selectedFCard == index ? 'drop-shadow(0px 0px 20px white)' : '' }} />
        </div>
      ))}
    </div>
  );
}