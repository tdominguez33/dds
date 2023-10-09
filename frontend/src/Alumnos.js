import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Alumnos(){
    const [ListaAlumnos, setListaAlumnos] = useState(null)
    
    useEffect(() => {
        // Realiza la solicitud a la URL
        fetch('http://localhost:8010/proxy/alumnos')
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
        let ids = []
        let nombres = []
        let lista = []
    
        for(let i = 0; i < array.length; i++){
          lista.push(<li class="alumnoLista">{i + 1} - {array[i].nombre} - {array[i].fechaNacimiento}</li>)
        }
        setListaAlumnos(lista)
    };

    return(
        <div>
            <h1>Lista de Alumnos:</h1>
            <ul>{ListaAlumnos}</ul>
        </div>
    )
}

export default Alumnos;