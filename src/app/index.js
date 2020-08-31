import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@babel/polyfill";
import { USER_STORAGE_CARD, USER_STORAGE } from "../app/utils/contants";
import { ToastContainer, toast } from "react-toastify";
import TopMenu from "./componentes/TopMenu";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Perfil from "./componentes/Perfil";
import Registrarse from "./componentes/Registrarse";
import Error404 from "./pages/Error404";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [card, setCard] = useState([]);
  const [user, setUser] = useState(null);
  const [esCliente, setEsCliente] = useState(true);

  const cambiarTipoDeUsuario = () => {
    if (user) {
      if (user.tipo == "desarrollador") {
        setEsCliente(false);
      }
    }
  };

  const getUser = () => {
    const newUser = sessionStorage.getItem(USER_STORAGE);
    setUser(JSON.parse(newUser));
    cambiarTipoDeUsuario();
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    cambiarTipoDeUsuario();
  }, [user]);

  const getProductCart = () => {
    const newCard = sessionStorage.getItem(USER_STORAGE_CARD);
    if (newCard) {
      const cardSplit = newCard.split(",");
      setCard(cardSplit);
    } else {
      setCard([]);
    }
  };
  const actualizarCard = (id) => {
    const listCard = card;
    listCard.push(id);
    setCard(listCard);
    sessionStorage.setItem(USER_STORAGE_CARD, card);
    getProductCart();

    toast.success("App comprada correctamente");
  };

  return (
    <div>
      <Router>
        <TopMenu
          card={card}
          getProductCart={getProductCart}
          user={user}
          esCliente={esCliente}
          actualizarCard={actualizarCard}
        />
        <Switch>
          <Route path="/" exact={true}>
            <Home
              actualizarCard={actualizarCard}
              esCliente={esCliente}
              user={user}
            />
          </Route>
          <Route path="/login" exact={true}>
            <Login
              getUser={getUser}
              cambiarTipoDeUsuario={cambiarTipoDeUsuario}
            />
          </Route>
          <Route path="/registrarse" exact={true}>
            <Registrarse />
          </Route>
          <Route path="/perfil" exact={true}>
            <Perfil
              card={card}
              getProductCart={getProductCart}
              user={user}
              esCliente={esCliente}
            />
          </Route>
          <Route path="*" exact={true}>
            <Error404 />
          </Route>
        </Switch>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

render(<App />, document.getElementById("app"));
