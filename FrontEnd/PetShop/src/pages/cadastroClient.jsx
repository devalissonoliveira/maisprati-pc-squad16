import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useApi from '../utils/api'
import { isAxiosError } from 'axios'
import { useAlert } from '../context/AlertContext';
import { useAuthentication } from '../context/AuthContext'
function cadastroClient() {
  const { api } = useApi()
  const { showAlert } = useAlert()
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    phone: null,
    street: null,
    number: null,
    neighborhood: null,
    postalCode: null,
    city: null,
    state: null,
  });
  const [form, setForm] = useState({
    firstName: "",
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    street: '',
    number: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    state: "",

  })
  const { login } = useAuthentication();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const navigate = useNavigate();

  function setFormField(field, value) {
    setForm(fields => ({ ...fields, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      form.password != "" &&
      form.confirmPassword != "" &&
      form.password === form.confirmPassword
    ) {
      form.name = `${form.firstName.trim()} ${form.lastName.trim()}`
      setError(""); // Limpa erros anteriores
      api.post('/register', form)
        .then(() => {
          login(form.email, form.password)
            .then(() => {
              showAlert('Conta criada com sucesso!')
              navigate('/animais')
            })
        })
        .catch(e => {
          if (isAxiosError(e)) {
            if (e.response?.status == 400) {
              console.log(e.response.data)
              e.response.data.forEach(error => {
                setErrors(errors => ({
                  ...errors,
                  [error.field]: error.defaultMessage
                }))
              })
            } else if (e.response?.status == 422) {
              showAlert(e.response.data.message, 'error')
            } else {
              showAlert('Falha ao tentar criar uma conta', 'error')
            }
          }
        })
    } else {
      setErrors(errors => ({ ...errors, confirmPassword: 'As senhas não coincidem' }))
    }
  }

  const redirect = () => {
    navigate("/Login");
  };

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <div className="flex max-h-full w-screen sm:w-[75%] md:w-[50%] transition-all duration-200 ease-linear flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="font-semibold text-gray-900 text-base/7">
            Informações pessoais para cadastro
          </h2>
          <p className="mt-1 text-gray-600 text-sm/6">
            Use um endereço permanente onde você possa receber correspondência.
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Primeiro nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  onChange={e => setFormField('firstName', e.target.value)}
                  value={form.firstName}
                  id="first-name"
                  placeholder="Primeiro name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.name}</p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Último nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="Ultimo name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={e => setFormField('lastName', e.target.value)}
                  value={form.lastName}
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.name}</p>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="email"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Endereço Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="Seu Email aqui."
                  onChange={(e) => setFormField('email', e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {errors.email && (
              <div className="sm:col-span-full">
                <span
                  htmlFor="city"
                  className="block font-medium text-red-900 text-sm/6"
                >
                  {errors.email}
                </span>
              </div>
            )}

            {/* ENDEREÇO */}

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start "
              >
                Endereço
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="text"
                  value={form.street}
                  onChange={e => setFormField('street', e.target.value)}
                  placeholder="Endereço"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.street}</p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                número
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={e => setFormField('number', e.target.value)}
                  value={form.number}
                  name="email"
                  type="text"
                  placeholder="Número do seu endereço"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.number}</p>
            </div>
            {/* ENDEREÇO */}

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start "
              >
                bairro
              </label>
              <div className="mt-2">
                <input
                  value={form.neighborhood}
                  onChange={e => setFormField('neighborhood', e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Bairro"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.neighborhood}</p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                cep
              </label>
              <div className="mt-2">
                <input
                  value={form.postalCode}
                  onChange={e => setFormField('postalCode', e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Cep da sua casa"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.postalCode}</p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start "
              >
                cidade
              </label>
              <div className="mt-2">
                <input
                  value={form.city}
                  onChange={e => setFormField('city', e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Cidade"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.city}</p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block font-medium text-center text-gray-900 capitalize text-sm/6 sm:text-start"
              >
                estado
              </label>
              <div className="mt-2">
                <input
                  value={form.state}
                  onChange={e => setFormField('state', e.target.value)}
                  name="email"
                  type="text"
                  placeholder="Estado"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.state}</p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block font-medium text-gray-900 text-sm/6"
              >
                <span className="capitalize">primeiro</span> telefone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  value={form.phone}
                  onChange={e => setFormField('phone', e.target.value)}
                  placeholder="Primeiro numero"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.phone}</p>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block font-medium text-gray-900 text-sm/6"
              >
                <span className="capitalize">segundo</span> telefone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="Segundo numero "
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block font-medium text-gray-900 capitalize text-sm/6"
              >
                senha
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="street-address"
                  id="street-address"
                  onChange={(e) => {
                    setFormField('password', e.target.value);
                  }}
                  value={form.password}
                  placeholder="Senha"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.password}</p>
            </div>

            <div className="sm:col-span-full ">
              <label
                htmlFor="city"
                className="block font-medium text-gray-900 text-sm/6"
              >
                <span>confirmação</span> da senha
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="city"
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setFormField('confirmPassword', e.target.value);
                  }}
                  placeholder="Confirme sua Senha"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p class="text-sm text-red-600 mt-2"  >{errors.confirmPassword}</p>
            </div>
            <article className="mt-0 font-normal text-blue-400 sm:col-span-full text-end">
              <Link to="/Login">Já tem cadastro, faça login aqui.</Link>
            </article>
            {error && (
              <div className="sm:col-span-full">
                <span
                  htmlFor="city"
                  className="block font-medium text-red-900 text-sm/6"
                >
                  {error}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end mt-8 gap-x-6">
            <button
              type="button"
              onClick={redirect}
              className="px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Cancelar
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

export default cadastroClient;
