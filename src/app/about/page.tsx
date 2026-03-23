"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader } from "@/components/shared";
import { AnimatedSection } from "@/components/shared";
import { personalInfo, skills } from "@/lib/data/content";
import { ExperienceCard } from "@/features/about/components";
import { FridaFrame } from "@/components/decorative/frida-frame";
import { GreekColumn } from "@/components/decorative/greek-column";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <PageHeader
        accent="About"
        title="Education & Experience"
        subtitle="My journey from developer to project manager, building skills across multiple domains."
        themeColor="green"
      />

      {/* Bio Section with Frida Kahlo Art Integration */}
      <AnimatedSection className="mb-16">
        <div className="relative bg-card rounded-2xl border border-border p-6 md:p-8 overflow-hidden">
          {/* Decorative Greek columns */}
          <div className="absolute left-0 top-0 bottom-0 w-8 opacity-20">
            <GreekColumn style="ionic" color="gold" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 opacity-20 rotate-180">
            <GreekColumn style="ionic" color="gold" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Frida Kahlo Inspired Art Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Frida Frame with decorative border */}
                <FridaFrame variant="full" size="lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#c41e3a]/30">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/images/frida.jpg`}
                      alt="Frida Kahlo inspired artwork"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Artistic inspiration tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm italic text-accent-copper"
              >
                &ldquo;Inspired by the passion of Frida Kahlo, the beauty of Aphrodite, and the resilience of Persephone.&rdquo;
              </motion.p>
            </div>
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
          <h2 className="text-xl font-bold mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-accent-warm/50 border border-accent-gold/30 text-sm font-medium hover:bg-accent-gold/20 transition-colors cursor-default"
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