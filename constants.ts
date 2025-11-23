import { Language, DroneSpecs } from './types';

export const DEFAULT_DRONES: DroneSpecs[] = [
  // --- 2024/2025 Releases ---
  {
    id: 'dji-neo',
    name: 'DJI Neo',
    weight_g: 135,
    max_wind_resistance_kmh: 28, // Level 4
    max_flight_time_min: 18,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-avata-2',
    name: 'DJI Avata 2',
    weight_g: 377,
    max_wind_resistance_kmh: 38, // Level 5
    max_flight_time_min: 23,
    category: 'Open A1 (<500g)',
    imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro',
    weight_g: 249,
    max_wind_resistance_kmh: 38, // Level 5
    max_flight_time_min: 34,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-air-3',
    name: 'DJI Air 3',
    weight_g: 720,
    max_wind_resistance_kmh: 43, // Level 6
    max_flight_time_min: 46,
    category: 'Open A1 (C1)',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=300&q=80'
  },
  
  // --- Mavic 3 Series ---
  {
    id: 'dji-mavic-3-pro',
    name: 'DJI Mavic 3 Pro',
    weight_g: 958,
    max_wind_resistance_kmh: 43, // Level 6
    max_flight_time_min: 43,
    category: 'Open A2 (C2)',
    imageUrl: 'https://images.unsplash.com/photo-1504283337605-60e018696e3c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mavic-3-classic',
    name: 'DJI Mavic 3 Classic',
    weight_g: 895,
    max_wind_resistance_kmh: 43,
    max_flight_time_min: 46,
    category: 'Open A1 (C1)',
    imageUrl: 'https://images.unsplash.com/photo-1504283337605-60e018696e3c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mavic-3',
    name: 'DJI Mavic 3',
    weight_g: 895,
    max_wind_resistance_kmh: 43,
    max_flight_time_min: 46,
    category: 'Open A1 (C1)',
    imageUrl: 'https://images.unsplash.com/photo-1504283337605-60e018696e3c?auto=format&fit=crop&w=300&q=80'
  },

  // --- Mini Series ---
  {
    id: 'dji-mini-3-pro',
    name: 'DJI Mini 3 Pro',
    weight_g: 249,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 34,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mini-3',
    name: 'DJI Mini 3',
    weight_g: 248,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 38,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mini-2-se',
    name: 'DJI Mini 2 SE',
    weight_g: 246,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 31,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1580444205895-6779c6d90e2c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mini-2',
    name: 'DJI Mini 2',
    weight_g: 249,
    max_wind_resistance_kmh: 38, // Level 5
    max_flight_time_min: 31,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1580444205895-6779c6d90e2c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mini-se',
    name: 'DJI Mini SE',
    weight_g: 249,
    max_wind_resistance_kmh: 29, // Level 4 (approx)
    max_flight_time_min: 30,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1580444205895-6779c6d90e2c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mavic-mini',
    name: 'DJI Mavic Mini',
    weight_g: 249,
    max_wind_resistance_kmh: 28, // Level 4
    max_flight_time_min: 30,
    category: 'Open A1 (<250g)',
    imageUrl: 'https://images.unsplash.com/photo-1580444205895-6779c6d90e2c?auto=format&fit=crop&w=300&q=80'
  },

  // --- Air Series ---
  {
    id: 'dji-air-2s',
    name: 'DJI Air 2S',
    weight_g: 595,
    max_wind_resistance_kmh: 38, // Level 5
    max_flight_time_min: 31,
    category: 'Open A1 (<900g legacy)',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mavic-air-2',
    name: 'DJI Mavic Air 2',
    weight_g: 570,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 34,
    category: 'Open A1 (<900g legacy)',
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=300&q=80'
  },

  // --- FPV Series ---
  {
    id: 'dji-avata',
    name: 'DJI Avata',
    weight_g: 410,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 18,
    category: 'Open A1 (<500g)',
    imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-fpv',
    name: 'DJI FPV',
    weight_g: 795,
    max_wind_resistance_kmh: 50, // Significant wind resistance (39-49 kph spec usually)
    max_flight_time_min: 20,
    category: 'Open A3 (legacy) / A2',
    imageUrl: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=300&q=80'
  },

  // --- Older / Pro Series ---
  {
    id: 'dji-mavic-2-pro',
    name: 'DJI Mavic 2 Pro',
    weight_g: 907,
    max_wind_resistance_kmh: 38, // Level 5
    max_flight_time_min: 31,
    category: 'Open A3 / A2',
    imageUrl: 'https://images.unsplash.com/photo-1504283337605-60e018696e3c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-mavic-2-zoom',
    name: 'DJI Mavic 2 Zoom',
    weight_g: 905,
    max_wind_resistance_kmh: 38,
    max_flight_time_min: 31,
    category: 'Open A3 / A2',
    imageUrl: 'https://images.unsplash.com/photo-1504283337605-60e018696e3c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-phantom-4-pro-v2',
    name: 'DJI Phantom 4 Pro V2.0',
    weight_g: 1375,
    max_wind_resistance_kmh: 36,
    max_flight_time_min: 30,
    category: 'Open A3',
    imageUrl: 'https://images.unsplash.com/photo-1564518384624-3f446fa4ae30?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'dji-inspire-3',
    name: 'DJI Inspire 3',
    weight_g: 3995,
    max_wind_resistance_kmh: 54, // Approx 15 m/s
    max_flight_time_min: 28,
    category: 'Open A3 / Specific',
    imageUrl: 'https://images.unsplash.com/photo-1559653744-e846c8443388?auto=format&fit=crop&w=300&q=80'
  }
];

