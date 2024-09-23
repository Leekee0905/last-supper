import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_MONEYFUL_API_KEY
});

export const jsonApi = axios.create({
  baseURL: import.meta.env.VITE_GLICH_API_KEY
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
  (response) => {
    const totalDatas = response.headers['x-total-count'];
    return { ...response, totalDatas };
  },
  (error) => {
    console.error('response error', error);
    alert(error.message);
    throw new Error(error.code);
  }
);
