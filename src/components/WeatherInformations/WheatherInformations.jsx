import PropTypes from 'prop-types'; // Importando PropTypes
import './WeatherInformations.css';

const WeatherInformations = ({ weather }) => {
  return (
    <div className='weather-container'>
      <h2>{weather.name}</h2>
      <div className='weather-info'>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description} // Adicionando alt para acessibilidade
        />
        <p className='temperature'>{Math.round(weather.main.temp)}ºC</p>
      </div>
      <p className='description'>{weather.weather[0].description}</p>
      <div className='details'>
        <p>Sensação térmica: {Math.round(weather.main.feels_like)}ºC</p>
        <p>Umidade: {weather.main.humidity}%</p>
        <p>Pressão: {weather.main.pressure} hPa</p> {/* Adicionando unidade para a pressão */}
      </div>
    </div>
  );
};

WeatherInformations.propTypes = {
  weather: PropTypes.object.isRequired, // Definindo tipo de props
};

export default WeatherInformations;
