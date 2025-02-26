import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/login";
import CadastroClient from "../pages/cadastroClient";
import PetRegistration from "../pages/petRegistration";
import RecoverPassword from "../pages/recoverPassword";
import Home from "../pages/home";

const RoutesOfPage = () => {
   return(
            <Routes>
                <Route Component = { Home }  path="/" exact />
                <Route Component = { RecoverPassword }  path="/RecoverPassword" exact />
                <Route Component = { CadastroClient }  path="/CadastroClient" />
                <Route Component = { PetRegistration }  path="/PetRegistration" />
            </Routes>
   )
}

export default RoutesOfPage;