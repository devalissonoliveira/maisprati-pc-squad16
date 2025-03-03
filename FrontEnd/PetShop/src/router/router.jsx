import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/login";
import CadastroClient from "../pages/cadastroClient";
import PetRegistration from "../pages/petRegistration";
import RecoverPassword from "../pages/recoverPassword";
import Home from "../pages/home";
import Contato from "../pages/contato";
import SaibaMais from "../pages/saibaMais";
import { useAuthentication } from "../context/AuthContext";
export const ProtectedRoute = ({ children }) => {
    const { token } = useAuthentication();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};
const RoutesOfPage = () => {
    return (
        <Routes>
            <Route element={
                <Home />
            } path="/" exact />
            <Route element={< Contato />} path="/Contato" exact />
            <Route element={<SaibaMais />} path="/SaibaMais" exact />
            <Route element={<RecoverPassword />} path="/RecoverPassword" exact />
            <Route element={<CadastroClient />} path="/CadastroClient" />
            <Route element={
                <ProtectedRoute >
                    <PetRegistration />
                </ProtectedRoute>
            } path="/PetRegistration" />
            <Route element={<Login />} path="/login" />
        </Routes>
    )
}

export default RoutesOfPage;