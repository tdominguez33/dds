import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/infoCurso.css'

function InfoCurso(){

    const { idCurso } = useParams()

    const [NombreCurso, setNombreCurso] = useState("")
    const [FechaCurso, setFechaCurso] = useState("")
    const [DocenteCurso, setDocenteCurso] = useState("")
    const [IdTemaCurso, setIdTemaCurso] = useState("")
    const [NombreTema, setNombreTema] = useState("")
    const [DuracionTema, setDuracionTema] = useState("")
    
    const [ListaFiltrada, setListaFiltrada] = useState([])
    
    const url = 'http://localhost:8010/proxy/cursos/' + idCurso // URL que devuelve el curso específico

    // Ejecutamos al cargar la página
    useEffect(() => {
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud')
            }
            return response.json()
        })
        .then((data) => {
            setNombreCurso(data.nombre)
            setFechaCurso(data.fechaInicio.slice(0, 10))    // Dejamos solo la fecha
            setDocenteCurso(data.idDocente)
            setIdTemaCurso(data.tema.id)
            setNombreTema(data.tema.nombre)
            setDuracionTema(data.tema.duracion)
            return data.tema.id
        })
        .then((idTema) => {
            fetch('http://localhost:8010/proxy/materiales/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud')
                    }
                    return response.json()
                })
                .then((data) => {
                    materialesCurso(data, idTema)
                })
        })
    }, []);

    const materialesCurso = (lista, idTema) => {
        let listaFiltrada = lista.filter((material) => material.idCurso == idTema)
        let listaHTML = []

        for(let i = 0; i < listaFiltrada.length; i++){
            listaHTML.push(<tr class="trMaterialInfoCurso"><td>{listaFiltrada[i].titulo}</td><td>{listaFiltrada[i].costo}</td><td>{listaFiltrada[i].stock}</td></tr>)
        }

        setListaFiltrada(listaHTML)
        
    }

    return(
        <div>
            <div class="containerInfoCurso">
                <Link to={`/temas/cursos/${IdTemaCurso}`}><button class="backButtonInfoCurso">&lt; Volver</button></Link>
                <h1 class="tituloInfoCurso">Información del Curso: </h1>
                <div class="datosInfoCurso">
                    <p>Nombre del Curso: <p class="textoClaro">{NombreCurso}</p></p>
                    <p>Fecha del Curso: <p class="textoClaro">{FechaCurso}</p></p>
                    <p>ID del docente: <p class="textoClaro">{DocenteCurso}</p></p>
                    <p>Tema: <p class="textoClaro">{NombreTema}</p></p>
                    <p>Duración: <p class="textoClaro">{DuracionTema}</p></p>
                    {(ListaFiltrada.length > 0) ? (
                        <div>
                            <p>Materiales:</p>
                                <div class="listaMaterialesInfoCurso">
                                    <table class="tablaMaterialesInfoCurso">
                                        <tr>
                                            <th class="columnaNombreInfoCurso">Nombre</th>
                                            <th class="columnaPrecioInfoCurso">Precio</th>
                                            <th class="columnaStockInfoCurso">Stock</th>
                                        </tr>
                                        {ListaFiltrada}
                                    </table>
                                </div>
                        </div>
                    ):(
                        <p></p>
                    )
                    }
                </div>
                    
            </div>
        </div>
    )
}

export default InfoCurso;