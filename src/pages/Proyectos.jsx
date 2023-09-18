import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./proyectos.css";

import { AuthContext } from "../context/AuthContext";

function Proyectos({
  proyectos,
  setProyectos,
  nivel,
  idProyecto,
  setIdProyecto,
}) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();

  const navigateTo = useNavigate();

  console.log(proyectos);

  return (
    <div className="proyectos-container">
      {nivel !== "empleado" && <button>NUEVO PROYECTO</button>}

      <div className="contenedor-proyectos">
        {proyectos.map((element, index) => {
          return (
            <div className="proyectos-box" key={index}>
              <div
                onClick={() => {
                  setIdProyecto(element.id);
                  navigateTo("/proyectoDetalle");
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
    </div>
  );
}

export default Proyectos;
