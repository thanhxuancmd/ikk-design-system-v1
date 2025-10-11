import { useState } from 'react';
import { 
  AppleButton, 
  AppleBadge, 
  AppleSectionHeader,
  AppleInput,
  AppleSelect,
  AppleCheckbox,
  AppleRadioGroup,
  AppleSwitch,
  AppleTextarea,
  AppleTabs,
  AppleBreadcrumbs,
  ApplePagination,
  AppleSidebar,
  AppleNav,
  AppleAlert,
  AppleModal,
  AppleDialog,
  AppleLoading,
  AppleSkeleton,
  AppleTable,
  AppleCard,
  AppleAvatar,
  AppleList,
  AppleContainer,
  AppleGrid,
  AppleStack,
  useAppleToast,
  AppleToastContainer,
  AppleToastProvider,
  PriceDisplay,
  StatsCard,
  RankingBadge,
  StreamCard,
  ProductCard,
  CampaignCard,
  KOCCard,
  CommissionBadge,
  LiveStatusBadge,
  AppleTooltip,
  ApplePopover,
  AppleDropdown,
  AppleCommandPalette,
  AppleChart,
  AppleMetricCard,
  AppleProgressBar,
  AppleGauge
} from '@/components/apple';
import { designTokens } from '@/constants/design-tokens';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { Mail, User, Home, FileText, Settings, ShoppingCart, TrendingUp, Users, Edit, Trash, Download, ChevronRight, Info, HelpCircle, Copy, Search, Command } from 'lucide-react';

