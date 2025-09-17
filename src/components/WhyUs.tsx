import React from 'react';
import { Award, Lightbulb, CheckCircle } from 'lucide-react';

const WhyUs = () => {
  const features = [
    {
      icon: <Award className="h-12 w-12 text-orange-500" />,
      title: "Doświadczenie",
      description: "Wieloletnie doświadczenie w branży eventowej i wielu zadowolonych klientów."
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-orange-500" />,
      title: "Kreatywność", 
      description: "Indywidualne podejście i nieszablonowe pomysły dopasowane do Twoich potrzeb."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500" />,
      title: "Kompleksowość",
      description: "Pełna obsługa od A do Z, abyś Ty mógł spać spokojnie przed wydarzeniem."
    }
  ];

  return (
    <section id="o-nas" className="py-20 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-orange-400">Doświadczenie</span>, pasja i profesjonalizm
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Dlaczego warto nam zaufać?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-blue-800 rounded-2xl mx-auto mb-6 group-hover:bg-blue-700 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;