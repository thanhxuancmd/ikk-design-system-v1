import { useState } from 'react';
import {
  AppleHierarchicalTable,
  TreeNode,
  HierarchicalColumn,
  AppleContainer,
  AppleSectionHeader,
  AppleBadge,
  AppleCard,
  AppleSwitch,
} from '@/components/apple';

interface OrgNode {
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'active' | 'away' | 'offline';
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
}

interface CategoryNode {
  name: string;
  productCount: number;
  revenue: string;
}

const orgChartData: TreeNode<OrgNode>[] = [
  {
    id: 1,
    data: {
      name: 'Nguyễn Văn A',
      role: 'CEO',
      department: 'Điều hành',
      email: 'ceo@company.com',
      status: 'active',
    },
    children: [
      {
        id: 2,
        data: {
          name: 'Trần Thị B',
          role: 'CTO',
          department: 'Công nghệ',
          email: 'cto@company.com',
          status: 'active',
        },
        children: [
          {
            id: 3,
            data: {
              name: 'Lê Văn C',
              role: 'Engineering Manager',
              department: 'Phát triển',
              email: 'manager1@company.com',
              status: 'active',
            },
            children: [
              {
                id: 4,
                data: {
                  name: 'Phạm Thị D',
                  role: 'Senior Developer',
                  department: 'Frontend',
                  email: 'dev1@company.com',
                  status: 'active',
                },
              },
              {
                id: 5,
                data: {
                  name: 'Hoàng Văn E',
                  role: 'Senior Developer',
                  department: 'Backend',
                  email: 'dev2@company.com',
                  status: 'away',
                },
              },
            ],
          },
          {
            id: 6,
            data: {
              name: 'Vũ Thị F',
              role: 'QA Manager',
              department: 'Kiểm thử',
              email: 'qa@company.com',
              status: 'active',
            },
          },
        ],
      },
      {
        id: 7,
        data: {
          name: 'Đỗ Văn G',
          role: 'CFO',
          department: 'Tài chính',
          email: 'cfo@company.com',
          status: 'active',
        },
        children: [
          {
            id: 8,
            data: {
              name: 'Bùi Thị H',
              role: 'Accountant',
              department: 'Kế toán',
              email: 'acc@company.com',
              status: 'offline',
            },
          },
        ],
      },
      {
        id: 9,
        data: {
          name: 'Mai Văn I',
          role: 'CMO',
          department: 'Marketing',
          email: 'cmo@company.com',
          status: 'active',
        },
        children: [
          {
            id: 10,
            data: {
              name: 'Đinh Thị J',
              role: 'Marketing Manager',
              department: 'Digital Marketing',
              email: 'mkt@company.com',
              status: 'active',
            },
          },
        ],
      },
    ],
  },
];

const fileSystemData: TreeNode<FileNode>[] = [
  {
    id: 'root',
    data: { name: 'Project Root', type: 'folder', modified: '2025-01-15' },
    children: [
      {
        id: 'src',
        data: { name: 'src', type: 'folder', modified: '2025-01-15' },
        children: [
          {
            id: 'components',
            data: { name: 'components', type: 'folder', modified: '2025-01-14' },
            children: [
              {
                id: 'button',
                data: { name: 'Button.tsx', type: 'file', size: '3.2 KB', modified: '2025-01-14' },
              },
              {
                id: 'input',
                data: { name: 'Input.tsx', type: 'file', size: '2.8 KB', modified: '2025-01-13' },
              },
            ],
          },
          {
            id: 'pages',
            data: { name: 'pages', type: 'folder', modified: '2025-01-15' },
            children: [
              {
                id: 'home',
                data: { name: 'Home.tsx', type: 'file', size: '5.1 KB', modified: '2025-01-15' },
              },
              {
                id: 'about',
                data: { name: 'About.tsx', type: 'file', size: '2.3 KB', modified: '2025-01-12' },
              },
            ],
          },
          {
            id: 'app',
            data: { name: 'App.tsx', type: 'file', size: '1.5 KB', modified: '2025-01-15' },
          },
        ],
      },
      {
        id: 'public',
        data: { name: 'public', type: 'folder', modified: '2025-01-10' },
        children: [
          {
            id: 'logo',
            data: { name: 'logo.svg', type: 'file', size: '4.2 KB', modified: '2025-01-10' },
          },
        ],
      },
      {
        id: 'package',
        data: { name: 'package.json', type: 'file', size: '1.1 KB', modified: '2025-01-15' },
      },
    ],
  },
];

