import { GoogleGenAI, Type } from "@google/genai";
import { DroneSpecs, WeatherData, FlightAnalysis } from '../types';

const getAiClient = () => {
    if (!process.env.API_KEY) {
        console.warn("API Key not found");
        return null;
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function getDroneSpecs(modelName: string): Promise<DroneSpecs | null> {
    const ai = getAiClient();
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Get technical specifications for the DJI drone: "${modelName}". Return JSON only.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        weight_g: { type: Type.NUMBER },
                        max_wind_resistance_kmh: { type: Type.NUMBER },
                        max_flight_time_min: { type: Type.NUMBER },
                        category: { type: Type.STRING },
                    },
                    required: ["name", "weight_g", "max_wind_resistance_kmh", "max_flight_time_min", "category"]
                }
            }
        });
        
        const data = JSON.parse(response.text);
        return {
            id: `dji-${modelName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            ...data
        };
    } catch (e) {
        console.error("Gemini Spec Search Error", e);
        return null;
    }
}

export async function analyzeFlightSafety(drone: DroneSpecs, weather: WeatherData): Promise<string> {
    const ai = getAiClient();
    if (!ai) return "AI Analysis Unavailable. Please fly with caution.";

    const prompt = `
        Analyze flight safety for a ${drone.name} (Max wind res: ${drone.max_wind_resistance_kmh}km/h).
        Current Weather:
        - Wind: ${weather.wind_speed_kmh} km/h (Gusts: ${weather.wind_gusts_kmh} km/h)
        - Rain Probability: ${weather.rain_prob}%
        - Temp: ${weather.temp_c}°C
        
        Provide a concise, professional 1-sentence advice for the pilot. Focus on safety.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text.trim();
    } catch (e) {
        return "Check local regulations and keep visual line of sight.";
    }
}
