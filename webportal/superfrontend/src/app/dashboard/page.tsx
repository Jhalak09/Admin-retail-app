'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Admin {
  _id: string;
  userid: string;
  name?: string;
  email: string;
  phonenumber?: string;
  city?: string;
  status: string;
  created_stamp: string;
  adminid?: string;
  productsCount?: number;
  retailersCount?: number;
}

export default function DashboardPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', id:'' });
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  let Status = '';
  // Fetch admin data
  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    const storedToken = localStorage.getItem('token');  
    if (storedId) {
      setId(storedId);
    }
    if (storedToken) {
      setToken(storedToken);
    }
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/admins', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Transform the data to include productsCount and retailersCount
        const adminsWithCounts = response.data.map((admin: any) => ({
          ...admin,
          productsCount: admin.productsCount || 0,  // Default to 0 if not provided
          retailersCount: admin.retailersCount || 0  // Default to 0 if not provided
        }));
        
        setAdmins(adminsWithCounts);
      } catch (error: any) {
        toast.error('Failed to fetch admin data');
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, [token]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending email:', newAdmin.email);
      console.log('Sending id:', id);

      const response = await axios.post('http://localhost:4000/auth/registeraccessadmin', {
        email: newAdmin.email,
        id: id,
      });
      toast.success("Added Admin successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(message || "An unexpected error occurred.");
    }
  };
  

  const filteredAdmins = admins.filter(admin => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      admin.name?.toLowerCase().includes(searchTermLower) ||
      admin.email?.toLowerCase().includes(searchTermLower) ||
      admin.city?.toLowerCase().includes(searchTermLower) ||
      admin.phonenumber?.toLowerCase().includes(searchTermLower) ||
      admin.userid.toLowerCase().includes(searchTermLower)
    );
  });

  const hasAccess = (status: string) => {
    const statusLower = status.toLowerCase();
    return statusLower === 'active' || statusLower === 'preapproved';
  };

  const getButtonText = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'inactive') {
      return 'Grant Access';
    }
    return 'Remove Access';
  };

  const toggleAdminStatus = async (adminUserId: string, currentStatus: string) => {
    try {
      // If they currently have access (active/preapproved), we're setting to inactive
      // If they're inactive, we're setting back to active
      const newStatus = hasAccess(currentStatus) ? 'inactive' : 'active';

      const response = await axios.put(
        'http://localhost:4000/user/toggle-admin-status',
        {
          userid: adminUserId,
          superAdminId: id,
          newStatus: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        if(response.data.message === 'Status updated to preapproved'){
          Status = 'preapproved';
        }
        setAdmins(admins.map(admin => {
          if (admin.userid === adminUserId  ) {
            if(Status === 'preapproved'){
              return {
                ...admin,
                status: 'preapproved'
              };
            }else{
            return {
              ...admin,
              status: newStatus
            };
            }
          }
          return admin;
        }));
        
        toast.success(`Admin access ${newStatus === 'inactive' ? 'removed' : 'granted'} successfully`);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update admin status';
      toast.error(message);
      console.error('Error updating admin status:', error);
    }
  };

  const handleStatusToggle = (adminUserId: string, currentStatus: string) => {
    if (hasAccess(currentStatus)) {
      // Show confirmation before removing access
      if (window.confirm('Are you sure you want to remove access for this admin?')) {
        toggleAdminStatus(adminUserId, currentStatus);
      }
    } else {
      // No confirmation needed for granting access
      toggleAdminStatus(adminUserId, currentStatus);
    }
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={() => setShowAddAdminModal(true)}
                className="px-6 py-2 bg-[#A8E0D8] text-black rounded-xl hover:bg-[#97CDC5] transition-colors"
              >
                Add Admin
              </button>
            </div>
          </div>

          {/* Add Admin Modal */}
          {showAddAdminModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Add New Admin</h2>
                <form onSubmit={handleAddAdmin}>
                  <div className="space-y-4">
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E0D8] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddAdminModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#A8E0D8] text-black rounded-xl hover:bg-[#97CDC5] transition-colors"
                    >
                      Add Admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Admin List */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#A8E0D8]/20">
                  <tr>
                    <th className="px-6 py-4 text-left">User ID</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone Number</th>
                    <th className="px-6 py-4 text-left">City</th>
                    <th className="px-6 py-4 text-center">Products</th>
                    <th className="px-6 py-4 text-center">Retailers</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin._id} className="border-t border-gray-100">
                      <td className="px-6 py-4">{admin.userid}</td>
                      <td className="px-6 py-4">{admin.name || '-'}</td>
                      <td className="px-6 py-4">{admin.email}</td>
                      <td className="px-6 py-4">{admin.phonenumber || '-'}</td>
                      <td className="px-6 py-4">{admin.city || '-'}</td>
                      <td className="px-6 py-4 text-center">{admin.productsCount || 0}</td>
                      <td className="px-6 py-4 text-center">{admin.retailersCount || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          hasAccess(admin.status)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleStatusToggle(admin.userid, admin.status)}
                          className={`px-4 py-2 rounded-full text-sm ${
                            !hasAccess(admin.status)
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {getButtonText(admin.status)}
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