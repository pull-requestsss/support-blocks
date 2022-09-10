import React from 'react'
import "./App.css";
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';
import TobBar from './components/TopBar/TobBar';

const App = () => {
  return (
    <div>
      <TobBar />
      <SignUp />
    </div>
  )
}

export default App