import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">
              Adaptacja
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Tworzymy niezapomniane wydarzenia, które łączą społeczności 
              i promują kulturę.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-400 mr-3" />
                <span className="text-gray-300">biuro@adaptacja.info</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-400 mr-3" />
                <span className="text-gray-300">+48 570 045 955</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Znajdź nas w sieci</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/FundacjaAdaptacja"
                className="p-3 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/fundacjaadaptacja/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kordian-kulaszewicz-51076a96/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Adaptacja. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;