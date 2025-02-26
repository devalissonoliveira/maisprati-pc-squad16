import React from "react";
import { useState } from "react";
import { Link} from "react-router-dom";
import { FaRegBell } from "react-icons/fa";

// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from "react";
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// import { Container } from './styles';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://xsgames.co/randomusers/avatar.php?g=male",
  };

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Funcionamento", href: "/CadastroClient", current: false },
    { name: "Planos", href: "/PetRegistration", current: false },
    { name: "Contatos", href: "#", current: false },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <>
      {/* <section>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">
            <a href="#logo" className="hover:text-blue-700">
              MinhaLogo
            </a>
          </div>
          <nav className="flex items-center pl-10 justify-between text-blue-950 max-sm:hidden">
            <ul className="flex text-end space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/PetRegistration" className="hover:text-blue-700">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link to="/CadastroClient" className="hover:text-blue-700">
                  Plano
                </Link>
              </li>
              <li>
                <Link to="#contato" className="hover:text-blue-700">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <div className="sm:hidden">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <aside
              className={`fixed inset-0 z-50 transform transition-all duration-300 ease-in-out 
                ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden backdrop-blur-sm`}
            >
              <div className="absolute top-5 left-5">
                <button
                  onClick={toggleMenu}
                  id="closeHamburgue"
                  className="text-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col space-x-10 space-y-5 pt-6 pb-20 px-6 bg-slate-400">
                <li className="ml-10">
                  <a href="/" className="hover:text-blue-700 text-center">
                    Home
                  </a>
                </li>
                <li>
                  <Link
                    to="/PetRegistration"
                    className="hover:text-blue-700 text-center"
                  >
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CadastroClient"
                    className="hover:text-blue-700 text-center"
                  >
                    Plano
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contato"
                    className="hover:text-blue-700 text-center"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </aside>
          )}
        </div>
      </section> */}
      <article className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-cente justify-between">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon aria-hidden="true" className="size-6" /> */}
                    <FaRegBell className="size-5 font-light" />
                  </button>

                  {/* Profile dropdown */}
                  <div className="relative ml-3">
                    <div>
                      <div className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="IMG"
                          src={user.imageUrl}
                          className="size-8 rounded-full"
                        />
                      </div>
                    </div>
                    {isMenuOpen && (
                      <div
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        {userNavigation.map((item) => (
                          <div key={item.name}>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <button className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {/* <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" /> */}
                  {/* <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" /> */}
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon aria-hidden="true" className="size-6" /> */}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 ">
                {userNavigation.map((item) => (
                  <button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </article>
    </>
  );
}

export default NavBar;
