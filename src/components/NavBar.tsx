import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-between items-center mix-blend-difference"
    >
      <Link href="/">
        <div className="text-3xl md:text-4xl font-light text-white cursor-pointer">
          Ottografie
        </div>
      </Link>

      <nav className="hidden md:flex gap-8">
        <Link href="#" className="text-white hover:opacity-70 transition-opacity">
          Campaigns
        </Link>
        <Link href="#" className="text-white hover:opacity-70 transition-opacity">
          Editorial
        </Link>
        <Link href="#" className="text-white hover:opacity-70 transition-opacity">
          Celebrities
        </Link>
        <Link href="#" className="text-white hover:opacity-70 transition-opacity">
          Beauty
        </Link>
      </nav>

      <button className="md:hidden text-white">
        Menu
      </button>
    </motion.header>
  );
};

export default NavBar;
