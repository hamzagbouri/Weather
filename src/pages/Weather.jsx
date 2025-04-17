import { useState, useEffect } from 'react';
import { getWeatherForPlace } from '../services/weatherService';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import SearchBar from '../components/SearchBar';
import StatusMessage from '../components/StatusMessage';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState('marrakech'); // Ville par défaut
  const [userLocation, setUserLocation] = useState(null);
  const [displayCity, setDisplayCity] = useState('');
  const [searchAttempts, setSearchAttempts] = useState(0);

  // Fonction pour obtenir l'emplacement de l'utilisateur
  const getUserLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          // Après avoir obtenu les coordonnées, on pourrait faire un appel API inversé pour obtenir le nom de la ville
          // Mais pour cet exemple, on utilise la ville par défaut car l'API ne prend pas en charge les coordonnées
          fetchWeather(place);
          setDisplayCity('Marrakech (Par défaut)');
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          // En cas d'erreur, on utilise la ville par défaut
          fetchWeather(place);
        },
        { timeout: 10000 }
      );
    } else {
      console.log("La géolocalisation n'est pas supportée par ce navigateur");
      fetchWeather(place);
    }
  };

  // Fonction pour récupérer la météo par coordonnées
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      // Pour cet exemple, on utilise quand même le place_id car l'API gratuite de Meteosource
      // ne semble pas prendre en charge les coordonnées directement.
      const data = await getWeatherForPlace(place);
      setWeatherData(data);
      setDisplayCity('Votre position');
    } catch (err) {
      setError('Impossible de récupérer les données météo pour votre emplacement. Utilisation de la ville par défaut.');
      console.error('Erreur:', err);
      fetchWeather(place);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (placeId) => {
    setLoading(true);
    setError(null);
    setSearchAttempts(prev => prev + 1);
    
    try {
      const data = await getWeatherForPlace(placeId);
      setWeatherData(data);
      // Première lettre en majuscule
      setDisplayCity(placeId.charAt(0).toUpperCase() + placeId.slice(1));
    } catch (err) {
      setError(`Impossible de récupérer les données météo pour "${placeId}". Veuillez vérifier l'orthographe ou essayer une autre ville.`);
      console.error('Erreur:', err);
      
      // Si nous avons déjà essayé plusieurs fois sans succès, suggérer une ville par défaut
      if (searchAttempts > 2 && !weatherData) {
        setTimeout(() => {
          fetchWeather('marrakech');
          setDisplayCity('Marrakech (Par défaut)');
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Rechercher une nouvelle ville
  const handleSearch = (city) => {
    setPlace(city);
    fetchWeather(city);
  };

  // Charger les données météo au chargement de la page
  useEffect(() => {
    // Chargement initial avec la ville par défaut
    fetchWeather(place);
    
    // Essayer d'obtenir la position de l'utilisateur pour les futures requêtes
    getUserLocation();
  }, []);

  return (
    <div className="weather-page">
      <header className="app-header">
        <h1>Application Météo</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <StatusMessage loading={loading} error={error} />
      
      {!loading && !error && weatherData && (
        <div className="weather-content">
          <div className="city-display">
            <h2>Météo pour <span className="city-highlight">{displayCity}</span></h2>
          </div>
          <CurrentWeather data={weatherData} cityName={displayCity} />
          <HourlyForecast data={weatherData} cityName={displayCity} />
          <DailyForecast data={weatherData} cityName={displayCity} />
        </div>
      )}
    </div>
  );
};

export default Weather; 