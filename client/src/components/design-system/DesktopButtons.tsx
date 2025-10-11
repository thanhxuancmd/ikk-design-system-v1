import React from 'react';
import { PlusCircle, Camera, CheckCircle, Eye, Share2, Bookmark, Heart, MessageCircle, Zap } from 'lucide-react';

export default function DesktopButtons() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Desktop Buttons Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Primary Desktop Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Desktop Buttons</h4>
          <div className="space-y-3">
            <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
              <PlusCircle className="w-4 h-4" />
              <span>Create New</span>
            </button>
            <br />
            <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-8 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Upload Content</span>
            </button>
            <br />
            <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Secondary Desktop Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Secondary Desktop Buttons</h4>
          <div className="space-y-3">
            <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <br />
            <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-8 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Campaign</span>
            </button>
            <br />
            <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Icon Desktop Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Icon Desktop Buttons</h4>
          <div className="flex flex-wrap gap-3">
            <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
            <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
              <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
            <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
              <Share2 className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
            <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
              <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
