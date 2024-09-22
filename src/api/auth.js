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
  try {
    const response = await authApi.get('/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

//try catch
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
