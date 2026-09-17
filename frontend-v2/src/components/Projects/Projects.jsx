import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          number="03"
          label="Selected Work"
          title="Projects."
          subtitle="A mix of professional, freelance and academic work."
        />

        <div className="mt-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
