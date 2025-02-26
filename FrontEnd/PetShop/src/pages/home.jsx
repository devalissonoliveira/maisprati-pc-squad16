import React from "react";
import { Link } from "react-router-dom";
import { PiUserFocusDuotone } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { FaHandshake } from "react-icons/fa";


const Home = () => {
  return (
    <>
      <main className="h-screen">
        <article className="w-full flex items-center justify-center">
          <Link to="/CadastroClient" className="capitelize text-blue-500 px-3 py-2 rounded-md  bg-yellow-500 hover:bg-yellow-400">Cadastre-se agora</Link>
          <Link to="/CadastroClient" className="capitelize text-white px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-400 ">saiba mais</Link>
        </article>
        {/* <article className=" flex sm:flex-row max-sm: flex-col items-center justify-center"> */}
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900"><span className="capitalize">por</span> que usar o <span className="capitalize">encontre meu pet?</span></h2>
          {/* RESOLVER A QUESTAO DO ALINHAMENTO AQUI*/}
          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div class="bg-gray-300 rounded-xl h-60 flex flex-col items-center justify-center">
              <FaHandshake className="size-[25%]"/>
              <div class="mt-4 text-center">
                  <p class="text-sm text-gray-700">
                    <a href="#" className="font-semibold text-blue-600">
                      <span className="capitalize">fácil</span> de usar
                    </a>
                  </p>
                  <p class="text-sm text-gray-700">
                      Cadastro rápido e intuitivo para você proteger seu pet
                  </p>
              </div>
            </div> 

            <div class="bg-gray-300 rounded-xl h-60 flex flex-col items-center justify-center">
              <PiUserFocusDuotone className="size-[25%]"/>
              <div class="mt-4 text-center">
                  <p class="text-sm text-gray-700">
                    <a href="#" className="font-semibold text-blue-600">
                      <span className="capitalize">Rastreamento Seguro</span>
                    </a>
                  </p>
                  <p class="text-sm text-gray-700">
                    QR Code exclusivo garante que você saiba onde seu pet está
                  </p>
              </div>
            </div>
            
            <div class="bg-gray-300 h-60 rounded-xl flex flex-col items-center justify-center">
              <GrMapLocation className="size-[25%]"/>
              <div class="mt-4 text-center">
                  <p class="text-sm text-gray-700">
                    <a href="#" className="font-semibold text-blue-600">
                      <span className="capitalize">Conexão</span> direta
                    </a>
                  </p>
                  <p class="text-sm text-gray-700">
                    Receba notificações em tempo real ao escanearem o QR Code.
                  </p>
              </div>
            </div>

            {/* <!-- More products... --> */}
          </div>
        </div>
      {/* </article> */}
      </main>
      {/* footer tem o tamanho de 72px */}
      <footer className="bg-blue-500 w-full h-16 py-2 text-center text-white fixed bottom-0">
        <p>&#x24B8;<span className="capitalize">encontre meu pet.</span> <span className="capitalize">todos</span> os direitos reservados.</p>
        <p className="flex items-center justify-center">
          <Link><span className="capitalize">termos</span> de <span className="capitalize">uso</span> | </Link>
          <Link><span className="capitalize"> politica</span> de <span className="capitalize">privacdade</span></Link>
        </p>
      </footer>
    </>
  );
}

export default Home;