import React from 'react'
import "./App.css";
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';
import TobBar from './components/TopBar/TobBar';
import DonationPage from './pages/DonationPage/DonationPage';

const App = () => {
  return (
    <div>
      <TobBar />
      <DonationPage />
    </div>
  )
}

export default App