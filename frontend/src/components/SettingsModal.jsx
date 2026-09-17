import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function SettingsModal({ onClose }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  const handleThemeChange = (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.classList.toggle("dark", value === "dark");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--color-background-white)] dark:bg-[var(--color-background)] text-[var(--color-text)] p-6 rounded-xl w-full max-w-md shadow-2xl border border-neutral-300 dark:border-neutral-700"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Cog6ToothIcon className="w-6 h-6 text-[var(--color-text)]" />
          <h2 className="text-2xl font-bold font-mono">Settings</h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-neutral-400 mb-6 font-mono">
          Here you can change your settings like website theme.
        </p>

        {/* Theme Switch */}
        <div className="mb-4">
          <label className="flex items-center justify-between font-mono">
            <span className="flex items-center gap-2">
              {theme === "dark" ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
              Theme
            </span>
            <select
              className="bg-[var(--color-background-white)] border border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 text-sm text-[var(--color-text)]"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </label>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="mt-6 flex items-center justify-center gap-2 bg-[var(--color-nav-hover)] hover:bg-neutral-500 text-[var(--color-text)] transition px-4 py-2 rounded-lg font-mono w-full"
        >
          Close <ArrowRightIcon className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
