import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Send,
  ChevronRight,
  Settings,
  Menu,
  X
} from "lucide-react";
import SettingsModal from "./SettingsModal";

const MotionLink = motion.create(Link);

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const isActive = (route) => path === route;
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative mb-8">
        <nav className="flex items-center justify-between xl:px-6 px-4 py-3 font-mono pt-9">
          <div className="flex items-center">
            {/* Left: Logo */}
            <div className="flex items-center gap-6 mr-5">
              <span className="text-xl font-bold text-[var(--color-text)]">
                YI<span className="text-sky-400">.</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-4 text-lg">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "My work" },
                { to: "/blog", label: "Blog" }
              ].map(({ to, label }) => (
                <li key={to} className="relative">
                  {isActive(to) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[var(--color-nav-hover)] rounded-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <MotionLink
                    to={to}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 block px-3 py-[12px] rounded-md transition-colors ${
                      isActive(to)
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-nav-hover)]"
                    }`}
                  >
                    {label}
                  </MotionLink>
                </li>
              ))}

              {/* More Dropdown */}
              <li className="relative">
                <motion.button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 group px-3 py-[9px] rounded-md transition-colors ${
                    isActive("/contact")
                      ? "bg-[var(--color-nav-hover)] text-[var(--color-text)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-nav-hover)]"
                  }`}
                >
                  <span>More</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex"
                  >
                    <ChevronRight size={14} />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 z-40 mt-3 w-screen max-w-sm -translate-x-1/2 transform rounded-xl border border-black/10 bg-[var(--color-model-more)] p-2 shadow-2xl backdrop-blur-xl"
                    >
                      <a
                        onClick={() => setIsOpen(false)}
                        target="_blank"
                        href="https://github.com/AchrafElyadougui"
                        className="flex items-start gap-4 hover:bg-neutral-400 p-3 rounded-md text-[var(--color-text)]"
                      >
                        <Github className="mt-1" />
                        <div>
                          <p className="font-semibold">My Github Profile</p>
                          <p className="text-sm text-[var(--color-text)])">
                            Explore my projects and contributions on GitHub.
                          </p>
                        </div>
                      </a>

                      <Link
                        onClick={() => setIsOpen(false)}
                        to="/contact"
                        className="flex items-start gap-4 hover:bg-neutral-400 p-3 rounded-md text-[var(--color-text)]"
                      >
                        <Send className="mt-1" />
                        <div>
                          <p className="font-semibold">Contact Me</p>
                          <p className="text-sm text-[var(--color-text)])">
                            Have any questions? Feel free to reach out to me.
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>

          {/* Settings icon (always visible) */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="hover:bg-[var(--color-nav-hover)] rounded-md p-[10px] cursor-pointer"
              onClick={() => setShowSettingsModal(!showSettingsModal)}
            >
              <Settings size={20} className="text-[var(--color-text)]" />
            </motion.div>

            {/* Burger Button (Mobile Only) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded hover:bg-[var(--color-nav-hover)] text-[var(--color-text)]"
              onClick={toggleMobile}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden absolute top-[100%] left-0 w-full z-30 bg-[var(--color-background-white)] border-t border-white/10 px-4 pb-4 pt-2 space-y-2 overflow-hidden"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "My work" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" }
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded text-[var(--color-text)] hover:bg-[var(--color-nav-hover)]"
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://github.com/AchrafElyadougui"
                target="_blank"
                className="block px-3 py-2 rounded text-[var(--color-text)] hover:bg-[var(--color-nav-hover)]"
              >
                Github
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showSettingsModal && (
          <SettingsModal onClose={() => setShowSettingsModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
