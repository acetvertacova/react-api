import api from '../api';

export const getMenu = async () => {
  const response = await api.get('/menu');
  return response.data;
};

export const getMenuItemById = async (id) => {
  const response = await api.get(`/menu/${id}`);
  return response.data;
};

export const createMenuItem = async (menuItem) => {
  const response = await api.post('/menu', menuItem);
  return response.data;
};

export const updateMenuItem = async (id, menuItem) => {
  const response = await api.put(`/menu/${id}`, menuItem);
  return response.data;
};

export const deleteMenuItem = async (id) => {
  await api.delete(`/menu/${id}`);
};
