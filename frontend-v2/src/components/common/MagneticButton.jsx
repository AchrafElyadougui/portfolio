import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useFinePointer from "../../hooks/useFinePointer";

// Stable component references — creating motion(Tag) fresh on every render
// would remount the element and break animation continuity.
const MotionButton = motion.button;
const MotionA = motion.a;

// Wraps any element (button/a) and pulls it a few pixels toward the cursor
// while hovered. transform-only, so it's cheap, and it's a no-op on touch /
// reduced-motion devices via useFinePointer.
export default function MagneticButton({ as = "button", strength = 0.35, className = "", children, ...rest }) {
  const ref = useRef(null);
  const isFine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const Tag = as === "a" ? MotionA : MotionButton;

  const handleMouseMove = (e) => {
    if (!isFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ translateX: springX, translateY: springY }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
