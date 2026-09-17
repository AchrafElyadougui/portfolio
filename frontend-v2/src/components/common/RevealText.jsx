import { motion } from "framer-motion";

// Stable component references so re-renders don't remount the tag.
const HeadingTag = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  div: motion.div,
  span: motion.span,
};

const wordVariants = {
  hidden: { y: "110%" },
  show: (delay) => ({
    y: "0%",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Renders text as words that mask-reveal upward into view, one after another.
// `segments` lets a heading mix plain text with styled spans, e.g.
// [{ text: "Full Stack " }, { text: "Developer", className: "text-[var(--color-accent)]" }]
//
// The viewport observer sits on the outer heading tag rather than the
// per-word spans: each word is initially translated out of view and clipped
// by its own overflow-hidden wrapper, so an IntersectionObserver on the word
// itself would report zero visible area and never fire. The heading tag
// isn't clipped, so it's observed instead and the reveal is propagated down
// to each word via Framer Motion variants.
export default function RevealText(props) {
  const { segments, className = "", as: Tag = "h1", stagger = 0.05, delay = 0 } = props;
  const MotionTag = HeadingTag[Tag] || motion.h1;
  let wordIndex = 0;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {segments.map((segment, si) => {
        const tokens = segment.text.split(/(\s+)/).filter((t) => t !== "");
        return tokens.map((token, ti) => {
          if (/^\s+$/.test(token)) {
            return <span key={`${si}-${ti}`}>{token}</span>;
          }
          const index = wordIndex++;
          return (
            <span
              key={`${si}-${ti}`}
              className="inline-block overflow-hidden pb-[0.15em] align-bottom"
            >
              <motion.span
                className={`inline-block ${segment.className || ""}`}
                variants={wordVariants}
                custom={delay + index * stagger}
              >
                {token}
              </motion.span>
            </span>
          );
        });
      })}
    </MotionTag>
  );
}
