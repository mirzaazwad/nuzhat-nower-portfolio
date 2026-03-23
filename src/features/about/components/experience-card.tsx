"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "@phosphor-icons/react";
import { education, experience } from "@/lib/data/content";
import { TimelineItem } from "./timeline-item";

interface ExperienceCardProps {
  type: "education" | "experience";
}

export function ExperienceCard({ type }: ExperienceCardProps) {
  const data = type === "education" ? education : experience;
  const Icon = type === "education" ? GraduationCap : Briefcase;
  const title = type === "education" ? "Education" : "Experience";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-linear-to-br from-accent-green/20 to-accent-gold/20">
          <Icon className="size-6 text-accent-green" weight="duotone" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="space-y-0">
        {data.map((item, index) => (
          <TimelineItem
            key={item.id}
            title={
              type === "education"
                ? (item as (typeof education)[0]).degree
                : (item as (typeof experience)[0]).role
            }
            subtitle={
              type === "education"
                ? (item as (typeof education)[0]).institution
                : (item as (typeof experience)[0]).company
            }
            period={item.period}
            description={
              type === "experience"
                ? (item as (typeof experience)[0]).description
                : undefined
            }
            isLast={index === data.length - 1}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
