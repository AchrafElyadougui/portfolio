import { motion } from "framer-motion";
import Container from "../common/Container";
import { social } from "../../data/social";
import { fadeIn } from "../../lib/motion";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="border-t border-[var(--color-line)] py-10"
    >
      <Container className="flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          data-cursor="TOP"
          className="text-left transition-colors hover:text-[var(--color-accent)]"
        >
          © {new Date().getFullYear()} Achraf El Yadougui
        </button>
        <div className="flex gap-6">
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
            GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
            LinkedIn
          </a>
          <a href={`mailto:${social.email}`} className="hover:text-[var(--color-accent)]">
            Email
          </a>
        </div>
        <span>Built with React &amp; Framer Motion</span>
      </Container>
    </motion.footer>
  );
}
