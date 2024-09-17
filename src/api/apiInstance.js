import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const jsonApi = axios.create({
  baseURL: 'http://localhost:4000'
});
