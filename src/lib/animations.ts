import { Variants, Transition } from "framer-motion";

/* ---- Cubic bezier easing (exported as tuple so components don't need `as` cast) ---- */
export const smoothEasing = [0.25, 0.1, 0.25, 1] as const;

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
