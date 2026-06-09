/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  title
}: LightboxProps) {
  
  // Close on Escape key, change on Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950/95 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Header Controls */}
      <div 
        className="w-full flex justify-between items-center px-6 py-4 text-white z-10 bg-gradient-to-b from-black/55 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left space-y-0.5">
          {title && <h4 className="font-extrabold text-sm sm:text-base text-gold-prestige tracking-wider line-clamp-1 uppercase">{title}</h4>}
          <p className="text-xs text-slate-400 font-mono">
            Photo {currentIndex + 1} / {images.length}
          </p>
        </div>
        
        <button 
          onClick={onClose}
          className="p-2.5 rounded-none bg-slate-900 border border-slate-800 text-white hover:text-gold-prestige hover:border-gold-prestige/50 transition-colors cursor-pointer"
          title="Fermer (Echap)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image content with Prev/Next triggers */}
      <div className="flex-1 w-full flex items-center justify-between px-2 sm:px-6 relative">
        
        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-none bg-slate-900/90 hover:bg-gold-prestige hover:text-slate-950 text-white border border-slate-800 hover:border-gold-prestige/35 transition-all duration-300 z-10 cursor-pointer shadow-lg active:scale-95"
          title="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* The Image Itself */}
        <div 
          className="mx-auto max-w-5xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={title || `Photo ${currentIndex + 1}`}
            className="rounded-none max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain shadow-2xl border-2 border-gold-prestige select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-none bg-slate-900/90 hover:bg-gold-prestige hover:text-slate-950 text-white border border-slate-800 hover:border-gold-prestige/35 transition-all duration-300 z-10 cursor-pointer shadow-lg active:scale-95"
          title="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Footer thumbnail strip or extra info */}
      <div 
        className="w-full text-center py-5 bg-gradient-to-t from-black/50 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11px] text-slate-500 font-medium">
          Utilisez les flèches du clavier ◄ / ► pour naviguer
        </span>
      </div>
    </div>
  );
}
