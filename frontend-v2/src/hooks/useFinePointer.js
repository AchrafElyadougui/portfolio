import { useEffect, useState } from "react";

// True only for devices with a real mouse (fine pointer + hover capability).
// Drives whether the custom cursor / magnetic buttons / floating decoration
// are enabled — touch devices and reduced-motion users get the plain,
// simpler experience instead.
export default function useFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setIsFine(pointerQuery.matches && !motionQuery.matches);
    update();

    pointerQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      pointerQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return isFine;
}
