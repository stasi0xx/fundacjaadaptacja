import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    {
      url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Koncert plenerowy'
    },
    {
      url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Festyn rodzinny'
    },
    {
      url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Impreza plenerowa'
    },
    {
      url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Koncert na świeżym powietrzu'
    },
    {
      url: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Event kulturalny'
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="realizacje" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Zobacz, <span className="text-orange-500">co już zrobiliśmy!</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={images[currentImage].url}
              alt={images[currentImage].alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImage === index 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Zaufali nam m.in. Urzędy Miast, Centra Kultury oraz liczne firmy prywatne
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;