import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const jsonApi = axios.create({
  baseURL: 'https://temporal-unequaled-tithonia.glitch.me'
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
