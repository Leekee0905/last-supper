import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

//https://dull-merciful-curve.glitch.me
export const jsonApi = axios.create({
  baseURL: 'http://localhost:4001'
});

jsonApi.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(error);
    alert(error.message);
    throw new Error(error.code);
  }
);

jsonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    alert(error.message);
    throw new Error(error.code);
  }
);
