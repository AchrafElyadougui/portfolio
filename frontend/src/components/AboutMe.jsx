import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import myPhoto from "../assets/background.png"; // replace with your actual image
import { staggerContainer, fadeUp } from "../lib/motion";

export default function AboutMe() {
  return (
<section
  className="relative mx-auto w-[100%] md:w-[1000px] h-[480px] rounded-2xl text-white min-h-[80dvh] xxs:min-h-[65dvh] xs:min-h-[55dvh] bg-cover bg-right md:bg-center bg-no-repeat mb-8 overflow-hidden" style={{ backgroundImage: `url(${myPhoto})` }}>
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full flex flex-col md:flex-row"
      >

        {/* Left Text Content */}
        <div className="w-full md:pl-10 px-5 md:px-8 overflow-hidden md:w-1/2 z-10 mt-7">
          <motion.p variants={fadeUp} className="flex items-center gap-2 text-sm uppercase tracking-wider text-white/80 mb-2">
            <Globe size={16} />
            About Me
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-2xl md:text-4xl sm:text-3xl font-bold mb-4">
            hey, I'm <span className="text-white">Achraf</span> 👋
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 font-mono ">
            FullStack Web Developer from Morocco, driven by passion and dedicated to crafting innovative and engaging digital experiences through cutting-edge web technologies.
          </motion.p>

          {/* Mission Card */}
          <motion.div variants={fadeUp} className="mt-6 p-5 bg-white/10 backdrop-blur-sm rounded-2xl w-full max-w-md">
            <p className="flex items-center gap-2 text-sm uppercase font-bold text-white/90 mb-3">
              🚀 My Mission
            </p>
            <p className="text-white/80 font-mono leading-relaxed">
              Bridging the gap between frontend and backend: Where clean code meets powerful functionality, and innovation drives every line I write.
            </p>
            <p className="italic font-semibold mt-2">
              Keep building, keep evolving. <span role="img" aria-label="rocket">🚀</span>
            </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
