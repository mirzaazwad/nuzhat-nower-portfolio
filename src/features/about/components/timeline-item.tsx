"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  icon?: ReactNode;
  isLast?: boolean;
  index?: number;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  icon,
  isLast = false,
  index = 0,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-secondary-gold flex items-center justify-center text-primary-green-dark shrink-0">
          {icon || <div className="w-3 h-3 rounded-full bg-primary-green" />}
        </div>
        {!isLast && (
          <div className="flex-1 w-0.5 bg-secondary-gold/30" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-8", isLast && "pb-0")}>
        <span className="text-sm text-secondary-gold-dark font-medium">{period}</span>
        <h3 className="text-lg font-semibold mt-1 text-foreground">{title}</h3>
        <p className="text-secondary-gold font-medium">{subtitle}</p>
        {description && (
          <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        )}
      </div>
    </motion.div>
  );
}