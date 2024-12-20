import { api } from '../config/axios.config';

const BASE_URL = '/users';

export const UserAPI = {
  get: async function (id) {
    const response = await api.request({
      url: `${BASE_URL}/profile/${id}`,
      method: 'GET',
    });

    return response.data;
  },
  getInventory: async function (id) {
    const response = await api.request({
      url: `${BASE_URL}/inventory/${id}`,
      method: 'GET',
    });

    return response.data;
  },
  login: async function (data) {
    const response = await api.request({
      url: '/login',
      method: 'POST',
      data: {
        ...data,
      },
    });

    return response.data;
  },
  logout: async function (data) {
    const response = await api.request({
      url: `${BASE_URL}/logout`,
      method: 'POST',
      data: {
        ...data,
      },
    });

    return response.data;
  },
  register: async function (data) {
    const response = await api.request({
      url: '/register',
      data: {
        ...data,
      },
      method: 'POST',
    });

    return response.data;
  },
};
