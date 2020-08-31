import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import EditarApp from "../EditarApp";
import AltaApp from "../AltaApp";

export default function ModalFlotante(props) {
  const { show, id, handleClose, altaApp, title, actualizarCard } = props;

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {altaApp ? (
          <AltaApp actualizarCard={actualizarCard} />
        ) : (
          <EditarApp id={id} handleClose={handleClose} />
        )}
      </Modal.Body>
    </Modal>
  );
}
