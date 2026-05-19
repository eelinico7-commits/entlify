import { Variants, Transition } from "framer-motion";

/* ---- Cubic bezier easing ---- */
export const smoothEasing = [0.25, 0.1, 0.25, 1] as const;
export const easeOutExpo = [0.19, 1, 0.22, 1] as const;

/* ---- Common transitions ---- */
export const smoothTransition: Transition = {
  duration: 0.5,
  ease: smoothEasing,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

export const springStiff: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

/* ---- Stagger variants ---- */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

/* ---- Fade variants ---- */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smoothTransition },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
};

/* ---- Scale variants ---- */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: springStiff },
};

/* ---- Card hover ---- */
export const cardHover = {
  whileHover: {
    y: -6,
    transition: springTransition,
  },
};

export const cardTap = {
  whileTap: { scale: 0.98 },
};

/* =========================================================
   NEW: Enhanced scroll animation variants
   ========================================================= */

/** Reveal from bottom with a slight upward pop */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Reveal from left */
export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Reveal from right */
export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Reveal with scale */
export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Staggered children for scroll-triggered grids */
export const scrollStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

/* ---- Hero entrance (staggered) ---- */
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};
