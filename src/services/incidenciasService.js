import axios from "axios";

export const getIncidencias = async () => {
  const incidencias = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/incidencias`
  );

  return incidencias.data;
};
