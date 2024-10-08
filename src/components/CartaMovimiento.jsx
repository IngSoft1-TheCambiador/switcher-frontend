import React from "react";
import "./CartaMovimiento.css";

const BOARD_SIZE = 6;

function validPos (x, y, original_x, original_y) {
  return  ! (x<1 || x>BOARD_SIZE || y<1 || y>BOARD_SIZE || [x,y] == [original_x,original_y] );
}

function rotate(arr, a, b){
  if(validPos(a, b)){   // 1st quadrant
    arr.push([a, b]);
  }
  if(validPos(-b, a)){  // 2nd quadrant
    arr.push([-b, a]);
  }
  if(validPos(-a, -b)){ // 3rd quadrant
    arr.push([-a, -b]);
  }
  if(validPos(b, -a)){  // 4th quadrant
    arr.push([b, -a]);
  }
  return arr;
}

function removeWrongMoves(positions, x, y){
  var newPositions = [];
  for (let i = 0; i < positions.length; i++) {
    if  (validPos(positions[0][0],positions[0][1]))
        newPositions.push(positions[0]);
    };
  return arr;
}

export function calculatePositions(mov, x, y) {
  var positions = [];
  if(1<=mov && mov<=6) {
    switch(expression) {
      case 1:
        rotate(positions, 2, 2);
        break;
      case 2:
        rotate(positions, 0, 2);
        break;
      case 3:
        rotate(positions, 0, 1);
        break;
      case 4:
        rotate(positions, 1, 1);
        break;
      case 5:
        rotate(positions, 1, 2);
        break;
      case 6:
        rotate(positions, 2, 1);
        break;
    }
  }
  else if(mov==7) {
    positions.push([x,1]);
    positions.push([x,BOARD_SIZE]);
    positions.push([1,y]);
    positions.push([BOARD_SIZE,y]);
  }
  return removeWrongMoves(positions);
}

const imagenes = {
  1: "mov1.svg",
  2: "mov2.svg",
  3: "mov3.svg",
  4: "mov4.svg",
  5: "mov5.svg",
  6: "mov6.svg",
  7: "mov7.svg",
};

function CartaMovimiento({ movimientos }) {
  return (
    <div className="carta-movimiento-container">
      {movimientos.map((movimiento, index) => (
        <div key={index} className="carta-movimiento">
          <img
            src={imagenes[movimiento.id]}
            alt={`Movimiento ${movimiento.id}`}
          />
        </div>
      ))}
    </div>
  );
}

export default CartaMovimiento;
