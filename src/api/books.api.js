import { api } from '../config/axios.config';

const BASE_URL = '/books';

export const BooksAPI = {
  // getting all books
  getAll: async function () {
    const response = await api.request({
      url: BASE_URL,
      method: 'GET',
    });

    return response.data;
  },
  getBooksBySeller: async function (sellerId) {
    const response = await api.request({
      url: `${BASE_URL}/getbook/${sellerId}`,
      method: 'GET',
    });

    return response.data;
  },
  // get book by id
  get: async function (id) {
    const response = await api.request({
      url: `${BASE_URL}/getbook/${id}`,
      method: 'GET',
    });

    return response.data;
  },
  addBook: async function (bookData, id) {
    const response = await api.request({
      url: `${BASE_URL}/add`,
      data: {
        bookData,
        id,
      },
      method: 'POST',
    });

    return response.data;
  },
  editBook: async function (editData, id) {
    const response = await api.request({
      url: `${BASE_URL}/edit/${id}`,
      data: {
        editData,
      },
      method: 'PATCH',
    });

    return response.data;
  },
  delete: async function (bookId, id) {
    const response = await api.request({
      url: `${BASE_URL}/delete/${bookId}`,
      method: 'DELETE',
      data: {
        userId: id,
      },
    });

    return response.data;
  },
};
