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

      const isAtBottom =
        windowHeight + window.scrollY >= documentHeight - 50;
      
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
          className="fixed bottom-8 left-1/2 -translate-x-1/2 hidden lg:block z-50"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-secondary-gold/30 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-secondary-gold/60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
