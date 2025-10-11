import React from 'react';

export default function Tabs() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tabs Components</h3>
        
        <div className="space-y-8">
          
          {/* Primary Tabs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Tabs</h4>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button className="py-2 px-1 border-b-2 border-[#ff0086] text-[#ff0086] font-medium text-sm">
                  Tổng quan
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                  Campaigns
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                  Analytics
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                  Settings
                </button>
              </nav>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Nội dung tab "Tổng quan" được hiển thị ở đây.</p>
            </div>
          </div>

          {/* Pill Tabs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Pill Tabs</h4>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors">
                Active Tab
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                Inactive Tab
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                Another Tab
              </button>
            </div>
          </div>

          {/* Segment Tabs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Segment Tabs</h4>
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 bg-white text-[#ff0086] text-sm font-medium rounded-md shadow-sm">
                KOC
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                Brands
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                Campaigns
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
