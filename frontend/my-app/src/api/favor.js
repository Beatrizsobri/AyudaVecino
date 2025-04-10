import apiClient from './apiClient';

export const getFavors = async (status) => {
  try {
    const url = status ? `/favors/favors?status=${status}` : '/favors/favors';
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los favores:', error);
    throw error;
  }
};

export const getFavorById = async (id) => {
  try {
    const response = await apiClient.get(`/favors/detail/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el favor:', error);
    throw error;
  }
};

export const getFavorsByDistrict = async (districtId) => {
  try {
    const response = await apiClient.get(`/favors/district/${districtId}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los favores por distrito:', error);
    throw error;
  }
};

export const createFavor = async (favorData) => {
  try {
    const response = await apiClient.post('/favors/', favorData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el favor:', error);
    throw error;
  }
};

export const updateFavor = async (id, favorData) => {
  try {
    const response = await apiClient.put(`/favors/${id}/`, favorData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el favor:', error);
    throw error;
  }
};

export const deleteFavor = async (id) => {
  try {
    const response = await apiClient.delete(`/favors/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el favor:', error);
    throw error;
  }
};

export const acceptFavor = async (favorId) => {
  try {
    const response = await apiClient.post(`/favors/${favorId}/accept/`);
    return response.data;
  } catch (error) {
    console.error('Error al aceptar el favor:', error);
    throw error;
  }
};