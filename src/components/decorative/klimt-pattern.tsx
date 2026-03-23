"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KlimtPatternProps {
  variant?: "swirl" | "geometric" | "spiral";
  size?: "sm" | "md" | "lg";
  color?: "gold" | "green" | "mixed";
  animated?: boolean;
  className?: string;
}

const sizeVariants = {
  sm: { width: 100, height: 100 },
  md: { width: 150, height: 150 },
  lg: { width: 200, height: 200 },
};

export function KlimtPattern({
  variant = "swirl",
  size = "md",
  color = "gold",
  animated = true,
  className,
}: KlimtPatternProps) {
  const { width, height } = sizeVariants[size];

  const getGradientId = () => `klimt-gradient-${variant}-${color}`;

  const getColors = () => {
    if (color === "gold") {
      return { primary: "var(--accent-gold)", secondary: "var(--accent-copper)" };
    }
    if (color === "green") {
      return { primary: "var(--accent-green)", secondary: "var(--accent-emerald)" };
    }
    return { primary: "var(--accent-gold)", secondary: "var(--accent-green)" };
  };

  const colors = getColors();

  // Swirl pattern - inspired by Klimt's flowing lines
  const swirlPath = `
    M ${width * 0.1} ${height * 0.5}
    Q ${width * 0.3} ${height * 0.2}, ${width * 0.5} ${height * 0.4}
    Q ${width * 0.7} ${height * 0.6}, ${width * 0.9} ${height * 0.3}
    M ${width * 0.1} ${height * 0.6}
    Q ${width * 0.4} ${height * 0.8}, ${width * 0.6} ${height * 0.7}
    Q ${width * 0.8} ${height * 0.6}, ${width * 0.9} ${height * 0.8}
  `;

  // Geometric pattern - Klimt's geometric shapes
  const geometricElements = [
    { type: "rect", x: width * 0.1, y: height * 0.1, w: width * 0.15, h: height * 0.15, r: 2 },
    { type: "rect", x: width * 0.3, y: height * 0.2, w: width * 0.2, h: height * 0.1, r: 2 },
    { type: "circle", cx: width * 0.7, cy: height * 0.3, r: width * 0.08 },
    { type: "rect", x: width * 0.5, y: height * 0.5, w: width * 0.25, h: height * 0.2, r: 3 },
    { type: "circle", cx: width * 0.2, cy: height * 0.7, r: width * 0.06 },
    { type: "rect", x: width * 0.7, y: height * 0.7, w: width * 0.18, h: height * 0.15, r: 2 },
  ];

  // Spiral pattern - concentric spirals
  const spiralPath = `
    M ${width * 0.5} ${height * 0.5}
    Q ${width * 0.5 + width * 0.1} ${height * 0.5}, ${width * 0.5 + width * 0.1} ${height * 0.5 + height * 0.15}
    Q ${width * 0.5 + width * 0.1} ${height * 0.5 + height * 0.3}, ${width * 0.5} ${height * 0.5 + height * 0.3}
    Q ${width * 0.5 - width * 0.15} ${height * 0.5 + height * 0.3}, ${width * 0.5 - width * 0.2} ${height * 0.5}
    Q ${width * 0.5 - width * 0.25} ${height * 0.5 - height * 0.2}, ${width * 0.5} ${height * 0.5 - height * 0.25}
    Q ${width * 0.5 + width * 0.3} ${height * 0.5 - height * 0.25}, ${width * 0.5 + width * 0.35} ${height * 0.5}
  `;

  return (
    <motion.div
      className={cn("relative", className)}
      initial={animated ? { opacity: 0 } : { opacity: 1 }}
      whileInView={animated ? { opacity: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ maxWidth: width, maxHeight: height }}
      >
        <defs>
          <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {variant === "swirl" && (
          <motion.path
            d={swirlPath}
            fill="none"
            stroke={`url(#${getGradientId()})`}
            strokeWidth="2"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
            whileInView={animated ? { pathLength: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {variant === "geometric" && (
          <g>
            {geometricElements.map((el, i) => (
              <motion.g
                key={i}
                initial={animated ? { opacity: 0, scale: 0 } : { opacity: 1 }}
                whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {el.type === "rect" ? (
                  <rect
                    x={el.x}
                    y={el.y}
                    width={el.w}
                    height={el.h}
                    rx={el.r}
                    fill="none"
                    stroke={`url(#${getGradientId()})`}
                    strokeWidth="1.5"
                  />
                ) : (
                  <circle
                    cx={el.cx}
                    cy={el.cy}
                    r={el.r}
                    fill="none"
                    stroke={`url(#${getGradientId()})`}
                    strokeWidth="1.5"
                  />
                )}
              </motion.g>
            ))}
          </g>
        )}

        {variant === "spiral" && (
          <motion.path
            d={spiralPath}
            fill="none"
            stroke={`url(#${getGradientId()})`}
            strokeWidth="2"
            strokeLinecap="round"
            initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
            whileInView={animated ? { pathLength: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </svg>
    </motion.div>
  );
}