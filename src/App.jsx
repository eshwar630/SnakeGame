import './App.css'
import { useState, useEffect } from 'react'
function App() {
  const grid = Array.from({ length: 400 }, (_, i) => ({ idx: i }));
  const [head, sethead] = useState(0)
  const moveRight = () => {
    let c = head % 20;
    if (c < 19) {
      sethead(head + 1)
    }
  }
  const moveLeft = () => {
    let c = head % 20;
    if (c > 0) {
      sethead(head - +1)
    }
  }
  const moveDown = () => {
    let r = Math.floor(head / 20);
    if (r < 19) {
      sethead(head + 20)
    }
  }
  const moveUp = () => {
    let r = Math.floor(head / 20)
    if (r > 0) {
      sethead(head - 20)
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key)
      switch (e.key) {
        case "ArrowUp":
          moveUp()
          break;
        case "ArrowDown":
          moveDown()
          break;
        case "ArrowLeft":
          moveLeft()
          break;
        case "ArrowRight":
          moveRight()
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <> 

      <div className='flex justify-center min-h-screen items-center' key={idx}>
        <div className='grid-container'>
          {
            grid.map((cell)=>{
              return(
                <div key={cell.idx} className={head==cell.idx?"head":"cell"}></div>
              )
            })
          }
        </div>
      </div>
      {/* <div className='flex justify-center min-h-screen items-center'>
        <div className='grid-container'>
          {grid.map((_, idx) => {
            if (idx==0) {
              return <div key={idx} className='head'></div>
            }else{
              return <div key={idx} className='cell'></div>
            }
          })}
        </div>
      </div> */}
      {/* <div className="h-screen flex items-center justify-center text-2xl">
        Press any key: <span className="ml-2 font-bold">{keyPressed}</span>
      </div> */}
    </>
  )
}

export default App
