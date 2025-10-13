import { useState } from 'react';
import { Link } from 'wouter';
import {
  Calendar,
  Download,
  RefreshCw,
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Filter,
  Code,
  Layout,
  BarChart3,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { AppleMetricCard } from '@/components/apple/AppleMetricCard';
import { AppleChart } from '@/components/apple/AppleChart';
import { AppleTable } from '@/components/apple/AppleTable';
import { AppleFilterPanel, FilterGroup } from '@/components/apple/AppleFilterPanel';
import { AppleButton } from '@/components/apple/AppleButton';
import { AppleSelect } from '@/components/apple/AppleSelect';
import { AppleCard } from '@/components/apple/AppleCard';
import { AppleGrid } from '@/components/apple/AppleGrid';
import { ApplePagination } from '@/components/apple/ApplePagination';
import { designTokens } from '@/constants/design-tokens';
import { toast } from 'sonner';

export default function AdvancedDashboardDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'patterns' | 'examples'>('overview');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('30days');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [filterValues, setFilterValues] = useState<Record<string, any>>({
    channels: [],
    category: '',
    dateRange: undefined,
  });

  const dateRangeOptions = [
    { value: '7days', label: '7 ngày qua' },
    { value: '30days', label: '30 ngày qua' },
    { value: '90days', label: '90 ngày qua' },
    { value: 'custom', label: 'Tùy chỉnh' },
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'channels',
      label: 'Kênh bán hàng',
      type: 'checkbox',
      options: [
        { value: 'tiktok', label: 'TikTok Shop' },
        { value: 'shopee', label: 'Shopee' },
        { value: 'lazada', label: 'Lazada' },
        { value: 'website', label: 'Website' },
      ],
      defaultOpen: true,
    },
    {
      id: 'category',
      label: 'Danh mục sản phẩm',
      type: 'select',
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'fashion', label: 'Thời trang' },
        { value: 'beauty', label: 'Làm đẹp' },
        { value: 'electronics', label: 'Điện tử' },
        { value: 'food', label: 'Thực phẩm' },
      ],
      defaultOpen: true,
    },
    {
      id: 'dateRange',
      label: 'Khoảng thời gian',
      type: 'date',
      dateMode: 'range',
      defaultOpen: false,
    },
  ];

  const revenueData = [
    { month: 'T1', value: 125000000 },
    { month: 'T2', value: 145000000 },
    { month: 'T3', value: 165000000 },
    { month: 'T4', value: 152000000 },
    { month: 'T5', value: 178000000 },
    { month: 'T6', value: 195000000 },
  ];

  const ordersData = [
    { category: 'Thời trang', value: 3250 },
    { category: 'Làm đẹp', value: 2890 },
    { category: 'Điện tử', value: 1950 },
    { category: 'Thực phẩm', value: 1420 },
    { category: 'Khác', value: 890 },
  ];

  const channelData = [
    { name: 'TikTok', value: 4500 },
    { name: 'Shopee', value: 3200 },
    { name: 'Lazada', value: 2100 },
    { name: 'Website', value: 1600 },
  ];

  const conversionData = [
    { month: 'T1', value: 2.8 },
    { month: 'T2', value: 3.1 },
    { month: 'T3', value: 3.5 },
    { month: 'T4', value: 3.2 },
    { month: 'T5', value: 3.8 },
    { month: 'T6', value: 4.2 },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Nguyễn Văn A', product: 'Áo thun nam', amount: 250000, status: 'Hoàn thành', date: '15/06/2025' },
    { id: 'ORD-002', customer: 'Trần Thị B', product: 'Son môi', amount: 180000, status: 'Đang xử lý', date: '15/06/2025' },
    { id: 'ORD-003', customer: 'Lê Văn C', product: 'Tai nghe', amount: 450000, status: 'Hoàn thành', date: '14/06/2025' },
    { id: 'ORD-004', customer: 'Phạm Thị D', product: 'Váy dạ hội', amount: 1200000, status: 'Đang vận chuyển', date: '14/06/2025' },
    { id: 'ORD-005', customer: 'Hoàng Văn E', product: 'Giày thể thao', amount: 850000, status: 'Hoàn thành', date: '13/06/2025' },
  ];

  const orderColumns = [
    { key: 'id', header: 'Mã đơn', sortable: true },
    { key: 'customer', header: 'Khách hàng', sortable: true },
    { key: 'product', header: 'Sản phẩm' },
    {
      key: 'amount',
      header: 'Giá trị',
      render: (row: any) => row.amount.toLocaleString('vi-VN') + 'đ',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (row: any) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-md ${
            row.status === 'Hoàn thành'
              ? 'bg-green-100 text-green-700'
              : row.status === 'Đang xử lý'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: 'date', header: 'Ngày đặt', sortable: true },
  ];

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Đã sao chép code!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const basicDashboardCode = `import { AppleMetricCard, AppleChart, AppleTable, AppleCard } from '@/components/apple';

export default function BasicDashboard() {
  const data = [...]; // Your data here

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppleMetricCard
          title="Tổng doanh thu"
          value={195000000}
          change={12.5}
          trend="up"
          suffix="đ"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <AppleMetricCard
          title="Đơn hàng"
          value={8945}
          change={8.2}
          trend="up"
          icon={<ShoppingBag className="w-5 h-5" />}
        />
      </div>

      {/* Chart */}
      <AppleCard>
        <AppleCard.Header title="Biểu đồ doanh thu" />
        <AppleCard.Body>
          <AppleChart
            variant="line"
            data={revenueData}
            dataKey="value"
            categoryKey="month"
            height={300}
          />
        </AppleCard.Body>
      </AppleCard>

      {/* Table */}
      <AppleCard>
        <AppleCard.Header title="Đơn hàng gần đây" />
        <AppleCard.Body>
          <AppleTable columns={columns} data={orders} />
        </AppleCard.Body>
      </AppleCard>
    </div>
  );
}`;

  const analyticsDashboardCode = `import { AppleMetricCard, AppleChart, AppleFilterPanel, AppleCard } from '@/components/apple';

export default function AnalyticsDashboard() {
  const [filters, setFilters] = useState({});

  return (
    <div className="p-6 space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Phân tích chi tiết</h1>
        <div className="flex items-center gap-3">
          <AppleSelect
            options={dateRanges}
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          />
          <AppleButton variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </AppleButton>
          <AppleButton variant="primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </AppleButton>
        </div>
      </div>

      {/* Filters */}
      <AppleFilterPanel
        filters={filterGroups}
        values={filters}
        onChange={setFilters}
        onApply={() => console.log('Apply filters')}
      />

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 4 metric cards */}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppleCard>
          <AppleCard.Header title="Doanh thu theo tháng" />
          <AppleCard.Body>
            <AppleChart variant="area" data={data} />
          </AppleCard.Body>
        </AppleCard>
        <AppleCard>
          <AppleCard.Header title="Đơn hàng theo danh mục" />
          <AppleCard.Body>
            <AppleChart variant="bar" data={data} />
          </AppleCard.Body>
        </AppleCard>
      </div>
    </div>
  );
}`;

  const monitoringDashboardCode = `import { AppleMetricCard, AppleCard, AppleBadge } from '@/components/apple';

export default function MonitoringDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppleMetricCard
          title="Trạng thái hệ thống"
          value="Hoạt động"
          variant="success"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <AppleMetricCard
          title="Người dùng trực tuyến"
          value={1245}
          change={15.2}
          trend="up"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppleCard>
          <AppleCard.Header title="API Status" />
          <AppleCard.Body>
            <div className="space-y-3">
              <StatusIndicator service="Auth API" status="online" />
              <StatusIndicator service="Payment API" status="online" />
              <StatusIndicator service="Notification API" status="warning" />
            </div>
          </AppleCard.Body>
        </AppleCard>
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/design-system" className="text-gray-500 hover:text-gray-700">
                <ChevronDown className="w-5 h-5 rotate-90" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Advanced Dashboard Composition Pattern
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Mẫu thiết kế dashboard nâng cao sử dụng Apple HIG Components
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#ff0086] text-[#ff0086]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              data-testid="tab-overview"
            >
              <Layout className="w-4 h-4 inline mr-2" />
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'patterns'
                  ? 'border-[#ff0086] text-[#ff0086]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              data-testid="tab-patterns"
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Composition Patterns
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'examples'
                  ? 'border-[#ff0086] text-[#ff0086]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              data-testid="tab-examples"
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Examples
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Dashboard Composition Pattern là gì?
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Advanced Dashboard Composition Pattern là một{' '}
                  <strong>mẫu thiết kế (pattern)</strong> cho thấy cách kết hợp các
                  Apple HIG components hiện có để tạo ra dashboard phân tích toàn diện.
                  Đây KHÔNG phải là một component mới, mà là một bộ công thức (recipe)
                  tái sử dụng được.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Lưu ý quan trọng:</strong> Pattern này sử dụng 100% các
                        components có sẵn từ Apple HIG library. Không cần tạo component
                        mới nào cả.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* When to Use */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Khi nào nên sử dụng pattern này?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Nên sử dụng khi:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Cần hiển thị nhiều KPI metrics cùng lúc</li>
                        <li>• Có dữ liệu cần visualize bằng charts</li>
                        <li>• Cần filter và drill-down vào dữ liệu</li>
                        <li>• Xây dựng trang analytics/reporting</li>
                        <li>• Tạo admin dashboard phức tạp</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Filter className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Cân nhắc kỹ khi:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Chỉ hiển thị 1-2 metrics đơn giản</li>
                        <li>• Không cần filtering phức tạp</li>
                        <li>• Trang chỉ có form nhập liệu</li>
                        <li>• Mobile-first app đơn giản</li>
                        <li>• Landing page hoặc marketing page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Lợi ích chính</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Layout className="w-6 h-6 text-[#ff0086]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
                  <p className="text-sm text-gray-600">
                    Tự động adapt layout từ mobile → tablet → desktop với Tailwind grid
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Accessible</h3>
                  <p className="text-sm text-gray-600">
                    ARIA labels, keyboard navigation, screen reader friendly
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Theme-aware</h3>
                  <p className="text-sm text-gray-600">
                    Sử dụng CSS variables, dễ dàng switch theme IKK ↔ Apple
                  </p>
                </div>
              </div>
            </section>

            {/* Live Dashboard Demo */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Demo Dashboard</h2>
                <div className="flex items-center gap-3">
                  <AppleSelect
                    options={dateRangeOptions}
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    name="dateRange"
                    data-testid="select-daterange"
                  />
                  <AppleButton variant="outline" size="sm" data-testid="button-export">
                    <Download className="w-4 h-4 mr-2" />
                    Xuất dữ liệu
                  </AppleButton>
                  <AppleButton variant="primary" size="sm" data-testid="button-refresh">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Làm mới
                  </AppleButton>
                </div>
              </div>

              {/* Filters Panel */}
              <div className="mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4"
                  data-testid="toggle-filters"
                >
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {showFilters && (
                  <AppleFilterPanel
                    filters={filterGroups}
                    values={filterValues}
                    onChange={setFilterValues}
                    onApply={() => toast.success('Đã áp dụng bộ lọc')}
                    onReset={() => {
                      setFilterValues({ channels: [], category: '', dateRange: undefined });
                      toast.success('Đã xóa bộ lọc');
                    }}
                  />
                )}
              </div>

              {/* KPI Cards */}
              <AppleGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="md" className="mb-6">
                <AppleMetricCard
                  title="Tổng doanh thu"
                  value={195000000}
                  change={12.5}
                  trend="up"
                  suffix="đ"
                  icon={<DollarSign className="w-5 h-5" />}
                  variant="default"
                  data-testid="metric-revenue"
                />
                <AppleMetricCard
                  title="Đơn hàng"
                  value={8945}
                  change={8.2}
                  trend="up"
                  icon={<ShoppingBag className="w-5 h-5" />}
                  variant="default"
                  data-testid="metric-orders"
                />
                <AppleMetricCard
                  title="Khách hàng"
                  value={12453}
                  change={-2.4}
                  trend="down"
                  icon={<Users className="w-5 h-5" />}
                  variant="default"
                  data-testid="metric-customers"
                />
                <AppleMetricCard
                  title="Tỷ lệ chuyển đổi"
                  value="4.2"
                  change={15.8}
                  trend="up"
                  suffix="%"
                  icon={<TrendingUp className="w-5 h-5" />}
                  variant="success"
                  data-testid="metric-conversion"
                />
              </AppleGrid>

              {/* Charts Grid */}
              <AppleGrid cols={{ sm: 1, lg: 2 }} gap="lg" className="mb-6">
                <AppleCard variant="elevated">
                  <AppleCard.Header title="Doanh thu theo tháng" subtitle="6 tháng qua" />
                  <AppleCard.Body>
                    <AppleChart
                      variant="area"
                      data={revenueData}
                      dataKey="value"
                      categoryKey="month"
                      height={300}
                      showGrid
                      showTooltip
                    />
                  </AppleCard.Body>
                </AppleCard>

                <AppleCard variant="elevated">
                  <AppleCard.Header
                    title="Đơn hàng theo danh mục"
                    subtitle="Tháng hiện tại"
                  />
                  <AppleCard.Body>
                    <AppleChart
                      variant="bar"
                      data={ordersData}
                      dataKey="value"
                      categoryKey="category"
                      height={300}
                      showGrid
                      showTooltip
                    />
                  </AppleCard.Body>
                </AppleCard>
              </AppleGrid>

              <AppleGrid cols={{ sm: 1, lg: 2 }} gap="lg" className="mb-6">
                <AppleCard variant="elevated">
                  <AppleCard.Header title="Đơn hàng theo kênh" subtitle="30 ngày qua" />
                  <AppleCard.Body>
                    <AppleChart
                      variant="pie"
                      data={channelData}
                      dataKey="value"
                      labelKey="name"
                      height={300}
                      showLegend
                      showTooltip
                    />
                  </AppleCard.Body>
                </AppleCard>

                <AppleCard variant="elevated">
                  <AppleCard.Header
                    title="Tỷ lệ chuyển đổi"
                    subtitle="Xu hướng 6 tháng"
                  />
                  <AppleCard.Body>
                    <AppleChart
                      variant="line"
                      data={conversionData}
                      dataKey="value"
                      categoryKey="month"
                      height={300}
                      showGrid
                      showTooltip
                    />
                  </AppleCard.Body>
                </AppleCard>
              </AppleGrid>

              {/* Data Table */}
              <AppleCard variant="elevated">
                <AppleCard.Header
                  title="Đơn hàng gần đây"
                  actions={
                    <AppleButton size="sm" variant="outline" data-testid="button-viewall">
                      Xem tất cả
                    </AppleButton>
                  }
                />
                <AppleCard.Body>
                  <AppleTable
                    columns={orderColumns}
                    data={recentOrders}
                    striped
                    hoverable
                  />
                  <div className="mt-4 flex justify-center">
                    <ApplePagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                      showFirstLast
                    />
                  </div>
                </AppleCard.Body>
              </AppleCard>
            </section>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            {/* Layout Strategies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Layout Strategies
              </h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Responsive Grid System
                </h3>
                <p className="text-gray-600 mb-4">
                  Sử dụng Tailwind CSS grid với breakpoints để tạo layout responsive:
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      KPI Cards (4 cột):
                    </p>
                    <code className="text-xs text-[#ff0086]">
                      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4
                    </code>
                    <p className="text-xs text-gray-500 mt-2">
                      Mobile: 1 cột | Tablet: 2 cột | Desktop: 4 cột
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Charts Grid (2 cột):
                    </p>
                    <code className="text-xs text-[#ff0086]">
                      grid grid-cols-1 lg:grid-cols-2 gap-6
                    </code>
                    <p className="text-xs text-gray-500 mt-2">
                      Mobile/Tablet: 1 cột | Desktop: 2 cột
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      AppleGrid Component:
                    </p>
                    <code className="text-xs text-[#ff0086]">
                      {`<AppleGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="md">`}
                    </code>
                    <p className="text-xs text-gray-500 mt-2">
                      Prop-based responsive grid configuration
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Component Combinations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Component Combinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Header Pattern
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`<div className="flex justify-between">
  <h1>Dashboard Title</h1>
  <div className="flex gap-3">
    <AppleSelect />
    <AppleButton variant="outline">
      Export
    </AppleButton>
    <AppleButton>Refresh</AppleButton>
  </div>
</div>`}
                    </code>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">KPI Row Pattern</h3>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`<AppleGrid cols={{ lg: 4 }} gap="md">
  <AppleMetricCard
    title="Metric 1"
    value={123}
    change={12.5}
    trend="up"
  />
  {/* 3 more cards */}
</AppleGrid>`}
                    </code>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Chart in Card Pattern
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`<AppleCard>
  <AppleCard.Header
    title="Chart Title"
    subtitle="Description"
  />
  <AppleCard.Body>
    <AppleChart
      variant="line"
      data={data}
    />
  </AppleCard.Body>
</AppleCard>`}
                    </code>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Table with Pagination
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`<AppleCard>
  <AppleCard.Header title="Data" />
  <AppleCard.Body>
    <AppleTable
      columns={cols}
      data={data}
    />
    <ApplePagination
      currentPage={page}
      totalPages={10}
    />
  </AppleCard.Body>
</AppleCard>`}
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Loading States
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Hiển thị skeleton hoặc loading state khi fetch dữ liệu:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`{isLoading ? (
  <AppleSkeleton count={4} height={100} />
) : (
  <AppleMetricCard ... />
)}`}
                    </code>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Empty States
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Xử lý trường hợp không có dữ liệu:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs">
                    <code className="text-[#ff0086]">
                      {`<AppleTable
  columns={cols}
  data={data}
  emptyMessage="Chưa có đơn hàng nào"
/>`}
                    </code>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Mobile Optimization
                  </h3>
                  <p className="text-sm text-gray-600">
                    • Collapse filters panel on mobile (collapsible prop)
                    <br />
                    • Stack charts vertically (grid-cols-1)
                    <br />
                    • Reduce chart height on small screens
                    <br />• Hide less important columns in table on mobile
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Accessibility
                  </h3>
                  <p className="text-sm text-gray-600">
                    • Proper heading hierarchy (h1 → h2 → h3)
                    <br />
                    • ARIA labels cho charts và metrics
                    <br />
                    • data-testid cho tất cả interactive elements
                    <br />• Keyboard navigation support
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Code Examples - Copy & Paste Ready
              </h2>
              <p className="text-gray-600 mb-6">
                Dưới đây là 3 mẫu dashboard hoàn chỉnh bạn có thể sao chép và sử dụng
                ngay:
              </p>

              {/* Example 1: Basic Dashboard */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    1. Basic Dashboard
                  </h3>
                  <p className="text-sm text-pink-100 mt-1">
                    KPIs + 1 Chart + Table - Dashboard đơn giản nhất
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Code className="w-4 h-4" />
                      <span>TypeScript + React</span>
                    </div>
                    <button
                      onClick={() => copyCode(basicDashboardCode, 'basic')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      data-testid="copy-basic"
                    >
                      {copiedCode === 'basic' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{basicDashboardCode}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Example 2: Analytics Dashboard */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    2. Analytics Dashboard
                  </h3>
                  <p className="text-sm text-blue-100 mt-1">
                    KPIs + Multiple Charts + Filters - Dashboard phân tích đầy đủ
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Code className="w-4 h-4" />
                      <span>TypeScript + React</span>
                    </div>
                    <button
                      onClick={() => copyCode(analyticsDashboardCode, 'analytics')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      data-testid="copy-analytics"
                    >
                      {copiedCode === 'analytics' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{analyticsDashboardCode}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Example 3: Monitoring Dashboard */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    3. Monitoring Dashboard
                  </h3>
                  <p className="text-sm text-purple-100 mt-1">
                    Real-time Metrics + Status Indicators - Dashboard giám sát hệ thống
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Code className="w-4 h-4" />
                      <span>TypeScript + React</span>
                    </div>
                    <button
                      onClick={() => copyCode(monitoringDashboardCode, 'monitoring')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      data-testid="copy-monitoring"
                    >
                      {copiedCode === 'monitoring' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Sao chép code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{monitoringDashboardCode}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Reference
              </h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Components Used in Patterns
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleMetricCard</code>
                      <span className="text-gray-500">- KPI metrics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleChart</code>
                      <span className="text-gray-500">- Data visualization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleTable</code>
                      <span className="text-gray-500">- Data tables</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleFilterPanel</code>
                      <span className="text-gray-500">- Filtering</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleCard</code>
                      <span className="text-gray-500">- Widget containers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleGrid</code>
                      <span className="text-gray-500">- Responsive layout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">AppleButton</code>
                      <span className="text-gray-500">- Actions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <code className="text-[#ff0086]">ApplePagination</code>
                      <span className="text-gray-500">- Table pagination</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
