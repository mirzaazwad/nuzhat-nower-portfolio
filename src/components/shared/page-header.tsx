"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
  themeColor?: "gold" | "green" | "mixed";
}

export function PageHeader({
  title,
  subtitle,
  accent,
  className,
  themeColor = "green",
}: PageHeaderProps) {
  // Use block colors instead of gradients
  const titleColor =
    themeColor === "green"
      ? "text-secondary-gold"
      : themeColor === "mixed"
        ? "text-secondary-gold"
        : "text-secondary-gold";

  const accentBg =
    themeColor === "green"
      ? "bg-primary-green-light"
      : themeColor === "mixed"
        ? "bg-secondary-gold"
        : "bg-secondary-gold";

  const accentTextColor =
    themeColor === "green"
      ? "text-primary-green-dark"
      : "text-primary-green-dark";

  const dividerColor =
    themeColor === "green"
      ? "bg-secondary-gold"
      : "bg-secondary-gold";

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 md:mb-16", className)}
    >
      {accent && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "inline-block px-3 py-1 rounded-md text-sm font-medium tracking-wider uppercase mb-4",
            accentBg,
            accentTextColor
          )}
        >
          {accent}
        </motion.span>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        <span className={cn("block", titleColor)}>
          {title}
        </span>
      </h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          "mt-6 h-1 w-24 rounded-full origin-left",
          dividerColor
        )}
      />
    </motion.header>
  );
}