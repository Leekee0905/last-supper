import { authApi } from './apiInstance';

export const register = async (userData) => {
  const response = await authApi.post(`/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await authApi.post('/login', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const token = JSON.parse(localStorage.getItem('userStorage'))?.state.user.accessToken;
  const response = await authApi.get('/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateProfile = async (formData) => {
  const token = JSON.parse(localStorage.getItem('userStorage'))?.state.user.accessToken;
  const response = await authApi.patch('/profile', formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
