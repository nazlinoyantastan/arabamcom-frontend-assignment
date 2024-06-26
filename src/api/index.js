import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/http://sandbox.arabamd.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  getListings(params) {
    return apiClient.get('/listing', { params });
  },
  getDetail(id) {
    return apiClient.get(`/detail`, { params: { id } });
  },
};
