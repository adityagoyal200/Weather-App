import React, { useState } from 'react';
import axios from 'axios';
import { FaCloud, FaTemperatureHigh, FaWind } from 'react-icons/fa'; // Importing icons
import { MdSunny, MdCloud, MdCloudQueue } from 'react-icons/md'; // Adding more icons for different conditions
import { BsCloudRain, BsFillCloudFogFill } from 'react-icons/bs'; // For rain and mist

interface weatherType {
  city?: string;
  temperature?: string;
  condition?: string;
  wind?: string;
}

const Weather = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<weatherType>({});
  const [error, setError] = useState<string>('');

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      setWeather({});
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/weather?city=${city}`);
      setWeather(response.data); 
      setError('');
      setCity(''); // Reset the input box
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeather({});
    }
  };

  // Function to return icons based on the weather condition
  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <MdSunny className="text-yellow-500 text-3xl" />;
      case 'clear':
        return <MdCloud className="text-blue-400 text-3xl" />;
      case 'mist':
        return <BsFillCloudFogFill className="text-gray-500 text-3xl" />;
      case 'rain':
        return <BsCloudRain className="text-blue-500 text-3xl" />;
      default:
        return <FaCloud className="text-gray-500 text-3xl" />;
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 p-8 rounded-lg shadow-md w-full sm:w-96 mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Weather App</h1>
      <div className="flex items-center space-x-4 mb-6">
        <input 
          type="text" 
          value={city}
          onChange={handleCityChange} 
          placeholder="Enter city"
          className="p-3 w-64 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchWeather}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        >
          Get Weather
        </button>
      </div>

      {error && <p className="text-red-500 text-lg">{error}</p>}

      {weather && (
        <div className="mt-6 text-left w-full">
          <h2 className="text-2xl font-semibold text-gray-800">
            Weather in {weather.city || 'Unknown City'}
          </h2>
          <div className="flex items-center space-x-4 mt-4">
            <FaTemperatureHigh className="text-yellow-500 text-3xl" />
            <p className="text-xl">Temperature: {weather.temperature || 'N/A'}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            {getConditionIcon(weather.condition || 'N/A')}
            <p className="text-xl">Condition: {weather.condition || 'N/A'}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <FaWind className="text-blue-500 text-3xl" />
            <p className="text-xl">Wind Speed: {weather.wind || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
