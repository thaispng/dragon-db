import axios from 'axios';
import { Dragon } from '../types/dragonTypes';

const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

export const dragonsService = {
  getAll: async (): Promise<Dragon[]> => {
    const response = await axios.get<Dragon[]>(API_URL);
    return response.data;
  },

  getById: async (id: string): Promise<Dragon> => {
    const response = await axios.get<Dragon>(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (dragon: Omit<Dragon, 'id' | 'createdAt'>): Promise<Dragon> => {
    const response = await axios.post<Dragon>(API_URL, dragon);
    return response.data;
  },

  update: async (id: string, dragon: Partial<Dragon>): Promise<Dragon> => {
    const response = await axios.put<Dragon>(`${API_URL}/${id}`, dragon);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
