import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ReactNode } from "react";

/** Drives re-show / re-hide: leave `once: false` so elements return to `initial` when out of view (reverses on scroll up). */
const defaultViewport = { once: false as const, amount: 0.18, margin: "-8% 0px -8% 0px" };

const springReveal = { type: "spring" as const, stiffness: 200, damping: 28, mass: 0.6 };

const staggerItem = {
  hidden: { opacity: 0, y: 36, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 26, mass: 0.5 },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  /** Only animate the first time the block enters the viewport (no reverse). */
  once?: boolean;
  scale?: number;
  delay?: number;
  amount?: number | "some" | "all";
};

/**
 * Fades in and moves when the block enters the viewport; by default reverts when it leaves
 * (scroll back up to see the motion play again in reverse).
 */
export function Reveal({
  children,
  className,
  y = 40,
  x = 0,
  once = false,
  scale = 0.96,
  delay = 0,
  amount = 0.18,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  /** If true, stagger only runs the first time the group enters the viewport. */
  once?: boolean;
};

/**
 * Staggers children; replays in reverse order when the group leaves the viewport (scroll up).
 */
export function Stagger({ children, className, stagger = 0.12, once = false }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...defaultViewport, once, amount: 0.1 }}
      variants={{
        hidden: { transition: { staggerChildren: stagger, staggerDirection: -1, delayChildren: 0 } },
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.04, staggerDirection: 1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/**
 * Parallax orbs: scroll-linked, naturally reverses when you scroll up.
 */
export function HomeHeroParallaxOrbs() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  const yGold = useTransform(scrollY, [0, 720], [0, 140]);
  const yDark = useTransform(scrollY, [0, 720], [0, -95]);
  const sGold = useTransform(scrollY, [0, 800], [1, 1.1]);
  const xGold = useTransform(scrollY, [0, 600], [0, 28]);
  const xDark = useTransform(scrollY, [0, 600], [0, -24]);

  if (reduce) {
    return (
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-courie-gold/15 blur-3xl" />
        <div className="absolute -bottom-44 -right-44 h-[28rem] w-[28rem] rounded-full bg-black/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <motion.div
        style={{ y: yGold, scale: sGold, x: xGold }}
        className="will-change-transform absolute -left-40 -top-40 h-96 w-96 rounded-full bg-courie-gold/15 blur-3xl"
      />
      <motion.div
        style={{ y: yDark, x: xDark }}
        className="will-change-transform absolute -bottom-44 -right-44 h-[28rem] w-[28rem] rounded-full bg-black/20 blur-3xl"
      />
    </div>
  );
}

/**
 * Horizontal scroll readout (0–1) — moves with scroll, reverses when you scroll up.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 35, restDelta: 0.001 });

  if (reduce) {
    return null;
  }
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-full origin-left will-change-transform bg-gradient-to-r from-courie-gold via-amber-200/90 to-courie-brick/90"
      style={{ scaleX: smooth, transformOrigin: "0% 50%" }}
      aria-hidden
    />
  );
}
