import React, { useState } from 'react'
import './App.css';
// import {BrowserRouter} from "react-router-dom"
function App() {
  const [first, setfirst] = useState("hello")
  return (
    // <BrowserRouter>
      <div className="App">
      <h1>hello</h1>
      </div>
    // </BrowserRouter>
  );
}

export default App;
