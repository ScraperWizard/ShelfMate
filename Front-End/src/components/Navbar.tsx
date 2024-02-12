import {  useState } from "react";
import { Dialog, Disclosure, Popover,  } from "@headlessui/react";
import imgLib from "../assets/LibraryLogo.png";
import {
  // ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  // SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  // PhoneIcon,
  // PlayCircleIcon,
} from "@heroicons/react/20/solid";
import "../styles/Options.css";
// import { color } from "framer-motion";
// import { useAuth } from "../context/AuthProvider";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { AuthProvider } from "../context/AuthProvider";
import {Link} from 'react-router-dom'
const products = [
  {
    name: "Book Store",
    description: "Get Link better understanding of your traffic",
    to: "/library",
    icon: ChartPieIcon,
  },
  {
    name: "Meeting room",
    description: "Speak directly to your customers",
    to: "/meeting-room",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "My books",
    description: "Your customers data will be safe and secure",
    to: "/book-table",
    icon: FingerPrintIcon,
  },
  {
    //   name: "Integrations",
    //   description: "Connect with third-party tools",
    //   to: "#",
    //   icon: SquaresPlusIcon,
    // },
    // {
    //   name: "Automations",
    //   description: "Build strategic funnels that will convert",
    //   to: "#",
    //   icon: ArrowPathIcon,
  },
];

// const callsToAction = [
//   // { name: "Watch demo", to: "#", icon: PlayCircleIcon },
//   // { name: "Contact sales", to: "#", icon: PhoneIcon },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { user, setUser } = useAuth();
  const context = useContext(AuthContext);

  return (
    <AuthProvider>
      <header className="bg-gradient-to-r from-blue-50 via-blue-300 to-blue-500">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-0 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={imgLib}
                alt=""
                style={{ width: "170px", height: "170px" }}
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="h-6 w-6 mr-5"
                aria-hidden="true"
                style={{ color: "white" }}
              />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/home"
              className="text-sm font-semibold leading-6 text-black-900"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold leading-6 text-black-900"
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold leading-6 text-black-900"
            >
              Contact
            </Link>
            <a className="dropdown">
              <a
                className="dropbtn cursor-pointer"
                style={{ color: "black", fontWeight: "550" }}
              >
                Library
                <i className="fa fa-caret-down"></i>
              </a>
              <div className="dropdown-content">
                <Link to="/library">Book store</Link>
                <Link to="/meeting-room">Meeting room</Link>
                <Link to="/book-table">My books</Link>
              </div>
            </a>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {context?.accessToken === undefined ? (
              <Link
                to="/"
                className="text-sm font-semibold leading-6 text-black-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <Link
                onClick={() => context.setAccessToken(undefined)}
                to="/"
                className="text-sm font-semibold leading-6 text-black-900"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </Link>
              // access the username here
            )}
            {/* {console.log(user ===undefined ? "need login" : "already logged in")} */}
            {/* <Link
            to="/"
            className="text-sm font-semibold leading-6 text-black-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link> */}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden "
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5  text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50">
                          Library
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.to}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Link
                    to="/home"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                  >
                    About us
                  </Link>
                  <Link
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6">
                  {context?.accessToken === undefined ? (
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                      onClick={() => context.setAccessToken(undefined)}
                    >
                      Log out
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </AuthProvider>
  );
}
