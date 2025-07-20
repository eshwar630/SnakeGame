import React from 'react';
import '../styles/Game.css';

const GameBoard = ({ grid, arr, food }) => (
  <div className="grid-container">
    {grid.map((cell) => {
    let className = "grid-cell";

    if (cell.idx === food) className += " food";
    else if (arr[0] === cell.idx) className += " snake-head";
    else if (arr.includes(cell.idx)) className += " snake";
    else className += " empty";

    return <div className={className} key={cell.idx}></div>;
  })}
   
  </div>
);


export default GameBoard;