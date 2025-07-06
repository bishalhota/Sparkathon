import React, { useState } from 'react'
import axios from 'axios'

function App() {

  interface InterfaceForm {
    vehicleClass: string,
    cylinders: number,
    fuelType: string,
    engineSize: number,
    engineCylinders: string,
    enginePowerRatio: number
  }

  const [input, setInput] = useState<InterfaceForm>({
    vehicleClass: "",
    cylinders: 0,
    fuelType: "",
    engineSize: 0,
    engineCylinders: "",
    enginePowerRatio: 0
  });



  const [prediction, setprediction] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: name === "vehicleClass" || name === "fuelType"
        ? value
        : Number(value) // Cast to number for number inputs
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const Input = [
      input.vehicleClass,
      input.cylinders,
      input.fuelType,
      input.engineSize,
      input.engineCylinders,
      input.enginePowerRatio
    ]

    try {
      const response = await axios.post("https://emissionmodelinterface.onrender.com/predict", { input: Input });
      setprediction(response.data.prediction[0])
      setError("")
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong");
      setprediction(0)
    }
  }

  return (
    <div className=" w-full flex justify-center p-6 bg-gray-200">
      <div className="w-3/5 p-4 bg-white rounded-xl shadow-2xl ">

        <div className="min-w-full h-[90px] flex justify-center items-center border-1 border-grey-400 rounded-md">
          <h1 className="text-Black text-2xl">Emission prediction Model</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="w-full flex flex-col ">
            <label className='p-2 text-lg'>Vehcile Class</label>
            <select
              name="vehicleClass"
              value={input.vehicleClass}
              onChange={handleSelectChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Select Vehicle Class</option>
              <option value="COMPACT">COMPACT</option>
              <option value="SUV">SUV</option>
              <option value="MID-SIZE">MID-SIZE</option>
              <option value="PICKUP TRUCK">PICKUP TRUCK</option>
              <option value="MINIVAN">MINIVAN</option>
              <option value="STATION WAGON">STATION WAGON</option>
              <option value="TWO-SEATER">TWO-SEATER</option>
              <option value="SUBCOMPACT">SUBCOMPACT</option>
              <option value="FULL-SIZE">FULL-SIZE</option>
              <option value="VAN">VAN</option>
            </select>
          </div>
          <div className='w-full flex flex-col'>
            <label className='p-2 text-lg'>Cylinders</label>
            <input
              name='cylinders'
              value={input.cylinders}
              onChange={handlechange}
              type="number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"></input>
          </div>

          {/* fuel; type */}
          <div className="w-full flex flex-col ">
            <label className='p-2 text-lg'>Fuel type</label>
            <select
              name='fuelType'
              value={input.fuelType}
              onChange={handleSelectChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Select Fuel Type</option>
              <option value="X">Regular Gasoline</option>
              <option value="Z">Premium Gasoline</option>
              <option value="D">Diesel</option>
              <option value="E">Ethanol</option>
              <option value="N">Natural Gas</option>
            </select>
          </div>

          {/* Engine type */}
          <div className='w-full flex flex-col'>
            <label className='p-2 text-lg'>Engine Size</label>
            <input
              name='engineSize'
              value={input.engineSize}
              onChange={handlechange}
              type="number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"></input>
          </div>

          {/* Engine Cylinders */}
          <div className="w-full flex flex-col ">
            <label className='p-2 text-lg'>Engine Cylinders</label>
            <select
              name='engineCylinders'
              value={input.engineCylinders}
              onChange={handleSelectChange}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            >
              <option value="">Select Engine Size Bin</option>
              <option value="1.5">1.0-2.0L</option>
              <option value="2.5">2.0-3.0L</option>
              <option value="3.5">3.0-4.0L</option>
              <option value="4.5">4.0-5.0L</option>
              <option value="6.5">5.0+L</option>
            </select>
          </div>

          {/* Engine Power Ratio */}
          <div className='w-full flex flex-col'>
            <label className='p-2 text-lg'>Engine Power Ratio</label>
            <input
              name='enginePowerRatio'
              value={input.enginePowerRatio}
              onChange={handlechange}
              type="number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"></input>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out font-semibold text-lg shadow-md">Predict</button>

        </form>

        {prediction && (
          <div className='mt-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center shadow-inner'>
            <p className="text-xl font-semibold">Predicted Emission:</p>
            <p className="text-3xl font-bold mt-2">
              {prediction.toFixed(2)} g/km (CO2)
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center shadow-inner">
            <strong>Error:</strong> {error}
          </div>
        )}


      </div>
    </div>
  )
}

export default App
