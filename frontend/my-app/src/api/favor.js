import apiClient from './apiClient';

export const getFavors = async (filters = {}, page = 1, pageSize = 6) => {
  try {
    // Construimos la URL base
    let url = '/favors/';
    
    // Creamos un array para los parámetros
    const params = [];
    
    // Añadimos cada filtro si existe
    if (filters.status) params.push(`status=${filters.status}`);
    if (filters.type) params.push(`type=${filters.type}`);
    if (filters.start_date) params.push(`start_date=${filters.start_date}`);
    if (filters.end_date) params.push(`end_date=${filters.end_date}`);
    if (filters.district_id) params.push(`district_id=${filters.district_id}`);
    
    // Añadimos paginación
    params.push(`page=${page}`);
    params.push(`page_size=${pageSize}`);
    
    // Si hay parámetros, los añadimos a la URL
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    
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
    // Crear el favor
    await apiClient.post('/favors/', favorData);
    // Obtener la lista actualizada de favores
    const updatedFavors = await getFavors();
    return updatedFavors;
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