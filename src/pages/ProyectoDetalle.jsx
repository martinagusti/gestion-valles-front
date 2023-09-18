import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./proyectoDetalle.css";

import { AuthContext } from "../context/AuthContext";
import { getProyectosByIdProyecto } from "../services";

function ProyectoDetalle({ proyectos, idProyecto }) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();

  const navigateTo = useNavigate();

  proyectos = proyectos.filter((element) => {
    return element.id === idProyecto;
  });

  const getEmpleados = async () => {
    const data = await getProyectosByIdProyecto(idProyecto);
    data.map((element) => {
      console.log(`${element.nombre} ${element.apellido}`);
    });
  };

  getEmpleados();

  return (
    <div className="proyectoDetalle-container">
      {proyectos.map((element, index) => {
        return (
          <div key={index}>
            <h2>{element.nombre}</h2>
            <h2>{element.cliente_nombre}</h2>
            <h2>{element.etiqueta_nombre}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default ProyectoDetalle;
