import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

function TagList({ tags, className }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-2 bg-[var(--color-nav-hover)] text-sm text-[var(--color-nav-text)] px-3 py-1 rounded-md"
        >
          {techIcons[tag] && (
            <img src={techIcons[tag]} alt={`${tag} icon`} className="w-4 h-4" />
          )}
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ProjectsSection({ count }) {
  const displayedProjects = count ? projects.slice(0, count) : projects;
  const [selectedTitle, setSelectedTitle] = useState(null);
  const selectedProject = projects.find((p) => p.title === selectedTitle);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedTitle(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <motion.section
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-[var(--color-background)] text-[var(--color-text)] pt-10 px-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {displayedProjects.map((project) => (
          <motion.div
            variants={fadeUp}
            key={project.title}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedTitle(project.title)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedTitle(project.title);
              }
            }}
            className="group text-left cursor-pointer outline-none rounded-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            <motion.div
              layoutId={`project-image-${project.title}`}
              className="overflow-hidden rounded-md border border-[var(--color-nav-hover)] shadow-md"
            >
              <motion.img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-44 object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </motion.div>
            <motion.h3
              layoutId={`project-title-${project.title}`}
              className="text-xl font-bold mt-3"
            >
              {project.title}
            </motion.h3>
            {project.date && (
              <p className="text-sm text-gray-400 mb-1">{project.date}</p>
            )}
            <p className="text-sm text-[var(--color-subtext)] line-clamp-2">
              {project.description}
            </p>
            <TagList tags={project.tags} className="mt-3" />
          </motion.div>
        ))}
      </motion.section>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setSelectedTitle(null)}
            />
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide"
              onClick={() => setSelectedTitle(null)}
            >
              <motion.div
                layoutId={`project-image-${selectedProject.title}`}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--color-background)] text-[var(--color-text)] rounded-xl overflow-hidden max-w-2xl w-full my-auto shadow-2xl"
              >
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title} preview`}
                  className="w-full max-h-72 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <motion.h3
                      layoutId={`project-title-${selectedProject.title}`}
                      className="text-2xl font-bold"
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <button
                      onClick={() => setSelectedTitle(null)}
                      aria-label="Close project details"
                      className="shrink-0 p-1 rounded-md hover:bg-[var(--color-nav-hover)]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    {selectedProject.date && (
                      <p className="text-sm text-gray-400 mt-1 mb-3">
                        {selectedProject.date}
                      </p>
                    )}
                    <p className="mb-4">{selectedProject.description}</p>
                    <TagList tags={selectedProject.tags} />
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-5 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Visit website <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
