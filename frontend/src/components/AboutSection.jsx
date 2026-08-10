import { CodeBracketIcon, ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import github from '../assets/icons/github.svg'
import { Link } from 'react-router-dom';
import { fadeUp, viewportFadeUp } from '../lib/motion';

const MotionLink = motion.create(Link);

export default function AboutSection() {
  return (
    <div className="bg-[var(--color-backgorund-black)] text-[var(--color-text)] min-h-screen px-6 py-12 md:px-5 flex flex-col md:flex-row gap-10">
      {/* Left Side - About Me */}
      <motion.div
        {...viewportFadeUp}
        className="flex-1 space-y-6"
      >
        <h1 className="text-4xl font-bold">
          About <span className="text-[var(--color-primary)]">me.</span>
        </h1>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          I have been coding for over 2 years, starting my journey in  <span className="text-[var(--color-text)]">2023</span>. I began by learning the fundamentals of HTML, CSS, JavaScript, and PHP to build functional and responsive websites.
        </p>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          My very first project—a simple website—was built in (~mid-<span className="text-[var(--color-text)]">2023</span>) using PHP, HTML, and Bootstrap 5.
        </p>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          Since then, I have focused on mastering React.js for frontend development and Laravel for backend solutions. Today, I’m passionate about building full-stack web applications that are both efficient and user-friendly.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://github.com/AchrafElyadougui"
            target="_blank"
            className="flex items-center gap-2 bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] text-white font-mono px-4 py-2 rounded-lg"
          >
            <img src={github} alt={`github icon`} className="h-8 w-8"/>
            View my Github
          </motion.a>
          <MotionLink
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            to="/contact"
            className="flex items-center gap-2 border border-[var(--color-border)] font-mono px-4 py-2 rounded-lg hover:bg-neutral-400 hover:text-black transition"
          >
            Contact me <ArrowRightIcon className="h-4 w-4" />
          </MotionLink>
        </div>
      </motion.div>

      {/* Right Side - Studio Box */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.15 }}
        className="flex-1 m-auto bg-[var(--color-nav-hover)] border border-[var(--color-border)] rounded-2xl p-6 space-y-6 shadow-xl "
      >
        <div className="flex items-center gap-2 text-orange-500 font-mono text-sm">
          <CodeBracketIcon className="h-5 w-5" />
          MY STUDIO
        </div>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
           Hello and welcome! This site isn't just about showcasing code — it's about sharing the journey of a passionate developer from  Morocco building one line at a time. Explore my projects and see what drives me.
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-border)] text-[var(--color-text)] font-mono rounded-lg hover:bg-neutral-400 hover:text-black transition"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Download CV
        </motion.button>

        {/* Cards */}
        <div className="grid grid-cols-12 md:grid-cols-2 gap-4 text-[var(--color-subtext)] font-mono">
            <div className="bg-[var(--color-background-white)] border border-[var(--color-border)] p-4 rounded-xl col-span-12">
                <div className="text-orange-500 mb-2">💻</div>
                <h3 className="text-[var(--color-text)] font-bold mb-1">Web Development</h3>
                <p className="text-sm">
                    Crafting fast, reliable websites with clean code and a solid foundation in SEO best practices .
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
