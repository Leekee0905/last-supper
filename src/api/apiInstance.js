import axios from 'axios';

// url env로 변경
export const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});
// url env로 변경
export const jsonApi = axios.create({
  baseURL: 'https://temporal-unequaled-tithonia.glitch.me'
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
