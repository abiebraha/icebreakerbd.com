import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="relative w-8 h-8"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            border: "2px solid rgba(18, 62, 116, 0.1)",
            borderTopColor: "#123e74",
            borderRadius: "50%",
          }}
        />
        <motion.div
          className="absolute inset-1"
          style={{
            border: "2px solid rgba(18, 62, 116, 0.15)",
            borderTopColor: "#123e74",
            borderRadius: "50%",
          }}
          animate={{ rotate: -180 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  );
}
