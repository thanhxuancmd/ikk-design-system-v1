import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Bell, Menu, X, Play, Palette, Type, Grid3X3, FileText, Layers, 
  PlusCircle, Plus, Target, MessageCircle, TrendingUp, Award, User, Video,
  Star, Heart, Eye, Zap, Code, Smartphone, Monitor, Tablet, 
  Navigation, Component, Settings, Book, Workflow, Box,
  Shield, Crown, Globe, Layout, Clock, Plane, ShoppingBag, Users,
  Camera, Share2, Trophy, Megaphone, Gift, DollarSign, Search,
  BarChart3, CheckCircle, Bookmark, ClipboardList, Shirt,
  Radio, ThumbsUp, Send, Activity, Timer, Package, Quote,
  Filter, ChevronDown, Sparkles, Flame, ArrowUp, Info,
  Calendar, MapPin, Tag, BadgeCheck, AlertCircle, History,
  CreditCard, Upload, UserPlus, HelpCircle, Link2, Copy,
  Download, Wallet, PhoneCall, Mail, Headphones, RefreshCw,
  Lightbulb, ListChecks, Briefcase, ExternalLink, Image,
  RotateCcw, Presentation, PlayCircle, TrendingDown, Flag,
  UserCheck, UserX, ChevronLeft, ChevronRight, MoreHorizontal,
  Trash2, Edit3, MessageSquare, ThumbsDown, AlertTriangle,
  FileCheck, FileMinus, Pause, FastForward, Rewind,
  PieChart, LineChart, TrendingDown as TrendingDownIcon,
  BarChart, Gauge, Target as TargetIcon, Zap as ZapIcon, Car,
  FolderOpen, FolderTree, Edit, Folder, List, Save, Server, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { toast } from 'sonner';
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DesignSystem() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initialize components with useState for dynamic management
  const [components, setComponents] = useState([
    { name: "Primary Button", category: "UI Elements", usage: "250+ lần sử dụng", icon: "PB" },
    { name: "Campaign Card", category: "KOC Components", usage: "180+ lần sử dụng", icon: "CC" },
    { name: "User Profile", category: "Profile Components", usage: "95+ lần sử dụng", icon: "UP" },
    { name: "Chat System", category: "Communication", usage: "45+ lần sử dụng", icon: "CS" },
    { name: "Metrics Widget", category: "Analytics", usage: "67+ lần sử dụng", icon: "MW" },
  ]);

  // Initialize design tokens with useState for dynamic management
  const [designTokens, setDesignTokens] = useState([
    {
      title: "Color System",
      subtitle: "Brand Colors & Palettes",
      description: "Hệ thống màu sắc IKK Platform",
      tag: "FOUNDATIONS",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Typography Scale", 
      subtitle: "Font System & Hierarchy",
      description: "Hệ thống typography cho mọi nền tảng",
      tag: "FOUNDATIONS",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Component Library",
      subtitle: "UI Components & Patterns",
      description: "Thư viện components đầy đủ",
      tag: "COMPONENTS",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile First Design",
      subtitle: "Responsive & Adaptive",
      description: "Thiết kế tối ưu cho mobile",
      tag: "PATTERNS", 
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Vietnamese Localization",
      subtitle: "Cultural Adaptation",
      description: "Bản địa hóa hoàn chỉnh cho Việt Nam",
      tag: "GUIDELINES",
      color: "from-orange-500 to-amber-500"
    }
  ]);
  
  // Handle component deletion
  const handleDeleteComponent = (indexToDelete: number) => {
    const componentToDelete = components[indexToDelete];
    setComponents(prev => prev.filter((_, index) => index !== indexToDelete));
    toast.success(`Đã xóa ${componentToDelete.name} thành công`);
  };

  // Handle design token deletion
  const handleDeleteToken = (indexToDelete: number) => {
    const tokenToDelete = designTokens[indexToDelete];
    setDesignTokens(prev => prev.filter((_, index) => index !== indexToDelete));
    toast.success(`Đã xóa ${tokenToDelete.title} thành công`);
  };

  // KOC Ranking states
  const [selectedTab, setSelectedTab] = useState('top-doanh-thu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSocialChannel, setSelectedSocialChannel] = useState('all');

  // Analytics & Report states
  const [selectedReportTab, setSelectedReportTab] = useState<'overview' | 'revenue' | 'performance'>('overview');

  // Financial Management states
  const [selectedFinancialTab, setSelectedFinancialTab] = useState<'overview' | 'income' | 'expenses'>('overview');

  // Section navigation state
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);

  // System Settings states
  const [selectedSettingsTab, setSelectedSettingsTab] = useState<'general' | 'security' | 'notifications' | 'integrations'>('general');

  // Section 57 - Campaign Management states
  const [campaignTab, setCampaignTab] = useState<'all' | 'active' | 'draft' | 'completed' | 'paused'>('all');
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  // Section 58 - Create Campaign states
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Section navigation data
  const sections = [
    { id: 'section-46', number: '46', title: 'Quản lý chiến dịch TikTok' },
    { id: 'section-46-5', number: '46.5', title: 'Quản lý chiến dịch Instagram' },
    { id: 'section-47', number: '47', title: 'Quản lý danh mục thương hiệu' },
    { id: 'section-48', number: '48', title: 'Quản lý thương hiệu' },
    { id: 'section-49', number: '49', title: 'Super Admin Dashboard' },
    { id: 'section-50', number: '50', title: 'Quản lý chiến dịch' },
    { id: 'section-51', number: '51', title: 'Quản lý KOC - Thị trường KOL' },
    { id: 'section-52', number: '52', title: 'Hệ thống xếp hạng KOC' },
    { id: 'section-53', number: '53', title: 'Analytics & Báo cáo' },
    { id: 'section-54', number: '54', title: 'Quản lý tài chính' },
    { id: 'section-55', number: '55', title: 'Cài đặt hệ thống' },
    { id: 'section-56', number: '56', title: 'Quản lý người dùng' },
    { id: 'section-57', number: '57', title: 'Quản lý chiến dịch' },
    { id: 'section-58', number: '58', title: 'Thêm chiến dịch' },
    { id: 'section-59', number: '59', title: 'Design System V2 (Home Page)' }
  ];

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - exactly like home page */}
      <header className="bg-background border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/home" className="flex items-center">
                <div className="w-10 h-10 bg-[#ff0086] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-base">IKK</span>
                </div>
              </Link>
            </div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/home" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
                Trang chủ
              </Link>
              <span className="text-[#ff0086] font-medium">Design System</span>
              <Link to="/design-system/admin" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium" data-testid="link-admin">
                Admin
              </Link>
              <a href="#components" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
                Components
              </a>
              <a href="#patterns" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
                Patterns
              </a>
              <a href="#guidelines" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
                Guidelines
              </a>
              <Link to="/design-system-v2" className="text-gray-700 hover:text-[#ff0086] transition-colors font-medium">
                Design System V2
              </Link>
            </nav>

            {/* Right side - Notification + Auth */}
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Đăng nhập
                </button>
                <Button variant="default" className="px-4 py-2 rounded-lg text-sm font-medium">Đăng ký</Button>
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link to="/home" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Trang chủ
            </Link>
            <span className="block px-3 py-2 text-[#ff0086] font-medium text-sm">Design System</span>
            <Link to="/design-system/admin" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="link-admin-mobile">
              Admin
            </Link>
            <a href="#components" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Components
            </a>
            <a href="#patterns" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Patterns
            </a>
            <a href="#guidelines" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Guidelines
            </a>
            <Link to="/design-system-v2" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
              Design System V2
            </Link>
            
            {/* Mobile Auth Buttons */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
              <button className="flex-1 text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng nhập
              </button>
              <Button variant="default" className="flex-1 py-2 rounded-lg text-sm font-medium">Đăng ký</Button>
            </div>
          </div>
        </div>
      )}

      {/* Design Principles Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IKK Design Principles</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nguyên tắc thiết kế cốt lõi định hình trải nghiệm người dùng trên nền tảng IKK
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Principle 1: Color Hierarchy */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phân cấp màu sắc</h3>
            <p className="text-sm text-gray-600 mb-4">
              Màu hồng chủ đạo #ff0086 với hệ thống màu phụ trợ rõ ràng cho từng chức năng
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded"></div>
              <div className="w-8 h-8 bg-pink-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-white border border-gray-200 rounded"></div>
            </div>
          </div>

          {/* Principle 2: Whitespace & Breathing */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không gian thở</h3>
            <p className="text-sm text-gray-600 mb-4">
              Padding và spacing đồng nhất tạo cảm giác thoáng, dễ đọc với hệ thống 4/8/16/24px
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1 h-4 bg-gray-200"></div>
                <span>4px - Compact (p-1)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-4 bg-gray-200"></div>
                <span>8px - Default (p-2)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-4 h-4 bg-gray-200"></div>
                <span>16px - Spacious (p-4)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-6 h-4 bg-gray-200"></div>
                <span>24px - Extra Spacious (p-6)</span>
              </div>
            </div>
          </div>

          {/* Principle 3: Rounded Corners */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quản lý chiến dịch Instagram</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tối ưu hóa và theo dõi hiệu suất chiến dịch Instagram với các công cụ phân tích chuyên sâu và báo cáo chi tiết.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaInstagram className="w-4 h-4 text-pink-500" />
              <span>Phân tích hiệu suất</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span>Báo cáo chi tiết</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Target className="w-4 h-4 text-green-500" />
              <span>Tối ưu hóa mục tiêu</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Box className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bo góc nhất quán</h3>
            <p className="text-sm text-gray-600 mb-4">
              rounded-xl (12px) cho cards, rounded-lg (8px) cho buttons, rounded (4px) cho inputs
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-600">xl (12px)</div>
              <div className="w-12 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-600">lg (8px)</div>
              <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">md (6px)</div>
              <div className="w-12 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-600">sm (4px)</div>
            </div>
          </div>

          {/* Principle 4: Shadow & Depth */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hiệu ứng chiều sâu</h3>
            <p className="text-sm text-gray-600 mb-4">
              Shadow tinh tế từ shadow-sm đến shadow-xl, hover effects mượt mà với transitions
            </p>
            <div className="space-y-2">
              <div className="p-2 bg-white rounded shadow-sm text-xs">shadow-sm (Small)</div>
              <div className="p-2 bg-white rounded shadow-md text-xs">shadow-md (Medium)</div>
              <div className="p-2 bg-white rounded shadow-lg text-xs">shadow-lg (Large)</div>
              <div className="p-2 bg-white rounded shadow-xl text-xs">shadow-xl (Extra Large)</div>
            </div>
          </div>

          {/* Principle 5: Typography Scale */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Type className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phân cấp typography</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hệ thống font size rõ ràng từ text-xs đến text-4xl, font-weight từ normal đến bold
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">text-xs (12px) - Normal</p>
              <p className="text-sm text-gray-600">text-sm (14px) - Normal</p>
              <p className="text-base text-gray-700 font-medium">text-base (16px) - Medium</p>
              <p className="text-lg text-gray-800 font-semibold">text-lg (18px) - Semibold</p>
              <p className="text-xl text-gray-900 font-bold">text-xl (20px) - Bold</p>
              <p className="text-2xl text-gray-900 font-bold">text-2xl (24px) - Bold</p>
              <p className="text-3xl text-gray-900 font-bold">text-3xl (30px) - Bold</p>
              <p className="text-4xl text-gray-900 font-bold">text-4xl (36px) - Bold</p>
            </div>
          </div>

          {/* Principle 7: Iconography */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Iconography nhất quán</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sử dụng Lucide React icons với size, stroke-width và màu sắc nhất quán. Áp dụng gradient background và shadow cho icon.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center shadow-sm">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center shadow-sm">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center shadow-sm">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Principle 6: Interactive Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phản hồi tương tác</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hover states, active states, transitions mượt 200-300ms cho mọi interactive element
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="px-4 py-2 rounded-lg">Hover me</Button>
              <Button variant="default" className="px-4 py-2 rounded-lg">Primary action</Button>
            </div>
          </div>
        </div>

        {/* Key Guidelines */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nguyên tắc thiết kế cốt lõi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Nên làm
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0086]">•</span>
                  <span>Sử dụng màu #ff0086 cho primary actions và brand elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0086]">•</span>
                  <span>Dùng Lucide React icons với size nhất quán (w-4 h-4, w-5 h-5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0086]">•</span>
                  <span>Áp dụng hover:shadow-xl cho cards, hover:bg-[#e6007a] cho buttons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0086]">•</span>
                  <span>Maintain consistent padding: p-4, p-6, p-8 theo context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff0086]">•</span>
                  <span>Sử dụng transition-all duration-300 cho smooth animations</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                Không nên làm
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Không sử dụng emoji - chỉ dùng Lucide React icons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Tránh màu sắc không trong palette đã định nghĩa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Không mix border-radius styles (rounded vs rounded-lg vs rounded-xl)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Tránh shadow quá nặng hoặc không có shadow cho cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Không bỏ qua hover states và transitions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icon Menu Section - exactly like home */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Danh mục</h2>
            <Button variant="link" className="text-sm font-medium p-0 h-auto">Xem tất cả</Button>
        </div>

        {/* Category Grid - 8 columns exactly like home */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {/* Colors */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Palette className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Màu sắc
            </span>
          </div>

          {/* Typography */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Type className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Typography
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <PlusCircle className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Nút bấm
            </span>
          </div>

          {/* Forms */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Biểu mẫu
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Layers className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Thẻ
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Navigation className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Điều hướng
            </span>
          </div>

          {/* Icons */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 group-hover:from-red-200 group-hover:to-rose-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Star className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Biểu tượng
            </span>
          </div>

          {/* Layouts */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 group-hover:from-yellow-200 group-hover:to-amber-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Grid3X3 className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Bố cục
            </span>
          </div>
        </div>
      </section>

      {/* Popular Components Section - like popular streamers */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Components phổ biến</h2>
          <div className="flex items-center space-x-4">
            <button className="text-xs text-gray-500 hover:text-pink-500 transition-colors">
              Làm mới danh sách
            </button>
            <button className="text-xs text-pink-500 hover:text-pink-600 transition-colors">
              Xem thêm
            </button>
          </div>
        </div>
        
        {/* Popular Components Horizontal Scroll - exact home style */}
        <div className="flex space-x-6 overflow-x-auto pb-4 mb-8">
          {components.map((component, index) => (
            <div key={index} className="flex-shrink-0 group relative">
              <a href={`#${component.name}`}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] relative group-hover:shadow-md group-hover:scale-[1.02]">
                  {/* Delete Button - positioned in top-right corner */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteComponent(index);
                    }}
                    className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    data-testid={`delete-component-${index}`}
                    title={`Xóa ${component.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Component Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{component.icon}</span>
                    </div>
                    {/* Active indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Component Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-gray-900 truncate">{component.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1 truncate">{component.category}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <span className="text-pink-500 font-medium">{component.usage}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens Banners - like event banners */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="relative">
          {/* Design tokens carousel */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {designTokens.map((token, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-48 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${token.color}`}></div>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                
                {/* Delete Button - positioned in top-right corner */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteToken(index);
                  }}
                  className="absolute top-2 right-2 bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30 text-white hover:text-red-600 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
                  data-testid={`delete-token-${index}`}
                  title={`Xóa ${token.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                        {token.tag}
                      </span>
                      <div className="text-xs opacity-80">{index + 1}</div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{token.subtitle}</h3>
                    <h4 className="text-xl font-bold mb-2">{token.title}</h4>
                  </div>
                  <p className="text-sm opacity-90">{token.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {designTokens.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === 0 ? 'bg-pink-500' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiến dịch KOC đặc sắc - Special KOC Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-special-koc-campaigns">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-special-campaigns">Chiến dịch KOC đặc sắc</h2>
            <p className="text-gray-600" data-testid="text-campaigns-subtitle">Khám phá những cơ hội hợp tác đặc biệt với các thương hiệu hàng đầu</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-[180px]" data-testid="select-campaign-filter">
                <SelectValue placeholder="Bộ lọc chiến dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="food">Ẩm thực</SelectItem>
                <SelectItem value="tech">Công nghệ</SelectItem>
                <SelectItem value="luxury">Cao cấp</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" data-testid="button-view-all-campaigns">
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Campaign Categories Filter */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2" data-testid="container-campaign-categories">
          {[
            { name: "Tất cả", count: "48", active: true },
            { name: "Cao cấp", count: "12", active: false },
            { name: "Độc quyền", count: "8", active: false },
            { name: "Thưởng lớn", count: "15", active: false },
            { name: "Thời hạn ngắn", count: "6", active: false },
            { name: "Mới nhất", count: "7", active: false }
          ].map((category, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category.active 
                  ? "bg-[#ff0086] text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              data-testid={`button-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Special Campaign Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-special-campaigns">
          {[
            {
              id: "special-1",
              title: "Dior Addict Lipstick - Luxury Beauty Experience",
              brand: "Dior Vietnam",
              reward: "25,000,000 VNĐ",
              participants: "5/15",
              deadline: "30/09/2025",
              status: "độc quyền",
              statusColor: "bg-purple-600",
              daysLeft: 8,
              category: "Beauty & Luxury",
              engagement: "45.2K",
              image: "/placeholder.jpg",
              countdown: "Còn 8 ngày",
              campaignType: "Luxury",
              platforms: ["instagram", "youtube"],
              location: "Hồ Chí Minh",
              specialTag: "LUXURY"
            },
            {
              id: "special-2", 
              title: "Louis Vuitton Neverfull - Premium Fashion Review",
              brand: "Louis Vuitton",
              reward: "60,000,000 VNĐ",
              participants: "2/8",
              deadline: "25/09/2025",
              status: "cao cấp",
              statusColor: "bg-amber-600",
              daysLeft: 3,
              category: "Fashion & Luxury",
              engagement: "78.9K",
              image: "/placeholder.jpg",
              countdown: "Còn 3 ngày",
              campaignType: "Premium",
              platforms: ["instagram", "youtube", "tiktok"],
              location: "Hà Nội",
              specialTag: "PREMIUM"
            },
            {
              id: "special-3",
              title: "Mercedes-Benz GLE 2025 - Elite Automotive Experience",
              brand: "Mercedes-Benz Vietnam",
              reward: "45,000,000 VNĐ",
              participants: "8/20",
              deadline: "15/10/2025",
              status: "đặc biệt",
              statusColor: "bg-blue-600",
              daysLeft: 23,
              category: "Automotive & Luxury",
              engagement: "156.7K",
              image: "/placeholder.jpg",
              countdown: "Còn 23 ngày",
              campaignType: "Experience",
              platforms: ["youtube", "instagram", "facebook"],
              location: "Đà Lạt",
              specialTag: "EXCLUSIVE"
            },
            {
              id: "special-4",
              title: "La Mer Skincare - Prestige Beauty Journey",
              brand: "La Mer Vietnam",
              reward: "35,000,000 VNĐ",
              participants: "12/25",
              deadline: "20/10/2025",
              status: "thưởng cao",
              statusColor: "bg-green-600",
              daysLeft: 28,
              category: "Skincare & Luxury",
              engagement: "89.3K",
              image: "/placeholder.jpg",
              countdown: "Còn 28 ngày",
              campaignType: "Spa Experience",
              platforms: ["instagram", "youtube"],
              location: "Hồ Chí Minh",
              specialTag: "HIGH REWARD"
            },
            {
              id: "special-5",
              title: "Michelin Star Restaurant - Culinary Elite Experience",
              brand: "Anan Saigon",
              reward: "15,000,000 VNĐ",
              participants: "18/30",
              deadline: "05/10/2025",
              status: "ẩm thực cao cấp",
              statusColor: "bg-rose-600",
              daysLeft: 13,
              category: "Fine Dining",
              engagement: "67.8K",
              image: "/placeholder.jpg",
              countdown: "Còn 13 ngày",
              campaignType: "Fine Dining",
              platforms: ["instagram", "tiktok", "youtube"],
              location: "Hồ Chí Minh",
              specialTag: "MICHELIN"
            },
            {
              id: "special-6",
              title: "Apple Vision Pro - Next-Gen Technology Review",
              brand: "Apple Vietnam",
              reward: "80,000,000 VNĐ",
              participants: "3/10",
              deadline: "12/10/2025",
              status: "công nghệ mới",
              statusColor: "bg-indigo-600",
              daysLeft: 20,
              category: "Tech Innovation",
              engagement: "234.5K",
              image: "/placeholder.jpg",
              countdown: "Còn 20 ngày",
              campaignType: "Tech Review",
              platforms: ["youtube", "tiktok"],
              location: "Hà Nội",
              specialTag: "INNOVATION"
            },
            {
              id: "special-7",
              title: "Hermès Birkin Collection - Ultra Luxury Fashion",
              brand: "Hermès Paris",
              reward: "120,000,000 VNĐ",
              participants: "1/5",
              deadline: "18/10/2025",
              status: "siêu cao cấp",
              statusColor: "bg-yellow-600",
              daysLeft: 26,
              category: "Ultra Luxury",
              engagement: "312.1K",
              image: "/placeholder.jpg",
              countdown: "Còn 26 ngày",
              campaignType: "Ultra Luxury",
              platforms: ["instagram", "youtube"],
              location: "Paris, France",
              specialTag: "ULTRA LUXURY"
            },
            {
              id: "special-8",
              title: "Four Seasons Resort - Luxury Travel Experience",
              brand: "Four Seasons Vietnam",
              reward: "50,000,000 VNĐ",
              participants: "6/15",
              deadline: "22/10/2025",
              status: "du lịch cao cấp",
              statusColor: "bg-teal-600",
              daysLeft: 30,
              category: "Luxury Travel",
              engagement: "145.6K",
              image: "/placeholder.jpg",
              countdown: "Còn 30 ngày",
              campaignType: "Resort Experience",
              platforms: ["instagram", "youtube", "facebook"],
              location: "Hội An",
              specialTag: "TRAVEL"
            }
          ].map((campaign, index) => {
            const getPlatformIcon = (platform: string) => {
              switch(platform) {
                case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                case 'facebook': return <FaFacebookF className="w-4 h-4 text-blue-600" />;
                default: return null;
              }
            };

            const getCampaignTypeIcon = (type: string) => {
              switch(type) {
                case 'Luxury': return <Crown className="w-4 h-4 text-purple-500" />;
                case 'Premium': return <Star className="w-4 h-4 text-amber-500" />;
                case 'Experience': return <Car className="w-4 h-4 text-blue-500" />;
                case 'Tech Review': return <Smartphone className="w-4 h-4 text-indigo-500" />;
                case 'Fine Dining': return <Trophy className="w-4 h-4 text-rose-500" />;
                default: return <Sparkles className="w-4 h-4 text-gray-500" />;
              }
            };

            return (
              <Card key={campaign.id} className="bg-white border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden" data-testid={`card-special-campaign-${campaign.id}`}>
                {/* Campaign Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <img 
                      src={campaign.image || "/placeholder.jpg"} 
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-campaign-${campaign.id}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                  </div>
                  
                  {/* Status Badge & Platforms */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`px-2 py-0.5 text-[10px] font-medium text-white shadow-sm ${campaign.statusColor}`} data-testid={`badge-status-${campaign.id}`}>
                        {campaign.status}
                      </Badge>
                      {campaign.daysLeft <= 10 && (
                        <Badge className="px-1.5 py-0.5 text-[10px] font-medium bg-yellow-400 text-gray-900 shadow-sm" data-testid={`badge-urgent-${campaign.id}`}>
                          {campaign.daysLeft} ngày
                        </Badge>
                      )}
                      <Badge className="px-1.5 py-0.5 text-[10px] font-bold bg-[#ff0086] text-white shadow-sm" data-testid={`badge-special-${campaign.id}`}>
                        {campaign.specialTag}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      {campaign.platforms?.slice(0, 2).map((platform, idx) => (
                        <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm" data-testid={`icon-platform-${platform}-${campaign.id}`}>
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                      {campaign.platforms?.length > 2 && (
                        <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-gray-600">+{campaign.platforms.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-4">
                  {/* Brand Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {campaign.brand.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900" data-testid={`text-brand-${campaign.id}`}>{campaign.brand}</span>
                        <span className="text-xs text-gray-500" data-testid={`text-category-${campaign.id}`}>{campaign.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getCampaignTypeIcon(campaign.campaignType)}
                      <span className="text-xs font-medium text-gray-600" data-testid={`text-type-${campaign.id}`}>{campaign.campaignType}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors" data-testid={`heading-title-${campaign.id}`}>
                    {campaign.title}
                  </h3>
                  
                  {/* Reward Info - Premium Style */}
                  <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3 border border-[#ff0086]/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-[#ff0086]" data-testid={`text-reward-${campaign.id}`}>{campaign.reward}</div>
                        <div className="text-xs text-gray-600">Phần thưởng đặc biệt</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">KOC tham gia</div>
                        <div className="text-sm font-semibold text-gray-900" data-testid={`text-participants-${campaign.id}`}>{campaign.participants}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Campaign Meta Info */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-1 ${campaign.daysLeft <= 7 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          <Clock className="w-3 h-3" />
                          <span data-testid={`text-deadline-${campaign.id}`}>
                            {campaign.daysLeft <= 7 
                              ? `Còn ${campaign.daysLeft} ngày` 
                              : campaign.deadline
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span data-testid={`text-engagement-${campaign.id}`}>{campaign.engagement}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-medium text-[#ff0086]">
                        <Clock className="w-3 h-3" />
                        <span data-testid={`text-countdown-${campaign.id}`}>{campaign.countdown}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    <span data-testid={`text-location-${campaign.id}`}>{campaign.location}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors" data-testid={`button-apply-${campaign.id}`}>
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Ứng tuyển ngay
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group" data-testid={`button-bookmark-${campaign.id}`}>
                      <Bookmark className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group" data-testid={`button-share-${campaign.id}`}>
                      <Share2 className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Statistics & CTA Section */}
        <div className="mt-8">
          <Card className="bg-white border-gray-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900" data-testid="stat-special-campaigns">48+</div>
                <div className="text-sm text-gray-600">Chiến dịch đặc sắc</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900" data-testid="stat-total-rewards">2.8B+</div>
                <div className="text-sm text-gray-600">Tổng giá trị thưởng (VNĐ)</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900" data-testid="stat-premium-kocs">156</div>
                <div className="text-sm text-gray-600">KOC Premium tham gia</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900" data-testid="stat-luxury-brands">24+</div>
                <div className="text-sm text-gray-600">Thương hiệu cao cấp</div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trở thành KOC Elite</h3>
              <p className="text-gray-600 mb-4">Tham gia các chiến dịch cao cấp với thưởng lên đến 120 triệu VNĐ</p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-join-elite">
                  <Crown className="w-4 h-4 mr-2" />
                  Gia nhập Elite
                </Button>
                <Button variant="outline" data-testid="button-learn-more">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>





      {/* Design System Guidelines - enhanced style like KOC campaigns */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Guidelines & Documentation</h2>
            <p className="text-gray-600">Hướng dẫn thiết kế và tài liệu sử dụng components</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              <span className="flex items-center space-x-2">
                <span>Bộ lọc</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
              Xem tất cả
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            {
              title: "Getting Started",
              description: "Hướng dẫn bắt đầu với IKK Design System",
              category: "Documentation",
              status: "active",
              difficulty: "Beginner",
              estimatedTime: "5 phút",
              icon: Book,
              color: "bg-blue-500"
            },
            {
              title: "Color Tokens",
              description: "Hệ thống màu sắc và cách sử dụng trong UI",
              category: "Foundations",
              status: "active",
              difficulty: "Beginner", 
              estimatedTime: "10 phút",
              icon: Palette,
              color: "bg-pink-500"
            },
            {
              title: "Typography System",
              description: "Font families, sizes và line heights chuẩn",
              category: "Foundations",
              status: "active",
              difficulty: "Intermediate",
              estimatedTime: "15 phút",
              icon: Type,
              color: "bg-indigo-500"
            },
            {
              title: "Component API",
              description: "Props documentation và usage examples",
              category: "Components",
              status: "active",
              difficulty: "Advanced",
              estimatedTime: "30 phút",
              icon: Code,
              color: "bg-green-500"
            },
            {
              title: "Responsive Design",
              description: "Breakpoints và mobile-first approach",
              category: "Patterns",
              status: "active",
              difficulty: "Intermediate",
              estimatedTime: "20 phút",
              icon: Smartphone,
              color: "bg-purple-500"
            },
            {
              title: "Accessibility Guide",
              description: "ARIA compliance và keyboard navigation",
              category: "Guidelines",
              status: "active", 
              difficulty: "Advanced",
              estimatedTime: "25 phút",
              icon: Shield,
              color: "bg-orange-500"
            },
            {
              title: "Vietnamese Localization",
              description: "Quy tắc bản địa hóa và cultural adaptation",
              category: "Guidelines",
              status: "active",
              difficulty: "Intermediate",
              estimatedTime: "15 phút",
              icon: Globe,
              color: "bg-red-500"
            },
            {
              title: "Brand Guidelines",
              description: "Logo usage, voice & tone cho IKK Platform",
              category: "Brand",
              status: "active",
              difficulty: "Beginner",
              estimatedTime: "12 phút", 
              icon: Crown,
              color: "bg-yellow-500"
            }
          ].map((guide, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${guide.color} rounded-lg flex items-center justify-center`}>
                      <guide.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#ff0086] transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-gray-500">{guide.category}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {guide.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">
                    <strong>Độ khó:</strong> {guide.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    <strong>Thời gian:</strong> {guide.estimatedTime}
                  </span>
                </div>
                
                <button className="text-[#ff0086] hover:text-[#e6007a] text-sm font-medium transition-colors">
                  Xem hướng dẫn →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Component Showcase Grid - like live streams */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Component Showcase</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { 
              component: "Button Variants",
              title: "Primary, Secondary & Ghost buttons với interactive states",
              category: "UI Elements",
              usage: "250+",
              tags: ["Buttons", "Interactive", "States", "Brand"]
            },
            { 
              component: "Form Components", 
              title: "Input fields, Select, Checkbox & Validation patterns",
              category: "Forms", 
              usage: "180+",
              tags: ["Forms", "Validation", "Input", "UX"]
            },
            { 
              component: "Card Layouts",
              title: "Campaign cards, Profile cards & Content display cards",
              category: "Layout",
              usage: "156+",
              tags: ["Cards", "Layout", "Content", "Responsive"]
            },
            { 
              component: "Navigation Systems",
              title: "Header navigation, Sidebar & Mobile menu patterns",
              category: "Navigation",
              usage: "45+",
              tags: ["Navigation", "Mobile", "UX", "Responsive"]
            },
            { 
              component: "Data Visualization",
              title: "Charts, Metrics widgets & Dashboard components",
              category: "Analytics",
              usage: "67+",
              tags: ["Charts", "Data", "Metrics", "Analytics"]
            },
            { 
              component: "Chat & Messaging",
              title: "Chat bubbles, Message threading & Real-time UI",
              category: "Communication",
              usage: "89+",
              tags: ["Chat", "Real-time", "Communication", "UX"]
            }
          ].map((showcase, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Component Preview */}
              <div className="relative mb-3 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Component className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  ACTIVE_{showcase.usage}
                </div>
                <div className="absolute top-2 right-2 text-white text-xs bg-black/50 px-1 py-0.5 rounded">
                  View Code
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{showcase.component.charAt(0)}</span>
                    </div>
                    <span className="text-white text-xs font-medium">{showcase.component}</span>
                  </div>
                </div>
              </div>
              
              {/* Component Info */}
              <div>
                <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {showcase.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {showcase.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs text-gray-500 hover:text-pink-500 cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{showcase.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Icons Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Icon Components</h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
            {/* Previous icons would be here */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">Users</span>
              <div className="text-xs text-gray-500 mt-1">Collaborations</div>
            </div>

            {/* Commerce Icons */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">ShoppingBag</span>
              <div className="text-xs text-gray-500 mt-1">E-commerce</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">DollarSign</span>
              <div className="text-xs text-gray-500 mt-1">Monetization</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-all duration-300">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-medium text-gray-700">Eye</span>
              <div className="text-xs text-gray-500 mt-1">Content Views</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg border border-[#ff0086]/20">
            <h4 className="font-semibold text-gray-900 mb-2">Icon Usage Guidelines</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff0086] rounded-full"></div>
                <span>Sử dụng màu sắc phù hợp với từng loại icon: Content Creation (pink/blue), Engagement (red/green), Business (yellow/amber)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                <span>Kích thước chuẩn: w-4 h-4 cho inline, w-6 h-6 cho cards, w-8 h-8 cho showcases</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Luôn sử dụng gradient background và shadow effects để tạo độ sâu</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Typography Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Headings */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Headings</h4>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">H1 - Main Title</h1>
                <h2 className="text-2xl font-bold text-gray-900">H2 - Section Title</h2>
                <h3 className="text-xl font-semibold text-gray-900">H3 - Subsection</h3>
                <h4 className="text-lg font-semibold text-gray-700">H4 - Component Title</h4>
                <h5 className="text-base font-medium text-gray-700">H5 - Sub Component</h5>
                <h6 className="text-sm font-medium text-gray-600">H6 - Small Header</h6>
              </div>
            </div>

            {/* Body Text */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Body Text</h4>
              <div className="space-y-4">
                <p className="text-base text-gray-900">
                  Đây là text size chuẩn cho nội dung chính (16px).
                </p>
                <p className="text-sm text-gray-600">
                  Text size nhỏ cho thông tin phụ và metadata (14px).
                </p>
                <p className="text-xs text-gray-500">
                  Text size rất nhỏ cho labels và captions (12px).
                </p>
                <div className="text-sm text-[#ff0086] font-medium hover:text-[#e6007a] transition-colors cursor-pointer">
                  Link text với primary color
                </div>
              </div>
            </div>

            {/* Text Variants */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Text Variants</h4>
              <div className="space-y-3">
                <div className="text-sm font-bold text-gray-900">Bold Text</div>
                <div className="text-sm font-semibold text-gray-800">Semibold Text</div>
                <div className="text-sm font-medium text-gray-700">Medium Text</div>
                <div className="text-sm font-normal text-gray-600">Regular Text</div>
                <div className="text-sm text-gray-500 italic">Italic Text</div>
                <div className="text-sm text-gray-400 line-through">Strikethrough Text</div>
              </div>
            </div>
          </div>
        </div>

        {/* Input/Select Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Input & Select Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Text Inputs */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Text Inputs</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your-email@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="0901 234 567"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disabled Input</label>
                  <input
                    type="text"
                    placeholder="Disabled field"
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Select Dropdowns */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Select Dropdowns</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                    <option>Chọn platform</option>
                    <option>TikTok</option>
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                    <option>Chọn danh mục</option>
                    <option>Làm đẹp</option>
                    <option>Thời trang</option>
                    <option>Ẩm thực</option>
                    <option>Du lịch</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Textarea</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Nhập mô tả chi tiết..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    placeholder="Ghi chú thêm..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tabs Components</h3>
          
          <div className="space-y-8">
            
            {/* Primary Tabs */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Tabs</h4>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button className="py-2 px-1 border-b-2 border-[#ff0086] text-[#ff0086] font-medium text-sm">
                    Tổng quan
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                    Campaigns
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                    Analytics
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                    Settings
                  </button>
                </nav>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Nội dung tab "Tổng quan" được hiển thị ở đây.</p>
              </div>
            </div>

            {/* Pill Tabs */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Pill Tabs</h4>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors">
                  Active Tab
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                  Inactive Tab
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium">
                  Another Tab
                </button>
              </div>
            </div>

            {/* Segment Tabs */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Segment Tabs</h4>
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-2 bg-white text-[#ff0086] text-sm font-medium rounded-md shadow-sm">
                  KOC
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Brands
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Campaigns
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Stats Cards Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* KOC Stats Card */}
            <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Active KOCs</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
            </div>

            {/* Campaigns Stats Card */}
            <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Live Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>

            {/* Revenue Stats Card */}
            <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+23%</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₫2.4M</p>
              </div>
            </div>

            {/* Engagement Stats Card */}
            <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">-2%</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold text-gray-900">4.8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Buttons Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Mobile Buttons Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Primary Mobile Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Mobile Buttons</h4>
              <div className="space-y-3">
                <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Tạo Campaign Mới</span>
                </button>
                <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Upload Content</span>
                </button>
                <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>

            {/* Secondary Mobile Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Secondary Mobile Buttons</h4>
              <div className="space-y-3">
                <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Xem Chi Tiết</span>
                </button>
                <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Chia Sẻ</span>
                </button>
                <button className="w-full border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Lưu Lại</span>
                </button>
              </div>
            </div>

            {/* Icon Mobile Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Icon Mobile Buttons</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#ff0086]" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Like</span>
                </button>
                <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Comment</span>
                </button>
                <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Share</span>
                </button>
                <button className="w-full bg-white border border-gray-200 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-4 rounded-xl flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">Boost</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Buttons Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Desktop Buttons Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Primary Desktop Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Primary Desktop Buttons</h4>
              <div className="space-y-3">
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create New</span>
                </button>
                <br />
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-8 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Upload Content</span>
                </button>
                <br />
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </div>
            </div>

            {/* Secondary Desktop Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Secondary Desktop Buttons</h4>
              <div className="space-y-3">
                <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-6 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                <br />
                <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-8 py-3 rounded-lg text-base font-medium transition-colors inline-flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Campaign</span>
                </button>
                <br />
                <button className="border border-gray-200 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 hover:border-[#ff0086] px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Icon Desktop Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Icon Desktop Buttons</h4>
              <div className="flex flex-wrap gap-3">
                <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </button>
                <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
                  <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </button>
                <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
                  <Share2 className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </button>
                <button className="w-11 h-11 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md group">
                  <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Background Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Page Backgrounds */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Page Backgrounds</h4>
              <div className="space-y-4">
                <div className="h-24 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">White Background</p>
                </div>
                <div className="h-24 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">Gray-50 Background</p>
                </div>
                <div className="h-24 bg-gradient-to-br from-gray-50 via-white to-pink-50/30 rounded-xl border border-gray-200 flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">Gradient Background</p>
                </div>
              </div>
            </div>

            {/* Card Backgrounds */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Card Backgrounds</h4>
              <div className="space-y-4">
                <div className="h-24 bg-white rounded-xl border border-gray-100 shadow-lg flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">Standard Card</p>
                </div>
                <div className="h-24 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">Glass Card</p>
                </div>
                <div className="h-24 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg flex items-center justify-center">
                  <p className="text-xs text-gray-600 font-medium">Gradient Card</p>
                </div>
              </div>
            </div>

            {/* Hover Effects */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Hover Effects</h4>
              <div className="space-y-4">
                <div className="h-24 bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <p className="text-xs text-gray-600 font-medium">Hover Shadow</p>
                </div>
                <div className="h-24 bg-white rounded-xl border border-gray-100 hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer">
                  <p className="text-xs text-gray-600 font-medium">Hover Scale</p>
                </div>
                <div className="h-24 bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-[#ff0086] transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <p className="text-xs text-gray-600 font-medium">Hover Border</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Navigation Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Mega Navigation Components</h3>
          
          <div className="space-y-8">
            
            {/* Navigation Megamenu Example */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Category Megamenu</h4>
              <div className="bg-white shadow-xl border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* DỊCH VỤ Column */}
                  <div className="p-4 border-r border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#ff0086]" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">DỊCH VỤ</h3>
                    </div>
                    <ul className="space-y-1.5">
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Nhà hàng, cà phê</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Du lịch</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Làm đẹp</a></li>
                    </ul>
                  </div>
                  
                  {/* SẢN PHẨM Column */}
                  <div className="p-4 border-r border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h3>
                    </div>
                    <ul className="space-y-1.5">
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Công nghệ</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Thời trang</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Gia dụng</a></li>
                    </ul>
                  </div>
                  
                  {/* KHUYẾN MÃI Column */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <Gift className="w-4 h-4 text-green-500" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">KHUYẾN MÃI</h3>
                    </div>
                    <ul className="space-y-1.5">
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Flash Sale</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Voucher</a></li>
                      <li><a href="#" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Freeship</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Navigation Tabs */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Main Navigation</h4>
              <nav className="flex items-center space-x-2">
                <a href="#" className="px-4 py-2 text-sm text-[#ff0086] bg-gray-50 rounded-lg font-medium">Trang chủ</a>
                <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">Danh mục</a>
                <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">Campaigns</a>
                <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">KOC</a>
                <a href="#" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">About</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Social Platform Components */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Social Platform Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Platform Icons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Platform Icons</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">TT</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">TikTok</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">IG</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Instagram</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">YT</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">YouTube</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">FB</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </div>
              </div>
            </div>
            
            {/* Social Share Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Share Buttons</h4>
              <div className="space-y-3">
                <button className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                  <span>Chia sẻ TikTok</span>
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2">
                  <span>Chia sẻ Instagram</span>
                </button>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Chia sẻ YouTube</span>
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Chia sẻ Facebook</span>
                </button>
              </div>
            </div>
            
            {/* Platform Stats */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Platform Stats</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <span className="text-sm font-medium">TikTok</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">1.2M</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">I</span>
                      </div>
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">850K</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Y</span>
                      </div>
                      <span className="text-sm font-medium">YouTube</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">450K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Badge Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Status Badges */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Status Badges</h4>
              <div className="space-y-3">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  Hoạt động
                </span>
                <br />
                <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium border border-red-200">
                  Tạm dừng
                </span>
                <br />
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
                  Chờ duyệt
                </span>
                <br />
                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                  Đã hủy
                </span>
              </div>
            </div>

            {/* Category Badges */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Category Badges</h4>
              <div className="space-y-3">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                  Thương hiệu
                </span>
                <br />
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                  Campaign
                </span>
                <br />
                <span className="inline-block bg-[#ff0086]/10 text-[#ff0086] px-3 py-1 rounded-full text-sm font-medium border border-[#ff0086]/20">
                  KOC Elite
                </span>
                <br />
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                  Influencer
                </span>
              </div>
            </div>

            {/* Small Badges */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Small Badges</h4>
              <div className="space-y-3">
                <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full font-medium border border-pink-200">
                  New
                </span>
                <br />
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium border border-green-200">
                  Hot
                </span>
                <br />
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium border border-yellow-200">
                  Popular
                </span>
                <br />
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium border border-blue-200">
                  Trending
                </span>
              </div>
            </div>
          </div>
        </div>






      </section>

      {/* Media Components Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Media Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Video Player Controls */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Video Controls</h4>
              <div className="bg-gray-900 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-center space-x-4">
                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </button>
                  <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="bg-white/10 rounded-full h-1">
                  <div className="bg-[#ff0086] h-1 rounded-full w-1/3"></div>
                </div>
                <div className="flex items-center justify-between text-white text-xs">
                  <span>2:45</span>
                  <span>8:20</span>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Live Chat</h4>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 h-40 overflow-y-auto">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-blue-600">User123</div>
                    <div className="text-sm text-gray-700">Sản phẩm này có sale không ạ?</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-pink-600">BeautyLover</div>
                    <div className="text-sm text-gray-700">Mình mua rồi, chất lượng ok!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Components */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Search Component */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Search</h4>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm KOC, thương hiệu..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors text-base"
                  />
                </div>
              </div>
            </div>
            
            {/* Filter Components */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Filters</h4>
              <div className="space-y-4">
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                  <option>Tất cả danh mục</option>
                  <option>Làm đẹp</option>
                  <option>Thời trang</option>
                  <option>Công nghệ</option>
                </select>
                
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-[#ff0086] text-white text-sm rounded-full">
                    Tất cả
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm rounded-full transition-colors">
                    Hot
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm rounded-full transition-colors">
                    Mới
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modal Preview */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Modal Dialog</h4>
              <div className="bg-gray-900/10 rounded-xl p-4">
                <div className="bg-white rounded-lg p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-900">Xác nhận</h5>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Bạn có chắc chắn muốn tham gia campaign này?
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium">
                      Hủy
                    </button>
                    <button className="flex-1 bg-[#ff0086] text-white py-2 rounded-lg text-sm font-medium">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOC Specific Components */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">KOC Specific Components</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* KOC Profile Card */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">KOC Profile</h4>
              <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">IK</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900">IKKBeauty</h5>
                    <p className="text-xs text-gray-500">Beauty Influencer</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">4.8</div>
                    <div className="flex text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-gray-900">125K</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">2.4%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">48</div>
                    <div className="text-xs text-gray-500">Campaigns</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Campaign Card */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Campaign Card</h4>
              <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                      M
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 text-sm">Maybelline</h5>
                    <p className="text-xs text-gray-500">Beauty Campaign</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Active
                  </span>
                </div>
                <h6 className="font-semibold text-gray-800 mb-2">Review Son Matte Mới</h6>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Reward: </span>
                  <span className="font-bold text-[#ff0086]">₫2,500,000</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Deadline: </span>
                  <span className="text-gray-900">30/08/2025</span>
                </div>
              </div>
            </div>
            
            {/* Revenue Widget */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Revenue Widget</h4>
              <div className="bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold">Doanh thu tháng</h5>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold mb-1">₫12,500,000</div>
                <div className="flex items-center space-x-1 text-sm opacity-90">
                  <TrendingUp className="w-3 h-3" />
                  <span>+23% so với tháng trước</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading States & Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Loading States & Alerts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Loading States */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Loading States</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-[#ff0086] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Loading...</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Success Alerts */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Alert Messages</h4>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Campaign đã được tạo thành công!</span>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Campaign đang chờ duyệt</span>
                </div>
                
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Có lỗi xảy ra, vui lòng thử lại</span>
                </div>
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Progress</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Campaign Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#ff0086] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div className="w-8 h-8 bg-[#ff0086] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                    3
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-[#ff0086]/10 text-[#ff0086] px-3 py-2 rounded-lg">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Đang xử lý...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Page Component Patterns */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Mẫu Component Quan Trọng từ Home Page</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Các component patterns được trích xuất từ trang chủ, tuân thủ Design Principles
          </p>
        </div>

        {/* 1. Navigation Megamenu Component */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Menu className="w-5 h-5 text-[#ff0086]" />
            1. Navigation Megamenu
          </h3>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-[#ff0086]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">DỊCH VỤ</h4>
                </div>
                <ul className="space-y-1.5">
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Nhà hàng, cà phê</a></li>
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Du lịch</a></li>
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Giải trí</a></li>
                </ul>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h4>
                </div>
                <ul className="space-y-1.5">
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Mỹ phẩm</a></li>
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Đồ ăn, thức uống</a></li>
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Mẹ và bé</a></li>
                </ul>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Video className="w-4 h-4 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">NỘI DUNG</h4>
                </div>
                <ul className="space-y-1.5">
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Hóa dược phẩm</a></li>
                  <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Thú cưng</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <a className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">Hướng dẫn KOC mới</a>
                  <a className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">Chính sách hỗ trợ</a>
                </div>
                <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors">
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Event Banner Carousel */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#ff0086]" />
            2. Event Banner Carousel
          </h3>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[
              { title: "Lễ hội Beauty IKK", subtitle: "28/8 (Thứ 5) 2:00 PM", tag: "TRỰC TIẾP", color: "from-pink-500 to-rose-500" },
              { title: "Thử thách Review", subtitle: "28/8 (Thứ 5) 7:00 PM", tag: "Báo trước", color: "from-blue-500 to-indigo-500" },
              { title: "Ẩm thực & Du lịch", subtitle: "29/8 (Thứ 6) 12:00 PM", tag: "Báo trước", color: "from-green-500 to-emerald-500" }
            ].map((banner, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-48 relative rounded-xl overflow-hidden group cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${banner.color} opacity-90`}></div>
                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
                      {banner.tag}
                    </span>
                    <h4 className="text-xl font-bold mb-1">{banner.title}</h4>
                    <p className="text-sm opacity-90">{banner.subtitle}</p>
                  </div>
                  <button className="self-start px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Category Icon Grid */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-[#ff0086]" />
            3. Category Icon Grid
          </h3>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              { icon: Palette, label: "Làm đẹp", color: "from-pink-100 to-rose-100", iconColor: "text-pink-600" },
              { icon: ShoppingBag, label: "Mua sắm", color: "from-blue-100 to-indigo-100", iconColor: "text-blue-600" },
              { icon: Camera, label: "Ẩm thực", color: "from-orange-100 to-amber-100", iconColor: "text-orange-600" },
              { icon: Plane, label: "Du lịch", color: "from-green-100 to-emerald-100", iconColor: "text-green-600" },
              { icon: Shirt, label: "Thời trang", color: "from-rose-100 to-pink-100", iconColor: "text-rose-600" },
              { icon: Heart, label: "Lối sống", color: "from-purple-100 to-violet-100", iconColor: "text-purple-600" },
              { icon: Trophy, label: "Thể thao", color: "from-red-100 to-rose-100", iconColor: "text-red-600" },
              { icon: Video, label: "Giải trí", color: "from-yellow-100 to-amber-100", iconColor: "text-yellow-600" }
            ].map((category, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} group-hover:shadow-md rounded-xl flex items-center justify-center mb-2 transition-all duration-300`}>
                  <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Popular Streamer Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#ff0086]" />
            4. Popular Streamer Card
          </h3>
          
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {[
              { name: "IKKBeauty", category: "Làm đẹp/Mỹ phẩm", viewers: "10,754", isLive: true },
              { name: "TechGuruVN", category: "Đánh giá công nghệ", viewers: "7,535", isLive: true },
              { name: "FoodieLife", category: "Ẩm thực/Nấu ăn", viewers: "4,523", isLive: false }
            ].map((streamer, index) => (
              <div key={index} className="flex-shrink-0 group">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{streamer.name.substring(0, 2)}</span>
                    </div>
                    {streamer.isLive && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-gray-900 truncate">{streamer.name}</div>
                    <div className="text-xs text-gray-500 mb-1 truncate">{streamer.category}</div>
                    <div className="text-xs text-pink-500 font-medium">{streamer.viewers} viewers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Featured Campaign Banner */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ff0086]" />
            5. Featured Campaign Banner
          </h3>
          
          <div className="relative bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-2xl overflow-hidden h-48 md:h-64">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 h-full flex items-center justify-between p-8">
              <div className="text-white max-w-2xl">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    Chiến dịch đặc biệt
                  </span>
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    MEGA REWARDS
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-3">Beauty Festival 2025</h3>
                <p className="text-lg mb-4 opacity-90">
                  Lễ hội làm đẹp lớn nhất năm với tổng giải thưởng lên đến 500 triệu đồng
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>1,200+ KOC tham gia</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Còn 15 ngày</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-[#ff0086] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Tham gia ngay
              </button>
            </div>
          </div>
        </div>

        {/* 6. Campaign Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#ff0086]" />
            6. Campaign Card
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="relative overflow-hidden">
                <div className="w-full h-40 bg-gray-50">
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200"></div>
                </div>
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                    Đang tuyển
                  </span>
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                    Urgent
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Maybelline Vietnam</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  Review son môi Maybelline SuperStay Matte Ink
                </h4>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-[#ff0086]">2,000,000đ</span>
                  <span className="text-xs text-gray-500">Còn 5 ngày</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs text-gray-500">67/100 KOC</span>
                </div>
                <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Profile Avatar with Status */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[#ff0086]" />
            7. Profile Avatar with Status
          </h3>
          
          <div className="flex items-center space-x-6">
            {/* Online */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">KA</span>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-xs text-gray-600">Online</span>
            </div>

            {/* Live */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xs text-gray-600">Live</span>
            </div>

            {/* Offline */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-lg">TH</span>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-xs text-gray-600">Offline</span>
            </div>

            {/* With Badge */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-[#ff0086] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  VIP
                </div>
              </div>
              <span className="text-xs text-gray-600">VIP KOC</span>
            </div>
          </div>
        </div>

        {/* 8. Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#ff0086]" />
            8. Tab Navigation
          </h3>
          
          <div className="space-y-6">
            {/* Style 1: Pills */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Pills Style</h4>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                <button className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-[#ff0086] text-white">
                  Tất cả (127)
                </button>
                <button className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  Beauty & Fashion (45)
                </button>
                <button className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  Technology (28)
                </button>
                <button className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  Food & Lifestyle (32)
                </button>
              </div>
            </div>

            {/* Style 2: Underline */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Underline Style</h4>
              <div className="flex space-x-8 border-b border-gray-200">
                <button className="pb-3 text-sm font-medium text-[#ff0086] border-b-2 border-[#ff0086]">
                  Thông tin
                </button>
                <button className="pb-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Chiến dịch
                </button>
                <button className="pb-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Thống kê
                </button>
                <button className="pb-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Cài đặt
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 9. Stats Counter */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#ff0086]" />
            9. Stats Counter
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff0086] mb-1">1,234</div>
              <p className="text-sm text-gray-600">Active KOCs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">567</div>
              <p className="text-sm text-gray-600">Campaigns</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">₫2.5B</div>
              <p className="text-sm text-gray-600">Total Rewards</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Campaign Progress</h4>
              <span className="text-sm text-gray-600">67/100 KOCs</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 h-3 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="absolute top-0 left-[67%] transform -translate-x-1/2">
                <div className="mt-5 px-2 py-1 bg-[#ff0086] text-white text-xs rounded-full">67%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 10. Platform Icons */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#ff0086]" />
            10. Platform Icons
          </h3>
          
          <div className="space-y-6">
            {/* Large Icons */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Large Platform Icons</h4>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Icons with Labels */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Small Icons with Labels</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">TikTok</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Instagram</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">YouTube</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Mẫu Component Mới cho Home Page */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Mẫu Component Mới cho Home Page</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Các component patterns nâng cao, tối ưu hóa trải nghiệm người dùng theo chuẩn IKK Design System
          </p>
        </div>

        {/* 11. Live Stream Preview Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#ff0086]" />
            11. Live Stream Preview Card
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-xl overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    LIVE
                  </span>
                  <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    1.2K watching
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-semibold mb-1">Review Skincare Routine Hàn Quốc</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                    <span className="text-white text-sm">BeautyGuru</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors">
                    <Play className="w-6 h-6 text-[#ff0086]" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12. Notification Badge System */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#ff0086]" />
            12. Notification Badge System
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ff0086]/10 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#ff0086]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Chiến dịch mới phù hợp với bạn</p>
                  <p className="text-sm text-gray-500">Maybelline đang tìm KOC Beauty</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff0086] rounded-full"></span>
                <span className="text-xs text-gray-500">2 phút trước</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tin nhắn mới từ nhãn hàng</p>
                  <p className="text-sm text-gray-500">Samsung Vietnam đã phản hồi ứng tuyển của bạn</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-xs text-gray-500">1 giờ trước</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ứng tuyển thành công</p>
                  <p className="text-sm text-gray-500">Bạn đã được chấp nhận cho chiến dịch Uniqlo</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">Hôm qua</span>
            </div>
          </div>
        </div>

        {/* 13. Rating and Review Component */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#ff0086]" />
            13. Rating and Review Component
          </h3>
          
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">4.8</div>
                <div className="flex items-center gap-1 my-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">1,234 đánh giá</p>
              </div>
              
              <div className="flex-1 space-y-2">
                {[
                  { stars: 5, percent: 75 },
                  { stars: 4, percent: 18 },
                  { stars: 3, percent: 5 },
                  { stars: 2, percent: 1 },
                  { stars: 1, percent: 1 }
                ].map(item => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-3">{item.stars}</span>
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Review */}
            <div className="border-t pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">TH</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">Thu Hương</span>
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500">KOC Verified</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">3 ngày trước</span>
                  </div>
                  <p className="text-gray-700">Chiến dịch rất chuyên nghiệp, nhãn hàng hỗ trợ tận tình. Sản phẩm chất lượng, dễ review.</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#ff0086] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Hữu ích (24)</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#ff0086] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Trả lời</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 14. Quick Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ff0086]" />
            14. Quick Action Buttons
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-gradient-to-br from-[#ff0086]/10 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-[#ff0086]" />
                </div>
                <span className="text-sm font-medium text-gray-900">Tạo Content</span>
              </div>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-900">Gửi Báo Cáo</span>
              </div>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-green-500/10 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm font-medium text-gray-900">Nhận Sản Phẩm</span>
              </div>
            </button>
            
            <button className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-sm font-medium text-gray-900">Xem Thống Kê</span>
              </div>
            </button>
          </div>
        </div>

        {/* 15. Search with Autocomplete */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-[#ff0086]" />
            15. Search with Autocomplete
          </h3>
          
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch, thương hiệu, KOC..."
                className="w-full pl-12 pr-24 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors text-base"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </button>
              </div>
            </div>
            
            {/* Autocomplete Dropdown */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-10">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">GỢI Ý TÌM KIẾM</div>
              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Chiến dịch Beauty Festival 2025</span>
              </button>
              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Maybelline Vietnam</span>
              </button>
              <button className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                <Star className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Top KOC tháng 8</span>
              </button>
            </div>
          </div>
        </div>

        {/* 16. Timeline/Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff0086]" />
            16. Timeline/Activity Feed
          </h3>
          
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#ff0086] rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">Được chọn cho chiến dịch</p>
                    <p className="text-sm text-gray-600 mt-1">Bạn đã được chọn cho chiến dịch "Beauty Festival 2025"</p>
                    <p className="text-xs text-gray-500 mt-2">10 phút trước</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">Đã gửi báo cáo</p>
                    <p className="text-sm text-gray-600 mt-1">Báo cáo chiến dịch Samsung Galaxy S25 đã được gửi</p>
                    <p className="text-xs text-gray-500 mt-2">2 giờ trước</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">Nhận sản phẩm</p>
                    <p className="text-sm text-gray-600 mt-1">Đã nhận sản phẩm từ Uniqlo Vietnam</p>
                    <p className="text-xs text-gray-500 mt-2">Hôm qua</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 17. Badge/Achievement System */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ff0086]" />
            17. Badge/Achievement System
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  GOLD
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-900">Top KOC</p>
              <p className="text-sm text-gray-500">100+ campaigns</p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  HOT
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-900">Trending</p>
              <p className="text-sm text-gray-500">10 days streak</p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  PRO
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-900">Professional</p>
              <p className="text-sm text-gray-500">50+ reviews</p>
            </div>
            
            <div className="text-center opacity-50">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-gray-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  LOCKED
                </div>
              </div>
              <p className="mt-4 font-medium text-gray-600">Rising Star</p>
              <p className="text-sm text-gray-400">25 more to unlock</p>
            </div>
          </div>
        </div>

        {/* 18. Countdown Timer */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Timer className="w-5 h-5 text-[#ff0086]" />
            18. Countdown Timer
          </h3>
          
          <div className="space-y-6">
            {/* Large Countdown */}
            <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-xl p-6 text-white">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold mb-1">Flash Sale KOC</h4>
                <p className="text-sm opacity-90">Cơ hội nhận thưởng x2 cho chiến dịch</p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-2xl font-bold">02</div>
                  </div>
                  <p className="text-xs mt-1 opacity-90">Ngày</p>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-2xl font-bold">14</div>
                  </div>
                  <p className="text-xs mt-1 opacity-90">Giờ</p>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-2xl font-bold">37</div>
                  </div>
                  <p className="text-xs mt-1 opacity-90">Phút</p>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
                    <div className="text-2xl font-bold">42</div>
                  </div>
                  <p className="text-xs mt-1 opacity-90">Giây</p>
                </div>
              </div>
            </div>
            
            {/* Small Inline Timer */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-900">Chiến dịch kết thúc trong</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-orange-500 text-white rounded text-sm font-bold">5</span>
                <span className="text-sm font-medium">ngày</span>
                <span className="px-2 py-1 bg-orange-500 text-white rounded text-sm font-bold">12</span>
                <span className="text-sm font-medium">giờ</span>
              </div>
            </div>
          </div>
        </div>

        {/* 19. Product Showcase Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#ff0086]" />
            19. Product Showcase Card
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-[#ff0086] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    NEW
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    Xem chi tiết
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">Maybelline</span>
                  <BadgeCheck className="w-3 h-3 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SuperStay Matte Ink Liquid Lipstick</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#ff0086]">250,000đ</p>
                    <p className="text-sm text-gray-500 line-through">350,000đ</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Làm đẹp</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Son môi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 20. Testimonial/Success Story Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#ff0086]" />
            20. Testimonial/Success Story Card
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#ff0086]/5 to-pink-50 rounded-xl p-6">
              <Quote className="w-8 h-8 text-[#ff0086]/30 mb-4" />
              <p className="text-gray-700 mb-6 italic">
                "Tham gia IKK đã thay đổi cuộc sống của tôi. Từ một người yêu thích làm đẹp, giờ tôi đã trở thành KOC chuyên nghiệp với thu nhập ổn định từ các chiến dịch."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">MH</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Minh Hương</p>
                    <p className="text-sm text-gray-500">Beauty KOC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Thu nhập/tháng</p>
                  <p className="font-bold text-[#ff0086]">25-30M</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-50 rounded-xl p-6">
              <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
              <p className="text-gray-700 mb-6 italic">
                "Platform IKK giúp tôi kết nối với các thương hiệu uy tín. Quy trình làm việc chuyên nghiệp và thanh toán nhanh chóng."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">TG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Tech Guru</p>
                    <p className="text-sm text-gray-500">Tech Reviewer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Chiến dịch/tháng</p>
                  <p className="font-bold text-blue-600">15-20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Mẫu Component Nâng Cao cho Home Page */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Mẫu Component Nâng Cao cho Home Page</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Các component patterns chuyên nghiệp, tối ưu cho platform KOC và affiliate marketing
          </p>
        </div>

        {/* 21. Social Media Integration Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#ff0086]" />
            21. Social Media Integration Card
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Kết nối tài khoản mạng xã hội</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">TikTok</p>
                      <p className="text-sm text-gray-500">@beauty_guru_vn</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Đã kết nối</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Instagram</p>
                      <p className="text-sm text-gray-500">@beauty_guru_vn</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Đã kết nối</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">YouTube</p>
                      <p className="text-sm text-gray-500">Chưa kết nối</p>
                    </div>
                  </div>
                  <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Kết nối
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Facebook</p>
                      <p className="text-sm text-gray-500">Chưa kết nối</p>
                    </div>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Kết nối
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 22. Payment/Earnings Dashboard */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-[#ff0086]" />
            22. Payment/Earnings Dashboard
          </h3>
          
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#ff0086]/10 to-pink-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Thu nhập tháng này</h4>
                  <CreditCard className="w-5 h-5 text-[#ff0086]" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">₫15,750,000</div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500">so với tháng trước</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Chờ thanh toán</h4>
                  <Timer className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">₫3,250,000</div>
                <p className="text-sm text-gray-500">5 chiến dịch hoàn thành</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Tổng cộng</h4>
                  <Trophy className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">₫127,500,000</div>
                <p className="text-sm text-gray-500">Từ 47 chiến dịch</p>
              </div>
            </div>
            
            {/* Payment History */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Lịch sử thanh toán gần đây</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Chiến dịch Maybelline SuperStay</p>
                      <p className="text-sm text-gray-500">15/8/2025 - Đã thanh toán</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+₫2,000,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Chiến dịch Samsung Galaxy S25</p>
                      <p className="text-sm text-gray-500">12/8/2025 - Đang xử lý</p>
                    </div>
                  </div>
                  <span className="font-bold text-yellow-600">₫5,000,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 23. Content Calendar Widget */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ff0086]" />
            23. Content Calendar Widget
          </h3>
          
          <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Tháng 8, 2025</h4>
                <p className="text-sm text-gray-500">Lịch đăng bài và deadline</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronDown className="w-4 h-4 text-gray-600 rotate-90" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronDown className="w-4 h-4 text-gray-600 -rotate-90" />
                </button>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {Array.from({ length: 35 }, (_, index) => {
                const dayNumber = index - 6; // Start from day 1 on appropriate day
                const isToday = dayNumber === 15;
                const hasEvent = [12, 15, 18, 22, 28].includes(dayNumber);
                const isOutOfMonth = dayNumber <= 0 || dayNumber > 31;
                
                return (
                  <div
                    key={index}
                    className={`relative h-16 p-1 rounded-lg border transition-colors cursor-pointer ${
                      isToday 
                        ? 'bg-[#ff0086] text-white border-[#ff0086]' 
                        : isOutOfMonth 
                          ? 'text-gray-300 border-transparent'
                          : hasEvent
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                            : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {!isOutOfMonth && (
                      <>
                        <span className="text-sm font-medium">{dayNumber}</span>
                        {hasEvent && !isToday && (
                          <div className="absolute bottom-1 left-1 right-1">
                            <div className="w-full h-1 bg-[#ff0086] rounded-full"></div>
                          </div>
                        )}
                        {isToday && (
                          <div className="absolute bottom-1 left-1 right-1">
                            <div className="w-full h-1 bg-white rounded-full"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Sự kiện sắp tới</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-8 bg-[#ff0086] rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Deadline báo cáo Samsung</p>
                    <p className="text-sm text-gray-500">18/8/2025 - 6:00 PM</p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Livestream Beauty Tips</p>
                    <p className="text-sm text-gray-500">22/8/2025 - 7:30 PM</p>
                  </div>
                  <Radio className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 24. Collaboration Request Card */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#ff0086]" />
            24. Collaboration Request Card
          </h3>
          
          <div className="space-y-6">
            <div className="border-l-4 border-[#ff0086] bg-[#ff0086]/5 rounded-r-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LG</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">LG Electronics Vietnam</h4>
                    <p className="text-sm text-gray-500">Thương hiệu uy tín • 4.9/5 rating</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                  URGENT
                </span>
              </div>
              
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Chiến dịch: LG OLED C4 TV Review</h5>
                <p className="text-gray-700 mb-4">
                  Chúng tôi đang tìm kiếm KOC chuyên về công nghệ để review dòng TV OLED C4 mới nhất. 
                  Sản phẩm sẽ được gửi miễn phí, KOC chỉ cần tạo content review chân thật.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#ff0086]">₫15M</p>
                    <p className="text-xs text-gray-500">Thù lao</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">7 ngày</p>
                    <p className="text-xs text-gray-500">Thời gian</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">Tech</p>
                    <p className="text-xs text-gray-500">Danh mục</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">5/10</p>
                    <p className="text-xs text-gray-500">Đã chọn</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Video Review</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Unboxing</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Tech Content</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">YouTube</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white py-3 rounded-lg font-semibold transition-colors">
                  Chấp nhận hợp tác
                </button>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
                  Xem chi tiết
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Còn lại 3 yêu cầu hợp tác khác</p>
              <button className="text-[#ff0086] hover:text-[#e6007a] font-medium text-sm transition-colors">
                Xem tất cả yêu cầu
              </button>
            </div>
          </div>
        </div>

        {/* 25. Live Chat/Message Component */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#ff0086]" />
            25. Live Chat/Message Component
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat List */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Tin nhắn gần đây</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[#ff0086]/5 border border-[#ff0086]/20 rounded-lg cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">MB</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">Maybelline Vietnam</p>
                      <span className="text-xs text-gray-500">2 phút</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">Chào bạn, chúng tôi có chiến dịch mới...</p>
                  </div>
                  <div className="w-2 h-2 bg-[#ff0086] rounded-full"></div>
                </div>
                
                <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SS</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">Samsung Vietnam</p>
                      <span className="text-xs text-gray-500">1 giờ</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">Cảm ơn bạn đã hoàn thành báo cáo</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">UN</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">Uniqlo Vietnam</p>
                      <span className="text-xs text-gray-500">3 giờ</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">Sản phẩm đã được gửi đến địa chỉ của bạn</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Window */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MB</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maybelline Vietnam</p>
                    <p className="text-xs text-green-600">Đang hoạt động</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MB</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-900">Chào bạn! Chúng tôi có chiến dịch mới về son môi SuperStay</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-[#ff0086] rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">Chào anh/chị! Tôi rất quan tâm đến chiến dịch này</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MB</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-900">Tuyệt vời! Tôi sẽ gửi chi tiết chiến dịch cho bạn ngay</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                  <button className="p-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 26. File Upload/Media Gallery */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#ff0086]" />
            26. File Upload/Media Gallery
          </h3>
          
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#ff0086] hover:bg-[#ff0086]/5 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tải lên nội dung</h4>
              <p className="text-gray-600 mb-4">Kéo thả file vào đây hoặc click để chọn</p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span>JPG, PNG, MP4, PDF</span>
                <span>•</span>
                <span>Tối đa 100MB</span>
              </div>
              <button className="mt-4 bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Chọn file
              </button>
            </div>
            
            {/* Uploaded Files */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">File đã tải lên (3)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-video bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">review_video.mp4</p>
                      <p className="text-xs text-gray-500">25.4 MB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg mb-3"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">product_photo.jpg</p>
                      <p className="text-xs text-gray-500">3.2 MB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-200 rounded-lg mb-3 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">campaign_report.pdf</p>
                      <p className="text-xs text-gray-500">1.8 MB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 27. Progress Tracking Component */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff0086]" />
            27. Progress Tracking Component
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Chiến dịch Samsung Galaxy S25</h4>
                  <p className="text-sm text-gray-500">Bắt đầu: 10/8/2025 • Kết thúc: 20/8/2025</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                  Đang thực hiện
                </span>
              </div>
              
              {/* Progress Steps */}
              <div className="relative">
                <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h5 className="font-semibold text-gray-900">Ứng tuyển thành công</h5>
                      <p className="text-sm text-gray-600">Đã được chấp nhận cho chiến dịch</p>
                      <p className="text-xs text-gray-500 mt-1">10/8/2025 - 9:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h5 className="font-semibold text-gray-900">Nhận sản phẩm</h5>
                      <p className="text-sm text-gray-600">Sản phẩm đã được giao thành công</p>
                      <p className="text-xs text-gray-500 mt-1">12/8/2025 - 2:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-full flex items-center justify-center relative">
                        <Camera className="w-6 h-6 text-white" />
                        <div className="absolute -inset-1 rounded-full border-2 border-[#ff0086] animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h5 className="font-semibold text-gray-900">Tạo nội dung</h5>
                      <p className="text-sm text-gray-600">Đang thực hiện review và chụp ảnh</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Tiến độ</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <Send className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h5 className="font-semibold text-gray-400">Gửi báo cáo</h5>
                      <p className="text-sm text-gray-500">Chưa hoàn thành</p>
                      <p className="text-xs text-gray-400 mt-1">Deadline: 18/8/2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h5 className="font-semibold text-gray-400">Nhận thanh toán</h5>
                      <p className="text-sm text-gray-500">Chờ hoàn thành báo cáo</p>
                      <p className="text-xs text-gray-400 mt-1">₫5,000,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 28. Referral/Invite System */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#ff0086]" />
            28. Referral/Invite System
          </h3>
          
          <div className="space-y-6">
            {/* Referral Banner */}
            <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-2">Mời bạn bè, nhận thưởng</h4>
                  <p className="opacity-90 mb-4">
                    Mỗi bạn bè đăng ký thành công, bạn nhận ₫500,000. Không giới hạn số lượng!
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm opacity-90">Đã mời</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm opacity-90">Thành công</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">₫4M</div>
                      <div className="text-sm opacity-90">Đã nhận</div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Gift className="w-16 h-16 opacity-20" />
                </div>
              </div>
            </div>
            
            {/* Referral Link */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Link giới thiệu của bạn</h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value="https://ikk.vn/ref/beautyguru123"
                    readOnly
                    className="flex-1 px-4 py-3 focus:outline-none text-sm"
                  />
                  <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 border-l border-gray-200 transition-colors">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Chia sẻ
                </button>
              </div>
            </div>
            
            {/* Invite History */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Lịch sử mời (8 thành công)</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Thu Hương</p>
                      <p className="text-sm text-gray-500">Đăng ký thành công - 15/8/2025</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+₫500,000</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Minh Anh</p>
                      <p className="text-sm text-gray-500">Chờ xác thực tài khoản - 14/8/2025</p>
                    </div>
                  </div>
                  <span className="font-bold text-yellow-600">Đang xử lý</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Văn Nam</p>
                      <p className="text-sm text-gray-500">Chưa hoàn thành đăng ký - 12/8/2025</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-600">Chưa thành công</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 29. Settings/Preferences Panel */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#ff0086]" />
            29. Settings/Preferences Panel
          </h3>
          
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Thông tin cá nhân</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên hiển thị</label>
                  <input
                    type="text"
                    value="Beauty Guru VN"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value="beautyguru@gmail.com"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value="0901234567"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lĩnh vực chuyên môn</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                    <option>Làm đẹp & Skincare</option>
                    <option>Thời trang</option>
                    <option>Công nghệ</option>
                    <option>Ẩm thực</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Cài đặt thông báo</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Chiến dịch mới</p>
                    <p className="text-sm text-gray-500">Nhận thông báo khi có chiến dịch phù hợp</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#ff0086] transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Tin nhắn từ thương hiệu</p>
                    <p className="text-sm text-gray-500">Thông báo khi có tin nhắn mới</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#ff0086] transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Thanh toán</p>
                    <p className="text-sm text-gray-500">Thông báo về thanh toán và thù lao</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email marketing</p>
                    <p className="text-sm text-gray-500">Nhận email về tin tức và cập nhật</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Bảo mật & Quyền riêng tư</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Hiển thị profile công khai</p>
                    <p className="text-sm text-gray-500">Cho phép thương hiệu tìm thấy profile của bạn</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#ff0086] transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Xác thực 2 bước</p>
                    <p className="text-sm text-gray-500">Bảo mật tài khoản với mã OTP</p>
                  </div>
                  <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Cài đặt
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Đổi mật khẩu</p>
                    <p className="text-sm text-gray-500">Cập nhật mật khẩu tài khoản</p>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 30. Help/Support Component */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#ff0086]" />
            30. Help/Support Component
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Câu hỏi thường gặp</h4>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span className="font-medium text-gray-900">Làm thế nào để ứng tuyển chiến dịch?</span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                    Bạn có thể ứng tuyển bằng cách click vào nút "Ứng tuyển ngay" trên card chiến dịch, 
                    sau đó điền form thông tin và chờ phản hồi từ thương hiệu.
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span className="font-medium text-gray-900">Khi nào tôi nhận được thanh toán?</span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span className="font-medium text-gray-900">Làm sao để tăng tỷ lệ được chọn?</span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
                    <span className="font-medium text-gray-900">Tôi có thể hủy chiến dịch không?</span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-[#ff0086] hover:text-[#e6007a] font-medium text-sm transition-colors">
                  Xem tất cả FAQ
                </button>
              </div>
            </div>
            
            {/* Contact Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Liên hệ hỗ trợ</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">Live Chat</h5>
                      <p className="text-sm text-gray-600 mb-3">
                        Trò chuyện trực tiếp với đội ngũ hỗ trợ. Phản hồi trong vòng 5 phút.
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Bắt đầu chat
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <PhoneCall className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">Hotline</h5>
                      <p className="text-sm text-gray-600 mb-1">
                        Gọi trực tiếp: <span className="font-medium text-green-600">1900 123 456</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Thứ 2 - Thứ 6: 8:00 - 18:00
                      </p>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Gọi ngay
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">Email</h5>
                      <p className="text-sm text-gray-600 mb-1">
                        Gửi email: <span className="font-medium text-gray-700">support@ikk.vn</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Phản hồi trong vòng 24 giờ
                      </p>
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Gửi email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-6">
                <h5 className="font-medium text-gray-900 mb-3">Thao tác nhanh</h5>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset mật khẩu
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải app mobile
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    Hướng dẫn KOC
                  </button>
                  <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Mẫu Component Chiến Dịch cho Home Page */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Mẫu Component Chiến Dịch cho Home Page</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Các component patterns chuyên biệt cho quản lý chiến dịch KOC và affiliate marketing
          </p>
        </div>

        {/* 31. Campaign Status Tracker */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff0086]" />
            31. Campaign Status Tracker
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-500/10 to-amber-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Chờ phê duyệt</h4>
                  <Timer className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Beauty Festival 2025</div>
                  <div className="text-sm text-gray-600">Samsung Galaxy Review</div>
                  <div className="text-sm text-gray-600">Uniqlo Fashion</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Đang thực hiện</h4>
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Maybelline Lipstick</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Grab Food Tour</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">40%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Hoàn thành</h4>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
                <div className="text-sm text-gray-600">Tổng thù lao: ₫45,500,000</div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Hoạt động gần đây</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Chiến dịch "Maybelline SuperStay" được chấp thuận</p>
                    <p className="text-sm text-gray-500">15 phút trước</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Báo cáo "Samsung Review" đã được gửi</p>
                    <p className="text-sm text-gray-500">2 giờ trước</p>
                  </div>
                  <Send className="w-4 h-4 text-blue-500" />
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Sản phẩm "Uniqlo Fashion" đã nhận được</p>
                    <p className="text-sm text-gray-500">1 ngày trước</p>
                  </div>
                  <Package className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 32. Campaign Requirements Checklist */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-[#ff0086]" />
            32. Campaign Requirements Checklist
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900">Chiến dịch Samsung Galaxy S25 Review</h4>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                  Đang thực hiện
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Requirements */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Yêu cầu nội dung</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Video unboxing (2-3 phút)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Chụp ảnh sản phẩm (tối thiểu 10 ảnh)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Timer className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Review chi tiết camera (đang thực hiện)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-400">So sánh với iPhone 15 Pro</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-400">Video demo gaming performance</span>
                    </div>
                  </div>
                </div>
                
                {/* Platform Requirements */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Yêu cầu nền tảng</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Đăng trên YouTube (đã đăng)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Timer className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Instagram Story & Post (đang chuẩn bị)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-400">TikTok short video</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      <span className="text-sm text-gray-400">Facebook post với hashtag</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tiến độ hoàn thành</span>
                  <span className="text-sm font-bold text-gray-900">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">6/10 yêu cầu đã hoàn thành</p>
              </div>
            </div>
          </div>
        </div>

        {/* 33. Campaign Brief Viewer */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#ff0086]" />
            33. Campaign Brief Viewer
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#ff0086]/5 to-pink-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Beauty Festival 2025 - Maybelline Campaign</h4>
                  <p className="text-gray-600">Chiến dịch ra mắt dòng son lì mới SuperStay Matte Ink</p>
                </div>
                <button className="bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Xem đầy đủ
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Thông tin cơ bản</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thương hiệu:</span>
                      <span className="font-medium">Maybelline Vietnam</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Danh mục:</span>
                      <span className="font-medium">Beauty & Skincare</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thù lao:</span>
                      <span className="font-medium text-[#ff0086]">₫2,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-medium">7 ngày</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium text-red-600">25/8/2025</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Mục tiêu chiến dịch</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#ff0086] mt-0.5 flex-shrink-0" />
                      <span>Tăng awareness cho dòng SuperStay Matte Ink</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#ff0086] mt-0.5 flex-shrink-0" />
                      <span>Tạo buzz trên social media với hashtag #SuperStayChallenge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#ff0086] mt-0.5 flex-shrink-0" />
                      <span>Thu thập feedback chân thực từ KOC</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Key Messages */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-gray-900 mb-3">Key Messages</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Lâu trôi 16h</p>
                    <p className="text-xs text-gray-600">Công thức cải tiến</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Sparkles className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">20+ màu sắc</p>
                    <p className="text-xs text-gray-600">Đa dạng lựa chọn</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Không khô môi</p>
                    <p className="text-xs text-gray-600">Dưỡng ẩm tối ưu</p>
                  </div>
                </div>
              </div>
              
              {/* Guidelines */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-yellow-800">Lưu ý quan trọng</h5>
                    <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                      <li>• Sử dụng lighting tự nhiên khi chụp ảnh/quay video</li>
                      <li>• Thể hiện màu sắc son chân thực, không over-edit</li>
                      <li>• Mention @maybellinevietnam trong tất cả bài đăng</li>
                      <li>• Sử dụng hashtag #SuperStayChallenge #MaybellineVN</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 34. Campaign Application Form Widget */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#ff0086]" />
            34. Campaign Application Form Widget
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Ứng tuyển: Samsung Galaxy S25 Review</h4>
                  <p className="text-sm text-gray-600">Điền thông tin để tham gia chiến dịch</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Thù lao</p>
                  <p className="text-2xl font-bold text-[#ff0086]">₫5,000,000</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kinh nghiệm review công nghệ *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                    <option>Chọn mức độ kinh nghiệm</option>
                    <option>Mới bắt đầu (0-6 tháng)</option>
                    <option>Có kinh nghiệm (6 tháng - 2 năm)</option>
                    <option>Chuyên nghiệp (2+ năm)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số subscriber/follower *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors">
                    <option>Chọn phạm vi</option>
                    <option>1K - 10K</option>
                    <option>10K - 50K</option>
                    <option>50K - 100K</option>
                    <option>100K+</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link portfolio/channel *
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@your-channel"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ý tưởng content cho chiến dịch này *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mô tả ý tưởng review Samsung Galaxy S25 của bạn..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thiết bị hiện tại đang sử dụng
                  </label>
                  <input
                    type="text"
                    placeholder="VD: iPhone 14 Pro, Samsung Galaxy S23..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  />
                </div>
              </div>
              
              {/* Requirements Agreement */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-3">Cam kết thực hiện</h5>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#ff0086] rounded border-gray-300 focus:ring-[#ff0086]/20" />
                    <span className="text-sm text-gray-700">
                      Tôi cam kết hoàn thành review trong vòng 7 ngày kể từ khi nhận sản phẩm
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#ff0086] rounded border-gray-300 focus:ring-[#ff0086]/20" />
                    <span className="text-sm text-gray-700">
                      Tôi sẽ giữ nguyên content tối thiểu 30 ngày sau khi đăng
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#ff0086] rounded border-gray-300 focus:ring-[#ff0086]/20" />
                    <span className="text-sm text-gray-700">
                      Tôi đồng ý cho Samsung sử dụng content của tôi cho mục đích marketing
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-[#ff0086] rounded border-gray-300 focus:ring-[#ff0086]/20" />
                    <span className="text-sm text-gray-700">
                      Tôi đã đọc và đồng ý với điều khoản sử dụng của IKK Platform
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white py-3 rounded-lg font-semibold transition-colors">
                  Gửi đơn ứng tuyển
                </button>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
                  Lưu nháp
                </button>
                <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 35. Campaign Deadline Reminder */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#ff0086]" />
            35. Campaign Deadline Reminder
          </h3>
          
          <div className="space-y-6">
            {/* Urgent Reminders */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-red-900 mb-2">Deadline khẩn cấp!</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Samsung Galaxy S25 - Báo cáo cuối</h5>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                          CÒN 6 GIỜ
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Deadline: Hôm nay, 6:00 PM</p>
                      <div className="flex items-center gap-2">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Gửi báo cáo ngay
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Xin gia hạn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Warning Reminders */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-yellow-900 mb-2">Sắp hết hạn</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Maybelline SuperStay - Content Instagram</h5>
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                          CÒN 2 NGÀY
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Deadline: 20/8/2025, 11:59 PM</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Tiếp tục làm
                        </button>
                        <span className="text-sm text-gray-600">75% hoàn thành</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Deadlines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 mb-2">Deadline sắp tới</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">Uniqlo Fashion Styling - Video TikTok</h5>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                          CÒN 5 NGÀY
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Deadline: 25/8/2025, 6:00 PM</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Bắt đầu làm
                        </button>
                        <span className="text-sm text-gray-600">50% hoàn thành</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 36. Campaign Team Collaborator View */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#ff0086]" />
            36. Campaign Team Collaborator View
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Beauty Festival 2025 - Team Alpha</h4>
                  <p className="text-sm text-gray-600">5 KOC được chọn cho chiến dịch mega</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    Đang hoạt động
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">BG</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Beauty Guru (Bạn)</h5>
                      <p className="text-sm text-gray-500">Team Leader</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiến độ:</span>
                      <span className="font-medium text-green-600">90%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nhiệm vụ:</span>
                      <span className="font-medium">YouTube Review</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-[90%]"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">LT</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Linh Trang</h5>
                      <p className="text-sm text-gray-500">Instagram Specialist</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiến độ:</span>
                      <span className="font-medium text-yellow-600">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nhiệm vụ:</span>
                      <span className="font-medium">Instagram Content</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-500 h-2 rounded-full w-[65%]"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">MH</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Minh Hương</h5>
                      <p className="text-sm text-gray-500">TikTok Creator</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiến độ:</span>
                      <span className="font-medium text-blue-600">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nhiệm vụ:</span>
                      <span className="font-medium">TikTok Videos</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
              </div>
              
              {/* Team Progress */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-4">Tiến độ chung của team</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4/5</div>
                    <div className="text-sm text-gray-500">Hoàn thành</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-gray-500">Đang làm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">80%</div>
                    <div className="text-sm text-gray-500">Tiến độ TB</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ff0086]">3 ngày</div>
                    <div className="text-sm text-gray-500">Còn lại</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 h-3 rounded-full w-4/5"></div>
                </div>
              </div>
              
              {/* Team Chat */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-900">Chat nhóm</h5>
                  <button className="text-[#ff0086] hover:text-[#e6007a] text-sm font-medium transition-colors">
                    Xem tất cả
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">LT</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="text-sm text-gray-900">Mình đã upload Instagram post rồi nhé các bạn!</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">10 phút trước</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MH</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <p className="text-sm text-gray-900">Tuyệt vời! Mình đang chuẩn bị TikTok video</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">8 phút trước</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 37. Campaign Content Submission */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#ff0086]" />
            37. Campaign Content Submission
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Nộp content: Samsung Galaxy S25 Review</h4>
                  <p className="text-sm text-gray-600">Upload các deliverable theo yêu cầu</p>
                </div>
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                  4/6 completed
                </span>
              </div>
              
              <div className="space-y-6">
                {/* Video Submission */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#ff0086]" />
                      Video Review (YouTube)
                    </h5>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-12 bg-gradient-to-br from-red-200 to-red-300 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h6 className="font-medium text-gray-900">Samsung Galaxy S25 Ultra Full Review</h6>
                        <p className="text-sm text-gray-500">Đã upload • 15 phút • 1.2K views</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Link:</strong> https://youtube.com/watch?v=abc123</p>
                    <p><strong>Ngày đăng:</strong> 15/8/2025</p>
                    <p><strong>Trạng thái:</strong> <span className="text-green-600 font-medium">Đã phê duyệt</span></p>
                  </div>
                </div>
                
                {/* Photo Submission */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Image className="w-5 h-5 text-[#ff0086]" />
                      Bộ ảnh sản phẩm (10+ ảnh)
                    </h5>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Số lượng:</strong> 12 ảnh</p>
                    <p><strong>Định dạng:</strong> JPG, PNG (High resolution)</p>
                    <p><strong>Trạng thái:</strong> <span className="text-green-600 font-medium">Đã phê duyệt</span></p>
                  </div>
                </div>
                
                {/* Social Media Posts */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-[#ff0086]" />
                      Instagram Posts
                    </h5>
                    <Timer className="w-5 h-5 text-yellow-500" />
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload screenshots của Instagram posts</p>
                    <p className="text-sm text-gray-500 mb-4">JPG, PNG - tối đa 10MB mỗi file</p>
                    <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Chọn file
                    </button>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Yêu cầu:</strong> 3-5 posts với hashtag #SamsungGalaxyS25 #TechReview</p>
                    <p><strong>Deadline:</strong> 20/8/2025</p>
                  </div>
                </div>
                
                {/* Report Submission */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#ff0086]" />
                      Báo cáo kết quả
                    </h5>
                    <AlertCircle className="w-5 h-5 text-gray-300" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tổng kết campaign
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả kết quả đạt được, feedback từ audience, insights..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tổng views/lượt xem
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Engagement rate (%)
                        </label>
                        <input
                          type="number"
                          placeholder="0.00"
                          step="0.01"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white py-3 rounded-lg font-semibold transition-colors">
                  Gửi tất cả deliverable
                </button>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
                  Lưu nháp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 38. Campaign Performance Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#ff0086]" />
            38. Campaign Performance Metrics
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Maybelline SuperStay - Performance Report</h4>
                  <p className="text-sm text-gray-600">Kết quả sau 7 ngày campaign</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    Hoàn thành
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#ff0086] mb-1">45.2K</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+125%</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">3.8K</div>
                  <div className="text-sm text-gray-600">Likes</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+89%</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">8.4%</div>
                  <div className="text-sm text-gray-600">Engagement</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">267</div>
                  <div className="text-sm text-gray-600">Comments</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+156%</span>
                  </div>
                </div>
              </div>
              
              {/* Platform Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">YouTube</h5>
                      <p className="text-sm text-gray-500">Main Review Video</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">28.5K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Likes:</span>
                      <span className="font-medium">2.1K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Watch time:</span>
                      <span className="font-medium">8.2 min avg</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Instagram</h5>
                      <p className="text-sm text-gray-500">5 Posts + Stories</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reach:</span>
                      <span className="font-medium">12.3K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Likes:</span>
                      <span className="font-medium">1.4K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saves:</span>
                      <span className="font-medium">89</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">TikTok</h5>
                      <p className="text-sm text-gray-500">3 Short Videos</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">4.4K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Likes:</span>
                      <span className="font-medium">321</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shares:</span>
                      <span className="font-medium">45</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Audience Insights */}
              <div className="bg-white rounded-lg p-6">
                <h5 className="font-semibold text-gray-900 mb-4">Insights về audience</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-3">Độ tuổi</h6>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">18-24</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#ff0086] h-2 rounded-full w-3/5"></div>
                          </div>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">25-34</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#ff0086] h-2 rounded-full w-4/5"></div>
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">35+</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-[#ff0086] h-2 rounded-full w-1/5"></div>
                          </div>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-3">Giới tính</h6>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Nữ</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full w-4/5"></div>
                          </div>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Nam</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                          </div>
                          <span className="text-sm font-medium">22%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-3">Top feedback</h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">"Màu sắc rất đẹp"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">"Thực sự lâu trôi"</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">"Giá cả hợp lý"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 39. Campaign Milestone Tracker */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Flag className="w-5 h-5 text-[#ff0086]" />
            39. Campaign Milestone Tracker
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Uniqlo Fashion Campaign - Milestones</h4>
                  <p className="text-sm text-gray-600">Theo dõi các cột mốc quan trọng</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#ff0086]">60%</div>
                  <div className="text-sm text-gray-500">Hoàn thành</div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {/* Milestone 1 - Completed */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        100%
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">Application Approved</h5>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            Hoàn thành
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Đơn ứng tuyển đã được chấp thuận</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Hoàn thành: 10/8/2025</span>
                          <span>Thù lao: ₫1,000,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Milestone 2 - Completed */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        100%
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">Product Received</h5>
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            Hoàn thành
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Đã nhận được sản phẩm Uniqlo</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Hoàn thành: 12/8/2025</span>
                          <span>Bonus: ₫200,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Milestone 3 - In Progress */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-full flex items-center justify-center relative">
                        <Camera className="w-6 h-6 text-white" />
                        <div className="absolute -inset-1 rounded-full border-2 border-[#ff0086] animate-pulse"></div>
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#ff0086] text-white text-xs px-2 py-1 rounded-full font-bold">
                        75%
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="bg-white rounded-lg p-4 border border-[#ff0086]/20">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">Content Creation</h5>
                          <span className="bg-[#ff0086]/10 text-[#ff0086] text-xs px-2 py-1 rounded-full font-medium">
                            Đang thực hiện
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Tạo styling content cho 5 outfit</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-[#ff0086] h-2 rounded-full w-3/4"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Deadline: 20/8/2025</span>
                          <span>Bonus: ₫500,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Milestone 4 - Pending */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <Send className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-bold">
                        0%
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-400">Submit Final Report</h5>
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                            Chưa bắt đầu
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Gửi báo cáo kết quả campaign</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Deadline: 25/8/2025</span>
                          <span>Bonus: ₫300,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Milestone 5 - Pending */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs px-2 py-1 rounded-full font-bold">
                        0%
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-400">Campaign Completion</h5>
                          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                            Chờ hoàn thành
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Nhận thanh toán và đánh giá</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Dự kiến: 30/8/2025</span>
                          <span>Total: ₫2,000,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overall Progress */}
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">Tổng tiến độ</h5>
                  <span className="text-sm text-gray-600">3/5 milestones</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 h-3 rounded-full w-3/5"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Thù lao đã kiếm: ₙ1,200,000</span>
                  <span className="text-[#ff0086] font-medium">Còn lại: ₙ800,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 40. Campaign Feedback Rating System */}
        <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#ff0086]" />
            40. Campaign Feedback Rating System
          </h3>
          
          <div className="space-y-6">
            {/* Rating Overview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">Đánh giá chiến dịch Samsung Galaxy S25</h4>
                  <p className="text-sm text-gray-600">Feedback từ thương hiệu và cộng đồng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff0086]">4.8</div>
                  <div className="flex items-center gap-1 my-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= 5 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Xuất sắc</p>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Đánh giá từ thương hiệu</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Chất lượng nội dung</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= 5 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">5.0</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Đúng deadline</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= 5 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">5.0</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sáng tạo</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tương tác</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">4.0</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Phản hồi từ audience</h5>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium">Review rất chi tiết và hữu ích!</p>
                          <p className="text-xs text-gray-500">45 người thấy hữu ích</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium">Cảm ơn bạn, quyết định mua rồi!</p>
                          <p className="text-xs text-gray-500">23 người thấy hữu ích</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium">Video quality tuyệt vời!</p>
                          <p className="text-xs text-gray-500">18 người thấy hữu ích</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Brand Feedback */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SV</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h6 className="font-semibold text-gray-900">Samsung Vietnam</h6>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-500">Brand Official</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                      <span className="text-sm font-medium ml-2">5.0 stars</span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      "Anh BeautyGuru đã tạo ra một review rất chuyên nghiệp và chi tiết về Galaxy S25. 
                      Nội dung authentic, camera work xuất sắc, và đúng deadline. Chúng tôi rất hài lòng 
                      với chất lượng content và sẽ hợp tác lâu dài."
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Brand Manager - Samsung Vietnam</span>
                      <span>•</span>
                      <span>20/8/2025</span>
                    </div>
                  </div>
                </div>
                
                {/* Performance Bonus */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h6 className="font-semibold text-green-800 mb-1">Performance Bonus Unlocked!</h6>
                      <p className="text-sm text-green-700 mb-2">
                        Do chất lượng xuất sắc và engagement cao, bạn nhận được bonus thêm ₙ1,000,000
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-green-600 font-medium">Total earned: ₙ6,000,000</span>
                        <span className="text-green-600">Rating impact: +0.2 points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rate This Campaign */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h5 className="font-semibold text-gray-900 mb-4">Đánh giá thương hiệu và campaign</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sự hỗ trợ từ brand manager
                    </label>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(i => (
                        <button key={i} className="w-8 h-8">
                          <Star className={`w-6 h-6 ${i <= 5 ? 'text-amber-400 fill-current' : 'text-gray-300'} hover:text-amber-400 transition-colors`} />
                        </button>
                      ))}
                      <span className="text-sm font-medium ml-2">5.0</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chất lượng sản phẩm
                    </label>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(i => (
                        <button key={i} className="w-8 h-8">
                          <Star className={`w-6 h-6 ${i <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'} hover:text-amber-400 transition-colors`} />
                        </button>
                      ))}
                      <span className="text-sm font-medium ml-2">4.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận xét về campaign
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Chia sẻ trải nghiệm của bạn về campaign này..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  ></textarea>
                </div>
                
                <button className="mt-4 bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 44: Campaign Collaboration Board */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              44
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Campaign Collaboration Board</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Giao diện cộng tác hiển thị workflow nhóm, giao tiếp và quản lý dự án với thiết kế sạch sẽ của SOOPLIVE
          </p>
        </div>

        {/* Main Collaboration Interface - Apple HIG design */}
        <div className="relative bg-gradient-to-br from-blue-50/80 via-white/90 to-indigo-50/80 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_16px_60px_rgb(0,0,0,0.16)] transition-all duration-300">
          
          {/* Project Header - Apple HIG spacing */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.08)] mb-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Beauty Campaign Q4 2025</h3>
                  <p className="text-gray-600 text-sm">Maybelline x KOC Partnership</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>15/09 - 30/12/2025</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>12 thành viên</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Đang triển khai
                </div>
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm" data-testid="button-project-settings">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Task Board */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Task Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* To Do Column - Apple HIG cards */}
                <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-[0_2px_12px_rgb(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.10)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      Cần làm
                    </h4>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">5</span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Tạo content brief", assignee: "Minh Anh", priority: "high" },
                      { title: "Review sản phẩm", assignee: "Thúy Linh", priority: "medium" },
                      { title: "Lên kế hoạch shooting", assignee: "Hoàng Nam", priority: "low" },
                    ].map((task, index) => (
                      <div key={index} className="bg-white/80 rounded-lg p-3 border border-gray-100/50 shadow-[0_1px_8px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_16px_rgb(0,0,0,0.08)] hover:bg-white/90 transition-all duration-300 cursor-pointer group hover:scale-[1.02]">
                        <h5 className="font-medium text-sm text-gray-900 mb-2">{task.title}</h5>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {task.assignee[0]}
                            </div>
                            <span className="text-xs text-gray-600">{task.assignee}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            task.priority === 'high' ? 'bg-red-500' :
                            task.priority === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In Progress Column - Apple HIG cards */}
                <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-[0_2px_12px_rgb(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.10)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Đang làm
                    </h4>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">3</span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Chụp ảnh sản phẩm", assignee: "Văn Đức", progress: "60%" },
                      { title: "Viết caption", assignee: "Thu Hà", progress: "80%" },
                    ].map((task, index) => (
                      <div key={index} className="bg-white/80 rounded-lg p-3 border border-gray-100/50 shadow-[0_1px_8px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_16px_rgb(0,0,0,0.08)] hover:bg-white/90 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
                        <h5 className="font-medium text-sm text-gray-900 mb-2">{task.title}</h5>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {task.assignee[0]}
                            </div>
                            <span className="text-xs text-gray-600">{task.assignee}</span>
                          </div>
                          <span className="text-xs font-medium text-blue-600">{task.progress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: task.progress }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Done Column - Apple HIG cards */}
                <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-[0_2px_12px_rgb(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.10)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Hoàn thành
                    </h4>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">7</span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Nghiên cứu thị trường", assignee: "Kim Oanh", date: "20/09" },
                      { title: "Thiết kế banner", assignee: "Quang Minh", date: "18/09" },
                    ].map((task, index) => (
                      <div key={index} className="bg-white/80 rounded-lg p-3 border border-gray-100/50 shadow-[0_1px_8px_rgb(0,0,0,0.04)] opacity-75 hover:opacity-90 transition-all duration-300">
                        <h5 className="font-medium text-sm text-gray-700 mb-2 line-through">{task.title}</h5>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                            <span className="text-xs text-gray-500">{task.assignee}</span>
                          </div>
                          <span className="text-xs text-gray-400">{task.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-gray-500" />
                  Hoạt động gần đây
                </h4>
                
                <div className="space-y-4">
                  {[
                    { user: "Thu Hà", action: "đã cập nhật", task: "Viết caption", time: "2 giờ trước", avatar: "bg-pink-400" },
                    { user: "Văn Đức", action: "đã hoàn thành", task: "Chụp ảnh sản phẩm", time: "4 giờ trước", avatar: "bg-blue-400" },
                    { user: "Minh Anh", action: "đã tạo", task: "Content brief mới", time: "1 ngày trước", avatar: "bg-green-400" },
                    { user: "Quang Minh", action: "đã comment", task: "Thiết kế banner", time: "2 ngày trước", avatar: "bg-purple-400" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${activity.avatar} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                        {activity.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.task}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Team & Communication */}
            <div className="space-y-6">
              
              {/* Team Members */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    Thành viên
                  </h4>
                  <button className="text-[#ff0086] hover:text-[#e6007a] text-sm font-medium" data-testid="button-add-member">
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Minh Anh", role: "Project Manager", status: "online", avatar: "bg-pink-400" },
                    { name: "Thu Hà", role: "Content Creator", status: "online", avatar: "bg-blue-400" },
                    { name: "Văn Đức", role: "Photographer", status: "away", avatar: "bg-green-400" },
                    { name: "Quang Minh", role: "Designer", status: "offline", avatar: "bg-purple-400" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-all duration-300">
                      <div className="relative">
                        <div className={`w-10 h-10 ${member.avatar} rounded-full flex items-center justify-center text-white font-medium`}>
                          {member.name[0]}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' :
                          member.status === 'away' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 truncate">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Chat */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  Chat nhóm
                </h4>
                
                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                  {[
                    { user: "Thu Hà", message: "Caption đã xong, mọi người check giúp!", time: "14:30", avatar: "bg-blue-400" },
                    { user: "Minh Anh", message: "Great job! 👍", time: "14:32", avatar: "bg-pink-400" },
                    { user: "Văn Đức", message: "Ảnh đã edit xong, upload lên drive rồi", time: "14:45", avatar: "bg-green-400" },
                  ].map((chat, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className={`w-6 h-6 ${chat.avatar} rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                        {chat.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white/80 rounded-lg p-2 text-sm">
                          <p className="font-medium text-gray-900 text-xs mb-1">{chat.user}</p>
                          <p className="text-gray-700">{chat.message}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] text-sm transition-all duration-300"
                    data-testid="input-chat-message"
                  />
                  <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white p-2 rounded-lg transition-all duration-300" data-testid="button-send-message">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                  Thống kê dự án
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tiến độ tổng thể</span>
                    <span className="font-semibold text-green-600">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">15</div>
                      <div className="text-xs text-gray-500">Tasks hoàn thành</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">7</div>
                      <div className="text-xs text-gray-500">Tasks còn lại</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <div className="flex items-center gap-1 text-sm font-medium text-[#ff0086]">
                      <Timer className="w-4 h-4" />
                      <span>15 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Showcase Section - Apple HIG design */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-8" id="campaign-showcase">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Chiến dịch nổi bật</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá những chiến dịch thành công nhất trên nền tảng IKK với hiệu suất cao và ROI ấn tượng
          </p>
        </div>

        {/* Featured Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Campaign 1 - Beauty Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#ff0086]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Campaign Skincare Premium</h3>
                  <p className="text-sm text-gray-500">Bởi Beauty Brand Vietnam</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                <span>Đang hoạt động</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                Chiến dịch quảng bá dòng sản phẩm skincare cao cấp với focus group phụ nữ 25-35 tuổi tại các thành phố lớn
              </p>
              
              {/* Campaign Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-[#ff0086]">2.8M</div>
                  <div className="text-xs text-gray-500">Lượt tiếp cận</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">4.2%</div>
                  <div className="text-xs text-gray-500">Tỷ lệ chuyển đổi</div>
                </div>
              </div>

              {/* KOC Participants */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">KOC tham gia</span>
                <div className="flex -space-x-2">
                  {['bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'].map((color, index) => (
                    <div key={index} className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                    +12
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tiến độ campaign</span>
                  <span className="text-sm font-semibold text-[#ff0086]">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-400 to-[#ff0086] h-2 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Còn 8 ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[#ff0086] hover:text-[#e6007a] text-sm font-medium transition-colors" data-testid="button-view-campaign">
                  Xem chi tiết
                </button>
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300" data-testid="button-join-campaign">
                  Tham gia
                </button>
              </div>
            </div>
          </div>

          {/* Campaign 2 - Tech Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Smart Device Launch</h3>
                  <p className="text-sm text-gray-500">Bởi TechVN Electronics</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                <Clock className="w-3 h-3" />
                <span>Sắp bắt đầu</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">
                Ra mắt dòng sản phẩm công nghệ thông minh mới với target audience là giới trẻ am hiểu công nghệ
              </p>
              
              {/* Campaign Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">1.5M</div>
                  <div className="text-xs text-gray-500">Budget dự kiến</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">25</div>
                  <div className="text-xs text-gray-500">KOC được chọn</div>
                </div>
              </div>

              {/* Application Stats */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Đăng ký tham gia</span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, index) => (
                      <div key={index} className={`w-6 h-6 ${color} rounded-full border-2 border-white`}></div>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">142 ứng viên</span>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Yêu cầu KOC</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Min 10K followers trên Instagram</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Engagement rate &gt; 3%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Content về công nghệ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>TP.HCM, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors" data-testid="button-view-requirements">
                  Xem yêu cầu
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300" data-testid="button-apply-campaign">
                  Ứng tuyển
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance Dashboard */}
        <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard hiệu suất campaign</h3>
            <p className="text-gray-600">Thống kê tổng quan về hiệu suất các campaign trên nền tảng IKK</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-[#ff0086]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-500">Campaign hoạt động</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-500">KOC tham gia</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15.2M</div>
              <div className="text-sm text-gray-500">Tổng tiếp cận</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8%</div>
              <div className="text-sm text-gray-500">ROI trung bình</div>
            </div>
          </div>

          {/* Recent Campaign Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#ff0086]" />
                Hoạt động campaign gần đây
              </h4>
              
              <div className="space-y-4">
                {[
                  { campaign: "Beauty Premium", action: "KOC mới tham gia", koc: "Minh Châu", time: "2 giờ trước", status: "success" },
                  { campaign: "Tech Launch", action: "Duyệt content", koc: "Văn Hùng", time: "4 giờ trước", status: "pending" },
                  { campaign: "Fashion Week", action: "Hoàn thành milestone", koc: "Thu Thảo", time: "6 giờ trước", status: "completed" },
                  { campaign: "Food Festival", action: "Upload ảnh sản phẩm", koc: "Quang Minh", time: "1 ngày trước", status: "success" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-300">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.campaign}</span> - {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">KOC: {activity.koc} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Top KOC performer
              </h4>
              
              <div className="space-y-4">
                {[
                  { name: "Thu Thảo", specialty: "Beauty & Skincare", campaigns: 12, rating: 4.9, avatar: "bg-pink-400" },
                  { name: "Văn Hùng", specialty: "Tech Reviews", campaigns: 8, rating: 4.8, avatar: "bg-blue-400" },
                  { name: "Minh Châu", specialty: "Fashion & Lifestyle", campaigns: 15, rating: 4.7, avatar: "bg-purple-400" },
                  { name: "Quang Minh", specialty: "Food & Travel", campaigns: 10, rating: 4.6, avatar: "bg-green-400" },
                ].map((koc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-300">
                    <div className={`w-10 h-10 ${koc.avatar} rounded-full flex items-center justify-center text-white font-medium`}>
                      {koc.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-gray-900 truncate">{koc.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{koc.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{koc.specialty}</p>
                      <p className="text-xs text-gray-400">{koc.campaigns} campaigns hoàn thành</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Admin Content Management Section 1: Content Approval & Moderation Dashboard */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 via-white to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bảng điều khiển kiểm duyệt & giám sát nội dung</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hệ thống quản lý và kiểm duyệt nội dung toàn diện theo tiêu chuẩn IKK Design
          </p>
        </div>

        {/* Control Panel Header */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quick Stats */}
              {[
                { label: "Chờ duyệt", value: "47", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
                { label: "Đã phê duyệt", value: "234", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
                { label: "Từ chối", value: "12", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
                { label: "Vi phạm", value: "3", icon: Shield, color: "text-purple-600", bg: "bg-purple-100" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search & Filter Bar */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm nội dung theo tên, tác giả hoặc từ khóa..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0086] focus:border-[#ff0086] transition-all duration-300"
                    data-testid="input-content-search"
                  />
                </div>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="w-40" data-testid="select-content-type">
                      <SelectValue placeholder="Loại nội dung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Hình ảnh</SelectItem>
                      <SelectItem value="text">Văn bản</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-36" data-testid="select-status">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="approved">Đã duyệt</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white transition-all duration-300" data-testid="button-apply-filters">
                    <Filter className="w-4 h-4 mr-2" />
                    Lọc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Queue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Pending Content Queue */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Hàng đợi kiểm duyệt (47)
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" data-testid="button-batch-approve">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Duyệt hàng loạt
                </Button>
                <Button variant="outline" size="sm" data-testid="button-refresh-queue">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "content-001",
                  type: "video",
                  title: "Review son môi MAC Ruby Woo - Chi tiết về màu sắc và độ bám",
                  author: "Nguyễn Mai Linh",
                  submitted: "2 giờ trước",
                  thumbnail: "https://via.placeholder.com/150x100/ff0086/ffffff?text=Video",
                  priority: "high",
                  duration: "3:24"
                },
                {
                  id: "content-002", 
                  type: "image",
                  title: "OOTD mùa hè với áo thun basic và quần jeans",
                  author: "Trần Thúy Hằng",
                  submitted: "4 giờ trước",
                  thumbnail: "https://via.placeholder.com/150x100/e6007a/ffffff?text=Image",
                  priority: "medium",
                  likes: 23
                },
                {
                  id: "content-003",
                  type: "text",
                  title: "Hướng dẫn skincare routine 7 bước cho da khô",
                  author: "Lê Phương Anh",
                  submitted: "6 giờ trước",
                  thumbnail: "https://via.placeholder.com/150x100/ff6b9d/ffffff?text=Text",
                  priority: "low",
                  wordCount: 850
                }
              ].map((content, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex gap-4">
                    {/* Content Preview */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          content.priority === 'high' ? 'bg-red-100 text-red-700' :
                          content.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {content.priority === 'high' ? 'Ưu tiên cao' : 
                           content.priority === 'medium' ? 'Ưu tiên vừa' : 'Ưu tiên thấp'}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-5 truncate pr-2">{content.title}</h4>
                        <div className="flex gap-1">
                          {content.type === 'video' && <Video className="w-4 h-4 text-blue-600" />}
                          {content.type === 'image' && <Image className="w-4 h-4 text-green-600" />}
                          {content.type === 'text' && <FileText className="w-4 h-4 text-orange-600" />}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {content.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {content.submitted}
                        </span>
                        {content.duration && (
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {content.duration}
                          </span>
                        )}
                        {content.wordCount && (
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {content.wordCount} từ
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                          data-testid={`button-approve-${content.id}`}
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Phê duyệt
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="hover:bg-red-700 transition-all duration-300"
                          data-testid={`button-reject-${content.id}`}
                        >
                          <UserX className="w-3 h-3 mr-1" />
                          Từ chối
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-preview-${content.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Xem
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          data-testid={`button-message-${content.id}`}
                        >
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-600">
                Hiển thị 1-3 trong tổng 47 nội dung
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" data-testid="button-previous-page">
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm" data-testid="button-next-page">
                  Sau
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Moderation Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Quick Reference */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-[#ff0086]" />
                Hướng dẫn kiểm duyệt
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900 mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Nội dung phù hợp
                  </div>
                  <ul className="text-green-800 text-xs space-y-1">
                    <li>• Có giá trị giáo dục, giải trí tích cực</li>
                    <li>• Tuân thủ quy định pháp luật Việt Nam</li>
                    <li>• Chất lượng hình ảnh/video tốt</li>
                    <li>• Thông tin chính xác, có nguồn gốc</li>
                  </ul>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-900 mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Nội dung vi phạm
                  </div>
                  <ul className="text-red-800 text-xs space-y-1">
                    <li>• Thông tin sai sự thật, câu view</li>
                    <li>• Vi phạm bản quyền, hình ảnh</li>
                    <li>• Nội dung nhạy cảm, không phù hợp</li>
                    <li>• Quảng cáo không rõ nguồn gốc</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  data-testid="button-view-full-guidelines"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Xem đầy đủ hướng dẫn
                </Button>
              </div>
            </div>

            {/* Batch Operations */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Thao tác hàng loạt
              </h4>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  data-testid="button-select-all-pending"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Chọn tất cả chờ duyệt
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  data-testid="button-approve-selected"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Duyệt đã chọn
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-red-600 hover:bg-red-50"
                  data-testid="button-reject-selected"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Từ chối đã chọn
                </Button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-900 font-medium mb-2">Thống kê ngày hôm nay</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-blue-800">Đã duyệt: <span className="font-medium">23</span></div>
                  <div className="text-blue-800">Từ chối: <span className="font-medium">4</span></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-600" />
                Hoạt động gần đây
              </h4>
              
              <div className="space-y-3">
                {[
                  { action: "Phê duyệt", content: "Review mascara Maybelline", time: "5 phút trước", user: "Admin Mai" },
                  { action: "Từ chối", content: "Video dance trending", time: "15 phút trước", user: "Admin Hùng" },
                  { action: "Phê duyệt", content: "Outfit inspiration", time: "1 giờ trước", user: "Admin Linh" }
                ].map((activity, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.action === 'Phê duyệt' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-500">{activity.action.toLowerCase()}</span>
                    </div>
                    <div className="text-gray-600 ml-4">"{activity.content}"</div>
                    <div className="text-gray-400 ml-4">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Content Management Section 2: Content Analytics & Performance Hub */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trung tâm phân tích & hiệu suất nội dung</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Công cụ phân tích toàn diện giúp tối ưu hóa nội dung và nâng cao hiệu quả marketing
          </p>
        </div>

        {/* Analytics Overview Dashboard */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {[
                { 
                  label: "Tổng lượt xem", 
                  value: "2.4M", 
                  change: "+23.5%", 
                  trend: "up",
                  icon: Eye,
                  color: "text-blue-600",
                  bg: "bg-blue-100"
                },
                { 
                  label: "Tương tác", 
                  value: "156K", 
                  change: "+12.8%", 
                  trend: "up",
                  icon: Heart,
                  color: "text-pink-600",
                  bg: "bg-pink-100"
                },
                { 
                  label: "Chia sẻ", 
                  value: "23.7K", 
                  change: "-4.2%", 
                  trend: "down",
                  icon: Share2,
                  color: "text-green-600",
                  bg: "bg-green-100"
                },
                { 
                  label: "Chuyển đổi", 
                  value: "8.9%", 
                  change: "+2.1%", 
                  trend: "up",
                  icon: TargetIcon,
                  color: "text-purple-600",
                  bg: "bg-purple-100"
                }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${metric.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                  <div className={`text-xs flex items-center justify-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <TrendingDownIcon className="w-3 h-3" />}
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Range Selector */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2">
                {['7 ngày', '30 ngày', '90 ngày', 'Tùy chỉnh'].map((period, index) => (
                  <Button 
                    key={index}
                    variant={index === 1 ? "default" : "outline"}
                    size="sm"
                    className={index === 1 ? "bg-[#ff0086] hover:bg-[#e6007a] text-white" : ""}
                    data-testid={`button-period-${period.replace(' ', '-')}`}
                  >
                    {period}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid="button-export-analytics"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất báo cáo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid="button-refresh-analytics"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Performance Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#ff0086]" />
                  So sánh hiệu suất theo loại nội dung
                </h3>
                <Select>
                  <SelectTrigger className="w-32" data-testid="select-performance-metric">
                    <SelectValue placeholder="Chỉ số" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Tương tác</SelectItem>
                    <SelectItem value="views">Lượt xem</SelectItem>
                    <SelectItem value="conversion">Chuyển đổi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: "Video", performance: 87, color: "bg-blue-500", icon: Video },
                  { type: "Hình ảnh", performance: 73, color: "bg-green-500", icon: Image },
                  { type: "Văn bản", performance: 45, color: "bg-orange-500", icon: FileText }
                ].map((contentType, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 ${contentType.color.replace('bg-', 'bg-').replace('-500', '-100')} rounded-lg flex items-center justify-center`}>
                        <contentType.icon className={`w-4 h-4 ${contentType.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="font-medium text-gray-900">{contentType.type}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hiệu suất</span>
                        <span className="font-medium">{contentType.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${contentType.color}`}
                          style={{ width: `${contentType.performance}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Tương tác trung bình: {Math.round(contentType.performance * 2.3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Content Identification */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-600" />
                  Nội dung đang trending
                </h3>
                <Button variant="outline" size="sm" data-testid="button-view-all-trending">
                  Xem tất cả
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Summer Skincare Routine 2025 - 7 bước cơ bản",
                    author: "Beauty Guru Linh",
                    views: "89.2K",
                    engagement: "23.4K",
                    growth: "+245%",
                    type: "video",
                    thumbnail: "https://via.placeholder.com/60x40/ff0086/ffffff?text=Video"
                  },
                  {
                    title: "OOTD công sở thanh lịch với budget 500K",
                    author: "Fashion Insider Mai",
                    views: "67.8K", 
                    engagement: "18.9K",
                    growth: "+189%",
                    type: "image",
                    thumbnail: "https://via.placeholder.com/60x40/e6007a/ffffff?text=Image"
                  },
                  {
                    title: "Review chi tiết iPhone 16 Pro - Có đáng mua?",
                    author: "Tech Expert Hùng",
                    views: "45.3K",
                    engagement: "12.1K", 
                    growth: "+156%",
                    type: "video",
                    thumbnail: "https://via.placeholder.com/60x40/ff6b9d/ffffff?text=Video"
                  }
                ].map((content, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-15 h-10 rounded object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{content.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>{content.author}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {content.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {content.engagement}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">{content.growth}</div>
                      <div className="text-xs text-gray-500">24h qua</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            {/* Real-time Performance Monitor */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#ff0086]" />
                Giám sát thời gian thực
              </h4>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff0086] mb-1">94.2</div>
                  <div className="text-sm text-gray-600">Điểm hiệu suất tổng thể</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3" />
                    +5.7 từ hôm qua
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "Lượt xem/giờ", value: "2.3K", color: "text-blue-600" },
                    { label: "Tương tác/giờ", value: "847", color: "text-green-600" },
                    { label: "Chia sẻ/giờ", value: "156", color: "text-purple-600" },
                    { label: "CTR trung bình", value: "12.4%", color: "text-orange-600" }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{metric.label}</span>
                      <span className={`text-sm font-medium ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">Alert Thời gian vàng</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    19:00-21:00 là thời điểm engagement cao nhất. Lên lịch content ngay!
                  </p>
                </div>
              </div>
            </div>

            {/* Content Optimization Recommendations */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Đề xuất tối ưu hóa
              </h4>
              
              <div className="space-y-3">
                {[
                  {
                    type: "hashtag",
                    title: "Hashtag hot",
                    description: "#SkincareTips tăng 67% reach tuần này",
                    action: "Áp dụng ngay",
                    priority: "high"
                  },
                  {
                    type: "timing",
                    title: "Thời gian đăng",
                    description: "Thứ 3, 7:30 PM có engagement cao nhất",
                    action: "Lên lịch",
                    priority: "medium"
                  },
                  {
                    type: "format",
                    title: "Định dạng nội dung",
                    description: "Video ngắn 60-90s có tỷ lệ hoàn thành tốt nhất",
                    action: "Thử ngay",
                    priority: "medium"
                  }
                ].map((rec, index) => (
                  <div key={index} className="p-3 bg-white/50 rounded-lg hover:bg-white transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${
                            rec.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{rec.title}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        <button className="text-xs text-[#ff0086] hover:text-[#e6007a] font-medium transition-colors" data-testid={`button-apply-recommendation-${index}`}>
                          {rec.action} →
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm" data-testid={`button-dismiss-recommendation-${index}`}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Leaderboard */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Bảng xếp hạng creator
              </h4>
              
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Beauty Guru Linh", score: 98.7, avatar: "BGL" },
                  { rank: 2, name: "Tech Expert Hùng", score: 95.2, avatar: "TEH" },
                  { rank: 3, name: "Fashion Insider Mai", score: 92.8, avatar: "FIM" },
                  { rank: 4, name: "Lifestyle Blogger An", score: 89.1, avatar: "LBA" }
                ].map((creator, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-white/50 transition-all duration-300">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      creator.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                      creator.rank === 2 ? 'bg-gray-100 text-gray-700' :
                      creator.rank === 3 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      #{creator.rank}
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-[#ff0086] to-[#e6007a] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{creator.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{creator.name}</div>
                      <div className="text-xs text-gray-500">Điểm: {creator.score}</div>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm" data-testid={`button-view-creator-${index}`}>
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  data-testid="button-view-full-leaderboard"
                >
                  Xem bảng xếp hạng đầy đủ
                </Button>
              </div>
            </div>

            {/* Export & Reporting */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                Báo cáo & Xuất dữ liệu
              </h4>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white transition-all duration-300 flex items-center justify-center gap-2" 
                  data-testid="button-generate-performance-report"
                >
                  <FileText className="w-4 h-4" />
                  Báo cáo hiệu suất
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-300 flex items-center justify-center gap-2" 
                  data-testid="button-export-analytics-data"
                >
                  <Download className="w-4 h-4" />
                  Xuất dữ liệu phân tích
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-300 flex items-center justify-center gap-2" 
                  data-testid="button-schedule-report"
                >
                  <Calendar className="w-4 h-4" />
                  Lên lịch báo cáo
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Báo cáo được tạo gần đây</div>
                <div className="space-y-2">
                  {[
                    { name: "Analytics_Week12_2025.pdf", date: "Hôm nay" },
                    { name: "Content_Performance_Q1.xlsx", date: "Hôm qua" },
                    { name: "Trending_Analysis.pdf", date: "2 ngày trước" }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-white/50 rounded transition-all duration-300">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-900 truncate">{report.name}</div>
                        <div className="text-xs text-gray-500">{report.date}</div>
                      </div>
                      <Button variant="ghost" size="sm" data-testid={`button-download-analytics-report-${index}`}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #46 Quản lý chiến dịch TikTok */}
      <section id="section-46" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-tiktok-campaign-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-tiktok-campaigns">Quản lý chiến dịch TikTok</h2>
            <p className="text-gray-600" data-testid="text-tiktok-subtitle">Theo dõi và quản lý hiệu suất các chiến dịch TikTok của thương hiệu</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-tiktok">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc nâng cao</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-tiktok-campaign">
              <span className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Tạo chiến dịch TikTok</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-tiktok-campaigns">24</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <FaTiktok className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng lượt xem</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-tiktok-views">8.5M</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +28% engagement
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tương tác trung bình</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-avg-tiktok-engagement">5.2%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Cao hơn 3.1% trung bình
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doanh thu tạo ra</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-tiktok-revenue">420M VNĐ</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ROI 3.2x
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch TikTok..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                data-testid="input-search-tiktok-campaigns"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full" data-testid="select-tiktok-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full" data-testid="select-tiktok-category">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="food">Ẩm thực</SelectItem>
                <SelectItem value="tech">Công nghệ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'tt-1',
              title: 'Beauty Challenge #GlowUp2025',
              brand: 'L\'Oréal Paris Vietnam',
              status: 'active',
              views: '2.8M',
              engagement: '6.2%',
              revenue: '125M VNĐ',
              kocs: 18,
              videos: 42,
              avatar: 'LP',
              color: 'from-pink-400 to-rose-400'
            },
            {
              id: 'tt-2',
              title: 'Fashion Haul TikTok Series',
              brand: 'Nike Vietnam',
              status: 'active',
              views: '1.9M',
              engagement: '4.8%',
              revenue: '89M VNĐ',
              kocs: 12,
              videos: 28,
              avatar: 'NK',
              color: 'from-orange-400 to-red-400'
            },
            {
              id: 'tt-3',
              title: 'TikTok Food Review Campaign',
              brand: 'Grab Food',
              status: 'active',
              views: '3.2M',
              engagement: '7.1%',
              revenue: '156M VNĐ',
              kocs: 25,
              videos: 68,
              avatar: 'GF',
              color: 'from-green-400 to-emerald-400'
            },
            {
              id: 'tt-4',
              title: 'Tech Unboxing Series',
              brand: 'Samsung Electronics',
              status: 'completed',
              views: '1.4M',
              engagement: '5.3%',
              revenue: '78M VNĐ',
              kocs: 8,
              videos: 16,
              avatar: 'SE',
              color: 'from-blue-400 to-indigo-400'
            },
            {
              id: 'tt-5',
              title: 'Skincare Routine Challenge',
              brand: 'The Face Shop',
              status: 'active',
              views: '2.1M',
              engagement: '6.8%',
              revenue: '98M VNĐ',
              kocs: 15,
              videos: 34,
              avatar: 'TF',
              color: 'from-purple-400 to-violet-400'
            },
            {
              id: 'tt-6',
              title: 'TikTok Dance Challenge',
              brand: 'Pepsi Vietnam',
              status: 'draft',
              views: '-',
              engagement: '-',
              revenue: '0 VNĐ',
              kocs: 0,
              videos: 0,
              avatar: 'PV',
              color: 'from-blue-500 to-cyan-500'
            }
          ].map((campaign) => (
            <Card key={campaign.id} className="bg-white border-gray-100 hover:shadow-xl transition-all duration-300 group" data-testid={`card-tiktok-campaign-${campaign.id}`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${campaign.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                      {campaign.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-xs text-gray-500">{campaign.brand}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge className={`
                    ${campaign.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${campaign.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${campaign.status === 'draft' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                    border
                  `} data-testid={`badge-status-${campaign.id}`}>
                    {campaign.status === 'active' && '🔴 Đang hoạt động'}
                    {campaign.status === 'completed' && '✅ Đã hoàn thành'}
                    {campaign.status === 'draft' && '📝 Nháp'}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Eye className="w-3 h-3" />
                      <span>Lượt xem</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.views}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Heart className="w-3 h-3" />
                      <span>Engagement</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.engagement}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Users className="w-3 h-3" />
                      <span>KOC</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.kocs}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Video className="w-3 h-3" />
                      <span>Video</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.videos}</div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="pt-4 border-t border-gray-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Doanh thu</span>
                    <span className="text-sm font-bold text-[#ff0086]">{campaign.revenue}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-gray-50 transition-colors"
                    data-testid={`button-view-${campaign.id}`}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Xem chi tiết
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#ff0086] hover:bg-[#e6007a] text-white transition-colors"
                    data-testid={`button-manage-${campaign.id}`}
                  >
                    Quản lý
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TikTok Performance Chart */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Hiệu suất TikTok theo thời gian</h3>
              <p className="text-sm text-gray-600">Theo dõi xu hướng lượt xem và engagement</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">7 ngày</button>
              <button className="px-3 py-1 text-xs font-medium bg-[#ff0086] text-white rounded-lg">30 ngày</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">90 ngày</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'T2', views: 65, engagement: 45 },
              { day: 'T3', views: 78, engagement: 52 },
              { day: 'T4', views: 92, engagement: 68 },
              { day: 'T5', views: 88, engagement: 61 },
              { day: 'T6', views: 95, engagement: 72 },
              { day: 'T7', views: 100, engagement: 85 },
              { day: 'CN', views: 85, engagement: 58 }
            ].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-[#ff0086] to-pink-400 rounded-t-lg hover:from-[#e6007a] hover:to-pink-500 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.views}%` }}
                    title={`Views: ${data.views}%`}
                  />
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg hover:from-blue-600 hover:to-indigo-500 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.engagement}%` }}
                    title={`Engagement: ${data.engagement}%`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-[#ff0086] to-pink-400 rounded"></div>
              <span className="text-xs text-gray-600">Lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-400 rounded"></div>
              <span className="text-xs text-gray-600">Tương tác</span>
            </div>
          </div>
        </div>
      </section>
      {/* #46.5 Quản lý chiến dịch Instagram */}
      <section id="section-46-5" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-instagram-campaign-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-instagram-campaigns">Quản lý chiến dịch Instagram</h2>
            <p className="text-gray-600" data-testid="text-instagram-subtitle">Theo dõi và quản lý hiệu suất các chiến dịch Instagram của thương hiệu</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-instagram">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc nâng cao</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-instagram-campaign">
              <span className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Tạo chiến dịch Instagram</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-instagram-campaigns">32</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +18% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaInstagram className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng охват (Reach)</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-instagram-reach">12.3M</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +35% engagement
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tương tác trung bình</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-avg-instagram-engagement">6.8%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Cao hơn 4.2% trung bình
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doanh thu tạo ra</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-instagram-revenue">580M VNĐ</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ROI 4.1x
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch Instagram..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                data-testid="input-search-instagram-campaigns"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full" data-testid="select-instagram-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
                <SelectItem value="paused">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full" data-testid="select-instagram-category">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="food">Ẩm thực</SelectItem>
                <SelectItem value="tech">Công nghệ</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'ig-1',
              title: 'Instagram Reels Beauty Challenge',
              brand: 'Sephora Vietnam',
              status: 'active',
              reach: '3.5M',
              engagement: '8.2%',
              revenue: '185M VNĐ',
              kocs: 22,
              stories: 45,
              posts: 28,
              reels: 15,
              avatar: 'SV',
              color: 'from-purple-400 via-pink-400 to-orange-400'
            },
            {
              id: 'ig-2',
              title: 'Fashion Lookbook Instagram Series',
              brand: 'Zara Vietnam',
              status: 'active',
              reach: '2.8M',
              engagement: '6.5%',
              revenue: '142M VNĐ',
              kocs: 18,
              stories: 38,
              posts: 22,
              reels: 12,
              avatar: 'ZV',
              color: 'from-gray-700 to-gray-900'
            },
            {
              id: 'ig-3',
              title: 'Food Photography Campaign',
              brand: 'The Coffee House',
              status: 'active',
              reach: '4.2M',
              engagement: '9.1%',
              revenue: '210M VNĐ',
              kocs: 30,
              stories: 62,
              posts: 35,
              reels: 20,
              avatar: 'TC',
              color: 'from-amber-400 to-orange-500'
            },
            {
              id: 'ig-4',
              title: 'Tech Product Launch Stories',
              brand: 'Apple Vietnam',
              status: 'completed',
              reach: '2.1M',
              engagement: '7.3%',
              revenue: '165M VNĐ',
              kocs: 12,
              stories: 25,
              posts: 18,
              reels: 8,
              avatar: 'AV',
              color: 'from-gray-400 to-gray-600'
            },
            {
              id: 'ig-5',
              title: 'Skincare Routine Reels',
              brand: 'Innisfree Vietnam',
              status: 'active',
              reach: '3.1M',
              engagement: '8.7%',
              revenue: '175M VNĐ',
              kocs: 20,
              stories: 42,
              posts: 25,
              reels: 18,
              avatar: 'IV',
              color: 'from-green-400 to-emerald-500'
            },
            {
              id: 'ig-6',
              title: 'Lifestyle Influencer Collab',
              brand: 'Uniqlo Vietnam',
              status: 'paused',
              reach: '1.8M',
              engagement: '5.4%',
              revenue: '95M VNĐ',
              kocs: 10,
              stories: 20,
              posts: 15,
              reels: 6,
              avatar: 'UV',
              color: 'from-red-500 to-red-600'
            }
          ].map((campaign) => (
            <Card key={campaign.id} className="bg-white border-gray-100 hover:shadow-xl transition-all duration-300 group" data-testid={`card-instagram-campaign-${campaign.id}`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${campaign.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                      {campaign.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-xs text-gray-500">{campaign.brand}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge className={`
                    ${campaign.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${campaign.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${campaign.status === 'draft' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                    ${campaign.status === 'paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                    border
                  `} data-testid={`badge-status-${campaign.id}`}>
                    {campaign.status === 'active' && '🔴 Đang hoạt động'}
                    {campaign.status === 'completed' && '✅ Đã hoàn thành'}
                    {campaign.status === 'draft' && '📝 Nháp'}
                    {campaign.status === 'paused' && '⏸️ Tạm dừng'}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Eye className="w-3 h-3" />
                      <span>Reach</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.reach}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Heart className="w-3 h-3" />
                      <span>Engagement</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.engagement}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Image className="w-3 h-3" />
                      <span>Stories</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.stories}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Camera className="w-3 h-3" />
                      <span>Posts</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.posts}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <PlayCircle className="w-3 h-3" />
                      <span>Reels</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.reels}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Users className="w-3 h-3" />
                      <span>KOC</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.kocs}</div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="pt-4 border-t border-gray-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Doanh thu</span>
                    <span className="text-sm font-bold text-[#ff0086]">{campaign.revenue}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-gray-50 transition-colors"
                    data-testid={`button-view-${campaign.id}`}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Xem chi tiết
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#ff0086] hover:bg-[#e6007a] text-white transition-colors"
                    data-testid={`button-manage-${campaign.id}`}
                  >
                    Quản lý
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instagram Performance Chart */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Hiệu suất Instagram theo thời gian</h3>
              <p className="text-sm text-gray-600">Theo dõi xu hướng reach và engagement</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">7 ngày</button>
              <button className="px-3 py-1 text-xs font-medium bg-[#ff0086] text-white rounded-lg">30 ngày</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">90 ngày</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'T2', reach: 70, engagement: 52 },
              { day: 'T3', reach: 85, engagement: 60 },
              { day: 'T4', reach: 95, engagement: 75 },
              { day: 'T5', reach: 92, engagement: 68 },
              { day: 'T6', reach: 100, engagement: 82 },
              { day: 'T7', reach: 98, engagement: 88 },
              { day: 'CN', reach: 88, engagement: 65 }
            ].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 via-pink-500 to-orange-400 rounded-t-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.reach}%` }}
                    title={`Reach: ${data.reach}%`}
                  />
                  <div 
                    className="w-full bg-gradient-to-t from-pink-500 to-rose-400 rounded-t-lg hover:from-pink-600 hover:to-rose-500 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.engagement}%` }}
                    title={`Engagement: ${data.engagement}%`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded"></div>
              <span className="text-xs text-gray-600">Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-400 rounded"></div>
              <span className="text-xs text-gray-600">Engagement</span>
            </div>
          </div>
        </div>
      </section>


      {/* #47 Quản lý danh mục thương hiệu */}
      <section id="section-47" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-brand-category-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-brand-categories">Quản lý danh mục thương hiệu</h2>
            <p className="text-gray-600" data-testid="text-categories-subtitle">Tổ chức và phân loại sản phẩm thương hiệu theo danh mục chuyên ngành</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-categories">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Lọc danh mục</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-category">
              <span className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Tạo danh mục mới</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng danh mục</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-categories">48</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8 danh mục mới
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Danh mục cha</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-parent-categories">12</p>
                  <p className="text-xs text-gray-500 mt-1">Cấp độ cao nhất</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Danh mục con</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-child-categories">36</p>
                  <p className="text-xs text-gray-500 mt-1">Phân loại chi tiết</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FolderTree className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sản phẩm liên kết</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-linked-products">1,248</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15% tháng này
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục theo tên, mã hoặc mô tả..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                data-testid="input-search-categories"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full" data-testid="select-category-type">
                <SelectValue placeholder="Loại danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="parent">Danh mục cha</SelectItem>
                <SelectItem value="child">Danh mục con</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full" data-testid="select-category-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="inactive">Tạm dừng</SelectItem>
                <SelectItem value="archived">Lưu trữ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Hierarchy View */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="heading-category-hierarchy">
            <FolderTree className="w-5 h-5 text-[#ff0086]" />
            Cây phân cấp danh mục
          </h3>
          
          <div className="space-y-3">
            {[
              {
                id: 'cat-1',
                name: 'Thời trang & Phụ kiện',
                code: 'FASHION',
                products: 324,
                status: 'active',
                color: 'from-pink-400 to-rose-400',
                children: [
                  { id: 'cat-1-1', name: 'Quần áo nữ', code: 'FASHION-W', products: 156 },
                  { id: 'cat-1-2', name: 'Quần áo nam', code: 'FASHION-M', products: 98 },
                  { id: 'cat-1-3', name: 'Phụ kiện thời trang', code: 'FASHION-ACC', products: 70 }
                ]
              },
              {
                id: 'cat-2',
                name: 'Làm đẹp & Chăm sóc da',
                code: 'BEAUTY',
                products: 287,
                status: 'active',
                color: 'from-purple-400 to-violet-400',
                children: [
                  { id: 'cat-2-1', name: 'Skincare', code: 'BEAUTY-SKIN', products: 145 },
                  { id: 'cat-2-2', name: 'Makeup', code: 'BEAUTY-MAKEUP', products: 98 },
                  { id: 'cat-2-3', name: 'Chăm sóc tóc', code: 'BEAUTY-HAIR', products: 44 }
                ]
              },
              {
                id: 'cat-3',
                name: 'Thực phẩm & Đồ uống',
                code: 'FOOD',
                products: 198,
                status: 'active',
                color: 'from-green-400 to-emerald-400',
                children: [
                  { id: 'cat-3-1', name: 'Thực phẩm chức năng', code: 'FOOD-SUPP', products: 89 },
                  { id: 'cat-3-2', name: 'Đồ uống', code: 'FOOD-DRINK', products: 67 },
                  { id: 'cat-3-3', name: 'Snack & Bánh kẹo', code: 'FOOD-SNACK', products: 42 }
                ]
              },
              {
                id: 'cat-4',
                name: 'Điện tử & Công nghệ',
                code: 'TECH',
                products: 156,
                status: 'active',
                color: 'from-blue-400 to-indigo-400',
                children: [
                  { id: 'cat-4-1', name: 'Điện thoại & Phụ kiện', code: 'TECH-PHONE', products: 78 },
                  { id: 'cat-4-2', name: 'Laptop & Máy tính', code: 'TECH-COMP', products: 45 },
                  { id: 'cat-4-3', name: 'Thiết bị thông minh', code: 'TECH-SMART', products: 33 }
                ]
              }
            ].map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden" data-testid={`category-tree-${category.id}`}>
                {/* Parent Category */}
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}>
                      <FolderOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 border text-xs">
                          {category.code}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{category.products} sản phẩm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200 border">
                      Đang hoạt động
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-edit-${category.id}`}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Child Categories */}
                <div className="p-4 space-y-2">
                  {category.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all duration-200" data-testid={`category-child-${child.id}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Folder className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{child.name}</span>
                            <span className="text-xs text-gray-500">{child.code}</span>
                          </div>
                          <p className="text-xs text-gray-500">{child.products} sản phẩm</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" data-testid={`button-edit-${child.id}`}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Details Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2" data-testid="heading-category-details">
              <List className="w-5 h-5 text-[#ff0086]" />
              Chi tiết danh mục
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục cha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'td-1', code: 'FASHION', name: 'Thời trang & Phụ kiện', type: 'parent', parent: '-', products: 324, status: 'active' },
                  { id: 'td-2', code: 'FASHION-W', name: 'Quần áo nữ', type: 'child', parent: 'Thời trang & Phụ kiện', products: 156, status: 'active' },
                  { id: 'td-3', code: 'BEAUTY', name: 'Làm đẹp & Chăm sóc da', type: 'parent', parent: '-', products: 287, status: 'active' },
                  { id: 'td-4', code: 'BEAUTY-SKIN', name: 'Skincare', type: 'child', parent: 'Làm đẹp & Chăm sóc da', products: 145, status: 'active' },
                  { id: 'td-5', code: 'FOOD', name: 'Thực phẩm & Đồ uống', type: 'parent', parent: '-', products: 198, status: 'active' },
                  { id: 'td-6', code: 'TECH-PHONE', name: 'Điện thoại & Phụ kiện', type: 'child', parent: 'Điện tử & Công nghệ', products: 78, status: 'inactive' }
                ].map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors" data-testid={`table-row-${item.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-medium text-gray-900">{item.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        item.type === 'parent' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200 border'
                          : 'bg-blue-50 text-blue-700 border-blue-200 border'
                      }>
                        {item.type === 'parent' ? 'Danh mục cha' : 'Danh mục con'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.parent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.products}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        item.status === 'active'
                          ? 'bg-green-50 text-green-700 border-green-200 border'
                          : 'bg-gray-50 text-gray-700 border-gray-200 border'
                      } data-testid={`status-${item.id}`}>
                        {item.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" data-testid={`button-view-${item.id}`}>
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${item.id}`}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-delete-${item.id}`}>
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-medium">1-6</span> trong tổng số <span className="font-medium">48</span> danh mục
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" data-testid="button-prev-page">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-[#ff0086] text-white border-[#ff0086] hover:bg-[#e6007a]" data-testid="button-page-1">1</Button>
              <Button variant="outline" size="sm" data-testid="button-page-2">2</Button>
              <Button variant="outline" size="sm" data-testid="button-page-3">3</Button>
              <Button variant="outline" size="sm" data-testid="button-next-page">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Form Example */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-category-form">
            <PlusCircle className="w-5 h-5 text-[#ff0086]" />
            Form tạo/chỉnh sửa danh mục
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mã danh mục *</label>
                <input
                  type="text"
                  placeholder="VD: FASHION-W"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-category-code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên danh mục *</label>
                <input
                  type="text"
                  placeholder="VD: Quần áo nữ"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-category-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loại danh mục *</label>
                <Select>
                  <SelectTrigger className="w-full" data-testid="select-form-category-type">
                    <SelectValue placeholder="Chọn loại danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Danh mục cha</SelectItem>
                    <SelectItem value="child">Danh mục con</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục cha</label>
                <Select>
                  <SelectTrigger className="w-full" data-testid="select-parent-category">
                    <SelectValue placeholder="Chọn danh mục cha (nếu là danh mục con)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Thời trang & Phụ kiện</SelectItem>
                    <SelectItem value="beauty">Làm đẹp & Chăm sóc da</SelectItem>
                    <SelectItem value="food">Thực phẩm & Đồ uống</SelectItem>
                    <SelectItem value="tech">Điện tử & Công nghệ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả danh mục</label>
                <textarea
                  rows={4}
                  placeholder="Nhập mô tả chi tiết về danh mục..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                  data-testid="textarea-category-description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Từ khóa SEO</label>
                <input
                  type="text"
                  placeholder="VD: thời trang nữ, quần áo..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-seo-keywords"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <Select>
                  <SelectTrigger className="w-full" data-testid="select-form-status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm dừng</SelectItem>
                    <SelectItem value="archived">Lưu trữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-category"
                  className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]"
                  data-testid="checkbox-featured"
                />
                <label htmlFor="featured-category" className="text-sm text-gray-700">
                  Đặt làm danh mục nổi bật
                </label>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Button variant="outline" data-testid="button-cancel-form">
              Hủy bỏ
            </Button>
            <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-save-category">
              <Save className="w-4 h-4 mr-2" />
              Lưu danh mục
            </Button>
          </div>
        </div>
      </section>

      {/* #48 Quản lý thương hiệu */}
      <section id="section-48" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-brand-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-brand-management">Quản lý thương hiệu</h2>
            <p className="text-gray-600" data-testid="text-brand-subtitle">Quản lý và theo dõi các thương hiệu đối tác trên nền tảng</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-brands">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Lọc thương hiệu</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-brand">
              <span className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Thêm thương hiệu</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng thương hiệu</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-brands">142</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12 thương hiệu mới
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Đã xác thực</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-verified-brands">98</p>
                  <p className="text-xs text-gray-500 mt-1">68.9% tổng số</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-pending-brands">32</p>
                  <p className="text-xs text-orange-600 mt-1">Cần xem xét</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-products">8,456</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +18% tháng này
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm thương hiệu theo tên, mã hoặc website..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                data-testid="input-search-brands"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full" data-testid="select-brand-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="verified">Đã xác thực</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full" data-testid="select-brand-category">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="food">Thực phẩm</SelectItem>
                <SelectItem value="tech">Công nghệ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[
            {
              id: 'brand-1',
              name: 'Maybelline New York',
              code: 'MAY-001',
              category: 'Làm đẹp',
              products: 456,
              verified: true,
              joinDate: '2024-01-15',
              website: 'maybelline.com.vn',
              color: 'from-pink-400 to-rose-400'
            },
            {
              id: 'brand-2',
              name: 'Uniqlo Vietnam',
              code: 'UNI-002',
              category: 'Thời trang',
              products: 892,
              verified: true,
              joinDate: '2023-12-20',
              website: 'uniqlo.com/vn',
              color: 'from-red-400 to-orange-400'
            },
            {
              id: 'brand-3',
              name: 'L\'Oréal Paris',
              code: 'LOR-003',
              category: 'Làm đẹp',
              products: 578,
              verified: true,
              joinDate: '2024-02-10',
              website: 'loreal-paris.vn',
              color: 'from-purple-400 to-violet-400'
            },
            {
              id: 'brand-4',
              name: 'Innisfree Vietnam',
              code: 'INN-004',
              category: 'Làm đẹp',
              products: 234,
              verified: false,
              joinDate: '2024-03-05',
              website: 'innisfree.vn',
              color: 'from-green-400 to-emerald-400'
            },
            {
              id: 'brand-5',
              name: 'Adidas Vietnam',
              code: 'ADI-005',
              category: 'Thời trang',
              products: 667,
              verified: true,
              joinDate: '2023-11-28',
              website: 'adidas.com.vn',
              color: 'from-blue-400 to-indigo-400'
            },
            {
              id: 'brand-6',
              name: 'The Coffee House',
              code: 'TCH-006',
              category: 'Thực phẩm',
              products: 145,
              verified: false,
              joinDate: '2024-03-18',
              website: 'thecoffeehouse.vn',
              color: 'from-amber-400 to-yellow-400'
            }
          ].map((brand) => (
            <Card key={brand.id} className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300" data-testid={`brand-card-${brand.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${brand.color} rounded-xl flex items-center justify-center`}>
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{brand.name}</h4>
                      <p className="text-xs text-gray-500 font-mono">{brand.code}</p>
                    </div>
                  </div>
                  <Badge className={
                    brand.verified
                      ? 'bg-green-50 text-green-700 border-green-200 border'
                      : 'bg-orange-50 text-orange-700 border-orange-200 border'
                  } data-testid={`status-${brand.id}`}>
                    {brand.verified ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Đã xác thực
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Chờ duyệt
                      </span>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{brand.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{brand.products} sản phẩm</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{brand.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Tham gia {new Date(brand.joinDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-view-${brand.id}`}>
                    <Eye className="w-3 h-3 mr-1" />
                    Xem
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-edit-${brand.id}`}>
                    <Edit className="w-3 h-3 mr-1" />
                    Sửa
                  </Button>
                  <Button variant="outline" size="sm" data-testid={`button-delete-${brand.id}`}>
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">1-6</span> trong tổng số <span className="font-medium">142</span> thương hiệu
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="button-prev-page">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-[#ff0086] text-white border-[#ff0086] hover:bg-[#e6007a]" data-testid="button-page-1">1</Button>
            <Button variant="outline" size="sm" data-testid="button-page-2">2</Button>
            <Button variant="outline" size="sm" data-testid="button-page-3">3</Button>
            <Button variant="outline" size="sm" data-testid="button-page-4">4</Button>
            <Button variant="outline" size="sm" data-testid="button-next-page">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Brand Form Example */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-brand-form">
            <PlusCircle className="w-5 h-5 text-[#ff0086]" />
            Form tạo/chỉnh sửa thương hiệu
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên thương hiệu *</label>
                <input
                  type="text"
                  placeholder="VD: Maybelline New York"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-brand-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mã thương hiệu *</label>
                <input
                  type="text"
                  placeholder="VD: MAY-001"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-brand-code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                <Select>
                  <SelectTrigger className="w-full" data-testid="select-form-category">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Thời trang</SelectItem>
                    <SelectItem value="beauty">Làm đẹp</SelectItem>
                    <SelectItem value="food">Thực phẩm</SelectItem>
                    <SelectItem value="tech">Công nghệ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                    data-testid="input-brand-website"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo thương hiệu</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" size="sm" data-testid="button-upload-logo">
                      <Upload className="w-4 h-4 mr-2" />
                      Tải lên logo
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG tối đa 2MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email liên hệ *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                    data-testid="input-brand-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="0123 456 789"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                    data-testid="input-brand-phone"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả thương hiệu</label>
                <textarea
                  rows={4}
                  placeholder="Nhập mô tả chi tiết về thương hiệu..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors resize-none"
                  data-testid="textarea-brand-description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái xác thực</label>
                <Select>
                  <SelectTrigger className="w-full" data-testid="select-verification-status">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Đã xác thực</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-brand"
                  className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]"
                  data-testid="checkbox-featured-brand"
                />
                <label htmlFor="featured-brand" className="text-sm text-gray-700">
                  Đặt làm thương hiệu nổi bật
                </label>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Button variant="outline" data-testid="button-cancel-brand-form">
              Hủy bỏ
            </Button>
            <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-save-brand">
              <Save className="w-4 h-4 mr-2" />
              Lưu thương hiệu
            </Button>
          </div>
        </div>
      </section>

      {/* #49 Super Admin Dashboard */}
      <section id="section-49" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-super-admin-dashboard">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-super-admin">Super Admin Dashboard</h2>
            <p className="text-gray-600" data-testid="text-super-admin-subtitle">Tổng quan hệ thống và quản lý toàn diện nền tảng</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-refresh-data">
              <span className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Làm mới</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-export-report">
              <span className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Xuất báo cáo</span>
              </span>
            </button>
          </div>
        </div>

        {/* System Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-users">12,458</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +342 người dùng mới
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chiến dịch hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-active-campaigns">1,247</p>
                  <p className="text-xs text-gray-500 mt-1">89 chiến dịch mới</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doanh thu tháng này</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-monthly-revenue">8.4B VNĐ</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +24.5% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tình trạng hệ thống</p>
                  <p className="text-2xl font-bold text-green-600" data-testid="stat-system-status">99.8%</p>
                  <p className="text-xs text-gray-500 mt-1">Uptime 30 ngày</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900" data-testid="heading-revenue-chart">Biểu đồ doanh thu</h3>
                <Select>
                  <SelectTrigger className="w-32" data-testid="select-revenue-period">
                    <SelectValue placeholder="7 ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 ngày</SelectItem>
                    <SelectItem value="30days">30 ngày</SelectItem>
                    <SelectItem value="90days">90 ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[
                  { day: 'T2', revenue: 580 },
                  { day: 'T3', revenue: 720 },
                  { day: 'T4', revenue: 650 },
                  { day: 'T5', revenue: 890 },
                  { day: 'T6', revenue: 1100 },
                  { day: 'T7', revenue: 950 },
                  { day: 'CN', revenue: 780 }
                ]}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0086" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff0086" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#ff0086" strokeWidth={2} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900" data-testid="heading-user-growth">Tăng trưởng người dùng</h3>
                <Select>
                  <SelectTrigger className="w-32" data-testid="select-growth-period">
                    <SelectValue placeholder="7 ngày" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 ngày</SelectItem>
                    <SelectItem value="30days">30 ngày</SelectItem>
                    <SelectItem value="90days">90 ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={[
                  { day: 'T2', users: 42 },
                  { day: 'T3', users: 58 },
                  { day: 'T4', users: 45 },
                  { day: 'T5', users: 67 },
                  { day: 'T6', users: 89 },
                  { day: 'T7', users: 72 },
                  { day: 'CN', users: 54 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Real-time Activity Feed */}
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="heading-activity-feed">
                <Bell className="w-5 h-5 text-[#ff0086]" />
                Hoạt động gần đây
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    type: 'user',
                    message: 'Người dùng mới đăng ký: nguyen.van.a@email.com',
                    time: '2 phút trước',
                    icon: UserPlus,
                    color: 'text-blue-600'
                  },
                  {
                    id: 2,
                    type: 'campaign',
                    message: 'Chiến dịch "Summer Sale 2025" đã được phê duyệt',
                    time: '15 phút trước',
                    icon: CheckCircle,
                    color: 'text-green-600'
                  },
                  {
                    id: 3,
                    type: 'payment',
                    message: 'Thanh toán 45.5M VNĐ từ Brand "L\'Oréal"',
                    time: '32 phút trước',
                    icon: DollarSign,
                    color: 'text-green-600'
                  },
                  {
                    id: 4,
                    type: 'alert',
                    message: 'Cảnh báo: CPU usage cao (85%) trên Server 03',
                    time: '1 giờ trước',
                    icon: AlertTriangle,
                    color: 'text-orange-600'
                  },
                  {
                    id: 5,
                    type: 'brand',
                    message: 'Thương hiệu "Nike Vietnam" yêu cầu xác thực',
                    time: '2 giờ trước',
                    icon: ShoppingBag,
                    color: 'text-purple-600'
                  }
                ].map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" data-testid={`activity-${activity.id}`}>
                    <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health Indicators */}
          <Card className="bg-white border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="heading-system-health">
                <Server className="w-5 h-5 text-[#ff0086]" />
                Tình trạng hệ thống
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'API Server', status: 'online', uptime: '99.9%', response: '45ms' },
                  { name: 'Database', status: 'online', uptime: '99.8%', response: '12ms' },
                  { name: 'CDN', status: 'online', uptime: '100%', response: '8ms' },
                  { name: 'Payment Gateway', status: 'online', uptime: '99.7%', response: '120ms' }
                ].map((service, index) => (
                  <div key={index} className="space-y-2" data-testid={`service-${index}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${service.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-green-200 border">
                        {service.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 ml-4">
                      <span>Uptime: {service.uptime}</span>
                      <span>Response: {service.response}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">CPU Usage</span>
                      <span className="font-medium text-gray-900">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="font-medium text-gray-900">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Storage Usage</span>
                      <span className="font-medium text-gray-900">38%</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Metrics */}
        <Card className="bg-white border-gray-100 mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-platform-metrics">
              <BarChart3 className="w-5 h-5 text-[#ff0086]" />
              Chỉ số nền tảng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">KOC hoạt động</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-active-koc">3,456</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Thương hiệu đối tác</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-partner-brands">142</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Giao dịch thành công</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-transactions">28,945</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Sản phẩm trên nền tảng</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-products">156,789</p>
                  </div>
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tổng lượt xem</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-views">45.2M</p>
                  </div>
                  <Eye className="w-8 h-8 text-pink-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tỷ lệ chuyển đổi</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="metric-conversion">12.8%</p>
                  </div>
                  <Target className="w-8 h-8 text-teal-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-admin-actions">
              <Settings className="w-5 h-5 text-[#ff0086]" />
              Thao tác quản trị
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" data-testid="button-manage-users">
                <Users className="w-6 h-6 text-blue-600" />
                <span>Quản lý người dùng</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" data-testid="button-manage-campaigns">
                <Megaphone className="w-6 h-6 text-purple-600" />
                <span>Quản lý chiến dịch</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" data-testid="button-financial-reports">
                <FileText className="w-6 h-6 text-green-600" />
                <span>Báo cáo tài chính</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" data-testid="button-system-settings">
                <Settings className="w-6 h-6 text-gray-600" />
                <span>Cài đặt hệ thống</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* #50 Quản lý chiến dịch */}
      <section id="section-50" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-campaign-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-campaign-management">Quản lý Chiến dịch</h2>
            <p className="text-gray-600" data-testid="text-campaign-subtitle">Quản lý toàn bộ chiến dịch KOC Marketing</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-campaigns">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Lọc chiến dịch</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-campaign">
              <span className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Tạo chiến dịch</span>
              </span>
            </button>
          </div>
        </div>

        {/* Campaign Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-campaigns">247</p>
                  <p className="text-xs text-gray-500 mt-1">156 hoạt động</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">KOC tham gia</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-koc-participants">1,847</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +145 tuần này
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng ngân sách</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-budget">5.8B VNĐ</p>
                  <p className="text-xs text-gray-500 mt-1">3.2B đã chi</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tỷ lệ hoàn thành</p>
                  <p className="text-2xl font-bold text-green-600" data-testid="stat-completion-rate">87.5%</p>
                  <p className="text-xs text-gray-500 mt-1">216/247 chiến dịch</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border-gray-100 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên chiến dịch, thương hiệu..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                  data-testid="input-search-campaign"
                />
              </div>
              <Select>
                <SelectTrigger data-testid="select-campaign-status">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="recruiting">Tuyển KOC</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="paused">Tạm dừng</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger data-testid="select-campaign-type">
                  <SelectValue placeholder="Loại chiến dịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="review">Review sản phẩm</SelectItem>
                  <SelectItem value="unboxing">Unboxing</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="checkin">Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Table */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-campaigns">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Chiến dịch</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thương hiệu</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">KOC</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ngân sách</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hiệu suất</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: 'Review Son Môi Maybelline SuperStay',
                      brand: 'Maybelline',
                      status: 'active',
                      statusText: 'Đang chạy',
                      statusColor: 'bg-green-100 text-green-700',
                      koc: '89/100',
                      budget: '45M VNĐ',
                      reach: '156K',
                      engagement: '12.3K'
                    },
                    {
                      id: 2,
                      name: 'Unboxing Foundation L\'Oréal Paris',
                      brand: 'L\'Oréal',
                      status: 'recruiting',
                      statusText: 'Tuyển KOC',
                      statusColor: 'bg-blue-100 text-blue-700',
                      koc: '45/80',
                      budget: '38M VNĐ',
                      reach: '98K',
                      engagement: '8.5K'
                    },
                    {
                      id: 3,
                      name: 'Tutorial Makeup Natural Look',
                      brand: 'Innisfree',
                      status: 'active',
                      statusText: 'Đang chạy',
                      statusColor: 'bg-green-100 text-green-700',
                      koc: '67/70',
                      budget: '32M VNĐ',
                      reach: '124K',
                      engagement: '10.2K'
                    },
                    {
                      id: 4,
                      name: 'Check-in Cửa hàng Uniqlo',
                      brand: 'Uniqlo',
                      status: 'completed',
                      statusText: 'Hoàn thành',
                      statusColor: 'bg-gray-100 text-gray-700',
                      koc: '120/120',
                      budget: '28M VNĐ',
                      reach: '89K',
                      engagement: '6.8K'
                    },
                    {
                      id: 5,
                      name: 'Review Skincare Routine Winter',
                      brand: 'Innisfree',
                      status: 'paused',
                      statusText: 'Tạm dừng',
                      statusColor: 'bg-yellow-100 text-yellow-700',
                      koc: '34/60',
                      budget: '25M VNĐ',
                      reach: '45K',
                      engagement: '3.2K'
                    }
                  ].map((campaign) => (
                    <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid={`campaign-row-${campaign.id}`}>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {campaign.brand.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{campaign.brand}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${campaign.statusColor} border-0`}>
                          {campaign.statusText}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{campaign.koc}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.budget}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {campaign.reach}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Heart className="w-3 h-3" />
                            {campaign.engagement}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" data-testid={`button-view-${campaign.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" data-testid={`button-edit-${campaign.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" data-testid={`button-more-${campaign.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-medium">1-5</span> trong <span className="font-medium">247</span> chiến dịch
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="button-prev-page">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white border-[#ff0086]" data-testid="button-page-1">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-2">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-3">
                  3
                </Button>
                <Button variant="outline" size="sm" data-testid="button-next-page">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* #51 Quản lý KOC - Thị trường KOL */}
      <section id="section-51" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-koc-management">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="heading-koc-management">Thị trường KOL</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên KOL"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
              data-testid="input-search-kol"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Ngành hàng</span>
              <Badge className="bg-[#ff0086] text-white hover:bg-[#e6007a] border-0 cursor-pointer" data-testid="chip-category-all">
                Tất cả
              </Badge>
              {[
                'Phụ Kiện Thời Trang',
                'Thời Trang Nữ',
                'Sắc Đẹp',
                'Văn Phòng Phẩm',
                'Mẹ & Bé',
                'Sở thích & Sưu tầm',
                'Túi Ví Nữ',
                'Điện Thoại & Phụ Kiện'
              ].map((category, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 cursor-pointer"
                  data-testid={`chip-category-${idx}`}
                >
                  {category}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="text-gray-600" data-testid="button-expand-categories">
                Mở rộng
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Platform Filters */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Mạng xã hội</span>
              <Badge className="bg-[#ff0086] text-white hover:bg-[#e6007a] border-0 cursor-pointer" data-testid="chip-platform-all">
                Tất cả
              </Badge>
              {[
                { name: 'Shopee Live', icon: <ShoppingBag className="w-3 h-3" /> },
                { name: 'Shopee Video', icon: <Video className="w-3 h-3" /> },
                { name: 'Instagram', icon: <FaInstagram className="w-3 h-3" /> },
                { name: 'Tiktok', icon: <FaTiktok className="w-3 h-3" /> },
                { name: 'Facebook', icon: <FaFacebookF className="w-3 h-3" /> },
                { name: 'X(Twitter)', icon: <Share2 className="w-3 h-3" /> },
                { name: 'YouTube', icon: <FaYoutube className="w-3 h-3" /> }
              ].map((platform, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                  data-testid={`chip-platform-${idx}`}
                >
                  {platform.icon}
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cooperation Filters */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Hợp tác</span>
              <Badge
                variant="outline"
                className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                data-testid="toggle-gold-kol"
              >
                <Sparkles className="w-3 h-3 text-yellow-500" />
                KOL tích vàng
              </Badge>
              <Badge
                variant="outline"
                className="bg-white hover:bg-gray-50 cursor-pointer flex items-center gap-1"
                data-testid="toggle-good-sample"
              >
                <CheckCircle className="w-3 h-3 text-green-500" />
                Tỷ lệ hoàn thành Dự án sản phẩm mẫu miễn phí ở mức tốt
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-4">
            <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-apply-filters">
              Áp dụng
            </Button>
            <Button variant="outline" data-testid="button-reset-filters">
              Đặt Lại
            </Button>
            <Button variant="ghost" className="text-gray-600" data-testid="link-expand-filters">
              Mở Rộng Bộ Lọc
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Table Header with View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900" data-testid="heading-kol-list">Danh sách KOL</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" data-testid="btn-view-grid">
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" data-testid="btn-view-list">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* KOL Table */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-kol">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-user">Tên tài khoản KOL</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-followers">
                      Người theo dõi
                      <ChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-clicks">
                      Lượt nhấp vào
                      <ChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-orders">
                      Đơn hàng
                      <ChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-gmv">
                      GMV(đ)
                      <ChevronDown className="w-3 h-3 inline ml-1" />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-content">Nội dung</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="col-actions">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      name: 'Nghi',
                      username: '@nghi3345',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nghi',
                      platforms: [
                        { icon: <FaInstagram className="w-3 h-3" />, color: 'text-pink-500' },
                        { icon: <FaTiktok className="w-3 h-3" />, color: 'text-gray-900' },
                        { icon: <FaFacebookF className="w-3 h-3" />, color: 'text-blue-600' }
                      ],
                      category: 'Phụ Kiện Thời Trang',
                      categoryBadge: '+5',
                      followers: '663',
                      followerIndicator: 'red',
                      clicks: '5k',
                      orders: '260-300',
                      gmv: '>50k',
                      contentThumbs: 2,
                      audience: 'Nữ, Độ tuổi 23-32'
                    },
                    {
                      id: 2,
                      name: 'Nguyễn thảo trang',
                      username: '@tangnguo0127',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tang',
                      platforms: [
                        { icon: <FaInstagram className="w-3 h-3" />, color: 'text-pink-500' },
                        { icon: <FaTiktok className="w-3 h-3" />, color: 'text-gray-900' },
                        { icon: <FaFacebookF className="w-3 h-3" />, color: 'text-blue-600' },
                        { icon: <FaYoutube className="w-3 h-3" />, color: 'text-red-600' }
                      ],
                      category: 'Phụ Kiện Thời Trang',
                      categoryBadge: '',
                      followers: '1',
                      followerIndicator: 'red',
                      clicks: '<1k',
                      orders: '<10',
                      gmv: '>50k',
                      contentThumbs: 2,
                      audience: 'Nữ, Độ tuổi 23-32'
                    },
                    {
                      id: 3,
                      name: 'Chami',
                      username: '@chami7610',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chami',
                      platforms: [
                        { icon: <FaInstagram className="w-3 h-3" />, color: 'text-pink-500' },
                        { icon: <FaTiktok className="w-3 h-3" />, color: 'text-gray-900' },
                        { icon: <FaFacebookF className="w-3 h-3" />, color: 'text-blue-600' }
                      ],
                      category: 'Phụ Kiện Thời Trang',
                      categoryBadge: '+1',
                      followers: '2k',
                      followerIndicator: 'red',
                      clicks: '<1k',
                      orders: '<10',
                      gmv: '>50k',
                      contentThumbs: 2,
                      audience: 'Nữ, Độ tuổi 23-32'
                    },
                    {
                      id: 4,
                      name: 'Blue Peach',
                      username: '@bluepeach.jewellery',
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blue',
                      platforms: [
                        { icon: <FaInstagram className="w-3 h-3" />, color: 'text-pink-500' },
                        { icon: <FaTiktok className="w-3 h-3" />, color: 'text-gray-900' }
                      ],
                      category: 'Phụ Kiện Thời Trang',
                      categoryBadge: '+2',
                      followers: '402.5k',
                      followerIndicator: 'red',
                      clicks: '8k',
                      orders: '500-1k',
                      gmv: '>50k',
                      contentThumbs: 2,
                      audience: 'Nữ, Độ tuổi 23-32'
                    }
                  ].map((kol) => (
                    <tr key={kol.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid={`row-kol-${kol.id}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{kol.name}</span>
                              {kol.categoryBadge && (
                                <Badge variant="outline" className="text-xs px-1 py-0 h-4 border-gray-300">
                                  {kol.categoryBadge}
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mb-1">{kol.username}</div>
                            <div className="flex items-center gap-1 mb-1">
                              {kol.platforms.map((platform, idx) => (
                                <span key={idx} className={platform.color}>
                                  {platform.icon}
                                </span>
                              ))}
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                              {kol.category}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full bg-${kol.followerIndicator}-500`}></div>
                          <span className="text-sm text-gray-900">{kol.followers}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{kol.clicks}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{kol.orders}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{kol.gmv}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="flex gap-2 mb-1">
                            {Array.from({ length: kol.contentThumbs }).map((_, idx) => (
                              <div
                                key={idx}
                                className="w-12 h-12 bg-gray-200 rounded border border-gray-300"
                                data-testid={`thumb-content-${kol.id}-${idx}`}
                              >
                                <img
                                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${kol.id}-${idx}`}
                                  alt="Content"
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            Người xem: {kol.audience}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            className="bg-[#ff0086] hover:bg-[#e6007a] text-white w-full"
                            data-testid={`btn-collab-${kol.id}`}
                          >
                            Hợp tác
                          </Button>
                          <div className="flex items-center gap-2 justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8"
                              data-testid={`btn-chat-${kol.id}`}
                            >
                              <MessageCircle className="w-4 h-4 text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8"
                              data-testid={`btn-fav-${kol.id}`}
                            >
                              <Star className="w-4 h-4 text-gray-600" />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section #52: Hệ thống xếp hạng KOC */}
      <section id="section-52" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-koc-ranking">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Trophy */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-koc-ranking">
                  Bảng top KOLs
                </CardTitle>
                <p className="text-sm text-gray-600" data-testid="subtitle-koc-ranking">
                  Bảng xếp hạng KOL dựa trên hiệu suất trong thời gian đã chọn
                </p>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-trophy">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Three Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('top-doanh-thu')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'top-doanh-thu'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-top-doanh-thu"
              >
                Top Doanh Thu
              </button>
              <button
                onClick={() => setSelectedTab('tang-truong-nhanh')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'tang-truong-nhanh'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-tang-truong-nhanh"
              >
                Tăng trưởng nhanh
              </button>
              <button
                onClick={() => setSelectedTab('noi-dung-shopee')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'noi-dung-shopee'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-noi-dung-shopee"
              >
                Nổi dụng phổ biến trên Shopee
              </button>
            </div>

            {/* Filter Row 1 - Ngành hàng */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block" data-testid="label-nganh-hang">
                Ngành hàng
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-all"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedCategory('phu-kien')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'phu-kien'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-phu-kien"
                >
                  Phụ Kiện Thời Trang
                </button>
                <button
                  onClick={() => setSelectedCategory('thoi-trang-nu')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'thoi-trang-nu'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-thoi-trang-nu"
                >
                  Thời Trang Nữ
                </button>
                <button
                  onClick={() => setSelectedCategory('sac-dep')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'sac-dep'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-sac-dep"
                >
                  Sắc Đẹp
                </button>
                <button
                  onClick={() => setSelectedCategory('van-phong-pham')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'van-phong-pham'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-van-phong-pham"
                >
                  Văn Phòng Phẩm
                </button>
                <button
                  onClick={() => setSelectedCategory('me-be')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'me-be'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-me-be"
                >
                  Mẹ & Bé
                </button>
                <button
                  onClick={() => setSelectedCategory('so-thich')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'so-thich'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-so-thich"
                >
                  Sở thích & Sưu tầm
                </button>
                <button
                  onClick={() => setSelectedCategory('tui-vi')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'tui-vi'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-tui-vi"
                >
                  Túi Ví Nữ
                </button>
                <button
                  onClick={() => setSelectedCategory('dien-thoai')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'dien-thoai'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-dien-thoai"
                >
                  Điện Thoại & Phụ Kiện
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  data-testid="btn-expand-categories"
                >
                  Mở rộng
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Row 2 - Kênh mạng xã hội */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block" data-testid="label-kenh-mang-xa-hoi">
                Kênh mạng xã hội
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedSocialChannel('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'all'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-all"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('shopee-live')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'shopee-live'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-shopee-live"
                >
                  Shopee Live
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('shopee-video')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'shopee-video'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-shopee-video"
                >
                  Shopee Video
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('facebook')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'facebook'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-facebook"
                >
                  Facebook
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('tiktok')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'tiktok'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-tiktok"
                >
                  Tiktok
                </button>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700" data-testid="label-time-period">Theo Tuần</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200">
                  <span className="text-sm text-gray-900" data-testid="text-date-range">21-09-2025 - 27-09-2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="text-sm text-gray-500" data-testid="text-last-update">
                Lần cập nhật gần nhất: <span className="font-medium text-gray-700">09:06:52 28-09-2025</span>
              </div>
            </div>

            {/* Ranking Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-rank">Xếp hạng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-account">Tên tài khoản KOL</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-orders">Đơn hàng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-gmv">GMV</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-followers">Người theo dõi</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-agency">Agency/MCN</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-actions">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {/* KOL 1: Sam Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-1">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" data-testid="rank-1">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=sam"
                          alt="Sam Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-1">Sam Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-1">@sam.ngo</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-1" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-1" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-1" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-1">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-1">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-1">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-1">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-1">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-1">256.6k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-1">Social Elite</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-1">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-1">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-1">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 2: Võ Hoàng Yến Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-2">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" data-testid="rank-2">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=vohoangyen"
                          alt="Võ Hoàng Yến Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-2"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-2">Võ Hoàng Yến Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-2">@vo.hoangyen</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-2" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-2" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-2" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-2">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-2">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-2">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-2">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-2">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-2">164.4k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-2">Woo!</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-2">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-2">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-2">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 3: Ngô Đức Duy */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-3">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" data-testid="rank-3">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=ngoducduy"
                          alt="Ngô Đức Duy"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-3">Ngô Đức Duy</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-3">@nguyenchannel</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-3" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-3" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-3" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-3">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-3">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-3">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-3">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-3">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-3">213.5k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-3">BeyondK</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-3">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-3">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-3">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 4: Liêu Hà Trinh Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-4">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full" data-testid="rank-4">
                        <span className="text-sm font-bold text-gray-700">4</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=lieuhatrinh"
                          alt="Liêu Hà Trinh Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-4"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-4">Liêu Hà Trinh Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-4">@lieuhatrinh</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-4" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-4" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-4" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-4">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-4">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-4">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-4">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-4">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-4">248.9k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-4">Social Elite</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-4">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-4">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-4">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section #53: Analytics & Báo cáo */}
      <section id="section-53" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-analytics">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with BarChart3 Icon */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-analytics">
                  Analytics & Báo cáo
                </CardTitle>
                <p className="text-sm text-gray-600" data-testid="subtitle-analytics">
                  Theo dõi hiệu suất và phân tích dữ liệu chi tiết
                </p>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-analytics">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Overview Metrics - 4 cards in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Views */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-views">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-views">+12.5%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tổng lượt xem</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-views">2,456,789</p>
              </div>

              {/* Engagement Rate */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-engagement">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-engagement">+2.3%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tỷ lệ tương tác</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-engagement">8.42%</p>
              </div>

              {/* Total Revenue */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-revenue">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-revenue">+18.7%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-revenue">đ456,780,000</p>
              </div>

              {/* Growth Rate */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-growth">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-xs font-medium" data-testid="change-metric-growth">Tháng này</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tốc độ tăng trưởng</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-growth">+24.8%</p>
              </div>
            </div>

            {/* Time Period & Actions */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Date Range Selector */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700" data-testid="text-date-range">01-09-2025 - 30-09-2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* Time Period Dropdown */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-700" data-testid="text-time-period">Theo Tháng</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Export Button */}
              <Button 
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white flex items-center gap-2"
                data-testid="btn-export-report"
              >
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </Button>
            </div>

            {/* Three Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedReportTab('overview')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedReportTab === 'overview'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-overview"
              >
                Tổng quan
              </button>
              <button
                onClick={() => setSelectedReportTab('revenue')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedReportTab === 'revenue'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-revenue"
              >
                Phân tích doanh thu
              </button>
              <button
                onClick={() => setSelectedReportTab('performance')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedReportTab === 'performance'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-performance"
              >
                Hiệu suất KOC
              </button>
            </div>

            {/* Charts Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng hoạt động 7 ngày qua</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4" data-testid="chart-trends">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart
                    data={[
                      { date: '24/9', views: 42000, engagement: 3500 },
                      { date: '25/9', views: 45000, engagement: 3800 },
                      { date: '26/9', views: 48000, engagement: 4000 },
                      { date: '27/9', views: 52000, engagement: 4400 },
                      { date: '28/9', views: 55000, engagement: 4600 },
                      { date: '29/9', views: 58000, engagement: 4900 },
                      { date: '30/9', views: 62000, engagement: 5200 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#ff0086"
                      strokeWidth={2}
                      name="Lượt xem"
                      dot={{ fill: '#ff0086', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Tương tác"
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#ff0086] rounded-full"></div>
                    <span className="text-xs text-gray-600">Lượt xem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Tương tác</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-analytics">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Chỉ số</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Giá trị hiện tại</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">So với tháng trước</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thay đổi</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mục tiêu</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Views */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-views">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-views">Lượt xem</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-views">2,456,789</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-views">2,182,945</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-views">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+12.5%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-views">2,500,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="cell-status-views">
                        Gần đạt
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 2: Clicks */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-clicks">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-clicks">Số click</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-clicks">186,523</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-clicks">145,892</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-clicks">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+27.9%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-clicks">150,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-clicks">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đạt mục tiêu
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 3: Orders */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-orders">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-orders">Đơn hàng</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-orders">12,456</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-orders">10,234</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-orders">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+21.7%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-orders">11,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-orders">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đạt mục tiêu
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 4: Revenue */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-revenue">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-revenue">Doanh thu</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-revenue">đ456,780,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-revenue">đ384,920,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-revenue">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+18.7%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-revenue">đ500,000,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="cell-status-revenue">
                        Gần đạt
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 5: ROI */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-roi">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-roi">ROI</span>
                        <Info className="w-3 h-3 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-roi">245%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-roi">312%</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-red-600" data-testid="cell-change-roi">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">-21.5%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-roi">300%</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="cell-status-roi">
                        <AlertCircle className="w-3 h-3 mr-1 inline" />
                        Cần cải thiện
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section #54: Quản lý tài chính */}
      <section id="section-54" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-financial">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Wallet Icon */}
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-financial">
                  Quản lý tài chính
                </CardTitle>
                <p className="text-sm text-gray-600" data-testid="subtitle-financial">
                  Theo dõi doanh thu, chi phí và các giao dịch tài chính
                </p>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-financial">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Financial Overview Metrics - 4 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Revenue */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-total-revenue">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-total-revenue">+15.3%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-total-revenue">đ856,420,000</p>
              </div>

              {/* Total Expenses */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-total-expenses">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-total-expenses">+8.2%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Tổng chi phí</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-total-expenses">đ324,180,000</p>
              </div>

              {/* Net Profit */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-net-profit">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-net-profit">+22.8%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Lợi nhuận ròng</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-net-profit">đ532,240,000</p>
              </div>

              {/* Outstanding Balance */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all" data-testid="card-metric-outstanding">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium" data-testid="change-metric-outstanding">12 chờ</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Công nợ chưa thanh toán</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="value-metric-outstanding">đ128,560,000</p>
              </div>
            </div>

            {/* Time Period & Actions */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Date Range Selector */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700" data-testid="text-date-range-financial">01-09-2025 - 30-09-2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* Time Period Dropdown */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-700" data-testid="text-time-period-financial">Theo Tháng</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* Filter Button */}
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  data-testid="btn-filter-financial"
                >
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </Button>
              </div>

              {/* Export Button */}
              <Button 
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white flex items-center gap-2"
                data-testid="btn-export-financial"
              >
                <Download className="w-4 h-4" />
                Xuất báo cáo tài chính
              </Button>
            </div>

            {/* Three Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedFinancialTab('overview')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedFinancialTab === 'overview'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-financial-overview"
              >
                Tổng quan
              </button>
              <button
                onClick={() => setSelectedFinancialTab('income')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedFinancialTab === 'income'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-financial-income"
              >
                Thu nhập
              </button>
              <button
                onClick={() => setSelectedFinancialTab('expenses')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedFinancialTab === 'expenses'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-financial-expenses"
              >
                Chi phí
              </button>
            </div>

            {/* Financial Chart */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ doanh thu và chi phí</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4" data-testid="chart-financial">
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart
                    data={[
                      { month: 'T3', revenue: 680000000, expenses: 280000000 },
                      { month: 'T4', revenue: 720000000, expenses: 295000000 },
                      { month: 'T5', revenue: 750000000, expenses: 305000000 },
                      { month: 'T6', revenue: 790000000, expenses: 310000000 },
                      { month: 'T7', revenue: 820000000, expenses: 318000000 },
                      { month: 'T8', revenue: 840000000, expenses: 320000000 },
                      { month: 'T9', revenue: 856420000, expenses: 324180000 }
                    ]}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => `đ${value.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="Doanh thu"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExpenses)"
                      name="Chi phí"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Doanh thu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Chi phí</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-transactions">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ngày</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mô tả</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Loại</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Số tiền</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Transaction 1: Commission Payment */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-1">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-1">28/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-1">
                          Hoa hồng chiến dịch #CH-2025-089
                        </span>
                        <span className="text-xs text-gray-500">KOC: Sam Official</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-type-1">
                        Thu nhập
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-green-600" data-testid="cell-amount-1">
                        +đ45,800,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-1">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đã thanh toán
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-1">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Transaction 2: Marketing Expense */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-2">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-2">27/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-2">
                          Chi phí quảng cáo TikTok
                        </span>
                        <span className="text-xs text-gray-500">Chiến dịch: Beauty Fall 2025</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="cell-type-2">
                        Chi phí
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-red-600" data-testid="cell-amount-2">
                        -đ12,500,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-2">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đã thanh toán
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-2">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Transaction 3: Affiliate Payment */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-3">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-3">25/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-3">
                          Thanh toán affiliate tháng 8
                        </span>
                        <span className="text-xs text-gray-500">256 đơn hàng thành công</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-type-3">
                        Thu nhập
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-green-600" data-testid="cell-amount-3">
                        +đ89,200,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="cell-status-3">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        Đang xử lý
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-3">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Transaction 4: Platform Fee */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-4">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-4">24/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-4">
                          Phí dịch vụ nền tảng
                        </span>
                        <span className="text-xs text-gray-500">Tháng 9/2025</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="cell-type-4">
                        Chi phí
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-red-600" data-testid="cell-amount-4">
                        -đ8,900,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-4">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đã thanh toán
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-4">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Transaction 5: Brand Partnership */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-5">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-5">22/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-5">
                          Hợp đồng thương hiệu L'Oréal
                        </span>
                        <span className="text-xs text-gray-500">Hợp tác quý 4/2025</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-type-5">
                        Thu nhập
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-green-600" data-testid="cell-amount-5">
                        +đ156,000,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100" data-testid="cell-status-5">
                        <AlertTriangle className="w-3 h-3 mr-1 inline" />
                        Chờ xác nhận
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-5">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Transaction 6: KOC Payment */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-transaction-6">
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-date-6">20/09/2025</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-desc-6">
                          Thanh toán KOC Võ Hoàng Yến
                        </span>
                        <span className="text-xs text-gray-500">Chiến dịch #CH-2025-075</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="cell-type-6">
                        Chi phí
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-red-600" data-testid="cell-amount-6">
                        -đ32,400,000
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-6">
                        <CheckCircle className="w-3 h-3 mr-1 inline" />
                        Đã thanh toán
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="text-xs" data-testid="btn-view-6">
                          Chi tiết
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-6</span> trong tổng số <span className="font-semibold">48</span> giao dịch
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="btn-prev-page">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]" data-testid="btn-page-1">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-2">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-3">
                  3
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-next-page">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section #55: Cài đặt hệ thống */}
      <section id="section-55" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-system-settings">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Settings Icon */}
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-system-settings">Cài đặt hệ thống</h2>
                  <p className="text-gray-600" data-testid="subtitle-system-settings">Quản lý cấu hình và tùy chỉnh hệ thống nền tảng</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center" data-testid="icon-system-settings">
                <Settings className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Action Buttons - MANDATORY 2-button layout */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-testid="btn-reset-settings">
                  <RotateCcw className="w-4 h-4" />
                  <span>Đặt lại mặc định</span>
                </button>
                <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-testid="btn-save-settings">
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedSettingsTab('general')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'general'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-general"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Cài đặt chung</span>
                  </div>
                  {selectedSettingsTab === 'general' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('security')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'security'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-security"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Bảo mật</span>
                  </div>
                  {selectedSettingsTab === 'security' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('notifications')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'notifications'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-notifications"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Thông báo</span>
                  </div>
                  {selectedSettingsTab === 'notifications' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('integrations')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'integrations'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-integrations"
                >
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4" />
                    <span>Tích hợp</span>
                  </div>
                  {selectedSettingsTab === 'integrations' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
              </div>
            </div>

            {/* General Settings Tab */}
            {selectedSettingsTab === 'general' && (
              <div className="space-y-6" data-testid="tab-content-general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Platform Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      Tên nền tảng
                    </label>
                    <input
                      type="text"
                      defaultValue="IKK Platform"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                      data-testid="input-platform-name"
                    />
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      Ngôn ngữ mặc định
                    </label>
                    <Select defaultValue="vi">
                      <SelectTrigger className="w-full" data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ko">한국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      múi giờ
                    </label>
                    <Select defaultValue="asia-ho-chi-minh">
                      <SelectTrigger className="w-full" data-testid="select-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-ho-chi-minh">Hồ Chí Minh (GMT+7)</SelectItem>
                        <SelectItem value="asia-bangkok">Bangkok (GMT+7)</SelectItem>
                        <SelectItem value="asia-seoul">Seoul (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Format */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      Định dạng ngày tháng
                    </label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger className="w-full" data-testid="select-date-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      Đơn vị tiền tệ
                    </label>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="w-full" data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND (đ)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="krw">KRW (₩)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Max File Upload Size */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-gray-500" />
                      Kích thước file tối đa
                    </label>
                    <Select defaultValue="10mb">
                      <SelectTrigger className="w-full" data-testid="select-file-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5mb">5 MB</SelectItem>
                        <SelectItem value="10mb">10 MB</SelectItem>
                        <SelectItem value="25mb">25 MB</SelectItem>
                        <SelectItem value="50mb">50 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Chế độ bảo trì</h4>
                        <p className="text-sm text-gray-600 mt-1">Tạm dừng nền tảng để thực hiện bảo trì và nâng cấp hệ thống</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-maintenance" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings Tab */}
            {selectedSettingsTab === 'security' && (
              <div className="space-y-6" data-testid="tab-content-security">
                {/* Two-Factor Authentication */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Xác thực hai yếu tố (2FA)</h4>
                        <p className="text-sm text-gray-600 mt-1">Bảo vệ tài khoản bằng mã xác thực bổ sung khi đăng nhập</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-2fa" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>

                {/* Password Policy */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    Chính sách mật khẩu
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Độ dài tối thiểu</label>
                      <Select defaultValue="8">
                        <SelectTrigger className="w-full" data-testid="select-password-length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 ký tự</SelectItem>
                          <SelectItem value="8">8 ký tự</SelectItem>
                          <SelectItem value="12">12 ký tự</SelectItem>
                          <SelectItem value="16">16 ký tự</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Thời gian hết hạn</label>
                      <Select defaultValue="90">
                        <SelectTrigger className="w-full" data-testid="select-password-expiry">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 ngày</SelectItem>
                          <SelectItem value="60">60 ngày</SelectItem>
                          <SelectItem value="90">90 ngày</SelectItem>
                          <SelectItem value="never">Không hết hạn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Thời gian timeout phiên làm việc
                  </label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full" data-testid="select-session-timeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="60">1 giờ</SelectItem>
                      <SelectItem value="120">2 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IP Whitelist */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Server className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Whitelist IP</h4>
                        <p className="text-sm text-gray-600 mt-1">Chỉ cho phép truy cập từ các địa chỉ IP đã được phê duyệt</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-ip-whitelist" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings Tab */}
            {selectedSettingsTab === 'notifications' && (
              <div className="space-y-6" data-testid="tab-content-notifications">
                {/* Email Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo Email</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo quan trọng qua email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-email-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-campaign" />
                      Chiến dịch mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-koc" />
                      Hoạt động KOC
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-report" />
                      Báo cáo hàng tuần
                    </label>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <PhoneCall className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo SMS</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo khẩn cấp qua tin nhắn SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-sms-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo đẩy</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo realtime trên thiết bị di động</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-push-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-message" />
                      Tin nhắn mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-order" />
                      Đơn hàng mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-update" />
                      Cập nhật hệ thống
                    </label>
                  </div>
                </div>

                {/* Notification Frequency */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    Tần suất gửi thông báo
                  </label>
                  <Select defaultValue="realtime">
                    <SelectTrigger className="w-full" data-testid="select-notif-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Realtime</SelectItem>
                      <SelectItem value="hourly">Mỗi giờ</SelectItem>
                      <SelectItem value="daily">Mỗi ngày</SelectItem>
                      <SelectItem value="weekly">Mỗi tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Integration Settings Tab */}
            {selectedSettingsTab === 'integrations' && (
              <div className="space-y-6" data-testid="tab-content-integrations">
                {/* API Configuration */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Code className="w-4 h-4 text-gray-500" />
                    Cấu hình API
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">API Key</p>
                          <p className="text-xs text-gray-500 mt-1 font-mono">ikk_live_********************************</p>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-regenerate-api">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Rate Limit</label>
                      <Select defaultValue="1000">
                        <SelectTrigger className="w-full" data-testid="select-rate-limit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 requests/phút</SelectItem>
                          <SelectItem value="500">500 requests/phút</SelectItem>
                          <SelectItem value="1000">1000 requests/phút</SelectItem>
                          <SelectItem value="unlimited">Không giới hạn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Third-party Integrations */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-gray-500" />
                    Tích hợp bên thứ ba
                  </h4>
                  <div className="space-y-3">
                    {/* TikTok */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                            <FaTiktok className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">TikTok Marketing API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-tiktok">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <FaInstagram className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Instagram Graph API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-instagram">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                            <FaYoutube className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">YouTube Data API</p>
                            <Badge className="mt-1 bg-gray-100 text-gray-700 hover:bg-gray-100">Chưa kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-connect-youtube">
                          <Link2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                            <FaFacebookF className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Facebook Marketing API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-facebook">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Webhook Configuration */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-gray-500" />
                    Webhook
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                      <input
                        type="url"
                        defaultValue="https://api.ikk.vn/webhook"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                        data-testid="input-webhook-url"
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                        <p className="text-xs text-blue-700">Webhook sẽ nhận thông báo khi có sự kiện: chiến dịch mới, đơn hàng mới, thanh toán thành công</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Section #56: Quản lý người dùng */}
      <section id="section-56" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-user-management">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Users Icon */}
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-user-management">Quản lý người dùng</h2>
                  <p className="text-gray-600" data-testid="subtitle-user-management">Quản lý tài khoản, phân quyền và hoạt động người dùng</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center" data-testid="icon-user-management">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-total-users">Tổng người dùng</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-total-users">12,458</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <ArrowUp className="w-3 h-3" />
                        <span>+12.5% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-active-users">Đang hoạt động</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-active-users">9,842</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <ArrowUp className="w-3 h-3" />
                        <span>+8.3% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New This Month */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-new-users">Mới tháng này</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-new-users">1,356</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <ArrowUp className="w-3 h-3" />
                        <span>+18.2% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blocked Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-blocked-users">Bị chặn</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-blocked-users">124</p>
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <TrendingDownIcon className="w-3 h-3" />
                        <span>-5.1% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <UserX className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                    data-testid="input-search-users"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[150px]" data-testid="select-role-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="koc">KOC</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[150px]" data-testid="select-status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="blocked">Bị chặn</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2" data-testid="btn-filter-users">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </Button>
                <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2" data-testid="btn-add-user">
                  <UserPlus className="w-4 h-4" />
                  Thêm người dùng
                </Button>
              </div>
            </div>

            {/* User Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-select-all" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Người dùng</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vai trò</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày tham gia</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Hoạt động cuối</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* User 1 - Admin */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-1">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            NV
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-1">Nguyễn Văn An</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-1">nguyenvanan@ikk.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100" data-testid="badge-role-1">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">15/01/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">5 phút trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-1">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-1">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 2 - KOC */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-2">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            TL
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-2">Trần Thị Lan</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-2">tranthilan@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100" data-testid="badge-role-2">
                          <Star className="w-3 h-3 mr-1" />
                          KOC
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-2">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">28/02/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">2 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-2">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-2">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 3 - Brand */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-3">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            LV
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-3">Lê Văn Minh</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-3">levanminh@brand.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100" data-testid="badge-role-3">
                          <Briefcase className="w-3 h-3 mr-1" />
                          Brand
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-3">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">10/03/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">1 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-3">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-3">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-3">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 4 - User (Inactive) */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-4">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            PH
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-4">Phạm Thị Hoa</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-4">phamthihoa@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-4">
                          <User className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="badge-status-4">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Không hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">05/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">15 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-4">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-4">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-4">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 5 - KOC */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-5">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            ĐQ
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-5">Đỗ Quang Huy</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-5">doquanghuy@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100" data-testid="badge-role-5">
                          <Star className="w-3 h-3 mr-1" />
                          KOC
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-5">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">18/03/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">30 phút trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-5">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-5">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-5">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 6 - User (Blocked) */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-6">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            HM
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-6">Hoàng Văn Nam</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-6">hoangvannam@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-6">
                          <User className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="badge-status-6">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Bị chặn
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">22/02/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">7 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-6">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-6">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-6">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 7 - Brand */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-7">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            VT
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-7">Vũ Thị Trang</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-7">vuthitrang@brand.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100" data-testid="badge-role-7">
                          <Briefcase className="w-3 h-3 mr-1" />
                          Brand
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-7">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">08/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">3 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-7">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-7">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-7">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 8 - User */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-8">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            BK
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-8">Bùi Khánh Linh</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-8">buikhanhlinh@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-8">
                          <User className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-8">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">12/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">1 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-8">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-8</span> trong tổng số <span className="font-semibold">12,458</span> người dùng
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="btn-prev-page">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]" data-testid="btn-page-1">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-2">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-3">
                  3
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-next-page">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section #57: Quản lý chiến dịch - Admin Template */}
      <section id="section-57" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-57-campaign-admin">
        <Card className="shadow-sm border border-gray-100">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="heading-57">57. Quản lý chiến dịch</h2>
                  <p className="text-sm text-gray-600">Quản lý toàn bộ chiến dịch marketing, theo dõi tiến độ và phân tích hiệu suất</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2" data-testid="button-export-campaigns">
                  <Download className="w-4 h-4" />
                  Xuất dữ liệu
                </Button>
                <Button 
                  className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2"
                  onClick={() => setShowCampaignForm(!showCampaignForm)}
                  data-testid="button-create-campaign-57"
                >
                  <Plus className="w-4 h-4" />
                  Tạo chiến dịch mới
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-blue-500 text-white hover:bg-blue-500">Tổng</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-total-campaigns-57">348</p>
                <p className="text-sm text-gray-600">Tổng chiến dịch</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +24 chiến dịch mới tháng này
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-500">Active</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-active-campaigns-57">156</p>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
                <p className="text-xs text-green-600 mt-2">89 chiến dịch đang tuyển KOC</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-purple-500 text-white hover:bg-purple-500">KOC</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-koc-joined-57">2,847</p>
                <p className="text-sm text-gray-600">KOC tham gia</p>
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +342 KOC tuần này
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-orange-500 text-white hover:bg-orange-500">Budget</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-total-budget-57">12.4B</p>
                <p className="text-sm text-gray-600">Tổng ngân sách (VNĐ)</p>
                <p className="text-xs text-gray-600 mt-2">8.7B đã chi tiêu (70%)</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex items-center gap-1 overflow-x-auto">
                {[
                  { key: 'all', label: 'Tất cả', count: 348 },
                  { key: 'active', label: 'Đang chạy', count: 156 },
                  { key: 'draft', label: 'Nháp', count: 42 },
                  { key: 'completed', label: 'Hoàn thành', count: 128 },
                  { key: 'paused', label: 'Tạm dừng', count: 22 }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCampaignTab(tab.key as any)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      campaignTab === tab.key
                        ? 'border-[#ff0086] text-[#ff0086]'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    data-testid={`tab-${tab.key}`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên chiến dịch, mã, thương hiệu..."
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] text-sm"
                      data-testid="input-search-campaign-57"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-category-57">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="beauty">Làm đẹp</SelectItem>
                      <SelectItem value="fashion">Thời trang</SelectItem>
                      <SelectItem value="food">Ẩm thực</SelectItem>
                      <SelectItem value="tech">Công nghệ</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-platform-57">
                      <SelectValue placeholder="Nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-date-range-57">
                      <SelectValue placeholder="Thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 ngày qua</SelectItem>
                      <SelectItem value="30days">30 ngày qua</SelectItem>
                      <SelectItem value="90days">90 ngày qua</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1">
                  <Button variant="outline" className="w-full" data-testid="button-reset-filter-57">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]"
                  data-testid="checkbox-select-all-57"
                />
                <span className="text-sm text-gray-600">Chọn tất cả</span>
                <div className="h-4 w-px bg-gray-300"></div>
                <Button variant="ghost" size="sm" className="text-sm" data-testid="button-bulk-activate">
                  <Play className="w-4 h-4 mr-1" />
                  Kích hoạt
                </Button>
                <Button variant="ghost" size="sm" className="text-sm" data-testid="button-bulk-pause">
                  <Pause className="w-4 h-4 mr-1" />
                  Tạm dừng
                </Button>
                <Button variant="ghost" size="sm" className="text-sm text-red-600" data-testid="button-bulk-delete">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-10</span> trong <span className="font-semibold">156</span> chiến dịch
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-campaigns-57">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-12 px-4 py-3">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Chiến dịch</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Thương hiệu</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Tiến độ</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">KOC</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Ngân sách</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Performance</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[
                      {
                        id: 'CPG-001',
                        name: 'Review Son Môi Maybelline SuperStay Matte Ink',
                        brand: 'Maybelline New York',
                        brandLogo: 'M',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 75,
                        kocJoined: 89,
                        kocTarget: 100,
                        budget: '85,000,000',
                        spent: '63,750,000',
                        reach: '245K',
                        engagement: '18.5K',
                        conversion: '4.2%'
                      },
                      {
                        id: 'CPG-002',
                        name: 'Unboxing & Tutorial Kem Nền L\'Oréal Paris Infallible',
                        brand: 'L\'Oréal Paris',
                        brandLogo: 'L',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 60,
                        kocJoined: 72,
                        kocTarget: 120,
                        budget: '120,000,000',
                        spent: '72,000,000',
                        reach: '189K',
                        engagement: '14.2K',
                        conversion: '3.8%'
                      },
                      {
                        id: 'CPG-003',
                        name: 'Trải nghiệm Serum Dưỡng Da The Ordinary Niacinamide',
                        brand: 'The Ordinary',
                        brandLogo: 'TO',
                        status: 'recruiting',
                        statusText: 'Tuyển KOC',
                        statusColor: 'bg-blue-100 text-blue-700',
                        progress: 35,
                        kocJoined: 42,
                        kocTarget: 80,
                        budget: '65,000,000',
                        spent: '0',
                        reach: '0',
                        engagement: '0',
                        conversion: '0%'
                      },
                      {
                        id: 'CPG-004',
                        name: 'Review Combo Skincare Cocoon Vietnam',
                        brand: 'Cocoon Vietnam',
                        brandLogo: 'CV',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 90,
                        kocJoined: 95,
                        kocTarget: 100,
                        budget: '95,000,000',
                        spent: '85,500,000',
                        reach: '312K',
                        engagement: '28.4K',
                        conversion: '5.1%'
                      },
                      {
                        id: 'CPG-005',
                        name: 'Makeup Tutorial với Bảng Phấn Mắt Focallure',
                        brand: 'Focallure',
                        brandLogo: 'F',
                        status: 'completed',
                        statusText: 'Hoàn thành',
                        statusColor: 'bg-gray-100 text-gray-700',
                        progress: 100,
                        kocJoined: 60,
                        kocTarget: 60,
                        budget: '48,000,000',
                        spent: '48,000,000',
                        reach: '178K',
                        engagement: '15.8K',
                        conversion: '4.5%'
                      },
                      {
                        id: 'CPG-006',
                        name: 'Check-in Spa & Facial Treatment Mây Spa',
                        brand: 'Mây Spa',
                        brandLogo: 'MS',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 55,
                        kocJoined: 33,
                        kocTarget: 50,
                        budget: '75,000,000',
                        spent: '41,250,000',
                        reach: '156K',
                        engagement: '12.1K',
                        conversion: '3.6%'
                      },
                      {
                        id: 'CPG-007',
                        name: 'Review Nước Hoa Chanel N°5 Limited Edition',
                        brand: 'Chanel',
                        brandLogo: 'C',
                        status: 'paused',
                        statusText: 'Tạm dừng',
                        statusColor: 'bg-yellow-100 text-yellow-700',
                        progress: 25,
                        kocJoined: 15,
                        kocTarget: 40,
                        budget: '150,000,000',
                        spent: '37,500,000',
                        reach: '89K',
                        engagement: '6.2K',
                        conversion: '2.8%'
                      },
                      {
                        id: 'CPG-008',
                        name: 'Thử Thách 7 Ngày Với Sữa Rửa Mặt CeraVe',
                        brand: 'CeraVe',
                        brandLogo: 'Ce',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 45,
                        kocJoined: 54,
                        kocTarget: 90,
                        budget: '72,000,000',
                        spent: '32,400,000',
                        reach: '198K',
                        engagement: '16.7K',
                        conversion: '4.0%'
                      }
                    ].map((campaign, idx) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 transition-colors" data-testid={`row-campaign-${idx + 1}`}>
                        <td className="px-4 py-4">
                          <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">{campaign.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {campaign.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{campaign.brandLogo}</span>
                            </div>
                            <span className="text-sm text-gray-900">{campaign.brand}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={campaign.statusColor}>
                            {campaign.statusText}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-32">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-2" />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{campaign.kocJoined}/{campaign.kocTarget}</p>
                            <p className="text-xs text-gray-500">KOC tham gia</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{parseInt(campaign.budget).toLocaleString()}</p>
                            <p className="text-xs text-gray-500">
                              Đã chi: {parseInt(campaign.spent).toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Eye className="w-3 h-3 text-blue-600" />
                              <span className="text-gray-900">{campaign.reach}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Heart className="w-3 h-3 text-pink-600" />
                              <span className="text-gray-900">{campaign.engagement}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <TrendingUp className="w-3 h-3 text-green-600" />
                              <span className="text-gray-900">{campaign.conversion}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-view-${idx + 1}`}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-edit-${idx + 1}`}>
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-more-${idx + 1}`}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Hiệu suất chiến dịch</h3>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="7 ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 ngày</SelectItem>
                      <SelectItem value="30days">30 ngày</SelectItem>
                      <SelectItem value="90days">90 ngày</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { day: 'T2', reach: 45, engagement: 12 },
                      { day: 'T3', reach: 52, engagement: 15 },
                      { day: 'T4', reach: 48, engagement: 13 },
                      { day: 'T5', reach: 61, engagement: 18 },
                      { day: 'T6', reach: 55, engagement: 16 },
                      { day: 'T7', reach: 67, engagement: 21 },
                      { day: 'CN', reach: 72, engagement: 24 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="reach" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" />
                      <Area type="monotone" dataKey="engagement" stackId="1" stroke="#ff0086" fill="#fbb6ce" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top thương hiệu</h3>
                <div className="space-y-3">
                  {[
                    { brand: 'Maybelline', campaigns: 24, budget: '2.1B', color: 'from-pink-500 to-rose-500' },
                    { brand: 'L\'Oréal Paris', campaigns: 18, budget: '1.8B', color: 'from-purple-500 to-indigo-500' },
                    { brand: 'Cocoon Vietnam', campaigns: 15, budget: '1.2B', color: 'from-green-500 to-emerald-500' },
                    { brand: 'The Ordinary', campaigns: 12, budget: '980M', color: 'from-blue-500 to-cyan-500' },
                    { brand: 'CeraVe', campaigns: 10, budget: '750M', color: 'from-orange-500 to-amber-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
                          <p className="text-xs text-gray-600">{item.campaigns} chiến dịch</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{item.budget}</p>
                        <p className="text-xs text-gray-500">VNĐ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-10</span> trong tổng số <span className="font-semibold">156</span> chiến dịch
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="button-prev-page-57">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]" data-testid="button-page-1-57">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-2-57">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-3-57">
                  3
                </Button>
                <span className="px-2 text-gray-500">...</span>
                <Button variant="outline" size="sm" data-testid="button-page-16-57">
                  16
                </Button>
                <Button variant="outline" size="sm" data-testid="button-next-page-57">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Campaign Form Modal */}
            {showCampaignForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCampaignForm(false)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Tạo chiến dịch mới</h3>
                        <p className="text-sm text-gray-600">Điền thông tin để tạo chiến dịch marketing</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowCampaignForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#ff0086]" />
                        Thông tin cơ bản
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tên chiến dịch</label>
                          <input
                            type="text"
                            placeholder="Nhập tên chiến dịch..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-campaign-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
                          <Select>
                            <SelectTrigger data-testid="select-brand">
                              <SelectValue placeholder="Chọn thương hiệu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maybelline">Maybelline</SelectItem>
                              <SelectItem value="loreal">L'Oréal Paris</SelectItem>
                              <SelectItem value="cocoon">Cocoon Vietnam</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                          <Select>
                            <SelectTrigger data-testid="select-category-form">
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beauty">Làm đẹp</SelectItem>
                              <SelectItem value="fashion">Thời trang</SelectItem>
                              <SelectItem value="food">Ẩm thực</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chiến dịch</label>
                          <textarea
                            rows={4}
                            placeholder="Nhập mô tả chi tiết về chiến dịch..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] resize-none"
                            data-testid="textarea-campaign-description"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#ff0086]" />
                        Chi tiết chiến dịch
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng KOC</label>
                          <input
                            type="number"
                            placeholder="Nhập số lượng..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-koc-count"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngân sách (VNĐ)</label>
                          <input
                            type="text"
                            placeholder="Nhập ngân sách..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-budget"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-start-date"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-end-date"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nền tảng</label>
                          <div className="flex flex-wrap gap-3">
                            {[
                              { name: 'TikTok', icon: FaTiktok, color: 'bg-black' },
                              { name: 'Instagram', icon: FaInstagram, color: 'bg-pink-500' },
                              { name: 'YouTube', icon: FaYoutube, color: 'bg-red-500' },
                              { name: 'Facebook', icon: FaFacebookF, color: 'bg-blue-600' }
                            ].map((platform) => (
                              <label key={platform.name} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-[#ff0086] cursor-pointer transition-colors">
                                <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                                <platform.icon className={`w-4 h-4 text-white ${platform.color} p-0.5 rounded`} />
                                <span className="text-sm text-gray-700">{platform.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCampaignForm(false)}
                        data-testid="button-cancel-form"
                      >
                        Hủy bỏ
                      </Button>
                      <Button variant="outline" data-testid="button-save-draft">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button 
                        className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                        data-testid="button-create-campaign-submit"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Tạo chiến dịch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Section #58: Thêm chiến dịch - Create Campaign Template */}
      <section id="section-58" className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-58-create-campaign">
        <Card className="shadow-sm border border-gray-100">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="heading-58">58. Thêm chiến dịch</h2>
                  <p className="text-sm text-gray-600 mb-2">Thiết lập và cấu hình chiến dịch marketing mới cho thương hiệu</p>
                  <Badge className="bg-[#ff0086] text-white hover:bg-[#ff0086]">
                    {Math.round((completedSections.length / 6) * 100)}% hoàn thành
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2" data-testid="button-save-draft-58">
                  <Save className="w-4 h-4" />
                  Lưu nháp
                </Button>
                <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2" data-testid="button-publish-58">
                  <Send className="w-4 h-4" />
                  Xuất bản
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Progress Sidebar */}
              <div className="xl:col-span-1">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff0086]" />
                    Tiến trình
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-[#ff0086] to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSections.length / 6) * 100}%` }}
                    />
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'basic', title: 'Thông tin cơ bản', icon: Target, color: 'bg-[#ff0086]' },
                      { id: 'target', title: 'Đối tượng mục tiêu', icon: Users, color: 'bg-blue-500' },
                      { id: 'content', title: 'Yêu cầu nội dung', icon: Video, color: 'bg-purple-500' },
                      { id: 'budget', title: 'Ngân sách & Thưởng', icon: DollarSign, color: 'bg-green-500' },
                      { id: 'timeline', title: 'Thời gian', icon: Calendar, color: 'bg-orange-500' },
                      { id: 'settings', title: 'Cài đặt', icon: Settings, color: 'bg-gray-500' }
                    ].map((section) => {
                      const isCompleted = completedSections.includes(section.id);
                      const SectionIcon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            if (!isCompleted) {
                              setCompletedSections(prev => [...prev, section.id]);
                            } else {
                              setCompletedSections(prev => prev.filter(s => s !== section.id));
                            }
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                          data-testid={`section-progress-${section.id}`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted ? section.color : 'bg-gray-200'
                          }`}>
                            <SectionIcon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className={`text-xs font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                              {section.title}
                            </div>
                          </div>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main Form Content */}
              <div className="xl:col-span-3 space-y-6">
                {/* Basic Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#ff0086] rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Thông tin cơ bản</h3>
                      <p className="text-sm text-gray-600">Chi tiết chiến dịch và thương hiệu</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề chiến dịch</label>
                      <input
                        type="text"
                        placeholder="VD: Review son môi Maybelline SuperStay Matte Ink"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-title-58"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết</label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả chi tiết về sản phẩm, yêu cầu review, điểm nổi bật cần nhấn mạnh..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] resize-none"
                        data-testid="textarea-description-58"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                        <Select>
                          <SelectTrigger data-testid="select-category-58">
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beauty">Làm đẹp</SelectItem>
                            <SelectItem value="fashion">Thời trang</SelectItem>
                            <SelectItem value="food">Đồ ăn, thức uống</SelectItem>
                            <SelectItem value="tech">Công nghệ</SelectItem>
                            <SelectItem value="health">Sức khỏe</SelectItem>
                            <SelectItem value="travel">Du lịch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
                        <input
                          type="text"
                          placeholder="Tên thương hiệu"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-brand-58"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Loại chiến dịch</label>
                        <Select>
                          <SelectTrigger data-testid="select-campaign-type-58">
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="review">Review sản phẩm</SelectItem>
                            <SelectItem value="unboxing">Unboxing</SelectItem>
                            <SelectItem value="tutorial">Tutorial/Hướng dẫn</SelectItem>
                            <SelectItem value="checkin">Check-in địa điểm</SelectItem>
                            <SelectItem value="livestream">Livestream</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Đối tượng mục tiêu</h3>
                      <p className="text-sm text-gray-600">Xác định KOC phù hợp cho chiến dịch</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                        <Select>
                          <SelectTrigger data-testid="select-gender-58">
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tuổi từ</label>
                        <input
                          type="number"
                          placeholder="18"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-age-min-58"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Đến tuổi</label>
                        <input
                          type="number"
                          placeholder="35"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-age-max-58"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Followers tối thiểu</label>
                        <Select>
                          <SelectTrigger data-testid="select-followers-58">
                            <SelectValue placeholder="Chọn yêu cầu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Bất kỳ</SelectItem>
                            <SelectItem value="1k">1K+</SelectItem>
                            <SelectItem value="5k">5K+</SelectItem>
                            <SelectItem value="10k">10K+</SelectItem>
                            <SelectItem value="50k">50K+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Nền tảng mục tiêu</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { id: 'tiktok', name: 'TikTok', icon: FaTiktok, color: 'text-black' },
                          { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: 'text-pink-500' },
                          { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: 'text-red-500' },
                          { id: 'facebook', name: 'Facebook', icon: FaFacebookF, color: 'text-blue-600' }
                        ].map(platform => (
                          <label key={platform.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-[#ff0086] cursor-pointer transition-colors">
                            <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                            <platform.icon className={`w-4 h-4 ${platform.color}`} />
                            <span className="text-sm text-gray-700">{platform.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Địa điểm</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Toàn quốc', 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'].map(location => (
                          <label key={location} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:border-[#ff0086] cursor-pointer transition-colors">
                            <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                            <span className="text-sm text-gray-700">{location}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Requirements */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Yêu cầu nội dung</h3>
                      <p className="text-sm text-gray-600">Định dạng và nội dung mong muốn</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Định dạng nội dung</label>
                        <Select>
                          <SelectTrigger data-testid="select-content-type-58">
                            <SelectValue placeholder="Chọn định dạng" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video (15s-60s)</SelectItem>
                            <SelectItem value="photo">Hình ảnh</SelectItem>
                            <SelectItem value="story">Story</SelectItem>
                            <SelectItem value="post">Post thường</SelectItem>
                            <SelectItem value="livestream">Livestream</SelectItem>
                            <SelectItem value="reel">Reel/Short</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian đăng bài</label>
                        <Select>
                          <SelectTrigger data-testid="select-posting-time-58">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flexible">Linh hoạt</SelectItem>
                            <SelectItem value="peak">Giờ vàng (19:00-22:00)</SelectItem>
                            <SelectItem value="morning">Buổi sáng (6:00-10:00)</SelectItem>
                            <SelectItem value="afternoon">Buổi trưa (12:00-14:00)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Yêu cầu cụ thể</label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả chi tiết yêu cầu về nội dung, script, tone & manner..."
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] resize-none"
                        data-testid="textarea-content-requirements-58"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags bắt buộc</label>
                      <input
                        type="text"
                        placeholder="#maybelline #beauty #makeup (ngăn cách bởi dấu phẩy)"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-hashtags-58"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget & Rewards */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Ngân sách & Thưởng</h3>
                      <p className="text-sm text-gray-600">Chi phí và phần thưởng cho KOC</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tổng ngân sách (VNĐ)</label>
                        <input
                          type="text"
                          placeholder="50,000,000"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-budget-58"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thưởng/KOC (VNĐ)</label>
                        <input
                          type="text"
                          placeholder="2,000,000"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-reward-58"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng KOC</label>
                        <input
                          type="number"
                          placeholder="100"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                          data-testid="input-koc-limit-58"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Loại thưởng</label>
                        <Select>
                          <SelectTrigger data-testid="select-reward-type-58">
                            <SelectValue placeholder="Chọn loại thưởng" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Tiền mặt</SelectItem>
                            <SelectItem value="product">Sản phẩm</SelectItem>
                            <SelectItem value="both">Cả hai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                      <label className="text-sm text-gray-700">Gửi mẫu sản phẩm cho KOC</label>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Thời gian</h3>
                      <p className="text-sm text-gray-600">Lịch trình chiến dịch và deadline</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-start-date-58"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-end-date-58"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Deadline đăng ký</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-application-deadline-58"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Deadline nộp bài</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                        data-testid="input-content-deadline-58"
                      />
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Cài đặt chiến dịch</h3>
                      <p className="text-sm text-gray-600">Tùy chọn và quyền hạn</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tự động duyệt KOC</p>
                        <p className="text-xs text-gray-500">KOC đủ điều kiện được duyệt tự động</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff0086]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Yêu cầu phê duyệt nội dung</p>
                        <p className="text-xs text-gray-500">Nội dung phải được duyệt trước khi đăng</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff0086]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Chiến dịch ưu tiên</p>
                        <p className="text-xs text-gray-500">Hiển thị ở vị trí ưu tiên trên nền tảng</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff0086]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Chiến dịch riêng tư</p>
                        <p className="text-xs text-gray-500">Chỉ hiển thị cho KOC được mời</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ff0086]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="outline" data-testid="button-cancel-58">
                    Hủy bỏ
                  </Button>
                  <Button variant="outline" className="gap-2" data-testid="button-preview-58">
                    <Eye className="w-4 h-4" />
                    Xem trước
                  </Button>
                  <Button className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg gap-2" data-testid="button-publish-campaign-58">
                    <Send className="w-4 h-4" />
                    Xuất bản chiến dịch
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section Navigation Menu */}
      <div className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-50" data-testid="section-navigation">
        {isMenuExpanded ? (
          <Card className="shadow-lg border border-gray-200 bg-white/95 backdrop-blur-sm w-64 md:w-72">
            <CardContent className="p-4">
              <div className="mb-3 pb-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-[#ff0086]" />
                  <h3 className="text-sm font-semibold text-gray-900">Danh mục</h3>
                </div>
                <button
                  onClick={() => setIsMenuExpanded(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  data-testid="button-collapse-menu"
                  aria-label="Thu gọn menu"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 flex items-start gap-2 group ${
                      activeSection === section.id
                        ? 'bg-[#ff0086] text-white shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    data-testid={`nav-section-${section.number}`}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                      activeSection === section.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600 group-hover:bg-[#ff0086] group-hover:text-white'
                    }`}>
                      {section.number}
                    </span>
                    <span className="flex-1 leading-tight">{section.title}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        ) : (
          <button
            onClick={() => setIsMenuExpanded(true)}
            className="bg-[#ff0086] hover:bg-[#e6007a] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            data-testid="button-expand-menu"
            aria-label="Mở menu"
          >
            <List className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Footer - exactly like home footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Company Links */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="text-2xl font-bold text-pink-500">IKK</div>
                <div className="text-sm text-gray-500">
                  Design System & Component Library
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <Link to="/home" className="hover:text-pink-500 transition-colors">Trang chủ</Link>
                <a href="/about" className="hover:text-pink-500 transition-colors">Giới thiệu</a>
                <a href="/contact" className="hover:text-pink-500 transition-colors">Liên hệ</a>
                <a href="/docs" className="hover:text-pink-500 transition-colors">Tài liệu</a>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
              © 2025 IKK Design System. All rights reserved. | Hệ thống thiết kế cho KOC Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}