'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Admin Retail Portal
          </h1>
          <p className="text-lg text-gray-600">
            Choose your login type to continue
          </p>
        </div>

        {/* Login Options */}
        <div className="space-y-6">
          {/* Admin Login Option */}
          <div 
            onClick={() => router.push('/admin-login')}
            className="group cursor-pointer"
          >
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50">
                  <span className="text-2xl" role="img" aria-label="admin">👤</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Admin Login</h2>
                <p className="text-gray-600">
                  Access administrative controls and manage the retail system
                </p>
              </div>
            </div>
          </div>

          {/* Retailer Login Option */}
          <div 
            onClick={() => router.push('/retailer-login')}
            className="group cursor-pointer"
          >
            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50">
                  <span className="text-2xl" role="img" aria-label="retailer">🏪</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Retailer Login</h2>
                <p className="text-gray-600">
                  Manage your retail operations and inventory
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-600 text-center">
            © 2024 Admin Retail Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
