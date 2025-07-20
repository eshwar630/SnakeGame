import './App.css';
import GameBoard from './components/GameBoard'
import Controls from './components/Controls';
import Scoreboard from './components/Scoreboard';
import useSnakeGame from './hooks/useSnakeGame';

function App() {
  const game = useSnakeGame();

  return (
    <div className='bg-emerald-300 min-h-screen'>
      <p className='flex justify-center text-6xl'>Snake Xensia</p>
      <div className='flex justify-center flex-col lg:flex-row items-center min-w-screen bg-emerald-300'>
        <Controls {...game} />
        <GameBoard {...game} />
        <Scoreboard {...game} />
      </div>
    </div>
  );
}
export default App;