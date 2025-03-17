import { motion } from "framer-motion";
import React from "react";

const InsaneLoadingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 relative">
      {/* Texto principal con pulsación */}
      <motion.div
        className="text-6xl font-serif text-white drop-shadow-lg"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        InterActive
      </motion.div>

      {/* Barra de carga con efecto de brillo cíclico */}
      <motion.div
        className="w-full max-w-xs h-1 bg-white/20 relative overflow-hidden rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_#fff]"
          initial={{ width: "0%" }}
          animate={{
            width: ["0%", "100%", "0%"],
            left: ["0%", "0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Texto secundario con fade-in */}
      <motion.div
        className="text-sm text-white/60 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        Loading content...
      </motion.div>

      {/* Fondo animado psicodélico */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 animate-[pulse_4s_infinite]" />
      </motion.div>
    </div>
  );
};

export default InsaneLoadingAnimation;