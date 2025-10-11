import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

export default function ButtonComponents() {
  return (
    <section id="buttons" className="max-w-7xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Button Components</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Primary Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white">Primary Button</Button>
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" disabled>Disabled</Button>
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white"><Plus className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" size="sm">Small Button</Button>
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" size="lg">Large Button</Button>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">Secondary Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="secondary"><Edit className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button variant="secondary" size="sm">Small Button</Button>
              <Button variant="secondary" size="lg">Large Button</Button>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">Outline Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="outline">Outline Button</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <Button variant="outline"><Save className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button variant="outline" size="sm">Small Button</Button>
              <Button variant="outline" size="lg">Large Button</Button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Ghost Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="ghost" disabled>Disabled</Button>
              <Button variant="ghost"><Trash2 className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button variant="ghost" size="sm">Small Button</Button>
              <Button variant="ghost" size="lg">Large Button</Button>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">Destructive Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="destructive" disabled>Disabled</Button>
              <Button variant="destructive"><X className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button variant="destructive" size="sm">Small Button</Button>
              <Button variant="destructive" size="lg">Large Button</Button>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">Link Buttons</h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="link">Link Button</Button>
              <Button variant="link" disabled>Disabled</Button>
              <Button variant="link"><Plus className="w-4 h-4 mr-2" /> With Icon</Button>
              <Button variant="link" size="sm">Small Button</Button>
              <Button variant="link" size="lg">Large Button</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
