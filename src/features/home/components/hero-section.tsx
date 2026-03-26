"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { personalInfo } from "@/lib/data/content";
import { Button } from "@/components/ui/button";
import { LaurelWreath } from "@/components/decorative/laurel-wreath";

const ThreeScene = dynamic(
  () =>
    import("@/components/three/three-scene").then((mod) => ({
      default: mod.ThreeScene,
    })),
  { ssr: false },
);

export function HeroSection() {
  return (
    <section className="relative z-0 min-h-[85vh] flex items-center overflow-hidden bg-background">
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      <div className="absolute inset-0 -z-20 opacity-20">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/images/kiss.jpg`}
          alt="The Kiss by Gustav Klimt - decorative background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Image with Laurel Wreath */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:order-2"
          >
            <div className="relative">
              {/* Laurel wreath decoration - Greek victory symbol */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <LaurelWreath size="lg" color="gold" />
              </div>

              {/* Profile image with clean frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-secondary-gold">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/images/image.jpg`}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Aphrodite-inspired corner decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-primary-green overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/images/Mythlok-Aphrodite.jpg`}
                  alt="Aphrodite decorative element"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-md text-sm font-medium tracking-wider uppercase text-primary-green-light bg-secondary-gold/10 border border-secondary-gold/30">
                {personalInfo.title} • {personalInfo.location}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-foreground"
            >
              <span className="block">Hello, I&apos;m</span>
              <span className="block mt-2 text-secondary-gold">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="rounded-lg bg-secondary-gold text-primary-green-dark hover:bg-secondary-gold-light font-semibold"
              >
                <Link href="/work">
                  <div className="flex items-center">
                    Explore My Work
                    <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="h-px flex-1 bg-border max-w-32" />
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-secondary-gold hover:border-secondary-gold transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.269c-.966 0-1.75-.79-1.75-1.759 0-.966.784-1.75 1.75-1.75s1.75.784 1.75 1.75c0 .969-.784 1.759-1.75 1.759zm12.5 12.269h-3v-5.469c0-1.305-.459-2.194-1.625-2.194-.889 0-1.416.598-1.649 1.176-.086.207-.107.496-.107.787v5.7h-3v-11h3v1.482c.396-.609 1.103-1.477 2.687-1.477 1.962 0 3.434 1.281 3.434 4.034v6.961z" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-secondary-gold hover:border-secondary-gold transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
              <div className="h-px flex-1 bg-border max-w-32" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
