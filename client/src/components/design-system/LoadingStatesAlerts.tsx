import React from 'react';
import { CheckCircle, Clock, X, Zap } from 'lucide-react';

export default function LoadingStatesAlerts() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Loading States & Alerts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Loading States */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Loading States</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-[#ff0086] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Success Alerts */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Alert Messages</h4>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Campaign đã được tạo thành công!</span>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Campaign đang chờ duyệt</span>
            </div>
            
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
              <X className="w-4 h-4" />
              <span className="text-sm">Có lỗi xảy ra, vui lòng thử lại</span>
            </div>
          </div>
        </div>
        
        {/* Progress Indicators */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Progress</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Campaign Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#ff0086] rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <div className="w-8 h-8 bg-[#ff0086] rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                3
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-[#ff0086]/10 text-[#ff0086] px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Đang xử lý...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
