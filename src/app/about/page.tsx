"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { personalInfo, skills } from "@/lib/data/content";
import { ExperienceCard } from "@/features/about/components";
import { GreekColumn } from "@/components/decorative/greek-column";
import { LaurelWreath } from "@/components/decorative/laurel-wreath";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="About"
        title="Education & Experience"
        subtitle="My journey from developer to project manager, building skills across multiple domains."
        themeColor="green"
      />

      {/* Bio Section with Greek Theme */}
      <AnimatedSection className="mb-16">
        <div className="relative bg-card rounded-2xl border border-border p-6 md:p-8 overflow-hidden">
          {/* Decorative Greek columns */}
          <div className="absolute left-0 top-0 bottom-0 w-8 opacity-30">
            <GreekColumn style="ionic" color="green" height="lg" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 opacity-30 rotate-180">
            <GreekColumn style="ionic" color="green" height="lg" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Greek-themed Profile Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative shrink-0"
            >
              {/* Laurel Wreath above - Greek symbol of victory */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <LaurelWreath size="md" color="gold" />
              </div>

              {/* Profile image with Greek-style frame */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mt-8">
                <div className="absolute inset-0 rounded-full border-4 border-secondary-gold" />
                <div className="absolute inset-2 rounded-full border-2 border-primary-green" />
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/images/kiss.jpg`}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold mb-4 text-secondary-gold">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Greek mythology & Harry Potter inspired tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm italic text-secondary-gold/80"
              >
                &ldquo;Inspired by the passion of Frida Kahlo, the beauty of
                Aphrodite, and the resilience of Persephone.&rdquo;
              </motion.p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* House Values Section - Harry Potter Theme */}
      <AnimatedSection className="mb-16">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-secondary-gold">
            Core Values
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Hufflepuff values */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-lg border-2 border-secondary-gold bg-secondary-gold/5"
            >
              <h3 className="font-bold text-secondary-gold mb-2">
                Hufflepuff Dedication
              </h3>
              <p className="text-sm text-muted-foreground">
                &ldquo;Those patient Hufflepuffs are true and unafraid of
                toil.&rdquo; - Valuing hard work, patience, loyalty, and fair
                play.
              </p>
            </motion.div>

            {/* Slytherin values (without snake reference) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg border-2 border-primary-green bg-primary-green/5"
            >
              <h3 className="font-bold text-primary-green-light mb-2">
                Slytherin Ambition
              </h3>
              <p className="text-sm text-muted-foreground">
                &ldquo;Those cunning folks use any means to achieve their
                ends.&rdquo; - Driven by ambition, cunning, leadership, and
                resourcefulness.
              </p>
            </motion.div>
          </div>
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
          <h2 className="text-xl font-bold mb-6 text-secondary-gold">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-lg border border-secondary-gold/50 bg-primary-green/10 text-sm font-medium hover:bg-secondary-gold/10 transition-colors cursor-default text-foreground"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
