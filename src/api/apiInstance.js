import axios from 'axios';

export const authApi = async () => {
  const response = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr'
  });
};
