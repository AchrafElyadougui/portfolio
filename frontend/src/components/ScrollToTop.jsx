import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 20,
      behavior: "smooth", // optional: add smooth scroll
    });
  }, [pathname]);

  return null;
}
