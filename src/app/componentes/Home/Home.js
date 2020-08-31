import React from "react";
import useFetch from "../../hooks/useFetch";
import Aplicacion from "../../componentes/Aplicacion";
import Loading from "../../componentes/Loading";
import { Container, Row } from "react-bootstrap";

export default function Home(props) {
  const { actualizarCard, esCliente, user } = props;
  const res = useFetch("http://localhost:3000/listar");

  return (
    <Container>
      <Row>
        {res.loading || !res.result ? (
          <Loading />
        ) : (
          res.result.map((product, index) => (
            <Aplicacion
              key={index}
              app={product}
              actualizarCard={actualizarCard}
              esCliente={esCliente}
              user={user}
            />
          ))
        )}
      </Row>
    </Container>
  );
}
