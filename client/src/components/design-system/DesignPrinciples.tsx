import { Palette, Layout, Box } from 'lucide-react';

export default function DesignPrinciples() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">IKK Design Principles</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Nguyên tắc thiết kế cốt lõi định hình trải nghiệm người dùng trên nền tảng IKK
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Principle 1: Color Hierarchy */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-[#ff0086]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phân cấp màu sắc</h3>
          <p className="text-sm text-gray-600 mb-4">
            Màu hồng chủ đạo #ff0086 với hệ thống màu phụ trợ rõ ràng cho từng chức năng
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff0086] rounded"></div>
            <div className="w-8 h-8 bg-pink-100 rounded"></div>
            <div className="w-8 h-8 bg-gray-100 rounded"></div>
            <div className="w-8 h-8 bg-white border border-gray-200 rounded"></div>
          </div>
        </div>

        {/* Principle 2: Whitespace & Breathing */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
            <Layout className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không gian thở</h3>
          <p className="text-sm text-gray-600 mb-4">
            Padding và spacing đồng nhất tạo cảm giác thoáng, dễ đọc với hệ thống 4/8/16/24px
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-4 h-4 bg-gray-200"></div>
              <span>4px - Compact</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-8 h-4 bg-gray-200"></div>
              <span>8px - Default</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-16 h-4 bg-gray-200"></div>
              <span>16px - Spacious</span>
            </div>
          </div>
        </div>

        {/* Principle 3: Rounded Corners */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
            <Box className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bo góc nhất quán</h3>
          <p className="text-sm text-gray-600 mb-4">
            rounded-xl (12px) cho cards, rounded-lg (8px) cho buttons, rounded (4px) cho inputs
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
