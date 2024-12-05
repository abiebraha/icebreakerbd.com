import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div 
        className="relative w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 border-4 border-[#123e74]/20 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Spinning circle */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-[#123e74] rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Pulsing dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-[#123e74] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Text with fade effect */}
      <motion.p
        className="mt-4 text-[#123e74] font-medium"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading amazing content...
      </motion.p>
    </div>
  );
}
