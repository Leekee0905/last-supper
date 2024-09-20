import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const restaurantsApi = axios.create({
  baseURL: 'http://localhost:4000'
});

export const jsonApi = axios.create({
  baseURL: 'http://localhost:4000'
});

jsonApi.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(error);
    throw new Error(error.message);
  }
);

jsonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    throw new Error(error.message);
  }
);
