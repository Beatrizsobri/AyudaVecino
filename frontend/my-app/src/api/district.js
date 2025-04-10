import apiClient from './apiClient';

export const getDistricts = async () => {
  try {
    const response = await apiClient.get('/districts/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los distritos:', error);
    throw error;
  }
};

export const getDistrict = async (id) => {
  try {
    const response = await apiClient.get(`/districts/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el distrito:', error);
    throw error;
  }
};

export const createDistrict = async (districtData) => {
  try {
    const response = await apiClient.post('/districts/', districtData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el distrito:', error);
    throw error;
  }
};

export const updateDistrict = async (id, districtData) => {
  try {
    const response = await apiClient.put(`/districts/${id}/`, districtData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el distrito:', error);
    throw error;
  }
};

export const deleteDistrict = async (id) => {
  try {
    const response = await apiClient.delete(`/districts/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el distrito:', error);
    throw error;
  }
};