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
  LiveStatusBadge
} from '@/components/apple';
import { designTokens } from '@/constants/design-tokens';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { Mail, User, Home, FileText, Settings, ShoppingCart, TrendingUp, Users } from 'lucide-react';

function AppleHIGShowcaseContent() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // State for interactive examples
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabsActiveTab, setTabsActiveTab] = useState('home');
  const [radioValue, setRadioValue] = useState('option1');
  const toast = useAppleToast();

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
            {['overview', 'buttons', 'badges', 'headers', 'forms', 'navigation', 'feedback', 'data', 'layout-components', 'ikk-components', 'recipes', 'examples'].map((tab) => (
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
