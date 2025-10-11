import React from 'react';

export default function Typography() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Typography Components</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Headings */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Headings</h4>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">H1 - Main Title</h1>
              <h2 className="text-2xl font-bold text-gray-900">H2 - Section Title</h2>
              <h3 className="text-xl font-semibold text-gray-900">H3 - Subsection</h3>
              <h4 className="text-lg font-semibold text-gray-700">H4 - Component Title</h4>
              <h5 className="text-base font-medium text-gray-700">H5 - Sub Component</h5>
              <h6 className="text-sm font-medium text-gray-600">H6 - Small Header</h6>
            </div>
          </div>

          {/* Body Text */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Body Text</h4>
            <div className="space-y-4">
              <p className="text-base text-gray-900">
                Đây là text size chuẩn cho nội dung chính (16px).
              </p>
              <p className="text-sm text-gray-600">
                Text size nhỏ cho thông tin phụ và metadata (14px).
              </p>
              <p className="text-xs text-gray-500">
                Text size rất nhỏ cho labels và captions (12px).
              </p>
              <div className="text-sm text-[#ff0086] font-medium hover:text-[#e6007a] transition-colors cursor-pointer">
                Link text với primary color
              </div>
            </div>
          </div>

          {/* Text Variants */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Text Variants</h4>
            <div className="space-y-3">
              <div className="text-sm font-bold text-gray-900">Bold Text</div>
              <div className="text-sm font-semibold text-gray-800">Semibold Text</div>
              <div className="text-sm font-medium text-gray-700">Medium Text</div>
              <div className="text-sm font-normal text-gray-600">Regular Text</div>
              <div className="text-sm text-gray-500 italic">Italic Text</div>
              <div className="text-sm text-gray-400 line-through">Strikethrough Text</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
