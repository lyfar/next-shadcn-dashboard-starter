import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedPageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100%',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-100%',
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
};

export function AnimatedPageTransition({ children, isVisible }: AnimatedPageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}