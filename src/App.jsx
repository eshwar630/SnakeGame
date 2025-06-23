import './App.css'
import { useState, useEffect, useRef } from 'react'
function App() {
  const gameRef = useRef(true)
  const [food, setfood] = useState(-2);
  const [score, setscore] = useState(0)
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));
  const [direction, setdirection] = useState("");
  const [arr, setarr] = useState([-1])
  const [level, setlevel] = useState(400);
  const [highScore, sethighScore] = useState(0)
  const startGame = () => {
    playStartSound();
    setarr([210])
    setdirection("r")
    gameRef.current = false;
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
    startsound.current.load();
    bonussound.current.load();
    stopsound.current.load();
  }, [])
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
    playStopSound();
    gameRef.current = true;
    const finalScore = arr[0] === food ? score + 1 : score;
    if (score > highScore) {
      sethighScore(finalScore);
      localStorage.setItem('highScore', JSON.stringify(finalScore));
    }
    setarr([-1])
    setscore(0)
    setdirection("")
    setfood(-2)
    alert("The game is over with a score of " + finalScore);
    setlevel(400)
  }
  const moveSnake = (i, j) => {
    if (gameRef.current) {
      return;
    }
    let r = Math.floor(arr[0] / 20);
    let c = arr[0] % 20;
    let newRow = r + i;
    let newCol = c + j;
    if (newRow < 0 || newRow > 19 || newCol < 0 || newCol > 19) {
      gamefinished()
    } else {
      let len = arr.length - 1;
      if (arr[0] === food) {
        len++;
      }
      let newArr = []
      newArr.push(newRow * 20 + newCol);
      for (let i = 0; i < len; i++) {
        if (i > 0 && arr[i] == newArr[0]) {
          gamefinished()
          return;
        }
        newArr.push(arr[i]);
      }
      setarr(newArr)
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
  }, [direction]);
  useEffect(() => {
    if (gameRef.current || direction === "") {
      return;
    }
    const interval = setInterval(() => {
      if (arr[0] === food) {
        playBonusSound();
        setscore(score => score + 1)
        if(score%5==0){
          setlevel(Math.floor((level*95)/100))
        }
        displayFood();
      }
      switch (direction) {
        case "u":
          moveSnake(-1, 0);
          break;
        case "d":
          moveSnake(1, 0);
          break;
        case "l":
          moveSnake(0, -1);
          break;
        case "r":
          moveSnake(0, 1);
          break;
      }
    }, level);
    return () => clearInterval(interval)
  }, [direction, arr[0], food, score])
  const startsound = useRef(new Audio("/SnakeGame/startGame.mp3"));
  const bonussound = useRef(new Audio("/SnakeGame/bonus.mp3"));
  const stopsound = useRef(new Audio("/SnakeGame/stopGame.mp3"));
  const playStartSound = () => {
    startsound.current.currentTime = 0;
    startsound.current.play();
  };
  const playBonusSound = () => {
    bonussound.current.currentTime = 0;
    bonussound.current.play();
  };
  const playStopSound = () => {
    stopsound.current.currentTime = 0;
    stopsound.current.play();
  };
  return (
    <>
      <div className='bg-emerald-300 min-h-screen'>
        <div>
          <p className='flex justify-center text-6xl'>Snake Xensia</p>
        </div>
        <div className='flex justify-center flex-col lg:flex-row items-center min-w-screen bg-emerald-300'>
          <div>
            <div className='flex'>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(700) }}>Easy</button>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(400) }}>Medium</button>
              <button className='mode text-[15px] m-5 border-4 h-15 w-20 bg-orange-500' disabled={!gameRef.current} onClick={() => { setlevel(100) }}>Hard</button>
            </div>
            <div className='flex justify-around'>
              <div className='flex justify-center'>
                <button className='text-[25px] p-5 border-4 bg-orange-500 active:bg-green-800' onClick={startGame}>Start</button>
              </div>
              <div className='flex justify-center'>
                <button className='text-[25px] p-5 border-4 bg-orange-500 active:bg-green-800' onClick={gamefinished}>Stop</button>
              </div>
            </div>
          </div>
          <div className='grid-container'>
            {grid.map((cell) => {
              if (arr[0] === cell.idx) {
                return (
                  <div className='head flex justify-evenly'>
                    <div className="eyes"></div>
                    <div className="eyes"></div>
                  </div>
                )
              } else {
                return (
                  <div
                    key={cell.idx}
                    className={arr.some(x => x === cell.idx) ? "body" : food === cell.idx ? "red" : "cell"}
                  ></div>
                )
              }
            }
            )}
          </div>
          <div>
            <div>
              <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>HighScore: {highScore}</p>
            </div>
            <div>
              <p className='text-[25px] m-25 p-5 border-4 bg-orange-500'>Current Score: {score}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App