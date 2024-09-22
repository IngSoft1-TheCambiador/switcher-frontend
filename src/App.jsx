import React, { useState } from 'react'
import './App.css'
import Inicio from './pages/Inicio';
import ListaPartidas from './pages/ListaPartidas';
import Sala from './pages/Sala';
import { Route } from "wouter";

function App () {
  const [name, setName, gameName, setGameName] = useState('');

  return (
    <div className="app-container">
      <Route path="/">
        <Inicio setName={setName} />
      </Route>
      <Route path="/ListaPartidas">
        <ListaPartidas name={name} setGameName={setGameName} />
      </Route>
      <Route path="/Sala">
        <Sala />
      </Route>
    </div>
  );
}

export default App;
