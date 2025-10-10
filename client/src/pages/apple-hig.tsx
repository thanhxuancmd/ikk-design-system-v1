import { useState } from 'react';
import { AppleButton } from '@/components/apple/AppleButton';
import { AppleBadge } from '@/components/apple/AppleBadge';
import { AppleSectionHeader } from '@/components/apple/AppleSectionHeader';
import { designTokens } from '@/constants/design-tokens';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';

export default function AppleHIGShowcase() {
  const [activeTab, setActiveTab] = useState<string>('overview');

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
            {['overview', 'buttons', 'badges', 'headers', 'layout', 'examples'].map((tab) => (
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

        {/* Layout Patterns Section */}
        {activeTab === 'layout' && (
        <Section title="Layout Patterns">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Standardized Container Pattern</h3>
              <CodeBlock
                code={`// Apply to all pages for consistent width and padding
<div className="${designTokens.spacing.container}">
  <div className="${designTokens.spacing.sectionSpacing}">
    {/* Section content */}
  </div>
</div>`}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Section Spacing</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Use consistent <code className="bg-gray-100 px-2 py-1 rounded text-sm">mb-12</code> spacing 
                  between sections for visual hierarchy
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 space-y-12">
                  <div className="bg-blue-50 p-4 rounded">Section 1</div>
                  <div className="bg-blue-50 p-4 rounded">Section 2 (mb-12 spacing)</div>
                  <div className="bg-blue-50 p-4 rounded">Section 3 (mb-12 spacing)</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6">Grid Patterns</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">2-Column Grid</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-4 rounded">Column 1</div>
                    <div className="bg-gray-100 p-4 rounded">Column 2</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">3-Column Grid</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-4 rounded">Column 1</div>
                    <div className="bg-gray-100 p-4 rounded">Column 2</div>
                    <div className="bg-gray-100 p-4 rounded">Column 3</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">4-Column Grid</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-100 p-4 rounded">Column 1</div>
                    <div className="bg-gray-100 p-4 rounded">Column 2</div>
                    <div className="bg-gray-100 p-4 rounded">Column 3</div>
                    <div className="bg-gray-100 p-4 rounded">Column 4</div>
                  </div>
                </div>
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
            <h3 className="text-xl font-semibold mb-6">Import Statements</h3>
            <CodeBlock
              code={`// Import design tokens
import { designTokens } from '@/constants/design-tokens';

// Import Apple components
import { AppleButton } from '@/components/apple/AppleButton';
import { AppleBadge } from '@/components/apple/AppleBadge';
import { AppleSectionHeader } from '@/components/apple/AppleSectionHeader';

// Use in your components
export default function MyPage() {
  return (
    <div className={designTokens.spacing.container}>
      <div className={designTokens.spacing.sectionSpacing}>
        <AppleSectionHeader
          title="My Page"
          description="Page description"
          actionButtons={[
            { label: 'Primary Action', onClick: handleAction, variant: 'primary' },
            { label: 'Secondary', onClick: handleSecondary, variant: 'outline' },
          ]}
        />
        
        <div className="flex gap-4">
          <AppleButton variant="primary" size="md">
            Click Me
          </AppleButton>
          <AppleBadge variant="success" size="md">
            Status
          </AppleBadge>
        </div>
      </div>
    </div>
  );
}`}
            />
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
    </div>
  );
}
