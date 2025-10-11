import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Shield, Home as HomeIcon, Play, Users, Tv, Search, Star, Heart, Clock, Bookmark, User, Eye, Sparkles, Smartphone, MapPin, Shirt, Car, ShoppingBag, Video, MessageCircle, Target, DollarSign, TrendingUp, PlusCircle, CheckCircle, Camera, MapPin as LocationIcon, Crown, Plane, Globe, Award, Trophy, Zap, Bell, Menu, X, Share2, Palette, Layers, Grid3X3, FileText, BarChart3, Layout, Type, PlayCircle, ChevronRight, ChevronDown, ClipboardList, Building2, Megaphone, ThumbsUp, Monitor, Briefcase, Handshake, Rocket, TrendingDown, Plus, ArrowRight, Filter, Settings } from 'lucide-react';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function Brand() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="min-h-screen bg-white">
            {/* Section 1: HEADER - Thanh điều hướng chính */}
            <header className="bg-white border-b border-gray-100" data-section="header-navigation">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link to="/home">
                    <div className="w-10 h-10 bg-[#ff0086] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-base">IKK</span>
                    </div>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex items-center space-x-2">
                    <div 
                      className="relative group"
                      onMouseEnter={() => {
                        if (megaMenuTimeout) {
                          clearTimeout(megaMenuTimeout);
                          setMegaMenuTimeout(null);
                        }
                        setMegaMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setMegaMenuOpen(false), 300);
                        setMegaMenuTimeout(timeout);
                      }}
                    >
                      <a href="#solutions" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium flex items-center space-x-1">
                        <span>Giải pháp</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </a>
                      
                      {/* Redesigned Megamenu for Brands */}
                      <div 
                        className={`absolute top-full left-0 w-full lg:w-[850px] bg-white shadow-xl border border-gray-200 rounded-xl mt-2 z-50 transition-all duration-200 ease-out ${megaMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                        onMouseEnter={() => {
                          if (megaMenuTimeout) {
                            clearTimeout(megaMenuTimeout);
                            setMegaMenuTimeout(null);
                          }
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => setMegaMenuOpen(false), 150);
                          setMegaMenuTimeout(timeout);
                        }}
                      >
                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                          {/* MARKETING SOLUTIONS Column */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                                <Megaphone className="w-4 h-4 text-[#ff0086]" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">MARKETING SOLUTIONS</h3>
                            </div>
                            <ul className="space-y-1.5">
                              <li>
                                <a href="/solutions/koc-marketing" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  KOC Marketing
                                </a>
                              </li>
                              <li>
                                <a href="/solutions/influencer-campaigns" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Influencer Campaigns
                                </a>
                              </li>
                              <li>
                                <a href="/solutions/social-media" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Social Media Management
                                </a>
                              </li>
                              <li>
                                <a href="/solutions/content-creation" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Content Creation
                                </a>
                              </li>
                              <li>
                                <a href="/solutions/brand-awareness" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Brand Awareness
                                </a>
                              </li>
                              <li>
                                <a href="/solutions/product-launch" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Product Launch
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* ANALYTICS & INSIGHTS Column */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-blue-500" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">ANALYTICS & INSIGHTS</h3>
                            </div>
                            <ul className="space-y-1.5">
                              <li>
                                <a href="/analytics/campaign-performance" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Campaign Performance
                                </a>
                              </li>
                              <li>
                                <a href="/analytics/roi-tracking" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  ROI Tracking
                                </a>
                              </li>
                              <li>
                                <a href="/analytics/audience-insights" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Audience Insights
                                </a>
                              </li>
                              <li>
                                <a href="/analytics/engagement-metrics" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Engagement Metrics
                                </a>
                              </li>
                              <li>
                                <a href="/analytics/competitor-analysis" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Competitor Analysis
                                </a>
                              </li>
                              <li>
                                <a href="/analytics/market-trends" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Market Trends
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* PLATFORM MANAGEMENT Column */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 lg:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                                <Settings className="w-4 h-4 text-green-500" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">PLATFORM MANAGEMENT</h3>
                            </div>
                            <ul className="space-y-1.5">
                              <li>
                                <a href="/management/koc-discovery" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  KOC Discovery
                                </a>
                              </li>
                              <li>
                                <a href="/management/campaign-management" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Campaign Management
                                </a>
                              </li>
                              <li>
                                <a href="/management/content-approval" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Content Approval
                                </a>
                              </li>
                              <li>
                                <a href="/management/budget-control" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Budget Control
                                </a>
                              </li>
                              <li>
                                <a href="/management/contract-management" className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">
                                  Contract Management
                                </a>
                              </li>
                              <li className="pt-2">
                                <a href="/solutions" className="flex items-center gap-1 text-sm text-[#ff0086] font-medium hover:text-[#e6007a] transition-colors">
                                  Xem tất cả
                                  <ChevronRight className="w-3 h-3" />
                                </a>
                              </li>
                            </ul>
                          </div>

                        </div>

                        {/* Bottom Action Bar */}
                        <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                              <a href="#" className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">
                                Hướng dẫn Brand mới
                              </a>
                              <a href="#" className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">
                                Chính sách hỗ trợ
                              </a>
                            </div>
                            <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors">
                              Tư vấn miễn phí
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a href="#pricing" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                      Bảng giá
                    </a>
                    <a href="#case-studies" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                      Case Study
                    </a>
                    <Link to="/brand-dashboard" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                      Dashboard
                    </Link>
                  </nav>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-3">
                    {/* Search Icon */}
                    <button className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Search className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Notification */}
                    <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Bell className="w-5 h-5 text-gray-500" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                      <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                        Đăng nhập
                      </button>
                      <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Bắt đầu ngay
                      </button>
                    </div>

                    {/* Mobile Menu */}
                    <button 
                      className="lg:hidden p-2"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? (
                        <X className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Menu className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100">
                  <div className="px-4 py-4 space-y-2">
                    <a href="#solutions" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      Giải pháp
                    </a>
                    <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      Bảng giá
                    </a>
                    <a href="#case-studies" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      Case Study
                    </a>
                    <Link to="/brand-dashboard" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                    
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <button className="w-full text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                        Đăng nhập
                      </button>
                      <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                        Bắt đầu ngay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </header>

            {/* Section 2: HERO SECTION - Dành cho thương hiệu */}
            <section className="max-w-7xl mx-auto px-4 pt-12 pb-16" data-section="hero-section">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-[#ff0086]/10 text-[#ff0086] rounded-full text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4 mr-2" />
                  Dành cho Thương hiệu
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Kết nối với <span className="text-[#ff0086]">15,000+ KOC</span><br />
                  hàng đầu Việt Nam
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Nền tảng marketing KOC toàn diện - từ tìm kiếm, quản lý chiến dịch đến phân tích ROI. 
                  Giúp thương hiệu tiếp cận đúng khách hàng với chi phí tối ưu.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                  <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Bắt đầu miễn phí</span>
                  </button>
                  <button className="border-2 border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Xem Demo</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-sm text-gray-500">Tin tưởng bởi 500+ thương hiệu hàng đầu</p>
                  <div className="flex items-center space-x-8 opacity-60">
                    {['Vinamilk', 'Grab', 'Shopee', 'TPBank', 'VinFast'].map((brand, index) => (
                      <div key={index} className="px-4 py-2 bg-gray-100 rounded-lg">
                        <span className="text-sm font-medium text-gray-600">{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: FEATURES OVERVIEW */}
            <section className="max-w-7xl mx-auto px-4 py-16" data-section="features-overview">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn IKK Platform?</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Giải pháp marketing KOC toàn diện với công nghệ AI tiên tiến và hệ sinh thái KOC lớn nhất Việt Nam
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Users,
                    title: "15,000+ KOC Verified",
                    description: "Hệ sinh thái KOC đa dạng với xác minh đầy đủ từ micro đến macro influencer",
                    color: "from-[#ff0086] to-pink-600"
                  },
                  {
                    icon: Target,
                    title: "AI-Powered Matching",
                    description: "Công nghệ AI giúp tìm KOC phù hợp nhất với thương hiệu và mục tiêu chiến dịch",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    icon: BarChart3,
                    title: "Analytics Realtime",
                    description: "Theo dõi hiệu suất chiến dịch theo thời gian thực với dashboard chi tiết",
                    color: "from-green-500 to-green-600"
                  },
                  {
                    icon: Shield,
                    title: "Bảo vệ Brand Safety",
                    description: "Kiểm duyệt nội dung tự động và bảo vệ thương hiệu với công nghệ AI",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    icon: DollarSign,
                    title: "ROI Optimization",
                    description: "Tối ưu hóa ngân sách và tăng ROI lên đến 300% so với traditional marketing",
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    icon: Handshake,
                    title: "End-to-end Support",
                    description: "Hỗ trợ toàn diện từ strategy, execution đến measurement với dedicated team",
                    color: "from-teal-500 to-teal-600"
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: STATISTICS */}
            <section className="max-w-7xl mx-auto px-4 py-16" data-section="statistics">
              <div className="bg-white rounded-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Thành tích ấn tượng</h2>
                  <p className="text-gray-600 text-lg">Những con số nói lên hiệu quả của IKK Platform</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Thương hiệu</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">15,2K</div>
                    <div className="text-sm text-gray-600">KOC Active</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">2,847</div>
                    <div className="text-sm text-gray-600">Chiến dịch</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">1.2B</div>
                    <div className="text-sm text-gray-600">Reach</div>
                  </div>
                </div>

                <div className="text-center border-t border-gray-100 pt-8 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng phát triển thương hiệu?</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Tham gia cùng hàng trăm thương hiệu đã thành công với IKK Platform
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <Link to="/register">
                      <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                        <Rocket className="w-4 h-4" />
                        <span>Bắt đầu miễn phí</span>
                      </button>
                    </Link>
                    <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-6 py-3 rounded-lg font-semibold transition-colors">
                      Tư vấn 1:1
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: SUCCESS STORIES */}
            <section className="max-w-7xl mx-auto px-4 py-16" data-section="success-stories">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Study Thành công</h2>
                  <p className="text-gray-600">Khám phá những câu chuyện thành công của các thương hiệu hàng đầu</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    <span className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>Lĩnh vực</span>
                    </span>
                  </button>
                  <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
                    Xem tất cả
                  </button>
                </div>
              </div>

              {/* Case Study Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: "case-1",
                    brand: "Vinamilk",
                    campaign: "Sữa tươi TH - Chiến dịch Review chân thực",
                    results: {
                      reach: "2.5M",
                      engagement: "340K",
                      roi: "450%",
                      conversion: "12.3%"
                    },
                    description: "Chiến dịch review sản phẩm sữa tươi với 150 KOC, tập trung vào gia đình trẻ và lối sống healthy",
                    duration: "30 ngày",
                    budget: "500M VNĐ",
                    platforms: ["facebook", "instagram", "tiktok"],
                    category: "FMCG",
                    image: "/vinamilk-case.jpg",
                    brandLogo: "/vinamilk-logo.png"
                  },
                  {
                    id: "case-2", 
                    brand: "Grab",
                    campaign: "GrabFood - Super App Experience",
                    results: {
                      reach: "1.8M",
                      engagement: "280K",
                      roi: "380%",
                      conversion: "15.7%"
                    },
                    description: "Trải nghiệm đa dạng dịch vụ Grab với 200 KOC trên khắp cả nước, tạo viral moment",
                    duration: "45 ngày",
                    budget: "750M VNĐ", 
                    platforms: ["instagram", "tiktok", "youtube"],
                    category: "Technology",
                    image: "/grab-case.jpg",
                    brandLogo: "/grab-logo.png"
                  },
                  {
                    id: "case-3",
                    brand: "TPBank",
                    campaign: "LiveBank Digital Banking Revolution",
                    results: {
                      reach: "1.2M",
                      engagement: "195K",
                      roi: "520%",
                      conversion: "8.9%"
                    },
                    description: "Demo tính năng banking thông minh với GenZ và Millennials, focus vào fintech innovation",
                    duration: "60 ngày",
                    budget: "400M VNĐ",
                    platforms: ["youtube", "instagram", "facebook"],
                    category: "Financial",
                    image: "/tpbank-case.jpg",
                    brandLogo: "/tpbank-logo.png"
                  }
                ].map((caseStudy, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                      case 'facebook': return <FaFacebookF className="w-4 h-4 text-blue-600" />;
                      default: return null;
                    }
                  };

                  return (
                    <div key={caseStudy.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                      {/* Case Study Image */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={caseStudy.image || "/placeholder.jpg"} 
                            alt={caseStudy.campaign}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.jpg";
                            }}
                          />
                        </div>
                        
                        {/* Category & Platforms */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                          <div className="px-2 py-1 bg-[#ff0086] text-white text-xs font-medium rounded-md">
                            {caseStudy.category}
                          </div>
                          <div className="flex items-center space-x-1">
                            {caseStudy.platforms?.map((platform, idx) => (
                              <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Brand & Campaign Title */}
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={caseStudy.brandLogo} 
                              alt={caseStudy.brand}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                if (target.nextSibling) {
                                  (target.nextSibling as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                              {caseStudy.brand.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{caseStudy.brand}</h3>
                            <p className="text-sm text-gray-600">{caseStudy.duration} • {caseStudy.budget}</p>
                          </div>
                        </div>

                        <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                          {caseStudy.campaign}
                        </h4>

                        <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                          {caseStudy.description}
                        </p>

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-[#ff0086]">{caseStudy.results.reach}</div>
                            <div className="text-xs text-gray-600">Reach</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-[#ff0086]">{caseStudy.results.engagement}</div>
                            <div className="text-xs text-gray-600">Engagement</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-green-600">{caseStudy.results.roi}</div>
                            <div className="text-xs text-gray-600">ROI</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-blue-600">{caseStudy.results.conversion}</div>
                            <div className="text-xs text-gray-600">Conversion</div>
                          </div>
                        </div>

                        {/* CTA */}
                        <button className="w-full bg-gray-100 hover:bg-[#ff0086] hover:text-white text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                          <span>Xem chi tiết</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 6: CTA SECTION */}
            <section className="max-w-7xl mx-auto px-4 py-16" data-section="cta-section">
              <div className="bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Sẵn sàng tăng trưởng cùng IKK Platform?
                  </h2>
                  <p className="text-xl opacity-90 mb-8">
                    Tham gia cùng 500+ thương hiệu đã tin tưởng và đạt được ROI ấn tượng với chiến lược KOC Marketing
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="bg-white text-[#ff0086] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                      <Rocket className="w-5 h-5" />
                      <span>Bắt đầu miễn phí 14 ngày</span>
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#ff0086] transition-colors flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Đặt lịch demo</span>
                    </button>
                  </div>
                  
                  <div className="mt-8 text-sm opacity-75">
                    ✓ Miễn phí 14 ngày • ✓ Không cần thẻ tín dụng • ✓ Hỗ trợ 24/7
                  </div>
                </div>
              </div>
            </section>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderSection()}
    </div>
  );
}