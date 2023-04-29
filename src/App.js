import React from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateAlumno from './components/CreateAlumno';
import AlumnoTable from './components/AlumnoTable';
import EditarAlumno from './components/EditarAlumno';
import Grafica from './components/Grafica';
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <>
    <div className='container'>
      <center><h3 className='py-3 mx-3'>Consumiendo Api de Agenda con Backend Spring Boot</h3> </center>
   
    </div>



    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AlumnoTable />}/>
          <Route path='/create' element={<CreateAlumno/>}/>
          <Route path='/edit/:id' element={<EditarAlumno/>}/>
          <Route path='/grafica' element={<Grafica/>}/>
        </Routes>
      </BrowserRouter>

      </>

  
  )
}

export default App