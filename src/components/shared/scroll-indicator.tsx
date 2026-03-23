"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // don't show if there is no scroll or overflow
      if (documentHeight <= windowHeight) {
        setIsVisible(false);
        return;
      }

      const isAtBottom = windowHeight + window.scrollY >= documentHeight - 50;

      setIsVisible(!isAtBottom);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    checkScroll();

    // Check again after a small delay to handle content rendering/images
    const timeout1 = setTimeout(checkScroll, 100);
    const timeout2 = setTimeout(checkScroll, 500);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
        >
          {/* Desktop Mouse Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="hidden md:flex w-6 h-10 rounded-full border-2 border-secondary-gold/30 items-start justify-center p-1"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-secondary-gold/60" />
          </motion.div>

          {/* Mobile Swipe Indicator */}
          <div className="flex flex-col items-center md:hidden">
            <motion.div
              animate={{ y: [0, -15], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="mb-1 text-secondary-gold/70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                <path d="M228.45,145.42l-21.78-36.31h0A31.84,31.84,0,0,0,180.25,93L160,82.85V32a24,24,0,0,0-48,0V96a8,8,0,0,1-16,0V40a24,24,0,0,0-48,0v70c0,16.5-12.87,17.47-15,17.59a8,8,0,0,0-7.39,8.56C27.5,162,45.47,192,67.36,211.21A104.28,104.28,0,0,0,136,240h21.9a94.46,94.46,0,0,0,67.63-28l1.49-1.55a40,40,0,0,0,3-53.5l1-1.57ZM214.36,200.56A78.47,78.47,0,0,1,157.9,224H136a88.33,88.33,0,0,1-58.17-24.41C58.13,182.26,42,154.68,41.6,132.84c10,1,24.4-4,24.4-22.84V40a8,8,0,0,1,16,0v75.76a23.95,23.95,0,0,0,35.91,20.73A8,8,0,0,0,128,129.57V32a8,8,0,0,1,16,0V112a8,8,0,0,0,11.58,7.16l27.13-13.56a15.93,15.93,0,0,1,13.22,8.06l21.46,35.79a24,24,0,0,1-1.4,26.41C215,177.16,214.62,187.31,214.36,200.56Z"></path>
              </svg>
            </motion.div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-secondary-gold/60">
              Swipe
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
