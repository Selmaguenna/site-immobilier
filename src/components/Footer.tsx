/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Check, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: 'home' | 'properties' | 'gallery' | 'contact') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim() && emailSub.includes('@')) {
      setSubscribed(true);
      setEmailSub('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-350 border-t-4 border-gold-prestige pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-gold-prestige p-2.5 rounded-none rotate-45 transform">
                <Building2 className="w-4 h-4 text-slate-900 -rotate-45" />
              </div>
              <span className="text-sm font-extrabold tracking-widest text-white uppercase font-sans">
                PRESTIGE IMMOBILIER
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Votre partenaire d'excellence pour l'acquisition, la vente ou la location de résidences prestigieuses et de bureaux d'exception en France. Un accompagnement sur-mesure à chaque étape.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold text-xs tracking-widest uppercase mb-4 text-gold-prestige">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-gold-prestige transition-colors cursor-pointer text-left"
                >
                  Accueil & Agence
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('properties')} 
                  className="hover:text-gold-prestige transition-colors cursor-pointer text-left"
                >
                  Nos Biens Immobiliers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('gallery')} 
                  className="hover:text-gold-prestige transition-colors cursor-pointer text-left"
                >
                  Galerie Interactive
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-gold-prestige transition-colors cursor-pointer text-left"
                >
                  Nous Contacter
                </button>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="space-y-3.5">
            <h3 className="text-white font-extrabold text-xs tracking-widest uppercase mb-4 text-gold-prestige">
              Coordonnées
            </h3>
            <div className="flex items-start space-x-3 text-xs">
              <MapPin className="w-4 h-4 text-gold-prestige mt-0.5 shrink-0" />
              <span className="text-slate-400 leading-relaxed font-light">
                74 Boulevard Haussmann,<br />75009 Paris, France
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <Phone className="w-4 h-4 text-gold-prestige shrink-0" />
              <span className="text-slate-400 font-mono">+33 (0)1 47 20 00 01</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <Mail className="w-4 h-4 text-gold-prestige shrink-0" />
              <span className="text-slate-400 font-mono">contact@agence-prestige.fr</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-extrabold text-xs tracking-widest uppercase mb-4 text-gold-prestige">
              Newsletter
            </h3>
            <p className="text-xs text-slate-400 mb-3.5 leading-relaxed font-light">
              Souscrivez pour être informé en priorité de l'apparition de nos nouveaux biens exceptionnels.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none py-2.5 pl-3.5 pr-10 text-xs focus:ring-1 focus:ring-gold-prestige focus:border-gold-prestige outline-none text-white font-light"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bg-gold-prestige hover:bg-gold-prestige-hover text-slate-950 p-1.5 rounded-none transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 font-medium">
                S'abonner avec succès ! Merci.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Prestige Immobilier S.A.S. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-medium uppercase tracking-wider text-[10px]">
            <span className="hover:text-gold-prestige cursor-pointer">Mentions Légales</span>
            <span className="hover:text-gold-prestige cursor-pointer">Politique de Confidentialité</span>
            <span className="hover:text-gold-prestige cursor-pointer">CGU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
