// import { Container } from './styles';

function Pages() {
  return (
    <>
      {/* <nav className="flex items-center bg-slate-600 ">
        <article>Logo</article>
        <ul className="flex">
          <li>Home</li>
          <li>Como Funcina</li>
          <li>Planos</li>
          <li>Contatos</li>
        </ul>
      </nav> */}
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
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  User address
                </label>
                <div class="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div class="text-sm">
                    <a
                      href="#"
                      class="font-semibold text-indigo-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pages;
