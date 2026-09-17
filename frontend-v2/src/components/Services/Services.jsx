import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { services } from "../../data/services";
import { fadeUp } from "../../lib/motion";

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-40">
      <Container>
        <SectionHeading number="06" label="What I Do" title="How I can help." accentWord="help." />

        <div className="mt-16 grid gap-x-10 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group flex gap-6 border-t border-[var(--color-line)] py-8 last:border-b md:last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b"
            >
              <span className="font-mono text-xs text-[var(--color-text-faint)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
