import ProjectsSection from '../components/ProjectsSection'
import github from '../assets/icons/github.svg'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { viewportFadeUp } from '../lib/motion'
import RevealText from '../components/RevealText'


export default function ProjectsPage() {
  return (
    <div className='pb-20'>
        <div className='text-[var(--color-text)] max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='grid gap-4'
          >
            <RevealText as="h1" className='text-3xl font-bold' segments={[{ text: 'My Work.' }]} />
            <h3>I have been programming for 7 years and have worked on numerous projects. Below are some of my latest projects; you can find more on my GitHub profile.</h3>
          </motion.div>
          <ProjectsSection/>
          <motion.div {...viewportFadeUp} className='grid gap-5'>
            <p className='text-lg'>Want to see more? Check out my GitHub profile for more projects and contributions.</p>
            <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://github.com/AchrafElyadougui"
                target="_blank"
                className="flex items-center w-60 h-fit gap-3 bg-[var(--color-button-primary)] hover:bg-[var(--color-button-hover)] text-white font-mono px-4 py-2 rounded-lg group"
            >
                <img src={github} alt={`github icon`} className="h-8 w-8"/>
                View my Github
                <ArrowRight size={17} className='duration-300 group-hover:translate-x-3'/>
            </motion.a>
          </motion.div>
        </div>
    </div>
  )
}
