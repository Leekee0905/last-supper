import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_MONEYFUL_API_KEY
});

// http:localhost:4000
// import.meta.env.VITE_GLICH_API_KEY
export const jsonApi = axios.create({
  baseURL: 'http://localhost:4000'
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
