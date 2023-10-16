import React, { useEffect, useState } from 'react';
import "./css/alumnos.css"

function Alumnos(){
    const [ListaAlumnos, setListaAlumnos] = useState([])
    
    useEffect(() => {
        // Realiza la solicitud a la URL
        fetch('http://localhost:8080/alumnos')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud')
            }
            return response.json()
        })
        .then((jsonData) => {
            listarAlumnos(jsonData)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);
    

    const listarAlumnos = (array) => {
        let lista = []
    
        for(let i = 0; i < array.length; i++){
          lista.push(<tr class="trAlumnos"><td>{i + 1}</td><td>{array[i].nombre}</td><td>{array[i].fechaNacimiento}</td></tr>)
        }
        setListaAlumnos(lista)
    };

    return(
        <div>
            <h1 class="tituloAlumnos">Lista de Alumnos:</h1>
            <div class="listaAlumnos">
                    <table class="tablaAlumnos">
                    <tr>
                        <th class="columnaID">ID</th>
                        <th class="columnaNombre">Nombre</th>
                        <th class="columnaFechaNacimiento">Fecha de Nacimiento</th>
                    </tr>
                    {ListaAlumnos}
                </table>
            </div>
        </div>
    )
}

export default Alumnos;