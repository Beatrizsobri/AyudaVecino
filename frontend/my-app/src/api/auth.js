import apiClient from './apiClient';
import Cookies from 'js-cookie';

export const login = async (username, password) => {
    try {
      const response = await apiClient.post('/auth/token/login/', {
        username,
        password,
      });
      const token = response.data.auth_token;
      Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error);
      throw error;
    }
};
  
export const registerUser = async (userData) => {
    try {
      const response = await apiClient.post('/auth/users/', userData);
      return response.data;
    } catch (error) {
      console.error('Error registrando usuario:', error.response?.data || error);
      throw error;
    }
};

export const isUserLoggedIn = () => {
  return !!Cookies.get('auth_token'); // Returns true if token exists, otherwise false
};

export const logout = () => {
  Cookies.remove('auth_token'); // Remove the token
  window.location.reload('/'); // Refresh the page or navigate to login
};
  

