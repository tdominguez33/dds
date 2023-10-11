import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/crearTema.css'

function CrearTema() { 

    // Valores del tema
    const [NombreTema, setNombreTema] = useState("")
    const [DuracionTema, setDuracionTema] = useState("")

    //Valores Materiales
    const [NombreMaterial, setNombreMaterial] = useState("")
    const [CostoMaterial, setCostoMaterial] = useState("")
    const [StockMaterial, setStockMaterial] = useState("")
    const [Materiales, setMateriales] = useState([])

    // Variable que habilita el botón para agregar un material
    const [HabilitarBoton, setHabilitarBoton] = useState(false)

    // Código HTMl
    const [ListaMateriales, setListaMateriales] = useState([])
    var varCodigoHTML = [];

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
            case 0:
                return <p class="estadoSubidaTema">Subida Exitosa</p>
            case 1:
                return <p class="estadoSubidaTema">Ingrese un nombre de tema de al menos 4 caracteres</p>
            case 2:
                return <p class="estadoSubidaTema">Ingrese una duración</p>
            default:
                return <p class="estadoSubidaTema"></p>
        }
    }

    const agregarMaterialLista = () => {
        let listaHTML = []
        let lista = []
        for(let i = 0; i < ListaMateriales.length; i++){
            listaHTML.push(ListaMateriales[i])
            lista.push(Materiales[i])
        }
        listaHTML.push(<tr><td>{NombreMaterial}</td><td>{CostoMaterial}</td><td>{StockMaterial}</td><td><button type ="button" class="deleteMaterial" onClick={() => removerMaterialLista(listaHTML.length - 1)}>X</button></td></tr>)
        lista.push({titulo: NombreMaterial, costo: CostoMaterial, stock: StockMaterial})
        setListaMateriales(listaHTML)
        setMateriales(lista)
        // Borramos los campos
        setNombreMaterial("")
        setCostoMaterial("")
        setStockMaterial("")

        // Borrado de elementos [NO FUNCIONA]
        varCodigoHTML = listaHTML
    }

    // NO FUNCIONA
    const removerMaterialLista = (posicion) => {
        let listaHTML = varCodigoHTML
        listaHTML.splice(posicion, 1)
        varCodigoHTML = listaHTML
        setListaMateriales(listaHTML)
    }

    // Habilitamos el boton de carga de datos basados en si hay cosas escritas en los campos o no
    useEffect(() => {
        if(NombreMaterial.length > 3 && CostoMaterial.length > 0 && StockMaterial.length > 0){
            setHabilitarBoton(false)
        }else{
            setHabilitarBoton(true)
        }
    }, [NombreMaterial, CostoMaterial, StockMaterial])

    // Quitamos el cartel de error o éxito despues de unos segundos
    useEffect(() => {
        const timer = setTimeout(() => {setEstadoPOST(-1)}, 3000);
        return () => clearTimeout(timer);
    }, [EstadoPOST])

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
                cargarMateriales(data.id)
            })

        setEstadoPOST(0)
        
    }

    const cargarMateriales = (idTema) => {
        for(let i = 0; i < Materiales.length; i++){
            let requestOptionsMateriales =
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // No se porque hay que sumarle 1
                    body: requestBodyMateriales(Materiales[i].titulo, Materiales[i].costo, idTema, Materiales[i].stock)
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
                    <div class="textoLargoContadorTema">
                        <input type="text" class="textoLargoTema" maxlength={caracteresNombre} value={NombreTema} onChange={(e) => setNombreTema(e.target.value)}/>
                        {(contarCaracteresNombre(NombreTema) === 0) ? (
                            <p class="contadorTema"></p>
                        ) : (
                            <p class="contadorTema">{contarCaracteresNombre(NombreTema)}/{caracteresNombre}</p>
                        )}
                        
                    </div>
                    <label>Duración: </label>
                    <div class="textoCortoContadorTema">
                        <input type="text" class="textoCortoTema" maxlength={caracteresDuracion} value={DuracionTema} onChange={(e) => verificarNumero(e.target.value, setDuracionTema)}/>
                        {(contarCaracteresDuracion(DuracionTema) === 0) ? (
                            <p class="contadorTema"></p>
                        ) : (
                            <p class="contadorTema">{contarCaracteresDuracion(DuracionTema)}/{caracteresDuracion}</p>
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
                                    <td class="celdaInput"><input type="text" placeholder="Nombre..." class="inputNombreMaterial" value={NombreMaterial} maxLength="25" onChange={(e) => setNombreMaterial(e.target.value)}/></td>
                                    <td class="celdaInput"><input type="text" placeholder="Costo..." class="inputCostoMaterial" value={CostoMaterial} maxLength="9" onChange={(e) => verificarNumero(e.target.value, setCostoMaterial)}/></td>
                                    <td class="celdaInput"><input type="text" placeholder="Stock..." class="inputStockMaterial" value={StockMaterial} maxLength="6" onChange={(e) => verificarNumero(e.target.value, setStockMaterial)}/></td>
                                    <td class="celdaInput"><button type="button" class="submitMaterial" disabled={HabilitarBoton} onClick={() => agregarMaterialLista()}>+</button></td>
                                </tr>
                        </table>
                    </div>

                    <button type="button" class="submitButtonTema" onClick={crearTema}>Crear Tema</button>
                    {mensajeEstado()}
                </form>
            </div>
        </div>
    )
  }
  
  export default CrearTema;