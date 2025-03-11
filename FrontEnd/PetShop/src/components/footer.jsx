import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-800 text-xs sm:text-sm w-full h-14 py-2 text-center text-white">
        <p>
          &#x24B8;<span className="capitalize">encontre meu pet.</span>{" "}
          <span className="capitalize">todos</span> os direitos reservados.
        </p>
        <p className="flex items-center justify-center text-xs sm:text-sm ">
          <a>
            <span className="capitalize">termos</span> de{" "}
            <span className="capitalize">uso</span> |{" "}
          </a>
          <a>
            <span className="capitalize"> politica</span> de{" "}
            <span className="capitalize">privacidade</span>
          </a>
        </p>
      </footer>
    </>
  )
}

export default Footer;