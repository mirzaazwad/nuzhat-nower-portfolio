"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { StaticImageData } from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  link: string;
  tags: readonly string[];
  index?: number;
}

export function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted border border-border">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH}${image}`}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-lg bg-secondary-gold text-primary-green-dark">
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-secondary-gold transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-primary-green/10 border border-primary-green/30 text-foreground hover:bg-secondary-gold/10">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}