import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default apiClient;