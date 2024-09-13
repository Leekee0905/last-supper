import { authApi } from './apiInstance';

export const register = async (userData) => {
  const response = await authApi.post(`/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await authApi.post('/login', userData);
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await authApi.get('/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem('accessToken');
  const response = await authApi.patch('/profile', formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
