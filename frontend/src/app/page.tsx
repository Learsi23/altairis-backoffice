'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
};

export default function HomePage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar hoteles al iniciar
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await fetch('http://localhost:5182/api/hotels');
      const data = await res.json();
      setHotels(data);
    } catch (error) {
      console.error('Error al cargar hoteles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newHotel = { name, location, description };

    try {
      await fetch('http://localhost:5182/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHotel),
      });
      // Recargar lista
      await fetchHotels();
      // Limpiar formulario
      setName('');
      setLocation('');
      setDescription('');
    } catch (error) {
      console.error('Error al crear hotel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className='bg-blue-700 p-2 rounded hover:bg-blue-900'>Ver Dashboard Operativo</Link>
        <h1 className="text-3xl font-bold text-gray-800 my-6">Hotel Altairis</h1>

        {/* Formulario */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">Añadir nuevo hotel</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del hotel"
              className="w-full p-2 border rounded text-gray-500"
              required
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ubicación"
                    className="w-full p-2 border rounded text-gray-500"
                    required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
              className="w-full p-2 border rounded text-gray-500"
              rows={2}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Hotel'}
            </button>
          </form>
        </div>

        {/* Lista de hoteles */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Hoteles registrados</h2>
          {hotels.length === 0 ? (
            <p className="text-gray-500">No hay hoteles aún.</p>
          ) : (
            <div className="space-y-3">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white p-4 rounded border">
                  <h3 className="font-bold text-lg text-gray-800">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                  <p className="text-gray-500 text-sm mt-1">{hotel.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}