import cooperative from "../assets/projects/cooperative.webp";
import pharmacie2 from "../assets/projects/pharmacie2.webp";

import reactIcon from "../assets/icons/react.svg";
import laravel from "../assets/icons/laravel.svg";
import tailwind from "../assets/icons/tailwind.svg";
import mysql from "../assets/icons/mysql.svg";
import axios from "../assets/icons/Axios.svg";

export const techIcons = {
  React: reactIcon,
  Laravel: laravel,
  TailwindCSS: tailwind,
  MySQL: mysql,
  Axios: axios,
};

// image: null renders a professional placeholder instead of a broken/faked
// screenshot. github/demo: null hides the corresponding link rather than
// pointing at a dead "#".
export const projects = [
  {
    title: "Digitalisation de la gestion des courriers administratifs",
    subtitle: "Academic project (PFE)",
    category: "Full Stack",
    role: "Full Stack Developer",
    description:
      "A dedicated web platform that digitalizes and optimizes the management of physical administrative mail. It lets organizations manage requests, assign processing steps, track the progress of physical documents, manage couriers/users, and improve visibility across the entire processing workflow.",
    features: [
      "Administrative workflow management",
      "Request tracking",
      "Courier & user/role management",
      "Role-based access control",
      "Notifications",
      "JWT authentication",
    ],
    tags: ["React", "Spring Boot", "PostgreSQL", "JWT", "RBAC"],
    image: null,
    github: null,
    demo: null,
  },
  {
    title: "Protool",
    category: "Full Stack",
    dateRange: "February 2022 — Present",
    description:
      "An all-in-one web and app development company platform offering advanced chatbot workflows, website development, and digital marketing services.",
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    image: cooperative,
    github: null,
    demo: null,
  },
  {
    title: "Pharmacy Management",
    category: "Frontend",
    dateRange: "March 2025",
    description:
      "Key parts of a pharmacy admin dashboard: earnings reports, order management, medication CRUD, stock level tracking, and employee role management.",
    tags: ["React", "TailwindCSS", "Axios"],
    image: pharmacie2,
    github: null,
    demo: "https://gestionpharmacie.netlify.app/",
  },
  {
    title: "Zenhostify",
    category: "Full Stack",
    dateRange: "February 2021 — Present",
    description:
      "A modern hosting provider offering shared, WordPress, reseller, and cloud hosting with WHMCS integration and an affiliate system.",
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    image: cooperative,
    github: null,
    demo: null,
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
