import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ChatSidePanel from "./ChatSidePanel";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <>
      <div className="h-[80px] md:h-[90px]"></div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-white py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={assets.logo} className="w-32 md:w-36" alt="Logo" />
            </Link>

            <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative group transition-colors hover:text-black ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                <span>HOME</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </NavLink>
              <NavLink
                to="/collection"
                className={({ isActive }) =>
                  `relative group transition-colors hover:text-black ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                <span>COLLECTION</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative group transition-colors hover:text-black ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                <span>ABOUT</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative group transition-colors hover:text-black ${
                    isActive ? "text-black" : "text-gray-600"
                  }`
                }
              >
                <span>CONTACT</span>
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </NavLink>
            </ul>

            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer"
                onClick={() => {
                  setShowSearch(true);
                  navigate("/collection");
                }}
              >
                <img src={assets.search_icon} className="w-5" alt="Search" />
              </motion.div>

              <div className="group relative">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <img
                    onClick={() => (token ? null : navigate("/login"))}
                    className="w-5 cursor-pointer"
                    src={assets.profile_icon}
                    alt="Profile"
                  />
                </motion.div>

                {token && (
                  <div className="invisible group-hover:visible absolute right-0 pt-4 w-48 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="bg-white rounded-lg shadow-lg py-2">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        My Profile
                      </button>
                      <button
                        onClick={() => navigate("/orders")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50"
                      >
                        Orders
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/cart" className="relative">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <img src={assets.cart_icon} className="w-5" alt="Cart" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer"
                onClick={() => setIsChatOpen(true)}
              >
                <img src={assets.chat_icon} className="w-6" alt="Chat" />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.9 }}
                className="md:hidden cursor-pointer"
                onClick={() => setVisible(true)}
              >
                <img src={assets.menu_icon} className="w-5" alt="Menu" />
              </motion.div>
            </div>

            <AnimatePresence>
              {visible && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween" }}
                  className="fixed top-0 right-0 bottom-0 w-full md:w-80 bg-white shadow-xl z-50"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h2 className="text-xl font-semibold">Menu</h2>
                      <button
                        onClick={() => setVisible(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col py-4">
                      <NavLink
                        to="/"
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        HOME
                      </NavLink>
                      <NavLink
                        to="/collection"
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        COLLECTION
                      </NavLink>
                      <NavLink
                        to="/about"
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        ABOUT
                      </NavLink>
                      <NavLink
                        to="/contact"
                        onClick={() => setVisible(false)}
                        className="px-6 py-3 hover:bg-gray-50"
                      >
                        CONTACT
                      </NavLink>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ChatSidePanel
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </nav>
    </>
  );
};

export default Navbar;
