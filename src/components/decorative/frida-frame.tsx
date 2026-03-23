"use client";

import { motion } from "framer-motion";

interface FridaFrameProps {
  variant?: "vines" | "flowers" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export type PatternProps = {
  width: number;
  height: number;
};

// Mexican folk art inspired vine pattern
const VinesPattern = ({ width, height }: PatternProps) => (
  <motion.svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    className="absolute inset-0"
  >
    <motion.path
      d={`M${width * 0.1} 0 Q${width * 0.15} ${height * 0.3} ${width * 0.2} ${height * 0.5} T${width * 0.15} ${height}`}
      stroke="#c41e3a"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d={`M${width * 0.9} 0 Q${width * 0.85} ${height * 0.3} ${width * 0.8} ${height * 0.5} T${width * 0.85} ${height}`}
      stroke="#c41e3a"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
    />
  </motion.svg>
);

// Colorful flowers inspired by Frida's palette
const FlowersPattern = ({ width, height }: PatternProps) => (
  <motion.svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    className="absolute inset-0"
  >
    {/* Top left flower */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <circle cx={width * 0.12} cy={height * 0.1} r="8" fill="#ff6b6b" />
      <circle cx={width * 0.12} cy={height * 0.1 - 8} r="6" fill="#ffd93d" />
      <circle cx={width * 0.12 + 8} cy={height * 0.1} r="6" fill="#ff8c42" />
      <circle cx={width * 0.12} cy={height * 0.1 + 8} r="6" fill="#ff6b9d" />
      <circle cx={width * 0.12 - 8} cy={height * 0.1} r="6" fill="#c9184a" />
    </motion.g>

    {/* Top right flower */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <circle cx={width * 0.88} cy={height * 0.1} r="8" fill="#ff6b9d" />
      <circle cx={width * 0.88} cy={height * 0.1 - 8} r="6" fill="#ffd93d" />
      <circle cx={width * 0.88 + 8} cy={height * 0.1} r="6" fill="#c9184a" />
      <circle cx={width * 0.88} cy={height * 0.1 + 8} r="6" fill="#ff6b6b" />
      <circle cx={width * 0.88 - 8} cy={height * 0.1} r="6" fill="#ff8c42" />
    </motion.g>

    {/* Bottom left flower */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <circle cx={width * 0.12} cy={height * 0.9} r="8" fill="#ff8c42" />
      <circle cx={width * 0.12} cy={height * 0.9 - 8} r="6" fill="#c9184a" />
      <circle cx={width * 0.12 + 8} cy={height * 0.9} r="6" fill="#ff6b9d" />
      <circle cx={width * 0.12} cy={height * 0.9 + 8} r="6" fill="#ffd93d" />
      <circle cx={width * 0.12 - 8} cy={height * 0.9} r="6" fill="#ff6b6b" />
    </motion.g>

    {/* Bottom right flower */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <circle cx={width * 0.88} cy={height * 0.9} r="8" fill="#ffd93d" />
      <circle cx={width * 0.88} cy={height * 0.9 - 8} r="6" fill="#ff6b6b" />
      <circle cx={width * 0.88 + 8} cy={height * 0.9} r="6" fill="#ff8c42" />
      <circle cx={width * 0.88} cy={height * 0.9 + 8} r="6" fill="#c9184a" />
      <circle cx={width * 0.88 - 8} cy={height * 0.9} r="6" fill="#ff6b9d" />
    </motion.g>
  </motion.svg>
);

// Full decorative border combining both
const FullPattern = ({ width, height }: PatternProps) => (
  <>
    <VinesPattern width={width} height={height} />
    <FlowersPattern width={width} height={height} />

    {/* Decorative corner flourishes */}
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="absolute inset-0"
    >
      {/* Top center decorative element */}
      <motion.path
        d={`M${width * 0.4} ${height * 0.02} Q${width * 0.5} ${height * 0.08} ${width * 0.6} ${height * 0.02}`}
        stroke="#c41e3a"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {/* Bottom center decorative element */}
      <motion.path
        d={`M${width * 0.4} ${height * 0.98} Q${width * 0.5} ${height * 0.92} ${width * 0.6} ${height * 0.98}`}
        stroke="#c41e3a"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </motion.svg>
  </>
);

export function FridaFrame({
  variant = "full",
  size = "md",
  className = "",
}: FridaFrameProps) {
  const sizes = {
    sm: { width: 200, height: 200 },
    md: { width: 300, height: 300 },
    lg: { width: 400, height: 400 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`relative ${className}`}>
      {variant === "vines" && <VinesPattern width={width} height={height} />}
      {variant === "flowers" && (
        <FlowersPattern width={width} height={height} />
      )}
      {variant === "full" && <FullPattern width={width} height={height} />}
    </div>
  );
}

// Frida-style image frame wrapper component
interface FridaImageFrameProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FridaImageFrame({
  children,
  size = "md",
  className = "",
}: FridaImageFrameProps) {
  const sizes = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-80 h-80",
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <FridaFrame variant="full" size={size} />
      <div className="absolute inset-4 overflow-hidden rounded-lg border-2 border-[#c41e3a]/30">
        {children}
      </div>
    </div>
  );
}
