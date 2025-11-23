import React, { useEffect, useState } from 'react';
import { AppSettings, DroneSpecs, WeatherData, FlightStatusLevel, FlightAnalysis } from '../types';
import { Icons } from './IconComponents';
import { TRANSLATIONS } from '../constants';
import { analyzeFlightSafety } from '../services/geminiService';

interface DashboardProps {
  weather: WeatherData | null;
  drone: DroneSpecs;
  settings: AppSettings;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ weather, drone, settings, t }) => {
  const [analysis, setAnalysis] = useState<FlightAnalysis | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>("");

  useEffect(() => {
    if (!weather) return;

    // Calculate Safety Logic
    const windRatio = (weather.wind_gusts_kmh / drone.max_wind_resistance_kmh) * 100;
    let status: FlightStatusLevel = 'optimal';
    const reasons: string[] = [];

    if (weather.rain_prob > 50) {
      status = 'unsafe';
      reasons.push('High Rain Probability');
    }
    
    if (windRatio > 100) {
      status = 'unsafe';
      reasons.push('Wind exceeds drone limit');
    } else if (windRatio > 70) {
      status = (status === 'unsafe') ? 'unsafe' : 'acceptable';
      reasons.push('High wind gusts');
    }

    if (weather.temp_c < 0 || weather.temp_c > 40) {
        status = (status === 'unsafe') ? 'unsafe' : 'acceptable';
        reasons.push('Temperature extreme');
    }

    setAnalysis({
      status,
      windPercentage: windRatio,
      reasons,
      advice: ''
    });

    // Async AI advice
    analyzeFlightSafety(drone, weather).then(setAiAdvice);

  }, [weather, drone]);

  if (!weather || !analysis) return <div className="p-8 text-center animate-pulse">{t.analyzing}</div>;

  // Visual Styles based on status
  const statusStyles = {
    optimal: 'bg-white text-black border-2 border-black',
    acceptable: 'bg-neutral-200 text-neutral-800',
    unsafe: 'bg-black text-white'
  };

  const IconStatus = {
    optimal: Icons.CheckCircle,
    acceptable: Icons.AlertTriangle,
    unsafe: Icons.XCircle
  };

  const StatusIcon = IconStatus[analysis.status];

  // Unit Conversion Helpers
  const displaySpeed = (kmh: number) => {
    if (settings.speedUnit === 'mph') return `${(kmh * 0.621371).toFixed(1)} mph`;
    if (settings.speedUnit === 'm/s') return `${(kmh / 3.6).toFixed(1)} m/s`;
    return `${kmh.toFixed(1)} km/h`;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Main Status Card */}
      <div className={`rounded-3xl p-8 shadow-xl transition-all duration-500 ${statusStyles[analysis.status]} flex flex-col items-center justify-center text-center relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
        <StatusIcon size={64} className="mb-4" />
        <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase">{t[analysis.status]}</h1>
        <p className="opacity-80 max-w-xs mx-auto">{analysis.reasons.length > 0 ? analysis.reasons.join(' • ') : t.flySafe}</p>
        
        {/* Drone Badge */}
        <div className="mt-6 px-4 py-1 rounded-full border border-current opacity-60 text-sm font-medium">
            {drone.name}
        </div>
      </div>

      {/* AI Advice */}
      <div className="bg-neutral-100 rounded-2xl p-4 flex items-start space-x-3 shadow-sm border border-neutral-200">
        <Icons.Signal className="mt-1 text-neutral-500 shrink-0" size={18} />
        <div>
            <h3 className="text-xs font-bold uppercase text-neutral-400 mb-1 tracking-wider">AI ASSISTANT</h3>
            <p className="text-sm font-medium leading-relaxed">{aiAdvice || t.analyzing}</p>
        </div>
      </div>

      {/* Weather Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Wind */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <Icons.Wind className="mb-2 text-neutral-400" />
            <span className="text-2xl font-bold">{displaySpeed(weather.wind_speed_kmh)}</span>
            <span className="text-xs text-neutral-500 uppercase">{t.wind}</span>
            <div className="mt-2 text-xs font-mono bg-neutral-100 px-2 py-1 rounded">
                Gust: {displaySpeed(weather.wind_gusts_kmh)}
            </div>
        </div>

        {/* Temp */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <Icons.Thermometer className="mb-2 text-neutral-400" />
            <span className="text-2xl font-bold">{weather.temp_c}°</span>
            <span className="text-xs text-neutral-500 uppercase">{t.temp}</span>
        </div>

         {/* Rain */}
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <Icons.Droplets className="mb-2 text-neutral-400" />
            <span className="text-2xl font-bold">{weather.rain_prob}%</span>
            <span className="text-xs text-neutral-500 uppercase">{t.rain}</span>
        </div>

         {/* Direction */}
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center">
            <Icons.Navigation className="mb-2 text-neutral-400" style={{ transform: `rotate(${weather.wind_direction}deg)` }} />
            <span className="text-2xl font-bold">{weather.wind_direction}°</span>
            <span className="text-xs text-neutral-500 uppercase">Compass</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
