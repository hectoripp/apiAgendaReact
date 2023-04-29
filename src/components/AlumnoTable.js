import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'


const baseUrl = 'https://intecapagenda-production.up.railway.app/alumnos/';
//const baseUrl = 'https://agenda-production-8434.up.railway.app/alumnos';

const AlumnoTable = () => {

    const [alumnos, setAlumnos] = useState([]);
    const [serch, setSerch]=useState('');
    const [filterAlumno, setFilterAlumno] = useState([]);

    const getAlumnos = async () => {
        try {
            const res = await axios.get(baseUrl);
            setAlumnos(res.data);
            setFilterAlumno(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{

    const result = alumnos.filter((alumno)=>{
        return alumno.nombre.toLowerCase().match(serch.toLowerCase());
    });
    setFilterAlumno(result);
},[serch]);





    useEffect(() => {
        getAlumnos();
    }, [])


    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'correo',
            selector: row => row.correo,
            sortable: true,
        },
        {
            name: 'genero',
            selector: row => row.genero,
            sortable: true,
        },
        {
            name: 'telefono',
            selector: row => row.telefono,
            sortable: true,
        },
        {
            name: 'edad',
            selector: row => row.edad,
            sortable: true,
        },
        {
            name: 'acciones',
            cell: row=>(
                <div className='d-flex'>
                    <Link to={`/edit/${row.id}`} className='btn btn-warning'>Edit</Link>
                   <button className='btn btn-danger mx-2' onClick={()=>deleteAlumno(row.id)}>Delete</button>
                </div>
            )
        }
    ]


const deleteAlumno =async(id)=>{
    try {
        await axios.delete(`${baseUrl}/${id}`);
        getAlumnos();
    } catch (error) {
        console.log(error);
    }
}


return (
        <>

<div className='container'>


        
                 <p className='mx-2'>
                    <Link to="/create" className='btn btn-primary'>Crear Alumno</Link>
                    </p>   <p className='mx-2'>
                    <Link to="/grafica" className='btn btn-success'>Crear Grafica</Link>
                </p>
      
              
            <DataTable
                title="Listado de Alumnos"
                columns={columns}
                data={filterAlumno}
                pagination
                paginationComponentOptions={[5,10,15,20,25,30]}
                fixedHeader
                fixedHeaderScrollHeight='450px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
               /*
                actions={
                    <button className='btn btn-success'>Grafica</button>
                    
                }
                */
                subHeader
                subHeaderComponent={
                    <input
                    type='text'
                    placeholder='Buscar'
                    className='w-25 form-control'
                    value={serch}
                    onChange={e=>setSerch(e.target.value)}
                    />
                }
                subHeaderAlign='right'
              
            />
  </div>
        </>
     


    )
}

export default AlumnoTable