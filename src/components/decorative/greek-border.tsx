"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GreekBorderProps {
  orientation?: "horizontal" | "vertical";
  color?: "gold" | "green" | "copper";
  thickness?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const colorVariants = {
  gold: {
    stroke: "var(--accent-gold)",
    fill: "var(--accent-gold)",
  },
  green: {
    stroke: "var(--accent-green)",
    fill: "var(--accent-green)",
  },
  copper: {
    stroke: "var(--accent-copper)",
    fill: "var(--accent-copper)",
  },
};

const thicknessVariants = {
  sm: { width: 8, height: 8, strokeWidth: 1.5 },
  md: { width: 12, height: 12, strokeWidth: 2 },
  lg: { width: 16, height: 16, strokeWidth: 2.5 },
};

export function GreekBorder({
  orientation = "horizontal",
  color = "gold",
  thickness = "md",
  animated = true,
  className,
}: GreekBorderProps) {
  const { width, height, strokeWidth } = thicknessVariants[thickness];
  const { stroke } = colorVariants[color];

  // Greek key/meander pattern - single unit
  const meanderPath = `
    M 0 ${height}
    L 0 0
    L ${width * 0.75} 0
    L ${width * 0.75} ${height * 0.5}
    L ${width * 0.25} ${height * 0.5}
    L ${width * 0.25} ${height}
    L ${width * 0.5} ${height}
  `;

  const repeatCount = orientation === "horizontal" ? 8 : 1;
  const patternWidth = width * repeatCount;

  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "w-full justify-center" : "h-full flex-col",
        className
      )}
    >
      <motion.svg
        viewBox={`0 0 ${patternWidth} ${height}`}
        className={cn(
          orientation === "horizontal" ? "w-full max-w-2xl h-auto" : "w-auto h-full"
        )}
        initial={animated ? { opacity: 0, scaleX: 0.8 } : { opacity: 1 }}
        whileInView={animated ? { opacity: 1, scaleX: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ minWidth: orientation === "horizontal" ? patternWidth : width }}
      >
        <defs>
          <pattern
            id={`meander-${color}`}
            patternUnits="userSpaceOnUse"
            width={width}
            height={height}
          >
            <path
              d={meanderPath}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </pattern>
        </defs>
        {orientation === "horizontal" ? (
          <rect
            x="0"
            y="0"
            width={patternWidth}
            height={height}
            fill={`url(#meander-${color})`}
          />
        ) : (
          <g>
            {/* Vertical pattern - rotate the meander */}
            {Array.from({ length: 4 }).map((_, i) => (
              <path
                key={i}
                d={meanderPath}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="square"
                strokeLinejoin="miter"
                transform={`translate(0, ${i * height})`}
              />
            ))}
          </g>
        )}
      </motion.svg>
    </div>
  );
}