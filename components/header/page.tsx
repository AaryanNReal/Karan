'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Services', href: '#services' },
  { title: 'Projects', href: '#projects' },
  { title: 'Technology', href: '#technology' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'Contact', href: '#contact' },
];

// Simple SVG icons to replace Lucide
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12H21" />
    <path d="M3 6H21" />
    <path d="M3 18H21" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18" />
    <path d="M6 6L18 18" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
      ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
    `}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="#home" className="z-10" onClick={closeMenu}>
          <h1 className="font-bold text-2xl tracking-tight">
            <span className="text-gray-800">Elegant</span>
            <span className="text-yellow-600">Interiors</span>
          </h1>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden z-20 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm tracking-wider uppercase hover:text-yellow-600 transition-colors duration-300"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        <div className={`
          fixed inset-0 bg-white flex flex-col items-center justify-center lg:hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}>
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={closeMenu}
                className="text-xl tracking-wider uppercase hover:text-yellow-600 transition-colors duration-300"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;