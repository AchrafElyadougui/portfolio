import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { experience } from "../../data/experience";
import { fadeUp } from "../../lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          number="02"
          label="Experience"
          title="Where I've worked."
          accentWord="worked."
          subtitle="Professional and internship experience across development and IT operations."
        />

        <div className="mt-16">
          {experience.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.position}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 border-t border-[var(--color-line)] py-10 last:border-b md:grid-cols-12 md:gap-8"
            >
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="font-mono text-xs text-[var(--color-text-faint)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm uppercase tracking-[0.15em] text-[var(--color-accent)]">
                  {job.dateRange}
                </span>
              </div>

              <div className="md:col-span-9">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
                    {job.position}
                  </h3>
                  {job.current && (
                    <span className="rounded-full bg-[var(--color-accent-dim)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--color-accent)]">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  {job.company}
                  {job.fullCompanyName && (
                    <span className="block text-sm text-[var(--color-text-faint)]">
                      {job.fullCompanyName}
                    </span>
                  )}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {job.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>

                {job.tools.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[var(--color-text-faint)]">
                    {job.tools.map((tool, i) => (
                      <span key={tool}>
                        {tool}
                        {i < job.tools.length - 1 && <span className="ml-4 text-[var(--color-line-strong)]">/</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
