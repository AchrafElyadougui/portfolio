import { useState, useRef, useEffect } from 'react';
import { CodeBracketIcon, ArrowRightIcon, ArrowDownTrayIcon, CursorArrowRippleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import github from '../assets/icons/github.svg'
import { Link } from 'react-router-dom';
import { fadeUp, viewportFadeUp } from '../lib/motion';
import RevealText from './RevealText';
import profilePhoto from '../assets/pic_profile.jpg';

const MotionLink = motion.create(Link);

export default function AboutSection() {
  const [flipped, setFlipped] = useState(false);
  const userInteractedRef = useRef(false);
  const autoFlipTimerRef = useRef(null);

  const toggleFlip = () => {
    userInteractedRef.current = true;
    setFlipped((f) => !f);
  };

  const handleStudioInView = () => {
    if (autoFlipTimerRef.current) return;
    autoFlipTimerRef.current = setTimeout(() => {
      if (!userInteractedRef.current) setFlipped(true);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (autoFlipTimerRef.current) clearTimeout(autoFlipTimerRef.current);
    };
  }, []);

  return (
    <div className="bg-[var(--color-backgorund-black)] text-[var(--color-text)] min-h-screen pb-3 py-12 md:px-5 flex flex-col md:flex-row gap-10">
      {/* Left Side - About Me */}
      <motion.div
        {...viewportFadeUp}
        className="flex-1 space-y-2 md:space-y-6"
      >
        <RevealText
          as="h1"
          className="text-4xl font-bold"
          segments={[
            { text: "About " },
            { text: "me.", className: "text-[var(--color-primary)]" },
          ]}
        />
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          Full Stack Developer, with a production mindset.
        </p>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          I build digital solutions and help keep systems reliable.
        </p>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          Software Engineering student and Full Stack Developer, working with <span className="text-[var(--color-text)]">Java, Spring Boot, React.js, Node.js, Laravel, and SQL/NoSQL databases</span>.
        </p>
        <p className="text-lg font-mono text-[var(--color-subtext)]">
          Alongside development, I work in IT supervision at <span className="text-[var(--color-text)]">Attijariwafa Bank</span> — monitoring information systems, ensuring their availability, and handling first-level incidents through established procedures.
        </p>
        <p className="text-lg font-mono pb-3 md:pb-0 text-[var(--color-subtext)]">
          This mix of building software and understanding production environments shapes how I work: reliable, practical solutions built for the real world.
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
        onViewportEnter={handleStudioInView}
        className="flex-1"
      >
        <div
          onClick={toggleFlip}
          className="relative w-full h-[550px] md:h-full min-h-[550px] cursor-pointer [perspective:1500px]"
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front - Photo */}
            <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-nav-hover)]">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover object-[50%_15%]"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_30px_rgba(0,0,0,0.5)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/10 to-black/20" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="-translate-y-48 bg-black/40 backdrop-blur-sm rounded-full p-4 border border-white/30"
                >
                  <CursorArrowRippleIcon className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <div className="absolute top-6 left-6 right-6">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-sm mb-2">
                  <CodeBracketIcon className="h-5 w-5" />
                  MY STUDIO
                </div>
                <p className="font-mono text-sm text-white/80">Click to flip</p>
              </div>
            </div>

            {/* Back - Studio Content */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[var(--color-nav-hover)] border border-[var(--color-border)] rounded-2xl p-6 space-y-3.5 md:space-y-6 shadow-xl overflow-y-auto">
              <div className="flex items-center gap-2 text-orange-500 font-mono text-sm">
                <CodeBracketIcon className="h-5 w-5" />
                MY STUDIO
              </div>
              {/* <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                Welcome to my workspace.
              </h2>
              <p className="text-lg font-mono text-[var(--color-subtext)]">
                This portfolio reflects my journey as a Software Engineering student and Full Stack Developer from Morocco. I build practical digital solutions with modern technologies while continuously improving my skills and experience.             
              </p> */}
              <p className="text-lg font-mono text-[var(--color-subtext)]">
                This portfolio is a glimpse into my journey as a Software Engineering student and Full Stack Developer from Morocco. Here, I share the projects, technologies, and experiences that shape the way I build software.{" "}
                <span className="text-[var(--color-text)] font-semibold">
                  I’m focused on building practical digital solutions
                </span>{" "}
                with modern technologies while continuously improving my technical skills and understanding of real-world systems.
              </p>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/CV_EL-YADOUGUI_ACHRAF.pdf"
                download="CV_EL-YADOUGUI_ACHRAF.pdf"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 mt-3.5 md:mt-0 border-2 border-[var(--color-border)] text-[var(--color-text)] font-mono rounded-lg hover:bg-neutral-400 hover:text-black transition w-fit"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Download CV
              </motion.a>

              {/* Cards */}
              <div className="hidden md:grid grid-cols-2 gap-4 text-[var(--color-subtext)] font-mono">
                  <div className="bg-[var(--color-background-white)] border border-[var(--color-border)] p-4 rounded-xl col-span-12 md:col-span-1">
                      <div className="text-orange-500 mb-2">💻</div>
                      <h3 className="text-[var(--color-text)] font-bold mb-1">Full Stack Development</h3>
                      <p className="text-sm">
                          Java, Spring Boot, React.js, Node.js, Laravel, SQL/NoSQL.
                      </p>
                  </div>
                  <div className="bg-[var(--color-background-white)] border border-[var(--color-border)] p-4 rounded-xl col-span-12 md:col-span-1">
                      <div className="text-orange-500 mb-2">⚙️</div>
                      <h3 className="text-[var(--color-text)] font-bold mb-1">IT Supervision</h3>
                      <p className="text-sm">
                          Monitoring systems and reliability at Attijariwafa Bank.
                      </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
