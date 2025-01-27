import React, { useState } from "react";

function Register() {
  const [selected, setSelected] = useState(""); // Controla qual checkbox está selecionado

  const handleCheckboxChange = (option) => {
    setSelected(option); // Desmarca se já estiver selecionado
  };

  function handleAddfile(e) {
    document.getElementById("file-name").textContent = e.target.value;
    console.log(e);
  }
  return (
    <>
      {/* Logo do lado direito */}
      <section className="flex flex-col">
        <div className="flex items-center">
          <div className="text-lg font-bold">
            <a href="#logo" className="hover:text-blue-700">
              MinhaLogo
            </a>
          </div>
          <nav className="flex items-center justify-between px-6 py-4 text-blue-950">
            {/* Links do lado esquerdo */}
            <ul className="flex space-x-6">
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
        </div>

        {/* Section de login */}
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Register your Pet
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  className="block text-start text-sm/6 font-medium text-gray-900"
                >
                  Name of pet
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Tótó..."
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="species"
                    className="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    species
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="species"
                    id="species"
                    placeholder="Cão, Gato, Papagaio..."
                    autocomplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="race"
                    className="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    race
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="race"
                    id="race"
                    placeholder="Shih tzu, Pastor Alemão..."
                    autocomplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* campo de idade e pedigre */}

              <div className="flex flex-row gap-8">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      for="idade"
                      className="block text-sm/6 font-medium text-gray-900 capitalize"
                    >
                      idade
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="idade"
                      id="idade"
                      placeholder="Shih tzu, Pastor Alemão..."
                      autocomplete="current-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="items-center">
                    <label
                      for="pedigre"
                      className="block text-sm/6 font-medium text-gray-900 capitalize"
                    >
                      pedigre
                    </label>
                  </div>
                  <div className="flex flex-grow gap-6 mt-2">
                    <div className="flex flex-row items-center gap-1">
                      <label
                        for="yes"
                        className="block text-sm/6 font-medium text-gray-900 capitalize"
                      >
                        yes
                      </label>
                      <input
                        type="checkbox"
                        name="option"
                        id="yes"
                        placeholder="Shih tzu, Pastor Alemão..."
                        required
                        checked={selected === "option1"}
                        onChange={()=> handleCheckboxChange("option1")}
                        // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label
                        for="no"
                        class="block text-sm/6 font-medium text-gray-900 capitalize"
                      >
                        no
                      </label>
                      <input
                        type="checkbox"
                        name="option"
                        id="no"
                        placeholder="Shih tzu, Pastor Alemão..."
                        required
                        checked={selected === "option2"}
                        onChange={() => handleCheckboxChange("option2")}
                        // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* fim do campo idade/pedigre */}

              <div class="flex flex-col items-start justify-between">
                <p className="text-start">
                  {" "}
                  <span className="capitalize">se</span> possuir{" "}
                  <span className="capitalize">pedigre</span>, anexe o documento
                  em <span className="uppercase">pdf</span> aqui.
                </p>
                <div className="flex gap-6 w-full">
                  <label
                    id="anexar-file"
                    for="pedgre"
                    onChange={handleAddfile}
                    class="flex w-40 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize hover:cursor-pointer "
                  >
                    anexar arquivo
                  </label>
                  <input
                    type="file"
                    name="pedgre"
                    id="pedgre"
                    className="hidden"
                  />
                  <span className="text-black" id="file-name">
                    Name or file here...
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="observations"
                    className="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    Observations
                  </label>
                </div>

                <div className="mt-2">
                  <textarea
                    rows="7"
                    maxLength="512"
                    id="observations"
                    placeholder="Digite suas observações aqui..."
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-60 resize-none"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
