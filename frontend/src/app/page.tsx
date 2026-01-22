'use client';

import { useState, useEffect } from 'react';
import { hotelService } from '@/lib/services/hotelService';
import type { Hotel, CreateHotelDto } from '@/types';

export default function HomePage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAll();
      setHotels(data);
    } catch (error) {
      console.error('Error al cargar hoteles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dto: CreateHotelDto = { name, location, description };

    try {
      await hotelService.create(dto);
      // Refrescamos la lista
      await loadHotels();
      // Limpiamos el formulario
      setName('');
      setLocation('');
      setDescription('');
    } catch (error) {
      console.error('Error al crear hotel:', error);
      alert('Error al conectar con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Altairis Backoffice</h1>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
          >
            Ver Dashboard Operativo
          </a>
        </div>

        {/* Formulario de Creación */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar nuevo establecimiento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Hotel Altairis Mar"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ubicación</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Palma de Mallorca, España"
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve descripción del hotel..."
                className="w-full p-2 border rounded text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={2}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Procesando...' : 'Añadir al Inventario'}
            </button>
          </form>
        </div>

        {/* Listado de Hoteles */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Hoteles en Sistema</h2>
          {hotels.length === 0 ? (
            <div className="text-center p-10 bg-white rounded border border-dashed border-gray-300">
              <p className="text-gray-500">No hay hoteles registrados en la base de datos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-indigo-900">{hotel.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">ID: {hotel.id}</span>
                  </div>
                  <p className="text-gray-600 flex items-center mt-1">
                    <span className="mr-1">📍</span> {hotel.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-3 italic">{hotel.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}