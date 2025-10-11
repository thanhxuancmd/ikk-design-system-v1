import React from 'react';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

export default function SocialPlatformComponents() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Social Platform Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Platform Icons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Platform Icons</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">TT</span>
              </div>
              <span className="text-sm font-medium text-gray-700">TikTok</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">IG</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Instagram</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">YT</span>
              </div>
              <span className="text-sm font-medium text-gray-700">YouTube</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">FB</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </div>
          </div>
        </div>
        
        {/* Social Share Buttons */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Share Buttons</h4>
          <div className="space-y-3">
            <button className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
              <span>Chia sẻ TikTok</span>
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2">
              <span>Chia sẻ Instagram</span>
            </button>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
              <span>Chia sẻ YouTube</span>
            </button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <span>Chia sẻ Facebook</span>
            </button>
          </div>
        </div>
        
        {/* Platform Stats */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Platform Stats</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <span className="text-sm font-medium">TikTok</span>
                </div>
                <span className="text-sm font-bold text-gray-900">1.2M</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">I</span>
                  </div>
                  <span className="text-sm font-medium">Instagram</span>
                </div>
                <span className="text-sm font-bold text-gray-900">850K</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Y</span>
                  </div>
                  <span className="text-sm font-medium">YouTube</span>
                </div>
                <span className="text-sm font-bold text-gray-900">450K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
