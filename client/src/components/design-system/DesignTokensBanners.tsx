import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DesignTokenItem {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  color: string;
}

export default function DesignTokensBanners() {
  const [designTokens, setDesignTokens] = useState<DesignTokenItem[]>([
    {
      title: "Color System",
      subtitle: "Brand Colors & Palettes",
      description: "Hệ thống màu sắc IKK Platform",
      tag: "FOUNDATIONS",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Typography Scale", 
      subtitle: "Font System & Hierarchy",
      description: "Hệ thống typography cho mọi nền tảng",
      tag: "FOUNDATIONS",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Component Library",
      subtitle: "UI Components & Patterns",
      description: "Thư viện components đầy đủ",
      tag: "COMPONENTS",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile First Design",
      subtitle: "Responsive & Adaptive",
      description: "Thiết kế tối ưu cho mobile",
      tag: "PATTERNS", 
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Vietnamese Localization",
      subtitle: "Cultural Adaptation",
      description: "Bản địa hóa hoàn chỉnh cho Việt Nam",
      tag: "GUIDELINES",
      color: "from-orange-500 to-amber-500"
    }
  ]);

  const handleDeleteToken = (indexToDelete: number) => {
    const tokenToDelete = designTokens[indexToDelete];
    setDesignTokens(prev => prev.filter((_, index) => index !== indexToDelete));
    toast.success(`Đã xóa ${tokenToDelete.title} thành công`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mb-8">
      <div className="relative">
        {/* Design tokens carousel */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {designTokens.map((token, index) => (
            <div key={index} className="flex-shrink-0 w-80 h-48 relative rounded-xl overflow-hidden group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${token.color}`}></div>
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
              
              {/* Delete Button - positioned in top-right corner */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteToken(index);
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white hover:text-red-600 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                data-testid={`delete-token-${index}`}
                title={`Xóa ${token.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                      {token.tag}
                    </span>
                    <div className="text-xs opacity-80">{index + 1}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{token.subtitle}</h3>
                  <h4 className="text-xl font-bold mb-2">{token.title}</h4>
                </div>
                <p className="text-sm opacity-90">{token.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {designTokens.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === 0 ? 'bg-pink-500' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
