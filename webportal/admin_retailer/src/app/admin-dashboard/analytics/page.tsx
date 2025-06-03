'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Analytics() {
  const router = useRouter();
  
  const analyticsData = {
    totalSales: 775,
    totalRevenue: 649625.00,
    activeRetailers: 15,
    topProducts: [
      { name: 'Smartphone X Pro', sales: 150, revenue: 149850 },
      { name: 'Wireless Earbuds Ultra', sales: 300, revenue: 59700 },
      { name: 'Smart Home Hub', sales: 200, revenue: 29800 },
    ],
    monthlySales: [
      { month: 'Jan', sales: 50 },
      { month: 'Feb', sales: 65 },
      { month: 'Mar', sales: 85 },
      { month: 'Apr', sales: 95 },
      { month: 'May', sales: 120 },
      { month: 'Jun', sales: 150 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="text-xl font-semibold">Dashboard</div>
              <div className="flex space-x-4">
                <a href="/admin-dashboard" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
                <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
                <a href="/admin-dashboard/retailers" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Retailers</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Overview</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.totalSales}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">${analyticsData.totalRevenue.toLocaleString()}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Retailers</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{analyticsData.activeRetailers}</dd>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white shadow-sm rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {analyticsData.topProducts.map((product, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">Sales: {product.sales}</p>
                        </div>
                        <div className="text-right text-sm font-medium text-gray-900">
                          ${product.revenue.toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Monthly Sales Chart */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Sales Trend</h3>
              <div className="h-64 relative">
                {/* Simple bar chart visualization */}
                <div className="flex items-end justify-between h-48 space-x-2">
                  {analyticsData.monthlySales.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.sales / 150) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-500">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 