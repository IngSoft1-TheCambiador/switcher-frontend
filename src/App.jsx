import React, { useState } from 'react'
import './App.css'
import Inicio from './pages/Inicio';
import ListaPartidas from './pages/ListaPartidas';
import { Route } from "wouter";

function App () {
  const [name, setName] = useState('');

  return (
    <div className="app-container">
      <Route path="/">
        <Inicio setName={setName} />
      </Route>
      <Route path="/ListaPartidas">
        <ListaPartidas name={name} />
      </Route>
    </div>
  );
}

export default App;
