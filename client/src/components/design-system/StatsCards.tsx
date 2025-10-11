import React from 'react';
import { Crown, Target, DollarSign, TrendingUp } from 'lucide-react';

export default function StatsCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Stats Cards Components</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* KOC Stats Card */}
          <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Active KOCs</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
          </div>

          {/* Campaigns Stats Card */}
          <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Live Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>

          {/* Revenue Stats Card */}
          <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+23%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₫2.4M</p>
            </div>
          </div>

          {/* Engagement Stats Card */}
          <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">-2%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-900">4.8%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
