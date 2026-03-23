"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
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
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-2 rounded-full bg-accent-gold/90 text-background">
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent-gold transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
