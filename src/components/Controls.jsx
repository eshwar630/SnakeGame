import React from 'react';

const Controls = ({ startGame, gamefinished, gameRef, setlevel }) => (
  <div>
    <div className='flex'>
      {[700, 400, 100].map((lvl, i) => (
        <button
          key={lvl}
          className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500 cursor-pointer'
          disabled={!gameRef.current}
          onClick={() => setlevel(lvl)}

        >
          {['Easy', 'Medium', 'Hard'][i]}
        </button>
      ))}
    </div>
    <div className='flex justify-around'>
      <button className='text-[25px] p-5 border-4 bg-orange-500 active:bg-green-800 cursor-pointer' onClick={startGame}>Start</button>
      <button className='text-[25px] p-5 border-4 bg-orange-500 active:bg-green-800 cursor-pointer' onClick={gamefinished}>Stop</button>
    </div>
  </div>
);

export default Controls;