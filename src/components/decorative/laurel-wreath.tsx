"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LaurelWreathProps {
  size?: "sm" | "md" | "lg";
  color?: "gold" | "green" | "copper";
  animated?: boolean;
  className?: string;
}

const sizeVariants = {
  sm: { width: 80, height: 60, leafSize: 8 },
  md: { width: 120, height: 90, leafSize: 12 },
  lg: { width: 160, height: 120, leafSize: 16 },
};

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

export function LaurelWreath({
  size = "md",
  color = "gold",
  animated = true,
  className,
}: LaurelWreathProps) {
  const { width, height, leafSize } = sizeVariants[size];
  const { stroke, fill } = colorVariants[color];

  // Laurel leaf path
  const leafPath = `
    M 0 ${leafSize * 0.5}
    C ${leafSize * 0.3} 0, ${leafSize * 0.7} 0, ${leafSize} ${leafSize * 0.5}
    C ${leafSize * 0.7} ${leafSize}, ${leafSize * 0.3} ${leafSize}, 0 ${leafSize * 0.5}
  `;

  // Number of leaves per side
  const leavesPerSide = size === "sm" ? 4 : size === "md" ? 5 : 6;
  const angleStep = 15;

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
      initial={animated ? { opacity: 0, scale: 0.9 } : { opacity: 1 }}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ maxWidth: width }}
      >
        <defs>
          <linearGradient id={`laurel-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Center element - simplified ribbon/bow */}
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={leafSize * 1.5}
          ry={leafSize}
          fill={`url(#laurel-gradient-${color})`}
          opacity="0.8"
        />

        {/* Left side leaves */}
        {Array.from({ length: leavesPerSide }).map((_, i) => {
          const angle = -90 + (i + 1) * angleStep;
          const radius = (width / 2) - leafSize;
          const x = (width / 2) + radius * Math.cos((angle * Math.PI) / 180);
          const y = (height / 2) + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.g
              key={`left-${i}`}
              initial={animated ? { opacity: 0, scale: 0 } : { opacity: 1 }}
              whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <path
                d={leafPath}
                fill={`url(#laurel-gradient-${color})`}
                stroke={stroke}
                strokeWidth="0.5"
                transform={`translate(${x - leafSize / 2}, ${y - leafSize / 2}) rotate(${angle + 90})`}
              />
            </motion.g>
          );
        })}

        {/* Right side leaves */}
        {Array.from({ length: leavesPerSide }).map((_, i) => {
          const angle = 90 - (i + 1) * angleStep;
          const radius = (width / 2) - leafSize;
          const x = (width / 2) + radius * Math.cos((angle * Math.PI) / 180);
          const y = (height / 2) + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.g
              key={`right-${i}`}
              initial={animated ? { opacity: 0, scale: 0 } : { opacity: 1 }}
              whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <path
                d={leafPath}
                fill={`url(#laurel-gradient-${color})`}
                stroke={stroke}
                strokeWidth="0.5"
                transform={`translate(${x - leafSize / 2}, ${y - leafSize / 2}) rotate(${angle - 90})`}
              />
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}