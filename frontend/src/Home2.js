import React, { useEffect, useState } from 'react';
import "./Home.css"

function Home2() {
  const [Cursos, setCursos] = useState(null);
  const [ListaCursos, setListaCursos] = useState(null)

  useEffect(() => {
    // Realiza la solicitud a la URL
    fetch('http://localhost:8010/proxy/cursos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((jsonData) => {
        setCursos(jsonData);
        listarCursos(jsonData)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  const listarCursos = (array) => {
    let cursos = []
    for(let i = 0; i < array.length; i++){
      cursos.push(array[i].nombre);
    }
    setListaCursos(cursos.map(curso => <li>{curso}</li>));
    console.log(ListaCursos);
  };
  

  return (
    <div className="Home2">
      {(ListaCursos !== null)? (
        <div class="centered">
          <h1 class="title">Cursos: {Cursos[0].nombre}</h1>
          <ul>{ListaCursos}</ul>
        </div>
      ) : (
        <div class="centered">
          <h1 class="title">Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default Home2;