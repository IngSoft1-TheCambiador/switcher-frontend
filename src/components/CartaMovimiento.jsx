import React from "react";
import "./CartaMovimiento.css";

const BOARD_SIZE = 6;

function validPos (x, y, original_x, original_y) {
  return  ! (x<1 || x>BOARD_SIZE || y<1 || y>BOARD_SIZE || [x,y] == [original_x,original_y] );
}

function rotate(arr, x, y){
  const diff_x = x - arr[0][0];
  const diff_y = y - arr[0][1];
  if(validPos(-diff_y, diff_x)){  // 2nd quadrant
    arr.push([-diff_y, diff_x]);
  }
  if(validPos(-diff_x, -diff_y)){  // 3rd quadrant
    arr.push([-diff_x, -diff_y]);
  }
  if(validPos(diff_y, -diff_x)){  // 4th quadrant
    arr.push([diff_y, -diff_x]);
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

export function calculatePositions({ mov, x, y }) {
  var positions = [];
  if(1<=mov && mov<=6) {
    switch(expression) {
      case 1:
        positions.push([x+2, y+2]);
        break;
      case 2:
        positions.push([x, y+2]);
        break;
      case 3:
        positions.push([x, y+1]);
        break;
      case 4:
        positions.push([x+1, y+1]);
        break;
      case 5:
        positions.push([x+1, y+2]);
        break;
      case 6:
        positions.push([x+2, y+1]);
        break;
      default:
        // default
    }
    return rotate(positions, x, y);
  }
  else if(mov==7) {
    positions.push([x,1]);
    positions.push([x,BOARD_SIZE]);
    positions.push([1,y]);
    positions.push([BOARD_SIZE,y]);
  }
  // else {
  //   // error
  // }
  removeWrongMoves(positions);
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
