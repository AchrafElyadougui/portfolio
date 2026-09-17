// Shared Framer Motion variants/transitions used across the site so every
// section animates with the same restrained, "purposeful" feel.

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Props to spread on a motion element that should animate once when it
// scrolls into view.
export const viewportFadeUp = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
};

export const viewportStagger = (stagger = 0.1) => ({
  variants: staggerContainer(stagger),
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15 },
});
