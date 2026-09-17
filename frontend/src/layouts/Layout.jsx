import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgress from '../components/ScrollProgress';
import { pageTransition } from '../lib/motion';

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
        <ScrollProgress/>
        <Navbar/>
      <div>
        <ScrollToTop/>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
        <Footer/>
    </div>
  );
}

export default Layout;
