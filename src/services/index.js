import axios from "axios";

import { login } from "./authService";
import {
  createEmpleado,
  getEmpleados,
  editEmpleado,
  deleteEmpleado,
} from "./empleadosService";

const isBearerTokenRequired = (url) => {
  const parsedUrl = new URL(url);
  const publicRoutes = ["/users/login", "/users"];

  if (publicRoutes.includes(parsedUrl.pathname)) {
    return false;
  } else {
    return true;
  }
};

axios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("peixateriaToken"));

    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    //arreglar aqui
    /*   if(response.data){
        //arreglar aqui
            localStorage.setItem("currentUser", JSON.stringify(response.data))
        } */
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.request.status === 403) {
      console.log("Usuario o contraseña incorrecto");
    }

    return Promise.reject(error);
  }
);

export { login, createEmpleado, getEmpleados, editEmpleado, deleteEmpleado };
