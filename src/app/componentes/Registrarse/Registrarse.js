import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, withRouter } from "react-router-dom";

import "./Registrarse.scss";

function Registrarse(props) {
  const [datos, setDatos] = useState({
    email: " ",
    password: " ",
    nombre: " ",
    tipo: " ",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/saveuser", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 422) {
      console.log(res);
      const jsons = await res.json();
      console.log(jsons);
      toast.success(jsons.errors);
      props.history.push("/");
    } else {
      toast.success("usuario registrado");
      props.history.push("/login");
    }
  };

  return (
    <Form className="col register" onSubmit={enviarDatos}>
      <div className="col-md-3">
        Nombre:
        <input
          placeholder="ingrese nombre"
          className="form-control"
          type="text"
          name="nombre"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="col-md-3">
        Email:
        <input
          placeholder="ingrese Email"
          className="form-control"
          type="email"
          name="email"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="col-md-3">
        Contraseña:
        <input
          placeholder="ingrese contraseña"
          className="form-control"
          type="password"
          name="password"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="col-md-3">
        Tipo de Usuario:
        <select
          className="form-control"
          name="tipo"
          onChange={handleInputChange}
          required
        >
          <option value="">None</option>
          <option value="cliente">cliente</option>

          <option value="desarrollador">desarrollador</option>
        </select>
      </div>
      <div className="col-md-3">
        <button className="btn btn-primary button" type="submit">
          Guardar
        </button>
      </div>
    </Form>
  );
}

export default withRouter(Registrarse);
