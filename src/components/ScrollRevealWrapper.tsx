import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealWrapperProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale";
}

const getVariants = (direction: string): Variants => {
  const hidden = { opacity: 0 } as Record<string, number>;
  const visible = { opacity: 1 } as Record<string, number>;

  switch (direction) {
    case "up":
      hidden.y = 60;
      visible.y = 0;
      break;
    case "left":
      hidden.x = -60;
      visible.x = 0;
      break;
    case "right":
      hidden.x = 60;
      visible.x = 0;
      break;
    case "scale":
      hidden.scale = 0.9;
      visible.scale = 1;
      break;
  }

  return {
    hidden,
    visible: {
      ...visible,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };
};

const ScrollRevealWrapper = ({ children, direction = "up" }: ScrollRevealWrapperProps) => {
  const variants = getVariants(direction);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealWrapper;
