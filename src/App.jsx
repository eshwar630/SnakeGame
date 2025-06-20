import './App.css'
import { useState ,useEffect } from 'react'
function App() {
  // const grid = Array.from({ length: 400 });
  const [keyPressed, setKeyPressed] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeyPressed(e.key); // e.key = "ArrowUp", "a", "Enter", etc.
      console.log('Pressed:', e.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    // cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>
      {/* <div className='flex justify-center min-h-screen items-center'>
        <div className='grid-container'>
          {grid.map((_, idx) => {
            return <div key={idx} className='fell'></div>
          })}
        </div>
      </div> */}
      <div className="h-screen flex items-center justify-center text-2xl">
        Press any key: <span className="ml-2 font-bold">{keyPressed}</span>
      </div>
    </>
  )
}

export default App
