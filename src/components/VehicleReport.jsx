import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VehicleReport.css";

const VehicleReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const vin = location.state?.vin || "";
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [activeCheck, setActiveCheck] = useState(0);
  const [hasValidVIN, setHasValidVIN] = useState(true);
  const [checksCompleted, setChecksCompleted] = useState(0);

  const checks = [
    { name: "Accidents", icon: "🚗", color: "#EF4444" },
    { name: "Values", icon: "💰", color: "#10B981" },
    { name: "Title Records", icon: "📄", color: "#3B82F6" },
    { name: "Recalls", icon: "⚠️", color: "#F59E0B" },
    { name: "Odometer", icon: "📏", color: "#8B5CF6" },
    { name: "Specs", icon: "⚙️", color: "#EC4899" },
    { name: "Sales History", icon: "📈", color: "#6366F1" },
    { name: "Salvage Records", icon: "🔧", color: "#06B6D4" }
  ];

  useEffect(() => {
    if (!vin || vin.length < 5) {
      setHasValidVIN(false);
      setTimeout(() => navigate("/", { state: { shouldFocusInput: true } }), 3000);
      return;
    }

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 98) {
        progress = 98;
        clearInterval(progressInterval);
        fetchVehicleData();
      }
      setLoadingProgress(progress);
      
      // Update completed checks based on progress
      const completed = Math.floor((progress / 100) * checks.length);
      setChecksCompleted(completed);
    }, 300);

    const checkInterval = setInterval(() => {
      setActiveCheck((prev) => (prev + 1) % checks.length);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkInterval);
    };
  }, [vin]);

  const buildFallbackData = () => ({
    year: "—",
    makeModel: "—",
    trim: "—",
    driveType: "—",
    brakeSystem: "—",
    engine: "—",
    manufactured: "—",
    bodyStyle: "—",
    tires: "—",
    transmission: "—",
    warranty: "NOT ON FILE",
    msrp: "NOT ON FILE",
    accidentHistory: "LOCKED 🔒",
    titleRecords: "LOCKED 🔒",
    odometerReading: "LOCKED 🔒",
    salesHistory: "LOCKED 🔒",
    marketValue: "LOCKED 🔒",
    recallInfo: "LOCKED 🔒",
    theftRecords: "LOCKED 🔒",
    insuranceRecords: "LOCKED 🔒",
    previousOwners: "LOCKED 🔒",
    serviceHistory: "LOCKED 🔒"
  });

  const cleanValue = (val, fallback = "NOT ON FILE") => {
    if (!val || val === "NULL" || val === "null" || val === "undefined") return fallback;
    return String(val).trim();
  };

  const fetchVehicleData = async () => {
    try {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${encodeURIComponent(
        vin
      )}?format=json`;

      const res = await fetch(url);
      const data = await res.json();
      const v = data?.Results?.[0];

      if (!v) {
        setVehicleData(buildFallbackData());
        return;
      }

      const engineParts = [];
      if (cleanValue(v.DisplacementL, "") !== "") engineParts.push(cleanValue(v.DisplacementL) + "L");
      if (cleanValue(v.EngineConfiguration, "") !== "") engineParts.push(cleanValue(v.EngineConfiguration));
      if (cleanValue(v.EngineCylinders, "") !== "") engineParts.push(cleanValue(v.EngineCylinders) + " Cyl");
      const engineText = engineParts.join(" ").trim() || cleanValue(v.EngineModel);

      const formatted = {
        year: cleanValue(v.ModelYear, "—"),
        makeModel: `${cleanValue(v.Make, "")} ${cleanValue(v.Model, "")}`.trim() || "NOT ON FILE",
        trim: cleanValue(v.Trim, "—"),
        driveType: cleanValue(v.DriveType, "—"),
        brakeSystem: cleanValue(v.BrakeSystemType, "—"),
        engine: engineText,
        manufactured: cleanValue(v.PlantCountry, "—"),
        bodyStyle: cleanValue(v.BodyClass, "—"),
        tires:
          cleanValue(v.TireSize, "") ||
          cleanValue(v.WheelSizeFront, "") ||
          cleanValue(v.WheelSizeRear, "") ||
          "NOT ON FILE",
        transmission:
          cleanValue(v.TransmissionStyle, "") ||
          cleanValue(v.TransmissionDescriptor, "") ||
          "NOT ON FILE",
        warranty: "NOT ON FILE",
        msrp: "NOT ON FILE",
        accidentHistory: "LOCKED 🔒",
        titleRecords: "LOCKED 🔒",
        odometerReading: "LOCKED 🔒",
        salesHistory: "LOCKED 🔒",
        marketValue: "LOCKED 🔒",
        recallInfo: "LOCKED 🔒",
        theftRecords: "LOCKED 🔒",
        insuranceRecords: "LOCKED 🔒",
        previousOwners: "LOCKED 🔒",
        serviceHistory: "LOCKED 🔒"
      };

      setVehicleData(formatted);
      setLoadingProgress(100);
      setChecksCompleted(checks.length);
      setTimeout(() => setShowResults(true), 600);
    } catch {
      setVehicleData(buildFallbackData());
      setLoadingProgress(100);
      setChecksCompleted(checks.length);
      setTimeout(() => setShowResults(true), 600);
    }
  };

  const goBack = () => navigate("/", { state: { shouldFocusInput: true } });
  const goToPlans = () => navigate("/plans", { state: { vin, vehicleData } });

  return (
    <div className="vehicle-report-page">
      {/* NAVBAR */}
      <nav className="report-nav">
        <div className="nav-container">
          <div className="logo" onClick={goBack}>
            <span className="logo-icon">🚗</span>
            <span className="logo-text">VIN Decoder Pro</span>
          </div>
          <button className="select-plan-btn" onClick={goToPlans}>
            <span>🔓</span>
            Select Plan
          </button>
        </div>
      </nav>

      {/* PAGE BODY */}
      <div className="vehicle-report-container">
        {/* INVALID VIN */}
        {!hasValidVIN ? (
          <div className="error-section">
            <h2>❌ Invalid VIN Entered</h2>
            <p>Please check your VIN and try again</p>
            <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
              Redirecting to search in 3 seconds...
            </p>
          </div>
        ) : !showResults ? (
          /* LOADING SCREEN */
          <div className="loading-section">
            <h2>Decoding VIN</h2>
            <div className="vin-display">{vin}</div>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${loadingProgress}%` }} 
              />
            </div>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>
              {checksCompleted} of {checks.length} checks completed
            </p>
            <div className="checks-grid">
              {checks.map((c, i) => (
                <div
                  key={i}
                  className={`check-item ${i <= checksCompleted - 1 ? "active" : ""}`}
                  style={{ '--color': c.color }}
                >
                  <div className="check-icon">{c.icon}</div>
                  <div className="check-name">{c.name}</div>
                  {i === activeCheck && i > checksCompleted - 1 && (
                    <div className="checking-indicator">Checking…</div>
                  )}
                  {i <= checksCompleted - 1 && (
                    <div className="checking-indicator" style={{ color: c.color }}>
                      ✓ Complete
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* RESULTS */
          <div className="results-section">
            <h2>Vehicle Report Preview</h2>
            <p className="report-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <button className="select-plan-btn top" onClick={goToPlans}>
              🔓 Unlock Full Report
            </button>

            {/* FREE FIELDS */}
            <div className="detail-section">
              <h3>Basic Vehicle Information</h3>
              <div className="detail-grid">
                <Field label="Year" value={vehicleData.year} />
                <Field label="Make & Model" value={vehicleData.makeModel} />
                <Field label="Trim" value={vehicleData.trim} />
                <Field label="Drive Type" value={vehicleData.driveType} />
                <Field label="Brake System" value={vehicleData.brakeSystem} />
                <Field label="Engine" value={vehicleData.engine} />
                <Field label="Manufactured In" value={vehicleData.manufactured} />
                <Field label="Body Style" value={vehicleData.bodyStyle} />
                <Field label="Tires" value={vehicleData.tires} />
                <Field label="Transmission" value={vehicleData.transmission} />
                <Field label="Warranty" value="NOT ON FILE" />
                <Field label="MSRP" value="NOT ON FILE" />
              </div>
            </div>

            {/* LOCKED FIELDS */}
            <div className="detail-section locked-section">
              <h3>Premium Vehicle Information</h3>
              <div className="detail-grid">
                <Field label="Accident History" value={vehicleData.accidentHistory} locked />
                <Field label="Title Records" value={vehicleData.titleRecords} locked />
                <Field label="Odometer" value={vehicleData.odometerReading} locked />
                <Field label="Sales History" value={vehicleData.salesHistory} locked />
                <Field label="Market Value" value={vehicleData.marketValue} locked />
                <Field label="Recall Info" value={vehicleData.recallInfo} locked />
                <Field label="Theft Records" value={vehicleData.theftRecords} locked />
                <Field label="Insurance Records" value={vehicleData.insuranceRecords} locked />
                <Field label="Previous Owners" value={vehicleData.previousOwners} locked />
                <Field label="Service History" value={vehicleData.serviceHistory} locked />
              </div>
            </div>

            {/* BOTTOM ACTION BUTTONS */}
            <div className="action-buttons">
              <button className="select-plan-btn large" onClick={goToPlans}>
                🔓 Select Plan to Unlock Full Report
              </button>
              <button className="btn back-btn" onClick={goBack}>
                ← Back to Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* REUSABLE FIELD COMPONENT */
const Field = ({ label, value, locked }) => (
  <div className={`detail-item ${locked ? "locked" : ""}`}>
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value}</span>
  </div>
);

export default VehicleReport;