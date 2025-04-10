import apiClient from './apiClient';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/me/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};
