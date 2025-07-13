import React, { useState } from "react";

// --- Constants and Data Mappings (Simulated from your Python Model's context) ---

// Category adjustment factors from your model description
const CATEGORY_ADJUSTMENT_FACTORS = {
  electronics: 1.0,
  furniture: 1.0,
  fashion: 0.8,
  stationery: 0.6,
  home_appliance: 1.2,
  grocery: 0.5,
  default: 1.0,
};

// Grade thresholds in kg CO2 per unit (UPDATED for better discrimination)
const GRADE_THRESHOLDS = {
  A: 0.2, // Very low impact: <= 0.2 kg CO₂/unit
  B: 0.7, // Low impact: > 0.2 and <= 0.7 kg CO₂/unit
  C: 2.0, // Moderate impact: > 0.7 and <= 2.0 kg CO₂/unit
  D: 5.0, // Higher impact: > 2.0 and <= 5.0 kg CO₂/unit
  E: Infinity, // Significant impact: > 5.0 kg CO₂/unit
};

// Simulated CO2 Emissions (g/km) for various Vehicle Classes
// In a real application, these values would come from your trained Python model
// based on detailed vehicle features (engine size, cylinders, fuel type, etc.).
// These are representative averages derived from your provided dataset's 'Vehicle Class'
const SIMULATED_VEHICLE_EMISSIONS_G_PER_KM = {
  "PICKUP TRUCK - STANDARD": 290,
  "STATION WAGON - SMALL": 200,
  "PICKUP TRUCK - SMALL": 260,
  MINIVAN: 240,
  "SPECIAL PURPOSE VEHICLE": 250,
  "VAN - PASSENGER": 300,
  "STATION WAGON - MID-SIZE": 245,
  "VAN - CARGO": 280,
};

// --- Helper Functions (Translated from your Python logic) ---

const getCategoryAdjustment = (category) => {
  return (
    CATEGORY_ADJUSTMENT_FACTORS[category.toLowerCase()] ||
    CATEGORY_ADJUSTMENT_FACTORS["default"]
  );
};

const getEmissionGrade = (emission) => {
  if (emission <= GRADE_THRESHOLDS.A) return "A";
  if (emission <= GRADE_THRESHOLDS.B) return "B";
  if (emission <= GRADE_THRESHOLDS.C) return "C";
  if (emission <= GRADE_THRESHOLDS.D) return "D";
  return "E";
};

// --- Main Rating Logic (Integrates simulated prediction) ---

const calculateProductRating = (
  vehicleClass,
  distance_km,
  weight_kg,
  category
) => {
  // Simulate getting the vehicle's CO2 emission from the "model"
  const predicted_co2_g_per_km =
    SIMULATED_VEHICLE_EMISSIONS_G_PER_KM[vehicleClass] || 0;

  if (predicted_co2_g_per_km === 0) {
    throw new Error(
      "Invalid vehicle type selected or no simulated emission data."
    );
  }

  // Convert g/km to kg/km
  const co2_kg_per_km = predicted_co2_g_per_km / 1000;
  // Convert product weight from kg to tonnes
  const product_weight_tonnes = weight_kg / 1000;

  // Calculate raw emission for the product delivery
  // This formula assumes the vehicle's kg/km emission is scaled by the product's tonnage.
  const raw_emission = co2_kg_per_km * distance_km * product_weight_tonnes;

  // Apply category-specific adjustments
  const adjusted_emission = raw_emission * getCategoryAdjustment(category);

  // Assign the grade
  const grade = getEmissionGrade(adjusted_emission);

  return {
    predicted_vehicle_co2_g_per_km: parseFloat(
      predicted_co2_g_per_km.toFixed(2)
    ),
    raw_emission_kg: parseFloat(raw_emission.toFixed(2)),
    adjusted_emission_kg: parseFloat(adjusted_emission.toFixed(2)),
    grade: grade,
  };
};

// --- React Component ---

const App = () => {
  const [distance, setDistance] = useState("");
  const [weight, setWeight] = useState("");
  const [vehicleClass, setVehicleClass] = useState(
    Object.keys(SIMULATED_VEHICLE_EMISSIONS_G_PER_KM)[0]
  );
  const [category, setCategory] = useState(
    Object.keys(CATEGORY_ADJUSTMENT_FACTORS)[0]
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const dist = parseFloat(distance);
    const wgt = parseFloat(weight);

    if (isNaN(dist) || isNaN(wgt) || dist <= 0 || wgt <= 0) {
      setError("Please enter valid positive numbers for distance and weight.");
      return;
    }

    try {
      const ratingResult = calculateProductRating(
        vehicleClass,
        dist,
        wgt,
        category
      );
      setResult(ratingResult);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🌍 Product Eco-Rating System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Delivery Distance (km)
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 500"
              min="0.1"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 10"
              min="0.01"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="vehicleClass"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Vehicle Type (Simulated Model Output)
            </label>
            <select
              id="vehicleClass"
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white"
              required
            >
              {Object.keys(SIMULATED_VEHICLE_EMISSIONS_G_PER_KM).map(
                (vClass) => (
                  <option key={vClass} value={vClass}>
                    {vClass
                      .split(" - ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" - ")}
                  </option>
                )
              )}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              *This simulates the CO2 g/km output from our ML model for the
              selected vehicle type.
            </p>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-white"
              required
            >
              {Object.keys(CATEGORY_ADJUSTMENT_FACTORS).map((cat) => (
                <option key={cat} value={cat}>
                  {cat
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 shadow-md"
          >
            Calculate Eco-Rating
          </button>
        </form>

        {error && (
          <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200 shadow-inner">
            <h2 className="text-xl font-bold text-green-800 mb-3 text-center">
              Your Product's Eco-Footprint
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Simulated Vehicle CO₂:</span>{" "}
                {result.predicted_vehicle_co2_g_per_km} g/km
              </p>
              <p>
                <span className="font-semibold">Raw Emission (Delivery):</span>{" "}
                {result.raw_emission_kg} kg CO₂
              </p>
              <p>
                <span className="font-semibold">Adjusted Total Emission:</span>{" "}
                {result.adjusted_emission_kg} kg CO₂
              </p>
              <p className="text-2xl font-extrabold text-center mt-4">
                <span className="font-semibold">Eco-Rating:</span>{" "}
                <span
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg text-3xl
                    ${result.grade === "A" ? "bg-green-500" : ""}
                    ${result.grade === "B" ? "bg-lime-500" : ""}
                    ${result.grade === "C" ? "bg-yellow-500" : ""}
                    ${result.grade === "D" ? "bg-orange-500" : ""}
                    ${result.grade === "E" ? "bg-red-500" : ""}
                  `}
                >
                  {result.grade}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
