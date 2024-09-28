import React from "react";
import "./App.css";
import GameLayout from "./components/GameLayout";
import AppProvider from "./contexts/Context";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <GameLayout />
      </div>
    </AppProvider>

  );
}

export default App;
