import React, { useEffect, useState } from "react";
import { USER_STORAGE_CARD, USER_STORAGE } from "../../utils/contants";
import Loading from "../../componentes/Loading";
import useFetch from "../../hooks/useFetch";
import { Button, Image } from "react-bootstrap";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../utils/arrayFunc";
import "./Perfil.scss";

export default function Perfil(props) {
  const { card, getProductCart, user } = props;

  const [singelProductsCart, setSingelProductsCart] = useState([]);

  useEffect(() => {
    const arrayCard = removeArrayDuplicates(card);
    setSingelProductsCart(arrayCard);
  }, [card]);

  const deleteCart = (id) => {
    const arrayItemsCart = singelProductsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    sessionStorage.setItem(USER_STORAGE_CARD, result);
    getProductCart();
  };

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <ListaCarrito allCarrito={singelProductsCart} deleteCart={deleteCart} />
      )}
    </>
  );
}

function ListaCarrito(props) {
  const { allCarrito, deleteCart } = props;
  console.log(allCarrito.length);
  if (allCarrito.length == 0) {
    return <h2>carrito vacio</h2>;
  } else {
    return allCarrito.map((idApp, index) => {
      return <ContentApp key={index} idApp={idApp} deleteCart={deleteCart} />;
    });
  }
}

function ContentApp(props) {
  const { idApp, deleteCart } = props;
  const res = useFetch("http://localhost:3000/buscar?idapp=" + idApp);
  console.log(res);
  return (
    <div>
      {!res.result || res.loading ? (
        <Loading />
      ) : (
        <div className="content-app">
          <div className="content-app_img">
            <Image src={res.result[0].imagen} roundedCircle />
          </div>

          <div className="content-app_name">
            <h5>{res.result[0].nombre}</h5>
          </div>
          <div className="content-app_button">
            <Button
              variant="outline-danger"
              onClick={() => deleteCart(res.result[0].id_app)}
            >
              eliminar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
