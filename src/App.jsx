import React from 'react'
import './App.css'
import Inicio from './pages/Inicio';
import ListaPartidas from './pages/ListaPartidas';
import { Route } from "wouter";

function App () {
  return (
    <div className="app-container">
      <Route path="/" component={Inicio} />
      <Route path="/ListaPartidas" component={ListaPartidas} />
    </div>
  );
}

export default App;
