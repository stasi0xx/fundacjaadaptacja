import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className={`flex items-center text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-blue-800' : 'text-white'
            }`}>
              <img src="/Spółka.png" alt="Logo Adaptacja" className="h-10 ml-2 mr-3"/>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('oferta')}
              className={`transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Oferta
            </button>
            <button
              onClick={() => scrollToSection('realizacje')}
              className={`transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Realizacje
            </button>
            <button
              onClick={() => scrollToSection('o-nas')}
              className={`transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              O nas
            </button>
            <button
              onClick={() => scrollToSection('kontakt')}
              className={`transition-colors duration-300 hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Kontakt
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('oferta')}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-left"
              >
                Oferta
              </button>
              <button
                onClick={() => scrollToSection('realizacje')}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-left"
              >
                Realizacje
              </button>
              <button
                onClick={() => scrollToSection('o-nas')}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-left"
              >
                O nas
              </button>
              <button
                onClick={() => scrollToSection('kontakt')}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-left"
              >
                Kontakt
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;