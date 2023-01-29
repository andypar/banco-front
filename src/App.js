import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { Component }  from 'react';

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
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
