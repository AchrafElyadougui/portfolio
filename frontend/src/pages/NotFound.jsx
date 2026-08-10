import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const MotionLink = motion.create(Link);

export default function NotFound() {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or just `top: 0`
    }, []);
  return (
    <>
        <Navbar/>
        <div className="min-h-screen text-gray-300 flex justify-center px-4 mt-20">
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
        >
            <h1 className="mx-0 mt-0 bg-gradient-to-r from-[#ff7170] to-[#ffe57f] bg-clip-text text-transparent text-4xl font-black tracking-[-0.03em] mb-5 font-mono">
                404 - Page not found
            </h1>
            <p className="mb-6 text-gray-400 text-lg">
            We're sorry – we can't find the page you're looking for.
            </p>
            <br />
            <br />
            <MotionLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition"
            >
            Go home <ArrowRight className="ml-2 w-4 h-4" />
            </MotionLink>
        </motion.div>
        </div>
        <Footer/>
    </>
  );
}
