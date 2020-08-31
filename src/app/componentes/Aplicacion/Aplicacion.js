import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

import ModalFlotante from "../ModalFlotante";

import "./Aplicacion.scss";
export default function Aplicacion(props) {
  const [show, setShow] = useState(false);
  const {
    app: { id_app, categoria, nombre, precio, imagen },
    actualizarCard,
    esCliente,
    user,
  } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>Categoria: {categoria}</Card.Text>
        <Card.Text> Precio: $ {precio}</Card.Text>

        {!user ? (
          <p></p>
        ) : (
          <MostrarButton
            esCliente={esCliente}
            id={id_app}
            show={show}
            handleClose={handleClose}
            actualizarCard={actualizarCard}
            handleShow={handleShow}
          />
        )}
      </Card.Body>
    </Card>
  );
}
function MostrarButton(props) {
  const {
    esCliente,
    show,
    id,
    handleClose,
    actualizarCard,
    handleShow,
  } = props;
  const altaApp = false;
  return (
    <>
      {esCliente ? (
        <Button variant="primary" onClick={() => actualizarCard(id)}>
          comprar
        </Button>
      ) : (
        <>
          <Button variant="primary" onClick={handleShow}>
            editar
          </Button>
          <ModalFlotante
            show={show}
            id={id}
            handleClose={handleClose}
            altaApp={altaApp}
          />
        </>
      )}
    </>
  );
}
