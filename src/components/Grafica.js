import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Grafica = () => {

const [año, setAño] = useState([]);
const [poblacion, setPoblacion] = useState([]);

const data = {
    labels: poblacion,
    datasets:[{
        labels: 'Poblacion',
        backgroundColor: 'rgba(0,255,0,1)',
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,255,0,0.2)',
        hoverBorderColor: '#FFFF00',
        data: año

    }]
};

const opciones={
    maintainAspectRatio: false,
    responsive: true
}

    const peticionApi = async()=>{
        await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
        .then(respose=>{
            //console.log(respose.data);
            var respuesta = respose.data;
            var  auxPoblacion=[], auxAño=[];
            respuesta.map(elemento=>{
                auxPoblacion.push(elemento.poblacion);
                auxAño.push(elemento.año);
            })
            setPoblacion(auxPoblacion);
            setAño(auxAño);
        })
    }

    useEffect(()=>{
        peticionApi();
    },[])

  return (
    <div>
        <h2>Grafica Prueba</h2>
        <Bar data={data} options={opciones}></Bar>
    </div>
  )
}

export default Grafica