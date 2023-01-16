import React, { useState, useEffect } from "react";
import axios from "axios";

function ListadoTotal() {
  const [agendas, setAgendas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telFijo, setTelFijo] = useState("");
  const [telMovil, setTelMovil] = useState("");
  const [idAgenda, setIdAgenda] = useState("")

  const getTasksRequest = async () => {
    const res = await axios.get("http://localhost:3000/api/agenda");
    console.log(res);
    setAgendas(res.data.agendas);
  };

  const handleModalEdit = async (element) => {
    const { id, nombre, correo, tlf_fijo, tlf_movil } = element;
    setIdAgenda(id)
    setNombre(nombre);
    setCorreo(correo);
    setTelFijo(tlf_fijo);
    setTelMovil(tlf_movil);
  };
  const handleNombre = (e) => {
    const { target } = e;
    setNombre(target.value);
  };
  const handleCorreo = (e) => {
    const { target } = e;
    setCorreo(target.value);
  };
  const handleTelFijo = (e) => {
    const { target } = e;
    setTelFijo(target.value);
  };
  const handleTelMovil = (e) => {
    const { target } = e;
    setTelMovil(target.value);
  };
  const delModal = () => {
    setNombre("");
    setCorreo("");
    setTelFijo("");
    setTelMovil("");
  };
  const handleIdAgenda=(element)=>{
    const {id}=element
    setIdAgenda(id)
  }
  const deleteElement=async ()=>{
    const res = await axios.delete(`http://localhost:3000/api/agenda/${idAgenda}`);
    if(res.status===200){
        setIdAgenda("")
        window.location.reload()
    }else{
        setIdAgenda("")
        alert("oppps... ocurrio un error")
    }
  }
  const handleUpdate=async()=>{
    const updateAgenda={
        nombre:nombre,
        correo:correo,
        tlf_fijo:telFijo,
        tlf_movil:telMovil
    }
    try {
        const res = await axios.put(`http://localhost:3000/api/agenda/${idAgenda}`, updateAgenda);
        if(res.status===200){
            setNombre("");
            setCorreo("");
            setTelFijo("");
            setTelMovil("");
            window.location.reload()
        }
    } catch (error) {
        alert("oooops... ocurrio un error")
    }
  }

  useEffect(() => {
    getTasksRequest();
  }, []);

  return (
    <div>
      {agendas.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <h1>Oopss.. no hay agendas aun</h1>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Telefono fijo</th>
                  <th scope="col">Telefono movil</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {agendas.map((element, index) => (
                  <tr key={index}>
                    <td>{element.id}</td>
                    <td>{element.nombre}</td>
                    <td>{element.correo}</td>
                    <td>{element.tlf_fijo}</td>
                    <td>{element.tlf_movil}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleModalEdit(element)}
                      >
                        Editar
                      </button>
                      <button type="button" className="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>handleIdAgenda(element)}>eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Editar Registro
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-1">
                      <label htmlFor="name" className="col-form-label">
                        Nombres:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        onChange={(e) => handleNombre(e)}
                        value={nombre}
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="email" className="col-form-label">
                        Correo-e:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        onChange={(e) => handleCorreo(e)}
                        value={correo}
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="tel-fijo" className="col-form-label">
                        Telefono fijo:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tel-fijo"
                        onChange={(e) => handleTelFijo(e)}
                        value={telFijo}
                      />
                    </div>
                    <div className="mb-1">
                      <label htmlFor="tel-movil" className="col-form-label">
                        Telefono movil:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tel-movil"
                        onChange={(e) => handleTelMovil(e)}
                        value={telMovil}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => delModal()}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleUpdate()}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirmacion eliminar</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Esta seguro que quiere eliminar el elemento seleccionado?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-danger" onClick={()=>deleteElement()}>Eliminar</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ListadoTotal;
