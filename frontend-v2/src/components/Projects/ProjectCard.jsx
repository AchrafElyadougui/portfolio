import { motion } from "framer-motion";
import { FolderCode, Github, ArrowUpRight } from "lucide-react";
import RevealText from "../common/RevealText";
import { techIcons } from "../../data/projects";
import { fadeUp, staggerContainer } from "../../lib/motion";

export default function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="group grid gap-8 border-t border-[var(--color-line)] py-16 last:border-b md:grid-cols-12 md:gap-10 lg:py-24"
    >
      <div className={`md:col-span-5 ${reversed ? "md:order-2" : ""}`}>
        <motion.div
          variants={fadeUp}
          className="flex items-baseline gap-4 font-mono text-xs text-[var(--color-text-faint)]"
        >
          <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="uppercase tracking-[0.25em]">{project.category}</span>
        </motion.div>

        <RevealText
          as="h3"
          delay={0.05}
          className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-4xl"
          segments={[{ text: project.title }]}
        />

        {project.subtitle && (
          <motion.p variants={fadeUp} className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {project.subtitle}
          </motion.p>
        )}

        <motion.p variants={fadeUp} className="mt-6 leading-relaxed text-[var(--color-text-muted)]">
          {project.description}
        </motion.p>

        {project.features && (
          <motion.ul variants={fadeUp} className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {feature}
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)]"
            >
              {techIcons[tag] && <img src={techIcons[tag]} alt="" className="h-3.5 w-3.5" />}
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.15em]">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="inline-flex items-center gap-1.5 text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              Live site <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="inline-flex items-center gap-1.5 text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Github size={14} /> Source
            </a>
          )}
          {!project.demo && !project.github && (
            <span className="text-[var(--color-text-faint)] normal-case tracking-normal">
              No public repository or live demo yet.
            </span>
          )}
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        data-cursor={project.image ? "VIEW" : ""}
        className={`overflow-hidden rounded-sm md:col-span-7 ${reversed ? "md:order-1" : ""}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 border border-[var(--color-line)] bg-[var(--color-bg-raised)]">
            <FolderCode size={32} className="text-[var(--color-text-faint)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-faint)]">
              No visual yet
            </span>
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}
