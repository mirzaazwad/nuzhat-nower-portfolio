import { Metadata } from "next";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { personalInfo, skills } from "@/lib/data/content";
import { ExperienceCard } from "@/features/about/components";

export const metadata: Metadata = {
  title: "About | Nuzhat Nower",
  description: "Learn about Nuzhat Nower's education, experience, and skills.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="About"
        title="Education & Experience"
        subtitle="My journey from developer to project manager, building skills across multiple domains."
        themeColor="green"
      />

      {/* Bio Section */}
      <AnimatedSection className="mb-16">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            {personalInfo.bio}
          </p>
        </div>
      </AnimatedSection>

      {/* Experience & Education Grid */}
      <div className="grid gap-8 lg:grid-cols-2 mb-16">
        <ExperienceCard type="experience" />
        <ExperienceCard type="education" />
      </div>

      {/* Skills Section */}
      <AnimatedSection>
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-accent-warm/50 border border-accent-gold/30 text-sm font-medium hover:bg-accent-gold/20 transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}