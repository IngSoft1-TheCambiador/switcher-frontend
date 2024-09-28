import React, {useContext} from "react";
import Ficha from "./Ficha";
import "./Tablero.css";
import { AppContext } from "../contexts/Context";

function Tablero() {
  const {fichas} = useContext(AppContext);
  return (
    <div className="tablero">
      {fichas.map(({ id, x, y, color }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} />
      ))}
    </div>
  );
}

export default Tablero;
