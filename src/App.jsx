import './App.css'
import { useState, useEffect , useRef } from 'react'
function App() {
  const gameRef = useRef(true)
  const [food, setfood] = useState(-2);
  const [gameover, setgameover] = useState(true)
  const [score, setscore] = useState(0)
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));
  const [direction, setdirection] = useState("");
  const [arr, setarr] = useState([-1])
  const [level, setlevel] = useState(400);
  const [highScore, sethighScore] = useState(0)
  const startGame = () => {
    setarr([210])
    setdirection("r")
    setgameover(false)
    gameRef.current=false;
    displayFood()
  }
  useEffect(() => {
    try {
      const hscore = localStorage.getItem('highScore');
      if (hscore !== null && hscore !== "null") {
        sethighScore(JSON.parse(hscore));
      } else {
        sethighScore(0)
      }
      console.log(JSON.parse(hscore))
      console.log(typeof (JSON.parse(hscore)))
    } catch (err) {
      sethighScore(0);
    }
  }, [])
  // useEffect(() => {
  //   gameRef.current=gameover;
  // }, [gameover])
  
  const displayFood = () => {
    if (arr.length === 400) {
      gamefinished();
      return;
    }
    let newFood;
    do {
      newFood = Math.floor(Math.random() * 400);
    } while (arr.some(x => x === newFood));
    setfood(newFood);
  }

  const gamefinished = () => {
    if (gameRef.current) return;
    gameRef.current=true;
    const finalScore=arr[0]===food?score+1:score;
    if (score > highScore) {
      sethighScore(finalScore);
      localStorage.setItem('highScore', JSON.stringify(finalScore));
    }
    setgameover(true)
    setarr([-1])
    setscore(0)
    setdirection("")
    setfood(-2)
    alert("The game is over with a score of " + finalScore);
  }
  const moveRight = () => {
    if (gameRef.current) {
      return;
    }
    let c = arr[0] % 20;
    if (c < 19) {
      let len = arr.length - 1;
      if (arr[0] === food) {
        len++;
      }
      let newArr = []
      newArr.push(arr[0] + 1);
      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] == newArr[0]) {
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
    } else {
      gamefinished()
    }
  }
  const moveLeft = () => {
    if (gameRef.current) {
      return;
    }
    let c = arr[0] % 20;
    if (c > 0) {
      let len = arr.length - 1;
      if (arr[0] === food) {
        len++;
      }
      let newArr = []
      newArr.push(arr[0] - 1);
      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] == newArr[0]) {
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
    } else {
      gamefinished()
    }
  }
  const moveDown = () => {
    if (gameRef.current) {
      return;
    }
    let r = Math.floor(arr[0] / 20);
    if (r < 19) {
      let len = arr.length - 1;
      if (arr[0] === food) {
        len++;
      }
      let newArr = []
      newArr.push(arr[0] + 20);
      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] == newArr[0]) {
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
    } else {
      gamefinished()
    }
  }
  const moveUp = () => {
    if (gameRef.current) {
      return;
    }
    let r = Math.floor(arr[0] / 20)
    if (r > 0) {
      let len = arr.length - 1;
      if (arr[0] === food) {
        len++;
      }
      let newArr = []
      newArr.push(arr[0] - 20);
      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] == newArr[0]) {
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
    } else {
      gamefinished()
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameRef.current) {
        return;
      }
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction !== "d" && direction !== "u") {
            setdirection("u")
          }
          break;
        case "ArrowDown":
        case "s":
          if (direction !== "u" && direction !== "d") {
            setdirection("d")
          }
          break;
        case "ArrowLeft":
        case "a":
          if (direction !== "r" && direction !== "l") {
            setdirection("l")
          }
          break;
        case "ArrowRight":
        case "d":
          if (direction !== "l" && direction !== "r") {
            setdirection("r")
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameRef.current,direction]);
  useEffect(() => {
    if (gameRef.current || direction === "") {
      return;
    }
    const interval = setInterval(() => {
      if (arr[0] === food) {
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
    }, level);
    return () => clearInterval(interval)
  }, [direction, arr[0] , gameRef.current, food, score])

  return (
    <>
      <div className='bg-emerald-300 min-h-screen'>
        <div>
          <p className='flex justify-center text-6xl'>Snake Xensia</p>
        </div>
        <div className='flex justify-center items-center min-w-screen bg-emerald-300'>
          <div>
            <div>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(600) }}>Easy</button>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(400) }}>Medium</button>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(200) }}>Hard</button>
            </div>
            <button className='text-[25px] m-25 p-5 border-4 bg-orange-500 active:bg-green-800' onClick={startGame}>Start</button>
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
            <div>
              <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>HighScore: {highScore}</p>
            </div>
            <div>
              <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>Score: {score}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
