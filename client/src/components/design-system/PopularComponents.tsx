import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ComponentItem {
  name: string;
  category: string;
  usage: string;
  icon: string;
}

export default function PopularComponents() {
  const [components, setComponents] = useState<ComponentItem[]>([
    { name: "Primary Button", category: "UI Elements", usage: "250+ lần sử dụng", icon: "PB" },
    { name: "Campaign Card", category: "KOC Components", usage: "180+ lần sử dụng", icon: "CC" },
    { name: "User Profile", category: "Profile Components", usage: "95+ lần sử dụng", icon: "UP" },
    { name: "Chat System", category: "Communication", usage: "45+ lần sử dụng", icon: "CS" },
    { name: "Metrics Widget", category: "Analytics", usage: "67+ lần sử dụng", icon: "MW" },
  ]);

  const handleDeleteComponent = (indexToDelete: number) => {
    const componentToDelete = components[indexToDelete];
    setComponents(prev => prev.filter((_, index) => index !== indexToDelete));
    toast.success(`Đã xóa ${componentToDelete.name} thành công`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Components phổ biến</h2>
        <div className="flex items-center space-x-4">
          <button className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
            Làm mới danh sách
          </button>
          <button className="text-xs text-pink-500 hover:text-pink-600 transition-colors">
            Xem thêm
          </button>
        </div>
      </div>
      
      {/* Popular Components Horizontal Scroll - exact home style */}
      <div className="flex space-x-6 overflow-x-auto pb-4 mb-8">
        {components.map((component, index) => (
          <div key={index} className="flex-shrink-0 group relative">
            <a href={`#${component.name}`}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] relative">
                {/* Delete Button - positioned in top-right corner */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteComponent(index);
                  }}
                  className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  data-testid={`delete-component-${index}`}
                  title={`Xóa ${component.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Component Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{component.icon}</span>
                  </div>
                  {/* Active indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Component Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-sm text-gray-900 truncate">{component.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1 truncate">{component.category}</div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <span className="text-pink-500 font-medium">{component.usage}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