const categoryData: TreeNode<CategoryNode>[] = [
  {
    id: 'electronics',
    data: { name: 'Điện tử', productCount: 1250, revenue: '₫450,000,000' },
    children: [
      {
        id: 'phones',
        data: { name: 'Điện thoại', productCount: 450, revenue: '₫200,000,000' },
        children: [
          {
            id: 'smartphones',
            data: { name: 'Smartphone', productCount: 400, revenue: '₫180,000,000' },
          },
          {
            id: 'feature-phones',
            data: { name: 'Điện thoại cơ bản', productCount: 50, revenue: '₫20,000,000' },
          },
        ],
      },
      {
        id: 'laptops',
        data: { name: 'Laptop', productCount: 300, revenue: '₫150,000,000' },
      },
      {
        id: 'accessories',
        data: { name: 'Phụ kiện', productCount: 500, revenue: '₫100,000,000' },
      },
    ],
  },
  {
    id: 'fashion',
    data: { name: 'Thời trang', productCount: 2000, revenue: '₫300,000,000' },
    children: [
      {
        id: 'mens',
        data: { name: 'Nam', productCount: 800, revenue: '₫120,000,000' },
      },
      {
        id: 'womens',
        data: { name: 'Nữ', productCount: 1000, revenue: '₫150,000,000' },
      },
      {
        id: 'kids',
        data: { name: 'Trẻ em', productCount: 200, revenue: '₫30,000,000' },
      },
    ],
  },
];

