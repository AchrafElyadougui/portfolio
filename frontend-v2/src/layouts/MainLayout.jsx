import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollProgress from "../components/ScrollProgress";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";

export default function MainLayout({ children }) {
  return (
    <SmoothScroll>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
