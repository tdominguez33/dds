import React, { useEffect, useState } from 'react';
import "./Home.css"

function Home() {
  const [BuyValue, setBuyValue] = useState(null);

  useEffect(() => {
    // Realiza la solicitud a la URL
    fetch('https://api.bluelytics.com.ar/v2/latest')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((jsonData) => {
        // Obtiene el valor específico y almacénalo en el estado
        const specificValue = jsonData.blue.value_buy;
        setBuyValue(specificValue);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="Home">
      {BuyValue !== null ? (
        <div class="centered">
          <h1 class="title">Valor de Compra: ${BuyValue}</h1>
          <a target="_blank" href="https://www.youtube.com/live/ipnrBtnbxrk?si=7QI26B5QN7P_Jd3_&t=1870"><button class="button">¿Es dia de corrida? Hacé click acá</button></a>
        </div>
      ) : (
        <div class="centered">
            <h1 class="title">Cargando...</h1>
        </div>
      )}
    </div>
  );
}

export default Home;