import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { skillGroups } from "../../data/skills";
import { fadeUp, viewportStagger } from "../../lib/motion";

const sizeCycle = [
  "text-xl sm:text-2xl md:text-3xl",
  "text-lg sm:text-xl md:text-2xl",
  "text-base sm:text-lg md:text-xl",
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-40">
      <Container>
        <SectionHeading number="04" label="Tech Stack" title="Technologies I work with." accentWord="work with." />

        <div className="mt-16 space-y-12">
          {skillGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={viewportStagger(0.04).variants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 border-t border-[var(--color-line)] pt-8 md:grid-cols-12 md:gap-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-faint)] md:col-span-3">
                {group.label}
              </p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 md:col-span-9">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    className={`group relative cursor-default font-semibold tracking-tight text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-accent)] ${sizeCycle[i % sizeCycle.length]}`}
                  >
                    {item}
                    <span className="absolute -bottom-4 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
