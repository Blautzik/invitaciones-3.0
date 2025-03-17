"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useAppContext } from "@/lib/context";
import LoadingScreen from "@/components/LoadingScreen";
import Countdown from "@/components/Countdown";
import { FadeInSection } from "@/components/FadeInSection";
import { Formulario } from "@/components/Formulario";
import Regalos from "@/components/Regalos";


// Letter-by-letter animation for horizontal text (replacing VerticalLetter)
const HorizontalLetter = ({
  letter,
  index,
  delay = 0,
}: {
  letter: string;
  index: number;
  delay?: number;
}) => {
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
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="inline-block py-[2px] text-center"
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.div>
    </div>
  );
};

// Modified VerticalText to be horizontal
const HorizontalText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <div className={`hidden md:inline-block ${className}`}>
      {text.split("").map((letter, index) => (
        <HorizontalLetter
          key={index}
          letter={letter}
          index={index}
          delay={delay}
        />
      ))}
    </div>
  );
};

// Modified MobileVerticalText to remain horizontal
const MobileHorizontalText = ({
  text,
  className = "",
  delay = 0,
}: {
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
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <span className="tracking-widest text-sm">{text}</span>
        </motion.div>
      </div>
    </div>
  );
};

// Refined Navigation Component (unchanged)
const NavBar = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu handler
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center "
      style={{ opacity }}
    >
      <motion.a
        href="#"
        className="text-2xl md:text-4xl font-light text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Add your logo or site name here if needed */}
      </motion.a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10">
        {["Info", "Galeria", "Regalos", "Confirmar Asistencia"].map(
          (item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`} // Convert to proper anchor links
              className="text-white hover:opacity-70 transition-opacity duration-300"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          )
        )}
      </nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden text-white text-sm"
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-0 top-20 bg-black md:hidden z-40 p-6 border-t border-b border-white/20"
          >
            <nav className="flex flex-col gap-6 bg-black">
              {["Info", "Galeria", "Regalos", "Confirmar Asistencia"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white bg-black text-lg hover:opacity-70 transition-opacity duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {item}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Enhanced Hero Section with horizontal text
const Hero = ({
  heroImage,
  verticalTitles,
  name,
  date,
  imageStylesPC = {
    position: { x: "50%", y: "50%" },
    brightness: 0.85,
    contrast: 1,
    saturation: 1,
  },
}: {
  heroImage: { src: string; alt: string };
  verticalTitles: { left: string; right: string };
  name: string;
  date: string;
  imageStylesPC?: {
    position?: { x: string; y: string };
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
}) => {
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.15]);
  const y = useSpring(useTransform(scrollY, [0, 300], [0, 150]), springConfig);

  const titleY = useSpring(useTransform(scrollY, [0, 150], [0, 75]), {
    stiffness: 50,
    damping: 15,
  });

  // Crear un filtro CSS basado en los valores de imageStylesPC
  const imageFilter = `brightness(${imageStylesPC.brightness}) contrast(${imageStylesPC.contrast}) saturate(${imageStylesPC.saturation})`;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
          style={{
            objectPosition: `${imageStylesPC.position?.x} ${imageStylesPC.position?.y}`,
            filter: imageFilter,
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/15 mix-blend-multiply" />

      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white p-8"
        style={{ y: titleY }}
      >
        <div className="overflow">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-wide text-center"
          >
            {name.charAt(0) + name.slice(1).toLowerCase()}
          </motion.h1>
        </div>

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex w-full justify-center md:hidden">
            <h3 className="font-serif text-xl md:text-3xl lg:text-9xl tracking-wide text-center">
              {date}
            </h3>
          </div>
        </motion.div>

        <div className="absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2">
          <HorizontalText
            text={verticalTitles.left}
            className="text-xl tracking-widest"
          />
        </div>

        <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2">
          <HorizontalText
            text={verticalTitles.right}
            className="text-xl tracking-widest"
            delay={0.2}
          />
        </div>

        <div className="mt-2 md:hidden text-center">
          <MobileHorizontalText
            text={`${verticalTitles.right} ${verticalTitles.left}`}
            className="text-sm tracking-widest"
            delay={0.4}
          />
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
            ease: "easeInOut",
          }}
          className="w-6 h-12 border-2 border-white rounded-full flex justify-center pt-2"
        >
          <motion.div className="h-2 w-1 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Refined Letter-by-letter Title Animation (unchanged)
const HorizontalTitle = ({ title }: { title: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
    rootMargin: "-5% 0%",
  });

  // Dividir el título en palabras en lugar de caracteres
  const words = title.split(" ");

  return (
    <h2
      ref={ref}
      className="text-3xl md:text-5xl lg:text-7xl font-serif mb-20 overflow-hidden"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-2">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              initial={{ y: "100%" }}
              animate={{ y: inView ? "0%" : "100%" }}
              transition={{
                duration: 0.8,
                delay: (wordIndex * 0.15) + (letterIndex * 0.03),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  );
};
// Advanced parallax image component with enhanced effects
const ParallaxImage = ({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) => {
  const containerRef = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();

  // Initial scale value when image first appears
  const initialScale = 1.15; // Slightly more noticeable on desktop

  // Calculate parallax effect based on scroll position and element position
  const scale = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [mounted ? initialScale : 1, 0.9] // Enhanced scale range
  );

  // More pronounced parallax effect: increased on desktop, much more on mobile
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const moveAmount = isMobile
    ? index % 2 === 0
      ? 100
      : -100
    : index % 2 === 0
    ? 100
    : -100; // Much more noticeable on mobile

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
      elementTop + clientHeight * 1.2,
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
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div className="w-full h-full" style={{ y, scale }}>
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

// FadeInSection (unchanged)

// ScrollProgressIndicator (unchanged)
const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

// ProjectSection (unchanged)
const ProjectSection = ({
  title,
  description,
  credits,
  date,
}: {
  title: string;
  description: string;
  credits: Array<{ label: string; value: string }>;
  date:string
}) => {
  return (
    <section className="bg-black text-white py-32 md:py-40 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32 overflow-hidden">
          <HorizontalTitle title={description} />
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
                    ease: [0.25, 0.1, 0.25, 1],
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
            <h3 className="text-center font-sans mt-10">Faltan:</h3>
            <div className="flex items-center justify-center">

              <Countdown date={date}/>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// GallerySection with horizontal text
const GallerySection = ({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) => {
  return (
    <section className="bg-black text-white py-10 md:py-40 px-6 md:px-16 relative">
      <div className="absolute right-6 md:right-16 top-24 md:top-1/4">
        <HorizontalText text="GALLERY" className="text-xl tracking-widest" />
      </div>

      <div className="md:hidden mt-10 mb-16 text-center">
        <MobileHorizontalText
          text="GALLERY"
          className="text-sm tracking-widest"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            {images
              .filter((_, i) => i % 2 === 0)
              .map((image, index) => (
                <ParallaxImage
                  key={`even-${index}`}
                  src={image.src}
                  alt={image.alt}
                  index={index * 2}
                />
              ))}
          </div>
          <div className="md:mt-32">
            {images
              .filter((_, i) => i % 2 === 1)
              .map((image, index) => (
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

// FooterSection with horizontal text
const FooterSection = ({
  nextProject,
  photographer,
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
                <h3 className="text-xl md:text-3xl font-serif">
                  {nextProject.subtitle}
                </h3>
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
              <p>
                {photographer.name} {photographer.description}
              </p>
            </FadeInSection>
          </div>
        </div>

        <div className="absolute right-6 md:right-16 bottom-20 md:bottom-32">
          <HorizontalText text="NEXT" className="text-xl tracking-widest" />
        </div>

        <div className="md:hidden mt-16 text-center">
          <MobileHorizontalText
            text="InterActive"
            className="text-sm tracking-widest"
          />
        </div>
      </div>
    </footer>
  );
};

// Main page component (unchanged)
export default function Home() {
  const { state } = useAppContext();
  const { projectData, isEntered } = state;

  if (!projectData) {
    return <LoadingScreen title="InterActive"/>;
  }

  return (
    <main className="bg-black text-white">
    <LoadingScreen  title={projectData.name}/>
    <AnimatePresence>
      {isEntered && projectData && (
        <motion.div
          initial={{ opacity: 1, y: 100}}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1],
            delay: 0
          }}
        >
          <ScrollProgressIndicator />
          <NavBar />
          <Hero
            heroImage={projectData.heroImage}
            verticalTitles={projectData.verticalTitles}
            name={projectData.name}
            date={projectData.date}
            imageStylesPC={{position: {x:"50%", y: "30%"}}}
          />
          <section id="info">

          <ProjectSection
          
          title={projectData.title}
          description={projectData.description}
          credits={projectData.credits}
          date={projectData.date}
          />
          </section>
          <section id="galeria">

          <GallerySection images={projectData.galleryImages} />
          </section>
          <section id="regalos">

          <Regalos 
            fraseRegalos={projectData.fraseRegalos} 
            alias={projectData.alias} 
            titular={projectData.titular} 
            cbu={projectData.cbu}   
            dni={projectData.dni}
            />
            </section>
            <section id="confirmar-asistencia">

          <Formulario form_id={projectData.formId}/>
            </section>
          <FooterSection
            nextProject={projectData.nextProject}
            photographer={projectData.photographer}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </main>
  );
}
