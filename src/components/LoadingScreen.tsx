"use client"
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import InsaneLoadingAnimation from "./InsaneLoadingAnimation"; // Nuevo componente
import { useAppContext } from "@/lib/context";
import BackgroundMusic from "./BackgroundMusic";
// Asumo que ya existe

interface EntryButtonProps {
  onEnter: () => void;
  title: string
}

interface LoadingProps {
  title:string
}



const LoadingScreen: React.FC<LoadingProps> = ({title}) => {
  const { state, enterSite } = useAppContext(); // Asumo que usas un contexto
  const { isLoading, isEntered, error } = state;
  const [showTransition, setShowTransition] = useState(false);

  const handleEnter = () => {
    setShowTransition(true);
    window.playBackgroundAudio()
    
    enterSite();
    setTimeout(() => {
      setShowTransition(false);
    }, 2000); // Duración de la transición
  };

  if (isEntered && !showTransition) {
    return null; // Si ya entró y no hay transición, no muestra nada
  }

  return (
    <>
      <AnimatePresence>
        {(showTransition || !isEntered) && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black overflow-hidden"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: showTransition ? 0 : 1,
              scale: showTransition ? 2 : 1,
              rotate: showTransition ? 90 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              ease: [0.83, 0, 0.17, 1], // Curva para un efecto dramático
            }}
          >
            {/* Efecto de transición */}
            {showTransition && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 3],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                }}
              />
            )}

            <div className="container max-w-screen-md mx-auto px-6 py-12 text-center relative z-10">
              {isLoading || error ? (
                <InsaneLoadingAnimation /> // Muestra la animación para carga o error
              ) : (
                <EntryButton onEnter={handleEnter} title={title} /> // Botón para entrar
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isEntered && <BackgroundMusic />} {/* Asumo que tienes este componente */}
    </>
  );
};

export default LoadingScreen;

const EntryButton: React.FC<EntryButtonProps> = ({ onEnter, title }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="text-5xl md:text-7xl font-serif text-white mb-8">
        {title}
      </div>

      <div className="text-lg md:text-xl text-white/70 mb-16 max-w-md">
        Mis Quince
      </div>

      <motion.button
        className="px-12 py-4 border border-white text-white text-sm uppercase tracking-widest relative overflow-hidden group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onEnter}
      >
        <motion.span
          className="absolute inset-0 bg-white w-0 z-0"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          Entrar
        </span>
      </motion.button>
    </motion.div>
  );
};