import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        
      </main>
      <footer className="bg-blue-500 w-full text-center text-white fixed bottom-0">
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