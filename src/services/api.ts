import { LocationData } from '../types/locationData';
import apiClient from './apiClient';

export const fetchLocationData = async (ip?: string): Promise<LocationData> => {
  const url = ip ? `${ip}` : '';
  const response = await apiClient.get<LocationData>(url);
  return response.data;
};