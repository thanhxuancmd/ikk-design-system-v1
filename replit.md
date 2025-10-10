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
- **Apple HIG Design System** (October 2025): Complete design system at `/apple-hig` featuring centralized design tokens (`constants/design-tokens.ts`) and standardized components (`components/apple/`). Intentionally uses IKK's pink primary color (#ff0086) instead of Apple's standard blue for brand consistency. Includes AppleButton (3 sizes × 3 variants), AppleBadge (2 sizes × 5 variants), and AppleSectionHeader for consistent layouts. Interactive showcase with tabbed navigation demonstrates all components with before/after comparisons and live previews.

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