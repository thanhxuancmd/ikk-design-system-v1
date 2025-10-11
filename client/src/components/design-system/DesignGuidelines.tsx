import { Book, Palette, Type, Code, Smartphone, Shield, Globe, Crown } from 'lucide-react';

export default function DesignGuidelines() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Guidelines & Documentation</h2>
          <p className="text-gray-600">Hướng dẫn thiết kế và tài liệu sử dụng components</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            <span className="flex items-center space-x-2">
              <span>Bộ lọc</span>
            </span>
          </button>
          <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
            Xem tất cả
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Getting Started",
            description: "Hướng dẫn bắt đầu với IKK Design System",
            category: "Documentation",
            status: "active",
            difficulty: "Beginner",
            estimatedTime: "5 phút",
            icon: Book,
            color: "bg-blue-500"
          },
          {
            title: "Color Tokens",
            description: "Hệ thống màu sắc và cách sử dụng trong UI",
            category: "Foundations",
            status: "active",
            difficulty: "Beginner", 
            estimatedTime: "10 phút",
            icon: Palette,
            color: "bg-pink-500"
          },
          {
            title: "Typography System",
            description: "Font families, sizes và line heights chuẩn",
            category: "Foundations",
            status: "active",
            difficulty: "Intermediate",
            estimatedTime: "15 phút",
            icon: Type,
            color: "bg-indigo-500"
          },
          {
            title: "Component API",
            description: "Props documentation và usage examples",
            category: "Components",
            status: "active",
            difficulty: "Advanced",
            estimatedTime: "30 phút",
            icon: Code,
            color: "bg-green-500"
          },
          {
            title: "Responsive Design",
            description: "Breakpoints và mobile-first approach",
            category: "Patterns",
            status: "active",
            difficulty: "Intermediate",
            estimatedTime: "20 phút",
            icon: Smartphone,
            color: "bg-purple-500"
          },
          {
            title: "Accessibility Guide",
            description: "ARIA compliance và keyboard navigation",
            category: "Guidelines",
            status: "active", 
            difficulty: "Advanced",
            estimatedTime: "25 phút",
            icon: Shield,
            color: "bg-orange-500"
          },
          {
            title: "Vietnamese Localization",
            description: "Quy tắc bản địa hóa và cultural adaptation",
            category: "Guidelines",
            status: "active",
            difficulty: "Intermediate",
            estimatedTime: "15 phút",
            icon: Globe,
            color: "bg-red-500"
          },
          {
            title: "Brand Guidelines",
            description: "Logo usage, voice & tone cho IKK Platform",
            category: "Brand",
            status: "active",
            difficulty: "Beginner",
            estimatedTime: "12 phút", 
            icon: Crown,
            color: "bg-yellow-500"
          }
        ].map((guide, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${guide.color} rounded-lg flex items-center justify-center`}>
                    <guide.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#ff0086] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-gray-500">{guide.category}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  {guide.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 px-4">
                {guide.description}
              </p>
              
              <div className="flex items-center justify-between mb-3 px-4">
                <span className="text-xs text-gray-500">
                  <strong>Độ khó:</strong> {guide.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  <strong>Thời gian:</strong> {guide.estimatedTime}
                </span>
              </div>
              
              <div className="px-4 pb-4">
                <button className="text-[#ff0086] hover:text-[#e6007a] text-sm font-medium transition-colors">
                  Xem hướng dẫn →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
