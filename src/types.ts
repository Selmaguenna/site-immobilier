/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PropertyType = 'Appartement' | 'Villa' | 'Maison' | 'Terrain' | 'Bureau';

export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  city: string;
  address: string;
  surface: number; // in m²
  bedrooms: number;
  bathrooms: number;
  images: string[];
  features: string[];
  agent: Agent;
  featured: boolean;
  yearBuilt?: number;
  energyClass?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

export interface FilterState {
  keyword: string;
  city: string;
  type: PropertyType | 'Tous';
  minPrice: number | '';
  maxPrice: number | '';
  bedrooms: number | 'Tous';
  surfaceMin: number | '';
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
