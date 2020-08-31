import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Perfil from "../Perfil";
import { Link, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ClickModal.scss";
function ClickModal(props) {
  const { card, getProductCart, user } = props;
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    getProductCart();
  }, []);

  const widthCartContent = cartOpen ? 400 : 0;
  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const cerrarSesion = async (event) => {
    event.preventDefault();
    user.apps = card;
    const res = await fetch("/actualizaruser", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(user), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      sessionStorage.clear();
    }
    toast.success("Cerrando Sesion ......");
    window.location.reload();
  };

  return (
    <>
      <div className="top-menu_h2">Bienvenido {user.nombre}</div>
      <div className="top-menu_cuenta">
        <Button variant="link" onClick={openCart}>
          Mis Apps
        </Button>
      </div>
      <div className="top-menu_close">
        <Button variant="outline-primary" onClick={() => cerrarSesion(event)}>
          Cerrar Sesion
        </Button>
      </div>

      <div className="cart-content" style={{ width: widthCartContent }}>
        <div onClick={closeCart}>
          <Button>cerrar</Button>
        </div>

        <Perfil card={card} getProductCart={getProductCart} user={user} />
      </div>
    </>
  );
}
export default withRouter(ClickModal);
