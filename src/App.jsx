import { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [weather5Days, setWeather5Days] = useState(null);
  const [city, setCity] = useState('');
  const API_KEY = "abafed81cb584fb079bdf93ebbbf4956"; // Renomeado para API_KEY

  const searchCity = useCallback(async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`
    
    try {
      const [apiInfo, apiInfo5Days] = await Promise.all([
        axios.get(url),
        axios.get(url5Days)
      ]);
      
      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Consider adding error handling state here
    }
  }, [city, API_KEY]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchCity();
    }
  };

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input 
        type='text' 
        placeholder='Digite o nome da cidade' 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
};

export default App;