import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./proyectos.css";

import { AuthContext } from "../context/AuthContext";
import { createProyecto, getProyectosByIdProyecto } from "../services";

function Proyectos({
  proyectos,
  setProyectos,
  nivel,
  idProyecto,
  setIdProyecto,
  clientes,
  etiquetas,
  setEmpleadosAsignados,
}) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();
  const [viewInsertProyecto, setViewInsertProyecto] = useState(false);

  const navigateTo = useNavigate();

  console.log(proyectos);
  console.log(etiquetas);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    const {
      nombre,
      cliente,
      etiqueta,
      comentarios,
      fecha_inicio,
      fecha_entrega,
    } = data;

    try {
      const created = await createProyecto(
        cliente,
        nombre,
        comentarios,
        fecha_inicio,
        fecha_entrega,
        etiqueta
      );

      let etiqueta_nombre = etiquetas.filter((element) => {
        return element.id == etiqueta;
      });
      etiqueta_nombre = etiqueta_nombre[0].nombre;
      created[0].etiqueta_nombre = etiqueta_nombre;

      let cliente_nombre = clientes.filter((element) => {
        return element.id == cliente;
      });
      cliente_nombre = cliente_nombre[0].nombre;
      created[0].cliente_nombre = cliente_nombre;

      setProyectos([created[0], ...proyectos]);
      reset();
      setViewInsertProyecto(false);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  console.log(etiquetas);

  return (
    <div className="proyectos-container">
      {nivel !== "empleado" && (
        <button onClick={() => setViewInsertProyecto(true)}>
          NUEVO PROYECTO
        </button>
      )}

      <div className="contenedor-proyectos">
        {proyectos.map((element, index) => {
          return (
            <div className="proyectos-box" key={index}>
              <div
                onClick={async () => {
                  setIdProyecto(element.id);
                  navigateTo("/proyectoDetalle");
                  setEmpleadosAsignados(
                    await getProyectosByIdProyecto(element.id)
                  );
                }}
              >
                <label>Nombre Cliente</label>
                <h1>{element.nombre}</h1>
                <label>Cliente</label>
                <h1>{element.cliente_nombre}</h1>
                <label>Etiqueta</label>
                <h1>{element.etiqueta_nombre}</h1>
              </div>
            </div>
          );
        })}
      </div>
      {viewInsertProyecto && (
        <div className="empleado-create-modal-container">
          <div className="empleado-create-modal">
            <form
              className="empleado-form-container"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>Nombre Proyecto</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                {...register("nombre", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Cliente</label>
              <select
                name="cliente"
                id="cliente"
                {...register("cliente", {
                  required: true,
                })}
              >
                {clientes.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.nombre}
                    </option>
                  );
                })}
              </select>

              {errors.cliente?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Etiqueta</label>
              <select
                name="etiqueta"
                id="etiqueta"
                {...register("etiqueta", {
                  required: true,
                })}
              >
                {etiquetas.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.nombre}
                    </option>
                  );
                })}
              </select>

              {errors.etiqueta?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Comentarios</label>
              <input
                type="text"
                id="comentarios"
                placeholder="Comentarios"
                {...register("comentarios", {
                  required: true,
                })}
              />
              {errors.comentarios?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Fecha Inicio</label>
              <input
                type="date"
                id="fecha_inicio"
                {...register("fecha_inicio", {
                  required: true,
                })}
              />
              {errors.fecha_inicio?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Fecha Entrega</label>
              <input
                type="date"
                id="fecha_entrega"
                {...register("fecha_entrega", {
                  required: true,
                })}
              />
              {errors.fecha_entrega?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <div className="modal-actions">
                <button type="submit">CREAR</button>
                <button
                  type="button"
                  onClick={() => {
                    setViewInsertProyecto(false);
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

export default Proyectos;
