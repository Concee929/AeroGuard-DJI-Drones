import React, { useState, useEffect } from 'react';
import { Icons } from './components/IconComponents';
import { AppSettings, DroneSpecs, SavedPlace, WeatherData } from './types';
import { DEFAULT_DRONES, TRANSLATIONS } from './constants';
import Dashboard from './components/Dashboard';
import DroneManager from './components/DroneManager';
import MapCoordinator from './components/MapCoordinator';
import SettingsPanel from './components/SettingsPanel';
import { fetchLocalWeather } from './services/weatherService';

const App: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'drones' | 'map' | 'settings'>('dashboard');
  const [drones, setDrones] = useState<DroneSpecs[]>(DEFAULT_DRONES);
  const [activeDroneId, setActiveDroneId] = useState<string>(DEFAULT_DRONES[0].id);
  
  const [settings, setSettings] = useState<AppSettings>({
    language: 'it',
    speedUnit: 'km/h',
    distanceUnit: 'm',
    mode: 'standard'
  });

  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  // --- Derived ---
  const t = TRANSLATIONS[settings.language];
  const activeDrone = drones.find(d => d.id === activeDroneId) || drones[0];

  // --- Effects ---

  // 1. Get Location & Weather on Mount
  useEffect(() => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            setLocation({ lat: latitude, lng: longitude });
            const wData = await fetchLocalWeather(latitude, longitude);
            setWeather(wData);
        }, (err) => {
            console.error("Loc error", err);
            // Default location (e.g., Rome) if permission denied
            const defLat = 41.9028, defLng = 12.4964;
            setLocation({ lat: defLat, lng: defLng });
            fetchLocalWeather(defLat, defLng).then(setWeather);
        });
    }
  }, []);

  // 2. Refresh Weather interval
  useEffect(() => {
    const interval = setInterval(() => {
        if (location) {
            fetchLocalWeather(location.lat, location.lng).then(setWeather);
        }
    }, 300000); // 5 mins
    return () => clearInterval(interval);
  }, [location]);

  // --- Handlers ---
  const handleAddDrone = (drone: DroneSpecs) => {
      setDrones([...drones, drone]);
      setActiveDroneId(drone.id);
      setActiveTab('dashboard');
  };

  const handleRemoveDrone = (id: string) => {
      const remaining = drones.filter(d => d.id !== id);
      if (remaining.length > 0) {
          setDrones(remaining);
          if (activeDroneId === id) setActiveDroneId(remaining[0].id);
      }
  };

  const handleAddPlace = (place: SavedPlace) => {
      setPlaces([...places, place]);
  };

  const handleDeletePlace = (id: string) => {
      setPlaces(places.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-black selection:text-white flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-neutral-200">
      
      {/* Header */}
      <header className="pt-8 pb-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-40 border-b border-neutral-100">
        <div>
            <h1 className="text-xl font-bold tracking-tight">AeroGuard AI</h1>
            <p className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                {location ? (
                    <><Icons.Map size={10} /> GPS Active</>
                ) : (
                    <><Icons.XCircle size={10} /> No GPS</>
                )}
            </p>
        </div>
        <div 
            onClick={() => setActiveTab('settings')}
            className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors"
        >
            <Icons.Settings size={20} className="text-neutral-700" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {activeTab === 'dashboard' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
                <Dashboard 
                    weather={weather} 
                    drone={activeDrone} 
                    settings={settings}
                    t={t}
                />
            </div>
        )}

        {activeTab === 'drones' && (
            <div className="animate-in slide-in-from-right duration-300">
                <DroneManager 
                    drones={drones} 
                    activeDroneId={activeDroneId}
                    setActiveDrone={setActiveDroneId}
                    addDrone={handleAddDrone}
                    removeDrone={handleRemoveDrone}
                    t={t}
                />
            </div>
        )}

        {activeTab === 'map' && (
            <div className="animate-in slide-in-from-bottom duration-300">
                <MapCoordinator 
                    places={places} 
                    currentLocation={location}
                    addPlace={handleAddPlace}
                    deletePlace={handleDeletePlace}
                    t={t}
                    weather={weather}
                />
            </div>
        )}

        {activeTab === 'settings' && (
            <div className="animate-in slide-in-from-right duration-300">
                <SettingsPanel 
                    settings={settings}
                    updateSettings={setSettings}
                    t={t}
                />
            </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-neutral-200 px-6 py-4 pb-8 flex justify-between items-center z-50">
        <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-black scale-105' : 'text-neutral-400'}`}
        >
            <div className={`p-2 rounded-full ${activeTab === 'dashboard' ? 'bg-neutral-100' : ''}`}>
                <Icons.Home size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
            </div>
        </button>

        <button 
             onClick={() => setActiveTab('drones')}
             className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'drones' ? 'text-black scale-105' : 'text-neutral-400'}`}
        >
            <div className={`p-2 rounded-full ${activeTab === 'drones' ? 'bg-neutral-100' : ''}`}>
                <Icons.Navigation size={24} strokeWidth={activeTab === 'drones' ? 2.5 : 2} />
            </div>
        </button>

        <button 
             onClick={() => setActiveTab('map')}
             className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'map' ? 'text-black scale-105' : 'text-neutral-400'}`}
        >
            <div className={`p-2 rounded-full ${activeTab === 'map' ? 'bg-neutral-100' : ''}`}>
                <Icons.Map size={24} strokeWidth={activeTab === 'map' ? 2.5 : 2} />
            </div>
        </button>
      </nav>

    </div>
  );
};

export default App;
