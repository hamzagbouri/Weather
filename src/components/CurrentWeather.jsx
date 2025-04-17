import { convertWindSpeed } from '../services/weatherService';

const CurrentWeather = ({ data, cityName }) => {
  if (!data) return null;

  const { current, lat, lon, timezone } = data;
  
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2 className="city-name">
          {cityName ? (
            <span className="highlighted-city">{cityName}</span>
          ) : (
            <span>Météo Actuelle<span className="coordinates"> ({lat}, {lon})</span></span>
          )}
        </h2>
        <p className="timezone">{timezone}</p>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">
          <img 
            src={`/src/assets/weather-icons/${current.icon_num || current.icon}.svg`} 
            alt={current.summary}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/src/assets/weather-icons/default.svg';
            }}
          />
        </div>
        
        <div className="weather-info">
          <p className="temperature">{current.temperature}°C</p>
          <p className="summary">{current.summary}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail">
          <span className="detail-label">Vent</span>
          <span className="detail-value">{convertWindSpeed(current.wind.speed)} km/h</span>
          <span className="detail-direction">{current.wind.dir}</span>
        </div>
        
        <div className="detail">
          <span className="detail-label">Précipitation</span>
          <span className="detail-value">{current.precipitation.total} mm</span>
          <span className="detail-type">({current.precipitation.type})</span>
        </div>
        
        <div className="detail">
          <span className="detail-label">Couverture nuageuse</span>
          <span className="detail-value">{current.cloud_cover}%</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 