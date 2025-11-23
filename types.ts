export type Language = 'it' | 'en' | 'es' | 'fr' | 'de';
export type SpeedUnit = 'km/h' | 'm/s' | 'mph';
export type DistanceUnit = 'm' | 'ft';

export interface AppSettings {
  language: Language;
  speedUnit: SpeedUnit;
  distanceUnit: DistanceUnit;
  mode: 'standard' | 'beginner' | 'fpv' | 'night';
}

export interface DroneSpecs {
  id: string;
  name: string;
  weight_g: number;
  max_wind_resistance_kmh: number;
  max_flight_time_min: number;
  category: string; // Open A1, A2, A3 etc
  imageUrl?: string;
}

export interface WeatherData {
  temp_c: number;
  wind_speed_kmh: number;
  wind_gusts_kmh: number;
  wind_direction: number;
  humidity: number;
  rain_prob: number; // 0-100
  pressure_hpa: number;
  conditionCode: number; // WMO code
}

export type FlightStatusLevel = 'optimal' | 'acceptable' | 'unsafe';

export interface FlightAnalysis {
  status: FlightStatusLevel;
  windPercentage: number; // Current wind / Max resistance
  reasons: string[];
  advice: string;
}

export interface PlaceMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

export interface SavedPlace {
  id: string;
  lat: number;
  lng: number;
  name: string;
  note?: string;
  dateVisited?: string; // ISO date
  isFavorite: boolean;
  rating?: FlightStatusLevel;
  media: PlaceMedia[];
}