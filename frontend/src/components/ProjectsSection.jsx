import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import cooperative from "../assets/projects/cooperative.png";
import pharmacie from "../assets/projects/pharmacie2.png";
import { fadeUp, staggerContainer } from "../lib/motion";

import reactIcon from "../assets/icons/react.svg";
import laravel from "../assets/icons/laravel.svg";
import tailwind from "../assets/icons/tailwind.svg";
import mysql from "../assets/icons/mysql.svg";
import Axios from "../assets/icons/Axios.svg";

const techIcons = {
  React: reactIcon,
  TailwindCSS: tailwind,
  Laravel: laravel,
  MySQL: mysql,
  Axios: Axios,
};

const projects = [
  {
    title: "Protool",
    date: "February 24, 2022 - Now",
    description:
      "An all-in-one web and app development company offering advanced chatbot workflows, website development, and digital marketing services",
    image: cooperative,
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    url: "#",
  },
  {
    title: "Pharmacy Management",
    date: "March 10, 2025 - March 30, 2025",
    description:
      "In Pharmacy Management project, I developed key parts of the admin dashboard, including earnings reports, order management, medication CRUD, stock level tracking, and employee role management..",
    image: pharmacie,
    tags: ["React", "TailwindCSS" , "Axios"],
    url: "https://gestionpharmacie.netlify.app/",
  },
  {
    title: "Zenhostify",
    date: "February 24, 2021 - Now",
    description:
      "A modern hosting provider offering shared, WordPress, reseller, and cloud hosting with WHMCS integration and an affiliate system.",
    image: cooperative,
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    url: "#",
  },
];

export default function ProjectsSection({ count }) {
  const displayedProjects = count ? projects.slice(0, count) : projects;
  return (
    <motion.section
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-[var(--color-background)] text-[var(--color-text)] pt-10 px-4 max-w-5xl mx-auto"
    >
      {displayedProjects.map((project, index) => (
        <motion.div variants={fadeUp} key={index} className="mb-16">
          <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
          {project.date && (
            <p className="text-sm text-gray-400 mb-2">{project.date}</p>
          )}
          <p className="mb-4 max-w-3xl">{project.description}</p>
          <motion.div
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden rounded-md border border-[var(--color-nav-hover)] shadow-md"
          >
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full object-cover"
            />
          </motion.div>
          <div className="flex flex-wrap items-center mt-4 gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-[var(--color-nav-hover)] text-sm text-[var(--color-nav-text)] px-3 py-1 rounded-md"
              >
                {techIcons[tag] && (
                  <img
                    src={techIcons[tag]}
                    alt={`${tag} icon`}
                    className="w-4 h-4"
                  />
                )}
                {tag}
              </span>
            ))}
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Visit website <ExternalLink className="ml-2 w-4 h-4" />
          </motion.a>
        </motion.div>
      ))}
    </motion.section>
  );
}