function AppleHIGShowcaseContent() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // State for interactive examples
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabsActiveTab, setTabsActiveTab] = useState('home');
  const [radioValue, setRadioValue] = useState('option1');
  const [commandOpen, setCommandOpen] = useState(false);
  const toast = useAppleToast();

  // Sample commands for command palette
  const sampleCommands = [
    {
      id: 'new-campaign',
      label: 'Tạo chiến dịch mới',
      description: 'Bắt đầu một chiến dịch marketing mới',
      icon: <FileText className="w-4 h-4" />,
      category: 'Chiến dịch',
      onSelect: () => {
        toast.success('Đang tạo chiến dịch mới...');
        setCommandOpen(false);
      }
    },
    {
      id: 'search-koc',
      label: 'Tìm kiếm KOC',
      description: 'Tìm KOC phù hợp cho chiến dịch',
      icon: <Search className="w-4 h-4" />,
      category: 'KOC',
      onSelect: () => {
        toast.info('Đang tìm kiếm KOC...');
        setCommandOpen(false);
      }
    },
    {
      id: 'view-analytics',
      label: 'Xem báo cáo',
      description: 'Phân tích hiệu suất chiến dịch',
      icon: <TrendingUp className="w-4 h-4" />,
      category: 'Báo cáo',
      onSelect: () => {
        toast.info('Đang mở báo cáo...');
        setCommandOpen(false);
      }
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      description: 'Điều chỉnh cài đặt hệ thống',
      icon: <Settings className="w-4 h-4" />,
      category: 'Hệ thống',
      onSelect: () => {
        toast.info('Đang mở cài đặt...');
        setCommandOpen(false);
      }
    },
    {
      id: 'invite-user',
      label: 'Mời người dùng',
      description: 'Thêm thành viên mới vào nhóm',
      icon: <User className="w-4 h-4" />,
      category: 'Người dùng',
      onSelect: () => {
        toast.success('Đang gửi lời mời...');
        setCommandOpen(false);
      }
    }
  ];

  // Sample data for Data Visualization components
  const monthlyRevenue = [
    { month: 'T1', revenue: 125000000 },
    { month: 'T2', revenue: 145000000 },
    { month: 'T3', revenue: 168000000 },
    { month: 'T4', revenue: 152000000 },
    { month: 'T5', revenue: 178000000 },
    { month: 'T6', revenue: 195000000 },
    { month: 'T7', revenue: 210000000 },
    { month: 'T8', revenue: 198000000 },
    { month: 'T9', revenue: 225000000 },
    { month: 'T10', revenue: 245000000 },
    { month: 'T11', revenue: 268000000 },
    { month: 'T12', revenue: 290000000 }
  ];

  const kocPerformance = [
    { tier: 'Nano', count: 1250 },
    { tier: 'Micro', count: 850 },
    { tier: 'Macro', count: 320 },
    { tier: 'Celebrity', count: 45 }
  ];

  const campaignMetrics = [
    { date: '01/10', conversion: 12.5 },
    { date: '05/10', conversion: 15.8 },
    { date: '10/10', conversion: 18.2 },
    { date: '15/10', conversion: 22.6 },
    { date: '20/10', conversion: 28.4 },
    { date: '25/10', conversion: 31.2 },
    { date: '30/10', conversion: 35.7 }
  ];

  const productCategories = [
    { name: 'Thời trang', value: 35 },
    { name: 'Làm đẹp', value: 28 },
    { name: 'Ẩm thực', value: 22 },
    { name: 'Công nghệ', value: 15 }
  ];

  const CodeBlock = ({ code, language = 'tsx' }: { code: string; language?: string }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className={designTokens.spacing.sectionSpacing}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid={`heading-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h2>
      {children}
    </section>
  );

  const ComparisonCard = ({
    title,
    before,
    after,
    beforeCode,
    afterCode,
  }: {
    title: string;
    before: React.ReactNode;
    after: React.ReactNode;
    beforeCode: string;
    afterCode: string;
  }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineXCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-700">Before (Inconsistent)</h4>
          </div>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">{before}</div>
          <CodeBlock code={beforeCode} />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-semibold text-gray-700">After (Standardized)</h4>
          </div>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">{after}</div>
          <CodeBlock code={afterCode} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className={`${designTokens.spacing.container} py-12`}>
          <h1 className="text-5xl font-bold text-gray-900 mb-3" data-testid="heading-main">
            Apple HIG Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl" data-testid="text-description">
            Standardized components following Apple Human Interface Guidelines for consistent, 
            accessible, and beautiful user experiences
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className={designTokens.spacing.container}>
          <nav className="flex gap-1 overflow-x-auto py-2">
            {['overview', 'buttons', 'badges', 'headers', 'forms', 'navigation', 'feedback', 'data', 'layout-components', 'advanced', 'data-viz', 'ikk-components', 'recipes', 'guides', 'examples'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#ff0086] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                data-testid={`button-tab-${tab}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className={`${designTokens.spacing.container} py-12`}>
        {/* Design Tokens Section */}
        {activeTab === 'overview' && (
        <Section title="Design Tokens Overview">
          <div className="space-y-8">
            {/* Colors */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Primary Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(designTokens.colors.primary).map(([name, value]) => (
                      <div key={name} className="space-y-2">
                        <div
                          className="h-20 rounded-lg shadow-sm border border-gray-200"
                          style={{ backgroundColor: value }}
                          data-testid={`color-primary-${name}`}
                        />
                        <div className="text-xs">
                          <p className="font-medium">{name}</p>
                          <p className="text-gray-500 font-mono">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Semantic Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(designTokens.colors.semantic).map(([name, value]) => (
                      <div key={name} className="space-y-2">
                        <div
                          className="h-20 rounded-lg shadow-sm border border-gray-200"
                          style={{ backgroundColor: value }}
                          data-testid={`color-semantic-${name}`}
                        />
                        <div className="text-xs">
                          <p className="font-medium">{name}</p>
                          <p className="text-gray-500 font-mono">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Neutral Palette</h4>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {Object.entries(designTokens.colors.neutral).map(([name, value]) => (
                      <div key={name} className="space-y-2">
                        <div
                          className="h-16 rounded-lg shadow-sm border border-gray-200"
                          style={{ backgroundColor: value }}
                          data-testid={`color-neutral-${name}`}
                        />
                        <p className="text-xs font-mono text-center">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Spacing Scale</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Section Spacing</p>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">{designTokens.spacing.sectionSpacing}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Container</p>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">{designTokens.spacing.container}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Component Gaps</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(designTokens.spacing.componentGaps).map(([name, value]) => (
                      <code key={name} className="text-sm bg-gray-100 px-3 py-1 rounded">
                        {name}: {value}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Typography Scale</h3>
              <div className="space-y-4">
                {Object.entries(designTokens.typography).map(([name, className]) => (
                  <div key={name} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <p className="text-sm text-gray-500 mb-1">{name}</p>
                    <p className={className}>The quick brown fox jumps over the lazy dog</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{className}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Buttons Section */}
        {activeTab === 'buttons' && (
        <Section title="Buttons Showcase">
          <div className="space-y-8">
            {/* Live Button Examples */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">All Button Variants</h3>
              
              {(['primary', 'secondary', 'outline'] as const).map((variant) => (
                <div key={variant} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">{variant}</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                      <AppleButton
                        key={size}
                        variant={variant}
                        size={size}
                        data-testid={`button-${variant}-${size}`}
                      >
                        {size.toUpperCase()} Button
                      </AppleButton>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleButton } from '@/components/apple/AppleButton';

<AppleButton variant="primary" size="md">
  Click Me
</AppleButton>

<AppleButton variant="secondary" size="lg">
  Secondary Action
</AppleButton>

<AppleButton variant="outline" size="sm">
  Learn More
</AppleButton>`}
                />
              </div>
            </div>

            {/* Before/After Comparison */}
            <ComparisonCard
              title="Button Standardization"
              before={
                <div className="space-y-3">
                  <button className="bg-pink-600 text-white px-5 py-2 rounded">
                    Inconsistent
                  </button>
                  <button className="bg-gray-200 text-black px-3 py-1.5 rounded-md text-sm">
                    Different Sizes
                  </button>
                  <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full">
                    Mixed Styles
                  </button>
                </div>
              }
              after={
                <div className="space-y-3">
                  <AppleButton variant="primary" size="md">
                    Standardized
                  </AppleButton>
                  <AppleButton variant="secondary" size="md">
                    Consistent Size
                  </AppleButton>
                  <AppleButton variant="outline" size="md">
                    Unified Style
                  </AppleButton>
                </div>
              }
              beforeCode={`// Inconsistent buttons
<button className="bg-pink-600 text-white px-5 py-2 rounded">
<button className="bg-gray-200 text-black px-3 py-1.5 rounded-md text-sm">
<button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full">`}
              afterCode={`// Standardized Apple buttons
<AppleButton variant="primary" size="md">Standardized</AppleButton>
<AppleButton variant="secondary" size="md">Consistent Size</AppleButton>
<AppleButton variant="outline" size="md">Unified Style</AppleButton>`}
            />
          </div>
        </Section>
        )}

        {/* Badges Section */}
        {activeTab === 'badges' && (
        <Section title="Badges Showcase">
          <div className="space-y-8">
            {/* Live Badge Examples */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">All Badge Variants</h3>
              
              {(['sm', 'md'] as const).map((size) => (
                <div key={size} className="mb-6 last:mb-0">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Size: {size.toUpperCase()}</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    {(['default', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
                      <AppleBadge
                        key={variant}
                        variant={variant}
                        size={size}
                        data-testid={`badge-${variant}-${size}`}
                      >
                        {variant}
                      </AppleBadge>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleBadge } from '@/components/apple/AppleBadge';

<AppleBadge variant="success" size="md">Active</AppleBadge>
<AppleBadge variant="warning" size="sm">Pending</AppleBadge>
<AppleBadge variant="error" size="md">Failed</AppleBadge>`}
                />
              </div>
            </div>

            {/* Before/After Comparison */}
            <ComparisonCard
              title="Badge Standardization"
              before={
                <div className="space-x-2">
                  <span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs">
                    Active
                  </span>
                  <span className="bg-yellow-100 px-2 py-0.5 text-sm">
                    Warning
                  </span>
                  <span className="bg-red-500 text-white px-4 py-1.5 rounded">
                    Error
                  </span>
                </div>
              }
              after={
                <div className="space-x-2">
                  <AppleBadge variant="success" size="md">Active</AppleBadge>
                  <AppleBadge variant="warning" size="md">Warning</AppleBadge>
                  <AppleBadge variant="error" size="md">Error</AppleBadge>
                </div>
              }
              beforeCode={`// Inconsistent badges
<span className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs">
<span className="bg-yellow-100 px-2 py-0.5 text-sm">
<span className="bg-red-500 text-white px-4 py-1.5 rounded">`}
              afterCode={`// Standardized Apple badges
<AppleBadge variant="success" size="md">Active</AppleBadge>
<AppleBadge variant="warning" size="md">Warning</AppleBadge>
<AppleBadge variant="error" size="md">Error</AppleBadge>`}
            />
          </div>
        </Section>
        )}

        {/* Section Headers Section */}
        {activeTab === 'headers' && (
        <Section title="Section Headers Showcase">
          <div className="space-y-8">
            {/* Live Examples */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Standard Section Header Patterns</h3>
              
              <div className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <AppleSectionHeader
                    title="Dashboard Overview"
                    description="View your performance metrics and analytics"
                  />
                  <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
                    Content goes here...
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <AppleSectionHeader
                    title="Campaign Management"
                    description="Create and manage your marketing campaigns"
                    actionButtons={[
                      { label: 'New Campaign', onClick: () => {}, variant: 'primary' },
                      { label: 'View All', onClick: () => {}, variant: 'outline' },
                    ]}
                  />
                  <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
                    Content goes here...
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <AppleSectionHeader
                    title="Team Members"
                    actionButtons={[
                      { label: 'Invite', onClick: () => {}, variant: 'primary' },
                    ]}
                  />
                  <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
                    Content goes here...
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleSectionHeader } from '@/components/apple/AppleSectionHeader';

<AppleSectionHeader
  title="Campaign Management"
  description="Create and manage your marketing campaigns"
  actionButtons={[
    { label: 'New Campaign', onClick: handleCreate, variant: 'primary' },
    { label: 'View All', onClick: handleViewAll, variant: 'outline' },
  ]}
/>`}
                />
              </div>
            </div>

            {/* Before/After Comparison */}
            <ComparisonCard
              title="Section Header Standardization"
              before={
                <div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">My Section</h2>
                      <p className="text-sm text-gray-500 mt-1">Some description</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        Action
                      </button>
                    </div>
                  </div>
                </div>
              }
              after={
                <AppleSectionHeader
                  title="My Section"
                  description="Some description"
                  actionButtons={[
                    { label: 'Action', onClick: () => {}, variant: 'primary' },
                  ]}
                />
              }
              beforeCode={`// Inconsistent section header
<div className="flex justify-between mb-4">
  <div>
    <h2 className="text-xl font-semibold">My Section</h2>
    <p className="text-sm text-gray-500 mt-1">Some description</p>
  </div>
  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
    Action
  </button>
</div>`}
              afterCode={`// Standardized Apple section header
<AppleSectionHeader
  title="My Section"
  description="Some description"
  actionButtons={[
    { label: 'Action', onClick: handleAction, variant: 'primary' },
  ]}
/>`}
            />
          </div>
        </Section>
        )}

        {/* Forms Section */}
        {activeTab === 'forms' && (
        <Section title="Form Components Showcase">
          <div className="space-y-8">
            {/* AppleInput */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleInput - Text Inputs</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
                  <div className="space-y-4">
                    <AppleInput 
                      label="Small Input" 
                      placeholder="Nhập văn bản..." 
                      data-testid="input-small"
                    />
                    <AppleInput 
                      label="Medium Input (Default)" 
                      placeholder="Nhập email của bạn..." 
                      data-testid="input-medium"
                    />
                    <AppleInput 
                      label="Large Input" 
                      placeholder="Nhập tên đầy đủ..." 
                      data-testid="input-large"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">With Icons & States</h4>
                  <div className="space-y-4">
                    <AppleInput 
                      label="Email" 
                      placeholder="email@example.com" 
                      leftIcon={<Mail className="w-4 h-4" />}
                      data-testid="input-with-icon"
                    />
                    <AppleInput 
                      label="Disabled Input" 
                      value="Không thể chỉnh sửa"
                      disabled
                      data-testid="input-disabled"
                    />
                    <AppleInput 
                      label="Input với lỗi" 
                      placeholder="Nhập số điện thoại"
                      error="Số điện thoại không hợp lệ"
                      data-testid="input-error"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleInput } from '@/components/apple';

<AppleInput 
  label="Email" 
  placeholder="email@example.com"
  leftIcon={<Mail className="w-4 h-4" />}
  error={errors.email}
/>`}
                />
              </div>
            </div>

            {/* AppleSelect */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleSelect - Dropdown Select</h3>
              
              <div className="space-y-4">
                <AppleSelect
                  label="Chọn quốc gia"
                  options={[
                    { value: 'vn', label: 'Việt Nam' },
                    { value: 'us', label: 'United States' },
                    { value: 'jp', label: 'Japan' },
                  ]}
                  data-testid="select-country"
                />
                <AppleSelect
                  label="Disabled Select"
                  options={[{ value: '1', label: 'Option 1' }]}
                  disabled
                  data-testid="select-disabled"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleSelect } from '@/components/apple';

<AppleSelect
  label="Chọn quốc gia"
  options={[
    { value: 'vn', label: 'Việt Nam' },
    { value: 'us', label: 'United States' }
  ]}
/>`}
                />
              </div>
            </div>

            {/* AppleCheckbox & AppleRadio */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleCheckbox & AppleRadio</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Checkboxes</h4>
                  <div className="space-y-3">
                    <AppleCheckbox 
                      label="Tôi đồng ý với điều khoản" 
                      data-testid="checkbox-terms"
                    />
                    <AppleCheckbox 
                      label="Nhận thông báo qua email" 
                      description="Chúng tôi sẽ gửi cập nhật quan trọng"
                      data-testid="checkbox-notifications"
                    />
                    <AppleCheckbox 
                      label="Disabled checkbox" 
                      disabled 
                      data-testid="checkbox-disabled"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Radio Group</h4>
                  <AppleRadioGroup
                    label="Chọn gói dịch vụ"
                    name="plan"
                    value={radioValue}
                    onChange={setRadioValue}
                    options={[
                      { value: 'option1', label: 'Gói Basic', description: '100,000đ/tháng' },
                      { value: 'option2', label: 'Gói Pro', description: '300,000đ/tháng' },
                      { value: 'option3', label: 'Gói Enterprise', description: 'Liên hệ' },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleCheckbox, AppleRadioGroup } from '@/components/apple';

<AppleCheckbox 
  label="Tôi đồng ý với điều khoản" 
  description="Vui lòng đọc kỹ trước khi đồng ý"
/>

<AppleRadioGroup
  label="Chọn gói dịch vụ"
  name="plan"
  value={value}
  onChange={setValue}
  options={[
    { value: 'basic', label: 'Gói Basic' },
    { value: 'pro', label: 'Gói Pro' }
  ]}
/>`}
                />
              </div>
            </div>

            {/* AppleSwitch */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleSwitch - Toggle Switch</h3>
              
              <div className="space-y-4">
                <AppleSwitch 
                  label="Bật thông báo" 
                  description="Nhận cập nhật về chiến dịch mới"
                  data-testid="switch-notifications"
                />
                <AppleSwitch 
                  label="Chế độ tối" 
                  data-testid="switch-dark-mode"
                />
                <AppleSwitch 
                  label="Disabled switch" 
                  disabled 
                  data-testid="switch-disabled"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleSwitch } from '@/components/apple';

<AppleSwitch 
  label="Bật thông báo" 
  description="Nhận cập nhật về chiến dịch mới"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`}
                />
              </div>
            </div>

            {/* AppleTextarea */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleTextarea - Multi-line Text</h3>
              
              <div className="space-y-4">
                <AppleTextarea
                  label="Mô tả chiến dịch"
                  placeholder="Nhập mô tả chi tiết về chiến dịch của bạn..."
                  rows={4}
                  data-testid="textarea-description"
                />
                <AppleTextarea
                  label="Ghi chú (với giới hạn)"
                  placeholder="Nhập ghi chú..."
                  rows={3}
                  maxLength={200}
                  showCount
                  data-testid="textarea-with-count"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleTextarea } from '@/components/apple';

<AppleTextarea
  label="Mô tả chiến dịch"
  placeholder="Nhập mô tả..."
  rows={4}
  maxLength={500}
  showCount
/>`}
                />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Navigation Section */}
        {activeTab === 'navigation' && (
        <Section title="Navigation Components Showcase">
          <div className="space-y-8">
            {/* AppleTabs */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleTabs - Tab Navigation</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Underline Variant</h4>
                  <AppleTabs
                    tabs={[
                      { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
                      { id: 'profile', label: 'Hồ sơ', icon: <User className="w-4 h-4" /> },
                      { id: 'settings', label: 'Cài đặt', icon: <Settings className="w-4 h-4" /> },
                    ]}
                    activeTab={tabsActiveTab}
                    onChange={setTabsActiveTab}
                    variant="underline"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Pills Variant</h4>
                  <AppleTabs
                    tabs={[
                      { id: 'tab1', label: 'Tất cả' },
                      { id: 'tab2', label: 'Đang hoạt động' },
                      { id: 'tab3', label: 'Hoàn thành' },
                    ]}
                    activeTab="tab1"
                    onChange={() => {}}
                    variant="pills"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleTabs } from '@/components/apple';

<AppleTabs
  tabs={[
    { id: 'home', label: 'Trang chủ', icon: <Home /> },
    { id: 'profile', label: 'Hồ sơ', icon: <User /> }
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>`}
                />
              </div>
            </div>

            {/* AppleBreadcrumbs */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleBreadcrumbs - Navigation Path</h3>
              
              <div className="space-y-4">
                <AppleBreadcrumbs
                  items={[
                    { label: 'Trang chủ', onClick: () => console.log('Home') },
                    { label: 'Chiến dịch', onClick: () => console.log('Campaigns') },
                    { label: 'Chi tiết chiến dịch' },
                  ]}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleBreadcrumbs } from '@/components/apple';

<AppleBreadcrumbs
  items={[
    { label: 'Trang chủ', onClick: () => navigate('/') },
    { label: 'Chiến dịch', onClick: () => navigate('/campaigns') },
    { label: 'Chi tiết chiến dịch' }
  ]}
/>`}
                />
              </div>
            </div>

            {/* ApplePagination */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">ApplePagination - Page Navigation</h3>
              
              <div className="space-y-4">
                <ApplePagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                  showFirstLast
                  data-testid="pagination-example"
                />
                <p className="text-sm text-gray-600">Current Page: {currentPage}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { ApplePagination } from '@/components/apple';

<ApplePagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showFirstLast
/>`}
                />
              </div>
            </div>

            {/* AppleSidebar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleSidebar - Vertical Navigation</h3>
              
              <div className="h-96 border border-gray-200 rounded-lg overflow-hidden">
                <AppleSidebar
                  items={[
                    { id: '1', label: 'Trang chủ', icon: <Home className="w-5 h-5" /> },
                    { id: '2', label: 'Chiến dịch', icon: <FileText className="w-5 h-5" />, badge: 5 },
                    { id: '3', label: 'Người dùng', icon: <User className="w-5 h-5" /> },
                    { id: '4', label: 'Cài đặt', icon: <Settings className="w-5 h-5" /> },
                  ]}
                  activeItem="1"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleSidebar } from '@/components/apple';

<AppleSidebar
  items={[
    { id: '1', label: 'Trang chủ', icon: <Home /> },
    { id: '2', label: 'Chiến dịch', icon: <FileText />, badge: 5 }
  ]}
  activeItem={activeItem}
/>`}
                />
              </div>
            </div>

            {/* AppleNav */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleNav - Horizontal Navigation Bar</h3>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <AppleNav
                  logo={<span className="font-bold text-xl text-[#ff0086]">IKK</span>}
                  items={[
                    { id: '1', label: 'Trang chủ' },
                    { id: '2', label: 'Chiến dịch' },
                    { id: '3', label: 'KOC' },
                  ]}
                  actions={
                    <AppleButton variant="primary" size="sm" data-testid="button-nav-action">
                      Đăng nhập
                    </AppleButton>
                  }
                  activeItem="1"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleNav } from '@/components/apple';

<AppleNav
  logo={<Logo />}
  items={[
    { id: '1', label: 'Trang chủ' },
    { id: '2', label: 'Chiến dịch' }
  ]}
  actions={<Button>Đăng nhập</Button>}
  activeItem={activeItem}
/>`}
                />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
        <Section title="Feedback Components Showcase">
          <div className="space-y-8">
            {/* AppleToast */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleToast - Toast Notifications</h3>
              
              <div className="flex flex-wrap gap-3">
                <AppleButton 
                  variant="primary" 
                  onClick={() => toast.success('Thành công! Thao tác đã hoàn thành.')}
                  data-testid="button-toast-success"
                >
                  Show Success Toast
                </AppleButton>
                <AppleButton 
                  variant="secondary" 
                  onClick={() => toast.error('Lỗi! Vui lòng thử lại.')}
                  data-testid="button-toast-error"
                >
                  Show Error Toast
                </AppleButton>
                <AppleButton 
                  variant="outline" 
                  onClick={() => toast.warning('Cảnh báo! Hành động này không thể hoàn tác.')}
                  data-testid="button-toast-warning"
                >
                  Show Warning Toast
                </AppleButton>
                <AppleButton 
                  variant="outline" 
                  onClick={() => toast.info('Thông tin: Có 3 chiến dịch mới.')}
                  data-testid="button-toast-info"
                >
                  Show Info Toast
                </AppleButton>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { useAppleToast } from '@/components/apple';

function MyComponent() {
  const toast = useAppleToast();
  
  const handleSubmit = () => {
    toast.success('Thành công! Thao tác đã hoàn thành.');
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
}`}
                />
              </div>
            </div>

            {/* AppleAlert */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleAlert - Alert Messages</h3>
              
              <div className="space-y-4">
                <AppleAlert severity="success" title="Thành công">
                  Chiến dịch của bạn đã được tạo thành công!
                </AppleAlert>
                <AppleAlert severity="error" title="Lỗi">
                  Không thể kết nối đến server. Vui lòng thử lại.
                </AppleAlert>
                <AppleAlert severity="warning" title="Cảnh báo">
                  Chiến dịch sắp hết hạn. Vui lòng gia hạn.
                </AppleAlert>
                <AppleAlert severity="info" title="Thông tin">
                  Có 5 KOC mới đăng ký tham gia chiến dịch.
                </AppleAlert>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleAlert } from '@/components/apple';

<AppleAlert severity="success" title="Thành công">
  Chiến dịch của bạn đã được tạo thành công!
</AppleAlert>

<AppleAlert severity="error" title="Lỗi">
  Không thể kết nối đến server.
</AppleAlert>`}
                />
              </div>
            </div>

            {/* AppleModal */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleModal - Modal Dialog</h3>
              
              <AppleButton 
                variant="primary" 
                onClick={() => setModalOpen(true)}
                data-testid="button-open-modal"
              >
                Open Modal
              </AppleButton>

              <AppleModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Chi tiết chiến dịch"
                size="lg"
                footer={
                  <div className="flex justify-end gap-3">
                    <AppleButton 
                      variant="outline" 
                      onClick={() => setModalOpen(false)}
                      data-testid="button-modal-cancel"
                    >
                      Hủy
                    </AppleButton>
                    <AppleButton 
                      variant="primary" 
                      onClick={() => setModalOpen(false)}
                      data-testid="button-modal-confirm"
                    >
                      Xác nhận
                    </AppleButton>
                  </div>
                }
              >
                <p className="text-gray-600">
                  Đây là nội dung của modal. Bạn có thể thêm bất kỳ nội dung nào vào đây.
                </p>
              </AppleModal>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleModal } from '@/components/apple';

<AppleModal
  open={open}
  onClose={() => setOpen(false)}
  title="Chi tiết chiến dịch"
  footer={<Button onClick={handleSave}>Lưu</Button>}
>
  <p>Modal content here...</p>
</AppleModal>`}
                />
              </div>
            </div>

            {/* AppleDialog */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleDialog - Confirmation Dialog</h3>
              
              <div className="flex gap-3">
                <AppleButton 
                  variant="primary" 
                  onClick={() => setDialogOpen(true)}
                  data-testid="button-open-dialog"
                >
                  Open Dialog
                </AppleButton>
              </div>

              <AppleDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title="Xác nhận xóa"
                description="Bạn có chắc chắn muốn xóa chiến dịch này? Hành động này không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
                variant="danger"
                onConfirm={() => {
                  console.log('Confirmed');
                  setDialogOpen(false);
                }}
                onCancel={() => setDialogOpen(false)}
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleDialog } from '@/components/apple';

<AppleDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Xác nhận xóa"
  description="Bạn có chắc chắn muốn xóa?"
  confirmText="Xóa"
  cancelText="Hủy"
  variant="danger"
  onConfirm={handleDelete}
/>`}
                />
              </div>
            </div>

            {/* AppleLoading */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleLoading - Loading Indicators</h3>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <AppleLoading size="sm" />
                  <p className="text-sm text-gray-600 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <AppleLoading size="md" text="Đang tải..." />
                  <p className="text-sm text-gray-600 mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <AppleLoading size="lg" />
                  <p className="text-sm text-gray-600 mt-2">Large</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleLoading } from '@/components/apple';

<AppleLoading size="md" text="Đang tải..." />

{/* Full screen loading */}
<AppleLoading fullScreen text="Đang xử lý..." />`}
                />
              </div>
            </div>

            {/* AppleSkeleton */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleSkeleton - Content Placeholders</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Text Skeletons</h4>
                  <div className="space-y-2">
                    <AppleSkeleton variant="text" width="100%" />
                    <AppleSkeleton variant="text" width="80%" />
                    <AppleSkeleton variant="text" width="60%" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Other Shapes</h4>
                  <div className="flex items-center gap-4">
                    <AppleSkeleton variant="circular" width={60} height={60} />
                    <div className="flex-1 space-y-2">
                      <AppleSkeleton variant="rectangular" width="100%" height={100} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleSkeleton } from '@/components/apple';

<AppleSkeleton variant="text" width="100%" />
<AppleSkeleton variant="circular" width={60} height={60} />
<AppleSkeleton variant="rectangular" width="100%" height={100} />`}
                />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Data Display Section */}
        {activeTab === 'data' && (
        <Section title="Data Display Components Showcase">
          <div className="space-y-8">
            {/* AppleTable */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleTable - Data Tables</h3>
              
              <AppleTable
                columns={[
                  { key: 'name', header: 'Tên', sortable: true },
                  { key: 'role', header: 'Vai trò', sortable: true },
                  { key: 'status', header: 'Trạng thái', render: (row) => (
                    <AppleBadge variant={row.status === 'active' ? 'success' : 'default'} size="sm">
                      {row.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                    </AppleBadge>
                  )},
                ]}
                data={[
                  { name: 'Nguyễn Văn A', role: 'KOC', status: 'active' },
                  { name: 'Trần Thị B', role: 'Brand', status: 'active' },
                  { name: 'Lê Văn C', role: 'Admin', status: 'inactive' },
                ]}
                striped
                hoverable
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleTable } from '@/components/apple';

<AppleTable
  columns={[
    { key: 'name', header: 'Tên', sortable: true },
    { key: 'status', header: 'Trạng thái', render: (row) => (
      <Badge>{row.status}</Badge>
    )}
  ]}
  data={data}
  striped
  hoverable
/>`}
                />
              </div>
            </div>

            {/* AppleCard */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleCard - Content Cards</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AppleCard variant="elevated" hoverable>
                  <AppleCard.Header 
                    title="Chiến dịch Tết 2024" 
                    subtitle="Kết thúc sau 5 ngày"
                  />
                  <AppleCard.Body>
                    <p className="text-gray-600">
                      Chiến dịch quảng bá sản phẩm trong dịp Tết Nguyên Đán.
                    </p>
                  </AppleCard.Body>
                  <AppleCard.Footer>
                    <AppleButton variant="outline" size="sm" data-testid="button-card-view">
                      Xem chi tiết
                    </AppleButton>
                  </AppleCard.Footer>
                </AppleCard>

                <AppleCard variant="outlined">
                  <AppleCard.Header title="KOC Analytics" />
                  <AppleCard.Body>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total KOCs</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active</span>
                        <span className="font-semibold">987</span>
                      </div>
                    </div>
                  </AppleCard.Body>
                </AppleCard>

                <AppleCard variant="filled">
                  <AppleCard.Image 
                    src="https://images.unsplash.com/photo-1557683316-973673baf926" 
                    alt="Campaign" 
                    height="h-40"
                  />
                  <AppleCard.Body>
                    <h4 className="font-semibold mb-1">Summer Sale</h4>
                    <p className="text-sm text-gray-600">Special discount campaign</p>
                  </AppleCard.Body>
                </AppleCard>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleCard } from '@/components/apple';

<AppleCard variant="elevated" hoverable>
  <AppleCard.Header 
    title="Chiến dịch Tết 2024" 
    subtitle="Kết thúc sau 5 ngày"
  />
  <AppleCard.Body>
    <p>Chiến dịch quảng bá sản phẩm...</p>
  </AppleCard.Body>
  <AppleCard.Footer>
    <Button>Xem chi tiết</Button>
  </AppleCard.Footer>
</AppleCard>`}
                />
              </div>
            </div>

            {/* AppleAvatar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleAvatar - User Avatars</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
                  <div className="flex items-center gap-4">
                    <AppleAvatar name="Nguyễn Văn A" size="xs" />
                    <AppleAvatar name="Trần Thị B" size="sm" />
                    <AppleAvatar name="Lê Văn C" size="md" />
                    <AppleAvatar name="Phạm Thị D" size="lg" />
                    <AppleAvatar name="Hoàng Văn E" size="xl" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">With Status</h4>
                  <div className="flex items-center gap-4">
                    <AppleAvatar name="User 1" size="lg" status="online" />
                    <AppleAvatar name="User 2" size="lg" status="offline" />
                    <AppleAvatar name="User 3" size="lg" status="away" />
                    <AppleAvatar name="User 4" size="lg" status="busy" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleAvatar } from '@/components/apple';

<AppleAvatar 
  name="Nguyễn Văn A" 
  size="md" 
  status="online"
/>

<AppleAvatar 
  src="/path/to/image.jpg"
  name="Trần Thị B"
  size="lg"
/>`}
                />
              </div>
            </div>

            {/* AppleList */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleList - List Items</h3>
              
              <AppleList
                items={[
                  {
                    id: '1',
                    title: 'Chiến dịch Tết 2024',
                    description: 'Kết thúc sau 5 ngày',
                    avatar: { name: 'CT' },
                    badge: 'Mới',
                    actions: <AppleButton variant="outline" size="sm" data-testid="button-list-action-1">Xem</AppleButton>
                  },
                  {
                    id: '2',
                    title: 'Summer Sale',
                    description: 'Đang hoạt động',
                    avatar: { name: 'SS' },
                    badge: 15,
                    actions: <AppleButton variant="outline" size="sm" data-testid="button-list-action-2">Xem</AppleButton>
                  },
                  {
                    id: '3',
                    title: 'Black Friday 2024',
                    description: 'Sắp diễn ra',
                    avatar: { name: 'BF' },
                  },
                ]}
                divided
                hoverable
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleList } from '@/components/apple';

<AppleList
  items={[
    {
      id: '1',
      title: 'Chiến dịch Tết 2024',
      description: 'Kết thúc sau 5 ngày',
      avatar: { name: 'CT' },
      badge: 'Mới',
      actions: <Button>Xem</Button>
    }
  ]}
  divided
  hoverable
/>`}
                />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Layout Components Section */}
        {activeTab === 'layout-components' && (
        <Section title="Layout Components Showcase">
          <div className="space-y-8">
            {/* AppleContainer */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleContainer - Responsive Containers</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Different Max Widths</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4">
                      <AppleContainer maxWidth="sm">
                        <div className="bg-blue-100 p-4 rounded text-center">
                          Small Container (max-w-640px)
                        </div>
                      </AppleContainer>
                    </div>
                    <div className="bg-gray-50 p-4">
                      <AppleContainer maxWidth="md">
                        <div className="bg-blue-100 p-4 rounded text-center">
                          Medium Container (max-w-768px)
                        </div>
                      </AppleContainer>
                    </div>
                    <div className="bg-gray-50 p-4">
                      <AppleContainer maxWidth="lg">
                        <div className="bg-blue-100 p-4 rounded text-center">
                          Large Container (max-w-1024px)
                        </div>
                      </AppleContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleContainer } from '@/components/apple';

<AppleContainer maxWidth="lg" padding center>
  <h1>Page Content</h1>
  <p>Your content here...</p>
</AppleContainer>`}
                />
              </div>
            </div>

            {/* AppleGrid */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleGrid - Responsive Grid Layouts</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">2-Column Grid</h4>
                  <AppleGrid cols={2} gap="md">
                    <div className="bg-blue-100 p-4 rounded">Column 1</div>
                    <div className="bg-blue-100 p-4 rounded">Column 2</div>
                  </AppleGrid>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">3-Column Grid</h4>
                  <AppleGrid cols={3} gap="md">
                    <div className="bg-green-100 p-4 rounded">Column 1</div>
                    <div className="bg-green-100 p-4 rounded">Column 2</div>
                    <div className="bg-green-100 p-4 rounded">Column 3</div>
                  </AppleGrid>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">4-Column Grid with Small Gap</h4>
                  <AppleGrid cols={4} gap="sm">
                    <div className="bg-purple-100 p-4 rounded">1</div>
                    <div className="bg-purple-100 p-4 rounded">2</div>
                    <div className="bg-purple-100 p-4 rounded">3</div>
                    <div className="bg-purple-100 p-4 rounded">4</div>
                  </AppleGrid>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Responsive Grid</h4>
                  <AppleGrid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
                    <div className="bg-orange-100 p-4 rounded">Item 1</div>
                    <div className="bg-orange-100 p-4 rounded">Item 2</div>
                    <div className="bg-orange-100 p-4 rounded">Item 3</div>
                  </AppleGrid>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleGrid } from '@/components/apple';

<AppleGrid cols={3} gap="md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</AppleGrid>

{/* Responsive */}
<AppleGrid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <Card />
  <Card />
  <Card />
</AppleGrid>`}
                />
              </div>
            </div>

            {/* AppleStack */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleStack - Flex Stacks</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Vertical Stack (Default)</h4>
                  <AppleStack direction="vertical" spacing="md">
                    <div className="bg-pink-100 p-4 rounded">Item 1</div>
                    <div className="bg-pink-100 p-4 rounded">Item 2</div>
                    <div className="bg-pink-100 p-4 rounded">Item 3</div>
                  </AppleStack>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Horizontal Stack</h4>
                  <AppleStack direction="horizontal" spacing="md">
                    <div className="bg-cyan-100 p-4 rounded">Item 1</div>
                    <div className="bg-cyan-100 p-4 rounded">Item 2</div>
                    <div className="bg-cyan-100 p-4 rounded">Item 3</div>
                  </AppleStack>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">With Different Spacing</h4>
                  <AppleStack direction="horizontal" spacing="xs">
                    <div className="bg-yellow-100 p-2 rounded text-sm">xs</div>
                    <div className="bg-yellow-100 p-2 rounded text-sm">spacing</div>
                  </AppleStack>
                  <div className="mt-4">
                    <AppleStack direction="horizontal" spacing="xl">
                      <div className="bg-yellow-100 p-2 rounded text-sm">xl</div>
                      <div className="bg-yellow-100 p-2 rounded text-sm">spacing</div>
                    </AppleStack>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">With Alignment Options</h4>
                  <AppleStack direction="horizontal" spacing="md" align="center" justify="between">
                    <div className="bg-teal-100 p-4 rounded">Start</div>
                    <div className="bg-teal-100 p-4 rounded">Center aligned, space between</div>
                    <div className="bg-teal-100 p-4 rounded">End</div>
                  </AppleStack>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Usage Example</h4>
                <CodeBlock
                  code={`import { AppleStack } from '@/components/apple';

<AppleStack direction="vertical" spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
</AppleStack>

<AppleStack 
  direction="horizontal" 
  spacing="lg" 
  align="center" 
  justify="between"
>
  <Button>Cancel</Button>
  <Button>Save</Button>
</AppleStack>`}
                />
              </div>
            </div>

            {/* Design Tokens Reference */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Design Tokens for Layout</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Container Width</p>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">{designTokens.spacing.container}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Section Spacing</p>
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">{designTokens.spacing.sectionSpacing}</code>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Component Gaps</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(designTokens.spacing.componentGaps).map(([name, value]) => (
                      <code key={name} className="text-sm bg-gray-100 px-3 py-1 rounded">
                        {name}: {value}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Recipes & Patterns Section */}
        {activeTab === 'recipes' && (
        <>
        <Section title="Composition Recipes & Patterns">
          <p className="text-gray-600 mb-8">
            Các mẫu thiết kế thực tế kết hợp nhiều components để tạo giao diện hoàn chỉnh cho nền tảng IKK
          </p>

          <div className="space-y-12">
            {/* Pattern 1: Stream Grid Layout */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4" data-testid="heading-pattern-stream-grid">
                1. Stream Grid Layout
              </h3>
              <p className="text-gray-600 mb-6">
                Hiển thị danh sách livestream dạng lưới với bộ lọc và tiêu đề phần. Thích hợp cho trang khám phá livestream.
              </p>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg" data-testid="example-stream-grid">
                <AppleSectionHeader 
                  title="Livestream Đang Diễn Ra"
                  description="Khám phá các livestream hot nhất từ KOCs"
                  actionButtons={[
                    { label: 'Xem tất cả', onClick: () => {}, variant: 'outline' },
                  ]}
                />
                <div className="mb-4 flex gap-2 flex-wrap">
                  <AppleButton variant="primary" size="sm">Tất cả</AppleButton>
                  <AppleButton variant="outline" size="sm">Làm đẹp</AppleButton>
                  <AppleButton variant="outline" size="sm">Thời trang</AppleButton>
                  <AppleButton variant="outline" size="sm">Ẩm thực</AppleButton>
                </div>
                <AppleGrid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
                  <StreamCard
                    id="stream-1"
                    title="Review son môi hot trend 2024 - Sale 50%"
                    streamerName="Minh Anh Beauty"
                    thumbnail="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
                    viewerCount={12500}
                    isLive={true}
                    category="Làm đẹp"
                  />
                  <StreamCard
                    id="stream-2"
                    title="Haul đồ SHEIN siêu rẻ - Freeship 0đ"
                    streamerName="Fashion Queen"
                    thumbnail="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"
                    viewerCount={8300}
                    isLive={true}
                    category="Thời trang"
                  />
                  <StreamCard
                    id="stream-3"
                    title="Nấu ăn healthy giảm cân hiệu quả"
                    streamerName="Chef Linh"
                    thumbnail="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400"
                    viewerCount={5200}
                    isLive={true}
                    category="Ẩm thực"
                  />
                  <StreamCard
                    id="stream-4"
                    title="Skincare routine cho da dầu mụn"
                    streamerName="Dr. Thảo Skincare"
                    thumbnail="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400"
                    viewerCount={15800}
                    isLive={true}
                    category="Làm đẹp"
                  />
                  <StreamCard
                    id="stream-5"
                    title="Mix đồ đi làm sang chảnh chỉ 500k"
                    streamerName="Style Maven"
                    thumbnail="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400"
                    viewerCount={6700}
                    isLive={true}
                    category="Thời trang"
                  />
                  <StreamCard
                    id="stream-6"
                    title="Làm bánh cupcake siêu dễ cho người mới"
                    streamerName="Bánh Ngọt Homemade"
                    thumbnail="https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400"
                    viewerCount={3400}
                    isLive={true}
                    category="Ẩm thực"
                  />
                </AppleGrid>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips tùy chỉnh:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Thay đổi số cột grid với props <code className="bg-gray-200 px-1 rounded">cols</code></li>
                  <li>Điều chỉnh gap giữa các card: <code className="bg-gray-200 px-1 rounded">gap="sm" | "md" | "lg"</code></li>
                  <li>Thêm filter buttons để lọc theo danh mục livestream</li>
                </ul>
              </div>
              
              <CodeBlock
                code={`<AppleSectionHeader 
  title="Livestream Đang Diễn Ra"
  description="Khám phá các livestream hot nhất từ KOCs"
  actionButtons={[
    { label: 'Xem tất cả', onClick: handleViewAll, variant: 'outline' },
  ]}
/>

<div className="mb-4 flex gap-2 flex-wrap">
  <AppleButton variant="primary" size="sm">Tất cả</AppleButton>
  <AppleButton variant="outline" size="sm">Làm đẹp</AppleButton>
  <AppleButton variant="outline" size="sm">Thời trang</AppleButton>
</div>

<AppleGrid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
  {streams.map(stream => (
    <StreamCard
      key={stream.id}
      id={stream.id}
      title={stream.title}
      streamerName={stream.streamerName}
      thumbnail={stream.thumbnail}
      viewerCount={stream.viewerCount}
      isLive={stream.isLive}
      category={stream.category}
    />
  ))}
</AppleGrid>`}
              />
            </div>

            {/* Pattern 2: Product Gallery */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4" data-testid="heading-pattern-product-gallery">
                2. Product Gallery
              </h3>
              <p className="text-gray-600 mb-6">
                Danh sách sản phẩm dạng lưới với sắp xếp và phân trang. Thích hợp cho trang sản phẩm affiliate.
              </p>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg" data-testid="example-product-gallery">
                <AppleSectionHeader 
                  title="Sản Phẩm Hot Tháng Này"
                  description="Top sản phẩm được KOCs giới thiệu nhiều nhất"
                  actionButtons={[
                    { label: 'Thêm sản phẩm', onClick: () => {}, variant: 'primary' },
                  ]}
                />
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <AppleBadge variant="info" size="sm">128 sản phẩm</AppleBadge>
                  </div>
                  <AppleSelect 
                    options={[
                      { value: 'newest', label: 'Mới nhất' },
                      { value: 'popular', label: 'Phổ biến nhất' },
                      { value: 'price-low', label: 'Giá thấp đến cao' },
                      { value: 'price-high', label: 'Giá cao đến thấp' },
                    ]}
                    value="popular"
                    onChange={() => {}}
                  />
                </div>
                <AppleGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="md">
                  <ProductCard
                    id="product-1"
                    name="Set son lì 12 màu Hàn Quốc"
                    price={299000}
                    originalPrice={450000}
                    image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
                    rating={4.8}
                    soldCount={2340}
                    badges={['Hot', 'Freeship']}
                  />
                  <ProductCard
                    id="product-2"
                    name="Áo phông form rộng unisex"
                    price={149000}
                    originalPrice={250000}
                    image="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
                    rating={4.5}
                    soldCount={1820}
                    badges={['Sale']}
                  />
                  <ProductCard
                    id="product-3"
                    name="Serum vitamin C trị thâm"
                    price={385000}
                    originalPrice={550000}
                    image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400"
                    rating={4.9}
                    soldCount={3150}
                    badges={['Best seller']}
                  />
                  <ProductCard
                    id="product-4"
                    name="Túi xách mini da PU cao cấp"
                    price={225000}
                    originalPrice={350000}
                    image="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
                    rating={4.6}
                    soldCount={980}
                  />
                  <ProductCard
                    id="product-5"
                    name="Kem dưỡng da mặt ban đêm"
                    price={420000}
                    originalPrice={600000}
                    image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400"
                    rating={4.7}
                    soldCount={1560}
                    badges={['Organic']}
                  />
                  <ProductCard
                    id="product-6"
                    name="Váy maxi hoa nhí vintage"
                    price={285000}
                    originalPrice={400000}
                    image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"
                    rating={4.8}
                    soldCount={720}
                  />
                  <ProductCard
                    id="product-7"
                    name="Mặt nạ ngủ dưỡng ẩm"
                    price={180000}
                    originalPrice={280000}
                    image="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400"
                    rating={4.6}
                    soldCount={2100}
                    badges={['New']}
                  />
                  <ProductCard
                    id="product-8"
                    name="Giày sneaker trắng basic"
                    price={399000}
                    originalPrice={650000}
                    image="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
                    rating={4.9}
                    soldCount={3890}
                    badges={['Hot', 'Best seller']}
                  />
                </AppleGrid>
                <div className="mt-6">
                  <ApplePagination
                    currentPage={1}
                    totalPages={8}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips tùy chỉnh:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Responsive grid tự động điều chỉnh: 1 cột (mobile), 2 cột (tablet), 4 cột (desktop)</li>
                  <li>Thêm badges để highlight sản phẩm đặc biệt (Hot, Sale, New)</li>
                  <li>Kết hợp AppleSelect để sắp xếp và ApplePagination cho nhiều trang</li>
                </ul>
              </div>
              
              <CodeBlock
                code={`<AppleSectionHeader 
  title="Sản Phẩm Hot Tháng Này"
  actionButtons={[
    { label: 'Thêm sản phẩm', onClick: handleAdd, variant: 'primary' },
  ]}
/>

<div className="mb-4 flex items-center justify-between">
  <AppleBadge variant="info" size="sm">{products.length} sản phẩm</AppleBadge>
  <AppleSelect 
    options={sortOptions}
    value={sortBy}
    onChange={setSortBy}
  />
</div>

<AppleGrid cols={{ sm: 1, md: 2, lg: 4 }} gap="md">
  {products.map(product => (
    <ProductCard
      key={product.id}
      {...product}
    />
  ))}
</AppleGrid>

<ApplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>`}
              />
            </div>

            {/* Pattern 3: Campaign Dashboard */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4" data-testid="heading-pattern-campaign-dashboard">
                3. Campaign Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Bảng điều khiển chiến dịch với thống kê và danh sách. Thích hợp cho trang quản lý chiến dịch của brand.
              </p>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg" data-testid="example-campaign-dashboard">
                <AppleSectionHeader 
                  title="Chiến Dịch Marketing"
                  description="Quản lý và theo dõi các chiến dịch của bạn"
                  actionButtons={[
                    { label: 'Tạo chiến dịch mới', onClick: () => {}, variant: 'primary' },
                  ]}
                />
                
                <div className="mb-6">
                  <AppleAlert severity="info">
                    Bạn có 3 chiến dịch đang chờ duyệt. Vui lòng kiểm tra và phê duyệt.
                  </AppleAlert>
                </div>
                
                <AppleStack direction="vertical" spacing="lg">
                  <AppleGrid cols={{ sm: 1, md: 3 }} gap="md">
                    <StatsCard
                      id="revenue"
                      title="Doanh thu"
                      value={125000000}
                      change={18.5}
                      changeType="increase"
                      icon={<TrendingUp className="w-8 h-8" />}
                      color={designTokens.colors.primary.DEFAULT}
                    />
                    <StatsCard
                      id="campaigns"
                      title="Chiến dịch đang chạy"
                      value={24}
                      change={12.5}
                      changeType="increase"
                      icon={<ShoppingCart className="w-8 h-8" />}
                    />
                    <StatsCard
                      id="kocs-active"
                      title="KOCs tham gia"
                      value={156}
                      change={5.2}
                      changeType="increase"
                      icon={<Users className="w-8 h-8" />}
                    />
                  </AppleGrid>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Chiến dịch mới nhất</h4>
                    <AppleStack direction="vertical" spacing="md">
                      <CampaignCard
                        id="campaign-1"
                        title="Review sản phẩm skincare mới"
                        brandName="L'Oreal Paris"
                        category="Beauty"
                        type="review"
                        reward={500000}
                        kocNeeded={20}
                        kocApplied={15}
                        deadline="2025-11-15"
                        status="recruiting"
                      />
                      <CampaignCard
                        id="campaign-2"
                        title="Check-in tại cửa hàng tại HCM"
                        brandName="The Coffee House"
                        category="F&B"
                        type="checkin"
                        reward={200000}
                        kocNeeded={50}
                        kocApplied={48}
                        deadline="2025-11-10"
                        status="in-progress"
                      />
                      <CampaignCard
                        id="campaign-3"
                        title="Seeding bài viết TikTok về thời trang"
                        brandName="SHEIN Vietnam"
                        category="Fashion"
                        type="seeding"
                        reward={800000}
                        kocNeeded={30}
                        kocApplied={12}
                        deadline="2025-11-20"
                        status="recruiting"
                      />
                      <CampaignCard
                        id="campaign-4"
                        title="Cài đặt app game mobile mới"
                        brandName="Garena"
                        category="Gaming"
                        type="cpi"
                        reward={350000}
                        kocNeeded={100}
                        kocApplied={78}
                        deadline="2025-11-18"
                        status="in-progress"
                      />
                      <CampaignCard
                        id="campaign-5"
                        title="Review ứng dụng giao đồ ăn"
                        brandName="Grab Food"
                        category="F&B"
                        type="cpa"
                        reward={600000}
                        kocNeeded={40}
                        kocApplied={5}
                        deadline="2025-11-25"
                        status="draft"
                      />
                    </AppleStack>
                  </div>
                </AppleStack>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips tùy chỉnh:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Sử dụng AppleStack vertical để xếp chồng các phần tử</li>
                  <li>Hiển thị thống kê quan trọng với StatsCard ở đầu trang</li>
                  <li>Thêm AppleAlert để thông báo quan trọng cho người dùng</li>
                  <li>CampaignCard tự động tính progress bar dựa trên KOC đã apply</li>
                </ul>
              </div>
              
              <CodeBlock
                code={`<AppleSectionHeader 
  title="Chiến Dịch Marketing"
  description="Quản lý và theo dõi các chiến dịch của bạn"
  actionButtons={[
    { label: 'Tạo chiến dịch mới', onClick: handleCreate, variant: 'primary' },
  ]}
/>

<AppleAlert variant="info">
  Bạn có {pendingCount} chiến dịch đang chờ duyệt
</AppleAlert>

<AppleStack direction="vertical" spacing="lg">
  <AppleGrid cols={{ sm: 1, md: 3 }} gap="md">
    <StatsCard
      id="revenue"
      title="Doanh thu"
      value={totalRevenue}
      change={revenueChange}
      changeType="increase"
      icon={<TrendingUp />}
    />
    {/* More stats */}
  </AppleGrid>
  
  <AppleStack direction="vertical" spacing="md">
    {campaigns.map(campaign => (
      <CampaignCard key={campaign.id} {...campaign} />
    ))}
  </AppleStack>
</AppleStack>`}
              />
            </div>

            {/* Pattern 4: KOC Directory */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4" data-testid="heading-pattern-koc-directory">
                4. KOC Directory
              </h3>
              <p className="text-gray-600 mb-6">
                Danh sách KOCs với tìm kiếm và lọc theo level. Thích hợp cho trang tìm kiếm KOC của brand.
              </p>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg" data-testid="example-koc-directory">
                <AppleSectionHeader 
                  title="Thư Viện KOCs"
                  description="Tìm kiếm và kết nối với các KOCs phù hợp"
                />
                
                <div className="mb-6 space-y-4">
                  <AppleInput
                    placeholder="Tìm kiếm KOC theo tên, danh mục..."
                    leftIcon={<User className="w-4 h-4" />}
                  />
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">Lọc theo level:</span>
                    <AppleBadge variant="info" size="sm">Tất cả</AppleBadge>
                    <AppleBadge variant="default" size="sm">Nano</AppleBadge>
                    <AppleBadge variant="success" size="sm">Micro</AppleBadge>
                    <AppleBadge variant="warning" size="sm">Macro</AppleBadge>
                    <AppleBadge variant="error" size="sm">Celebrity</AppleBadge>
                  </div>
                </div>
                
                <AppleStack direction="vertical" spacing="md">
                  <KOCCard
                    id="koc-1"
                    name="Nguyễn Minh Anh"
                    level="Micro"
                    followers={85000}
                    rating={4.8}
                    completedCampaigns={48}
                    categories={['Làm đẹp', 'Skincare', 'Makeup']}
                    isVerified={true}
                  />
                  <KOCCard
                    id="koc-2"
                    name="Trần Hương Giang"
                    level="Macro"
                    followers={320000}
                    rating={4.9}
                    completedCampaigns={156}
                    categories={['Thời trang', 'Lifestyle', 'Du lịch']}
                    isVerified={true}
                  />
                  <KOCCard
                    id="koc-3"
                    name="Lê Phương Linh"
                    level="Nano"
                    followers={12000}
                    rating={4.5}
                    completedCampaigns={15}
                    categories={['Ẩm thực', 'Nấu ăn', 'Healthy']}
                    isVerified={false}
                  />
                  <KOCCard
                    id="koc-4"
                    name="Phạm Thanh Tùng"
                    level="Celebrity"
                    followers={1200000}
                    rating={4.9}
                    completedCampaigns={285}
                    categories={['Tech', 'Gaming', 'Review sản phẩm']}
                    isVerified={true}
                  />
                  <KOCCard
                    id="koc-5"
                    name="Hoàng Mai Anh"
                    level="Micro"
                    followers={65000}
                    rating={4.7}
                    completedCampaigns={62}
                    categories={['Mẹ và bé', 'Parenting', 'Đồ dùng trẻ em']}
                    isVerified={true}
                  />
                </AppleStack>
                
                <div className="mt-6">
                  <ApplePagination
                    currentPage={1}
                    totalPages={12}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips tùy chỉnh:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>AppleStack vertical tự động tạo spacing giữa các KOCCard</li>
                  <li>Sử dụng AppleInput với leftIcon để tạo search bar đẹp mắt</li>
                  <li>Filter badges giúp người dùng lọc KOC theo level nhanh chóng</li>
                  <li>KOCCard hiển thị verified badge, rating, và số lượng campaign đã hoàn thành</li>
                </ul>
              </div>
              
              <CodeBlock
                code={`<AppleSectionHeader 
  title="Thư Viện KOCs"
  description="Tìm kiếm và kết nối với các KOCs phù hợp"
/>

<AppleInput
  placeholder="Tìm kiếm KOC..."
  leftIcon={<User />}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

<div className="flex gap-2">
  <span>Lọc theo level:</span>
  {levels.map(level => (
    <AppleBadge 
      key={level} 
      variant={selectedLevel === level ? 'info' : 'default'}
      onClick={() => setSelectedLevel(level)}
    >
      {level}
    </AppleBadge>
  ))}
</div>

<AppleStack direction="vertical" spacing="md">
  {filteredKOCs.map(koc => (
    <KOCCard key={koc.id} {...koc} />
  ))}
</AppleStack>

<ApplePagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>`}
              />
            </div>

            {/* Pattern 5: E-commerce Product Page */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4" data-testid="heading-pattern-product-page">
                5. E-commerce Product Page
              </h3>
              <p className="text-gray-600 mb-6">
                Trang sản phẩm hoàn chỉnh với thông tin chi tiết, livestream và affiliate commission. Layout phức tạp kết hợp nhiều components.
              </p>
              
              <div className="mb-6 p-6 bg-gray-50 rounded-lg" data-testid="example-product-page">
                <AppleGrid cols={{ sm: 1, md: 2 }} gap="lg">
                  <div>
                    <ProductCard
                      id="product-detail"
                      name="Bộ Serum Vitamin C & Retinol Đặc Trị"
                      price={1250000}
                      originalPrice={1850000}
                      image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
                      rating={4.9}
                      soldCount={5680}
                      badges={['Best Seller', 'Authentic', 'Fast Shipping']}
                    />
                  </div>
                  
                  <AppleStack direction="vertical" spacing="lg">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold mb-4">Giá & Khuyến mãi</h4>
                      <PriceDisplay 
                        price={1250000}
                        originalPrice={1850000}
                        size="lg"
                        showDiscount={true}
                      />
                      <div className="mt-4 flex items-center gap-2">
                        <CommissionBadge rate={15} />
                        <span className="text-sm text-gray-600">Hoa hồng cho KOC</span>
                      </div>
                      <div className="mt-6">
                        <AppleButton variant="primary" size="lg" className="w-full">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Thêm vào giỏ hàng
                        </AppleButton>
                      </div>
                    </div>
                    
                    <AppleGrid cols={2} gap="md">
                      <StatsCard
                        id="views"
                        title="Lượt xem"
                        value={28500}
                        change={24}
                        changeType="increase"
                      />
                      <StatsCard
                        id="sold"
                        title="Đã bán"
                        value={5680}
                        change={18}
                        changeType="increase"
                      />
                    </AppleGrid>
                  </AppleStack>
                </AppleGrid>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <LiveStatusBadge status="live" />
                    KOC đang review trực tiếp
                  </h4>
                  <AppleGrid cols={{ sm: 1, md: 2 }} gap="md">
                    <StreamCard
                      id="live-review"
                      title="Review chi tiết bộ serum - Hiệu quả thật sự?"
                      streamerName="Dr. Thảo Skincare"
                      thumbnail="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400"
                      viewerCount={8500}
                      isLive={true}
                      category="Beauty Review"
                      variant="compact"
                    />
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h5 className="font-semibold mb-3">Ưu đãi đặc biệt</h5>
                      <AppleStack direction="vertical" spacing="sm">
                        <div className="flex items-center gap-2">
                          <AppleBadge variant="success" size="sm">Freeship</AppleBadge>
                          <span className="text-sm">Đơn từ 500k</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AppleBadge variant="warning" size="sm">Giảm 10%</AppleBadge>
                          <span className="text-sm">Cho đơn đầu tiên</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AppleBadge variant="info" size="sm">Combo</AppleBadge>
                          <span className="text-sm">Mua 2 giảm 20%</span>
                        </div>
                      </AppleStack>
                    </div>
                  </AppleGrid>
                </div>
                
                <div className="mt-6">
                  <AppleAlert severity="success">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Sản phẩm này đang được 156 KOCs giới thiệu. Tham gia ngay để nhận hoa hồng 15%!</span>
                    </div>
                  </AppleAlert>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips tùy chỉnh:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Layout 2 cột responsive: ProductCard bên trái, thông tin giá và actions bên phải</li>
                  <li>CommissionBadge hiển thị tỷ lệ hoa hồng cho KOC</li>
                  <li>Kết hợp StreamCard để hiển thị livestream đang review sản phẩm</li>
                  <li>LiveStatusBadge tạo hiệu ứng nhấp nháy cho livestream</li>
                  <li>AppleAlert thông báo chương trình affiliate để khuyến khích KOC tham gia</li>
                </ul>
              </div>
              
              <CodeBlock
                code={`<AppleGrid cols={{ sm: 1, md: 2 }} gap="lg">
  {/* Left: Product Image */}
  <ProductCard {...productData} />
  
  {/* Right: Price & Actions */}
  <AppleStack direction="vertical" spacing="lg">
    <div className="bg-white p-6 rounded-lg">
      <PriceDisplay 
        price={price}
        originalPrice={originalPrice}
        size="lg"
        showDiscount={true}
      />
      <CommissionBadge rate={15} variant="highlight" />
      <AppleButton variant="primary" size="lg" className="w-full">
        <ShoppingCart /> Thêm vào giỏ
      </AppleButton>
    </div>
    
    <AppleGrid cols={2} gap="md">
      <StatsCard id="views" title="Lượt xem" value={views} />
      <StatsCard id="sold" title="Đã bán" value={sold} />
    </AppleGrid>
  </AppleStack>
</AppleGrid>

{/* Live Review Section */}
<div className="mt-8">
  <h4 className="flex items-center gap-2">
    <LiveStatusBadge isLive={true} />
    KOC đang review trực tiếp
  </h4>
  <StreamCard {...liveStreamData} variant="compact" />
</div>

<AppleAlert variant="success">
  Sản phẩm đang được {kocCount} KOCs giới thiệu
</AppleAlert>`}
              />
            </div>
          </div>
        </Section>
        </>
        )}

        {/* Advanced Interactions Section */}
        {activeTab === 'advanced' && (
        <Section title="Advanced Interactions - Tương tác nâng cao">
          <div className="space-y-8">
            {/* AppleTooltip Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleTooltip - Gợi ý ngữ cảnh</h3>
              <p className="text-gray-600 mb-6">
                Hiển thị thông tin bổ sung khi di chuột qua các phần tử. Hỗ trợ 4 vị trí, độ trễ tùy chỉnh và nhiều kiểu trigger.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Tất cả vị trí (4 hướng)</h4>
                  <div className="flex items-center justify-center gap-12 p-8 bg-gray-50 rounded-lg">
                    <AppleTooltip content="Tooltip phía trên" side="top">
                      <AppleButton variant="outline" size="sm" data-testid="tooltip-top">
                        Top
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Tooltip phía dưới" side="bottom">
                      <AppleButton variant="outline" size="sm" data-testid="tooltip-bottom">
                        Bottom
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Tooltip bên trái" side="left">
                      <AppleButton variant="outline" size="sm" data-testid="tooltip-left">
                        Left
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Tooltip bên phải" side="right">
                      <AppleButton variant="outline" size="sm" data-testid="tooltip-right">
                        Right
                      </AppleButton>
                    </AppleTooltip>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Các loại trigger khác nhau</h4>
                  <div className="flex items-center gap-6 flex-wrap p-6 bg-gray-50 rounded-lg">
                    <AppleTooltip content="Nhấn để chỉnh sửa thông tin">
                      <AppleButton variant="primary" size="md" data-testid="tooltip-button">
                        <Edit className="w-4 h-4" /> Button Trigger
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Xem thêm thông tin chi tiết">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" data-testid="tooltip-icon">
                        <Info className="w-5 h-5 text-gray-600" />
                      </button>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Đây là văn bản có tooltip">
                      <span className="text-sm font-medium text-[#ff0086] cursor-help border-b border-dashed border-[#ff0086]" data-testid="tooltip-text">
                        Text với Tooltip
                      </span>
                    </AppleTooltip>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Độ trễ tùy chỉnh</h4>
                  <div className="flex items-center gap-6 flex-wrap p-6 bg-gray-50 rounded-lg">
                    <AppleTooltip content="Hiển thị ngay lập tức" delayDuration={0}>
                      <AppleButton variant="secondary" size="sm" data-testid="tooltip-nodelay">
                        Không độ trễ (0ms)
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Độ trễ mặc định" delayDuration={200}>
                      <AppleButton variant="secondary" size="sm" data-testid="tooltip-default">
                        Mặc định (200ms)
                      </AppleButton>
                    </AppleTooltip>
                    
                    <AppleTooltip content="Độ trễ lâu hơn" delayDuration={500}>
                      <AppleButton variant="secondary" size="sm" data-testid="tooltip-slow">
                        Chậm (500ms)
                      </AppleButton>
                    </AppleTooltip>
                  </div>
                </div>

                <CodeBlock code={`import { AppleTooltip } from '@/components/apple';
import { Info } from 'lucide-react';

// Tooltip cơ bản với các vị trí khác nhau
<AppleTooltip content="Tooltip phía trên" side="top">
  <button>Hover me</button>
</AppleTooltip>

// Với icon trigger
<AppleTooltip content="Xem thêm thông tin">
  <Info className="w-5 h-5" />
</AppleTooltip>

// Với độ trễ tùy chỉnh
<AppleTooltip 
  content="Hiển thị ngay lập tức" 
  delayDuration={0}
>
  <button>No delay</button>
</AppleTooltip>

// Text với tooltip
<AppleTooltip content="Thông tin chi tiết">
  <span className="cursor-help">Text có tooltip</span>
</AppleTooltip>`} />
              </div>
            </div>

            {/* ApplePopover Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">ApplePopover - Nội dung phụ</h3>
              <p className="text-gray-600 mb-6">
                Hiển thị nội dung phong phú trong một hộp nổi. Hỗ trợ form, danh sách, và nội dung tùy chỉnh với nhiều vị trí và căn chỉnh.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Popover cơ bản với tiêu đề</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <ApplePopover
                      trigger={
                        <AppleButton variant="primary" size="md" data-testid="popover-basic">
                          <Info className="w-4 h-4" /> Xem thông tin
                        </AppleButton>
                      }
                      title="Thông tin chiến dịch"
                    >
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Chiến dịch này đang hoạt động với 24 KOCs tham gia.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Ngân sách:</span>
                          <span className="text-gray-600">50,000,000đ</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Thời gian:</span>
                          <span className="text-gray-600">15/01 - 30/01/2024</span>
                        </div>
                      </div>
                    </ApplePopover>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Popover với form (nội dung phong phú)</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <ApplePopover
                      trigger={
                        <AppleButton variant="outline" size="md" data-testid="popover-form">
                          <Edit className="w-4 h-4" /> Chỉnh sửa nhanh
                        </AppleButton>
                      }
                      title="Cập nhật thông tin"
                    >
                      <div className="space-y-4">
                        <AppleInput
                          label="Tên chiến dịch"
                          placeholder="Nhập tên chiến dịch..."
                          data-testid="popover-input-name"
                        />
                        <AppleSelect
                          label="Trạng thái"
                          options={[
                            { value: 'active', label: 'Đang hoạt động' },
                            { value: 'paused', label: 'Tạm dừng' },
                            { value: 'ended', label: 'Đã kết thúc' },
                          ]}
                          data-testid="popover-select-status"
                        />
                        <AppleButton variant="primary" size="sm" className="w-full" data-testid="popover-submit">
                          Lưu thay đổi
                        </AppleButton>
                      </div>
                    </ApplePopover>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Vị trí và căn chỉnh khác nhau</h4>
                  <div className="flex items-center gap-4 flex-wrap p-6 bg-gray-50 rounded-lg">
                    <ApplePopover
                      trigger={<AppleButton variant="secondary" size="sm" data-testid="popover-bottom">Bottom</AppleButton>}
                      side="bottom"
                      align="center"
                      title="Popover phía dưới"
                    >
                      <p className="text-sm text-gray-600">Nội dung hiển thị ở phía dưới</p>
                    </ApplePopover>

                    <ApplePopover
                      trigger={<AppleButton variant="secondary" size="sm" data-testid="popover-top">Top</AppleButton>}
                      side="top"
                      align="center"
                      title="Popover phía trên"
                    >
                      <p className="text-sm text-gray-600">Nội dung hiển thị ở phía trên</p>
                    </ApplePopover>

                    <ApplePopover
                      trigger={<AppleButton variant="secondary" size="sm" data-testid="popover-left">Left</AppleButton>}
                      side="left"
                      align="center"
                      title="Popover bên trái"
                    >
                      <p className="text-sm text-gray-600">Nội dung hiển thị ở bên trái</p>
                    </ApplePopover>

                    <ApplePopover
                      trigger={<AppleButton variant="secondary" size="sm" data-testid="popover-right">Right</AppleButton>}
                      side="right"
                      align="center"
                      title="Popover bên phải"
                    >
                      <p className="text-sm text-gray-600">Nội dung hiển thị ở bên phải</p>
                    </ApplePopover>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Với và không có nút đóng</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <ApplePopover
                      trigger={<AppleButton variant="outline" size="sm" data-testid="popover-with-close">Có nút đóng</AppleButton>}
                      title="Với nút đóng"
                      showCloseButton={true}
                    >
                      <p className="text-sm text-gray-600">Popover này có nút đóng ở góc trên</p>
                    </ApplePopover>

                    <ApplePopover
                      trigger={<AppleButton variant="outline" size="sm" data-testid="popover-no-close">Không nút đóng</AppleButton>}
                      title="Không nút đóng"
                      showCloseButton={false}
                    >
                      <p className="text-sm text-gray-600">Popover này không có nút đóng</p>
                    </ApplePopover>
                  </div>
                </div>

                <CodeBlock code={`import { ApplePopover, AppleButton, AppleInput } from '@/components/apple';

// Popover cơ bản
<ApplePopover
  trigger={
    <AppleButton variant="primary">Xem thông tin</AppleButton>
  }
  title="Thông tin chiến dịch"
>
  <p>Nội dung của popover...</p>
</ApplePopover>

// Với form bên trong
<ApplePopover
  trigger={<AppleButton>Chỉnh sửa</AppleButton>}
  title="Cập nhật thông tin"
>
  <div className="space-y-4">
    <AppleInput label="Tên" placeholder="Nhập tên..." />
    <AppleButton className="w-full">Lưu</AppleButton>
  </div>
</ApplePopover>

// Vị trí và căn chỉnh tùy chỉnh
<ApplePopover
  trigger={<button>Click</button>}
  side="right"
  align="start"
  showCloseButton={false}
>
  <p>Nội dung...</p>
</ApplePopover>`} />
              </div>
            </div>

            {/* AppleDropdown Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleDropdown - Menu thả xuống</h3>
              <p className="text-gray-600 mb-6">
                Menu thả xuống với icons, phân cách, nhãn, trạng thái disabled, mục destructive và hỗ trợ submenu lồng nhau.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Dropdown cơ bản với icons</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <AppleDropdown
                      trigger={
                        <AppleButton variant="primary" size="md" data-testid="dropdown-basic">
                          Hành động <ChevronRight className="w-4 h-4 ml-1" />
                        </AppleButton>
                      }
                      items={[
                        {
                          label: 'Chỉnh sửa',
                          icon: <Edit className="w-4 h-4" />,
                          onClick: () => toast.info('Đang chỉnh sửa...')
                        },
                        {
                          label: 'Tải xuống',
                          icon: <Download className="w-4 h-4" />,
                          onClick: () => toast.success('Đang tải xuống...')
                        },
                        {
                          label: 'Sao chép',
                          icon: <Copy className="w-4 h-4" />,
                          onClick: () => toast.success('Đã sao chép!')
                        }
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Với dividers và labels</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <AppleDropdown
                      trigger={
                        <AppleButton variant="outline" size="md" data-testid="dropdown-dividers">
                          Tùy chọn <ChevronRight className="w-4 h-4 ml-1" />
                        </AppleButton>
                      }
                      items={[
                        { type: 'label', label: 'Hành động chung' },
                        {
                          label: 'Xem chi tiết',
                          icon: <Info className="w-4 h-4" />,
                          onClick: () => toast.info('Đang mở...')
                        },
                        {
                          label: 'Chỉnh sửa',
                          icon: <Edit className="w-4 h-4" />,
                          onClick: () => toast.info('Đang chỉnh sửa...')
                        },
                        { type: 'divider', label: '' },
                        { type: 'label', label: 'Hành động khác' },
                        {
                          label: 'Chia sẻ',
                          icon: <Copy className="w-4 h-4" />,
                          onClick: () => toast.success('Đã sao chép liên kết!')
                        }
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Mục destructive (xóa) và disabled</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <AppleDropdown
                      trigger={
                        <AppleButton variant="secondary" size="md" data-testid="dropdown-destructive">
                          Quản lý <ChevronRight className="w-4 h-4 ml-1" />
                        </AppleButton>
                      }
                      items={[
                        {
                          label: 'Chỉnh sửa',
                          icon: <Edit className="w-4 h-4" />,
                          onClick: () => toast.info('Đang chỉnh sửa...')
                        },
                        {
                          label: 'Tải xuống',
                          icon: <Download className="w-4 h-4" />,
                          onClick: () => toast.success('Đang tải...')
                        },
                        {
                          label: 'Chia sẻ (đã tắt)',
                          icon: <Copy className="w-4 h-4" />,
                          onClick: () => {},
                          disabled: true
                        },
                        { type: 'divider', label: '' },
                        {
                          label: 'Xóa',
                          icon: <Trash className="w-4 h-4" />,
                          onClick: () => toast.error('Đã xóa!'),
                          destructive: true
                        }
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Menu lồng nhau (Nested Menu)</h4>
                  <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <AppleDropdown
                      trigger={
                        <AppleButton variant="primary" size="md" data-testid="dropdown-nested">
                          Menu với Submenu <ChevronRight className="w-4 h-4 ml-1" />
                        </AppleButton>
                      }
                      items={[
                        {
                          label: 'Tệp',
                          icon: <FileText className="w-4 h-4" />,
                          items: [
                            {
                              label: 'Tệp mới',
                              onClick: () => toast.success('Tạo tệp mới')
                            },
                            {
                              label: 'Mở tệp',
                              onClick: () => toast.info('Mở tệp')
                            },
                            { type: 'divider', label: '' },
                            {
                              label: 'Lưu',
                              onClick: () => toast.success('Đã lưu')
                            }
                          ]
                        },
                        {
                          label: 'Chỉnh sửa',
                          icon: <Edit className="w-4 h-4" />,
                          items: [
                            {
                              label: 'Hoàn tác',
                              onClick: () => toast.info('Đã hoàn tác')
                            },
                            {
                              label: 'Làm lại',
                              onClick: () => toast.info('Đã làm lại')
                            }
                          ]
                        },
                        { type: 'divider', label: '' },
                        {
                          label: 'Cài đặt',
                          icon: <Settings className="w-4 h-4" />,
                          items: [
                            {
                              label: 'Tùy chọn chung',
                              onClick: () => toast.info('Mở cài đặt chung')
                            },
                            {
                              label: 'Tùy chọn nâng cao',
                              onClick: () => toast.info('Mở cài đặt nâng cao')
                            }
                          ]
                        }
                      ]}
                    />
                  </div>
                </div>

                <CodeBlock code={`import { AppleDropdown } from '@/components/apple';
import { Edit, Trash, Download } from 'lucide-react';

// Dropdown cơ bản
<AppleDropdown
  trigger={<button>Hành động</button>}
  items={[
    {
      label: 'Chỉnh sửa',
      icon: <Edit className="w-4 h-4" />,
      onClick: () => handleEdit()
    },
    {
      label: 'Tải xuống',
      icon: <Download className="w-4 h-4" />,
      onClick: () => handleDownload()
    }
  ]}
/>

// Với dividers, labels và destructive items
<AppleDropdown
  trigger={<button>Quản lý</button>}
  items={[
    { type: 'label', label: 'Hành động' },
    {
      label: 'Chỉnh sửa',
      icon: <Edit />,
      onClick: handleEdit
    },
    { type: 'divider' },
    {
      label: 'Xóa',
      icon: <Trash />,
      onClick: handleDelete,
      destructive: true
    }
  ]}
/>

// Menu lồng nhau (Nested)
<AppleDropdown
  trigger={<button>Menu</button>}
  items={[
    {
      label: 'Tệp',
      items: [
        { label: 'Tạo mới', onClick: handleNew },
        { label: 'Mở', onClick: handleOpen }
      ]
    },
    {
      label: 'Chỉnh sửa',
      items: [
        { label: 'Hoàn tác', onClick: handleUndo },
        { label: 'Làm lại', onClick: handleRedo }
      ]
    }
  ]}
/>`} />
              </div>
            </div>

            {/* AppleCommandPalette Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleCommandPalette - Bảng lệnh nhanh</h3>
              <p className="text-gray-600 mb-6">
                Giao diện tìm kiếm và thực thi lệnh nhanh kiểu Command+K. Hỗ trợ fuzzy search, phân loại, lịch sử và phím tắt.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Demo tương tác</h4>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <AppleButton 
                      variant="primary" 
                      size="lg" 
                      onClick={() => setCommandOpen(true)}
                      data-testid="button-open-command"
                    >
                      <Command className="w-4 h-4" /> Mở Command Palette
                    </AppleButton>
                    
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h5 className="text-sm font-medium mb-2">Tính năng:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✨ <strong>Fuzzy Search:</strong> Tìm kiếm thông minh, khớp chuỗi không liên tục</li>
                        <li>⚡ <strong>Phím tắt:</strong> Cmd+K (Mac) hoặc Ctrl+K (Windows) để mở nhanh</li>
                        <li>📁 <strong>Phân loại:</strong> Nhóm lệnh theo category</li>
                        <li>🕐 <strong>Lịch sử:</strong> Tự động lưu các lệnh gần đây</li>
                        <li>⌨️ <strong>Điều hướng:</strong> Dùng ↑↓ để chọn, Enter để thực thi</li>
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Mẹo:</strong> Thử gõ "tao", "tim", "bao" để thấy fuzzy search hoạt động!
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Lệnh mẫu với categories</h4>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { category: 'Chiến dịch', count: 1, icon: <FileText className="w-4 h-4" /> },
                        { category: 'KOC', count: 1, icon: <Users className="w-4 h-4" /> },
                        { category: 'Báo cáo', count: 1, icon: <TrendingUp className="w-4 h-4" /> },
                        { category: 'Hệ thống', count: 1, icon: <Settings className="w-4 h-4" /> },
                        { category: 'Người dùng', count: 1, icon: <User className="w-4 h-4" /> }
                      ].map((cat) => (
                        <div key={cat.category} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          {cat.icon}
                          <div>
                            <p className="text-sm font-medium">{cat.category}</p>
                            <p className="text-xs text-gray-500">{cat.count} lệnh</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Cách sử dụng</h4>
                  <div className="p-6 bg-gray-50 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0086] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nhấn nút hoặc phím tắt</p>
                        <p className="text-xs text-gray-600">Mở palette bằng nút "Mở Command Palette" hoặc Cmd+K</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0086] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium">Tìm kiếm lệnh</p>
                        <p className="text-xs text-gray-600">Gõ tên lệnh, fuzzy search sẽ tự động lọc kết quả</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0086] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium">Thực thi</p>
                        <p className="text-xs text-gray-600">Dùng ↑↓ để chọn, Enter để thực thi lệnh</p>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock code={`import { AppleCommandPalette } from '@/components/apple';
import { useState } from 'react';

function MyComponent() {
  const [commandOpen, setCommandOpen] = useState(false);

  const commands = [
    {
      id: 'new-campaign',
      label: 'Tạo chiến dịch mới',
      description: 'Bắt đầu một chiến dịch marketing mới',
      icon: <FileText className="w-4 h-4" />,
      category: 'Chiến dịch',
      onSelect: () => {
        handleCreateCampaign();
        setCommandOpen(false);
      }
    },
    {
      id: 'search-koc',
      label: 'Tìm kiếm KOC',
      description: 'Tìm KOC phù hợp cho chiến dịch',
      icon: <Search className="w-4 h-4" />,
      category: 'KOC',
      onSelect: () => {
        handleSearchKOC();
        setCommandOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Nút mở palette */}
      <button onClick={() => setCommandOpen(true)}>
        Mở Command Palette
      </button>

      {/* Command Palette */}
      <AppleCommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        commands={commands}
        placeholder="Tìm kiếm lệnh..."
        emptyText="Không tìm thấy kết quả"
      />
    </>
  );
}

// Lưu ý: Component tự động lưu lịch sử vào localStorage
// Hỗ trợ fuzzy search - khớp chuỗi không liên tục
// Phím tắt: Cmd+K (Mac), Ctrl+K (Windows) - cần setup riêng`} />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Data Visualization Section */}
        {activeTab === 'data-viz' && (
        <Section title="Data Visualization - Trực quan hóa dữ liệu">
          <div className="space-y-8">
            {/* AppleChart Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleChart - Biểu đồ</h3>
              <p className="text-gray-600 mb-6">
                Biểu đồ chuyên nghiệp với nhiều kiểu hiển thị: đường, cột, vùng, và tròn. Tích hợp với dữ liệu thực từ IKK Platform.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Line Chart - Doanh thu theo tháng</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <AppleChart
                      variant="line"
                      data={monthlyRevenue}
                      dataKey="revenue"
                      categoryKey="month"
                      height={250}
                      showGrid={true}
                      showTooltip={true}
                    />
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Bar Chart - Hiệu suất KOC theo cấp</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <AppleChart
                      variant="bar"
                      data={kocPerformance}
                      dataKey="count"
                      categoryKey="tier"
                      height={250}
                      showGrid={true}
                      showTooltip={true}
                    />
                  </div>
                </div>

                {/* Area Chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Area Chart - Tỷ lệ chuyển đổi chiến dịch</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <AppleChart
                      variant="area"
                      data={campaignMetrics}
                      dataKey="conversion"
                      categoryKey="date"
                      height={250}
                      showGrid={true}
                      showTooltip={true}
                    />
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Pie Chart - Phân bố danh mục sản phẩm</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <AppleChart
                      variant="pie"
                      data={productCategories}
                      dataKey="value"
                      labelKey="name"
                      height={250}
                      showTooltip={true}
                      showLegend={true}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Code Example</h4>
                <CodeBlock
                  code={`import { AppleChart } from '@/components/apple/AppleChart';

// Line Chart - Doanh thu theo tháng
<AppleChart
  variant="line"
  data={monthlyRevenue}
  dataKey="revenue"
  categoryKey="month"
  height={250}
  showGrid={true}
  showTooltip={true}
/>

// Bar Chart - Hiệu suất KOC
<AppleChart
  variant="bar"
  data={kocPerformance}
  dataKey="count"
  categoryKey="tier"
/>

// Area Chart - Tỷ lệ chuyển đổi
<AppleChart
  variant="area"
  data={campaignMetrics}
  dataKey="conversion"
  categoryKey="date"
/>

// Pie Chart - Phân bố danh mục
<AppleChart
  variant="pie"
  data={productCategories}
  dataKey="value"
  labelKey="name"
  showLegend={true}
/>`}
                />
              </div>
            </div>

            {/* AppleMetricCard Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleMetricCard - Thẻ chỉ số</h3>
              <p className="text-gray-600 mb-6">
                Hiển thị các chỉ số quan trọng với xu hướng tăng/giảm và định dạng tiền tệ Việt Nam.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AppleMetricCard
                  title="Doanh thu"
                  value={290000000}
                  change={12.5}
                  trend="up"
                  suffix="đ"
                  variant="success"
                  icon={<TrendingUp className="w-5 h-5" />}
                  description="So với tháng trước"
                />
                <AppleMetricCard
                  title="Người dùng"
                  value={2465}
                  change={-8.3}
                  trend="down"
                  variant="error"
                  icon={<Users className="w-5 h-5" />}
                  description="Người dùng hoạt động"
                />
                <AppleMetricCard
                  title="Chiến dịch"
                  value={48}
                  trend="neutral"
                  variant="default"
                  icon={<FileText className="w-5 h-5" />}
                  description="Đang chạy"
                />
                <AppleMetricCard
                  title="Đơn hàng"
                  value={1234}
                  change={25.8}
                  trend="up"
                  variant="warning"
                  icon={<ShoppingCart className="w-5 h-5" />}
                  description="Trong tháng này"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Code Example</h4>
                <CodeBlock
                  code={`import { AppleMetricCard } from '@/components/apple/AppleMetricCard';
import { TrendingUp, Users, FileText, ShoppingCart } from 'lucide-react';

// Revenue metric with upward trend
<AppleMetricCard
  title="Doanh thu"
  value={290000000}
  change={12.5}
  trend="up"
  suffix="đ"
  variant="success"
  icon={<TrendingUp className="w-5 h-5" />}
  description="So với tháng trước"
/>

// Users metric with downward trend
<AppleMetricCard
  title="Người dùng"
  value={2465}
  change={-8.3}
  trend="down"
  variant="error"
  icon={<Users className="w-5 h-5" />}
  description="Người dùng hoạt động"
/>`}
                />
              </div>
            </div>

            {/* AppleProgressBar Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleProgressBar - Thanh tiến trình</h3>
              <p className="text-gray-600 mb-6">
                Thanh tiến trình với nhiều kích thước, màu sắc và chế độ hiển thị.
              </p>

              <div className="space-y-8">
                {/* Sizes */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Kích thước</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Small (sm)</p>
                      <AppleProgressBar value={75} size="sm" showLabel label="75%" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Medium (md)</p>
                      <AppleProgressBar value={60} size="md" showLabel label="60%" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Large (lg)</p>
                      <AppleProgressBar value={85} size="lg" showLabel label="85%" />
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Màu sắc</h4>
                  <div className="space-y-4">
                    <AppleProgressBar value={65} color="primary" showLabel label="Primary - 65%" />
                    <AppleProgressBar value={90} color="success" showLabel label="Hoàn thành - 90%" />
                    <AppleProgressBar value={50} color="warning" showLabel label="Cảnh báo - 50%" />
                    <AppleProgressBar value={25} color="error" showLabel label="Lỗi - 25%" />
                  </div>
                </div>

                {/* Variants */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Chế độ</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Determinate - Xác định</p>
                      <AppleProgressBar value={70} variant="determinate" showLabel label="70%" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Indeterminate - Không xác định</p>
                      <AppleProgressBar value={0} variant="indeterminate" showLabel label="Đang xử lý..." />
                    </div>
                  </div>
                </div>

                {/* Campaign Progress Examples */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Ví dụ thực tế - Tiến trình chiến dịch</h4>
                  <div className="space-y-4">
                    <AppleProgressBar value={100} color="success" showLabel label="Chiến dịch A - Hoàn thành" />
                    <AppleProgressBar value={75} color="primary" showLabel label="Chiến dịch B - Đang chạy (75%)" />
                    <AppleProgressBar value={45} color="warning" showLabel label="Chiến dịch C - Cần chú ý (45%)" />
                    <AppleProgressBar value={0} variant="indeterminate" color="primary" showLabel label="Chiến dịch D - Đang khởi động..." />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Code Example</h4>
                <CodeBlock
                  code={`import { AppleProgressBar } from '@/components/apple/AppleProgressBar';

// Different sizes
<AppleProgressBar value={75} size="sm" showLabel />
<AppleProgressBar value={60} size="md" showLabel />
<AppleProgressBar value={85} size="lg" showLabel />

// Different colors
<AppleProgressBar value={65} color="primary" showLabel />
<AppleProgressBar value={90} color="success" showLabel label="Hoàn thành" />
<AppleProgressBar value={50} color="warning" showLabel label="Cảnh báo" />
<AppleProgressBar value={25} color="error" showLabel label="Lỗi" />

// Indeterminate variant
<AppleProgressBar 
  value={0} 
  variant="indeterminate" 
  showLabel 
  label="Đang xử lý..." 
/>`}
                />
              </div>
            </div>

            {/* AppleGauge Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">AppleGauge - Đồng hồ đo</h3>
              <p className="text-gray-600 mb-6">
                Đồng hồ đo hiệu suất với màu sắc tự động theo ngưỡng hoặc màu tùy chỉnh.
              </p>

              <div className="space-y-8">
                {/* Sizes */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Kích thước</h4>
                  <div className="flex items-center gap-8 flex-wrap">
                    <div className="text-center">
                      <AppleGauge value={75} size="sm" label="Small" />
                      <p className="text-xs text-gray-500 mt-2">Size: sm</p>
                    </div>
                    <div className="text-center">
                      <AppleGauge value={60} size="md" label="Medium" />
                      <p className="text-xs text-gray-500 mt-2">Size: md</p>
                    </div>
                    <div className="text-center">
                      <AppleGauge value={85} size="lg" label="Large" />
                      <p className="text-xs text-gray-500 mt-2">Size: lg</p>
                    </div>
                  </div>
                </div>

                {/* Auto Color vs Manual Color */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Màu sắc tự động (Auto Color)</h4>
                  <p className="text-xs text-gray-600 mb-3">Màu tự động thay đổi dựa trên giá trị: {'<'}40% đỏ, 40-70% vàng, {'>'}70% xanh</p>
                  <div className="flex items-center gap-8 flex-wrap">
                    <AppleGauge value={25} autoColor={true} label="Thấp" />
                    <AppleGauge value={55} autoColor={true} label="Trung bình" />
                    <AppleGauge value={85} autoColor={true} label="Cao" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Màu tùy chỉnh</h4>
                  <div className="flex items-center gap-8 flex-wrap">
                    <AppleGauge value={75} autoColor={false} color="#ff0086" label="Primary" />
                    <AppleGauge value={60} autoColor={false} color="#3b82f6" label="Blue" />
                    <AppleGauge value={85} autoColor={false} color="#8b5cf6" label="Purple" />
                  </div>
                </div>

                {/* Real Examples */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Ví dụ thực tế - Chỉ số KPI</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <AppleGauge value={92} label="Hiệu suất" />
                      <p className="text-xs text-gray-600 mt-2">Chiến dịch A</p>
                    </div>
                    <div className="text-center">
                      <AppleGauge value={68} label="Tỷ lệ chuyển đổi" />
                      <p className="text-xs text-gray-600 mt-2">Chiến dịch B</p>
                    </div>
                    <div className="text-center">
                      <AppleGauge value={45} label="Mức độ tương tác" />
                      <p className="text-xs text-gray-600 mt-2">Chiến dịch C</p>
                    </div>
                    <div className="text-center">
                      <AppleGauge value={28} label="ROI" />
                      <p className="text-xs text-gray-600 mt-2">Chiến dịch D</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Code Example</h4>
                <CodeBlock
                  code={`import { AppleGauge } from '@/components/apple/AppleGauge';

// Different sizes
<AppleGauge value={75} size="sm" label="Small" />
<AppleGauge value={60} size="md" label="Medium" />
<AppleGauge value={85} size="lg" label="Large" />

// Auto color (changes based on value)
<AppleGauge value={25} autoColor={true} label="Thấp" />
<AppleGauge value={55} autoColor={true} label="Trung bình" />
<AppleGauge value={85} autoColor={true} label="Cao" />

// Manual color
<AppleGauge 
  value={75} 
  autoColor={false} 
  color="#ff0086" 
  label="Primary" 
/>

// Real-world example
<AppleGauge value={92} label="Hiệu suất" />`}
                />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Command Palette Instance */}
        <AppleCommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          commands={sampleCommands}
          placeholder="Tìm kiếm lệnh... (thử gõ 'tao', 'tim', 'bao')"
          emptyText="Không tìm thấy kết quả"
        />

        {/* IKK Domain-Specific Components Section */}
        {activeTab === 'ikk-components' && (
        <Section title="IKK Domain-Specific Components">
          <div className="space-y-8">
            {/* PriceDisplay Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">PriceDisplay - Vietnamese Price Formatting</h3>
              <p className="text-gray-600 mb-6">
                Display product prices with Vietnamese formatting, discount badges, and size variants.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Basic Price</h4>
                  <div className="flex items-center gap-4 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <PriceDisplay price={50000} />
                    <PriceDisplay price={250000} />
                    <PriceDisplay price={1500000} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Price with Discount</h4>
                  <div className="flex items-center gap-4 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <PriceDisplay price={40000} originalPrice={50000} />
                    <PriceDisplay price={200000} originalPrice={250000} />
                    <PriceDisplay price={1200000} originalPrice={1500000} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Size Variants</h4>
                  <div className="flex items-center gap-6 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Small</p>
                      <PriceDisplay price={50000} originalPrice={70000} size="sm" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Medium</p>
                      <PriceDisplay price={50000} originalPrice={70000} size="md" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Large</p>
                      <PriceDisplay price={50000} originalPrice={70000} size="lg" />
                    </div>
                  </div>
                </div>

                <CodeBlock code={`// Basic usage
<PriceDisplay price={50000} />

// With discount
<PriceDisplay 
  price={40000} 
  originalPrice={50000}
  showDiscount={true}
/>

// Size variants
<PriceDisplay 
  price={50000} 
  originalPrice={70000}
  size="lg"
  currency="đ"
/>`} />
              </div>
            </div>

            {/* StatsCard Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">StatsCard - Statistics Display with Animation</h3>
              <p className="text-gray-600 mb-6">
                Display key metrics with animated counters, change indicators, and optional icons.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatsCard
                  id="revenue"
                  title="Doanh thu"
                  value={12500000}
                  change={15.5}
                  changeType="increase"
                  icon={<TrendingUp className="w-8 h-8" />}
                  color={designTokens.colors.primary.DEFAULT}
                />
                <StatsCard
                  id="orders"
                  title="Đơn hàng"
                  value={342}
                  change={8.3}
                  changeType="decrease"
                  icon={<ShoppingCart className="w-8 h-8" />}
                />
                <StatsCard
                  id="kocs"
                  title="KOCs hoạt động"
                  value={156}
                  change={0}
                  changeType="neutral"
                  icon={<Users className="w-8 h-8" />}
                />
              </div>

              <CodeBlock code={`// Basic stats card
<StatsCard
  id="revenue"
  title="Doanh thu"
  value={12500000}
  change={15.5}
  changeType="increase"
  icon={<TrendingUp className="w-8 h-8" />}
  color={designTokens.colors.primary.DEFAULT}
/>

// With decrease indicator
<StatsCard
  id="orders"
  title="Đơn hàng"
  value={342}
  change={8.3}
  changeType="decrease"
  icon={<ShoppingCart className="w-8 h-8" />}
/>

// Clickable card
<StatsCard
  id="kocs"
  title="KOCs hoạt động"
  value={156}
  onClick={() => navigate('/kocs')}
/>`} />
            </div>

            {/* RankingBadge Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">RankingBadge - KOC Ranking Display</h3>
              <p className="text-gray-600 mb-6">
                Display KOC rankings with level-based colors, optional icons for top ranks, and size variants.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Level Colors</h4>
                  <div className="flex items-center gap-4 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <RankingBadge rank={15} level="Nano" />
                    <RankingBadge rank={8} level="Micro" />
                    <RankingBadge rank={4} level="Macro" />
                    <RankingBadge rank={1} level="Celebrity" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Ranks with Icons</h4>
                  <div className="flex items-center gap-4 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <RankingBadge rank={1} level="Celebrity" showIcon={true} />
                    <RankingBadge rank={2} level="Macro" showIcon={true} />
                    <RankingBadge rank={3} level="Macro" showIcon={true} />
                    <RankingBadge rank={4} level="Macro" showIcon={false} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Size Variants</h4>
                  <div className="flex items-center gap-6 flex-wrap p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Small</p>
                      <RankingBadge rank={1} level="Celebrity" size="sm" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Medium</p>
                      <RankingBadge rank={1} level="Celebrity" size="md" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Large</p>
                      <RankingBadge rank={1} level="Celebrity" size="lg" />
                    </div>
                  </div>
                </div>

                <CodeBlock code={`// Basic ranking badge
<RankingBadge rank={1} level="Celebrity" />

// Different levels
<RankingBadge rank={15} level="Nano" />
<RankingBadge rank={8} level="Micro" />
<RankingBadge rank={4} level="Macro" />
<RankingBadge rank={1} level="Celebrity" />

// With icon for top ranks
<RankingBadge 
  rank={1} 
  level="Celebrity" 
  showIcon={true}
  size="lg"
/>`} />
              </div>
            </div>

            {/* Combined Example */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Real-World Example: KOC Product Card</h3>
              <p className="text-gray-600 mb-6">
                Combining IKK components to create a complete product card with pricing and KOC ranking.
              </p>

              <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <ShoppingCart className="w-20 h-20 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">Premium Skincare Set</h4>
                    <RankingBadge rank={2} level="Macro" showIcon={true} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Bộ sản phẩm chăm sóc da cao cấp từ thương hiệu nổi tiếng
                  </p>
                  <div className="mb-4">
                    <PriceDisplay 
                      price={850000} 
                      originalPrice={1200000}
                      size="lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <StatsCard
                      id="views"
                      title="Lượt xem"
                      value={2500}
                      change={12}
                      changeType="increase"
                    />
                    <StatsCard
                      id="sales"
                      title="Đã bán"
                      value={187}
                      change={25}
                      changeType="increase"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <CodeBlock code={`<div className="max-w-sm bg-white border rounded-xl overflow-hidden shadow-lg">
  <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100">
    {/* Product Image */}
  </div>
  <div className="p-6">
    <div className="flex items-start justify-between mb-3">
      <h4 className="text-lg font-semibold">Premium Skincare Set</h4>
      <RankingBadge rank={2} level="Macro" showIcon={true} size="sm" />
    </div>
    
    <p className="text-sm text-gray-600 mb-4">
      Bộ sản phẩm chăm sóc da cao cấp
    </p>
    
    <div className="mb-4">
      <PriceDisplay 
        price={850000} 
        originalPrice={1200000}
        size="lg"
      />
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <StatsCard
        id="views"
        title="Lượt xem"
        value={2500}
        change={12}
        changeType="increase"
      />
      <StatsCard
        id="sales"
        title="Đã bán"
        value={187}
        change={25}
        changeType="increase"
      />
    </div>
  </div>
</div>`} />
              </div>
            </div>
          </div>
        </Section>
        )}

        {/* Guides Section */}
        {activeTab === 'guides' && (
        <>
        <Section title="Hướng Dẫn Migration">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tại sao nên migrate sang Apple HIG Components?</h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-2">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Tính nhất quán:</strong> Tất cả components tuân theo cùng một design language, đảm bảo UI đồng nhất</span>
                </p>
                <p className="flex items-start gap-2">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Khả năng tiếp cận:</strong> Built-in accessibility features (ARIA labels, keyboard navigation, screen reader support)</span>
                </p>
                <p className="flex items-start gap-2">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Dễ bảo trì:</strong> Centralized updates, bug fixes áp dụng cho toàn bộ hệ thống</span>
                </p>
                <p className="flex items-start gap-2">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Developer experience:</strong> Props rõ ràng, TypeScript support, documentation đầy đủ</span>
                </p>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  <strong>Hướng dẫn này bao gồm:</strong> 4 ví dụ migration chi tiết (Buttons, Forms, Navigation, Layout), 
                  checklist đầy đủ, và best practices để đảm bảo quá trình chuyển đổi suôn sẻ.
                </p>
              </div>
            </div>

            {/* A. Buttons Migration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">A. Migration Buttons</h3>
              <ComparisonCard
                title="Standardize Button Components"
                before={
                  <div className="space-y-3">
                    <button className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700">
                      Tham gia chiến dịch
                    </button>
                    <button className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm">
                      Xem chi tiết
                    </button>
                    <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50">
                      Tìm hiểu thêm
                    </button>
                  </div>
                }
                after={
                  <div className="space-y-3">
                    <AppleButton variant="primary" size="md" data-testid="button-migration-primary">
                      Tham gia chiến dịch
                    </AppleButton>
                    <AppleButton variant="secondary" size="md" data-testid="button-migration-secondary">
                      Xem chi tiết
                    </AppleButton>
                    <AppleButton variant="outline" size="md" data-testid="button-migration-outline">
                      Tìm hiểu thêm
                    </AppleButton>
                  </div>
                }
                beforeCode={`// ❌ Inconsistent styling, manual hover states
<button className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700">
  Tham gia chiến dịch
</button>
<button className="bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md text-sm">
  Xem chi tiết
</button>
<button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50">
  Tìm hiểu thêm
</button>`}
                afterCode={`// ✅ Standardized, consistent sizing & states
import { AppleButton } from '@/components/apple';

<AppleButton variant="primary" size="md">
  Tham gia chiến dịch
</AppleButton>
<AppleButton variant="secondary" size="md">
  Xem chi tiết
</AppleButton>
<AppleButton variant="outline" size="md">
  Tìm hiểu thêm
</AppleButton>`}
              />
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Lợi ích:</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>Kích thước nhất quán (sm, md, lg) với padding chuẩn</li>
                  <li>Hover states và focus rings tự động</li>
                  <li>Loading state và disabled state built-in</li>
                  <li>Accessibility: proper ARIA attributes, keyboard support</li>
                </ul>
              </div>
            </div>

            {/* B. Forms Migration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">B. Migration Form Components</h3>
              <ComparisonCard
                title="Standardize Form Inputs"
                before={
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        placeholder="email@example.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-red-500 text-xs mt-1">Email không hợp lệ</p>
                    </div>
                  </div>
                }
                after={
                  <div className="space-y-4">
                    <AppleInput
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
                      leftIcon={<Mail className="w-4 h-4" />}
                      error="Email không hợp lệ"
                      data-testid="input-migration-email"
                    />
                  </div>
                }
                beforeCode={`// ❌ Manual label, error handling, styling
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <input 
    type="email" 
    placeholder="email@example.com"
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <p className="text-red-500 text-xs mt-1">Email không hợp lệ</p>
</div>`}
                afterCode={`// ✅ Built-in label, error support, icons
import { AppleInput } from '@/components/apple';
import { Mail } from 'lucide-react';

<AppleInput
  label="Email"
  type="email"
  placeholder="email@example.com"
  leftIcon={<Mail className="w-4 h-4" />}
  error="Email không hợp lệ"
/>`}
              />
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Lợi ích:</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>Built-in accessibility: proper label association, ARIA attributes</li>
                  <li>Consistent error handling và validation UI</li>
                  <li>Icon support (left/right) không cần custom styling</li>
                  <li>Disabled và loading states tự động</li>
                </ul>
              </div>
            </div>

            {/* C. Navigation Migration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">C. Migration Navigation Components</h3>
              <ComparisonCard
                title="Standardize Tabs Navigation"
                before={
                  <div>
                    <div className="flex gap-2 border-b border-gray-200">
                      <button className="px-4 py-2 border-b-2 border-pink-600 text-pink-600 font-medium">
                        Tổng quan
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                        Chiến dịch
                      </button>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                        Báo cáo
                      </button>
                    </div>
                  </div>
                }
                after={
                  <AppleTabs
                    tabs={[
                      { id: 'overview', label: 'Tổng quan', icon: <Home className="w-4 h-4" /> },
                      { id: 'campaigns', label: 'Chiến dịch', icon: <FileText className="w-4 h-4" /> },
                      { id: 'reports', label: 'Báo cáo', icon: <TrendingUp className="w-4 h-4" /> },
                    ]}
                    activeTab={tabsActiveTab}
                    onChange={setTabsActiveTab}
                    data-testid="tabs-migration-nav"
                  />
                }
                beforeCode={`// ❌ Manual state, styling, no keyboard navigation
const [activeTab, setActiveTab] = useState('overview');

<div className="flex gap-2 border-b border-gray-200">
  <button 
    onClick={() => setActiveTab('overview')}
    className={\`px-4 py-2 \${activeTab === 'overview' ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-600'}\`}
  >
    Tổng quan
  </button>
  {/* More tabs... */}
</div>`}
                afterCode={`// ✅ Built-in state, keyboard navigation, ARIA
import { AppleTabs } from '@/components/apple';

<AppleTabs
  tabs={[
    { id: 'overview', label: 'Tổng quan', icon: <Home /> },
    { id: 'campaigns', label: 'Chiến dịch', icon: <FileText /> },
    { id: 'reports', label: 'Báo cáo', icon: <TrendingUp /> },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>`}
              />
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Lợi ích:</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>Keyboard navigation tự động (Arrow keys, Tab, Enter)</li>
                  <li>ARIA labels và roles cho screen readers</li>
                  <li>Icon support và badge indicators</li>
                  <li>Responsive: scroll trên mobile, full width trên desktop</li>
                </ul>
              </div>
            </div>

            {/* D. Layout Migration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">D. Migration Layout Components</h3>
              <ComparisonCard
                title="Standardize Grid Layouts"
                before={
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-100 rounded">Card 1</div>
                    <div className="p-4 bg-gray-100 rounded">Card 2</div>
                    <div className="p-4 bg-gray-100 rounded">Card 3</div>
                    <div className="p-4 bg-gray-100 rounded">Card 4</div>
                  </div>
                }
                after={
                  <AppleGrid cols={{ sm: 2, lg: 3, xl: 4 }} gap="md">
                    <div className="p-4 bg-gray-100 rounded">Card 1</div>
                    <div className="p-4 bg-gray-100 rounded">Card 2</div>
                    <div className="p-4 bg-gray-100 rounded">Card 3</div>
                    <div className="p-4 bg-gray-100 rounded">Card 4</div>
                  </AppleGrid>
                }
                beforeCode={`// ❌ Repeated responsive classes everywhere
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>

{/* Repeated in 10+ places with different breakpoints */}`}
                afterCode={`// ✅ Reusable, standardized breakpoints
import { AppleGrid } from '@/components/apple';

<AppleGrid cols={{ sm: 2, lg: 3, xl: 4 }} gap="md">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</AppleGrid>`}
              />
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Lợi ích:</h4>
                <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                  <li>Standardized breakpoints (xs, sm, md, lg, xl) trên toàn bộ app</li>
                  <li>Consistent spacing với gap presets (xs, sm, md, lg, xl)</li>
                  <li>Dễ maintain: thay đổi 1 chỗ, apply toàn bộ</li>
                  <li>Auto-responsive: tự động điều chỉnh theo viewport</li>
                </ul>
              </div>
            </div>

            {/* Migration Checklist */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Checklist Migration</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Trước khi bắt đầu:</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-identify" />
                      <span>✅ Xác định các components cần migrate (buttons, inputs, cards, tables)</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-review" />
                      <span>✅ Review Apple HIG showcase để hiểu rõ components có sẵn</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-backup" />
                      <span>✅ Tạo backup code hiện tại hoặc branch mới trên Git</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Trong quá trình migration:</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-section" />
                      <span>✅ Replace components từng section một (không làm hết cùng lúc)</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-imports" />
                      <span>✅ Import đúng components: <code className="bg-white px-1 rounded">import {`{ AppleButton }`} from '@/components/apple'</code></span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-props" />
                      <span>✅ Sử dụng đúng props (variant, size, icon) theo documentation</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-green-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-testid" />
                      <span>✅ Thêm data-testid cho tất cả interactive elements</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">Sau khi migration:</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-accessibility" />
                      <span>✅ Test accessibility (keyboard navigation, Tab, Enter, ESC, screen readers)</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-tokens" />
                      <span>✅ Update styling để sử dụng design tokens từ constants</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-cleanup" />
                      <span>✅ Remove old CSS classes và Tailwind utility classes không dùng</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-responsive" />
                      <span>✅ Test responsive trên mobile, tablet, desktop</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 p-2 rounded transition-colors">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-review-final" />
                      <span>✅ Code review và QA testing trước khi deploy</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Best Practices">
          <div className="space-y-8">
            {/* 1. Composition Patterns */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">1. Composition Patterns - Kết hợp Components</h3>
              <p className="text-gray-600 mb-6">
                Học cách kết hợp các Apple components đơn giản để tạo UI phức tạp, maintainable và reusable.
              </p>

              <div className="space-y-6">
                {/* Form Composition */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📝 Form với AppleInput + AppleSelect + AppleButton</h4>
                  <CodeBlock code={`import { AppleInput, AppleSelect, AppleButton } from '@/components/apple';

function CampaignForm() {
  return (
    <div className="space-y-4">
      <AppleInput
        label="Tên chiến dịch"
        placeholder="Nhập tên chiến dịch"
        required
      />
      
      <AppleSelect
        label="Loại chiến dịch"
        options={[
          { value: 'product', label: 'Sản phẩm' },
          { value: 'brand', label: 'Thương hiệu' },
          { value: 'event', label: 'Sự kiện' }
        ]}
        required
      />
      
      <AppleInput
        label="Ngân sách"
        type="number"
        placeholder="0"
        leftIcon={<DollarSign className="w-4 h-4" />}
      />
      
      <div className="flex gap-3 pt-4">
        <AppleButton variant="outline" size="md">
          Hủy
        </AppleButton>
        <AppleButton variant="primary" size="md">
          Tạo chiến dịch
        </AppleButton>
      </div>
    </div>
  );
}`} />
                </div>

                {/* Dashboard Composition */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📊 Dashboard với AppleMetricCard + AppleChart</h4>
                  <CodeBlock code={`import { AppleMetricCard, AppleChart, AppleGrid } from '@/components/apple';

function Dashboard() {
  const revenueData = [
    { month: 'T1', value: 125000000 },
    { month: 'T2', value: 145000000 },
    { month: 'T3', value: 168000000 }
  ];

  return (
    <>
      <AppleGrid cols={{ sm: 2, lg: 4 }} gap="md">
        <AppleMetricCard
          title="Tổng doanh thu"
          value="438M"
          change={15.3}
          changeType="increase"
          icon={<TrendingUp />}
        />
        <AppleMetricCard
          title="Chiến dịch đang chạy"
          value="24"
          change={-5}
          changeType="decrease"
        />
        <AppleMetricCard
          title="KOC tham gia"
          value="1,245"
          change={12}
          changeType="increase"
        />
        <AppleMetricCard
          title="Tỷ lệ chuyển đổi"
          value="3.2%"
          change={0.5}
          changeType="increase"
        />
      </AppleGrid>

      <div className="mt-6">
        <AppleChart
          data={revenueData}
          type="line"
          xKey="month"
          yKey="value"
          title="Doanh thu theo tháng"
        />
      </div>
    </>
  );
}`} />
                </div>

                {/* Data Table Composition */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🗂️ Data Table với AppleTable + ApplePagination + AppleDropdown</h4>
                  <CodeBlock code={`import { AppleTable, ApplePagination, AppleDropdown } from '@/components/apple';

function KOCTable() {
  const columns = [
    { key: 'name', label: 'KOC' },
    { key: 'tier', label: 'Tier' },
    { key: 'followers', label: 'Followers' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'actions', label: 'Actions' }
  ];

  const rows = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      tier: 'Macro',
      followers: '125K',
      engagement: '4.5%',
      actions: (
        <AppleDropdown
          items={[
            { label: 'Xem profile', icon: <User />, onClick: () => {} },
            { label: 'Gửi tin nhắn', icon: <Mail />, onClick: () => {} },
            { label: 'Mời tham gia', icon: <FileText />, onClick: () => {} }
          ]}
        />
      )
    }
  ];

  return (
    <>
      <AppleTable columns={columns} data={rows} />
      
      <div className="mt-4">
        <ApplePagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => console.log(page)}
        />
      </div>
    </>
  );
}`} />
                </div>
              </div>
            </div>

            {/* 2. Accessibility Guidelines */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">2. Accessibility Guidelines - Hướng dẫn Khả năng Tiếp cận</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Nguyên tắc cơ bản:</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-semantic" />
                      <span>✅ <strong>Luôn sử dụng semantic components:</strong> AppleButton thay vì div với onClick</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-aria" />
                      <span>✅ <strong>Cung cấp aria-labels:</strong> Đặc biệt cho icon-only buttons</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-tooltip" />
                      <span>✅ <strong>Sử dụng AppleTooltip:</strong> Cho contextual help và thông tin bổ sung</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-keyboard" />
                      <span>✅ <strong>Đảm bảo keyboard navigation:</strong> Tab, Enter, ESC, Arrow keys hoạt động</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-gray-700">
                      <input type="checkbox" className="mt-0.5" data-testid="checkbox-screen-reader" />
                      <span>✅ <strong>Test với screen readers:</strong> NVDA, JAWS, VoiceOver</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Ví dụ thực tế:</h4>
                  <CodeBlock code={`// ❌ BAD: Không accessibility
<div onClick={handleDelete} className="cursor-pointer">
  <Trash className="w-4 h-4" />
</div>

// ✅ GOOD: Semantic button với aria-label
<AppleButton
  variant="outline"
  size="sm"
  onClick={handleDelete}
  aria-label="Xóa chiến dịch"
  data-testid="button-delete"
>
  <Trash className="w-4 h-4" />
</AppleButton>

// ✅ BETTER: Với tooltip cho context
<AppleTooltip content="Xóa chiến dịch này">
  <AppleButton
    variant="outline"
    size="sm"
    onClick={handleDelete}
    aria-label="Xóa chiến dịch"
  >
    <Trash className="w-4 h-4" />
  </AppleButton>
</AppleTooltip>`} />
                </div>
              </div>
            </div>

            {/* 3. Performance Tips */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">3. Performance Tips - Tối ưu Hiệu suất</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Các kỹ thuật tối ưu:</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        💡 Import chỉ những components cần thiết
                      </p>
                      <CodeBlock code={`// ✅ GOOD: Named imports
import { AppleButton, AppleInput } from '@/components/apple';

// ❌ BAD: Import all (larger bundle)
import * as Apple from '@/components/apple';`} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        💡 Sử dụng AppleSkeleton cho loading states
                      </p>
                      <CodeBlock code={`import { AppleSkeleton } from '@/components/apple';

function CampaignList() {
  const { data, isLoading } = useQuery('/api/campaigns');
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <AppleSkeleton variant="card" count={3} />
      </div>
    );
  }
  
  return <div>{/* Render campaigns */}</div>;
}`} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        💡 Lazy load charts và heavy components
                      </p>
                      <CodeBlock code={`import { lazy, Suspense } from 'react';
import { AppleSkeleton } from '@/components/apple';

const AppleChart = lazy(() => import('@/components/apple/AppleChart'));

function Dashboard() {
  return (
    <Suspense fallback={<AppleSkeleton variant="chart" />}>
      <AppleChart data={revenueData} type="line" />
    </Suspense>
  );
}`} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        💡 Optimize re-renders với React.memo
                      </p>
                      <CodeBlock code={`import { memo } from 'react';
import { AppleCard } from '@/components/apple';

const KOCCard = memo(({ koc }) => (
  <AppleCard>
    <h3>{koc.name}</h3>
    <p>{koc.followers} followers</p>
  </AppleCard>
));

// Chỉ re-render khi koc prop thay đổi`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Common Pitfalls & Solutions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">4. Common Pitfalls & Solutions - Lỗi Thường Gặp</h3>
              <div className="space-y-4">
                {/* Pitfall 1 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <HiOutlineXCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Lỗi: Mixing raw Tailwind với Apple components</h4>
                      <CodeBlock code={`// ❌ BAD
<AppleButton className="bg-blue-500 px-10 py-5">
  Click me
</AppleButton>`} />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-9">
                    <HiOutlineCheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Giải pháp: Sử dụng props hoặc className cho custom styles</h4>
                      <CodeBlock code={`// ✅ GOOD: Use props
<AppleButton variant="primary" size="lg">
  Click me
</AppleButton>

// ✅ OK: Custom styles via className (when needed)
<AppleButton className="shadow-2xl">
  Click me
</AppleButton>`} />
                    </div>
                  </div>
                </div>

                {/* Pitfall 2 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <HiOutlineXCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Lỗi: Quên data-testid attributes</h4>
                      <CodeBlock code={`// ❌ BAD: No testid
<AppleButton onClick={handleSubmit}>
  Submit
</AppleButton>`} />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-9">
                    <HiOutlineCheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Giải pháp: Luôn thêm data-testid cho interactive elements</h4>
                      <CodeBlock code={`// ✅ GOOD
<AppleButton 
  onClick={handleSubmit}
  data-testid="button-submit-campaign"
>
  Submit
</AppleButton>`} />
                    </div>
                  </div>
                </div>

                {/* Pitfall 3 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <HiOutlineXCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Lỗi: Inconsistent spacing/colors</h4>
                      <CodeBlock code={`// ❌ BAD: Random values
<div className="mb-7 text-[#ff0099]">
  <h1 className="text-2xl mb-5">Title</h1>
</div>`} />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 ml-9">
                    <HiOutlineCheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Giải pháp: Sử dụng design tokens từ constants</h4>
                      <CodeBlock code={`// ✅ GOOD: Use design tokens
import { designTokens } from '@/constants/design-tokens';

<div className={designTokens.spacing.sectionSpacing}>
  <h1 className={designTokens.typography.h1}>Title</h1>
</div>

// Or use Tailwind with semantic colors
<div className="bg-primary-pink text-white">
  Content
</div>`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Quick Reference Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">5. Quick Reference - Bảng Tham Khảo Nhanh</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Component</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Khi nào sử dụng</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Ví dụ Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleTooltip</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Hiển thị thông tin ngắn khi hover</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Icon buttons, giải thích field</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">ApplePopover</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Hiển thị content phức tạp khi click</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Filters, settings panel, rich content</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleModal</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Workflow phức tạp, multi-step forms</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Tạo campaign, edit profile, uploads</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleDialog</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Confirmations, alerts quan trọng</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Delete confirmations, destructive actions</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleChart</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Data visualization đơn giản</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Revenue trends, KOC performance</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">Custom Chart</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Visualization phức tạp, custom interactions</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Advanced analytics, real-time data</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleDropdown</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Actions menu với nhiều options</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Row actions trong table, more options</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleSelect</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Chọn 1 option từ danh sách</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Forms, filters, settings</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleCommandPalette</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Quick actions, navigation nhanh</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Cmd+K shortcuts, global search</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono text-sm">AppleSkeleton</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Loading states, placeholder UI</td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">Fetching data, lazy loading</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>AppleTooltip:</strong> Cho thông tin bổ sung, không critical</li>
                  <li>• <strong>ApplePopover:</strong> Cho UI tương tác (forms, filters) trong popup</li>
                  <li>• <strong>AppleModal:</strong> Cho workflows đòi hỏi focus hoàn toàn</li>
                  <li>• <strong>AppleDialog:</strong> Cho decisions quan trọng cần confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
        </>
        )}

        {/* Real Examples Section */}
        {activeTab === 'examples' && (
        <>
        <Section title="Before/After: Real-World Examples">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Migrating Existing Code</h3>
              <p className="text-gray-600 mb-6">
                Here's how to migrate your existing components to use the standardized Apple HIG design system:
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Step 1: Replace Buttons</h4>
                  <ComparisonCard
                    title="Button Migration"
                    before={
                      <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md">
                        Join Campaign
                      </button>
                    }
                    after={
                      <AppleButton variant="primary" size="md">
                        Join Campaign
                      </AppleButton>
                    }
                    beforeCode={`<button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md">
  Join Campaign
</button>`}
                    afterCode={`<AppleButton variant="primary" size="md">
  Join Campaign
</AppleButton>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Step 2: Replace Status Badges</h4>
                  <ComparisonCard
                    title="Badge Migration"
                    before={
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Active
                      </span>
                    }
                    after={
                      <AppleBadge variant="success" size="md">
                        Active
                      </AppleBadge>
                    }
                    beforeCode={`<span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
  Active
</span>`}
                    afterCode={`<AppleBadge variant="success" size="md">
  Active
</AppleBadge>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Step 3: Standardize Section Headers</h4>
                  <ComparisonCard
                    title="Section Header Migration"
                    before={
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">Active Campaigns</h2>
                          <button className="bg-pink-600 text-white px-4 py-2 rounded">
                            Create New
                          </button>
                        </div>
                        <p className="text-gray-600 mt-2">Manage your ongoing campaigns</p>
                      </div>
                    }
                    after={
                      <AppleSectionHeader
                        title="Active Campaigns"
                        description="Manage your ongoing campaigns"
                        actionButtons={[
                          { label: 'Create New', onClick: () => {}, variant: 'primary' },
                        ]}
                      />
                    }
                    beforeCode={`<div className="mb-6">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">Active Campaigns</h2>
    <button className="bg-pink-600 text-white px-4 py-2 rounded">
      Create New
    </button>
  </div>
  <p className="text-gray-600 mt-2">Manage your ongoing campaigns</p>
</div>`}
                    afterCode={`<AppleSectionHeader
  title="Active Campaigns"
  description="Manage your ongoing campaigns"
  actionButtons={[
    { label: 'Create New', onClick: handleCreate, variant: 'primary' },
  ]}
/>`}
                  />
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-[#ff0086]/10 to-[#ff4da6]/10 p-8 rounded-lg border border-[#ff0086]/20">
              <h3 className="text-2xl font-bold mb-4">Benefits of Standardization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <HiOutlineCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Consistency</h4>
                    <p className="text-sm text-gray-600">
                      All components follow the same design language and patterns
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HiOutlineCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Maintainability</h4>
                    <p className="text-sm text-gray-600">
                      Centralized design tokens make updates easy across the entire app
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HiOutlineCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Accessibility</h4>
                    <p className="text-sm text-gray-600">
                      Built-in focus states and ARIA attributes for better accessibility
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HiOutlineCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Developer Experience</h4>
                    <p className="text-sm text-gray-600">
                      Type-safe props and consistent API make development faster
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Quick Reference */}
        <Section title="Quick Reference">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">Import Statements - All Components</h3>
            <CodeBlock
              code={`// Import design tokens
import { designTokens } from '@/constants/design-tokens';

// Import all Apple components using barrel export
import { 
  // Core Components
  AppleButton,
  AppleBadge,
  AppleSectionHeader,
  
  // Form Components
  AppleInput,
  AppleSelect,
  AppleCheckbox,
  AppleRadioGroup,
  AppleSwitch,
  AppleTextarea,
  
  // Navigation Components
  AppleTabs,
  AppleBreadcrumbs,
  ApplePagination,
  AppleSidebar,
  AppleNav,
  
  // Feedback Components
  useAppleToast,
  AppleToastContainer,
  AppleToastProvider,
  AppleAlert,
  AppleModal,
  AppleDialog,
  AppleLoading,
  AppleSkeleton,
  
  // Data Display Components
  AppleTable,
  AppleCard,
  AppleAvatar,
  AppleList,
  
  // Layout Components
  AppleContainer,
  AppleGrid,
  AppleStack
} from '@/components/apple';

// Example usage in a page component
export default function MyPage() {
  const toast = useAppleToast();
  
  return (
    <AppleToastProvider>
      <AppleContainer maxWidth="lg">
        <div className={designTokens.spacing.sectionSpacing}>
          <AppleSectionHeader
            title="My Page"
            description="Page description"
            actionButtons={[
              { label: 'Primary Action', onClick: handleAction, variant: 'primary' },
              { label: 'Secondary', onClick: handleSecondary, variant: 'outline' },
            ]}
          />
          
          <AppleStack direction="vertical" spacing="lg">
            {/* Buttons */}
            <AppleStack direction="horizontal" spacing="md">
              <AppleButton 
                variant="primary" 
                onClick={() => toast.success('Success!')}
              >
                Click Me
              </AppleButton>
              <AppleBadge variant="success">Active</AppleBadge>
            </AppleStack>
            
            {/* Forms */}
            <AppleInput 
              label="Email" 
              placeholder="Enter email"
            />
            
            {/* Data Display */}
            <AppleCard variant="elevated">
              <AppleCard.Header title="Card Title" />
              <AppleCard.Body>
                <p>Card content here...</p>
              </AppleCard.Body>
            </AppleCard>
          </AppleStack>
        </div>
      </AppleContainer>
      
      <AppleToastContainer />
    </AppleToastProvider>
  );
}`}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-xl font-semibold mb-6">Component Categories</h3>
            <AppleGrid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Core (3)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AppleButton</li>
                  <li>• AppleBadge</li>
                  <li>• AppleSectionHeader</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Forms (6)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AppleInput</li>
                  <li>• AppleSelect</li>
                  <li>• AppleCheckbox</li>
                  <li>• AppleRadioGroup</li>
                  <li>• AppleSwitch</li>
                  <li>• AppleTextarea</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Navigation (5)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AppleTabs</li>
                  <li>• AppleBreadcrumbs</li>
                  <li>• ApplePagination</li>
                  <li>• AppleSidebar</li>
                  <li>• AppleNav</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Feedback (6)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• useAppleToast / AppleToastContainer</li>
                  <li>• AppleAlert</li>
                  <li>• AppleModal</li>
                  <li>• AppleDialog</li>
                  <li>• AppleLoading</li>
                  <li>• AppleSkeleton</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Data Display (4)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AppleTable</li>
                  <li>• AppleCard</li>
                  <li>• AppleAvatar</li>
                  <li>• AppleList</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Layout (3)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AppleContainer</li>
                  <li>• AppleGrid</li>
                  <li>• AppleStack</li>
                </ul>
              </div>
            </AppleGrid>
          </div>
        </Section>
        </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className={`${designTokens.spacing.container} py-8`}>
          <p className="text-center text-gray-600">
            Built with Apple Human Interface Guidelines • IKK Platform Design System
          </p>
        </div>
      </footer>
      
      <AppleToastContainer />
    </div>
  );
}

export default function AppleHIGShowcase() {
  return (
    <AppleToastProvider>
      <AppleHIGShowcaseContent />
    </AppleToastProvider>
  );
}
