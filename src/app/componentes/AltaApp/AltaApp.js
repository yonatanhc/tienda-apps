import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AltaApp.scss";

export default function AltaApp(props) {
  const { actualizarCard } = props;
  const [datos, setDatos] = useState({
    categoria: " ",
    nombre: " ",
    precio: " ",
    imagen: " ",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const guardarApp = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/setapp", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const rest = await fetch(
        "http://localhost:3000/buscarnombre?nombre=" + datos.nombre
      );

      const jsons = await rest.json();
      actualizarCard(jsons.id_app);
      toast.success("Aplicación guardado correctamente");
      window.location.reload();
    }
  };

  return (
    <Form className="col altaApp" onSubmit={guardarApp}>
      <div className="col-md-3">
        Categoria:
        <input
          placeholder="ingrese categoria"
          className="form-control"
          type="text"
          name="categoria"
          onChange={handleInputChange}
        ></input>
      </div>
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
        Precio:
        <input
          className="form-control"
          placeholder="ingrese precio"
          type="number"
          name="precio"
          min="0"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="col-md-3">
        Imagen:
        <input
          className="form-control"
          placeholder="ingrese imagen"
          type="text"
          name="imagen"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="col-md-3">
        <button className="btn btn-primary" type="submit">
          Alta de Aplicacion
        </button>
      </div>
    </Form>
  );
}
