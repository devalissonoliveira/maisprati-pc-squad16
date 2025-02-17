import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../pages/login";
import CadastroClient from "../pages/cadastroClient";
import PetRegistration from "../pages/petRegistration";

const RoutesOfPage = () => {
   return(
       <BrowserRouter>
            <Routes>
                <Route Component = { Login }  path="/" exact />
                <Route Component = { CadastroClient }  path="/CadastroClient" />
                <Route Component = { PetRegistration }  path="/PetRegistration" />
            </Routes>
       </BrowserRouter>
   )
}

export default RoutesOfPage;