import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FormElements() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Input & Select Components</h3>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {/* Text Inputs */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Text Inputs</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your-email@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="0901 234 567"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disabled Input</label>
                <input
                  type="text"
                  placeholder="Disabled field"
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Select Dropdowns */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Select Dropdowns</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                  <option>Chọn platform</option>
                  <option>TikTok</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>Facebook</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                  <option>Chọn danh mục</option>
                  <option>Làm đẹp</option>
                  <option>Thời trang</option>
                  <option>Ẩm thực</option>
                  <option>Du lịch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Textarea</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Nhập mô tả chi tiết..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Ghi chú thêm..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
