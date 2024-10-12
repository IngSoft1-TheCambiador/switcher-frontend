import React, { useState } from "react";
import "./CartaMovimiento.css";
// import { assert } from "vitest";

const BOARD_SIZE = 6;

function validPos(x, y, original_x, original_y) {
  return !(x < 1 || x > BOARD_SIZE || y < 1 || y > BOARD_SIZE ||
    (x == original_x && y == original_y));
}

function calculateQuadrants(arr, x, y, a, b) {
  arr.push([x + a, y + b]);     // 1st quadrant
  arr.push([x - b, y + a]);     // 2nd quadrant
  arr.push([x - a, y - b]);     // 3rd quadrant
  arr.push([x + b, y - a]);     // 4th quadrant
  return arr;
}

function removeWrongMoves(positions, x, y) {
  var newPositions = [];
  for (let i = 0; i < positions.length; i++) {
    if (validPos(positions[i][0], positions[i][1], x, y))
      newPositions.push(positions[i]);
  };
  return newPositions;
}

export function calculatePositions(mov, x, y) {
  // assert(x.isInteger() && y.isInteger() && x>0 && x<=BOARD_SIZE && y>0 && y<=BOARD_SIZE);
  var positions = [];
  switch (mov) {
    case "mov1":
      calculateQuadrants(positions, x, y, 2, 2);
      break;
    case "mov2":
      calculateQuadrants(positions, x, y, 0, 2);
      break;
    case "mov3":
      calculateQuadrants(positions, x, y, 0, 1);
      break;
    case "mov4":
      calculateQuadrants(positions, x, y, 1, 1);
      break;
    case "mov5":
      calculateQuadrants(positions, x, y, 1, 2);
      break;
    case "mov6":
      calculateQuadrants(positions, x, y, 2, 1);
      break;
    case "mov7":
      positions.push([x, 1]);
      positions.push([x, BOARD_SIZE]);
      positions.push([1, y]);
      positions.push([BOARD_SIZE, y]);
      break;
    default:
      throw new Error("Invalid movement");
  }
  return removeWrongMoves(positions, x, y);
}

const imagenes = {
  mov1: "mov1.svg",
  mov2: "mov2.svg",
  mov3: "mov3.svg",
  mov4: "mov4.svg",
  mov5: "mov5.svg",
  mov6: "mov6.svg",
  mov7: "mov7.svg",
};

function CartaMovimiento({ movimientos, shown }) {
  return (
    <div className="carta-movimiento-container">
      {movimientos.map((movimiento, index) => (
        <div key={index} className="carta-movimiento">
          {shown ? <img src={imagenes[movimiento]} alt={`Movimiento ${movimiento}`} /> : <img src="back-mov.svg" />}
        </div>
      ))}
    </div>
  );
}

export default CartaMovimiento;