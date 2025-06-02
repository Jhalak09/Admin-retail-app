'use client';
import { useState, useEffect } from 'react';
import React from 'react';

interface Admin {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  productsCount: number;
  retailersCount: number;
}

export default function DashboardPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - Replace with actual API call
  useEffect(() => {
    const mockAdmins: Admin[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', productsCount: 25, retailersCount: 10 },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', productsCount: 15, retailersCount: 5 },
    ];
    setAdmins(mockAdmins);
  }, []);

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAdminStatus = (adminId: string) => {
    setAdmins(admins.map(admin => {
      if (admin.id === adminId) {
        return {
          ...admin,
          status: admin.status === 'active' ? 'inactive' : 'active'
        };
      }
      return admin;
    }));
  };

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
          <a href="/dashboard" className="block py-2 px-4 bg-white rounded-xl font-medium">Dashboard</a>
          <a href="/dashboard/reports" className="block py-2 px-4 hover:bg-white/50 rounded-xl">Reports</a>
          <a href="/logout" className="block py-2 px-4 hover:bg-white/50 rounded-xl">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Management</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Admin List */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#A8E0D8]/20">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-center">Products</th>
                    <th className="px-6 py-4 text-center">Retailers</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="border-t border-gray-100">
                      <td className="px-6 py-4">{admin.name}</td>
                      <td className="px-6 py-4">{admin.email}</td>
                      <td className="px-6 py-4 text-center">{admin.productsCount}</td>
                      <td className="px-6 py-4 text-center">{admin.retailersCount}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          admin.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleAdminStatus(admin.id)}
                          className={`px-4 py-2 rounded-full text-sm ${
                            admin.status === 'active'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {admin.status === 'active' ? 'Revoke Access' : 'Grant Access'}
                        </button>
                      </td>
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