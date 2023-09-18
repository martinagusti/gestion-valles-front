import axios from "axios";

export const getProyectos = async () => {
  const proyectos = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/proyectos`
  );

  return proyectos.data;
};

export const getProyectosById = async (id) => {
  const proyectos = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/proyectos/user/${id}`
  );

  return proyectos.data;
};

export const getProyectosByIdProyecto = async (id) => {
  const proyectos = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/proyectos/proyectoId/${id}`
  );

  return proyectos.data;
};
