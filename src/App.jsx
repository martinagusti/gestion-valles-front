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

function App() {
  const { setToken, setUser, token } = useContext(AuthContext);
  const { nivel, loading, error } = useNivel();
  const { empleados, setEmpleados } = useEmpleados();

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
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
