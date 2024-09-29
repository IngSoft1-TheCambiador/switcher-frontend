import React, { useState, useContext } from 'react';
import './App.css';
import './index.css';
import Inicio from './components/Inicio';
import ListaPartidas from './components/ListaPartidas';
import { Route } from "wouter";
import { AppProvider } from './contexts/Context';

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Route path="/">
          <Inicio />
        </Route>
        <Route path="/ListaPartidas">
          <ListaPartidas />
        </Route>
      </div>
    </AppProvider>
  );
}

export default App;
