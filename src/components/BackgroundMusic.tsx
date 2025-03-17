"use client"
import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crear el objeto de audio
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Exponer la función para que pueda ser usada desde otros componentes
    window.playBackgroundAudio = playAudio;

    // // Limpiar el audio al desmontar el componente
    // return () => {
    //   if (audioRef.current) {
    //     audioRef.current.pause(); // Pausa el audio al desmontar (ajusta según tu necesidad)
    //   }
   
    // };
  }, []);

  // Función para iniciar la reproducción manualmente
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Error al reproducir el audio:', error);
      });
    }
  };

  return null;
};

export default BackgroundMusic;