import { User } from '../types/favor';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const getUserProfile = async (): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/profile/`);
  return response.data;
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/profile/`, userData);
  return response.data;
}; 