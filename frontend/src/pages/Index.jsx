import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function Index() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [telFijo, setTelFijo] = useState("")
  const [telMovil, setTelMovil] = useState("")

  const [usernameSelected, setUsernameSelected] = useState([])

  const handleNombre=(e)=>{
    const {target} = e
    setNombre(target.value)
  }
  const handleCorreo=(e)=>{
    const {target} = e
    setCorreo(target.value)
  }
  const handleTelFijo=(e)=>{
    const {target} = e
    setTelFijo(target.value)
  }
  const handleTelMovil=(e)=>{
    const {target} = e
    setTelMovil(target.value)
  }
  const delModal=()=>{
    setNombre("")
    setCorreo("")
    setTelFijo("")
    setTelMovil("")
    setUsernameSelected([]);
  }
  const handleRegistro=async()=>{
    const newAgenda={
      nombre:nombre,
      correo:correo,
      tlf_fijo:telFijo,
      tlf_movil:telMovil
    }
    try {
      const res = await axios.post("http://localhost:3000/api/agenda/", newAgenda);
      if(res.status===200){
        setNombre("")
        setCorreo("")
        setTelFijo("")
        setTelMovil("")
        window.location.reload()
      }
    } catch (error) {
      alert("Oopss.. ocurrio un error")
    }
  }
  const handleFindOne=async ()=>{
    try {
      const res = await axios.get(`http://localhost:3000/api/agenda/${nombre}`);
      console.log({res});
      setUsernameSelected(res.data.agenda);
      console.log({usernameSelected});
    } catch (error) {
      alert("Oopss.. ocurrio un error")
    }
  }

  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{minHeight:"60vh"}}>
      <div className='card col-xs-11 col-sm-11 col-md-9 col-lg-7 col-xl-6 text-center mt-4' style={{border:"none"}}>
        <div className="card-header" style={{background:"white-gray", border:"none"}}>
        <h2>Agenda BD</h2>
        </div>
        <div className="card-body">
          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary" type="button" onClick={()=>navigate("/listado-total")}>Listado Total</button>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Añadir un registro</button>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Buscar registros</button>
          </div>
        </div>
      </div>
    </div>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-1">
                <label htmlFor="name" className="col-form-label">Nombres:</label>
                <input type="text" className="form-control" id="name" required onChange={(e)=>handleNombre(e)} value={nombre}/>
              </div>
              <div className="mb-1">
                <label htmlFor="email" className="col-form-label">Correo-e:</label>
                <input type="email" className="form-control" id="email" required onChange={(e)=>handleCorreo(e)} value={correo}/>
              </div>
              <div className="mb-1">
                <label htmlFor="tel-fijo" className="col-form-label">Telefono fijo:</label>
                <input type="text" className="form-control" id="tel-fijo" onChange={(e)=>handleTelFijo(e)} value={telFijo}/>
              </div>
              <div className="mb-1">
                <label htmlFor="tel-movil" className="col-form-label">Telefono movil:</label>
                <input type="text" className="form-control" id="tel-movil" onChange={(e)=>handleTelMovil(e)} value={telMovil}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>delModal()}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={()=>handleRegistro()}>Agregar</button>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Buscar Registro</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <div className="mb-1">
                <label htmlFor="name" className="col-form-label">Nombres:</label>
                <input type="text" className="form-control" id="name" required onChange={(e)=>handleNombre(e)} value={nombre}/>
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>delModal()}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={()=>handleFindOne()}>Buscar</button>
          </div>

        <div className="m-5">
        {
          usernameSelected.length===0 ? (
            <div>
              <h6>Este nombre de usuario no esta seleccionado todavia, esta disponible</h6>
            </div>
          ):(
            <div>
            <h6>Este nombre de usuario ya esta seleccionado</h6>
            {usernameSelected.map((element, index)=>(
              <div key={index}>
                <div>{element.id}</div>
                <div>{element.nombre}</div>
                <div>{element.correo}</div>
                <div>{element.tlf_fijo}</div>
                <div>{element.tlf_movil}</div>
              </div>
            ))}
            </div>
          )
          }
        </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Index