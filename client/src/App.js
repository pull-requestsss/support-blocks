import React from 'react'
import "./App.css";
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import TobBar from './components/TopBar/TobBar';
import DonationPage from './pages/DonationPage/DonationPage';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Error from './pages/Error/Error';

const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<>
          <TobBar /><LandingPage />
        </>} />
        <Route path="/setup" element={<>
          <TobBar /><SignUp />
        </>} />
        <Route path="/:slug" element={<>
          <TobBar donation={true} /><DonationPage />
        </>} />
        <Route path="/notfound" element={<>
          <TobBar donation={true} /><Error />
        </>} />
        <Route path="/dashboard" element={<><TobBar /><Dashboard /></>} />
      </Routes>

    </>
  )
}

export default App
