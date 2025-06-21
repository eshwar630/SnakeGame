import './App.css'
import { useState, useEffect } from 'react'
function App() {
  const [food, setfood] = useState(-2);
  const [gameover, setgameover] = useState(false)
  const [score, setscore] = useState(0)
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));
  const [direction, setdirection] = useState("");
  const [head, sethead] = useState(-1)
  const [arr, setarr] = useState([head])
  const startGame = () => {
    sethead(210)
    setarr([210])
    setdirection("r")
    setgameover(false)
    displayFood()
  }
  const displayFood = () => {
    let newFood;
    do {
      newFood = Math.floor(Math.random() * 400);
    } while (arr.some(x=>x===newFood));
    setfood(newFood);
  }

  const gamefinished = () => {
    if (gameover) return;
    setgameover(true)
    sethead(-1)
    setarr([-1])
    setscore(0)
    setdirection("")
    setfood(-2)
    alert("The game is over");
  }
  const moveRight = () => {
    if (gameover) {
      return;
    }
    let c = head % 20;
    if (c < 19) {
      let len = arr.length - 1;
      if (head === food) {
        len++;
      }
      let newArr = []
      newArr.push(head + 1);
      for (let i = 0; i < len; i++) {
        if(arr[i]==newArr[0]){
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
      sethead(head + 1)
    } else {
      gamefinished()
    }
  }
  const moveLeft = () => {
    if (gameover) {
      return;
    }
    let c = head % 20;
    if (c > 0) {
      let len = arr.length - 1;
      if (head === food) {
        len++;
      }
      let newArr = []
      newArr.push(head - 1);
      for (let i = 0; i < len; i++) {
        if(arr[i]==newArr[0]){
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
      sethead(head - 1)
    } else {
      gamefinished()
    }
  }
  const moveDown = () => {
    if (gameover) {
      return;
    }
    let r = Math.floor(head / 20);
    if (r < 19) {
      let len = arr.length - 1;
      if (head === food) {
        len++;
      }
      let newArr = []
      newArr.push(head + 20);
      for (let i = 0; i < len; i++) {
        if(arr[i]==newArr[0]){
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
      sethead(head + 20)
    } else {
      gamefinished()
    }
  }
  const moveUp = () => {
    if (gameover) {
      return;
    }
    let r = Math.floor(head / 20)
    if (r > 0) {
      let len = arr.length - 1;
      if (head === food) {
        len++;
      }
      let newArr = []
      newArr.push(head - 20);
      for (let i = 0; i < len; i++) {
        if(arr[i]==newArr[0]){
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
      sethead(head - 20)
    } else {
      gamefinished()
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameover) {
        return;
      }
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction !== "d") {
            setdirection("u")
          }
          break;
        case "ArrowDown":
        case "s":
          if (direction !== "u") {
            setdirection("d")
          }
          break;
        case "ArrowLeft":
        case "a":
          if (direction !== "r") {
            setdirection("l")
          }
          break;
        case "ArrowRight":
        case "d":
          if (direction !== "l") {
            setdirection("r")
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [head]);
  useEffect(() => {
    if (gameover || direction === "" ) {
      return;
    }
    const interval = setInterval(() => {
      if (head === food) {
        setscore(score => score + 1)
        displayFood()
      }
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
    }, 200);
    return () => clearInterval(interval)
  }, [direction, arr])

  return (
    <>
      <div className='flex justify-center min-h-screen items-center min-w-screen'>
        <div>
          <button className='text-[30px] m-30 p-5 border-4' onClick={startGame}>Start</button>
        </div>
        <div className='grid-container'>
          {grid.map((cell) => (
            <div
              key={cell.idx}
              className={arr.some(x => x === cell.idx) ? "head" : food === cell.idx ? "red" : "cell"}
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
