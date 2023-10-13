import React from 'react';
import './css/home.css'

function Home(){

    return(
        <div>
            <div class="tituloHome">
                <h1>Diseño de Sistemas - 2023 - UTN Facultad Regional Delta</h1>
            </div>
            <div class="textoHome">
                <h2>Alumno: Tomás Dominguez</h2>
                <p>
                Frontend realizado con React. Para acceder a las distintas funciones hacer click en los botones
                de la barra de navegación superior.
                </p>
                <a href="https://github.com/tdominguez33/dds" target="_blank">Repositorio personal del proyecto</a>
            </div>
        </div>
    )
}

export default Home;