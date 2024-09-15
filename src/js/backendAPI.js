import axios from 'axios';
import { toBackendDateString } from './utils';

export const axiosInstance = axios.create({
  baseURL: 'https://slim-mom-backend-etzm.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const token = {
  set(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete axiosInstance.defaults.headers.common.Authorization;
  },
};

export const getPublicData = async (values) => {
  try {
    const response = await axiosInstance.post('products', values);
    return response.data.data;
  } catch (error) {
    console.error('Failed to get public data:', error);
  }
};

export const getDiaryByDate = async (date) => {
  const dateForBackend = toBackendDateString(date);
  try {
    const response = await axiosInstance.get(`diary/${dateForBackend}`);
    return response.data.data.productList;
  } catch (error) {
    console.error('Failed to get diary by date:', error);
  }
};

export const deleteProductById = async (id, date) => {
  const dateForBackend = toBackendDateString(date);
  try {
    const response = await axiosInstance({
      method: 'DELETE',
      url: `diary/${id}`,
      data: {
        date: dateForBackend,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete product by ID:', error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('users/current');
    return response.data.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
  }
};

export const updateCurrentUser = async ({
  height,
  age,
  currentWeight,
  desiredWeight,
  bloodType,
}) => {
  try {
    const response = await axiosInstance.put('users', {
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to update current user:', error);
  }
};

export const getProductsSearch = async (search) => {
  try {
    const response = await axiosInstance.get(`products/${search}`);
    return response.data.data.product;
  } catch (error) {
    console.error('Failed to get products search:', error);
  }
};

export const addProductInDiary = async (values) => {
  try {
    const formattedValues = { ...values };
    formattedValues.date = toBackendDateString(values.date);
    const response = await axiosInstance.post('diary', formattedValues);
    return response.data.data;
  } catch (error) {
    console.error('Failed to add product in diary:', error);
  }
};
