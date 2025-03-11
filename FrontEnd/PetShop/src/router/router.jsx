import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "../pages/login";
import CadastroClient from "../pages/cadastroClient";
import PetRegistration from "../pages/petRegistration";
import RecoverPassword from "../pages/recoverPassword";
import Home from "../pages/home";
import Contato from "../pages/contato";
import SaibaMais from "../pages/saibaMais";
import { useAuthentication } from "../context/AuthContext";
import ListPets from "../pages/ListPets";
import QRCodeGenerator from "../pages/QRCodeGenerator";
import PetFoundPage from "../pages/PetFoundPage";

export const ProtectedRoute = ({ children }) => {
    const { token } = useAuthentication();
    if (!token) {
        return <Navigate to="/Login" />;
    }
    return children;
};

const RoutesOfPage = () => {
    return (
        <Routes>
            <Route element={<Navigate to="/"/>}/>
            <Route element={<Home/>} path="/" exact />
            <Route element={<Contato/>} path="/Contato" exact />
            <Route element={<SaibaMais />} path="/SaibaMais" exact />
            <Route element={<RecoverPassword />} path="/RecoverPassword" exact />
            <Route element={<CadastroClient />} path="/CadastroClient" />
            <Route element={
                <ProtectedRoute >
                    <PetRegistration />
                </ProtectedRoute>
            } path="/PetRegistration" />
            <Route 
                element={
                    <ProtectedRoute >
                        <ListPets />
                    </ProtectedRoute>
                }
                path="/animais"
            />
            <Route 
                element={
                    <ProtectedRoute>
                        <QRCodeGenerator />
                    </ProtectedRoute>
                }
                path="/gerar-qrcode"
            />
            {/* Rota pública para quando alguém escaneia o QR Code */}
            <Route element={<PetFoundPage />} path="/public/pet/find/:hashCode" />
            <Route element={<Login />} path="/Login" />
        </Routes>
    )
}

export default RoutesOfPage;