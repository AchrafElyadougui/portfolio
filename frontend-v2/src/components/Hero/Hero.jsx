import { motion } from "framer-motion";
import RevealText from "../common/RevealText";
import MagneticButton from "../common/MagneticButton";
import Container from "../common/Container";
import { fadeUp, staggerContainer } from "../../lib/motion";
import useFinePointer from "../../hooks/useFinePointer";

const keywords = ["JAVA", "SPRING BOOT", "REACT", "POSTGRESQL", "LARAVEL", "IT OPS"];

const keywordPositions = [
  { top: "14%", left: "6%", size: "text-xs" },
  { top: "8%", left: "78%", size: "text-sm" },
  { top: "38%", left: "88%", size: "text-xs" },
  { top: "72%", left: "82%", size: "text-sm" },
  { top: "80%", left: "10%", size: "text-xs" },
  { top: "50%", left: "2%", size: "text-sm" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Hero() {
  const isFine = useFinePointer();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-28"
    >
      {/* Floating technical keywords — decorative, hidden from mobile & reduced-motion for clarity/perf */}
      {isFine &&
        keywords.map((word, i) => (
          <motion.span
            key={word}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: 0.8 + i * 0.1, duration: 0.6 },
              y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ top: keywordPositions[i].top, left: keywordPositions[i].left }}
            className={`pointer-events-none absolute hidden font-mono ${keywordPositions[i].size} uppercase tracking-[0.2em] text-[var(--color-text-faint)] lg:block`}
          >
            {word}
          </motion.span>
        ))}

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          Casablanca, Morocco — Available
        </motion.div>

        <h1 className="font-semibold leading-[0.92] tracking-tighter text-[var(--color-text)]">
          <RevealText
            as="div"
            stagger={0.04}
            className="block text-[clamp(3.2rem,13vw,10.5rem)]"
            segments={[{ text: "Achraf" }]}
          />
          <RevealText
            as="div"
            stagger={0.04}
            delay={0.15}
            className="block text-[clamp(3.2rem,13vw,10.5rem)]"
            segments={[{ text: "El Yadougui" }]}
          />
        </h1>

        <motion.div
          variants={staggerContainer(0.08, 0.5)}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-base"
          >
            Full Stack Developer — Java · Spring Boot · React · IT Support
          </motion.p>

          <motion.p variants={fadeUp} className="max-w-sm text-[var(--color-text-muted)]">
            Building reliable full-stack software and keeping enterprise systems
            running — at Attijariwafa Bank and beyond.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.7)}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <motion.div variants={fadeUp}>
            <MagneticButton
              as="button"
              data-cursor="VIEW"
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#0a0a0a]"
            >
              Selected Work
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp}>
            <MagneticButton
              as="button"
              data-cursor="GO"
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text)]"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 mt-16"
      >
        <Container className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-faint)]">
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-[var(--color-line-strong)]"
          />
          <span>01 / 07</span>
        </Container>
      </motion.div>
    </section>
  );
}
