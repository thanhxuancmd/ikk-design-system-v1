import { Component } from 'lucide-react';

export default function ComponentShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Component Showcase</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { 
            component: "Button Variants",
            title: "Primary, Secondary & Ghost buttons với interactive states",
            category: "UI Elements",
            usage: "250+",
            tags: ["Buttons", "Interactive", "States", "Brand"]
          },
          { 
            component: "Form Components", 
            title: "Input fields, Select, Checkbox & Validation patterns",
            category: "Forms", 
            usage: "180+",
            tags: ["Forms", "Validation", "Input", "UX"]
          },
          { 
            component: "Card Layouts",
            title: "Campaign cards, Profile cards & Content display cards",
            category: "Layout",
            usage: "156+",
            tags: ["Cards", "Layout", "Content", "Responsive"]
          },
          { 
            component: "Navigation Systems",
            title: "Header navigation, Sidebar & Mobile menu patterns",
            category: "Navigation",
            usage: "45+",
            tags: ["Navigation", "Mobile", "UX", "Responsive"]
          },
          { 
            component: "Data Visualization",
            title: "Charts, Metrics widgets & Dashboard components",
            category: "Analytics",
            usage: "67+",
            tags: ["Charts", "Data", "Metrics", "Analytics"]
          },
          { 
            component: "Chat & Messaging",
            title: "Chat bubbles, Message threading & Real-time UI",
            category: "Communication",
            usage: "89+",
            tags: ["Chat", "Real-time", "Communication", "UX"]
          }
        ].map((showcase, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Component Preview */}
            <div className="relative mb-3 rounded-lg overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Component className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                ACTIVE_{showcase.usage}
              </div>
              <div className="absolute top-2 right-2 text-white text-xs bg-black/50 px-1 py-0.5 rounded">
                View Code
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{showcase.component.charAt(0)}</span>
                  </div>
                  <span className="text-white text-xs font-medium">{showcase.component}</span>
                </div>
              </div>
            </div>
            
            {/* Component Info */}
            <div>
              <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                {showcase.title}
              </h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {showcase.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs text-gray-500 hover:text-pink-500 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">{showcase.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
