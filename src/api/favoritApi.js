import { apiClient } from './ApiClient';

const API_KEY = '00000000-0000-0000-0000-000000000001';

export const fetchManufacturers = async (article, signal) => {
  const data = await apiClient.get('/', {
    params: {
      key: API_KEY,
      number: article,
    },
    signal,
  });

  if (data && data.goods && Array.isArray(data.goods)) {
    const validGoods = data.goods.filter((g) => g.brand && g.number);
    return [...new Set(validGoods.map((item) => item.brand))];
  }
  return [];
};

export const fetchAnalogs = async (article, brand, signal) => {
  const data = await apiClient.get('/', {
    params: {
      key: API_KEY,
      number: article,
      brand: brand,
      analogues: 'on',
      info: 'on',
    },
    signal,
  });

  if (data && data.goods && Array.isArray(data.goods)) {
    let allAnalogs = [];
    data.goods.forEach((item) => {
      if (item.number) allAnalogs.push(item);
      if (item.analogues && Array.isArray(item.analogues)) {
        allAnalogs = [...allAnalogs, ...item.analogues];
      }
    });
    const uniqueAnalogs = Array.from(
      new Map(allAnalogs.map((item) => [item.goodsID, item])).values(),
    );
    return uniqueAnalogs.filter((item) => item.count > 0);
  }
  return [];
};
