"use client"

import { useState } from "react"
import { Link } from 'wouter'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  Newspaper,
  Calendar,
  GraduationCap,
  Users,
  Star,
  Clock,
  Eye,
  Heart,
  TrendingUp,
  Award,
  Target,
  Bell,
  Menu,
  X,
} from "lucide-react"

const tabs = [
  { id: "news", label: "Tin tức", icon: Newspaper },
  { id: "events", label: "Sự kiện", icon: Calendar },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "academy", label: "Học viện", icon: GraduationCap },
  { id: "community", label: "Cộng đồng", icon: Users },
]

const featuredContent = [
  {
    id: 1,
    type: "news",
    title: "Xu hướng KOC Marketing 2024: Những thay đổi quan trọng",
    excerpt: "Khám phá những xu hướng mới nhất trong lĩnh vực KOC Marketing và cách thích ứng với thị trường hiện tại",
    image: "/koc-trends-2024.png",
    author: "IKK Team",
    publishedAt: "2024-01-15",
    readTime: "5 phút đọc",
    views: 2847,
    likes: 156,
    category: "Xu hướng",
  },
  {
    id: 2,
    type: "blog",
    title: "Cách tối ưu hóa nội dung để tăng engagement rate",
    excerpt: "Hướng dẫn chi tiết các kỹ thuật tạo nội dung hấp dẫn và tăng tương tác từ người theo dõi",
    image: "/content-optimization.png",
    author: "Minh Anh KOC",
    publishedAt: "2024-01-12",
    readTime: "8 phút đọc",
    views: 1923,
    likes: 89,
    category: "Hướng dẫn",
  },
  {
    id: 3,
    type: "events",
    title: "IKK Summit 2024 - Hội nghị KOC lớn nhất năm",
    excerpt: "Tham gia sự kiện quy tụ hơn 1000 KOC hàng đầu và các chuyên gia marketing",
    image: "/ikk-summit-2024.png",
    author: "IKK Events",
    publishedAt: "2024-01-10",
    readTime: "3 phút đọc",
    views: 5621,
    likes: 342,
    category: "Sự kiện",
  },
  {
    id: 4,
    type: "academy",
    title: "Khóa học KOC Marketing từ cơ bản đến nâng cao",
    excerpt: "Chương trình đào tạo toàn diện giúp bạn trở thành KOC chuyên nghiệp",
    image: "/koc-course.png",
    author: "IKK Academy",
    publishedAt: "2024-01-08",
    readTime: "Khóa học",
    views: 3456,
    likes: 234,
    category: "Giáo dục",
  },
  {
    id: 5,
    type: "community",
    title: "Câu chuyện thành công của Top KOC tháng 12",
    excerpt: "Chia sẻ kinh nghiệm và bí quyết thành công từ những KOC xuất sắc nhất",
    image: "/success-stories.png",
    author: "Community Team",
    publishedAt: "2024-01-05",
    readTime: "6 phút đọc",
    views: 2134,
    likes: 178,
    category: "Cộng đồng",
  },
  {
    id: 6,
    type: "blog",
    title: "10 mẹo tăng follower hiệu quả cho KOC mới bắt đầu",
    excerpt: "Những chiến lược đã được kiểm chứng để xây dựng cộng đồng người theo dõi chất lượng",
    image: "/follower-tips.png",
    author: "Thanh Hoa KOC",
    publishedAt: "2024-01-03",
    readTime: "7 phút đọc",
    views: 4567,
    likes: 289,
    category: "Tips & Tricks",
  },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("news")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredContent = featuredContent
    .filter((item) => (activeTab === "news" ? true : item.type === activeTab))
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    )

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
              <Link to="/koc" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Dành cho KOC
              </Link>
              <a href="#brands" className="px-4 py-2 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                Dành cho thương hiệu
              </a>
              <Link to="/explore" className="px-4 py-2 text-sm text-[#ff0086] bg-gray-50 rounded-lg transition-colors font-medium">
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
              <Link to="/koc" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Dành cho KOC
              </Link>
              <a href="#brands" className="block px-3 py-2 text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Dành cho thương hiệu
              </a>
              <Link to="/explore" className="block px-3 py-2 text-[#ff0086] bg-gray-50 rounded-lg text-sm font-medium transition-colors">
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

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Thư viện kiến thức
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Khám phá thế giới dành cho KOC</h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất, hướng dẫn chi tiết và sự kiện hấp dẫn trong hệ sinh thái KOC Marketing
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Tìm kiếm bài viết, tin tức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-8 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-pink-500" />
            <h2 className="text-2xl font-bold text-gray-900">Nổi bật</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.slice(0, 6).map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-xl border-0 shadow-sm"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=320"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-700 hover:bg-white">{item.category}</Badge>
                  </div>
                </div>

                <CardHeader className="p-5">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
                    {item.title}
                  </CardTitle>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{item.author.charAt(0)}</span>
                      </div>
                      <span className="text-xs text-gray-600">{item.author}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-0">
            <TrendingUp className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">1,247</div>
            <div className="text-sm text-gray-600">Bài viết</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">15,892</div>
            <div className="text-sm text-gray-600">Thành viên</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-0">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Sự kiện</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-gray-600">Khóa học</div>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center rounded-2xl border-0">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-4">Bạn muốn chia sẻ kiến thức?</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Tham gia cộng đồng KOC và chia sẻ kinh nghiệm, kiến thức của bạn với hàng nghìn thành viên khác
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-6">Viết bài</Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-6 bg-transparent"
            >
              Tham gia cộng đồng
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}