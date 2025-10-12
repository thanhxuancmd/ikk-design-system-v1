import { useState } from 'react';
import { AppleFilterPanel, FilterGroup, AppleContainer, AppleSectionHeader } from '@/components/apple';

export default function FilterPanelDemo() {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({
    status: [],
    category: '',
    commission: { min: 0, max: 50 },
    date: undefined,
    priority: '',
  });

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Trạng thái',
      type: 'checkbox',
      options: [
        { label: 'Hoạt động', value: 'active' },
        { label: 'Tạm dừng', value: 'paused' },
        { label: 'Đã hoàn thành', value: 'completed' },
        { label: 'Hủy bỏ', value: 'cancelled' },
      ],
      defaultOpen: true,
    },
    {
      id: 'category',
      label: 'Danh mục',
      type: 'radio',
      options: [
        { label: 'Thời trang', value: 'fashion' },
        { label: 'Làm đẹp', value: 'beauty' },
        { label: 'Ẩm thực', value: 'food' },
        { label: 'Công nghệ', value: 'tech' },
      ],
      defaultOpen: true,
    },
    {
      id: 'commission',
      label: 'Hoa hồng (%)',
      type: 'range',
      min: 0,
      max: 50,
      step: 5,
      defaultOpen: true,
    },
    {
      id: 'date',
      label: 'Thời gian',
      type: 'date',
      dateMode: 'range',
      defaultOpen: true,
    },
    {
      id: 'priority',
      label: 'Độ ưu tiên',
      type: 'select',
      options: [
        { label: 'Chọn độ ưu tiên', value: '' },
        { label: 'Cao', value: 'high' },
        { label: 'Trung bình', value: 'medium' },
        { label: 'Thấp', value: 'low' },
      ],
      defaultOpen: false,
    },
  ];

  const handleApply = () => {
    console.log('Applied filters:', filterValues);
    alert('Đã áp dụng bộ lọc! Xem console để biết chi tiết.');
  };

  const handleReset = () => {
    setFilterValues({
      status: [],
      category: '',
      commission: { min: 0, max: 50 },
      date: undefined,
      priority: '',
    });
    console.log('Filters reset');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <AppleContainer>
        <AppleSectionHeader
          title="AppleFilterPanel Demo"
          description="Comprehensive filtering component with multiple filter types"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <AppleFilterPanel
              filters={filterGroups}
              values={filterValues}
              onChange={setFilterValues}
              onApply={handleApply}
              onReset={handleReset}
              showActions={true}
              collapsible={true}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Filter Values</h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(filterValues, null, 2)}
              </pre>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Filter Types Demonstrated:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ <strong>Checkbox:</strong> Multiple selections (Trạng thái)</li>
                  <li>✅ <strong>Radio:</strong> Single selection (Danh mục)</li>
                  <li>✅ <strong>Range:</strong> Numeric range with min/max (Hoa hồng)</li>
                  <li>✅ <strong>Date:</strong> Date range picker (Thời gian)</li>
                  <li>✅ <strong>Select:</strong> Dropdown selection (Độ ưu tiên)</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Collapsible groups with smooth animations</li>
                  <li>✅ Vietnamese labels throughout</li>
                  <li>✅ Controlled component pattern</li>
                  <li>✅ Apply and Reset buttons</li>
                  <li>✅ Accessible with proper ARIA labels</li>
                  <li>✅ Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Example</h3>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
{`import { AppleFilterPanel, FilterGroup } from '@/components/apple';

const filterGroups: FilterGroup[] = [
  {
    id: 'status',
    label: 'Trạng thái',
    type: 'checkbox',
    options: [
      { label: 'Hoạt động', value: 'active' },
      { label: 'Tạm dừng', value: 'paused' }
    ],
    defaultOpen: true
  },
  {
    id: 'commission',
    label: 'Hoa hồng (%)',
    type: 'range',
    min: 0,
    max: 50,
    step: 5
  }
];

<AppleFilterPanel
  filters={filterGroups}
  values={filterValues}
  onChange={setFilterValues}
  onApply={handleApply}
  onReset={handleReset}
/>`}
          </pre>
        </div>
      </AppleContainer>
    </div>
  );
}
