export interface District {
  id: number;
  name: string;
  postal_code: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  district?: {
    id: number;
    name: string;
  };
  points: number;
  bio?: string;
  skills?: string[];
  date_joined: string;
  profile_picture?: string;
  profile_image?: string;
}

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
  status: string;
  img?: string;
} 