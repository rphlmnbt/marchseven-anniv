import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css'
import LandingPage from './pages/landing-page/LandingPage';
import { Route, Routes } from 'react-router';
import DiaryPage from './pages/diary-page/DiaryPage';

function App() {

  return (
    <MantineProvider>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/diary' element={<DiaryPage />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
