import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navSections } from "../../data/navigation";
import { social } from "../../data/social";
import useActiveSection from "../../hooks/useActiveSection";
import Container from "../common/Container";

const sectionIds = navSections.map((s) => s.id);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const activeIndex = sectionIds.indexOf(activeId);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled((prev) => (prev ? latest > 10 : latest > 48));
  });

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.lenis?.stop();
    return () => {
      document.body.style.overflow = overflow;
      window.lenis?.start();
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    window.lenis?.start();
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-colors duration-300 ${
          scrolled ? "border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 backdrop-blur-md" : ""
        }`}
      >
        <Container className="flex items-center justify-between py-5">
          <a
            href="#hero"
            data-cursor="TOP"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("hero");
            }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text)]"
          >
            Achraf El&nbsp;Yadougui
          </a>

          <div className="hidden items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] md:flex">
            <span className="text-[var(--color-accent)]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="uppercase tracking-[0.25em]">
              {navSections[activeIndex]?.label ?? "Intro"}
            </span>
          </div>

          <button
            data-cursor="MENU"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text)]"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[70] flex flex-col justify-between overflow-y-auto overscroll-contain bg-[var(--color-bg)] px-6 pb-10 pt-12 md:px-16"
          >
            <nav className="flex flex-col">
              {navSections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  data-cursor="GO"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section.id);
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: "easeOut" }}
                  className="group flex items-baseline gap-4 border-b border-[var(--color-line)] py-4 md:py-5"
                >
                  <span className="font-mono text-sm text-[var(--color-text-faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-4xl font-semibold tracking-tight transition-colors duration-300 sm:text-6xl md:text-7xl ${
                      activeId === section.id
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text)] group-hover:text-[var(--color-accent)]"
                    }`}
                  >
                    {section.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-10 flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between"
            >
              <a href={`mailto:${social.email}`} className="hover:text-[var(--color-accent)]">
                {social.email}
              </a>
              <div className="flex gap-6">
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                  GitHub
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
