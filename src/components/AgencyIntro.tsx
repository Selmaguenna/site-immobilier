/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, ThumbsUp, Landmark } from 'lucide-react';

export default function AgencyIntro() {
  const commitments = [
    {
      icon: <Award className="w-5 h-5 text-gold-prestige" />,
      title: "Rigueur & Excellence",
      desc: "Chaque propriété fait l'objet d'une sélection approfondie et d'audits méticuleux pour garantir son prestige absolu."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-prestige" />,
      title: "Confidentialité Totale",
      desc: "Nous préservons l'exclusivité et la discrétion stricte de nos clients sous un protocole d'échange ultra-sécurisé."
    },
    {
      icon: <Landmark className="w-5 h-5 text-gold-prestige" />,
      title: "Conseil sur-mesure",
      desc: "Un accompagnement sur les plans architecturaux, fiscaux et patrimoniaux à l'aide d'experts qualifiés."
    },
    {
      icon: <ThumbsUp className="w-5 h-5 text-gold-prestige" />,
      title: "Satisfaction Garantie",
      desc: "98% de nos acheteurs recommandent notre accompagnement à leur réseau d'investisseurs internationaux."
    }
  ];

  const stats = [
    { value: "30+", label: "Années d'expertise" },
    { value: "1,2k+", label: "Biens d'exception vendus" },
    { value: "2.4B€", label: "Volume de transactions" },
    { value: "98.4%", label: "Taux de recommandation" }
  ];

  return (
    <section id="agency-intro-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout: Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text / Intro part */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#BCA033] bg-gold-prestige/10 px-3 py-1.5 border border-gold-prestige/20 uppercase rounded-none">
                Notre Philosophie
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 uppercase">
                L'excellence Immobilière par <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-prestige to-[#BCA033]">
                  Prestige Immobilier
                </span>
              </h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              Depuis trois décennies, nous redéfinissons les critères de l'immobilier haut de gamme en France. Que vous convoitiez un appartement prestigieux face à la Seine, une villa d'exception suspendue sur les hauteurs de Nice, ou un espace de bureau ultra-moderne pour sublimer la productivité de votre entreprise, nous saurons révéler le coup de cœur qui sommeille en chaque lieu.
            </p>
            
            <p className="border-l-2 border-gold-prestige pl-4 text-slate-500 leading-relaxed font-light text-xs sm:text-sm italic">
              « Notre passion est de connecter des architectures singulières à des esprits exigeants qui y dessineront l'histoire de leur vie. »
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image element */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gold-prestige/30 opacity-80 blur-sm" />
            <div className="relative rounded-none overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                alt="Prestige Immobilier Corporate Lounge"
                className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-4 text-white border-t-2 border-gold-prestige">
                <p className="text-[10px] font-bold text-gold-prestige tracking-widest uppercase">Siège Parisien</p>
                <p className="text-[11px] text-slate-300">74 Boulevard Haussmann, Paris 9e</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-200">
          {commitments.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-none border-t-4 border-t-gold-prestige border-x border-b border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col text-left justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 bg-slate-100 rounded-none inline-block">
                    {item.icon}
                  </span>
                  <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
