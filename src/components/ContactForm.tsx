/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { ContactFormInput, Property } from '../types';

interface ContactFormProps {
  preFilledProperty?: Property | null;
  onClearPreFilled?: () => void;
}

export default function ContactForm({ preFilledProperty, onClearPreFilled }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-set the subject if a direct property is passed down for inquiry
  useEffect(() => {
    if (preFilledProperty) {
      setFormData((prev) => ({
        ...prev,
        subject: `Demande d'informations : ${preFilledProperty.title} (Réf : ${preFilledProperty.id.toUpperCase()})`,
        message: `Bonjour, je suis vivement intéressé par le bien "${preFilledProperty.title}" (Réf : ${preFilledProperty.id.toUpperCase()}) situé à ${preFilledProperty.city} au prix de ${preFilledProperty.price.toLocaleString('fr-FR')} €. Je souhaite planifier une visite ou recevoir des documents complémentaires. Cordialement.`
      }));
    }
  }, [preFilledProperty]);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormInput> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est obligatoire.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Le nom doit comporter au moins 3 caractères.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est obligatoire.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Le format de l'adresse email n'est pas valide.";
    }

    // Clean phone number spacing can optional but must match basic pattern if supplied
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Le numéro de téléphone n'est pas ou est mal formaté (ex: 0612345678).";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet de votre demande est obligatoire.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message ne peut pas être vide.";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Votre message est trop court (minimum 15 caractères).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Live clear error on typing
    if (errors[name as keyof ContactFormInput]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form variables
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      if (onClearPreFilled) {
        onClearPreFilled();
      }
    }, 1500);
  };

  return (
    <section id="contact-component" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[10px] font-extrabold tracking-widest text-[#BCA033] bg-gold-prestige/10 px-3.5 py-1.5 border border-gold-prestige/20 uppercase rounded-none">
          Contactez-nous
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 uppercase">
          Une Question ? Un Projet de Vie ?
        </h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed font-light">
          Nos conseillers experts sont disponibles 6j/7 pour vous renseigner et vous accompagner dans votre investissement immobilier ou locatif de prestige.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Info Column (Left 4 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-none shadow-xl border-t-4 border-gold-prestige text-left space-y-8">
          
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold tracking-tight text-white mb-1 uppercase">Prestige Immobilier</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Notre équipe d'agents d'exception vous guide à chaque étape clé. Prenez rendez-vous en agence pour un entretien confidentiel.
            </p>
          </div>

          <div className="space-y-5">
            {/* Map point */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-slate-800 rounded-none text-gold-prestige border border-slate-700 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">Notre Adresse Unique</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  74 Boulevard Haussmann,<br />75009 Paris, France
                </p>
              </div>
            </div>

            {/* Direct Line */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-slate-800 rounded-none text-gold-prestige border border-slate-700 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">Ligne Directe</h4>
                <p className="text-slate-400 text-xs mt-1">+33 (0)1 47 20 00 01</p>
              </div>
            </div>

            {/* Email point */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-slate-800 rounded-none text-gold-prestige border border-slate-700 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">E-mail Officiel</h4>
                <p className="text-slate-400 text-xs mt-1">contact@agence-prestige.fr</p>
              </div>
            </div>

            {/* Work hours */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-slate-800 rounded-none text-gold-prestige border border-slate-700 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">Horaires d'ouverture</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Lundi au Vendredi : 9h00 - 19h30 <br />
                  Samedi : 10h00 - 17h00 (Sur rdv)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center sm:text-left">
            <span className="inline-block text-[10px] tracking-widest text-gold-prestige font-bold uppercase">
              ★ Conseillers Privés Francophones & Internationaux
            </span>
          </div>
        </div>

        {/* Inputs Form Column (Right 7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-none border border-slate-200 shadow-sm text-left relative">
          
          {submitted ? (
            <div className="py-12 px-4 text-center space-y-4 animate-scaleUp">
              <div className="mx-auto bg-gold-prestige/10 text-gold-prestige w-16 h-16 rounded-none flex items-center justify-center border border-gold-prestige/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">Merci pour votre message !</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                Votre demande a bien été enregistrée et transmise à nos équipes de gestion. Un conseiller expert spécialisé vous recontactera sous 4 heures ouvrées.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-none text-xs font-bold uppercase tracking-widest hover:bg-gold-prestige hover:text-slate-950 transition-colors cursor-pointer"
              >
                Envoyer un nouveau message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {preFilledProperty && (
                <div className="bg-gold-prestige/10 border border-gold-prestige/30 p-3.5 rounded-none text-xs text-slate-900 flex justify-between items-center">
                  <div>
                    Vous contactez l'agence concernant le bien : <strong className="font-bold">{preFilledProperty.title}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={onClearPreFilled}
                    className="text-[#BCA033] hover:text-gold-prestige font-extrabold uppercase text-[10px] tracking-wider ml-2"
                  >
                    Effacer
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label id="lbl-fullname" className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="ex: Jean Dupont"
                    className={`w-full bg-slate-50 border rounded-none px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:bg-white text-slate-900 ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-gold-prestige'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email input */}
                <div className="space-y-1.5">
                  <label id="lbl-email" className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Adresse E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ex: jean.dupont@gmail.com"
                    className={`w-full bg-slate-50 border rounded-none px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:bg-white text-slate-900 ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-gold-prestige'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone input */}
                <div className="space-y-1.5">
                  <label id="lbl-phone" className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Téléphone (Optionnel)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="ex: 06 12 34 56 78"
                    className={`w-full bg-slate-50 border rounded-none px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:bg-white text-slate-900 ${
                      errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-gold-prestige'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label id="lbl-subject" className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Sujet de la demande *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="ex: Projet d'achat villa à Nice"
                    className={`w-full bg-slate-50 border rounded-none px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:bg-white text-slate-900 ${
                      errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-gold-prestige'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-600 flex items-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message content */}
              <div className="space-y-1.5">
                <label id="lbl-message" className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                  Votre Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre projet immobilier avec précision (type de bien recherché, budget maximal, localisation de prédilection...)..."
                  className={`w-full bg-slate-50 border rounded-none px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:bg-white text-slate-900 ${
                    errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 focus:ring-gold-prestige'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 flex items-center mt-1">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit panel */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-gold-prestige text-white hover:text-slate-950 font-bold py-3.5 rounded-none flex items-center justify-center space-x-2.5 transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer uppercase tracking-widest border-b-2 border-gold-prestige"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-950 inline" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-xs">Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-gold-prestige" />
                    <span className="text-xs">Envoyer ma Demande confidentielle</span>
                  </>
                )}
              </button>

              <p className="text-[9px] text-slate-400 text-center leading-relaxed">
                En soumettant ce formulaire, vous acceptez que l'Agence Prestige Immobilier stocke et traite vos données personnelles aux fins d'instruction de votre demande conformément à notre charte RGPD.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
