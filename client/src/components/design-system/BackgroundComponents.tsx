import React from 'react';

export default function BackgroundComponents() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Background Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Page Backgrounds */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Page Backgrounds</h4>
          <div className="space-y-4">
            <div className="h-24 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">White Background</p>
            </div>
            <div className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">Gray-50 Background</p>
            </div>
            <div className="h-24 bg-gradient-to-br from-gray-50 via-white to-pink-50/30 rounded-xl border border-gray-200 flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">Gradient Background</p>
            </div>
          </div>
        </div>

        {/* Card Backgrounds */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Card Backgrounds</h4>
          <div className="space-y-4">
            <div className="h-24 bg-white rounded-xl border border-gray-100 shadow-lg flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">Standard Card</p>
            </div>
            <div className="h-24 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">Glass Card</p>
            </div>
            <div className="h-24 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg flex items-center justify-center">
              <p className="text-xs text-gray-600 font-medium">Gradient Card</p>
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Hover Effects</h4>
          <div className="space-y-4">
            <div className="h-24 bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex items-center justify-center cursor-pointer">
              <p className="text-xs text-gray-600 font-medium">Hover Shadow</p>
            </div>
            <div className="h-24 bg-white rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer">
              <p className="text-xs text-gray-600 font-medium">Hover Scale</p>
            </div>
            <div className="h-24 bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-[#ff0086] transition-all duration-300 flex items-center justify-center cursor-pointer">
              <p className="text-xs text-gray-600 font-medium">Hover Border</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
