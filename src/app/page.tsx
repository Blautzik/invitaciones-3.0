"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useAppContext } from "@/lib/context";
import LoadingScreen from "@/components/LoadingScreen";


const VerticalLetter = ({ letter, index, delay = 0 }: { letter: string; index: number; delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-5% 0%",
  });

  return (
    <div className="overflow-hidden" ref={ref}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: inView ? "0%" : "100%" }}
        transition={{
          duration: 1,
          delay: index * 0.04 + delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="inline-block py-[2px] text-center"
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.div>
    </div>
  );
};

// Improved Vertical Text Component
const VerticalText = ({ text, className = "", delay = 0, position = "right" }: {
  text: string;
  className?: string;
  delay?: number;
  position?: "left" | "right";
}) => {
  return (
    <div className={`hidden md:flex flex-col vertical-text ${className} ${position === "left" ? "items-start" : "items-end"}`}>
      {text.split("").map((letter, index) => (
        <VerticalLetter key={index} letter={letter} index={index} delay={delay} />
      ))}
    </div>
  );
};

// Mobile Vertical Text (horizontal layout for mobile)
const MobileVerticalText = ({ text, className = "", delay = 0 }: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className={`md:hidden ${className}`} ref={ref}>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: inView ? "0%" : "100%" }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <span className="tracking-widest text-sm">{text}</span>
        </motion.div>
      </div>
    </div>
  );
};

