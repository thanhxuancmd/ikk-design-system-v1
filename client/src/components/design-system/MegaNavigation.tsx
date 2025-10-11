import React from 'react';
import { FileText, ShoppingBag, Gift } from 'lucide-react';

export default function MegaNavigation() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Mega Navigation Components</h3>
      
      <div className="space-y-8">
        
        {/* Navigation Megamenu Example */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Category Megamenu</h4>
          <div className="bg-white shadow-xl border border-gray-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* DỊCH VỤ Column */}
              <div className="p-4 border-r border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#ff0086]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">DỊCH VỤ</h3>
                </div>
                <ul className="space-y-1.5">
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Nhà hàng, cà phê</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Du lịch</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Làm đẹp</a></li>
                </ul>
              </div>
              
              {/* SẢN PHẨM Column */}
              <div className="p-4 border-r border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h3>
                </div>
                <ul className="space-y-1.5">
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Công nghệ</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Thời trang</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Gia dụng</a></li>
                </ul>
              </div>
              
              {/* KHUYẾN MÃI Column */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Gift className="w-4 h-4 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">KHUYẾN MÃI</h3>
                </div>
                <ul className="space-y-1.5">
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Flash Sale</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Voucher</a></li>
                  <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Freeship</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Navigation Tabs */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Main Navigation</h4>
          <nav className="flex items-center space-x-2">
            <a href="#" className="px-4 py-2 text-sm text-[#ff0086] bg-gray-50 rounded-lg font-medium">Trang chủ</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">Danh mục</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">Campaigns</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">KOC</a>
            <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">About</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
