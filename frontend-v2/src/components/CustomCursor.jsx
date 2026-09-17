import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useFinePointer from "../hooks/useFinePointer";

// A minimal circular cursor that expands into a text label when hovering
// any element carrying a `data-cursor="VIEW"` (etc.) attribute. Only mounts
// on fine-pointer, non-touch, non-reduced-motion devices (see
// useFinePointer) — everyone else keeps the native cursor.
export default function CustomCursor() {
  const isFine = useFinePointer();
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!isFine) return;
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      const target = e.target.closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : "");
    };
    const handleLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [isFine, x, y]);

  if (!isFine) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ translateX: springX, translateY: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{
          width: label ? 92 : 10,
          height: label ? 92 : 10,
          marginLeft: label ? -46 : -5,
          marginTop: label ? -46 : -5,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="flex items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/10"
      >
        {label ? (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
            {label}
          </span>
        ) : (
          <span className="h-full w-full rounded-full bg-[var(--color-accent)]" />
        )}
      </motion.div>
    </motion.div>
  );
}