export default function HierarchicalTableDemo() {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [showIndentLines, setShowIndentLines] = useState(true);
  const [selectable, setSelectable] = useState(true);

  const orgColumns: HierarchicalColumn<OrgNode>[] = [
    {
      key: 'name',
      header: 'Tên nhân viên',
      render: (node) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{node.data.name}</span>
          <AppleBadge
            variant={
              node.data.status === 'active'
                ? 'success'
                : node.data.status === 'away'
                ? 'warning'
                : 'default'
            }
            size="sm"
          >
            {node.data.status === 'active' ? 'Hoạt động' : node.data.status === 'away' ? 'Vắng mặt' : 'Offline'}
          </AppleBadge>
        </div>
      ),
      width: '35%',
    },
    {
      key: 'role',
      header: 'Vai trò',
      render: (node) => <span className="text-gray-700">{node.data.role}</span>,
      width: '25%',
    },
    {
      key: 'department',
      header: 'Phòng ban',
      render: (node) => <span className="text-gray-600">{node.data.department}</span>,
      width: '20%',
    },
    {
      key: 'email',
      header: 'Email',
      render: (node) => <span className="text-gray-500 text-sm">{node.data.email}</span>,
      width: '20%',
    },
  ];

  const fileColumns: HierarchicalColumn<FileNode>[] = [
    {
      key: 'name',
      header: 'Tên',
      render: (node) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">{node.data.type === 'folder' ? '📁' : '📄'}</span>
          <span className={node.data.type === 'folder' ? 'font-medium' : ''}>{node.data.name}</span>
        </div>
      ),
      width: '50%',
    },
    {
      key: 'size',
      header: 'Kích thước',
      render: (node) => <span className="text-gray-600">{node.data.size || '-'}</span>,
      width: '20%',
      align: 'right',
    },
    {
      key: 'modified',
      header: 'Ngày sửa đổi',
      render: (node) => <span className="text-gray-600">{node.data.modified}</span>,
      width: '30%',
    },
  ];

  const categoryColumns: HierarchicalColumn<CategoryNode>[] = [
    {
      key: 'name',
      header: 'Danh mục',
      render: (node) => <span className="font-medium">{node.data.name}</span>,
      width: '40%',
    },
    {
      key: 'products',
      header: 'Sản phẩm',
      render: (node) => (
        <span className="text-gray-700">{node.data.productCount.toLocaleString()}</span>
      ),
      width: '30%',
      align: 'right',
    },
    {
      key: 'revenue',
      header: 'Doanh thu',
      render: (node) => <span className="text-green-600 font-medium">{node.data.revenue}</span>,
      width: '30%',
      align: 'right',
    },
  ];

  const handleAsyncLoad = async (node: TreeNode<any>): Promise<TreeNode<any>[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return [
      {
        id: `${node.id}-child-1`,
        data: { name: 'Async Child 1', type: 'file', size: '1.2 KB', modified: '2025-01-15' },
      },
      {
        id: `${node.id}-child-2`,
        data: { name: 'Async Child 2', type: 'file', size: '2.3 KB', modified: '2025-01-14' },
      },
    ];
  };

  const handleSelect = (nodeId: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  return (
    <AppleContainer>
      <AppleSectionHeader
        title="AppleHierarchicalTable Demo"
        description="Production-ready hierarchical table with expandable rows following Apple HIG standards"
      />

      <div className="space-y-8">
        <AppleCard>
          <h3 className="text-lg font-semibold mb-4">Configuration</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIndentLines}
                  onChange={(e) => setShowIndentLines(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-[#ff0086] transition-all">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all peer-checked:translate-x-5 shadow-sm" />
                </div>
                <span className="text-sm">Show indent lines</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectable}
                  onChange={(e) => setSelectable(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-[#ff0086] transition-all">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all peer-checked:translate-x-5 shadow-sm" />
                </div>
                <span className="text-sm">Selectable rows</span>
              </label>
            </div>
          </div>
          {selectedIds.size > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: {Array.from(selectedIds).join(', ')}
            </div>
          )}
        </AppleCard>

        <section>
          <h2 className="text-2xl font-bold mb-4">1. Organization Chart</h2>
          <p className="text-gray-600 mb-4">
            Hierarchical employee structure with status badges, multiple columns, and full keyboard navigation.
          </p>
          <AppleHierarchicalTable
            data={orgChartData}
            columns={orgColumns}
            showExpandAll
            showIndentLines={showIndentLines}
            selectable={selectable}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            defaultExpanded={1}
            tableAriaLabel="Organization chart"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. File System Explorer</h2>
          <p className="text-gray-600 mb-4">
            File tree structure with folders and files, showing sizes and modification dates.
          </p>
          <AppleHierarchicalTable
            data={fileSystemData}
            columns={fileColumns}
            showExpandAll
            showIndentLines={showIndentLines}
            indentSize={32}
            defaultExpanded={false}
            tableAriaLabel="File system"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Category Hierarchy</h2>
          <p className="text-gray-600 mb-4">
            Product categories with product counts and revenue metrics. Right-aligned numeric columns.
          </p>
          <AppleHierarchicalTable
            data={categoryData}
            columns={categoryColumns}
            showExpandAll
            showIndentLines={showIndentLines}
            defaultExpanded={true}
            tableAriaLabel="Product categories"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Async Loading Example</h2>
          <p className="text-gray-600 mb-4">
            Demonstrates lazy loading of children. Nodes marked as expandable will load data when expanded.
          </p>
          <AppleHierarchicalTable
            data={[
              {
                id: 'async-1',
                data: { name: 'Parent with Async Children', type: 'folder', modified: '2025-01-15' },
                isExpandable: true,
              },
              {
                id: 'async-2',
                data: { name: 'Another Async Parent', type: 'folder', modified: '2025-01-14' },
                isExpandable: true,
              },
            ]}
            columns={fileColumns}
            showIndentLines={showIndentLines}
            onLoadChildren={handleAsyncLoad}
            tableAriaLabel="Async loading example"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Empty State</h2>
          <p className="text-gray-600 mb-4">
            Shows the empty state when no data is available.
          </p>
          <AppleHierarchicalTable
            data={[]}
            columns={orgColumns}
            labels={{
              noData: 'Chưa có dữ liệu tổ chức',
            }}
            tableAriaLabel="Empty organization chart"
          />
        </section>

        <AppleCard>
          <h3 className="text-lg font-semibold mb-3">Features Demonstrated</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Tree-structured hierarchical data with unlimited nesting</li>
            <li>✅ Expand/collapse functionality with chevron icons</li>
            <li>✅ Expand All / Collapse All buttons</li>
            <li>✅ Controlled and uncontrolled expansion state</li>
            <li>✅ Visual indentation based on depth level</li>
            <li>✅ Optional connecting lines for visual hierarchy</li>
            <li>✅ Row selection with multi-select support</li>
            <li>✅ Lazy loading / async children support</li>
            <li>✅ Loading states for async operations</li>
            <li>✅ Multiple column configurations (name, badges, metrics)</li>
            <li>✅ Column alignment (left, center, right)</li>
            <li>✅ Custom column widths</li>
            <li>✅ Theme-aware styling with CSS variables</li>
            <li>✅ Vietnamese i18n labels</li>
            <li>✅ Full keyboard navigation (Arrow keys, Space, Enter)</li>
            <li>✅ Accessibility (treegrid role, aria-level, aria-expanded)</li>
            <li>✅ Empty state handling</li>
            <li>✅ data-testid attributes for testing</li>
          </ul>
        </AppleCard>

        <AppleCard>
          <h3 className="text-lg font-semibold mb-3">Keyboard Navigation</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex gap-4">
              <kbd className="px-2 py-1 bg-gray-100 rounded border">↑ ↓</kbd>
              <span>Navigate between rows</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-2 py-1 bg-gray-100 rounded border">→</kbd>
              <span>Expand collapsed row</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-2 py-1 bg-gray-100 rounded border">←</kbd>
              <span>Collapse expanded row</span>
            </div>
            <div className="flex gap-4">
              <kbd className="px-2 py-1 bg-gray-100 rounded border">Space / Enter</kbd>
              <span>Toggle expand/collapse or select row</span>
            </div>
          </div>
        </AppleCard>
      </div>
    </AppleContainer>
  );
}
