// Modelo de Hotel
export type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
};

// Modelo para crear (sin ID, ya que lo genera la DB)
export type CreateHotelDto = Omit<Hotel, 'id'>;