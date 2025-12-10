import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import OurOffer from "./components/OurOffer";
import AboutUs from "./components/AboutUs";
import OurReport from "./components/OurReport";
import OurMission from "./components/OurMission";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VehicleReport from "./components/VehicleReport";
import './components/styles.css';

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [currentVin, setCurrentVin] = useState("");
  const [shouldFocusInput, setShouldFocusInput] = useState(false);

  const handleSearchVin = (vin) => {
    setCurrentVin(vin);
    setCurrentView("report");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setShouldFocusInput(true);
  };

  return (
    <div>
      {currentView === "home" ? (
        <>
          <HeroSection 
            onSearchVin={handleSearchVin} 
            shouldFocusInput={shouldFocusInput}
            onFocusComplete={() => setShouldFocusInput(false)}
          />
          <WhyChooseUs />
          <OurOffer />
          <AboutUs />
          <OurReport />
          <OurMission />
          <Contact />
          <Footer />
        </>
      ) : (
        <VehicleReport vin={currentVin} onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;