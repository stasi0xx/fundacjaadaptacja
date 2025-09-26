import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TrustedBy, type Partner } from "./components/Partners.tsx";
import NaszeRealizacje from "./components/Realizations.tsx";

const partners: Partner[] = [
    { id: "p1", name: "Rada Dzielnicy Cisowa", logoSrc: "/RD Cisowa.jpg", url: "https://www.facebook.com/radacisowa" },
    { id: "p2", name: "Rada Dzielnicy Chylonia", logoSrc: "/RD Chylonia.png", url: "https://www.facebook.com/profile.php?id=100072032791578" },
    { id: "p3", name: "Vicotria Dom", logoSrc: "/vitoriaDom.jpg", url: "https://www.victoriadom.pl/" },
    { id: "p4", name: "Rada Dzielnicy Pustki Cisowskie - Demptowo", logoSrc: "/RD PCD.png", url: "https://www.facebook.com/PustkiCisowskieDemptowo" },
    { id: "p5", name: "PEWiK", logoSrc: "/PEWIK.png", url:"https://pewik.gdynia.pl/" },
    { id: "p6", name: "Miasto Gdynia", logoSrc: "/Gdynia.png", url: "https://www.gdynia.pl/" },
];


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <NaszeRealizacje />
      <Services />
      <Portfolio />
        <TrustedBy partners={partners} />

        <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;