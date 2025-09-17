import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TrustedBy, type Partner } from "./components/Partners.tsx";

const partners: Partner[] = [
    { id: "p1", name: "Acme Corp", logoSrc: "/logos/acme.svg", url: "https://example.com" },
    { id: "p2", name: "Globex", logoSrc: "/logos/globex.svg", url: "https://example.com" },
    { id: "p3", name: "Umbrella", logoSrc: "/logos/umbrella.svg" },
    { id: "p4", name: "Initech", logoSrc: "/logos/initech.svg", url: "https://example.com" },
    { id: "p5", name: "Stark Industries", logoSrc: "/logos/stark.svg" },
    { id: "p6", name: "Wayne Enterprises", logoSrc: "/logos/wayne.svg", url: "https://example.com" },
];


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
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