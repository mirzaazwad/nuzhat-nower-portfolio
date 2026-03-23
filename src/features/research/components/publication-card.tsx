"use client";

import { motion } from "framer-motion";
import { FilePdfIcon, CalendarIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Document, Page, pdfjs } from "react-pdf";
import type { StaticImageData } from "next/image";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-secondary-gold/50 transition-colors"
    >
      {/* PDF Preview Snapshot */}
      <div className="aspect-4/3 bg-muted relative overflow-hidden flex items-start justify-center pt-8">
        <div className="w-[85%] origin-top hover:scale-[1.02] transition-transform duration-500 ease-out shadow-lg opacity-80 group-hover:opacity-100">
          <Document
            file={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/${typeof pdf === "string" ? pdf : pdf.src}`}
            loading={<div className="w-full aspect-[1/1.4] animate-pulse bg-muted-foreground/10 rounded-sm" />}
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={350}
              className="rounded-sm overflow-hidden border border-border/50"
            />
          </Document>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-secondary-gold/10 border border-secondary-gold/30 text-foreground">
            <CalendarIcon className="size-3" />
            {date}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">{venue}</Badge>
        </div>

        <h3 className="text-xl font-semibold tracking-tight mb-2 text-foreground group-hover:text-secondary-gold transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        <a
          href={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}/${typeof pdf === "string" ? pdf : pdf.src}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary-gold hover:text-secondary-gold-light transition-colors"
        >
          <FilePdfIcon className="size-4" />
          View Paper
        </a>
      </div>
    </motion.article>
  );
}