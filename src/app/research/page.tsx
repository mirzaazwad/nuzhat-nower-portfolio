"use client";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { publications } from "@/lib/data/content";
import { PublicationCard } from "@/features/research/components";

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="Research"
        title="Publications"
        subtitle="My academic contributions in natural language processing and health informatics."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {publications.map((publication, index) => (
          <AnimatedSection key={publication.id} delay={index * 0.1}>
            <PublicationCard
              id={publication.id}
              title={publication.title}
              venue={publication.venue}
              date={publication.date}
              description={publication.description}
              pdf={publication.pdf}
              index={index}
            />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
