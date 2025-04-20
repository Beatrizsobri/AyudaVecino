import { District } from "./district";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    district?: District;
    points: number;
    bio?: string;
    skills?: string[];
    date_joined: string;
    profile_picture?: string;
    profile_image?: string;
  }