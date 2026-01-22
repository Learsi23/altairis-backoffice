'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Booking = {
  id: number;
  customerName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
};

type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, hotelsRes] = await Promise.all([
          fetch('http://localhost:5182/api/bookings'),
          fetch('http://localhost:5182/api/hotels')
        ]);
        const bookingsData = await bookingsRes.json();
        const hotelsData = await hotelsRes.json();
        setBookings(bookingsData);
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0]; 
  }).reverse();

  const bookingCounts = last7Days.map(day => {
    return bookings.filter(b => b.checkIn.startsWith(day)).length;
  });

  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Reservas por día',
        data: bookingCounts,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Actividad Operativa: Últimos 7 Días' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  if (loading) {
    return <div className="p-8">Cargando datos operativos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Operativo</h1>

        {/* Métricas clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Hotel</h3>
            <p className="text-3xl font-bold text-blue-600">{hotels.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Reservas</h3>
            <p className="text-3xl font-bold text-green-600">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Hoy</h3>
            <p className="text-3xl font-bold text-purple-600">
              {bookings.filter(b => b.checkIn.startsWith(new Date().toISOString().split('T')[0])).length}
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-6 rounded-lg shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}