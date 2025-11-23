import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SavedPlace, WeatherData, PlaceMedia } from '../types';
import { Icons } from './IconComponents';

// Fix Leaflet icons in React without bundling by pointing to CDN assets
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconShadow = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    places: SavedPlace[];
    currentLocation: { lat: number, lng: number } | null;
    addPlace: (place: SavedPlace) => void;
    deletePlace: (id: string) => void;
    t: any;
    weather: WeatherData | null;
}

// Component to recenter map
const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);
    return null;
};

// Component to handle clicks
const MapClickEvent = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const MapCoordinator: React.FC<MapProps> = ({ places, currentLocation, addPlace, deletePlace, t, weather }) => {
    const [selectedPos, setSelectedPos] = useState<{lat: number, lng: number} | null>(null);
    const [newPlaceName, setNewPlaceName] = useState("");
    const [newPlaceMedia, setNewPlaceMedia] = useState<PlaceMedia[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        if (selectedPos && newPlaceName) {
            addPlace({
                id: Date.now().toString(),
                lat: selectedPos.lat,
                lng: selectedPos.lng,
                name: newPlaceName,
                isFavorite: false,
                dateVisited: new Date().toISOString(),
                media: newPlaceMedia
            });
            setSelectedPos(null);
            setNewPlaceName("");
            setNewPlaceMedia([]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result) {
                        setNewPlaceMedia(prev => [...prev, {
                            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                            type: file.type.startsWith('video') ? 'video' : 'image',
                            url: event.target!.result as string,
                            name: file.name
                        }]);
                    }
                };
                reader.readAsDataURL(file);
            });
            // Reset input so the same file can be selected again if needed
            e.target.value = '';
        }
    };

    return (
        <div className="h-[calc(100vh-180px)] w-full rounded-3xl overflow-hidden shadow-md relative border border-neutral-200">
             <MapContainer center={[currentLocation?.lat || 41.9028, currentLocation?.lng || 12.4964]} zoom={13} scrollWheelZoom={true} className="h-full w-full">
                {/* Monochromatic Tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                
                {currentLocation && <RecenterMap lat={currentLocation.lat} lng={currentLocation.lng} />}
                
                <MapClickEvent onLocationSelect={(lat, lng) => {
                    setSelectedPos({lat, lng});
                    setNewPlaceName("");
                    setNewPlaceMedia([]);
                }} />

                {/* Current User Location */}
                {currentLocation && (
                     <Marker position={[currentLocation.lat, currentLocation.lng]}>
                        <Popup>
                            <div className="font-bold text-sm">{t.location}</div>
                            {weather && <div className="text-xs text-neutral-500 mt-1">Wind: {weather.wind_speed_kmh} km/h</div>}
                        </Popup>
                    </Marker>
                )}

                {/* Saved Places */}
                {places.map(place => (
                    <Marker key={place.id} position={[place.lat, place.lng]}>
                        <Popup>
                            <div className="min-w-[260px] p-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-base leading-tight">{place.name}</h3>
                                        <p className="text-[10px] text-neutral-400 flex items-center mt-0.5">
                                            <Icons.Navigation size={10} className="mr-1"/>
                                            {new Date(place.dateVisited!).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => deletePlace(place.id)}
                                        className="text-neutral-300 hover:text-red-500 transition-colors"
                                    >
                                        <Icons.Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Media Gallery */}
                                {place.media && place.media.length > 0 ? (
                                    <div className="flex gap-2 overflow-x-auto pb-2 mb-2 scrollbar-hide snap-x">
                                        {place.media.map(m => (
                                            <div key={m.id} className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 relative snap-start group">
                                                {m.type === 'image' ? (
                                                    <img src={m.url} alt="place" className="w-full h-full object-cover" />
                                                ) : (
                                                    <video 
                                                        src={m.url} 
                                                        className="w-full h-full object-cover" 
                                                        controls
                                                        muted
                                                        playsInline 
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-xs text-neutral-400 italic mb-2 py-2 bg-neutral-50 rounded text-center border border-dashed border-neutral-200">{t.noMedia}</div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Selection Marker (New Place) */}
                {selectedPos && (
                    <Marker position={[selectedPos.lat, selectedPos.lng]} opacity={0.8}>
                        <Popup>
                           <div className="p-1 min-w-[260px]">
                                <label className="text-[10px] font-bold uppercase text-neutral-400 mb-1 block tracking-wider">{t.placeName}</label>
                                <input 
                                    className="border border-neutral-200 bg-neutral-50 p-2 text-sm rounded-lg w-full mb-3 outline-none focus:ring-2 ring-black/10 transition-shadow" 
                                    placeholder="e.g. Hidden Field" 
                                    value={newPlaceName}
                                    onChange={(e) => setNewPlaceName(e.target.value)}
                                    autoFocus
                                />
                                
                                {/* Media Upload Preview */}
                                {newPlaceMedia.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 scrollbar-hide">
                                        {newPlaceMedia.map(m => (
                                            <div key={m.id} className="w-16 h-16 shrink-0 rounded-lg bg-neutral-100 overflow-hidden relative border border-neutral-200 shadow-sm">
                                                {m.type === 'image' ? (
                                                    <img src={m.url} alt="prev" className="w-full h-full object-cover" />
                                                ) : (
                                                    <video 
                                                        src={m.url} 
                                                        className="w-full h-full object-cover" 
                                                        muted 
                                                        autoPlay
                                                        loop
                                                        playsInline
                                                    />
                                                )}
                                                <button 
                                                    onClick={() => setNewPlaceMedia(prev => prev.filter(x => x.id !== m.id))}
                                                    className="absolute top-0 right-0 bg-black/50 text-white p-0.5 rounded-bl-lg hover:bg-red-500 transition-colors"
                                                >
                                                    <Icons.XCircle size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    {/* Hidden File Input */}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        accept="image/*,video/*" 
                                        multiple 
                                        className="hidden" 
                                        onChange={handleFileSelect}
                                    />
                                    
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex-1 bg-white border border-neutral-200 text-neutral-700 hover:text-black text-xs py-2 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-1 transition-colors"
                                        title={t.addMedia}
                                    >
                                        <Icons.Camera size={14} /> <span className="hidden sm:inline">Media</span>
                                    </button>

                                    <button 
                                        onClick={handleSave} 
                                        disabled={!newPlaceName}
                                        className="flex-[2] bg-black text-white text-xs py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 hover:bg-neutral-800 transition-colors shadow-sm"
                                    >
                                        <Icons.Save size={14} /> {t.addPlace}
                                    </button>
                                </div>
                           </div>
                        </Popup>
                    </Marker>
                )}

            </MapContainer>
            
            {/* Legend / Overlay */}
            <div className="absolute bottom-5 left-5 z-[400]">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-neutral-200/60">
                    <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Map Mode</p>
                    <div className="text-sm font-medium text-neutral-800">Standard View</div>
                </div>
            </div>
        </div>
    );
};

export default MapCoordinator;