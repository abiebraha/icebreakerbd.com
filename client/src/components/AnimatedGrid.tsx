import { motion } from "framer-motion";

interface AnimatedGridProps {
  opacity?: number;
  color?: string;
  className?: string;
}

export default function AnimatedGrid({ 
  opacity = 0.15, 
  color = "#0066CC",
  className = ""
}: AnimatedGridProps) {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br from-[${color}]/5 via-transparent to-transparent ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0" style={{ perspective: "2000px" }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className={`absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[${color}]/${opacity * 100} to-transparent`}
            style={{
              top: `${(i + 1) * 6.66}%`,
              transform: "rotateX(75deg)",
            }}
            animate={{
              scaleX: [0.9, 1.1, 0.9],
              opacity: [opacity, opacity * 2, opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
