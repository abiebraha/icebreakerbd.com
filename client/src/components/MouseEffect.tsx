import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import { throttle } from "lodash";

interface MousePosition {
  x: number;
  y: number;
}

export default function MouseEffect() {
  const { scrollY } = useScroll();
  const [opacity, setOpacity] = useState(1);

  // Update opacity based on scroll position
  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Start fading out at 100px scroll, completely hidden by 300px
      const newOpacity = Math.max(0, Math.min(1, 1 - (latest - 100) / 200));
      setOpacity(newOpacity);
    });
  }, [scrollY]);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);
  const rotation = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    throttle((event: MouseEvent) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      
      // Update spring values
      mouseX.set(clientX);
      mouseY.set(clientY);
      
      // Calculate rotation based on mouse position
      const rotationX = (clientY / window.innerHeight - 0.5) * 20;
      const rotationY = (clientX / window.innerWidth - 0.5) * 20;
      rotation.set(rotationX + rotationY);
    }, 16), // Throttle to ~60fps
    [mouseX, mouseY, rotation]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* Main gradient effect */}
      <motion.div
        className="absolute w-[160px] h-[160px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(18,62,116,0.15) 0%, transparent 70%)",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute w-[120px] h-[120px] rounded-full blur-lg"
        style={{
          background: "radial-gradient(circle at center, rgba(18,62,116,0.1) 0%, transparent 60%)",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#123e74]/20"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [
              mousePosition.x - 50 + Math.random() * 100,
              mousePosition.x + 50 - Math.random() * 100,
            ],
            y: [
              mousePosition.y - 50 + Math.random() * 100,
              mousePosition.y + 50 - Math.random() * 100,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
