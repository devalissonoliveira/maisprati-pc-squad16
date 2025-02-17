import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/petRegistration";
import CadastroClient from "./pages/cadastroClient";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            <a href="#logo" className="hover:text-blue-700">
              MinhaLogo
            </a>
          </div>
          <nav className="flex items-center pl-10 justify-between text-blue-950 max-sm:hidden">
            {/* Links do lado esquerdo */}
            <ul className="flex text-end space-x-6">
              <li>
                <a href="#home" className="hover:text-blue-700">
                  Home
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-blue-700">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#plano" className="hover:text-blue-700">
                  Plano
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-blue-700">
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <div className="sm:hidden">
            <button onClick={toggleMenu}>
              {/* Exibe o ícone de hambúrguer ou "X" dependendo do estado */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          {/* section menu escondido */}
          {isMenuOpen && (
            <aside
              className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out 
              ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } md:hidden backdrop-blur-sm`}
            >
              <div className="absolute top-5 left-5">
                <button
                  onClick={toggleMenu}
                  id="closeHamburgue"
                  className="text-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col space-x-10 space-y-5 pt-6 pb-20 px-6 bg-slate-400">
                <li className="ml-10">
                  <a href="#home" className="hover:text-blue-700 text-center">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#como-funciona"
                    className="hover:text-blue-700 text-center"
                  >
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#plano" className="hover:text-blue-700 text-center">
                    Plano
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="hover:text-blue-700 text-center"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </aside>
          )}
          {/* section menu escondido */}
        </div>
      </section>
      <Login />
      {/* <Register/> */}
      {/* <CadastroClient/> */}
    </>
  );
}

export default App;
