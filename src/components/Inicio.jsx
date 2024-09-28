import React, { useState } from 'react';
import { useLocation } from 'wouter';

function Inicio({ setName }) {
  const [tempName, setTempName] = useState('');
  const [, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Chech Regex before chaning the page
    if (/^[a-zA-Z0-9]{1,10}$/.test(tempName)) {
      setName(tempName);
      navigate('/ListaPartidas');

    // Invalid name: display a help message
    } else  if (tempName!="") {
      document.getElementById("invalid-name").style.display = 'block';
    }
  };

  return (
    <div className="container">
      <h1>EL SWITCHER</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Nombre'
          value={tempName}
          onChange={e => setTempName(e.target.value)}/>
        <div
          className="infoLabel"
          id="invalid-name" >
            Ingrese un nombre alfanumerico de hasta 10 caracteres
        </div>
        <button
          className="button">
            Continuar
        </button>
      </form>
    </div>
  );
}

export default Inicio;
