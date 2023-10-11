import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/crear.css'
import './css/crearTema.css'

// Libreria Moment.js - npm install moment
const moment = require('moment');

function CrearTema() { 

    // Respuesta JSON
    const [ResponseTemas, setResponseTemas] = useState(null)

    // Valores del tema
    const [NombreTema, setNombreTema] = useState("")
    const [DuracionTema, setDuracionTema] = useState("")

    //Valores Materiales
    const [NombreMaterial, setNombreMaterial] = useState("")
    const [CostoMaterial, setCostoMaterial] = useState("")
    const [StockMaterial, setStockMaterial] = useState("")
    const [Materiales, setMateriales] = useState([])

    const [IdNuevoTema, setIdNuevoTema] = useState(0)

    // Código HTMl
    const [ListaMateriales, setListaMateriales] = useState([])

    // Configuración del POST
    const [RequestOptionsTema, setRequestOptionsTema] = useState("")

    // Estado Solicitud
    const [EstadoPOST, setEstadoPOST] = useState(-1)

    const caracteresNombre = 25
    const caracteresDuracion = 3

    // Modifica un useState si es un número, recibe el valor y la funcion para setearlo
    const verificarNumero = (input, funcion) => {
        if (typeof input === "string" && !isNaN(input)) {   // NaN = Not a Number - !NaN -> Es un número
            funcion(input)
        }
    }

    const contarCaracteresNombre = (nombre) => {
        return nombre.length
    }

    const contarCaracteresDuracion = (id) => {
        return id.length
    }

    const mensajeEstado = () => {
        switch(EstadoPOST){
            case -1:
                return <p class="estadoSubida"></p>
            case 0:
                return <p class="estadoSubida">Subida Exitosa</p>
            case 1:
                return <p class="estadoSubida">Ingrese un nombre de tema de al menos 4 caracteres</p>
            case 2:
                return <p class="estadoSubida">Ingrese una duración</p>
        }
    }

    const agregarMaterialLista = () => {
        let listaHTML = []
        let lista = []
        for(let i = 0; i < ListaMateriales.length; i++){
            listaHTML.push(ListaMateriales[i])
            lista.push(Materiales[i])
        }
        listaHTML.push(<tr><td>{NombreMaterial}</td><td>{CostoMaterial}</td><td>{StockMaterial}</td><td><button>X</button></td></tr>)
        lista.push({titulo: NombreMaterial, costo: CostoMaterial, stock: StockMaterial})
        setListaMateriales(listaHTML)
        setMateriales(lista)
    }

    // REQUEST POST

    const requestBodyTema = () => {
        return JSON.stringify(
            {
                "nombre": NombreTema,
                "duracion": DuracionTema
            }
        )
    }

    const requestBodyMateriales = (titulo, costo, id, stock) => {
        return JSON.stringify(
            {
                "titulo": titulo,
                "costo": costo,
                "idCurso": id,
                "stock": stock
            }
        )
    }

    // Ejecutamos cuando alguna de las variables del body es cambiada
    useEffect(() => {
        setRequestOptionsTema({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBodyTema()
        })
    }, [NombreTema, DuracionTema])
    


    const crearTema = () => {

        if (NombreTema.length < 4){
            setEstadoPOST(1)
            return
        }
        if (DuracionTema.length < 1){
            setEstadoPOST(2)
            return
        }


        fetch('http://localhost:8010/proxy/temas', RequestOptionsTema)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud')
                }
                return response.json()})
            .then((data) =>{
                console.log("POST Exitoso!")
                setIdNuevoTema(data.id)
            })

        setEstadoPOST(0)

        // Carga de Materiales
        cargarMateriales(IdNuevoTema)
    }

    const cargarMateriales = (idTema) => {
        let idTemaNuevo = idTema + 1
        for(let i = 0; i < Materiales.length; i++){
            let requestOptionsMateriales =
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // No se porque hay que sumarle 1
                    body: requestBodyMateriales(Materiales[i].titulo, Materiales[i].costo, idTemaNuevo, Materiales[i].stock)
                }
            
            fetch('http://localhost:8010/proxy/materiales', requestOptionsMateriales)
            .then((response) => {
                if (!response.ok) {
                    console.log(Materiales[i].nombre)
                    throw new Error('Error en la solicitud')
                }
                console.log("POST (Material) Exitoso!")
            })
        }
    }

    return (
        <div>
            <Link to={`/temas`}><button class="backButtonCrearCurso">&lt; Volver</button></Link>
            <div class="containerTema">
                <h1 class="tituloTema">Creación de Tema</h1>
                <form class="formCreacionTema">
                    <label>Nombre: </label>
                    <div>
                        <input type="text" class="textoLargo" maxlength={caracteresNombre} value={NombreTema} onChange={(e) => setNombreTema(e.target.value)}/>
                        {(contarCaracteresNombre(NombreTema) === 0) ? (
                            <p class="contador"></p>
                        ) : (
                            <p class="contador">{contarCaracteresNombre(NombreTema)}/{caracteresNombre}</p>
                        )}
                        
                    </div>
                    <label>Duración: </label>
                    <div>
                        <input type="text" class="textoCorto" maxlength={caracteresDuracion} value={DuracionTema} onChange={(e) => verificarNumero(e.target.value, setDuracionTema)}/>
                        {(contarCaracteresDuracion(DuracionTema) === 0) ? (
                            <p class="contador"></p>
                        ) : (
                            <p class="contador">{contarCaracteresDuracion(DuracionTema)}/{caracteresDuracion}</p>
                        )}
                    </div>
                    <label>Materiales: </label>
                    <div class="containerMateriales">   
                        <table class="tablaMateriales">
                                <tr>
                                    <th class="columnaNombreMaterial">Nombre</th>
                                    <th class="columnaCostoMaterial">Costo</th>
                                    <th class="columnaStockMaterial">Stock</th>
                                    <th class="columnaAccionMaterial"></th>
                                </tr>
                                {ListaMateriales}
                                <tr>
                                    <td><input type="text" placeholder="Nombre..." class="inputNombreMaterial" value={NombreMaterial} onChange={(e) => setNombreMaterial(e.target.value)}/></td>
                                    <td><input type="text" placeholder="Costo..." class="inputCostoMaterial" value={CostoMaterial} onChange={(e) => verificarNumero(e.target.value, setCostoMaterial)}/></td>
                                    <td><input type="text" placeholder="Stock..." class="inputStockMaterial" value={StockMaterial} onChange={(e) => verificarNumero(e.target.value, setStockMaterial)}/></td>
                                    <td><button type="button" class="submitMaterial" onClick={agregarMaterialLista}>+</button></td>
                                </tr>
                        </table>
                    </div>

                    <button type="button" class="submitButton" onClick={crearTema}>Crear Tema</button>
                    {mensajeEstado()}
                </form>
            </div>

            <h1>{NombreMaterial}</h1>
            <h1>{CostoMaterial}</h1>
            <h1>{StockMaterial}</h1>
        </div>
    )
  }
  
  export default CrearTema;