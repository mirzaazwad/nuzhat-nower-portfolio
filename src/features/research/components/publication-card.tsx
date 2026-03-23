"use client";

import { motion } from "framer-motion";
import { FilePdfIcon, CalendarIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { StaticImageData } from "next/image";

interface PublicationCardProps {
  id: string;
  title: string;
  venue: string;
  date: string;
  description: string;
  pdf: string | StaticImageData;
  index?: number;
}

export function PublicationCard({
  title,
  venue,
  date,
  description,
  pdf,
  index = 0,
}: PublicationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-accent-gold/50 transition-colors"
    >
      {/* PDF Preview */}
      <div className="aspect-4/3 bg-muted relative overflow-hidden">
        <embed
          src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/${typeof pdf === "string" ? pdf : pdf.src}`}
          type="application/pdf"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="flex items-center gap-1.5">
            <CalendarIcon className="size-3" />
            {date}
          </Badge>
          <Badge variant="outline">{venue}</Badge>
        </div>

        <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-accent-gold transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        <a
          href={typeof pdf === "string" ? pdf : pdf.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold hover:text-accent-copper transition-colors"
        >
          <FilePdfIcon className="size-4" />
          View Paper
        </a>
      </div>
    </motion.article>
  );
}
