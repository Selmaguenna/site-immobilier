/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, Heart, Menu, X, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'properties' | 'gallery' | 'contact';
  setActiveTab: (tab: 'home' | 'properties' | 'gallery' | 'contact') => void;
  favoritesCount: number;
  onShowFavorites: () => void;
  showingFavoritesOnly: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  favoritesCount,
  onShowFavorites,
  showingFavoritesOnly
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'properties', label: 'Nos Biens' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  const handleNavClick = (tabId: 'home' | 'properties' | 'gallery' | 'contact') => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-slate-900 text-white border-b-4 border-gold-prestige shadow-md">
      {/* Top bar with quick contact info */}
      <div className="hidden sm:flex justify-between items-center px-6 py-2 bg-slate-950 text-xs text-slate-400 border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Phone className="w-3.5 h-3.5 text-gold-prestige" />
            <span>+33 (0)1 47 20 00 01</span>
          </span>
          <span className="flex items-center space-x-1">
            <Mail className="w-3.5 h-3.5 text-gold-prestige" />
            <span>contact@agence-prestige.fr</span>
          </span>
        </div>
        <div className="tracking-widest text-gold-prestige font-bold text-[10px] uppercase">
          L'EXCELLENCE IMMOBILIÈRE DEPUIS 1995
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            id="header-logo" 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-gold-prestige p-2.5 rounded-sm shadow-inner rotate-45 transform">
              <Building2 className="w-5 h-5 text-slate-900 -rotate-45" />
            </div>
            <div className="pl-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gold-prestige via-white to-white bg-clip-text text-transparent uppercase">
                PRESTIGE
              </span>
              <span className="block text-[10px] tracking-widest text-gold-prestige uppercase font-bold">
                IMMOBILIER
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${
                  activeTab === item.id && !showingFavoritesOnly
                    ? 'text-gold-prestige'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.id && !showingFavoritesOnly && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-prestige rounded-full" />
                )}
              </button>
            ))}

            {/* Favorite button */}
            <button
              id="fav-btn"
              onClick={() => {
                onShowFavorites();
                setIsOpen(false);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                showingFavoritesOnly
                  ? 'bg-gold-prestige text-slate-950 border-gold-prestige shadow-md'
                  : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-gold-prestige/50 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 transition-transform duration-300 ${showingFavoritesOnly ? 'fill-slate-950 scale-110 text-slate-950' : 'text-gold-prestige'}`} />
              <span>Favoris</span>
              {favoritesCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-slate-950 bg-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile hamburger menu and favorite link */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Quick Fav Icon */}
            <button
              id="mobile-fav-banner"
              onClick={onShowFavorites}
              className="relative p-2 text-slate-300 hover:text-gold-prestige"
            >
              <Heart className={`w-6 h-6 ${showingFavoritesOnly ? 'fill-gold-prestige text-gold-prestige' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-prestige text-[10px] font-bold text-slate-950">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-fadeIn px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === item.id && !showingFavoritesOnly
                  ? 'bg-gold-prestige/10 text-gold-prestige border-l-4 border-gold-prestige pl-3'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onShowFavorites();
              setIsOpen(false);
            }}
            className={`flex items-center justify-between w-full px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
              showingFavoritesOnly
                ? 'bg-gold-prestige text-slate-950'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 fill-current" />
              <span>Voir mes Favoris</span>
            </div>
            {favoritesCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${showingFavoritesOnly ? 'bg-slate-950 text-gold-prestige' : 'bg-gold-prestige text-slate-950'}`}>
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
