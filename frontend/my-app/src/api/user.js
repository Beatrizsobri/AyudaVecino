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

export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.patch('/users/me/', userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    throw error;
  }
};
