import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const jsonApi = axios.create({
  baseURL: 'https://dull-merciful-curve.glitch.me'
});

jsonApi.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('config error', error);
    alert(error.message);
    throw new Error(error.code);
  }
);

jsonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('response error', error);
    alert(error.message);
    throw new Error(error.code);
  }
);
