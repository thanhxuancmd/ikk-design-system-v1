import React from 'react';

export default function Badges() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Badge Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Status Badges */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Status Badges</h4>
          <div className="space-y-3">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
              Hoạt động
            </span>
            <br />
            <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
              Tạm dừng
            </span>
            <br />
            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
              Chờ duyệt
            </span>
            <br />
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
              Đã hủy
            </span>
          </div>
        </div>

        {/* Category Badges */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Category Badges</h4>
          <div className="space-y-3">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              Thương hiệu
            </span>
            <br />
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
              Campaign
            </span>
            <br />
            <span className="inline-block bg-[#ff0086]/10 text-[#ff0086] px-3 py-1 rounded-full text-sm font-medium border border-[#ff0086]/20">
              KOC Elite
            </span>
            <br />
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
              Influencer
            </span>
          </div>
        </div>

        {/* Small Badges */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Small Badges</h4>
          <div className="space-y-3">
            <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full font-medium border border-pink-200">
              New
            </span>
            <br />
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium border border-green-200">
              Hot
            </span>
            <br />
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium border border-yellow-200">
              Popular
            </span>
            <br />
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium border border-blue-200">
              Trending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
