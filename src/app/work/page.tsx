"use client";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { projects } from "@/lib/data/content";
import { ProjectCard } from "@/features/work/components";

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="Work"
        title="My Projects"
        subtitle="A collection of projects I've worked on, showcasing my skills in project management, web development, and mobile applications."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <AnimatedSection key={project.id} delay={index * 0.1}>
            <ProjectCard
              id={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              tags={project.tags}
              index={index}
            />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
