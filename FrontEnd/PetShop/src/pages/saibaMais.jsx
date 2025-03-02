import React from "react";
import { Link } from "react-router-dom";

const SaibaMais = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Saiba Mais</h1>
        <p className="text-lg mb-4">
          Nosso sistema oferece rastreamento seguro e em tempo real do seu pet utilizando QR Code. Basta escanear o código com seu smartphone para acessar as informações do seu amigo de forma rápida e prática.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-700">Como funciona?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Cadastre-se em nossa plataforma.</li>
          <li>Registre seu pet e gere um QR Code exclusivo.</li>
          <li>Fixe o QR Code na coleira do seu pet.</li>
          <li>Qualquer pessoa que encontrar seu pet pode escanear o código e acessar suas informações.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-700">Benefícios</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Localização rápida e eficiente.</li>
          <li>Informações do pet sempre acessíveis.</li>
          <li>Maior segurança para o seu amigo de estimação.</li>
          <li>Fácil de usar e totalmente gratuito.</li>
        </ul>
        <div className="mt-6 text-center gap-2 flex-col sm:flex sm:flex-row justify-center">
          <Link
            to="/CadastroClient"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition w-52">
            Cadastre-se Agora
          </Link>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition capitalize w-52">
              voltar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SaibaMais;