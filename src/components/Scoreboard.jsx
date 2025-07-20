import React from 'react';

const Scoreboard = ({ highScore, score }) => (
  <div>
    <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>HighScore: {highScore}</p>
    <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>Current Score: {score}</p>
  </div>
);

export default Scoreboard;