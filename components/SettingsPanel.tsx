import React from 'react';
import { AppSettings, Language, SpeedUnit, DistanceUnit } from '../types';
import { Icons } from './IconComponents';

interface SettingsProps {
  settings: AppSettings;
  updateSettings: (s: AppSettings) => void;
  t: any;
}

const SettingsPanel: React.FC<SettingsProps> = ({ settings, updateSettings, t }) => {
  
  const languages: {code: Language, label: string}[] = [
      { code: 'it', label: 'Italiano' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
      { code: 'fr', label: 'Français' },
      { code: 'de', label: 'Deutsch' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold px-2">{t.settings}</h2>

      {/* Language */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center mb-4">
            <Icons.Home className="mr-3" size={20} />
            <h3 className="font-semibold">{t.language}</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
            {languages.map(l => (
                <button 
                    key={l.code}
                    onClick={() => updateSettings({ ...settings, language: l.code })}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${settings.language === l.code ? 'bg-black text-white' : 'bg-neutral-50 hover:bg-neutral-100'}`}
                >
                    {l.label}
                </button>
            ))}
        </div>
      </div>

      {/* Units */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
         <div className="flex items-center mb-4">
            <Icons.Settings className="mr-3" size={20} />
            <h3 className="font-semibold">{t.units}</h3>
        </div>

        <div className="space-y-4">
            <div>
                <label className="text-xs uppercase text-neutral-400 font-bold mb-2 block">{t.speed}</label>
                <div className="flex bg-neutral-100 rounded-xl p-1">
                    {(['km/h', 'm/s', 'mph'] as SpeedUnit[]).map(unit => (
                        <button
                            key={unit}
                            onClick={() => updateSettings({...settings, speedUnit: unit})}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${settings.speedUnit === unit ? 'bg-white shadow-sm text-black' : 'text-neutral-500'}`}
                        >
                            {unit}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs uppercase text-neutral-400 font-bold mb-2 block">{t.distance}</label>
                <div className="flex bg-neutral-100 rounded-xl p-1">
                    {(['m', 'ft'] as DistanceUnit[]).map(unit => (
                        <button
                            key={unit}
                            onClick={() => updateSettings({...settings, distanceUnit: unit})}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${settings.distanceUnit === unit ? 'bg-white shadow-sm text-black' : 'text-neutral-500'}`}
                        >
                            {unit}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
      
      {/* Mode */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs uppercase text-neutral-400 font-bold mb-2 block">{t.mode}</label>
          <div className="grid grid-cols-2 gap-2">
               {(['standard', 'beginner', 'fpv', 'night']).map((m: any) => (
                    <button
                        key={m}
                        onClick={() => updateSettings({...settings, mode: m})}
                        className={`py-3 px-4 rounded-xl text-sm font-bold capitalize border-2 transition-all ${settings.mode === m ? 'border-black bg-black text-white' : 'border-neutral-100 bg-neutral-50 text-neutral-600'}`}
                    >
                        {m}
                    </button>
               ))}
          </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
