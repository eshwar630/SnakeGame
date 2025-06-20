import './App.css'
import { useState, useEffect } from 'react'
function App() {
  const [gameover, setgameover] = useState(false)
  const [score, setscore] = useState(0)
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));
  const [direction, setdirection] = useState("r");
  const [head, sethead] = useState(210)
  const gamefinished=()=>{
    setgameover(true)
    sethead(210)
    setscore(0)
    alert("The game is over");
  }
  const moveRight = () => {
    if(gameover){
      return;
    }
    let c = head % 20;
    if (c < 19) {
      sethead(head + 1)
    } else {
      gamefinished()
    }
  }
  const moveLeft = () => {
    if(gameover){
      return;
    }
    let c = head % 20;
    if (c > 0) {
      sethead(head - 1)
    } else {
      gamefinished()
    }
  }
  const moveDown = () => {
    if(gameover){
      return;
    }
    let r = Math.floor(head / 20);
    if (r < 19) {
      sethead(head + 20)
    } else {
      gamefinished()
    }
  }
  const moveUp = () => {
    if(gameover){
      return;
    }
    let r = Math.floor(head / 20)
    if (r > 0) {
      sethead(head - 20)
    } else {
      gamefinished()
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(gameover){
        return;
      }
      console.log(e.key)
      switch (e.key) {
        case "ArrowUp":
        case "w":
          moveUp()
          setdirection("u")
          break;
        case "ArrowDown":
        case "s":
          moveDown()
          setdirection("d")
          break;
        case "ArrowLeft":
        case "a":
          moveLeft()
          setdirection("l")
          break;
        case "ArrowRight":
        case "d":
          moveRight()
          setdirection("r")
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [head]);
  useEffect(() => {
    if(gameover){
      return;
    }
    const interval = setInterval(() => {
      setscore(score=>score+1)
      switch (direction) {
        case "u":
          moveUp()
          break;
        case "d":
          moveDown()
          break;
        case "l":
          moveLeft()
          break;
        case "r":
          moveRight()
          break;
      }
    }, 500);

    return () => clearInterval(interval)
  }, [head, direction])

  return (
    <>
      <div className='flex justify-center min-h-screen items-center min-w-screen'>
        <div className='grid-container'>
          {grid.map((cell) => (
            <div
              key={cell.idx}
              className={head === cell.idx ? "head" : "cell"}
            ></div>
          ))}
        </div>
        <div>
          <p className='text-[30px] m-30 p-5 border-4'>Score:{score}</p>
        </div>
      </div>

    </>
  )
}

export default App
