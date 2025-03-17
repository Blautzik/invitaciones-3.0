import React from 'react';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
export const FadeInSection = ({
    children,
    delay = 0,
    direction = "up",
  }: {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
  }) => {
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });
  
    const isMobile =
      typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const moveAmount = isMobile ? 15 : 30;
  
    const directionMap = {
      up: { y: moveAmount, x: 0 },
      down: { y: -moveAmount, x: 0 },
      left: { y: 0, x: moveAmount },
      right: { y: 0, x: -moveAmount },
    };
  
    const initialPosition = directionMap[direction];
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: initialPosition.y, x: initialPosition.x }}
        animate={
          inView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: initialPosition.y, x: initialPosition.x }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    );
  };
  