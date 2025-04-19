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
  status: string;
  img?: string;
} 