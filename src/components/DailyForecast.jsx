import { formatDay, convertWindSpeed } from '../services/weatherService';

const DailyForecast = ({ data }) => {
  if (!data || !data.daily || !data.daily.data) return null;
  
  return (
    <div className="daily-forecast">
      <h2>Prévisions sur 7 jours</h2>
      
      <div className="daily-list">
        {data.daily.data.map((day, index) => (
          <div key={index} className="daily-item">
            <div className="daily-header">
              <h3 className="daily-date">{formatDay(day.day)}</h3>
              <p className="daily-summary">{day.summary}</p>
            </div>
            
            <div className="daily-content">
              <div className="daily-icon">
                <img 
                  src={`/src/assets/weather-icons/${day.icon}.svg`} 
                  alt={day.weather}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/src/assets/weather-icons/default.svg';
                  }}
                />
              </div>
              
              <div className="daily-temps">
                <span className="temp-max">{day.all_day.temperature_max}°C</span>
                <span className="temp-sep"> / </span>
                <span className="temp-min">{day.all_day.temperature_min}°C</span>
              </div>
              
              <div className="daily-details">
                <div className="detail">
                  <span className="detail-label">Vent</span>
                  <span className="detail-value">{convertWindSpeed(day.all_day.wind.speed)} km/h {day.all_day.wind.dir}</span>
                </div>
                
                <div className="detail">
                  <span className="detail-label">Nuages</span>
                  <span className="detail-value">{day.all_day.cloud_cover.total}%</span>
                </div>
                
                <div className="detail">
                  <span className="detail-label">Précipitation</span>
                  <span className="detail-value">{day.all_day.precipitation.total} mm</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast; 