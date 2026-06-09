/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Grid, Calendar, Tag, ShieldAlert, Check, Phone, Mail, Heart, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onBackToList: () => void;
  onContactAgent: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenLightbox: (images: string[], index: number, title: string) => void;
}

export default function PropertyDetails({
  property,
  onBackToList,
  onContactAgent,
  isFavorite,
  onToggleFavorite,
  onOpenLightbox
}: PropertyDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatPrice = (val: number) => {
    return val.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  };

  return (
    <div id="property-detail-page" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return Navigation bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-slate-200 mb-8 space-y-4 sm:space-y-0 text-left">
        <button
          onClick={onBackToList}
          className="flex items-center space-x-2 text-slate-600 hover:text-gold-prestige transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gold-prestige" />
          <span>Retour à la liste des biens</span>
        </button>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={(e) => onToggleFavorite(property.id, e)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider border transition-all ${
              isFavorite
                ? 'bg-gold-prestige/10 border-gold-prestige text-slate-900'
                : 'border-slate-200 hover:bg-slate-50 text-slate-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-gold-prestige text-gold-prestige' : 'text-slate-400'}`} />
            <span>{isFavorite ? 'Dans mes favoris' : 'Ajouter aux favoris'}</span>
          </button>
          
          <button
            onClick={() => onContactAgent(property)}
            className="flex items-center space-x-2 px-5 py-2 bg-slate-900 hover:bg-gold-prestige hover:text-slate-950 text-white rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-prestige" />
            <span>Prendre contact</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8/12): Gallery & Descriptions */}
        <div className="lg:col-span-8 space-y-8 text-left">
          
          {/* Main Visual Carousel with interactive triggers */}
          <div className="space-y-3">
            <div 
              className="relative aspect-video rounded-none overflow-hidden shadow-md group cursor-zoom-in border border-slate-200"
              onClick={() => onOpenLightbox(property.images, activeImageIndex, property.title)}
            >
              <img
                src={property.images[activeImageIndex]}
                alt={`${property.title} - Large view`}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 bg-slate-900/95 px-4 py-2 rounded-none text-xs text-white flex items-center space-x-1.5 font-bold uppercase tracking-wider border border-gold-prestige/40">
                <Grid className="w-3.5 h-3.5 text-gold-prestige" />
                <span>Agrandir (Photo {activeImageIndex + 1}/{property.images.length})</span>
              </div>

              <span className="absolute top-4 left-4 bg-slate-900/95 text-white text-[9px] font-extrabold px-3 py-1.5 rounded-none uppercase tracking-widest border border-gold-prestige/30">
                {property.type}
              </span>
            </div>

            {/* Thumbnail strips */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-video rounded-none overflow-hidden bg-slate-100 border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-gold-prestige shadow-sm' 
                      : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${property.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Heading Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center text-[10px] font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-none uppercase tracking-wider border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-gold-prestige mr-1.5 shrink-0" />
                <span>{property.city}</span>
              </span>
              {property.yearBuilt && (
                <span className="flex items-center text-[10px] font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-none uppercase tracking-wider border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-gold-prestige mr-1.5 shrink-0" />
                  <span>Construit en {property.yearBuilt}</span>
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
              {property.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 px-6 bg-slate-900 text-white rounded-none border-b-4 border-gold-prestige shadow-md">
              <div>
                <span className="block text-[9px] uppercase text-gold-prestige font-extrabold tracking-widest">Valeur Estimée</span>
                <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                  {formatPrice(property.price)}
                </span>
              </div>
              <div className="mt-3 sm:mt-0 flex gap-6 text-xs divide-x divide-slate-705">
                <div className="text-center">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Surface</span>
                  <span className="font-extrabold text-white">{property.surface} m²</span>
                </div>
                <div className="pl-6 text-center">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Chambres</span>
                  <span className="font-extrabold text-white">{property.bedrooms > 0 ? `${property.bedrooms} ch` : 'Non spécifié'}</span>
                </div>
                <div className="pl-6 text-center">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Salles d'eau</span>
                  <span className="font-extrabold text-white">{property.bathrooms > 0 ? `${property.bathrooms} sdb` : 'Non spécifié'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80">
            <h3 className="text-md font-bold text-slate-900 uppercase tracking-wider">Description complète</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-light">
              {property.description}
            </p>
          </div>

          {/* Core Characteristics Checkbox grid */}
          <div className="space-y-4 pt-6 border-t border-slate-200/80">
            <h3 className="text-md font-bold text-slate-900 uppercase tracking-wider">Équipements & Prestations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-none border border-slate-200/50">
                  <div className="w-5 h-5 rounded-none bg-gold-prestige/10 flex items-center justify-center shrink-0 border border-gold-prestige/30">
                    <Check className="w-3 h-3 text-gold-prestige font-bold" />
                  </div>
                  <span className="text-xs text-slate-700 font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Localisation placeholder */}
          <div className="space-y-4 pt-6 border-t border-slate-200/80">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-slate-900 uppercase tracking-wider">Adresse & Localisation</h3>
              <span className="text-[10px] font-bold text-slate-500 font-mono">{property.address}</span>
            </div>
            
            {/* Visual vector map representation */}
            <div className="relative h-64 rounded-none overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
              
              <div className="relative text-center space-y-3 z-10 px-4">
                <div className="mx-auto w-10 h-10 bg-slate-900 text-gold-prestige flex items-center justify-center rounded-none shadow-md border-b-2 border-gold-prestige">
                  <MapPin className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{property.address}</p>
                  <p className="text-xs text-slate-500 mt-1">Quartier confidentiel hautement résidentiel • {property.city}</p>
                </div>
                <div className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-none text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Visualisation Cadastrale Agence Prestige
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4/12): Agent Sidebar Profile */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          
          {/* Agent Information Box */}
          <div className="bg-white border-t-4 border-t-gold-prestige border-x border-b border-slate-200 rounded-none p-6 shadow-sm text-center space-y-5">
            <span className="text-[9px] font-extrabold tracking-widest text-[#BCA033] bg-gold-prestige/10 px-3 py-1 rounded-none uppercase inline-block border border-gold-prestige/20">
              Conseiller Référent
            </span>

            <div className="space-y-3">
              {/* Avatar circle */}
              <div className="relative mx-auto w-24 h-24 rounded-none overflow-hidden border-2 border-gold-prestige shadow-inner">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div>
                <h4 className="text-slate-950 font-extrabold text-md uppercase tracking-tight">{property.agent.name}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{property.agent.role}</p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-left">
              <div className="flex items-center space-x-3 text-sm p-3 bg-slate-50 rounded-none border border-slate-100">
                <Phone className="w-4 h-4 text-gold-prestige shrink-0" />
                <span className="text-slate-600 font-mono text-xs">{property.agent.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm p-3 bg-slate-50 rounded-none border border-slate-100">
                <Mail className="w-4 h-4 text-gold-prestige shrink-0" />
                <span className="text-slate-600 font-mono text-xs break-all">{property.agent.email}</span>
              </div>
            </div>

            {/* Main CTA: Prepopulate Contact form and navigate instantly */}
            <button
              onClick={() => onContactAgent(property)}
              className="w-full py-3 bg-slate-900 hover:bg-gold-prestige text-white hover:text-slate-950 font-bold text-xs rounded-none transition-all shadow-sm cursor-pointer flex items-center justify-center space-x-2.5 uppercase tracking-widest border-b-2 border-gold-prestige"
            >
              <Mail className="w-4 h-4" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>

          {/* Quick Notice Info box */}
          <div className="bg-slate-900 text-white border-l-4 border-gold-prestige rounded-none p-5 text-left space-y-2.5">
            <h5 className="text-white font-extrabold text-xs tracking-wider flex items-center uppercase text-gold-prestige">
              <ShieldAlert className="w-4 h-4 mr-1.5 shrink-0 text-gold-prestige" />
              Assurance Sérénité Prestige
            </h5>
            <p className="text-slate-350 text-xs leading-relaxed font-light">
              Notre charte d'engagement garantit l'origine certifiée des fonds, l'authentification notariale préalable de toutes les pièces et un service clé en main d'emménagement d'urgence.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
