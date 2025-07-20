import { useEffect, useRef, useState } from 'react';
import { playBonusSound, playStartSound, playStopSound } from '../utils/sounds';

const useSnakeGame = () => {
  const gameRef = useRef(true);
  const [food, setfood] = useState(-2);
  const [score, setscore] = useState(0);
  const [arr, setarr] = useState([-1]);
  const [direction, setdirection] = useState('');
  const [level, setlevel] = useState(400);
  const [highScore, sethighScore] = useState(0);
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));

  useEffect(() => {
    const hscore = JSON.parse(localStorage.getItem('highScore') || '0');
    sethighScore(hscore);
  },[]);

  const displayFood = () => {
    if (arr.length === 400) {
      gamefinished();
      return;
    }
    let newFood;
    do {
      newFood = Math.floor(Math.random() * 400);
    } while (arr.includes(newFood));
    setfood(newFood);
  };

  const gamefinished = () => {
    if (gameRef.current) return;
    playStopSound();
    gameRef.current = true;
    const finalScore = arr[0] === food ? score + 1 : score;
    if (score > highScore) {
      sethighScore(finalScore);
      localStorage.setItem('highScore', JSON.stringify(finalScore));
    }
    setarr([-1]);
    setscore(0);
    setdirection('');
    setfood(-2);
    setlevel(400);
    alert(`Game over! Score: ${finalScore}`);
  };

  const moveSnake = (i, j) => {
    if (gameRef.current) return;
    let r = Math.floor(arr[0] / 20);
    let c = arr[0] % 20;
    let newRow = r + i;
    let newCol = c + j;
    if (newRow < 0 || newRow > 19 || newCol < 0 || newCol > 19) return gamefinished();
    let len = arr.length - 1;
    if (arr[0] === food) len++;
    let newArr = [newRow * 20 + newCol];
    for (let k = 0; k < len; k++) {
      if (k > 0 && arr[k] === newArr[0]) return gamefinished();
      newArr.push(arr[k]);
    }
    setarr(newArr);
  };

  const startGame = () => {
    playStartSound();
    setarr([210]);
    setdirection('r');
    gameRef.current = false;
    displayFood();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameRef.current) return;
      switch (e.key) {
        case 'ArrowUp': case 'w': if (direction !== 'd') setdirection('u'); break;
        case 'ArrowDown': case 's': if (direction !== 'u') setdirection('d'); break;
        case 'ArrowLeft': case 'a': if (direction !== 'r') setdirection('l'); break;
        case 'ArrowRight': case 'd': if (direction !== 'l') setdirection('r'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameRef.current || !direction) return;
    const interval = setInterval(() => {
      if (arr[0] === food) {
        playBonusSound();
        setscore(score => score + 1);
        setlevel(Math.floor((level * 95) / 100));
        displayFood();
      }
      switch (direction) {
        case 'u': moveSnake(-1, 0); break;
        case 'd': moveSnake(1, 0); break;
        case 'l': moveSnake(0, -1); break;
        case 'r': moveSnake(0, 1); break;
      }
    }, level);
    return () => clearInterval(interval);
  }, [direction, arr[0], food, score]);

  return {
    gameRef,
    food,
    score,
    arr,
    direction,
    grid,
    highScore,
    level,
    setlevel,
    startGame,
    gamefinished,
  };
};

export default useSnakeGame;