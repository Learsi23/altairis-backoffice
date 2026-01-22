'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DashboardSummary = {
  hotelsActive: number;
  totalBookings: number;
  bookingsToday: number;
  bookingsLast7Days: { date: string; count: number }[];
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:5182/api/dashboard/summary');
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error('Error loading dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div className="p-8">Loading operational data...</div>;
  }

  if (!summary) {
    return <div className="p-8 text-red-600">Failed to load dashboard data.</div>;
  }

  const chartData = {
    labels: summary.bookingsLast7Days.map((d) => d.date),
    datasets: [
      {
        label: 'Check-ins per day',
        data: summary.bookingsLast7Days.map((d) => d.count),
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
      title: { display: true, text: 'Check-ins – Last 7 Days' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="bg-blue-700 p-2 rounded hover:bg-blue-900">
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 my-6">Operational Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Summary of current operational status in the system.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Active Hotels</h3>
            <p className="text-3xl font-bold text-blue-600">{summary.hotelsActive}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Bookings</h3>
            <p className="text-3xl font-bold text-green-600">{summary.totalBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-semibold text-gray-600">Bookings Today</h3>
            <p className="text-3xl font-bold text-purple-600">{summary.bookingsToday}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
