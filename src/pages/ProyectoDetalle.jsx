import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./proyectoDetalle.css";

import { AuthContext } from "../context/AuthContext";
import { getProyectosByIdProyecto } from "../services";
import { createEmpleadoAsignado } from "../services/proyectosService";

function ProyectoDetalle({
  proyectos,
  idProyecto,
  empleadosAsignados,
  setEmpleadosAsignados,
  empleados,
  nivel,
}) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();
  const [viewInsertEmpleado, setViewInsertEmpleado] = useState();

  const navigateTo = useNavigate();

  proyectos = proyectos.filter((element) => {
    return element.id === idProyecto;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    const { empleado } = data;

    try {
      const created = await createEmpleadoAsignado(idProyecto, empleado);
      console.log(created);

      let empleadoData = empleados.filter((element) => {
        return element.id == empleado;
      });

      console.log(empleadoData);

      created[0].nombre = empleadoData[0].nombre;
      created[0].apellido = empleadoData[0].apellido;
      created[0].nivel = empleadoData[0].nivel;

      setEmpleadosAsignados([created[0], ...empleadosAsignados]);
      reset();
      setViewInsertEmpleado(false);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  console.log(empleados);

  return (
    <div className="proyectoDetalle-container">
      {proyectos.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element.nombre}</h2>
            <h2>{element.cliente_nombre}</h2>
            <h2>{element.etiqueta_nombre}</h2>
            {nivel !== "empleado" && (
              <div className="box-table-content">
                <label>Empleados Asignados al Proyecto</label>

                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Nivel</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {empleadosAsignados?.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{element.nombre}</td>
                          <td>{element.apellido}</td>
                          <td>{element.nivel}</td>

                          <td>
                            <button
                              onClick={() => deleteEmpleadoFunction(element)}
                              className="empleados-btn-eliminar"
                            ></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button onClick={() => setViewInsertEmpleado(true)}>
                  AGREGAR
                </button>
              </div>
            )}
          </div>
        );
      })}
      {viewInsertEmpleado && (
        <div className="etiqueta-create-modal-container">
          <div className="etiqueta-create-modal">
            <form
              className="etiqueta-form-container"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <select
                name="empleado"
                id="empleado"
                {...register("empleado", {
                  required: true,
                })}
              >
                {empleados.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.nombre} {element.apellido}
                    </option>
                  );
                })}
              </select>

              {errors.empleado?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <div className="modal-actions">
                <button type="submit">CREAR</button>
                <button
                  type="button"
                  onClick={() => {
                    setViewInsertEmpleado(false);
                    setErrorText(null);
                  }}
                >
                  CANCELAR
                </button>
              </div>
              {errorText && <span>{errorText}</span>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProyectoDetalle;
