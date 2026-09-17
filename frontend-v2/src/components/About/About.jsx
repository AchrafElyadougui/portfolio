import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import RevealText from "../common/RevealText";
import { fadeUp, viewportStagger } from "../../lib/motion";
import portrait from "../../assets/portfoio.jpg";

const meta = [
  { label: "Role", value: "Support & Operations, Attijariwafa Bank" },
  { label: "Studying", value: "Licence Génie Logiciel, ESTEM" },
  { label: "Focus", value: "Full Stack + IT Operations" },
  { label: "Based in", value: "Casablanca, Morocco" },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <Container>
        <SectionHeading number="01" label="About" title="Software engineer, on both sides of the stack." accentWord="stack." />

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealText
              as="h3"
              className="text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl"
              segments={[
                { text: "I build " },
                { text: "digital systems", className: "text-[var(--color-accent)]" },
                { text: "." },
              ]}
            />

            <motion.div
              variants={viewportStagger(0.1).variants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-[var(--color-text-muted)]"
            >
              <motion.p variants={fadeUp}>
                I started coding in 2023, building small websites with HTML, CSS,
                JavaScript and PHP. That grew into full applications with{" "}
                <span className="text-[var(--color-text)]">React</span> and{" "}
                <span className="text-[var(--color-text)]">Laravel</span> — and,
                through my current studies, into{" "}
                <span className="text-[var(--color-text)]">Java and Spring Boot</span>{" "}
                as well.
              </motion.p>
              <motion.p variants={fadeUp}>
                In parallel, I work in IT support and operations at{" "}
                <span className="text-[var(--color-text)]">Attijariwafa Bank</span>,
                supervising information systems and responding to first-level
                incidents. Before that, I supported the bank&apos;s head-office
                relocation and Windows 11 migration as a Help Desk technician.
              </motion.p>
              <motion.p variants={fadeUp}>
                That combination — building software and keeping systems reliable
                in production — is what I&apos;m aiming my career toward.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            variants={viewportStagger(0.08).variants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <motion.figure variants={fadeUp} className="mb-10">
              <div className="overflow-hidden rounded-sm border border-[var(--color-line)]">
                <img
                  src={portrait}
                  alt="Portrait of Achraf El Yadougui"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/4] w-full max-w-[500px] object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                Fig. 01 — Casablanca
              </figcaption>
            </motion.figure>

            <dl>
              {meta.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex flex-col gap-1 border-b border-[var(--color-line)] py-5 first:border-t sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
                    {item.label}
                  </dt>
                  <dd className="text-[var(--color-text)] sm:text-right">{item.value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
