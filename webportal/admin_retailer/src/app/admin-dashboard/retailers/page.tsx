'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Retailers() {
  const router = useRouter();
  const [showAddRetailerModal, setShowAddRetailerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const retailers = [
    {
      id: 1,
      name: 'Tech Store Plus',
      owner: 'John Smith',
      email: 'john@techstoreplus.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      totalPurchases: 125000,
      joinedDate: '01/15/2024'
    },
    {
      id: 2,
      name: 'Digital World',
      owner: 'Sarah Johnson',
      email: 'sarah@digitalworld.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      totalPurchases: 98000,
      joinedDate: '02/01/2024'
    },
    {
      id: 3,
      name: 'Smart Electronics',
      owner: 'Mike Wilson',
      email: 'mike@smartelectronics.com',
      phone: '+1 (555) 345-6789',
      status: 'Active',
      totalPurchases: 156000,
      joinedDate: '01/05/2024'
    }
  ];

  const handleAddRetailer = (retailerData: any) => {
    console.log('Adding new retailer:', retailerData);
    setShowAddRetailerModal(false);
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
                <a href="/admin-dashboard/analytics" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
                <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Retailers</a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search retailers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Retailers</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your retailers and their accounts.</p>
            </div>
            <button
              onClick={() => setShowAddRetailerModal(true)}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
            >
              Add Retailer
            </button>
          </div>

          {/* Retailers Table */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Purchases</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {retailers.map((retailer) => (
                  <tr key={retailer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{retailer.name}</div>
                          <div className="text-sm text-gray-500">{retailer.owner}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{retailer.email}</div>
                      <div className="text-sm text-gray-500">{retailer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {retailer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${retailer.totalPurchases.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {retailer.joinedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Retailer Modal */}
          {showAddRetailerModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Retailer</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleAddRetailer({
                      name: formData.get('name'),
                      owner: formData.get('owner'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                    });
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                        <input
                          type="text"
                          name="owner"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddRetailerModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
                      >
                        Add Retailer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 