import React, { useState } from 'react';
import { useLocation } from 'wouter';

function Inicio() {
  const [name, setName] = useState('');
  const [, navigate] = useLocation();

  const handleSubmit = (e) => {

    // Chech Regex before chaning the page
    if (/^[a-zA-Z0-9]{1,10}$/.test(name)) {
      navigate('/ListaPartidas');

    // Invalid name: display a help message
    } else {
      e.preventDefault();
      document.getElementById("invalid-name").style.display = 'block';
    }
  };

  return (
    <div className="container">
      <h1>EL SWITCHER</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='name'
          value={name}
          onChange={e => setName(e.target.value)}/>
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
