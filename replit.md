# Overview

This project is a full-stack design system web application, "IKK Design System," that integrates Apple Human Interface Guidelines with SOOPLIVE's design principles. Its primary purpose is to provide a comprehensive, localized platform for live streaming, e-commerce, and affiliate marketing. The system aims for a light theme, a distinct pink primary color, and a clean, minimal UI, and includes a vast component library to ensure design consistency and support SOOPLIVE's core functionalities.

# User Preferences

Preferred communication style: Simple, everyday language.
Theme: Light theme with white background
Primary color: #ff0086 (pink)
Language: Vietnamese localization
UI Effects: Modern card-based design with clean shadows and borders

# System Architecture

## Design and UI/UX
- **Theme**: Light theme with white background and pink primary color (#ff0086).
- **UI Effects**: Modern card-based design with clean shadows and solid backgrounds, inspired by Apple's minimal design.
- **Localization**: Full Vietnamese localization with cultural adaptations.
- **Design System**: Blends Apple Human Interface Guidelines with SOOPLIVE's design language.
- **Responsive Design**: Mobile-first approach optimized for all device sizes.
- **Accessibility**: ARIA compliance and keyboard navigation support.
- **MANDATORY Design Standard**: All sections must adhere to a specific layout including `max-w-7xl mx-auto px-4 mb-12` container, a header with left-aligned title/description and right-aligned action buttons, specific typography styles, and a mandatory 2-button layout for actions (Filter and CTA). All interactive elements require `data-testid` attributes.
- **Apple HIG Design System** (October 2025 - Production Ready): Production-ready design system at `/apple-hig` with 61 components (52 generic + 9 IKK domain-specific) following Apple Human Interface Guidelines. Features centralized design tokens (`constants/design-tokens.ts`) including colors, typography, spacing, borderRadius, shadows, transitions, breakpoints, and zIndex scales. Intentionally uses IKK's pink primary color (#ff0086) instead of Apple's standard blue for brand consistency.
  
  **Latest Update (Phase 2 - Complete)**: Added 11 components across 3 categories:
  - E-commerce (4): ShoppingCartDrawer, CheckoutStepper, VoucherInput, OrderStatusTracker
  - Utilities (4): EmptyState, ErrorBoundary, OnboardingStepper, BulkActionToolbar  
  - Admin (3): ContentModerationQueue, CommissionRulesEditor, DataExportDialog
  Plus 2 new composition recipes (Complete E-commerce Checkout Flow, Admin Dashboard Pattern) and 3 new showcase tabs. System now at 61 components with 9 recipes covering 85%+ of IKK platform needs.
  
  **Generic Components (52):**
  - **Core Components (3)**: AppleButton (3 sizes × 3 variants), AppleBadge (2 sizes × 5 variants), AppleSectionHeader
  - **Form Components (9)**: AppleInput, AppleSelect, AppleCheckbox, AppleRadioGroup, AppleSwitch, AppleTextarea, **AppleDatePicker** (single/range selection, Vietnamese locale, react-day-picker), **AppleTimePicker** (24h/12h formats, Vietnamese labels, dropdown), **AppleFileUpload** (drag & drop, image preview, validation) - all with full accessibility (ARIA attributes, keyboard navigation)
  - **Navigation Components (5)**: AppleTabs, AppleBreadcrumbs, ApplePagination, AppleSidebar, AppleNav - with active state management and keyboard support
  - **Feedback Components (7)**: AppleToast system (with useAppleToast hook & AppleToastProvider context), AppleAlert, AppleModal, AppleDialog, **AppleDrawer** (left/right/bottom positions, mobile-optimized, backdrop), AppleLoading, AppleSkeleton
  - **Data Display Components (4)**: AppleTable (with sorting), AppleCard (compound: Header/Body/Footer/Image), AppleAvatar, AppleList
  - **Layout Components (3)**: AppleContainer, AppleGrid, AppleStack - responsive design patterns
  - **Advanced Interaction Components (6)**: AppleTooltip (4 positions, delay config, ARIA), ApplePopover (rich content, positioning, keyboard), AppleDropdown (nested menus, keyboard navigation, icons), AppleCommandPalette (Cmd+K, fuzzy search, recent items, Vietnamese), **AppleSearchBar** (debounced 300ms, autocomplete, recent searches, Vietnamese), **AppleFilterPanel** (5 filter types: checkbox/radio/range/date/select, collapsible groups, Vietnamese)
  - **Data Visualization Components (4)**: AppleChart (Line/Bar/Area/Pie with Recharts, IKK theming), AppleMetricCard (KPI display, trends, Vietnamese formatting), AppleProgressBar (determinate/indeterminate, sizes, colors), AppleGauge (circular progress, color thresholds, Vietnamese units)
  - **E-commerce Components (4)**: ShoppingCartDrawer (slide-in cart with quantity controls, discount, checkout CTA), CheckoutStepper (3-step wizard: shipping → payment → confirmation), VoucherInput (code validation, discount badge, async validation), OrderStatusTracker (vertical timeline: ordered → processing → shipping → delivered)
  - **Foundation/Utility Components (4)**: EmptyState (5 variants: noData/noResults/noPermission/notFound/offline with Vietnamese messages), ErrorBoundary (React error boundary with fallback UI, retry, stack trace in dev), OnboardingStepper (multi-step wizard with progress dots, skip option, 4-step demo), BulkActionToolbar (sticky toolbar with select all, batch actions, slide animation)
  - **Admin/Moderation Components (3)**: ContentModerationQueue (table with filter tabs, approve/reject actions, status badges, pagination), CommissionRulesEditor (tier-based rules, category selection, preview calculation, add/remove rows), DataExportDialog (CSV/Excel/JSON formats, date range filter, field selection, progress indicator)
  
  **IKK Domain Components (9):**
  - **Live Streaming**: StreamCard (with live badges, viewer counts, Vietnamese labels)
  - **E-commerce**: ProductCard (Vietnamese price formatting 50.000đ), PriceDisplay (discount badges, thousand separators)
  - **Affiliate Marketing**: KOCCard (level badges, follower counts, verification), CampaignCard (progress bars, status badges, deadline countdowns), CommissionBadge (gradient backgrounds, shimmer animations)
  - **Analytics**: StatsCard (change indicators, animated counters), RankingBadge (tier colors: Nano/Micro/Macro/Celebrity)
  - **Status Indicators**: LiveStatusBadge (pulsing animations for live status)
  
  **Composition Patterns (9 Recipes):**
  - Stream Grid Layout: AppleGrid + StreamCards with filters
  - Product Gallery: AppleGrid + ProductCards with sorting and pagination
  - Campaign Dashboard: StatsCards + CampaignCards with alerts
  - KOC Directory: Search + KOCCards with level filters
  - E-commerce Product Page: Complex multi-component layout combining ProductCard, PriceDisplay, CommissionBadge, StatsCard, StreamCard
  - Advanced KOC Discovery: AppleSearchBar + AppleFilterPanel + AppleDrawer (responsive mobile pattern with bottom drawer)
  - Campaign Scheduling Form: AppleDatePicker + AppleTimePicker + Form validation (Vietnamese datetime, duration calculation)
  - **Complete E-commerce Checkout Flow**: ProductCard → ShoppingCartDrawer (cart management) → CheckoutStepper (3-step wizard) → OrderStatusTracker (delivery timeline). Full purchase journey from product to delivery.
  - **Admin Dashboard Pattern**: StatsCard (4 KPIs) + ContentModerationQueue (approval workflow) + CommissionRulesEditor (tier config) + DataExportDialog (data download). Complete admin management interface.
  
  **Documentation & Guides:**
  - **Migration Guide**: Step-by-step migration from raw code to Apple components with 4 before/after examples (Buttons, Forms, Navigation, Layout), Vietnamese checklist, benefits explained
  - **Best Practices**: Composition patterns, accessibility guidelines (WCAG 2.1 AA), performance tips, common pitfalls & solutions, quick reference card
  
  **Showcase**: Interactive 18-tab interface (Overview, Buttons, Badges, Headers, Forms, Navigation, Feedback, Data, Layout, Advanced Interactions, Data Visualization, IKK Components, E-commerce, Utilities, Admin, Recipes, Guides, Examples) with comprehensive examples, before/after comparisons, live previews, usage code, composition patterns, and developer documentation. All components are WCAG 2.1 AA compliant with Vietnamese UI text and proper data-testid attributes.

## Technical Implementation
- **Frontend**: React 18 with TypeScript, Tailwind CSS (custom design tokens), shadcn/ui (Radix UI primitives), TanStack Query for state management, Wouter for routing, and Vite for building.
- **Backend**: Node.js with Express.js, TypeScript, RESTful API (`/api` prefix), serving static React builds in production.
- **Database**: PostgreSQL with Neon serverless hosting, Drizzle ORM for type-safe operations, and a centralized schema.
- **Authentication**: Express sessions with PostgreSQL session store, basic username/password authentication.

## Feature Specifications
- **Comprehensive Component Library**: Includes components for live streaming (player, stream cards, chat), event banners, ranking systems, user profiles, e-sports (tournaments, teams), mobile-optimized elements, and admin tools.
- **Specialized Systems**: Full e-commerce integration (product cards, cart, checkout), complete affiliate marketing system (dashboard, campaign management, KOC tracking), and navigation based on Apple HIG principles.
- **Admin System**: Fully functional, localized admin pages for various management tasks (dashboard, campaign, brand, KOC, analytics, financial, communication, user, content management, system settings). All admin interfaces utilize Heroicons v2 and conform to the MANDATORY Design Standard, incorporating advanced features like search, filtering, detailed tables, and data visualizations.
- **Admin Design System**: A complete admin design system at `/design-system/admin` featuring live previews of all admin components, interactive charts (Recharts), functional data tables, dialogs, and forms. Includes fixed navigation and templates for all major admin functionalities, fully localized and compliant with design standards.
- **Page Templates**: Pre-built layouts for Homepage, Profile, Stream, Tournament, and Admin.

# External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **UI Components**: Radix UI primitives, shadcn/ui
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Noto Sans Korean, Roboto)
- **Icons**: Heroicons v2 (react-icons/hi2), lucide-react, react-icons/fa
- **Charts**: Recharts library