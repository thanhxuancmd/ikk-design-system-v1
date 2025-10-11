import { useState } from 'react';
import { toast } from 'sonner';

interface Color {
  name: string;
  hex: string;
  rgb: string;
  variable: string;
}

export default function ColorPalette() {
  const [colors, setColors] = useState<Color[]>([
    { name: "IKK Primary", hex: "#ff0086", rgb: "255, 0, 134", variable: "--ikk-primary" },
    { name: "IKK Secondary", hex: "#6366f1", rgb: "99, 102, 241", variable: "--ikk-secondary" },
    { name: "IKK Success", hex: "#10b981", rgb: "16, 185, 129", variable: "--ikk-success" },
    { name: "IKK Warning", hex: "#f59e0b", rgb: "245, 158, 11", variable: "--ikk-warning" },
    { name: "IKK Danger", hex: "#ef4444", rgb: "239, 68, 68", variable: "--ikk-danger" },
    { name: "IKK Info", hex: "#3b82f6", rgb: "59, 130, 246", variable: "--ikk-info" },
    { name: "Gray 900", hex: "#111827", rgb: "17, 24, 39", variable: "--gray-900" },
    { name: "Gray 500", hex: "#6b7280", rgb: "107, 114, 128", variable: "--gray-500" },
    { name: "Gray 100", hex: "#f3f4f6", rgb: "243, 244, 246", variable: "--gray-100" },
    { name: "White", hex: "#ffffff", rgb: "255, 255, 255", variable: "--white" },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${text} vào clipboard`);
  };

  return (
    <section id="color-palette" className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Color Palette</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {colors.map((color, index) => (
            <div key={index} className="group">
              <div 
                className="w-full h-24 rounded-lg mb-3 cursor-pointer transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
              ></div>
              <h4 className="font-semibold text-gray-800 mb-1">{color.name}</h4>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-between hover:bg-gray-50 p-1 rounded cursor-pointer" onClick={() => copyToClipboard(color.hex)}>
                  <span>HEX</span>
                  <span>{color.hex}</span>
                </div>
                <div className="flex items-center justify-between hover:bg-gray-50 p-1 rounded cursor-pointer" onClick={() => copyToClipboard(color.rgb)}>
                  <span>RGB</span>
                  <span>{color.rgb}</span>
                </div>
                <div className="flex items-center justify-between hover:bg-gray-50 p-1 rounded cursor-pointer" onClick={() => copyToClipboard(color.variable)}>
                  <span>CSS Var</span>
                  <span className="font-mono">{color.variable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
