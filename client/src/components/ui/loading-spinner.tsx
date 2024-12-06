import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="relative w-10 h-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            border: "2px solid rgba(18, 62, 116, 0.1)",
            borderTopColor: "#123e74",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-2"
          style={{
            border: "2px solid rgba(18, 62, 116, 0.15)",
            borderTopColor: "#123e74",
            borderRadius: "50%",
          }}
          animate={{ rotate: -360 }}
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

// Default export for easier imports
export default LoadingSpinner;
