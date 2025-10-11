import React from 'react';
import { Star, DollarSign, TrendingUp } from 'lucide-react';

export default function KOCSpecificComponents() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">KOC Specific Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* KOC Profile Card */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">KOC Profile</h4>
          <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">IK</span>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900">IKKBeauty</h5>
                <p className="text-xs text-gray-500">Beauty Influencer</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">4.8</div>
                <div className="flex text-yellow-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-bold text-gray-900">125K</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">2.4%</div>
                <div className="text-xs text-gray-500">Engagement</div>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">48</div>
                <div className="text-xs text-gray-500">Campaigns</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Campaign Card */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Campaign Card</h4>
          <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900 text-sm">Maybelline</h5>
                <p className="text-xs text-gray-500">Beauty Campaign</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                Active
              </span>
            </div>
            <h6 className="font-semibold text-gray-800 mb-2">Review Son Matte Mới</h6>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Reward: </span>
              <span className="font-bold text-[#ff0086]">₫2,500,000</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Deadline: </span>
              <span className="text-gray-900">30/08/2025</span>
            </div>
          </div>
        </div>
        
        {/* Revenue Widget */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Revenue Widget</h4>
          <div className="bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold">Doanh thu tháng</h5>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">₫12,500,000</div>
            <div className="flex items-center space-x-1 text-sm opacity-90">
              <TrendingUp className="w-3 h-3" />
              <span>+23% so với tháng trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
