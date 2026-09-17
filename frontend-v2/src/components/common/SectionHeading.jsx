import { motion } from "framer-motion";
import RevealText from "./RevealText";
import { fadeUp } from "../../lib/motion";

export default function SectionHeading({ number, label, title, accentWord, subtitle }) {
  const segments = accentWord
    ? [
        { text: title.replace(accentWord, "").trimEnd() + " " },
        { text: accentWord, className: "text-[var(--color-accent)]" },
      ]
    : [{ text: title }];

  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="mb-5 flex items-baseline gap-3 font-mono text-xs"
      >
        <span className="text-[var(--color-accent)]">{number}</span>
        <span className="uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          {label}
        </span>
        <span className="h-px flex-1 bg-[var(--color-line)]" />
      </motion.div>

      <RevealText
        as="h2"
        segments={segments}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.02] tracking-tight text-[var(--color-text)]"
      />

      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1 }}
          className="mt-5 max-w-lg text-[var(--color-text-muted)]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
