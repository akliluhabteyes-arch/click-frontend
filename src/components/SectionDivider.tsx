import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "glow" | "wave" | "particles" | "line";
}

const SectionDivider = ({ variant = "glow" }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-24 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <svg viewBox="0 0 1200 40" className="w-full h-10 text-primary/20" preserveAspectRatio="none">
            <motion.path
              d="M0,20 Q150,0 300,20 Q450,40 600,20 Q750,0 900,20 Q1050,40 1200,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div ref={ref} className="relative h-20 overflow-hidden">
        <motion.div style={{ opacity }} className="flex items-center justify-center h-full gap-2">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/40"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div ref={ref} className="relative h-16 flex items-center justify-center">
        <motion.div
          style={{ scaleX, opacity }}
          className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center"
        />
      </div>
    );
  }

  // Default: glow
  return (
    <div ref={ref} className="relative h-32 overflow-hidden">
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <motion.div
        style={{ opacity, scaleX }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-primary/3 blur-[40px] origin-center"
      />
    </div>
  );
};

export default SectionDivider;
