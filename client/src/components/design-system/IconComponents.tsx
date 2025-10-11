import { Users, ShoppingBag, DollarSign, Eye } from 'lucide-react';

export default function IconComponents() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Icon Components</h3>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
          {/* Previous icons would be here */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Users</span>
            <div className="text-xs text-gray-500 mt-1">Collaborations</div>
          </div>

          {/* Commerce Icons */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
              <ShoppingBag className="w-8 h-8 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">ShoppingBag</span>
            <div className="text-xs text-gray-500 mt-1">E-commerce</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">DollarSign</span>
            <div className="text-xs text-gray-500 mt-1">Monetization</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
              <Eye className="w-8 h-8 text-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Eye</span>
            <div className="text-xs text-gray-500 mt-1">Content Views</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg border border-[#ff0086]/20">
          <h4 className="font-semibold text-gray-900 mb-2">Icon Usage Guidelines</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ff0086] rounded-full"></div>
              <span>Sử dụng màu sắc phù hợp với từng loại icon: Content Creation (pink/blue), Engagement (red/green), Business (yellow/amber)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
              <span>Kích thước chuẩn: w-4 h-4 cho inline, w-6 h-6 cho cards, w-8 h-8 cho showcases</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Luôn sử dụng gradient background và shadow effects để tạo độ sâu</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