// Refined Navigation Component
const NavBar = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference"
      style={{ opacity }}
    >
      <motion.a
        href="#"
        className="text-2xl md:text-4xl font-light text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        Ottografie
      </motion.a>

      <nav className="hidden md:flex gap-10">
        {["Campaigns", "Editorial", "Celebrities", "Beauty"].map((item, index) => (
          <motion.a
            key={item}
            href="#"
            className="text-white hover:opacity-70 transition-opacity duration-300"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <motion.button
        className="md:hidden text-white text-sm"
        whileTap={{ scale: 0.95 }}
      >
        Menu
      </motion.button>
    </motion.header>
  );
};

// Enhanced Hero Section
const Hero = ({
  heroImage,
  verticalTitles
}: {
  heroImage: { src: string; alt: string };
  verticalTitles: { left: string; right: string };
}) => {
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
  const y = useSpring(useTransform(scrollY, [0, 300], [0, 150]), springConfig);

  const titleY = useSpring(
    useTransform(scrollY, [0, 150], [0, 75]),
    { stiffness: 50, damping: 15 }
  );

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity, scale }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />

      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white p-8"
        style={{ y: titleY }}
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-wide text-center"
          >
            {verticalTitles.right.charAt(0) + verticalTitles.right.slice(1).toLowerCase()}
          </motion.h1>
        </div>

        <div className="absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2">
          <VerticalText text={verticalTitles.right} className="text-xl tracking-widest" />
        </div>

        <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2">
          <VerticalText text={verticalTitles.left} className="text-xl tracking-widest" delay={0.2} position="left" />
        </div>

        <div className="mt-8 md:hidden text-center">
          <MobileVerticalText text={`${verticalTitles.right} ${verticalTitles.left}`} className="text-sm tracking-widest" delay={0.4} />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="w-6 h-12 border-2 border-white rounded-full flex justify-center pt-2"
        >
          <motion.div className="h-2 w-1 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Refined Letter-by-letter Title Animation
const HorizontalTitle = ({ title }: { title: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
    rootMargin: "-5% 0%",
  });

  return (
    <h2 ref={ref} className="text-3xl md:text-5xl lg:text-7xl font-serif mb-20 overflow-hidden">
      {title.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: inView ? "0%" : "100%" }}
          transition={{
            duration: 0.8,
            delay: index * 0.03,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </h2>
  );
};

// Advanced parallax image component with enhanced mobile support
const ParallaxImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const containerRef = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();

  // Initial scale value when image first appears
  const initialScale = 1.1;

  // Calculate parallax effect based on scroll position and element position
  const scale = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [mounted ? initialScale : 1, 0.95]
  );

  // Smaller parallax effect on mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const moveAmount = isMobile ? (index % 2 === 0 ? 40 : -40) : (index % 2 === 0 ? 80 : -80);

  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [0, moveAmount]
  );

  const opacity = useTransform(
    scrollY,
    [
      elementTop - clientHeight * 1.2,
      elementTop - clientHeight * 0.8,
      elementTop + clientHeight * 0.8,
      elementTop + clientHeight * 1.2
    ],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updatePosition = () => {
      const { top } = element.getBoundingClientRect();
      setElementTop(window.scrollY + top);
      setClientHeight(window.innerHeight);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    // Trigger the initial appear animation after a delay
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100 + index * 100);

    return () => {
      window.removeEventListener("resize", updatePosition);
      clearTimeout(timer);
    };
  }, [containerRef, index]);

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden aspect-[3/4] w-full mb-16 md:mb-24"
      style={{ opacity }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: mounted ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      transition={{
        duration: 1,
        delay: 0.1 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{ y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      </motion.div>
    </motion.div>
  );
};

// Improved fade-in component with enhanced mobile support
const FadeInSection = ({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Smaller movement on mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const moveAmount = isMobile ? 15 : 30;

  const directionMap = {
    up: { y: moveAmount, x: 0 },
    down: { y: -moveAmount, x: 0 },
    left: { y: 0, x: moveAmount },
    right: { y: 0, x: -moveAmount }
  };

  const initialPosition = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialPosition.y, x: initialPosition.x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: initialPosition.y, x: initialPosition.x }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth scroll progress indicator
const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
};

// Enhanced project info section
const ProjectSection = ({
  title,
  description,
  credits
}: {
  title: string;
  description: string;
  credits: Array<{ label: string; value: string }>;
}) => {
  return (
    <section className="bg-black text-white py-32 md:py-40 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32 overflow-hidden">
          <HorizontalTitle title={title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          <FadeInSection delay={0.2} direction="up">
            <div className="flex flex-col space-y-5 md:space-y-6">
              {credits.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  className="flex justify-between border-b border-gray-800 py-3 md:py-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: false, margin: "-5% 0px" }}
                >
                  <span className="text-gray-400">{label}</span>
                  <span>{value}</span>
                </motion.div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.4} direction="up">
            <p className="text-lg md:text-2xl leading-relaxed text-gray-300">
              {description}
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// Enhanced gallery section
const GallerySection = ({
  images
}: {
  images: Array<{ src: string; alt: string }>;
}) => {
  return (
    <section className="bg-black text-white py-20 md:py-40 px-6 md:px-16 relative">
      <div className="absolute right-6 md:right-16 top-24 md:top-1/4">
        <VerticalText text="GALLERY" className="text-xl tracking-widest" />
      </div>

      <div className="md:hidden mt-10 mb-16 text-center">
        <MobileVerticalText text="GALLERY" className="text-sm tracking-widest" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            {images.filter((_, i) => i % 2 === 0).map((image, index) => (
              <ParallaxImage
                key={`even-${index}`}
                src={image.src}
                alt={image.alt}
                index={index * 2}
              />
            ))}
          </div>
          <div className="md:mt-32">
            {images.filter((_, i) => i % 2 === 1).map((image, index) => (
              <ParallaxImage
                key={`odd-${index}`}
                src={image.src}
                alt={image.alt}
                index={index * 2 + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced footer section
const FooterSection = ({
  nextProject,
  photographer
}: {
  nextProject: { title: string; subtitle: string };
  photographer: { name: string; description: string };
}) => {
  return (
    <footer className="bg-black text-white py-24 md:py-32 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-12 md:mb-0">
            <div className="overflow-hidden mb-4">
              <FadeInSection>
                <h3 className="text-xl md:text-3xl font-serif">{nextProject.subtitle}</h3>
              </FadeInSection>
            </div>
            <div className="overflow-hidden">
              <FadeInSection delay={0.2}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide">
                  {nextProject.title}
                </h2>
              </FadeInSection>
            </div>
          </div>
          <div className="text-gray-400">
            <FadeInSection delay={0.4} direction="left">
              <p>{photographer.name} {photographer.description}</p>
            </FadeInSection>
          </div>
        </div>

        <div className="absolute right-6 md:right-16 bottom-20 md:bottom-32">
          <VerticalText text="NEXT" className="text-xl tracking-widest" />
        </div>

        <div className="md:hidden mt-16 text-center">
          <MobileVerticalText text="NEXT CASE" className="text-sm tracking-widest" />
        </div>
      </div>
    </footer>
  );
};

// Main page component
export default function Home() {
  const { state } = useAppContext();
  const { projectData, isEntered } = state;

  if (!projectData) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-black text-white">
      <LoadingScreen />
      <ScrollProgressIndicator />
      <NavBar />
      <Hero
        heroImage={projectData.heroImage}
        verticalTitles={projectData.verticalTitles}
      />
      <ProjectSection
        title={projectData.title}
        description={projectData.description}
        credits={projectData.credits}
      />
      <GallerySection
        images={projectData.galleryImages}
      />
      <FooterSection
        nextProject={projectData.nextProject}
        photographer={projectData.photographer}
      />
    </main>
  );
}
