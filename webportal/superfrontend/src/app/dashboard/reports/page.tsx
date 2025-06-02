'use client';
import { useState, useEffect } from 'react';
import React from 'react';

interface AdminStats {
  totalAdmins: number;
  activeAdmins: number;
  totalProducts: number;
  totalRetailers: number;
}

interface AdminReport {
  id: string;
  name: string;
  email: string;
  productsCount: number;
  retailersCount: number;
  lastActive: string;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalAdmins: 0,
    activeAdmins: 0,
    totalProducts: 0,
    totalRetailers: 0
  });
  
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [filters, setFilters] = useState({
    dateRange: '7days',
    minProducts: '',
    minRetailers: ''
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulated stats
    setStats({
      totalAdmins: 25,
      activeAdmins: 20,
      totalProducts: 1250,
      totalRetailers: 450
    });

    // Simulated reports
    const mockReports: AdminReport[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        productsCount: 150,
        retailersCount: 45,
        lastActive: '2024-03-15'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        productsCount: 80,
        retailersCount: 25,
        lastActive: '2024-03-14'
      }
    ];
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(report => {
    const meetsProductMin = !filters.minProducts || report.productsCount >= parseInt(filters.minProducts);
    const meetsRetailerMin = !filters.minRetailers || report.retailersCount >= parseInt(filters.minRetailers);
    return meetsProductMin && meetsRetailerMin;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#A8E0D8] p-6">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 2L2 19h20L12 2z" fill="#000"/>
            </svg>
          </div>
          <span className="text-xl font-medium">Admin Panel</span>
        </div>
        <nav className="space-y-4">
          <a href="/dashboard" className="block py-2 px-4 hover:bg-white/50 rounded-xl">Dashboard</a>
          <a href="/dashboard/reports" className="block py-2 px-4 bg-white rounded-xl font-medium">Reports</a>
          <a href="/logout" className="block py-2 px-4 hover:bg-white/50 rounded-xl">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Analytics Report</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#A8E0D8] rounded-3xl p-6">
              <h3 className="text-lg font-medium mb-2">Total Admins</h3>
              <p className="text-3xl font-bold">{stats.totalAdmins}</p>
            </div>
            <div className="bg-[#FFB6C1] rounded-3xl p-6">
              <h3 className="text-lg font-medium mb-2">Active Admins</h3>
              <p className="text-3xl font-bold">{stats.activeAdmins}</p>
            </div>
            <div className="bg-[#FFD700] rounded-3xl p-6">
              <h3 className="text-lg font-medium mb-2">Total Products</h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-gray-100 rounded-3xl p-6">
              <h3 className="text-lg font-medium mb-2">Total Retailers</h3>
              <p className="text-3xl font-bold">{stats.totalRetailers}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Products
                </label>
                <input
                  type="number"
                  value={filters.minProducts}
                  onChange={(e) => setFilters({...filters, minProducts: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
                  placeholder="Minimum products"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Retailers
                </label>
                <input
                  type="number"
                  value={filters.minRetailers}
                  onChange={(e) => setFilters({...filters, minRetailers: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
                  placeholder="Minimum retailers"
                />
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#A8E0D8]/20">
                  <tr>
                    <th className="px-6 py-4 text-left">Admin</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-center">Products</th>
                    <th className="px-6 py-4 text-center">Retailers</th>
                    <th className="px-6 py-4 text-center">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-t border-gray-100">
                      <td className="px-6 py-4">{report.name}</td>
                      <td className="px-6 py-4">{report.email}</td>
                      <td className="px-6 py-4 text-center">{report.productsCount}</td>
                      <td className="px-6 py-4 text-center">{report.retailersCount}</td>
                      <td className="px-6 py-4 text-center">{report.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}