/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  Heart, 
  Image as ImageIcon,
  Check, 
  ArrowRight,
  Info 
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AgencyIntro from './components/AgencyIntro';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import ContactForm from './components/ContactForm';
import Lightbox from './components/Lightbox';

import { PROPERTIES } from './data/properties';
import { Property, PropertyType, FilterState } from './types';

export default function App() {
  // Navigation / View states
  const [activeTab, setActiveTab] = useState<'home' | 'properties' | 'gallery' | 'contact'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Favorites persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('prestige_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Show only favorites filter flag
  const [showingFavoritesOnly, setShowingFavoritesOnly] = useState(false);

  // Property filter form states
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    city: 'Tous',
    type: 'Tous',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Tous',
    surfaceMin: ''
  });

  // Contact form pre-fill property tracker
  const [preFilledContactProperty, setPreFilledContactProperty] = useState<Property | null>(null);

  // Lightbox modal tracker
  const [lightboxState, setLightboxState] = useState<{
    images: string[];
    currentIndex: number;
    isOpen: boolean;
    title: string;
  }>({
    images: [],
    currentIndex: 0,
    isOpen: false,
    title: ''
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('prestige_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle addition/removal from favorites
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Trigger quick search from our homepage Hero banner
  const handleHeroSearch = (keyword: string, type: PropertyType | 'Tous', city: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword,
      type,
      city: city === 'Tous' ? 'Tous' : city
    }));
    setShowingFavoritesOnly(false);
    setSelectedProperty(null);
    setCurrentPage(1);
    setActiveTab('properties');
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      city: 'Tous',
      type: 'Tous',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'Tous',
      surfaceMin: ''
    });
    setShowingFavoritesOnly(false);
    setCurrentPage(1);
  };

  // Instant calculation of filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // 1. Favorites-only filter check
      if (showingFavoritesOnly && !favorites.includes(prop.id)) {
        return false;
      }

      // 2. Keyword check
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase().trim();
        const inTitle = prop.title.toLowerCase().includes(query);
        const inDesc = prop.description.toLowerCase().includes(query);
        const inAddress = prop.address.toLowerCase().includes(query);
        const inFeatures = prop.features.some((f) => f.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inAddress && !inFeatures) {
          return false;
        }
      }

      // 3. City check
      if (filters.city !== 'Tous' && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // 4. Property Type check
      if (filters.type !== 'Tous' && prop.type !== filters.type) {
        return false;
      }

      // 5. Min Price
      if (filters.minPrice !== '' && prop.price < Number(filters.minPrice)) {
        return false;
      }

      // 6. Max Price
      if (filters.maxPrice !== '' && prop.price > Number(filters.maxPrice)) {
        return false;
      }

      // 7. Bedrooms
      if (filters.bedrooms !== 'Tous' && prop.bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      // 8. Surface area Min
      if (filters.surfaceMin !== '' && prop.surface < Number(filters.surfaceMin)) {
        return false;
      }

      return true;
    });
  }, [filters, favorites, showingFavoritesOnly]);

  // Adjust pagination when filters or tab switches change length
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, showingFavoritesOnly]);

  // Calculate paginated properties list
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Transition helper from Detail view or Card click straight to the contact page
  const handleContactAgent = (property: Property) => {
    setPreFilledContactProperty(property);
    setShowingFavoritesOnly(false);
    setSelectedProperty(null);
    setActiveTab('contact');
    
    // Smooth scroll down to form
    setTimeout(() => {
      const el = document.getElementById('contact-component');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShowFavoritesOnly = () => {
    setShowingFavoritesOnly(true);
    setSelectedProperty(null);
    setActiveTab('properties');
  };

  // Lightbox handlers
  const handleOpenLightbox = (images: string[], index: number, title: string) => {
    setLightboxState({
      images,
      currentIndex: index,
      isOpen: true,
      title
    });
  };

  const handleLightboxPrev = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  const handleLightboxNext = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  // Gather unique cities for filters lists
  const availableCities = useMemo(() => {
    const citiesSet = new Set(PROPERTIES.map((p) => p.city));
    return Array.from(citiesSet);
  }, []);

  // Filter gallery items selector state
  const [galleryFilter, setGalleryFilter] = useState<PropertyType | 'Tous'>('Tous');
  
  // Flatten all images of selected type for Grid Gallery
  const galleryImages = useMemo(() => {
    const list: { src: string; title: string; type: PropertyType; propRef: Property }[] = [];
    PROPERTIES.forEach((prop) => {
      if (galleryFilter === 'Tous' || prop.type === galleryFilter) {
        prop.images.forEach((img) => {
          list.push({
            src: img,
            title: prop.title,
            type: prop.type,
            propRef: prop
          });
        });
      }
    });
    return list;
  }, [galleryFilter]);

  // Handle selecting sub-images inside gallery to open Lightbox
  const handleGalleryImageClick = (itemIndex: number) => {
    const imagesList = galleryImages.map((g) => g.src);
    const item = galleryImages[itemIndex];
    handleOpenLightbox(imagesList, itemIndex, `${item.title} (${item.type})`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-gold-prestige selection:text-slate-950">
      
      {/* Upper premium Header bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setShowingFavoritesOnly(false);
          setSelectedProperty(null);
        }}
        favoritesCount={favorites.length}
        onShowFavorites={handleShowFavoritesOnly}
        showingFavoritesOnly={showingFavoritesOnly}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Render property details if a property is selected */}
        {selectedProperty ? (
          <PropertyDetails
            property={selectedProperty}
            onBackToList={() => {
              setSelectedProperty(null);
              // Go to listings if not already there
              if (activeTab !== 'properties') {
                setActiveTab('properties');
              }
            }}
            onContactAgent={handleContactAgent}
            isFavorite={favorites.includes(selectedProperty.id)}
            onToggleFavorite={handleToggleFavorite}
            onOpenLightbox={handleOpenLightbox}
          />
        ) : (
          <>
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-0 animate-fadeIn">
                {/* Immersive Search Banner */}
                <Hero onSearch={handleHeroSearch} />
                
                {/* Agency Quick Presentation Section */}
                <AgencyIntro />

                {/* Featured / Recent Properties block */}
                <section id="featured-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[10px] font-extrabold tracking-widest text-[#BCA033] bg-gold-prestige/10 px-3.5 py-1.5 border border-gold-prestige/25 uppercase rounded-none">
                      Collections d'Exceptions
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-5 uppercase">
                      Nos Dernières Mises en Vente
                    </h2>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed font-light">
                      L'excellence façonnée par l'architecture. Découvrez une sélection triée sur le volet de nos plus prestigieux biens disponibles.
                    </p>
                  </div>

                  {/* Properties grid (Filter on featured property subset) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROPERTIES.filter(p => p.featured).slice(0, 3).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={(prop) => {
                          setSelectedProperty(prop);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>

                  {/* Redirection button */}
                  <div className="text-center mt-12">
                    <button
                      onClick={() => {
                        setActiveTab('properties');
                        setShowingFavoritesOnly(false);
                      }}
                      className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-slate-900 font-bold text-white rounded-none text-xs uppercase tracking-widest hover:bg-gold-prestige hover:text-slate-950 transition-all shadow-md cursor-pointer group border-b-2 border-gold-prestige"
                    >
                      <span>Consulter tout notre catalogue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-prestige" />
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* 2. PROPERTIES LISTING & FILTERS TAB */}
            {activeTab === 'properties' && (
              <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
                
                {/* Section title (either browse or favorites list) */}
                <div className="text-left mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                    {showingFavoritesOnly ? 'Mes Biens Favoris' : 'Catalogue Immobilier Prestige'}
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    {showingFavoritesOnly
                      ? `Retrouvez les ${filteredProperties.length} biens d'exception qui ont retenu votre attention.`
                      : 'Utilisez les filtres interactifs ci-dessous pour affiner instantanément votre recherche.'
                    }
                  </p>
                </div>

                {/* Filters Board */}
                <div id="filters-board" className="bg-white rounded-none border border-slate-200 shadow-sm p-6 mb-8 text-left space-y-5">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold uppercase tracking-wide">
                    <SlidersHorizontal className="w-4 h-4 text-gold-prestige" />
                    <span className="text-xs">Filtres de recherche avancée</span>
                  </div>

                  {/* Core Filters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Keyword selection */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Mot-clé</label>
                      <input
                        type="text"
                        placeholder="ex: Vue Mer, Contemporain..."
                        value={filters.keyword}
                        onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    {/* Property type */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Type de bien</label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as PropertyType | 'Tous' }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none"
                      >
                        <option value="Tous">Tous types</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Villa">Villa</option>
                        <option value="Maison">Maison</option>
                        <option value="Terrain">Terrain</option>
                        <option value="Bureau">Bureau</option>
                      </select>
                    </div>

                    {/* City selection */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Ville</label>
                      <select
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none"
                      >
                        <option value="Tous">Toutes les villes</option>
                        {availableCities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Bedroom count selection */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Chambres minimum</label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value === 'Tous' ? 'Tous' : Number(e.target.value) }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none"
                      >
                        <option value="Tous">Tous les nombres</option>
                        <option value="2">2 chambres ou plus</option>
                        <option value="3">3 chambres ou plus</option>
                        <option value="4">4 chambres ou plus</option>
                        <option value="5">5 chambres ou plus</option>
                      </select>
                    </div>

                    {/* Min price choice */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Prix minimum (€)</label>
                      <input
                        type="number"
                        placeholder="ex: 500000"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value !== '' ? Number(e.target.value) : '' }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none font-mono"
                      />
                    </div>

                    {/* Max price selection */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Prix maximum (€)</label>
                      <input
                        type="number"
                        placeholder="ex: 3000000"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value !== '' ? Number(e.target.value) : '' }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none font-mono"
                      />
                    </div>

                    {/* Min surface area */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Surface min (m²)</label>
                      <input
                        type="number"
                        placeholder="ex: 100"
                        value={filters.surfaceMin}
                        onChange={(e) => setFilters(prev => ({ ...prev, surfaceMin: e.target.value !== '' ? Number(e.target.value) : '' }))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-none px-3 py-2.5 focus:border-gold-prestige focus:bg-white text-slate-900 outline-none font-mono"
                      />
                    </div>

                    {/* Reset Button container */}
                    <div className="flex items-end">
                      <button
                        onClick={handleResetFilters}
                        className="w-full py-2.5 bg-slate-150 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold rounded-none text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Réinitialiser les filtres</span>
                      </button>
                    </div>
                  </div>

                  {/* Results summary indicators */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-450 pt-3 border-t border-slate-100 font-semibold space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-gold-prestige rounded-none inline-block animate-ping" />
                      <span>{filteredProperties.length} biens trouvés correspondants à vos critères</span>
                    </div>

                    {showingFavoritesOnly && (
                      <button
                        onClick={() => setShowingFavoritesOnly(false)}
                        className="text-[#BCA033] hover:text-gold-prestige font-bold uppercase tracking-wider text-[10px] underline underline-offset-2"
                      >
                        Afficher tous les biens du catalogue
                      </button>
                    )}
                  </div>
                </div>

                {/* Properties Cards grid */}
                {filteredProperties.length === 0 ? (
                  <div className="py-20 bg-white border border-slate-200 rounded-none text-center max-w-xl mx-auto space-y-4">
                    <SlidersHorizontal className="w-8 h-8 text-gold-prestige mx-auto" />
                    <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Aucun bien ne correspond à vos filtres</h3>
                    <p className="text-slate-500 text-xs px-6 leading-relaxed max-w-sm mx-auto font-light">
                      Nous vous suggérons d'élargir vos fourchettes de prix ou d'enlever certains contraintes (ex: nombre de chambres).
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-gold-prestige hover:text-slate-950 font-bold rounded-none text-xs text-white transition-colors cursor-pointer uppercase tracking-wider border-b-2 border-gold-prestige"
                    >
                      Effacer tous les filtres
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {paginatedProperties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          property={property}
                          isFavorite={favorites.includes(property.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onViewDetails={(prop) => {
                            setSelectedProperty(prop);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      ))}
                    </div>

                    {/* Pagination indicators under cards */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-12 py-4 border-t border-slate-200/60 font-mono">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrentPage(idx + 1);
                              window.scrollTo({ top: 250, behavior: 'smooth' });
                            }}
                            className={`w-9 h-9 rounded-none text-xs font-bold transition-all ${
                              currentPage === idx + 1
                                ? 'bg-slate-900 text-white border border-slate-900 shadow-md'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

              </div>
            )}

            {/* 3. RESPONSIVE GRID GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn text-left">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-slate-200 pb-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Galerie Photo Exclusive</h1>
                    <p className="text-slate-500 text-sm mt-1">Explorez les ambiances intérieures et designs d'architecte de notre parc immobilier haut de gamme.</p>
                  </div>

                  {/* Filter items directly inside gallery */}
                  <div className="flex flex-wrap gap-2">
                    {['Tous', 'Villa', 'Appartement', 'Bureau', 'Terrain'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setGalleryFilter(type as PropertyType | 'Tous')}
                        className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider border transition-all ${
                          galleryFilter === type
                            ? 'bg-slate-950 border-gold-prestige text-gold-prestige shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {type === 'Tous' ? 'Tout voir' : `${type}s`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Elegant Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleGalleryImageClick(idx)}
                      className="group relative aspect-video sm:aspect-square md:aspect-[4/3] rounded-none overflow-hidden bg-slate-900 border border-slate-200 cursor-zoom-in shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={item.src}
                        alt={`${item.title} image`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Zoom Overlay on hover */}
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                        <ImageIcon className="w-5 h-5 text-gold-prestige absolute top-3 right-3" />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-prestige">
                            {item.type}
                          </span>
                          <h4 className="text-white text-xs font-bold tracking-tight mt-0.5 line-clamp-1 uppercase">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* 4. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="py-6 animate-fadeIn">
                <ContactForm 
                  preFilledProperty={preFilledContactProperty}
                  onClearPreFilled={() => setPreFilledContactProperty(null)}
                />
              </div>
            )}
          </>
        )}

      </main>

      {/* Shared Lightbox Overlay */}
      <Lightbox
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
        title={lightboxState.title}
      />

      {/* Corporate Professional Footer */}
      <Footer 
        onNavigate={(tabId) => {
          setSelectedProperty(null);
          setShowingFavoritesOnly(false);
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

    </div>
  );
}
