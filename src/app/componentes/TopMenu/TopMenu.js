import React, { useState, useEffect } from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClickModal from "../ClickModal";
import ModalFlotante from "../ModalFlotante";
import "./TopMenu.scss";
export default function TopMenu(props) {
  const { card, getProductCart, user, esCliente, actualizarCard } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <BrandNav />

      {!user ? (
        <div className="top-menu_login">
          <Link to="/login">
            <Button>login</Button>
          </Link>
        </div>
      ) : (
        <EsDesarrollador
          card={card}
          getProductCart={getProductCart}
          user={user}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          esCliente={esCliente}
          actualizarCard={actualizarCard}
        />
      )}
    </Navbar>
  );
}
function BrandNav() {
  return <Navbar.Brand>Tienda de Aplicaciones</Navbar.Brand>;
}

function EsDesarrollador(props) {
  const {
    card,
    getProductCart,
    user,
    show,
    handleClose,
    handleShow,
    esCliente,
    actualizarCard,
  } = props;

  const title = "Alta de aplicacion";
  const altaApp = true;
  return (
    <>
      <ClickModal card={card} getProductCart={getProductCart} user={user} />
      {!esCliente ? (
        <>
          <div className="top-menu_alta">
            <Button variant="primary" onClick={handleShow}>
              Alta App
            </Button>
          </div>
          <ModalFlotante
            show={show}
            handleClose={handleClose}
            altaApp={altaApp}
            title={title}
            actualizarCard={actualizarCard}
          />
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}
