import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { education } from "../../data/education";
import { fadeUp } from "../../lib/motion";

export default function Education() {
  return (
    <section id="education" className="py-28 md:py-40">
      <Container>
        <SectionHeading number="05" label="Education" title="Academic background." accentWord="background." />

        <div className="mt-16">
          {education.map((entry) => (
            <motion.div
              key={entry.degree}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-2 border-t border-[var(--color-line)] py-8 last:border-b md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] md:col-span-3">
                {entry.dateRange}
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-2xl md:col-span-6">
                {entry.degree}
              </h3>
              <div className="md:col-span-3 md:text-right">
                <p className="text-sm text-[var(--color-text-muted)]">{entry.institution}</p>
                {entry.field && (
                  <p className="text-xs text-[var(--color-text-faint)]">{entry.field}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
