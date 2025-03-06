import React, { useState } from "react";

const Contato = () => {
  const [formData, setFormData] = useState({
    email: "",
    assunto: "",
    messagem: "",
  }) 
  
  const handleFormEdit = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
  }

  return (
    <section className="overflow-hidden min-h-[calc(100vh-120px)]">
      <div className="mt-8 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
          Contate-nos
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Tem um problema técnico? Quer enviar feedback sobre um recurso beta?
          Precisa de detalhes sobre nosso plano Business? Nos avise.
        </p>
        <form onSubmit={handleSubmit} metho="POST" className="space-y-8">
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-black capitalize"
            >
              Seu Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormEdit}
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-none block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label
              for="subject"
              className="block mb-2 text-sm font-medium text-black capitalize"
            >
              Assunto
            </label>
            <input
              type="text"
              name="assunto"
              // value={formData.assunto}
              onChange={handleFormEdit}
              id="assunto"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-none block w-full p-2.5"
              placeholder="Deixe-nos saber como podemos ajudá-lo"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-black"
            >
              <span className="capitalize">Sua</span> mensagem
            </label>
            <textarea
              id="messagem"
              name="messagem"
              value={formData.messagem}
              onChange={handleFormEdit}
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300"
              placeholder="Deixe um comentário..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500"
          >
            <span className="capitalize">Enviar</span> mensagem
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contato;
