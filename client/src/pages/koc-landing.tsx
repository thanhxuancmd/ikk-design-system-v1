import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Star, 
  Heart, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  DollarSign, 
  CheckCircle,
  Play,
  Camera,
  Video,
  Share2,
  MessageCircle,
  Gift,
  Clock,
  Smartphone,
  Eye,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Crown,
  Trophy,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  PlusCircle,
  MapPin,
  FileText,
  Bookmark
} from 'lucide-react';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function KOCLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - exactly like /home */}
      <header className="bg-white border-b border-gray-100">
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
              <a href="#category" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Danh mục
              </a>
              <a href="#koc" className="px-4 py-2 text-sm text-[#ff0086] bg-gray-50 rounded-lg transition-colors font-medium">
                Dành cho KOC
              </a>
              <a href="#brands" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Dành cho thương hiệu
              </a>
              <Link to="/explore" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Khám phá
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
                  Đăng ký
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
              <a href="#category" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Danh mục
              </a>
              <a href="#koc" className="block px-3 py-2 text-[#ff0086] bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Dành cho KOC
              </a>
              <a href="#brands" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Dành cho thương hiệu
              </a>
              <Link to="/explore" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Khám phá
              </Link>
              
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <button className="w-full text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
                  Đăng nhập
                </button>
                <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge className="bg-[#ff0086]/10 text-[#ff0086] border-[#ff0086]/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Dành cho KOC & Creator
            </Badge>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Trở thành <span className="text-[#ff0086]">KOC chuyên nghiệp</span>
            <br />
            Kiếm tiền từ nội dung
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tham gia cộng đồng 50K+ KOC thành công. Hợp tác với 1000+ thương hiệu uy tín. 
            Thu nhập từ <span className="font-semibold text-[#ff0086]">500K - 50M VND</span> mỗi chiến dịch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2 shadow-lg">
              <PlusCircle className="w-5 h-5" />
              <span>Đăng ký KOC ngay</span>
            </button>
            <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Xem video hướng dẫn</span>
            </button>
          </div>
        </div>

        {/* Stats - matching /home pattern */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">50K+</div>
            <div className="text-xs text-gray-600">KOC đã tham gia</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1000+</div>
            <div className="text-xs text-gray-600">Thương hiệu tin tưởng</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">15M+</div>
            <div className="text-xs text-gray-600">Chiến dịch thành công</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45B+</div>
            <div className="text-xs text-gray-600">Tổng giải thưởng</div>
          </div>
        </div>
      </section>

      {/* Benefits Section - matching /home card pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn <span className="text-[#ff0086]">IKK Platform?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nền tảng hàng đầu Việt Nam giúp KOC và Creator kiếm tiền từ nội dung một cách hiệu quả
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: DollarSign,
              title: "Thu nhập hấp dẫn",
              description: "Kiếm tiền từ nội dung với mức thưởng từ 500K - 50M VND/chiến dịch",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              icon: Users,
              title: "Cộng đồng KOC lớn mạnh", 
              description: "Kết nối với 50K+ KOC và creator trên toàn quốc",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              icon: Award,
              title: "Thương hiệu uy tín",
              description: "Hợp tác với 1000+ thương hiệu lớn như Samsung, L'Oreal, Unilever",
              gradient: "from-purple-500 to-violet-500"
            },
            {
              icon: Target,
              title: "Chiến dịch đa dạng",
              description: "Từ làm đẹp, thời trang đến công nghệ, ẩm thực phù hợp mọi sở thích",
              gradient: "from-orange-500 to-amber-500"
            },
            {
              icon: TrendingUp,
              title: "Phát triển cá nhân",
              description: "Nâng cao kỹ năng content, marketing và xây dựng thương hiệu cá nhân",
              gradient: "from-pink-500 to-rose-500"
            },
            {
              icon: Shield,
              title: "Hỗ trợ chuyên nghiệp",
              description: "Đội ngũ hỗ trợ 24/7 và đào tạo miễn phí cho KOC mới",
              gradient: "from-cyan-500 to-teal-500"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cách thức <span className="text-[#ff0086]">hoạt động</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chỉ với 5 bước đơn giản, bạn có thể bắt đầu kiếm tiền từ nội dung của mình
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              number: "01",
              title: "Đăng ký tài khoản",
              description: "Tạo profile KOC với thông tin cá nhân và mạng xã hội",
              icon: Users
            },
            {
              number: "02", 
              title: "Xác thực thông tin",
              description: "Xác minh số followers và nội dung để được phê duyệt",
              icon: CheckCircle
            },
            {
              number: "03",
              title: "Chọn chiến dịch",
              description: "Tìm và ứng tuyển các chiến dịch phù hợp với bạn",
              icon: Target
            },
            {
              number: "04",
              title: "Tạo nội dung",
              description: "Sáng tạo content theo yêu cầu của thương hiệu", 
              icon: Camera
            },
            {
              number: "05",
              title: "Nhận thưởng",
              description: "Hoàn thành và nhận thưởng sau khi được duyệt",
              icon: Gift
            }
          ].map((step, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="p-6 text-center">
                {/* Step Number */}
                <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff0086]/10 transition-colors duration-300">
                  <step.icon className="w-5 h-5 text-gray-600 group-hover:text-[#ff0086]" />
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Câu chuyện <span className="text-[#ff0086]">thành công</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn KOC đã thay đổi cuộc sống với thu nhập ổn định từ nội dung
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Nguyễn Minh Anh",
              role: "Beauty KOC",
              followers: "25K",
              earnings: "15M",
              quote: "Từ khi tham gia IKK, thu nhập hàng tháng của mình đã tăng gấp 3 lần. Các chiến dịch rất chất lượng và phù hợp với content của mình.",
              campaigns: 45
            },
            {
              name: "Trần Quốc Bảo",
              role: "Tech Reviewer",
              followers: "50K", 
              earnings: "25M",
              quote: "IKK giúp mình tiếp cận được nhiều sản phẩm công nghệ mới nhất. Đội ngũ hỗ trợ rất chuyên nghiệp và thanh toán đúng hạn.",
              campaigns: 32
            },
            {
              name: "Lê Thị Hoa",
              role: "Lifestyle Creator",
              followers: "80K",
              earnings: "40M", 
              quote: "Nền tảng rất dễ sử dụng, chiến dịch đa dạng. Mình đã xây dựng được thương hiệu cá nhân mạnh mẽ nhờ IKK.",
              campaigns: 67
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="p-6">
                {/* Profile */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>{testimonial.followers} followers</span>
                      <span>•</span>
                      <span>{testimonial.campaigns} campaigns</span>
                    </div>
                  </div>
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Earnings */}
                <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-[#ff0086]">{testimonial.earnings} VND</div>
                    <div className="text-sm text-gray-600">Thu nhập tháng qua</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Campaigns Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Chiến dịch KOC nổi bật</h2>
            <p className="text-gray-600">Khám phá những chiến dịch hot nhất với thương hiệu hàng đầu</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              Bộ lọc
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
              Xem tất cả
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              id: "koc-1",
              title: "Review son môi Maybelline SuperStay Vinyl Ink",
              brand: "Maybelline Vietnam",
              reward: "2,500,000 VNĐ",
              participants: "45/60",
              status: "đang hoạt động",
              statusColor: "bg-green-500",
              daysLeft: 12,
              category: "Beauty/Cosmetics",
              engagement: "15.2K",
              platforms: ["instagram", "tiktok"],
              location: "Toàn quốc"
            },
            {
              id: "koc-2", 
              title: "Unboxing iPhone 16 Pro - Tech Review Elite",
              brand: "Apple Vietnam",
              reward: "8,000,000 VNĐ",
              participants: "15/25",
              status: "đang tuyển KOC",
              statusColor: "bg-blue-500",
              daysLeft: 8,
              category: "Technology",
              engagement: "45.7K",
              platforms: ["youtube", "tiktok"],
              location: "Hồ Chí Minh"
            },
            {
              id: "koc-3",
              title: "Styling với BST Thu-Đông Zara 2025",
              brand: "Zara Vietnam",
              reward: "4,200,000 VNĐ", 
              participants: "28/40",
              status: "đang hoạt động",
              statusColor: "bg-green-500",
              daysLeft: 15,
              category: "Fashion/Styling",
              engagement: "22.1K",
              platforms: ["instagram", "facebook"],
              location: "Hà Nội"
            },
            {
              id: "koc-4",
              title: "Trải nghiệm ẩm thực Highlands Coffee mới",
              brand: "Highlands Coffee",
              reward: "1,800,000 VNĐ",
              participants: "67/80",
              status: "đang hoạt động", 
              statusColor: "bg-green-500",
              daysLeft: 20,
              category: "Food & Beverage",
              engagement: "8.9K",
              platforms: ["instagram", "tiktok"],
              location: "Toàn quốc"
            }
          ].map((campaign, index) => (
            <div key={campaign.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              {/* Campaign Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#ff0086] rounded-xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${campaign.statusColor}`}>
                    <span>{campaign.status}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {campaign.platforms?.slice(0, 2).map((platform, idx) => (
                      <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                        {platform === 'instagram' && <FaInstagram className="w-4 h-4 text-pink-500" />}
                        {platform === 'tiktok' && <FaTiktok className="w-4 h-4 text-black" />}
                        {platform === 'youtube' && <FaYoutube className="w-4 h-4 text-red-500" />}
                        {platform === 'facebook' && <FaFacebookF className="w-4 h-4 text-blue-600" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Brand */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-full h-full bg-[#ff0086] rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {campaign.brand.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">{campaign.brand}</span>
                      <span className="text-xs text-gray-500">{campaign.category}</span>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                  {campaign.title}
                </h3>
                
                {/* Reward Info */}
                <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-[#ff0086]">{campaign.reward}</div>
                      <div className="text-xs text-gray-600">Phần thưởng chiến dịch</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">KOC tham gia</div>
                      <div className="text-sm font-semibold text-gray-900">{campaign.participants}</div>
                    </div>
                  </div>
                </div>
                
                {/* Meta Info */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Còn {campaign.daysLeft} ngày</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{campaign.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{campaign.location}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                    <PlusCircle className="w-4 h-4" />
                    <span>Ứng tuyển</span>
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group">
                    <Bookmark className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group">
                    <Share2 className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="text-center border-t border-gray-100 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng trở thành KOC?</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Tham gia cộng đồng KOC IKK với các thương hiệu hàng đầu
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                <Link to="/register">
                  <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Đăng ký KOC</span>
                  </button>
                </Link>
                <Link to="/campaigns">
                  <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-6 py-3 rounded-lg font-semibold transition-colors">
                    Khám phá chiến dịch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Câu hỏi <span className="text-[#ff0086]">thường gặp</span>
          </h2>
          <p className="text-xl text-gray-600">
            Giải đáp những thắc mắc phổ biến của KOC mới
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "Tôi cần bao nhiêu followers để trở thành KOC?",
              answer: "Bạn chỉ cần từ 1K followers trở lên trên ít nhất 1 nền tảng mạng xã hội. Chúng tôi đánh giá chất lượng content và engagement hơn là số lượng followers."
            },
            {
              question: "Tôi có thể kiếm được bao nhiêu tiền?",
              answer: "Thu nhập phụ thuộc vào số lượng chiến dịch bạn tham gia và mức độ tương tác. KOC trung bình kiếm 3-10M VND/tháng, KOC top có thể đạt 50M+ VND/tháng."
            },
            {
              question: "Khi nào tôi được thanh toán?",
              answer: "Chúng tôi thanh toán trong vòng 7-14 ngày sau khi chiến dịch được hoàn thành và phê duyệt. Hỗ trợ chuyển khoản ngân hàng và ví điện tử."
            },
            {
              question: "Tôi có cần kinh nghiệm trước đó không?",
              answer: "Không cần thiết! Chúng tôi có chương trình đào tạo miễn phí cho KOC mới và hỗ trợ từng bước để bạn tạo ra content chất lượng."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section - matching /home pattern */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sẵn sàng bắt đầu hành trình KOC?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tham gia cộng đồng KOC lớn nhất Việt Nam và bắt đầu kiếm tiền từ nội dung của bạn ngay hôm nay
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-[#ff0086] hover:bg-[#e6007a] text-white font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Đăng ký KOC miễn phí
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:border-[#ff0086] hover:text-[#ff0086] px-12 py-4 rounded-xl transition-all duration-300"
            >
              Tư vấn 1:1 miễn phí
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 text-center border-t border-gray-100 pt-8">
            <div>
              <div className="w-12 h-12 bg-[#ff0086]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-[#ff0086]" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Hotline hỗ trợ</div>
              <div className="text-gray-600">1900 1234</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#ff0086]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#ff0086]" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Email</div>
              <div className="text-gray-600">support@ikk.vn</div>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#ff0086]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-[#ff0086]" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">Giờ làm việc</div>
              <div className="text-gray-600">8:00 - 17:00 (T2-T6)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}