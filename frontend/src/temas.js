import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "./css/temas.css"
import Cursos from './cursos';

function Temas() {
  const [ListaTemas, setListaTemas] = useState(null)

  useEffect(() => {
    // Realiza la solicitud a la URL
    fetch('http://localhost:8080/temas')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud')
        }
        return response.json()
      })
      .then((jsonData) => {
        listarTemas(jsonData)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  const listarTemas = (array) => {
    let ids = []
    let temas = []
    let lista = []

    // Filtramos los repetidos, guardamos los ids y los nombres de los temas
    for(let i = 0; i < array.length; i++){
      ids.push(array[i].id)
      temas.push(array[i].nombre)
    }

    // Ordenar Alfabeticamente
    let listaCombinada = []
    for(let i = 0; i < temas.length; i++){
      listaCombinada.push({'id': ids[i], 'tema': temas[i]})
    }

    listaCombinada.sort(function(a, b){
      if (a.tema < b.tema){
        return -1
      }else{
        return 1
      }
    })


    // Generamos el código HTML para cada tema disponible
    // Cada elemento de la lista linkea a /temas/cursos/id con id el valor de id que tiene asociado cada tema
    for(let i = 0; i < ids.length; i++){
      lista.push(<Link to={`./cursos/${listaCombinada[i].id}`}><li class="temaLista" onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}><button class="botonLista">{listaCombinada[i].tema}</button></li></Link>)
    }

    setListaTemas(lista)
  };
  
  return (
    <div>
      {(ListaTemas !== null) ? (
        <div class="centered">
          <div class="vistaTemas">
            <h1 class="title">Temas:</h1>
            <ul class="noPadding">
              <Link to={`/crearTema`}><li class="temaListaAgregar"><button class="botonLista">+</button></li></Link>
              {ListaTemas}
            </ul>
          </div>

          <div class="vistaCursos">
          <Routes>
            {/* Especificamos el nombre que va tener el parametro */}
            <Route path="/cursos/:id" element={<Cursos />} />
          </Routes>
          </div>

        </div>
        
      ) : (
        <div class="cargandoDiv">
          <h1 class="cargando">Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default Temas;