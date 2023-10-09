import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './crearCurso.css'

// Libreria Moment.js - npm install moment
const moment = require('moment');

function CrearCurso() { 
    const { idTema } = useParams()

    // Respuesta JSON
    const [ResponseTemas, setResponseTemas] = useState(null)

    // Código HTML menú selección de tema
    const [ListaOpciones, setListaOpciones] = useState(null)
    
    // Valores propios del curso
    const [NombreCurso, setNombreCurso] = useState("")
    const [IdDocente, setIdDocente] = useState("")
    const fechaMinima = moment().add(1, 'days').format().slice(0, 10)
    const horaMinima = moment().format().slice(11, 16)
    const [FechaCurso, setFechaCurso] = useState(fechaMinima)   // Valor predeterminado -> Fecha Actual
    const [HoraCurso, setHoraCurso] = useState(horaMinima)      // Valor predeterminado -> Fecha Actual

    // Valores relacionados al tema del curso
    const [IdTema, setIdTema] = useState("")
    const [NombreTema, setNombreTema] = useState("")
    const [DuracionTema, setDuracionTema] = useState("")

    // Configuración del POST
    const [RequestOptions, setRequestOptions] = useState("")

    // Estado Solicitud
    const [EstadoPOST, setEstadoPOST] = useState(-1)

    const caracteresNombre = 25
    const caracteresID = 1
    
    // Ejecutamos cuando se carga la página
    useEffect(() => {
        // Realiza la solicitud a la URL
        fetch('http://localhost:8010/proxy/temas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                return response.json()
            })
            .then((jsonData) => {
                setResponseTemas(jsonData)
                opcionesTemas(jsonData)
                console.log(convertirFecha(fechaMinima, horaMinima))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Ejecutamos cuando la variable IdTema cambia
    useEffect(() => {
        if(ResponseTemas != null){
            cambiarTema(ResponseTemas)
        }
    }, [IdTema])

    const cambiarTema = (json) => {
        for(let i = 0; i < json.length; i++){
            if(json[i].id == IdTema){
                setNombreTema(json[i].nombre)
                setDuracionTema(json[i].duracion)
            }
        }
    }

    const opcionesTemas = (json) => {
        let opciones = []
        opciones.push(<option value="" selected disabled hidden>Seleccione un Tema</option>)
        for(let i = 0; i < json.length; i++){
            opciones.push(<option value={json[i].id}>{json[i].nombre}</option>)
        }

        setListaOpciones(opciones)

    }

    // Modifica el idDocente solo si lo que se está escribiendo puede ser convertido a un número
    const verificarNumero = (input) => {
        if (typeof input === "string" && !isNaN(input)) {   // NaN = Not a Number - !NaN -> Es un número
            setIdDocente(input)
        }
    }

    // Recibe fecha y hora y lo devuelve en formato ISO8601 (El que usa la base de datos)
    const convertirFecha = (fecha, hora) => {
        return fecha + 'T' + hora + ':00.000+00:00'
    }

    const contarCaracteresNombre = (nombre) => {
        return nombre.length
    }

    const contarCaracteresID = (id) => {
        return id.length
    }

    const mensajeEstado = () => {
        switch(EstadoPOST){
            case -1:
                return <p class="estadoSubida"></p>
            case 0:
                return <p class="estadoSubida">Subida Exitosa</p>
            case 1:
                return <p class="estadoSubida">Ingrese un nombre de curso de al menos 4 caracteres</p>
            case 2:
                return <p class="estadoSubida">Ingrese un ID de docente</p>
            case 3:
                return <p class="estadoSubida">Elija un tema de la lista</p>

        }
    }

    // REQUEST POST

    const requestBody = () => {
        return JSON.stringify(
            {
            "nombre": NombreCurso,
            "tema": {
                "id": IdTema,
                "nombre": NombreTema,
                "duracion": DuracionTema,
                "hibernateLazyInitializer": {}
            },
            "fechaInicio": convertirFecha(FechaCurso, HoraCurso),
            "idDocente": IdDocente
            }
            )
    }

    // Ejecutamos cuando alguna de las variables del body es cambiada
    useEffect(() => {
        setRequestOptions({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody()
        })
    }, [NombreCurso, IdTema, NombreTema, DuracionTema, FechaCurso, HoraCurso, IdDocente])


    const crearCurso = () => {

        if (NombreCurso.length < 4){
            setEstadoPOST(1)
            return
        }
        if (IdDocente.length < 1){
            setEstadoPOST(2)
            return
        }
        if (IdTema == ""){
            setEstadoPOST(3)
            return
        }
        fetch('http://localhost:8010/proxy/cursos', RequestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                console.log("POST Exitoso!")
            })

            setEstadoPOST(0)
    }

    return (
        <div class="container">
            <h1 class="titulo">Creación de Curso</h1>
            <form>
                <label>Nombre: </label>
                <div class="inputContador">
                    <input type="text" class="textoLargo" maxlength={caracteresNombre} value={NombreCurso} onChange={(e) => setNombreCurso(e.target.value)}/>
                    {(contarCaracteresNombre(NombreCurso) === 0) ? (
                        <p class="contador"></p>
                    ) : (
                        <p class="contador">{contarCaracteresNombre(NombreCurso)}/{caracteresNombre}</p>
                    )}
                    
                </div>
                <label>ID Docente: </label>
                <div class="inputContador">
                    <input type="text" class="textoCorto" maxlength={caracteresID} value={IdDocente} onChange={(e) => verificarNumero(e.target.value)}/>
                    {(contarCaracteresID(IdDocente) === 0) ? (
                        <p class="contador"></p>
                    ) : (
                        <p class="contador">{contarCaracteresID(IdDocente)}/{caracteresID}</p>
                    )}
                </div>
                
                <label>Tema: </label>
                {/*Tengo dudas de como y porque la siguiente linea funciona, pero por ahora lo dejo así*/}
                <select value={IdTema} onChange={(e) => setIdTema(e.target.value)}>{ListaOpciones}</select>

                <label>Fecha: </label>
                <input type="date" value={FechaCurso} min={moment().format().slice(0, 10)} onChange={(e) => setFechaCurso(e.target.value)}/>
                <label>Hora: </label>
                <input type="time" value={HoraCurso} min={moment().format().slice(11, 16)} onChange={(e) => setHoraCurso(e.target.value)}/>

                <button type="button" class="submitButton" onClick={crearCurso}>Crear Curso</button>
                {mensajeEstado()}
                

            </form>
        </div>
    )
  }
  
  export default CrearCurso;