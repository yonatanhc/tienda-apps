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
    email: "",
    password: "",
  });

  const typeToast = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      const jsons = await res.json();
      sessionStorage.setItem(USER_STORAGE, JSON.stringify(jsons));
      sessionStorage.setItem(USER_STORAGE_CARD, jsons.apps);
      getUser();

      props.history.push("/");
    }
    const err = (await res.json()).errors;
    if (res.status == 422) {
      err.map((typeErr, index) => {
        const msjError = "Escriba un " + typeErr.param + " válido";
        toast.error(msjError, typeToast);
      });
    } else {
      toast.error(err, typeToast);
    }
  };

  return (
    <div className="login">
      <Form onSubmit={login} className="col-md-8 form-login">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escriba email"
            name="email"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
      <div className="login-register">
        <Link to="registrarse">
          <Button variant="outline-primary">Registrarse</Button>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
