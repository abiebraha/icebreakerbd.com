import { motion } from "framer-motion";

export function LoadingSpinner() {
  const circles = [...Array(4)].map((_, i) => i);
  
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-24 h-24">
        {circles.map((index) => (
          <motion.div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              border: "4px solid #123e74",
              borderRadius: "30%",
              rotate: `${index * 45}deg`,
            }}
            animate={{
              rotate: [index * 45, 360 + index * 45],
              borderRadius: ["30%", "50%", "30%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              delay: index * 0.2,
            }}
          />
        ))}
        
        <motion.div
          className="absolute inset-4 bg-[#123e74]/10 backdrop-blur-sm"
          animate={{
            clipPath: [
              "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              "polygon(50% 0%, 100% 100%, 50% 100%, 0% 0%)",
              "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-2 h-2 bg-[#123e74] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
