/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, MapPin, BedDouble, Expand, HelpCircle } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  key?: string;
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (property: Property) => void;
}

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onViewDetails
}: PropertyCardProps) {
  // Format price in French style (e.g., 3 450 000 €)
  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  };

  return (
    <div 
      id={`property-card-${property.id}`} 
      className="group bg-white rounded-none overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div className="relative overflow-hidden aspect-video">
        {/* Main Photo */}
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Absolute Gradients and Badges */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/70 to-transparent" />
        
        <span className="absolute top-3 left-3 bg-[#0F172A]/95 backdrop-blur-sm text-white text-[9px] font-extrabold px-2.5 py-1 rounded-none uppercase tracking-widest border border-gold-prestige/30">
          {property.type}
        </span>

        {/* Energy efficiency badge if exists */}
        {property.energyClass && (
          <span className={`absolute top-3 right-12 text-[10px] font-bold px-2 py-0.5 rounded-none border text-slate-950 ${
            property.energyClass === 'A' || property.energyClass === 'B' 
              ? 'bg-emerald-400 border-emerald-500' 
              : 'bg-gold-prestige border-gold-prestige'
          }`}>
            DPE: {property.energyClass}
          </span>
        )}

        {/* Favorite Heart Toggle */}
        <button
          onClick={(e) => onToggleFavorite(property.id, e)}
          className="absolute top-3 right-3 p-1.5 rounded-none bg-slate-950/50 backdrop-blur-sm hover:bg-slate-950/80 border border-white/20 transition-all active:scale-90"
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? 'fill-gold-prestige text-gold-prestige scale-110' : 'text-white'}`} />
        </button>

        {property.featured && (
          <span className="absolute bottom-3 left-3 text-[9px] font-extrabold tracking-widest bg-gold-prestige text-slate-950 px-2 py-0.5 rounded-none uppercase border border-gold-prestige">
            PRESTIGE EXCLUSIF
          </span>
        )}
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start">
            <span className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-gold-prestige mr-1 shrink-0" />
              <span>{property.city}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold font-mono">
              Réf: {property.id.toUpperCase()}
            </span>
          </div>

          <h3 className="text-slate-950 font-extrabold text-base leading-snug group-hover:text-gold-prestige transition-colors line-clamp-1 uppercase tracking-tight">
            {property.title}
          </h3>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-light">
            {property.description}
          </p>
        </div>

        {/* Specs line */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-600 text-xs font-semibold">
          <div className="flex items-center space-x-1 justify-center sm:justify-start">
            <Expand className="w-3.5 h-3.5 text-gold-prestige" />
            <span className="font-light">{property.surface} m²</span>
          </div>
          <div className="flex items-center space-x-1 justify-center sm:justify-start border-x border-slate-100 px-1">
            <BedDouble className="w-3.5 h-3.5 text-gold-prestige" />
            <span className="font-light">{property.bedrooms > 0 ? `${property.bedrooms} ch` : 'Non spéc.'}</span>
          </div>
          <div className="flex items-center space-x-1 justify-center sm:justify-start pl-1">
            <span className="text-gold-prestige font-bold shrink-0 text-xs">B</span>
            <span className="font-light">{property.bathrooms > 0 ? `${property.bathrooms} sdb` : 'Non spéc.'}</span>
          </div>
        </div>

        {/* Bottom price and action */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <span className="block text-[8px] tracking-widest text-slate-400 uppercase font-extrabold">Prix de vente</span>
            <span className="text-base font-extrabold text-slate-900 tracking-tight font-mono">
              {formatPrice(property.price)}
            </span>
          </div>
          
          <button
            onClick={() => onViewDetails(property)}
            className="px-4 py-2 bg-slate-900 hover:bg-gold-prestige hover:text-slate-350 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all duration-300 shadow-sm cursor-pointer"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}
