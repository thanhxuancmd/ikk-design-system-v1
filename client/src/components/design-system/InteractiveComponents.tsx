import React from 'react';
import { Search, X } from 'lucide-react';

export default function InteractiveComponents() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Search Component */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Search</h4>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm KOC, thương hiệu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors text-base"
              />
            </div>
          </div>
        </div>
        
        {/* Filter Components */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Filters</h4>
          <div className="space-y-4">
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
              <option>Tất cả danh mục</option>
              <option>Làm đẹp</option>
              <option>Thời trang</option>
              <option>Công nghệ</option>
            </select>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-[#ff0086] text-white text-sm rounded-full">
                Tất cả
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm rounded-full transition-colors">
                Hot
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm rounded-full transition-colors">
                Mới
              </button>
            </div>
          </div>
        </div>
        
        {/* Modal Preview */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Modal Dialog</h4>
          <div className="bg-gray-900/10 rounded-xl p-4">
            <div className="bg-white rounded-lg p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-gray-900">Xác nhận</h5>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Bạn có chắc chắn muốn tham gia campaign này?
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium">
                  Hủy
                </button>
                <button className="flex-1 bg-[#ff0086] text-white py-2 rounded-lg text-sm font-medium">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
