import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React from "react";
// import Welcome from './components/Welcome';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact";
import AboutMe from "./pages/AboutMe";
import Profile from "./pages/Profile";

const apiBaseUrl = "http://localhost:3000/";
const apiTimeout = 1000 * 15; // 15 sec

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: apiTimeout,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Welcome message="Hola welcome props" name="Andrea"/> */}
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About Me</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/profile/:name" element={<Profile />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
