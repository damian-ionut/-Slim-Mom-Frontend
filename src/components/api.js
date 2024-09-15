import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const addProductInDiary = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/diary/add`, product, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const deleteProductById = async (productId, date) => {
  try {
    const response = await axios.delete(`${API_URL}/diary/delete/${productId}`, {
      data: { date },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