export const TRANSLATIONS = {
  it: {
    dashboard: 'Dashboard',
    myDrones: 'I Miei Droni',
    map: 'Mappa',
    settings: 'Impostazioni',
    optimal: 'Ottimale',
    acceptable: 'Accettabile',
    unsafe: 'Sconsigliato',
    wind: 'Vento',
    gusts: 'Raffiche',
    temp: 'Temp',
    rain: 'Pioggia',
    humidity: 'Umidità',
    pressure: 'Pressione',
    selectDrone: 'Seleziona Drone',
    addDrone: 'Aggiungi Drone',
    analyzing: 'Analisi in corso...',
    noGps: 'GPS non disponibile',
    flySafe: 'Vola in sicurezza',
    location: 'Posizione',
    places: 'I Miei Luoghi',
    addPlace: 'Salva Posizione',
    delete: 'Elimina',
    language: 'Lingua',
    units: 'Unità di Misura',
    speed: 'Velocità',
    distance: 'Distanza',
    mode: 'Modalità',
    aiAdvice: 'Analisi AI',
    searchDrone: 'Cerca Modello (es. Air 2S)',
    addMedia: 'Aggiungi Foto/Video',
    media: 'Galleria Media',
    noMedia: 'Nessun media aggiunto',
    placeName: 'Nome Luogo',
  },
  en: {
    dashboard: 'Dashboard',
    myDrones: 'My Drones',
    map: 'Map',
    settings: 'Settings',
    optimal: 'Optimal',
    acceptable: 'Acceptable',
    unsafe: 'Unsafe',
    wind: 'Wind',
    gusts: 'Gusts',
    temp: 'Temp',
    rain: 'Rain',
    humidity: 'Humidity',
    pressure: 'Pressure',
    selectDrone: 'Select Drone',
    addDrone: 'Add Drone',
    analyzing: 'Analyzing...',
    noGps: 'GPS unavailable',
    flySafe: 'Fly Safe',
    location: 'Location',
    places: 'My Places',
    addPlace: 'Save Location',
    delete: 'Delete',
    language: 'Language',
    units: 'Measurement Units',
    speed: 'Speed',
    distance: 'Distance',
    mode: 'Mode',
    aiAdvice: 'AI Analysis',
    searchDrone: 'Search Model (e.g. Air 2S)',
    addMedia: 'Add Photo/Video',
    media: 'Media Gallery',
    noMedia: 'No media added',
    placeName: 'Place Name',
  },
  es: {
    dashboard: 'Panel',
    myDrones: 'Mis Drones',
    map: 'Mapa',
    settings: 'Ajustes',
    optimal: 'Óptimo',
    acceptable: 'Aceptable',
    unsafe: 'No Recomendado',
    wind: 'Viento',
    gusts: 'Ráfagas',
    temp: 'Temp',
    rain: 'Lluvia',
    humidity: 'Humedad',
    pressure: 'Presión',
    selectDrone: 'Seleccionar Dron',
    addDrone: 'Añadir Dron',
    analyzing: 'Analizando...',
    noGps: 'GPS no disponible',
    flySafe: 'Vuela Seguro',
    location: 'Ubicación',
    places: 'Mis Lugares',
    addPlace: 'Guardar Ubicación',
    delete: 'Eliminar',
    language: 'Idioma',
    units: 'Unidades',
    speed: 'Velocidad',
    distance: 'Distancia',
    mode: 'Modo',
    aiAdvice: 'Análisis IA',
    searchDrone: 'Buscar Modelo',
    addMedia: 'Añadir Foto/Video',
    media: 'Galería Multimedia',
    noMedia: 'Sin multimedia',
    placeName: 'Nombre del lugar',
  },
  fr: {
    dashboard: 'Tableau de bord',
    myDrones: 'Mes Drones',
    map: 'Carte',
    settings: 'Paramètres',
    optimal: 'Optimal',
    acceptable: 'Acceptable',
    unsafe: 'Déconseillé',
    wind: 'Vent',
    gusts: 'Rafales',
    temp: 'Temp',
    rain: 'Pluie',
    humidity: 'Humidité',
    pressure: 'Pression',
    selectDrone: 'Sélectionner Drone',
    addDrone: 'Ajouter Drone',
    analyzing: 'Analyse...',
    noGps: 'GPS indisponible',
    flySafe: 'Volez en sécurité',
    location: 'Emplacement',
    places: 'Mes Lieux',
    addPlace: 'Enregistrer',
    delete: 'Supprimer',
    language: 'Langue',
    units: 'Unités',
    speed: 'Vitesse',
    distance: 'Distance',
    mode: 'Mode',
    aiAdvice: 'Analyse IA',
    searchDrone: 'Chercher Modèle',
    addMedia: 'Ajouter Photo/Vidéo',
    media: 'Galerie',
    noMedia: 'Aucun média',
    placeName: 'Nom du lieu',
  },
  de: {
    dashboard: 'Dashboard',
    myDrones: 'Meine Drohnen',
    map: 'Karte',
    settings: 'Einstellungen',
    optimal: 'Optimal',
    acceptable: 'Akzeptabel',
    unsafe: 'Unsicher',
    wind: 'Wind',
    gusts: 'Böen',
    temp: 'Temp',
    rain: 'Regen',
    humidity: 'Feuchtigkeit',
    pressure: 'Druck',
    selectDrone: 'Drohne wählen',
    addDrone: 'Drohne hinzufügen',
    analyzing: 'Analysiere...',
    noGps: 'GPS nicht verfügbar',
    flySafe: 'Sicher fliegen',
    location: 'Standort',
    places: 'Meine Orte',
    addPlace: 'Ort speichern',
    delete: 'Löschen',
    language: 'Sprache',
    units: 'Einheiten',
    speed: 'Geschwindigkeit',
    distance: 'Distanz',
    mode: 'Modus',
    aiAdvice: 'KI Analyse',
    searchDrone: 'Modell suchen',
    addMedia: 'Foto/Video hinzufügen',
    media: 'Medien',
    noMedia: 'Keine Medien',
    placeName: 'Ortsname',
  },
};