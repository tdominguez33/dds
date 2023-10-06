import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./App.css"
import Home from './Home';
import Home2 from './Home2';

function App() {
  return (
    <body>
      <div class="topnav">
        <Link to="/"><a class ="active">Precio Compra</a></Link>
        <Link to="home2"><a>Cursos</a></Link>
      </div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
      </Routes>
    </body>
  );
}

export default App;
