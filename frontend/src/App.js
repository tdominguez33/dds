import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./App.css"
import Home from './Home';
import Temas from './temas';
import Alumnos from './Alumnos';
import CrearCurso from "./crearCurso"

function App() {
  return (
    <body>
      <div class="topnav">
        <Link to="/"><a class="navbarBoton">Precio Compra</a></Link>
        <Link to="/temas"><a class="navbarBoton">Cursos</a></Link>
        <Link to="/alumnos"><a class="navbarBoton">Alumnos</a></Link>
      </div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/temas/*" element={<Temas />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/crearCurso/:idTema" element={<CrearCurso />} />
      </Routes>
    </body>
  );
}

export default App;
