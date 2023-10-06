import React, { useEffect, useState } from 'react';
import "./Home.css"

function Home2() {
  const [ListaTemas, setListaTemas] = useState(null)

  useEffect(() => {
    // Realiza la solicitud a la URL
    fetch('http://localhost:8010/proxy/cursos')
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
    for(let i = 0; i < array.length; i++){
      if (!ids.includes(array[i].tema.id)){
        ids.push(array[i].tema.id)
        console.log(ids)
        temas.push(array[i].tema.nombre)
        console.log(temas)
      }
      
    }
    setListaTemas(temas.map(tema => <li class="temaLista"><button class="botonLista">{tema}</button></li>))
    console.log(ListaTemas)
  };
  

  return (
    <div className="Home2">
      {(ListaTemas !== null)? (
        <div class="centered">
          <h1 class="title">Temas:</h1>
          <ul class="noPadding">{ListaTemas}</ul>
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