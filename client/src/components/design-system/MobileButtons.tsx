import React from 'react';
import { PlusCircle, Camera, CheckCircle, Eye, Share2, Bookmark, Heart, MessageCircle, Zap } from 'lucide-react';

export default function MobileButtons() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Mobile Buttons Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Primary Mobile Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Mobile Buttons</h4>
          <div className="space-y-3">
            <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <PlusCircle className="w-4 h-4" />
              <span>Tạo Campaign Mới</span>
            </button>
            <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Upload Content</span>
            </button>
            <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Submit Application</span>
            </button>
          </div>
        </div>

        {/* Secondary Mobile Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Secondary Mobile Buttons</h4>
          <div className="space-y-3">
            <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Xem Chi Tiết</span>
            </button>
            <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Chia Sẻ</span>
            </button>
            <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Lưu Lại</span>
            </button>
          </div>
        </div>

        {/* Icon Mobile Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Icon Mobile Buttons</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#ff0086]" />
              </div>
              <span className="text-xs font-medium text-gray-700">Like</span>
            </button>
            <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-xs font-medium text-gray-700">Comment</span>
            </button>
            <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-xs font-medium text-gray-700">Share</span>
            </button>
            <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-xs font-medium text-gray-700">Boost</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
