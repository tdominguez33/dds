import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./css/App.css"
import Temas from './temas';
import Alumnos from './Alumnos';
import CrearCurso from "./crearCurso"
import CrearTema from './crearTema';
import InfoCurso from "./infoCurso"

function App() {
  return (
    <body>
      <div class="topnav">
        <Link to="/temas"><a class="navbarBoton">Cursos</a></Link>
        <Link to="/alumnos"><a class="navbarBoton">Alumnos</a></Link>
      </div>
      <Routes>
          <Route path="/temas/*" element={<Temas />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/crearCurso/:idTema" element={<CrearCurso />} />
          <Route path="/crearTema" element={<CrearTema />} />
          <Route path="/infoCurso/:idCurso" element={<InfoCurso />} />
      </Routes>
    </body>
  );
}

export default App;
