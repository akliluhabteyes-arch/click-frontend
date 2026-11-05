import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { damping: 25, stiffness: 200 });
  const springY = useSpring(trailY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isMobile, cursorX, cursorY, trailX, trailY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.5 : isHovering ? 0.6 : 1,
            opacity: isClicking ? 1 : 0.9,
          }}
          transition={{ duration: 0.15 }}
          className="w-3 h-3 rounded-full bg-primary"
          style={{
            boxShadow: "0 0 12px hsl(36 95% 55% / 0.8), 0 0 24px hsl(36 95% 55% / 0.4)",
          }}
        />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : isClicking ? 28 : 40,
            height: isHovering ? 56 : isClicking ? 28 : 40,
            borderColor: isHovering
              ? "hsl(36 95% 55% / 0.6)"
              : "hsl(36 95% 55% / 0.25)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-full border-2"
          style={{
            boxShadow: isHovering
              ? "0 0 20px hsl(36 95% 55% / 0.3), inset 0 0 20px hsl(36 95% 55% / 0.05)"
              : "0 0 10px hsl(36 95% 55% / 0.1)",
          }}
        />
      </motion.div>

      {/* Sparkle particles on hover */}
      {isHovering && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 z-[9997] pointer-events-none"
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <motion.div
                className="w-1 h-1 rounded-full bg-primary/60"
                animate={{
                  x: [0, (i - 1) * 20],
                  y: [0, -15 + i * 10],
                  opacity: [0.6, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          ))}
        </>
      )}
    </>
  );
};

export default CustomCursor;
