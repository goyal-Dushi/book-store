import { api } from '../config/axios.config';

export const UserAPI = {
  get: async function (id) {
    const response = await api.request({
      url: `/users/profile/${id}`,
      method: 'GET',
    });

    return response.data;
  },
  login: async function () {
    const response = await api.request({
      url: '/users/login',
      method: 'POST',
    });

    return response.data;
  },
  login: async function () {
    const response = await api.request({
      url: '/users/logout',
      method: 'GET',
    });

    return response.data;
  },
  register: async function (data) {
    const response = await api.request({
      url: '/users/register',
      body: {
        ...data,
      },
      method: 'POST',
    });

    return response.data;
  },
};
