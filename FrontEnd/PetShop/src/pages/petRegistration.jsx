// import { Container } from './styles';

function Register() {
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
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Register your Pet
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-start text-sm/6 font-medium text-gray-900"
                >
                  Name of pet
                </label>
                <div class="mt-2">
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Tótó..."
                    autocomplete="name"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="species"
                    class="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    species
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    type="species"
                    name="species"
                    id="species"
                    placeholder="Cão, Gato, Papagaio..."
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="Race"
                    class="block text-sm/6 font-medium text-gray-900 capitalize"
                  >
                    Race
                  </label>
                </div>

                <div class="mt-2">
                  <textarea
                    rows="7" 
                    maxlength="512"
                    id="Race"
                    placeholder="Digite suas observações aqui..."
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-60 resize-none"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
