import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motion";

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="border-t mt-16 py-10 px-6 text-[var(--color-text)]"
    >
      <p className="text-center text-sm text-gray-500 mb-10">
        Copyright © 2024 <span className="font-medium">EL Yadougui Achraf</span>
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div>
          <h4 className="font-semibold mb-2">Important Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/projects" className="hover:underline">My work</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Social</h4>
          <ul className="space-y-1">
            <li><Link to="/github" className="hover:underline">Github</Link></li>
            <li><Link to="/instagram" className="hover:underline">Instagram</Link></li>
            <li><Link to="/discord" className="hover:underline">Discord</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Other</h4>
          <ul className="space-y-1">
            <li><Link to="/tools" className="hover:underline">What I use</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
    </motion.footer>
  );
}
