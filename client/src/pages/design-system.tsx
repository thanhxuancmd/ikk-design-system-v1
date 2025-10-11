import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Bell, Menu, X, Play, Palette, Type, Grid3X3, FileText, Layers, 
  PlusCircle, Plus, Target, MessageCircle, TrendingUp, Award, User, Video,
  Star, Heart, Zap, Code, Smartphone, Monitor, Tablet, 
  Navigation, Component, Settings, Book, Workflow, Box,
  Shield, Crown, Globe, Layout, Clock, Plane, ShoppingBag,
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
import IconComponents from '@/components/design-system/IconComponents';
import StatsCards from '@/components/design-system/StatsCards';
import MobileButtons from '@/components/design-system/MobileButtons';
import DesktopButtons from '@/components/design-system/DesktopButtons';
import BackgroundComponents from '@/components/design-system/BackgroundComponents';
import MegaNavigation from '@/components/design-system/MegaNavigation';
import SocialPlatformComponents from '@/components/design-system/SocialPlatformComponents';
import Badges from '@/components/design-system/Badges';
import MediaComponents from '@/components/design-system/MediaComponents';
import InteractiveComponents from '@/components/design-system/InteractiveComponents';
import KOCSpecificComponents from '@/components/design-system/KOCSpecificComponents';
import LoadingStatesAlerts from '@/components/design-system/LoadingStatesAlerts';
import HomePageComponentPatterns from '@/components/design-system/HomePageComponentPatterns';

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
    { id: 'section-58', number: '58', title: 'Thêm chiến dịch' }
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
      <header className="bg-white border-b border-gray-100">
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
                <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Đăng ký
                </button>
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
            
            {/* Mobile Auth Buttons */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
              <button className="flex-1 text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng nhập
              </button>
              <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Đăng ký
              </button>
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
              <Palette className="w-6 h-6 text-[#ff0086]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phân cấp màu sắc</h3>
            <p className="text-sm text-gray-600 mb-4">
              Màu hồng chủ đạo #ff0086 với hệ thống màu phụ trợ rõ ràng cho từng chức năng
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff0086] rounded"></div>
              <div className="w-8 h-8 bg-pink-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-white border border-gray-200 rounded"></div>
            </div>
          </div>

          {/* Principle 2: Whitespace & Breathing */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không gian thở</h3>
            <p className="text-sm text-gray-600 mb-4">
              Padding và spacing đồng nhất tạo cảm giác thoáng, dễ đọc với hệ thống 4/8/16/24px
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-4 h-4 bg-gray-200"></div>
                <span>4px - Compact</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-8 h-4 bg-gray-200"></div>
                <span>8px - Default</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-16 h-4 bg-gray-200"></div>
                <span>16px - Spacious</span>
              </div>
            </div>
          </div>

          {/* Principle 3: Rounded Corners */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Box className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bo góc nhất quán</h3>
            <p className="text-sm text-gray-600 mb-4">
              rounded-xl (12px) cho cards, rounded-lg (8px) cho buttons, rounded (4px) cho inputs
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="w-12 h-8 bg-gray-200 rounded-lg"></div>
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Principle 4: Shadow & Depth */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hiệu ứng chiều sâu</h3>
            <p className="text-sm text-gray-600 mb-4">
              Shadow tinh tế từ shadow-sm đến shadow-xl, hover effects mượt mà với transitions
            </p>
            <div className="space-y-2">
              <div className="p-2 bg-white rounded shadow-sm text-xs">shadow-sm</div>
              <div className="p-2 bg-white rounded shadow-md text-xs">shadow-md</div>
              <div className="p-2 bg-white rounded shadow-xl text-xs">shadow-xl</div>
            </div>
          </div>

          {/* Principle 5: Typography Scale */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Type className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phân cấp typography</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hệ thống font size rõ ràng từ text-xs đến text-4xl, font-weight từ normal đến bold
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">text-xs (12px)</p>
              <p className="text-sm text-gray-600">text-sm (14px)</p>
              <p className="text-base text-gray-700">text-base (16px)</p>
              <p className="text-lg text-gray-800 font-semibold">text-lg (18px)</p>
            </div>
          </div>

          {/* Principle 6: Interactive Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phản hồi tương tác</h3>
            <p className="text-sm text-gray-600 mb-4">
              Hover states, active states, transitions mượt 200-300ms cho mọi interactive element
            </p>
            <div className="space-y-2">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-all duration-300">
                Hover me
              </button>
              <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm transition-all duration-300">
                Primary action
              </button>
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


      {/* Category Icon Menu Section - exactly like home */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Danh mục</h2>
          <button className="text-sm text-[#ff0086] hover:text-[#e6007a] transition-colors font-medium">
            Xem tất cả
          </button>
        </div>

        {/* Category Grid - 8 columns exactly like home */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {/* Colors */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Palette className="w-7 h-7 text-pink-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Màu sắc
            </span>
          </div>

          {/* Typography */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Type className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Typography
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <PlusCircle className="w-7 h-7 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Nút bấm
            </span>
          </div>

          {/* Forms */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <FileText className="w-7 h-7 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Biểu mẫu
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Layers className="w-7 h-7 text-rose-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Thẻ
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Navigation className="w-7 h-7 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Điều hướng
            </span>
          </div>

          {/* Icons */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-rose-100 group-hover:from-red-200 group-hover:to-rose-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Star className="w-7 h-7 text-red-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Biểu tượng
            </span>
          </div>

          {/* Layouts */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 group-hover:from-yellow-200 group-hover:to-amber-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Grid3X3 className="w-7 h-7 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
              Bố cục
            </span>
          </div>
        </div>


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
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] relative">
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


      {/* Design Tokens Banners - like event banners */}
      <section className="max-w-7xl mx-auto px-4 mb-8">
        <div className="relative">
          {/* Design tokens carousel */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {designTokens.map((token, index) => (
              <div key={index} className="flex-shrink-0 w-80 h-48 relative rounded-xl overflow-hidden group cursor-pointer">
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
            <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-view-all-campaigns">
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



      <IconComponents />



      <FormElements />

      <Tabs />

        {/* Stats Cards Section */}
      <StatsCards />

      <MobileButtons />

      <DesktopButtons />

      <BackgroundComponents />

      <MegaNavigation />

      <SocialPlatformComponents />

      <Badges />






      <section className="max-w-7xl mx-auto px-4 mb-12">
        <MediaComponents />


      <section className="max-w-7xl mx-auto px-4 mb-12">
        <InteractiveComponents />



        {/* KOC Specific Components */}
        <KOCSpecificComponents />

        <LoadingStatesAlerts />




<HomePageComponentPatterns />
</main>
</div>

