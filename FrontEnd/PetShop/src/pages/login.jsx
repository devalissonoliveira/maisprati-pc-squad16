// import { Container } from './styles';
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import useApi from "../utils/api";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useAlert } from "../context/AlertContext";



function Login() {
  const  { login } = useAuthentication();
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [errors, setErrors] = useState({
    email: null,
    password: null
  })
  function handleSubmit(e) {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    login(email, password)
      .then(e => {
        navigate('/PetRegistration')
        showAlert('Logado com sucesso!')
      })
      .catch(e => {
        if(isAxiosError(e)){
          if(e.response?.status == 401){
            showAlert('Email e senha incorretas', 'error');
          } else if(e.response?.status == 400){
            e.response.data?.forEach(error => {
              setErrors({ [error.field] : error.defaultMessage })
            })
          }
        } else {
          window.alert('Falha');
          console.error(e)
        }
      })
  }
  return (
    <>
      {/* Section de login */}
      <form method="post" onSubmit={handleSubmit} className="flex items-center justify-center">
        <div className="flex w-[35%] flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="capitalize text-2xl font-semibold text-blue-700">
            Login
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="user"
                className="text-start block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="user"
                  name="user"
                  type="text"
                  required
                  placeholder="Digite seu email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                { errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.email} </p>}
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="password"
                className="text-start block text-sm/6 font-medium text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                  { errors.password && <p class="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.password} </p>}
              </div>
            </div>

            <article className="sm:col-span-full mt-0 text-blue-400 font-normal text-end">
              <Link to="/RecoverPassword">esqueceu sua senha?</Link>
            </article>

            <div className="mt-6 flex items-center justify-end gap-x-6 sm:col-span-full">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize w-full text-lg"
              >
                entrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
