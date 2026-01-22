
import { api } from '../api'; 
import type { Hotel, CreateHotelDto } from '@/types';

export const hotelService = {
  getAll: async () => {
    return await api.get<Hotel[]>('/api/hotels');
  },
  
  
  create: async (hotel: CreateHotelDto) => {
    return await api.post<Hotel, CreateHotelDto>('/api/hotels', hotel);
  }
};