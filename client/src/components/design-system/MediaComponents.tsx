import React from 'react';
import { Play, Eye, Heart, MessageCircle, X } from 'lucide-react';

export default function MediaComponents() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Media Components</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Video Player Controls */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Video Controls</h4>
            <div className="bg-gray-900 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-center space-x-4">
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 text-white ml-1" />
                </button>
                <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="bg-white/10 rounded-full h-1">
                <div className="bg-[#ff0086] h-1 rounded-full w-1/3"></div>
              </div>
              <div className="flex items-center justify-between text-white text-xs">
                <span>2:45</span>
                <span>8:20</span>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Live Chat</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 h-40 overflow-y-auto">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-blue-600">User123</div>
                  <div className="text-sm text-gray-700">Sản phẩm này có sale không ạ?</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-pink-600">IKK_Admin</div>
                  <div className="text-sm text-gray-700">Chào bạn, sản phẩm đang có ưu đãi 15% đến hết tuần này nhé!</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-blue-600">User123</div>
                  <div className="text-sm text-gray-700">Tuyệt vời quá, cảm ơn shop!</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Example */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Modal Dialog</h4>
            <div className="relative flex items-center justify-center h-40 bg-gray-100 rounded-xl">
              <div className="bg-white rounded-xl shadow-xl p-6 w-64 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">Xác nhận hành động</h4>
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
    </section>
  );
}
