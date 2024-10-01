import PropTypes from 'prop-types'; // Importando PropTypes
import './WeatherInformations5Days.css';

const WeatherInformations5Days = ({ weather5Days }) => {
  const dailyForecast = weather5Days.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!acc[date]) acc[date] = forecast;
    return acc;
  }, {});

  const next5DaysForecast = Object.values(dailyForecast).slice(1, 6);

  const convertDate = (date) => (
    new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })
  );

  return (
    <div className='weather-container'>
      <h3>Previsão próximos 5 dias</h3>
      <div className='weather-list'>
        {next5DaysForecast.map(forecast => (
          <div key={forecast.dt}>
            <p>{convertDate(forecast)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description} // Adicionando alt para acessibilidade
            />
            <p>{forecast.weather[0].description}</p>
            <p>
              Mín {Math.round(forecast.main.temp_min)}ºC / Máx {Math.round(forecast.main.temp_max)}ºC
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

WeatherInformations5Days.propTypes = {
  weather5Days: PropTypes.object.isRequired, // Definindo tipo de props
};

export default WeatherInformations5Days;
