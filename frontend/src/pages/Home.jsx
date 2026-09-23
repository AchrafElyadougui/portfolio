import AboutMe from '../components/AboutMe'
import AboutSection from '../components/AboutSection'
import ProjectsSection from '../components/ProjectsSection'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportFadeUp } from '../lib/motion'
import reactIcon from "../assets/icons/react.svg";
import laravel from "../assets/icons/laravel.svg";
import tailwind from "../assets/icons/tailwind.svg";
import mysql from "../assets/icons/mysql.svg";
import MongoBD from '../assets/icons/mongo.svg';
import Bootstrap from '../assets/icons/bootstrap.svg';
import Express from '../assets/icons/express.svg';
import API from '../assets/icons/api.svg';
import PHP from '../assets/icons/php.svg';
import JS from '../assets/icons/javascript.svg';
import NPM from '../assets/icons/npm.svg';
import Git from '../assets/icons/git.svg';
import GitHub from '../assets/icons/github.svg';
import Jira from '../assets/icons/jira.svg';
import Figma from '../assets/icons/figma.svg';
import Docker from '../assets/icons/docker.svg';
import Microsoft from '../assets/icons/microsoft.svg';
import ContactSection from '../components/ContactSection';
import RevealText from '../components/RevealText';

const techIcons = [
    {name:'React',icon:reactIcon},
    {name:'Laravel',icon:laravel},
    {name:'Tailwind CSS',icon:tailwind},
    {name:'Bootstrap 5',icon:Bootstrap},
    {name:'MySQL',icon:mysql},
    {name:'MongoBD',icon:MongoBD},
    {name:'Express JS',icon:Express},
    {name:'API',icon:API},
    {name:'PHP',icon:PHP},
    {name:'JavaScript',icon:JS},
    {name:'NPM',icon: NPM},
    {name:'Git',icon: Git},
    {name:'GitHub',icon: GitHub},
    {name:'Jira',icon: Jira},
    {name:'Docker',icon: Docker},
    {name:'Figma',icon: Figma},
    {name:'Microsoft Office 365',icon: Microsoft},
]

export default function Home() {
  return (
      <div className='flex justify-center flex-col font-mono'>
        <div className='flex'>
          <AboutMe/>
        </div>
        <AboutSection/>
        <div className='text-[var(--color-text)] w-full md:max-w-5xl mx-auto mt-10'>
          <motion.div {...viewportFadeUp} className='grid gap-4'>
            <RevealText as="h1" className='text-3xl font-bold' segments={[{ text: 'Recent Projects.' }]} />
            <p>Explore some of my recent projects below. For more, visit my GitHub profile.</p>
          </motion.div>
          <ProjectsSection count={3}/>
          <div className="text-center mt-10 mb-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                to='/projects'
                className="text-sm bg-[var(--color-nav-hover)] px-4 py-2 rounded-md text-[var(--color-text)] hover:underline"
              >
                View all projects →
              </Link>
            </motion.div>
          </div>
        </div>
        <div className='text-[var(--color-text)] max-w-5xl grid gap-5 pb-7'>
            <RevealText as="h1" className='text-3xl font-bold' segments={[{ text: 'Technologies I use.' }]} />
            <p>Over the years, I have worked with a variety of technologies. Here are some of the technologies I have experience with:</p>
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className='flex gap-2 flex-wrap'
            >
                {techIcons.map((tag, i) => (
                    <motion.span
                        key={i}
                        variants={fadeUp}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="w-fit h-fit flex items-center gap-2 bg-[var(--color-nav-hover)] text-[var(--color-nav-text)] px-5 py-1 rounded-md"
                    >
                        <img
                            src={tag.icon}
                            alt={`${tag.name} icon`}
                            className="w-6 h-6"
                        />
                        {tag.name}
                    </motion.span>
                ))}
            </motion.div>
            <p className='text-center'>...and many more !</p>
        </div>

        <ContactSection/>
      </div>
  )
}
