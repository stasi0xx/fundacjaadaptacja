import React from 'react';
import { Users, Music, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users className="h-12 w-12 text-orange-500" />,
      title: "Festyny i pikniki rodzinne",
      description: "Kompleksowo planujemy i realizujemy imprezy plenerowe pełne atrakcji dla dzieci i dorosłych."
    },
    {
      icon: <Music className="h-12 w-12 text-orange-500" />,
      title: "Koncerty plenerowe i klubowe",
      description: "Zapewniamy booking artystów, profesjonalną scenę, nagłośnienie i oświetlenie na najwyższym poziomie."
    },
    {
      icon: <Settings className="h-12 w-12 text-orange-500" />,
      title: "Obsługa techniczna i logistyka",
      description: "Zadbamy o każdy szczegół – od pozwoleń, przez bezpieczeństwo, po koordynację podwykonawców."
    }
  ];

  return (
    <section id="oferta" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Od pomysłu do <span className="text-orange-500">wielkiego finału</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zobacz, co oferujemy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;