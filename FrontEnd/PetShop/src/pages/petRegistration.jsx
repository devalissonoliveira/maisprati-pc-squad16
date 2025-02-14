import React, { useState, useEffect } from "react";

function Register() {
  const [selected, setSelected] = useState("");
  const [file, setFile] = useState(null);

  const handleCheckboxChange = (option) => {
    setSelected(option); // Desmarca se já estiver selecionado
  };

  function handleAddfile(event) {
    const selectedFile = event.target.value;
    setFile(selectedFile);
    console.error("antes de atualizar:" + file + " e o passado: " + selectedFile);
    document.getElementById("file-name").textContent = selectedFile;
    console.error("depois de atualizar:" + file);
  }
  return (
    <>
      <form method="post" className="bg-white">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Register your Pet
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* <div className="sm:col-span-3">
              <label
                for="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div> */}

            <div className="sm:col-span-full">
              <label
                for="name"
                className="text-start block text-sm/6 font-medium text-gray-900"
              >
                <span className="capitalize">Nome</span> do pet
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome do seu pet."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Email address */}

            <div className="sm:col-span-full">
              <label
                for="email"
                className="block text-sm/6 font-medium text-gray-900 capitalize sm:text-start text-center"
              >
                <span className="capitalize">email</span> address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Exemplo@gamil.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* ENDEREÇO */}

            <div className="sm:col-span-full">
              <label
                for="race"
                className="block text-sm/6 font-medium text-gray-900 capitalize sm:text-start"
              >
                race
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="race"
                  id="race"
                  placeholder="Shih tzu, Pastor Alemão..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="idade"
                className="block text-sm/6 font-medium text-gray-900 sm:text-start text-center capitalize"
              >
                idade
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="idade"
                  id="idade"
                  placeholder="Shih tzu, Pastor Alemão..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="items-center">
                <label
                  for="pedigre"
                  className="block text-sm/6 font-medium text-gray-900 capitalize"
                >
                  pedigre
                </label>
              </div>
              <div className="flex flex-grow gap-6 mt-2 max-sm:justify-center">
                <div className="flex flex-row items-center gap-1">
                  <label
                    for="yes"
                    className="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    yes
                  </label>
                  <input
                    type="checkbox"
                    name="yes"
                    id="yes"
                    placeholder="Shih tzu, Pastor Alemão..."
                    required
                    checked={selected === "yes"}
                    onChange={() => handleCheckboxChange("yes")}
                    // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div className="flex flex-row items-center gap-1">
                  <label
                    for="no"
                    className="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    no
                  </label>
                  <input
                    type="checkbox"
                    name="no"
                    id="no"
                    placeholder="Shih tzu, Pastor Alemão..."
                    required
                    checked={selected === "no"}
                    onChange={() => handleCheckboxChange("no")}
                    // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            {selected === "yes" && (
              <div className="flex gap-6 sm:col-span-full">
                <label
                  id="anexar-file"
                  for="pedgre"
                  className="flex w-40 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize hover:cursor-pointer"
                >
                  anexar arquivo
                </label>
                <input
                  type="file"
                  name="pedgre"
                  id="pedgre"
                  className="hidden"
                  onChange={(event) => handleAddfile(event)}
                />
                <span className="text-black" id="file-name">
                  Name or file here...
                </span>
              </div>
            )}

            <div className="sm:col-span-3">
              <label
                for="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span className="capitalize">primeiro</span> telefone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span className="capitalize">segundo</span> telefone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                for="street-address"
                className="block text-sm/6 font-medium text-gray-900 capitalize"
              >
                senha
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-full ">
              <label
                for="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span>confirmação</span> da senha
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="confirPassword"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 col-span-full">
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
