import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthenticatedApi } from "../context/AuthContext";
import { isAxiosError } from "axios";
import { useAlert } from "../context/AlertContext";
const terms = {
  'DOG': 'Cachorro',
  'OTHERS': 'Outros',
  'CAT': 'Gato',
  'PARROT': 'Papagaio',
  'HAMSTER': 'Hamster'
}
function Register() {
  const [selected, setSelected] = useState("");
  const { api } = useAuthenticatedApi()
  const { showAlert } = useAlert()
  const [errors, setErrors] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    observations: '',
    registrationDate: '',
    active: true
  })
  const [form, setForm] = useState(
    {
      name: '',
      species: 'DOG',
      breed: '',
      age: 0,
      observations: '',
      registrationDate: new Date().toISOString().replace('Z', ''),
      active: true
    })
  function setFormField(field, value) {
    setForm(form => ({ ...form, [field]: value }))
  }
  const [file, setFile] = useState(null);

  const handleCheckboxChange = (option) => {
    setSelected(option); // Desmarca se já estiver selecionado
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post('/pets', form);
      setForm({
        name: '',
        species: 'DOG',
        breed: '',
        age: 0,
        observations: '',
        registrationDate: new Date().toISOString().replace('Z', ''),
        active: true
      })
      showAlert('Criado com sucesso')
    } catch (e) {
      if (!isAxiosError(e)) {
        return showAlert('Não foi possível cadastrar o pet', 'error')
      }
      if (e.response) {
        switch (e.response.status) {
          case 400:
            e.response.data?.forEach(error => {
              setErrors(errors => ({ ...errors, [error.field]: error.defaultMessage }))
            })
            break;
          case 422:
            showAlert(e.response.data.message, 'error')
            break;
          default:
            showAlert('Não foi possível cadastrar o pet', 'error')
        }
      }
    }
  }
  function handleAddfile(event) {
    const selectedFile = event.target.value;
    setFile(selectedFile);
    document.getElementById("file-name").textContent = selectedFile;
  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit} className="flex items-center justify-center max-w-full">
        <div className="flex max-h-full w-screen sm:w-[75%] md:w-[50%] transition-all duration-200 ease-linear flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="font-semibold text-gray-900 text-base/7">
            <span className="capitalize">registre</span> seu pet
          </h2>
          <p className="mt-1 text-gray-600 text-sm/6">
            <span className="capitalize">Use</span> um endereço permanente onde você possa receber correspondência.
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                for="name"
                className="block font-medium text-gray-900 text-start text-sm/6"
              >
                <span className="capitalize">Nome</span> do pet
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={e => setFormField('name', e.target.value)}
                  type="text"
                  placeholder="Nome do seu pet."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="text-sm text-red-600 mt-2"  >{errors.name}</p>
            </div>

            {/* Email address */}


            {/* ENDEREÇO */}

            <div className="sm:col-span-full">
              <label
                for="breed"
                className="block font-medium text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                Raça
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={form.breed}
                  onChange={e => setFormField('breed', e.target.value)}
                  name="breed"
                  id="breed"
                  placeholder="Shih tzu, Pastor Alemão..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="text-sm text-red-600 mt-2"  >{errors.breed}</p>
            </div>
            <div className="sm:col-span-full">
              <label
                for="species"
                className="block font-medium text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                species
              </label>
              <div className="mt-2">
                <select
                  name="species"
                  value={form.species}
                  onChange={e => setFormField('species', e.target.value)}
                  placeholder="Shih tzu, Pastor Alemão..."
                  className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                >
                  {Object.entries(terms).map(([key, value]) => <option value={key}>{value}</option>)}
                </select>
              </div>
              <p className="text-sm text-red-600 mt-2"  >{errors.species}</p>
            </div>

            <div className="sm:col-span-4">
              <label
                for="idade"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                idade
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="idade"
                  value={form.age}
                  onChange={e => setFormField('age', e.target.value)}
                  id="idade"
                  placeholder="Shih tzu, Pastor Alemão..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="text-sm text-red-600 mt-2"  >{errors.age}</p>
            </div>

            <div className="sm:col-span-2 ">
              <div className="items-center hidden">
                <label
                  for="pedigre"
                  className="block font-medium text-gray-900 capitalize text-sm/6"
                >
                  pedigre
                </label>
              </div>
              <div className="flex flex-grow gap-6 mt-2 max-sm:justify-center">
                <div className="flex flex-row items-center gap-1">
                  <label
                    for="yes"
                    className="block font-medium text-gray-900 capitalize text-sm/6"
                  >
                    yes
                  </label>
                  <input
                    type="checkbox"
                    name="yes"
                    id="yes"
                    placeholder="Shih tzu, Pastor Alemão..."
                    checked={selected === "yes"}
                    onChange={() => handleCheckboxChange("yes")}
                  // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div className="flex flex-row items-center gap-1">
                  <label
                    for="no"
                    className="block font-medium text-gray-900 capitalize text-sm/6"
                  >
                    no
                  </label>
                  <input
                    type="checkbox"
                    name="no"
                    id="no"
                    placeholder="Shih tzu, Pastor Alemão..."
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

            <div className="col-span-full">
              <label
                for="observation"
                className="block font-medium text-gray-900 capitalize text-start text-sm/6"
              >
                observações
              </label>
              <p className="text-xs text-gray-400 text-start">
                <span className="capitalize">máximo</span> de 512 palavras.
              </p>
              <div className="mt-2">
                <textarea
                  rows="7"
                  type="text"
                  value={form.observations}
                  onChange={e => setFormField('observations', e.target.value)}
                  maxLength="512"
                  id="observations"
                  placeholder="Digite suas observações aqui..."
                  className="resize-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="text-sm text-red-600 mt-2"  >{errors.observations}</p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-6 gap-x-6 col-span-full">
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Link to="/">
                Cancelar
              </Link>
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
