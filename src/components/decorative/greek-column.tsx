"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GreekColumnProps {
  style?: "doric" | "ionic" | "corinthian";
  height?: "sm" | "md" | "lg";
  color?: "gold" | "green" | "copper";
  animated?: boolean;
  className?: string;
}

const heightVariants = {
  sm: { height: 100, width: 40 },
  md: { height: 150, width: 50 },
  lg: { height: 200, width: 60 },
};

const colorVariants = {
  gold: {
    stroke: "var(--secondary-gold)",
    fill: "var(--secondary-gold)",
  },
  green: {
    stroke: "var(--primary-green-light)",
    fill: "var(--primary-green)",
  },
  copper: {
    stroke: "var(--secondary-gold-dark)",
    fill: "var(--secondary-gold-dark)",
  },
};

export function GreekColumn({
  style = "doric",
  height = "md",
  color = "gold",
  animated = true,
  className,
}: GreekColumnProps) {
  const { height: h, width: w } = heightVariants[height];
  const { stroke, fill } = colorVariants[color];

  // Column proportions
  const baseHeight = h * 0.12;
  const capitalHeight = style === "doric" ? h * 0.08 : h * 0.15;
  const shaftHeight = h - baseHeight - capitalHeight;
  const shaftWidth = w * 0.7;
  const capitalWidth = style === "corinthian" ? w * 1.3 : w;

  // Doric: simple capital, no base
  // Ionic: scroll-like volutes on capital
  // Corinthian: elaborate acanthus leaves on capital

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      initial={animated ? { opacity: 0, y: 20 } : { opacity: 1 }}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox={`0 0 ${capitalWidth} ${h}`}
        className="w-full h-full"
        style={{ maxWidth: capitalWidth, maxHeight: h }}
      >
        <defs>
          <linearGradient id={`column-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.3" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`column-stroke-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="50%" stopColor={stroke} stopOpacity="1" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Capital (top) */}
        {style === "doric" && (
          <motion.rect
            x={(capitalWidth - w) / 2}
            y="0"
            width={w}
            height={capitalHeight}
            fill={`url(#column-gradient-${color})`}
            stroke={`url(#column-stroke-${color})`}
            strokeWidth="1"
            initial={animated ? { scaleX: 0 } : { scaleX: 1 }}
            whileInView={animated ? { scaleX: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          />
        )}

        {style === "ionic" && (
          <g>
            {/* Simple scroll/volute representation */}
            <rect
              x={(capitalWidth - w) / 2}
              y="0"
              width={w}
              height={capitalHeight * 0.4}
              fill={`url(#column-gradient-${color})`}
              stroke={`url(#column-stroke-${color})`}
              strokeWidth="1"
            />
            {/* Left volute */}
            <ellipse
              cx={(capitalWidth - w) / 2 + w * 0.15}
              cy={capitalHeight * 0.7}
              rx={w * 0.12}
              ry={capitalHeight * 0.3}
              fill="none"
              stroke={`url(#column-stroke-${color})`}
              strokeWidth="1.5"
            />
            {/* Right volute */}
            <ellipse
              cx={(capitalWidth - w) / 2 + w * 0.85}
              cy={capitalHeight * 0.7}
              rx={w * 0.12}
              ry={capitalHeight * 0.3}
              fill="none"
              stroke={`url(#column-stroke-${color})`}
              strokeWidth="1.5"
            />
          </g>
        )}

        {style === "corinthian" && (
          <g>
            {/* Elaborate capital with acanthus suggestion */}
            <rect
              x={(capitalWidth - w) / 2}
              y="0"
              width={w}
              height={capitalHeight * 0.3}
              fill={`url(#column-gradient-${color})`}
              stroke={`url(#column-stroke-${color})`}
              strokeWidth="1"
            />
            {/* Acanthus leaves suggestion */}
            {Array.from({ length: 6 }).map((_, i) => (
              <path
                key={i}
                d={`M ${(capitalWidth - w) / 2 + w * (i / 6)} ${capitalHeight * 0.3}
                   Q ${capitalWidth / 2 - w * 0.2 + i * w * 0.1} ${capitalHeight * 0.1}
                   ${capitalWidth / 2 + (i - 3) * w * 0.08} ${capitalHeight * 0.6}`}
                fill="none"
                stroke={`url(#column-stroke-${color})`}
                strokeWidth="0.75"
              />
            ))}
          </g>
        )}

        {/* Shaft (middle) - with vertical fluting */}
        <rect
          x={(capitalWidth - shaftWidth) / 2}
          y={capitalHeight}
          width={shaftWidth}
          height={shaftHeight}
          fill={`url(#column-gradient-${color})`}
          stroke={`url(#column-stroke-${color})`}
          strokeWidth="1"
        />

        {/* Vertical lines for fluting */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.line
            key={i}
            x1={(capitalWidth - shaftWidth) / 2 + shaftWidth * ((i + 1) / 6)}
            y1={capitalHeight}
            x2={(capitalWidth - shaftWidth) / 2 + shaftWidth * ((i + 1) / 6)}
            y2={capitalHeight + shaftHeight}
            stroke={`url(#column-stroke-${color})`}
            strokeWidth="0.5"
            opacity="0.3"
            initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
            whileInView={animated ? { pathLength: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
          />
        ))}

        {/* Base (bottom) */}
        <rect
          x={(capitalWidth - w) / 2}
          y={capitalHeight + shaftHeight}
          width={w}
          height={baseHeight}
          fill={`url(#column-gradient-${color})`}
          stroke={`url(#column-stroke-${color})`}
          strokeWidth="1"
        />

        {/* Base molding */}
        <rect
          x={(capitalWidth - w * 1.1) / 2}
          y={capitalHeight + shaftHeight + baseHeight - 4}
          width={w * 1.1}
          height="4"
          fill={`url(#column-gradient-${color})`}
          stroke={`url(#column-stroke-${color})`}
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}