"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { StaticImageData } from "next/image";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string | StaticImageData;
  date: string;
  tags: readonly string[];
  index?: number;
}

export function BlogCard({
  title,
  excerpt,
  image,
  date,
  tags,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href="#">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <time className="text-sm text-muted-foreground">{date}</time>
          </div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent-gold transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {excerpt}
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
