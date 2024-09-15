import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});
