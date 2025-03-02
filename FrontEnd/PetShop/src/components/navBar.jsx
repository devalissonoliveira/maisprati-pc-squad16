import React from "react";
import { useState } from "react";
import { Link} from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  function toggleMenuProfile() {
    setIsMenuProfileOpen(!isMenuProfileOpen);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const toggleIsLogedUser = () =>{
  //   setIsUserLogged(!isUserLogged)
  // }

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
    { name: "Contatos", href: "/Contato", current: false },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <>
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
              {/* LINKS ESPANDIDOS DO NAV */}
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
              {/*FIM DOS LINKS ESPANDIDOS */}


              {/* SECTION DIREITA DA IMAGEM DO USER/SINO */}
              <div className="hidden md:block">
               <div className="ml-4 flex items-center md:ml-6">

                  <div className="relative ml-3 flex items-center gap-1">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <FaRegBell className="size-5 font-light" />
                  </button>
                      <div className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <img
                          alt="IMG"
                          src={user.imageUrl}
                          onClick={toggleMenu}
                          className="size-8 rounded-full cursor-pointer"
                        />
                      </div>
                    {isMenuOpen && (
                      <div
                        transition
                        className="absolute right-3 top-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
                  {/* ate aqui  */}
                </div>
              </div>
              {/* FIM SECTION DIREITA DA IMAGEM DO USER/SINO */}

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <button
                  onClick={toggleMenu}
                  className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 
                  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  {isMenuOpen ? <IoCloseSharp className=" scale-150"/>: <MdMenu className=" scale-150"/>}
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            {/* MENU ESPANCIVEL PELO HAMBURGUER */}

            {isMenuOpen && ( <div className={`space-y-1 px-2 pt-2 pb-3 sm:px-3 ${isMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'} overflow-hidden transition-all duration-500 ease-out `}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>)}
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    onClick={toggleMenuProfile}
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
              {/* MENU ESPANDIDO AO CLIACAR NA IMAGEM */}
              {isMenuProfileOpen &&
              (<div className="mt-3 space-y-1 px-2">
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
              </div>)
              }
            </div>
          </div>
        </nav>
      </article>
    </>
  );
}

export default NavBar;
