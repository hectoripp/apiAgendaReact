import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


const baseUrl = 'https://intecapagenda-production.up.railway.app/alumnos/';
//const baseUrl = 'https://agenda-production-8434.up.railway.app/alumnos';

const EditarAlumno = () => {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [genero, setGenero] = useState('')
  const [telefono, setTelefono] = useState('')
  const [edad, setEdad] = useState('')
  const {id} = useParams();
  const redirect = useNavigate();

  useEffect(()=>{
    const getAlumnos = async ()=>{
      const res = await axios.get(`${baseUrl}/${id}`);
      setNombre(res.data.alumnos[0].nombre);
      setCorreo(res.data.alumnos[0].correo);
      setGenero(res.data.alumnos[0].genero);
      setTelefono(res.data.alumnos[0].telefono);
      setEdad(res.data.alumnos[0].edad);

    }
    getAlumnos();
  }, [id])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const alumno = {nombre, correo, genero, telefono, edad};
    await axios.put(`${baseUrl}/${id}`, alumno)
    redirect('/')
  
  }

  return (
    <div className='container'>
    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
      <div className='card'>
        <div className='card-header bg-dark text-white'>Modificar Alumno</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>

            <div class="mb-3">
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                className='form-control'
                id='nombre'
                name='nombre'
                placeholder="Ingrese Nombre"
                maxLength={50}
                value={nombre}
                required
                onChange={(e) => setNombre(e.target.value)}
              ></input>
            </div>

            <div class="mb-3">
              <label htmlFor='correo'>Correo</label>
              <input
                type='text'
                className='form-control'
                id='correo'
                name='correo'
                placeholder="Ingrese Correo Electronico"
                maxLength={50}
                value={correo}
                required
                onChange={(e) => setCorreo(e.target.value)}
              ></input>
            </div>

            <div class="mb-3">
              <label htmlFor='genero'>Genero</label>
              <input
                type='text'
                className='form-control'
                id='genero'
                name='genero'
                placeholder="Ingrese Genero"
                maxLength={50}
                value={genero}
                required
                onChange={(e) => setGenero(e.target.value)}
              ></input>
            </div>

            <div class="mb-3">
              <label htmlFor='telefono'>Telefono</label>
              <input
                type='text'
                className='form-control'
                id='telefono'
                name='telefono'
                placeholder="Ingrese Telefono"
                maxLength={50}
                value={telefono}
                required
                onChange={(e) => setTelefono(e.target.value)}
              ></input>
            </div>

            <div class="mb-3">
              <label htmlFor='edad'>Edad</label>
              <input
                type='text'
                className='form-control'
                id='edad'
                name='edad'
                placeholder="Ingrese Edad"
                maxLength={50}
                value={edad}
                required
                onChange={(e) => setEdad(e.target.value)}
              ></input>
            </div>
            <div class="d-grid gap-2 mt-3">
              <button className='btn btn-primary' type='submit'>Guardar Cambios</button>
            </div>

          </form>
        </div>
        <div className='card-footer bg-dark text-white'>Héctor Isaí Pérez Pérez</div>
      </div>
    </div>
  </div>
  )
}

export default EditarAlumno