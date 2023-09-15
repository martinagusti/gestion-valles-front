import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./proyectos.css";

import { AuthContext } from "../context/AuthContext";

function Proyectos() {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();

  const navigateTo = useNavigate();

  return <div className="proyectos-container"></div>;
}

export default Proyectos;
