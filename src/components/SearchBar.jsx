import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  
  // Liste des villes populaires pour les raccourcis
  const popularCities = [
    'Paris', 
    'Casablanca', 
    'Marrakech', 
    'Rabat', 
    'Fès'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const handleQuickSearch = (cityName) => {
    setCity(cityName);
    onSearch(cityName);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Rechercher une ville..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>
      
      <div className="quick-cities">
        <p className="quick-cities-label">Villes populaires:</p>
        <div className="city-buttons">
          {popularCities.map((cityName, index) => (
            <button 
              key={index} 
              className="city-button"
              onClick={() => handleQuickSearch(cityName)}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 