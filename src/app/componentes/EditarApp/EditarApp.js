import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./EditarApp.scss";
export default function EditarApp(props) {
  const { id, handleClose } = props;

  const [datos, setDatos] = useState({
    id: id,
    nombre: " ",
    precio: " ",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const guardarApp = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/actualizarapp", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsons = await res.json();
    toast.success("Aplicación editado correctamente");
    handleClose();
    window.location.reload();
  };

  return (
    <Form onSubmit={guardarApp} className="editar-form">
      <div className="editar-form-input">
        <h4>Nombre:</h4>
        <input
          placeholder="ingrese nombre"
          type="text"
          name="nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="editar-form-input">
        <h4>Precio:</h4>
        <input
          placeholder="ingrese precio"
          type="number"
          min="0"
          name="precio"
          onChange={handleInputChange}
        />
      </div>

      <Button variant="primary" type="submit" className="editar-form-button">
        Guardar
      </Button>
    </Form>
  );
}
