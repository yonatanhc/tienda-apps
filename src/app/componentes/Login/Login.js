import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { USER_STORAGE, USER_STORAGE_CARD } from "../../utils/contants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.scss";
function Login(props) {
  const { getUser, cambiarTipoDeUsuario } = props;
  const [datos, setDatos] = useState({
    email: " ",
    password: " ",
  });
  const [validar, setValidar] = useState(false);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const validarDatos = () => {
    if (datos.email == " " || datos.password == " ") {
      setValidar(false);
    } else {
      setValidar(true);
    }
  };

  const login = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status != 422) {
      const jsons = await res.json();
      sessionStorage.setItem(USER_STORAGE, JSON.stringify(jsons));
      sessionStorage.setItem(USER_STORAGE_CARD, jsons.apps);
      getUser();

      props.history.push("/");
    } else {
      const jsons = await res.json();
      console.log(jsons.errors);
      toast.success(jsons.errors);
    }
  };

  return (
    <>
      <Form className="col form-login" onSubmit={login}>
        <div className="col-md-3">
          Email:
          <input
            placeholder="ingrese Email"
            className="form-control"
            type="text"
            name="email"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          Password:
          <input
            placeholder="ingrese contraseña"
            className="form-control"
            type="password"
            name="password"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
        </div>
      </Form>
      <Link to="registrarse">
        <Button className="registrarse" variant="outline-primary">
          Registrarse
        </Button>
      </Link>
    </>
  );
}

export default withRouter(Login);
