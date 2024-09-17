import { restaurantsApi } from './apiInstance';

export const saveRestaurants = async (restaurantsData) => {
  const response = await restaurantsApi.post('/restaurants', restaurantsData);
  return response.data;
};

export const getRestaurants = async (camp) => {
  try {
    const response = await restaurantsApi.get('http://localhost:3000/restaurants');

    // 서버에서 전체 데이터를 가져온 후 해당 키 값 필터링
    const data = response.data[camp];

    if (data) {
      console.log(`음식점 목록 (${camp}):`, data);
      return data;
    } else {
      console.log(`${camp}에 해당하는 데이터가 없습니다.`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
