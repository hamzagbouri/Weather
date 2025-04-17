import { formatDate, convertWindSpeed } from '../services/weatherService';

const HourlyForecast = ({ data }) => {
  if (!data || !data.hourly || !data.hourly.data) return null;
  
  // Prendre les 8 premières heures pour limiter l'affichage
  const hourlyData = data.hourly.data.slice(0, 8);
  
  return (
    <div className="hourly-forecast">
      <h2>Prévisions Horaires</h2>
      
      <div className="forecast-list">
        {hourlyData.map((hour, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-time">{formatDate(hour.date)}</p>
            <div className="forecast-icon">
              <img 
                src={`/src/assets/weather-icons/${hour.icon}.svg`} 
                alt={hour.summary}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/src/assets/weather-icons/default.svg';
                }}
              />
            </div>
            <p className="forecast-temp">{hour.temperature}°C</p>
            <div className="forecast-details">
              <span className="wind">{convertWindSpeed(hour.wind.speed)} km/h {hour.wind.dir}</span>
              <span className="cloud">{hour.cloud_cover.total}% nuages</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast; 