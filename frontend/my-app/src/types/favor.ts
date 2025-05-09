import { District } from "./district";
import { User } from "./user";

export interface Favor {
  id: number;
  title: string;
  deadline: string;
  description: string;
  type: string;
  points: number;
  creator: User;
  district: District;
  publication_date: string;
  status: 'PENDING' | 'ACCEPTED' | 'CANCELLED';
  img?: string;
  assigned_user?: User | null;
}

export interface FavorResponse {
  results: Favor[];
  count: number;
}

export type FavorStatus = 'PENDING' | 'ACCEPTED' | 'CANCELLED' | 'ALL';

export interface FavorFilters {
  status?: FavorStatus;
  type?: string;
  start_date?: string;
  end_date?: string;
  district_id?: number;
}

export const TYPE_CHOICES: Record<string, string> = {
  'HOME': 'Hogar',
  'TRANSPORT': 'Transporte', 
  'PETS': 'Mascotas',
  'TECH': 'Tecnología',
  'CLASS': 'Clases',
  'COOKING': 'Cocina',
  'PLUMBING': 'Fontanería',
  'CARPENTRY': 'Carpintería',
  'ERRANDS': 'Recados',
  'SHOPPING': 'Compra',
};