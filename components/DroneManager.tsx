import React, { useState } from 'react';
import { DroneSpecs } from '../types';
import { Icons } from './IconComponents';
import { getDroneSpecs } from '../services/geminiService';

interface DroneManagerProps {
  drones: DroneSpecs[];
  activeDroneId: string;
  setActiveDrone: (id: string) => void;
  addDrone: (drone: DroneSpecs) => void;
  removeDrone: (id: string) => void;
  t: any;
}

const DroneManager: React.FC<DroneManagerProps> = ({ drones, activeDroneId, setActiveDrone, addDrone, removeDrone, t }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchTerm) return;
      setIsLoading(true);
      const specs = await getDroneSpecs(searchTerm);
      if (specs) {
          addDrone(specs);
          setIsAdding(false);
          setSearchTerm('');
      } else {
          alert('Could not find drone specifications. Try a different name.');
      }
      setIsLoading(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold">{t.myDrones}</h2>
        <button 
            onClick={() => setIsAdding(!isAdding)}
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
            <Icons.Plus size={20} />
        </button>
      </div>

      {isAdding && (
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-lg border border-neutral-100 animate-in fade-in slide-in-from-top-4">
              <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">{t.searchDrone}</label>
              <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="e.g. Mavic 3 Pro"
                    className="flex-1 bg-neutral-100 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-black/20"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-black text-white rounded-xl px-4 font-medium disabled:opacity-50"
                  >
                      {isLoading ? <Icons.Search className="animate-spin" /> : <Icons.Search />}
                  </button>
              </div>
          </form>
      )}

      <div className="space-y-3">
        {drones.map(drone => {
            const isActive = drone.id === activeDroneId;
            return (
                <div 
                    key={drone.id} 
                    onClick={() => setActiveDrone(drone.id)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer group ${isActive ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-transparent hover:border-neutral-200 text-neutral-800 shadow-sm'}`}
                >
                    <div className="flex gap-4">
                         {/* Thumbnail / Fallback */}
                        <div className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border ${isActive ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-100 bg-neutral-100'}`}>
                            {drone.imageUrl ? (
                                <img 
                                    src={drone.imageUrl} 
                                    alt={drone.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-30">
                                    <Icons.Navigation size={28} />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold leading-tight">{drone.name}</h3>
                                {isActive && <Icons.CheckCircle size={20} className="shrink-0 ml-2" />}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm opacity-80">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Weight</span>
                                    {drone.weight_g}g
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase tracking-wider opacity-70">Resist.</span>
                                    {drone.max_wind_resistance_kmh} km/h
                                </div>
                                <div className="col-span-2 mt-1">
                                     <span className="block text-[10px] uppercase tracking-wider opacity-70">Category</span>
                                     <span className="truncate block">{drone.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isActive && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeDrone(drone.id); }}
                            className="absolute top-4 right-4 p-2 text-neutral-300 hover:text-red-500 transition-colors"
                        >
                            <Icons.Trash2 size={16} />
                        </button>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default DroneManager;