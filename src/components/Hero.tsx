/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, MapPin, Building, Key } from 'lucide-react';
import { PropertyType } from '../types';

interface HeroProps {
  onSearch: (keyword: string, type: PropertyType | 'Tous', city: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState<PropertyType | 'Tous'>('Tous');
  const [city, setCity] = useState('Tous');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, type, city);
  };

  const popularCities = ['Paris', 'Nice', 'Bordeaux', 'Lyon'];
  const propertyTypes: (PropertyType | 'Tous')[] = ['Tous', 'Appartement', 'Villa', 'Maison', 'Terrain', 'Bureau'];

  return (
    <section id="hero-section" className="relative h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image of beautiful premium villa */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Mansion Exterior"
          className="w-full h-full object-cover transform scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-8">
        <span className="inline-block px-4 py-1.5 rounded-none text-[10px] font-extrabold tracking-[0.2em] text-gold-prestige bg-gold-prestige/10 border border-gold-prestige/30 uppercase mb-5">
          PLONGEZ DANS L'IMMOBILIER D'EXCEPTION
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-6 uppercase">
          Trouvez la Demeure <br />
          <span className="bg-gradient-to-r from-gold-prestige via-[#F4EAD4] to-white bg-clip-text text-transparent">
            de vos Rêves
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-10 leading-relaxed font-light tracking-wide">
          Notre équipe d'experts sélectionne rigoureusement des propriétés haut de gamme, des lofts parisiens épurés aux domaines méditerranéens somptueux.
        </p>

        {/* Quick Search Bar */}
        <div id="quick-search-container" className="bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-none border-t-2 border-gold-prestige shadow-2xl max-w-4xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Key Word Field */}
            <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-none px-3 py-2.5 text-left">
              <Key className="w-4 h-4 text-gold-prestige shrink-0 mr-2.5" />
              <div className="w-full">
                <label className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Par mot-clé</label>
                <input
                  type="text"
                  placeholder="ex: Vue Mer, Contemporaine..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full placeholder-slate-500 mt-0.5"
                />
              </div>
            </div>

            {/* Type Selection */}
            <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-none px-3 py-2.5 text-left">
              <Building className="w-4 h-4 text-gold-prestige shrink-0 mr-2.5" />
              <div className="w-full">
                <label className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Type de bien</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType | 'Tous')}
                  className="bg-transparent text-xs text-white focus:outline-none w-full mt-0.5 font-medium cursor-pointer"
                >
                  {propertyTypes.map((t) => (
                    <option key={t} value={t} className="bg-slate-950 text-white text-xs">
                      {t === 'Tous' ? 'Tous types' : t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Selection */}
            <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-none px-3 py-2.5 text-left">
              <MapPin className="w-4 h-4 text-gold-prestige shrink-0 mr-2.5" />
              <div className="w-full">
                <label className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">Ville</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full mt-0.5 font-medium cursor-pointer"
                >
                  <option value="Tous" className="bg-slate-950 text-white text-xs">Toutes localisations</option>
                  {popularCities.map((c) => (
                    <option key={c} value={c} className="bg-slate-950 text-white text-xs">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="hero-submit-search"
              className="w-full bg-gold-prestige hover:bg-gold-prestige-hover text-slate-950 font-bold uppercase tracking-widest text-xs rounded-none flex items-center justify-center space-x-2 py-3.5 transition-all duration-300 shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Rechercher</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
