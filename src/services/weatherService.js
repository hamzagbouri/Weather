import axios from 'axios';

const API_KEY = '3ihwsw4i5ognlys8p7l0ddxn15a7q9v1b8mj4p6i';
const API_URL = 'https://www.meteosource.com/api/v1/free/point';

// Obtenir la météo pour un lieu spécifique
export const getWeatherForPlace = async (placeId = 'marrakech') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        place_id: placeId,
        sections: 'all',
        timezone: 'UTC',
        language: 'en', // Langue en français
        units: 'metric',
        key: API_KEY
      }
    });
    console.log('Données météo reçues:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    throw error;
  }
};

// Obtenir la météo pour des coordonnées spécifiques
// Note: cette fonction est un exemple, mais l'API gratuite de Meteosource pourrait ne pas la prendre en charge
export const getWeatherForCoordinates = async (lat, lon) => {
  try {
    // Dans un projet réel, vous devriez vérifier si l'API supporte cette fonctionnalité
    const response = await axios.get(API_URL, {
      params: {
        lat: lat,
        lon: lon,
        sections: 'all',
        timezone: 'UTC',
        language: 'fr',
        units: 'metric',
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo par coordonnées:', error);
    throw error;
  }
};

// Fonction utilitaire pour obtenir l'icône météo
export const getWeatherIconUrl = (iconName) => {
  const iconMap = {
    'sunny': 'sun',
    'clear': 'moon',
    'partly_sunny': 'cloud-sun',
    'partly_clear': 'cloud-moon',
    'cloudy': 'cloud',
    'mostly_cloudy': 'cloud',
    'overcast': 'clouds',
    'fog': 'fog',
    'light_rain': 'cloud-rain',
    'rain': 'cloud-showers-heavy',
    'heavy_rain': 'cloud-showers-heavy',
    'mostly_sunny': 'sun',
    'light_snow': 'snowflake',
    'snow': 'snowflake',
    'heavy_snow': 'snowflake',
    'thunderstorm': 'bolt',
    'hail': 'cloud-meatball'
  };

  // Si nous avons un numéro d'icône, on le convertit en string
  if (typeof iconName === 'number') {
    iconName = iconName.toString();
  }

  const iconBase = iconMap[iconName] || 'cloud';
  return `/src/assets/weather-icons/${iconName}.svg`;
};

// Formater la date pour l'affichage
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

// Formater le jour pour l'affichage
export const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

// Convertir la vitesse du vent de m/s à km/h
export const convertWindSpeed = (speed) => {
  return Math.round(speed * 3.6);
}; 