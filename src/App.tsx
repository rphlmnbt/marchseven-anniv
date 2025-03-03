import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css'
import LandingPage from './pages/landing-page/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <LandingPage />
    </MantineProvider>
  )
}

export default App
