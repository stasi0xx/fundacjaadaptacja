import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const images = [
    { url: '/foto1.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto2.jpg', alt: 'Święto Chyloni i Leszczynek' },
    { url: '/foto3.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto4.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto5.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto6.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto7.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto8.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto9.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto10.jpg', alt: 'Koncert Mandaryna' },
    { url: '/foto11.jpg', alt: 'Koncert Mandaryna' }
  ];

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        setSlideWidth(viewportRef.current.clientWidth);
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (viewportRef.current) {
      ro.observe(viewportRef.current);
    }

    window.addEventListener('orientationchange', measure);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

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
            <div
                ref={viewportRef}
                className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
            >
              {/* Tor slajdów przesuwany w pikselach */}
              <div
                  className="absolute inset-0 flex transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${currentImage * slideWidth}px)` }}
              >
                {images.map((img) => (
                    <div key={img.url} className="flex-none w-full h-full">
                      <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                          draggable={false}
                      />
                    </div>
                ))}
              </div>

              <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>

              <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Następne zdjęcie"
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
                      aria-label={`Przejdź do slajdu ${index + 1}`}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Portfolio;