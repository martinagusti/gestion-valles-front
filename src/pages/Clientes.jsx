import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./clientes.css";

import { AuthContext } from "../context/AuthContext";

function Clientes() {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();

  const navigateTo = useNavigate();

  return <div className="clientes-container"></div>;
}

export default Clientes;
