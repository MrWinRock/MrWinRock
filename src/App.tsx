import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>MrWinRock</h1>
      </div>
      <div className='flex flex-row width-full justify-center items-center gap-6'>
        <button onClick={() => { setCount(count + 1) }}>Increment</button>
        <button onClick={() => { setCount(count - 1) }}>Decrement</button>
      </div>
      <div className='flex flex-col items-center justify-center mt-4'>
        <p>{count}</p>
      </div>

    </>
  )
}

export default App
