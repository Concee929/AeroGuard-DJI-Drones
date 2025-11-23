import { WeatherData } from '../types';

export async function fetchLocalWeather(lat: number, lng: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m`
    );
    
    if (!response.ok) throw new Error('Weather API failed');

    const data = await response.json();
    const current = data.current;

    return {
      temp_c: current.temperature_2m,
      wind_speed_kmh: current.wind_speed_10m,
      wind_gusts_kmh: current.wind_gusts_10m,
      wind_direction: current.wind_direction_10m,
      humidity: current.relative_humidity_2m,
      rain_prob: current.precipitation > 0 ? 100 : 0, // Simplified for current conditions
      pressure_hpa: current.surface_pressure,
      conditionCode: 0 // Not used in this simplified version
    };
  } catch (error) {
    console.error("Weather Fetch Error", error);
    // Fallback Mock Data if offline or error
    return {
      temp_c: 22,
      wind_speed_kmh: 12,
      wind_gusts_kmh: 18,
      wind_direction: 180,
      humidity: 45,
      rain_prob: 0,
      pressure_hpa: 1013,
      conditionCode: 0
    };
  }
}
