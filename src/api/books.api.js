import { api } from '../config/axios.config';

export const BooksAPI = {
  // getting all books
  getAll: async function () {
    const response = await api.request({
      url: '/books',
      method: 'GET',
    });

    return response.data;
  },
  getBooksBySeller: async function (sellerId) {
    const response = await api.request({
      url: `/books/getbook/${sellerId}`,
      method: 'GET',
    });

    return response.data;
  },
  // get book by id
  get: async function (id) {
    const response = await api.request({
      url: `/books/getbook/${id}`,
      method: 'GET',
    });

    return response.data;
  },
  addBook: async function (bookData, id) {
    const response = await api.request({
      url: '/books/add',
      body: {
        bookData,
        id,
      },
      method: 'POST',
    });

    return response.data;
  },
  editBook: async function (editData, id) {
    const response = await api.request({
      url: `/books/edit/${id}`,
      body: {
        editData,
      },
      method: 'PATCH',
    });

    return response.data;
  },
  delete: async function (bookId, id) {
    const response = await api.request({
      url: `/books/delete/${bookId}`,
      method: 'DELETE',
      body: {
        userId: id,
      },
    });

    return response.data;
  },
};
