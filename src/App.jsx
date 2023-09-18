import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./App.css";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import SideBar from "./components/sidebar/SideBar";
import Empleados from "./pages/Empleados";
import Clientes from "./pages/Clientes";
import Proyectos from "./pages/Proyectos";
import useNivel from "./hooks/useNivel";
import useEmpleados from "./hooks/useEmpleados";
import useClientes from "./hooks/useClientes";
import Etiquetas from "./pages/Etiquetas";
import useEtiquetas from "./hooks/useEtiquetas";
import useProyectos from "./hooks/useProyectos";
import ProyectoDetalle from "./pages/ProyectoDetalle";

function App() {
  const { setToken, setUser, token } = useContext(AuthContext);
  const { nivel, loading, error } = useNivel();
  const { empleados, setEmpleados } = useEmpleados();
  const { clientes, setClientes } = useClientes();
  const { etiquetas, setEtiquetas } = useEtiquetas();
  const { proyectos, setProyectos } = useProyectos();

  const [idProyecto, setIdProyecto] = useState();

  return (
    <>
      <div className="app-container">
        <Header />
        {token && <SideBar nivel={nivel} />}
        {!token && <Login />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/empleados"
            element={
              <Empleados empleados={empleados} setEmpleados={setEmpleados} />
            }
          />
          <Route
            path="/clientes"
            element={
              <Clientes
                clientes={clientes}
                setClientes={setClientes}
                nivel={nivel}
              />
            }
          />
          <Route
            path="/etiquetas"
            element={
              <Etiquetas
                etiquetas={etiquetas}
                setEtiquetas={setEtiquetas}
                nivel={nivel}
              />
            }
          />
          <Route
            path="/proyectos"
            element={
              <Proyectos
                proyectos={proyectos}
                setProyectos={setProyectos}
                nivel={nivel}
                idProyecto={idProyecto}
                setIdProyecto={setIdProyecto}
              />
            }
          />

          <Route
            path="/proyectoDetalle"
            element={
              <ProyectoDetalle
                proyectos={proyectos}
                nivel={nivel}
                idProyecto={idProyecto}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
