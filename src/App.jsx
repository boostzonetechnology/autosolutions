import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/Whychooseus";
import OurOffer from "./components/Ouroffer";
import AboutUs from "./components/AboutUs";
import OurReport from "./components/OurReport";
import OurMission from "./components/OurMission";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VehicleReport from "./components/VehicleReport";
import PlansPage from "./components/PlansPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import './components/styles.css';

// HomePage component that contains all your main sections
function HomePage() {
  const navigate = useNavigate();
  const [shouldFocusInput, setShouldFocusInput] = React.useState(false);

  const handleSearchVin = (vin) => {
    // Navigate to VehicleReport page with VIN in state
    navigate('/vehicle-report', { 
      state: { 
        vin: vin,
        fromHome: true 
      } 
    });
  };

  React.useEffect(() => {
    // Focus VIN input when returning from report
    if (shouldFocusInput) {
      setShouldFocusInput(false);
    }
  }, [shouldFocusInput]);

  return (
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
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicle-report" element={<VehicleReport />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        {/* Optional: Add a catch-all route for 404 */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;