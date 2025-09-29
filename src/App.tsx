import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TailwindButton } from './components/TailwindButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8">
      <div className="flex space-x-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react h-24 w-24" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900">Vite + React</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <TailwindButton onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </TailwindButton>
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="flex space-x-4">
        <TailwindButton variant="primary" size="sm">
          Small Primary
        </TailwindButton>
        <TailwindButton variant="secondary" size="md">
          Medium Secondary
        </TailwindButton>
        <TailwindButton variant="primary" size="lg">
          Large Primary
        </TailwindButton>
      </div>
      
      <p className="text-gray-500 text-center max-w-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
