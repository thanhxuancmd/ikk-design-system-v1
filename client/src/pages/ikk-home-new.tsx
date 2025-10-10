import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ClipboardList,
  UtensilsCrossed,
  Sparkles,
  Plane,
  Film,
  Coffee,
  Home,
  Smartphone,
  Briefcase,
  Megaphone,
  Users,
  Clock,
  MapPin,
  Bell,
  MessageCircle,
  Star,
  TrendingUp,
  Award,
  ChevronDown,
  Gift,
  Ticket,
} from "lucide-react"
import { Link } from "wouter"
import { useIKKPlatform } from "@/contexts/ikk-platform-context"
import { useState } from "react"

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconStyle = "w-5 h-5 rounded-md p-1 text-white"

  switch (platform) {
    case "tiktok":
      return (
        <div className={`${iconStyle} bg-black`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </div>
      )
    case "facebook":
      return (
        <div className={`${iconStyle} bg-blue-600`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      )
    case "instagram":
      return (
        <div className={`${iconStyle} bg-gradient-to-br from-purple-600 to-pink-500`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      )
    default:
      return null
  }
}

const getStatusBadge = (status: string, daysLeft: number) => {
  if (status === "completed") return { text: "Kết thúc", color: "bg-gray-500" }
  if (status === "pending") return { text: "Đánh giá", color: "bg-yellow-500" }
  if (status === "content_creation") return { text: "Đăng bài", color: "bg-blue-500" }
  if (status === "selection") return { text: "Tuyển chọn", color: "bg-purple-500" }
  if (daysLeft <= 7) return { text: `D-${daysLeft}`, color: "bg-red-500" }
  return { text: "Đang tuyển KOC", color: "bg-green-500" }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "recruiting":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200"
    case "active":
      return "bg-green-100 text-green-800 border border-green-200"
    case "selection":
      return "bg-amber-100 text-amber-800 border border-amber-200"
    case "content_creation":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "pending":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "completed":
      return "bg-gray-100 text-gray-800 border border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200"
  }
}

export default function HomePage() {
  const { campaigns } = useIKKPlatform()
  const [showMegaMenu, setShowMegaMenu] = useState(false)

  const featuredCampaigns = campaigns.filter((c) => c.status === "active").slice(0, 6)

  const categories = [
    { name: "Làm đẹp", icon: Sparkles, color: "#FDF2F8" },
    { name: "F&B", icon: UtensilsCrossed, color: "#FFFBEB" },
    { name: "Du lịch", icon: Plane, color: "#EFF6FF" },
    { name: "Giải trí", icon: Film, color: "#F3E8FF" },
    { name: "Cafe", icon: Coffee, color: "#F0FDF4" },
    { name: "Gia đình", icon: Home, color: "#FEF7FF" },
    { name: "Công nghệ", icon: Smartphone, color: "#F0F9FF" },
    { name: "Kinh doanh", icon: Briefcase, color: "#FAFAFA" },
    { name: "Marketing", icon: Megaphone, color: "#FEF2F2" },
    { name: "Tuyển dụng", icon: Users, color: "#F9FAFB" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: "#ff0086" }}
              >
                IKK
              </div>
              <span className="font-bold text-xl text-gray-900">IKK</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <span>Danh mục</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showMegaMenu && (
                <div
                  className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50"
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <Link
                          key={index}
                          to={`/categories/${category.name.toLowerCase()}`}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: category.color }}
                          >
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/koc-app" className="text-gray-600 hover:text-gray-900 font-medium">
              Dành cho KOC
            </Link>
            <Link to="/brand-dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
              Dành cho thương hiệu
            </Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-gray-900 font-medium">
              Khám phá
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900" asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button
              className="font-medium"
              style={{ backgroundColor: "#ff0086", borderColor: "#ff0086" }}
              asChild
            >
              <Link to="/register">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Nền tảng{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                KOC Marketing
              </span>{" "}
              hàng đầu Việt Nam
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kết nối KOC và thương hiệu một cách hiệu quả. Tạo ra những chiến dịch marketing sáng tạo và đo
              lường được hiệu quả.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dành cho KOC</h3>
              <p className="text-gray-600 mb-6">
                Kiếm tiền từ nội dung của bạn. Tham gia các chiến dịch từ những thương hiệu uy tín.
              </p>
              <Button className="w-full" style={{ backgroundColor: "#ff0086" }} asChild>
                <Link to="/koc-app">Tham gia ngay</Link>
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dành cho Thương hiệu</h3>
              <p className="text-gray-600 mb-6">
                Tiếp cận khách hàng tiềm năng thông qua mạng lưới KOC đa dạng và chất lượng.
              </p>
              <Button className="w-full" style={{ backgroundColor: "#ff0086" }} asChild>
                <Link to="/brand-dashboard">Khám phá ngay</Link>
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Khám phá</h3>
              <p className="text-gray-600 mb-6">
                Tìm hiểu các chiến dịch hot nhất, xu hướng mới và cơ hội hợp tác tiềm năng.
              </p>
              <Button className="w-full" style={{ backgroundColor: "#ff0086" }} asChild>
                <Link to="/campaigns">Xem ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Danh mục nổi bật</h2>
            <p className="text-xl text-gray-600">
              Khám phá các lĩnh vực đa dạng với nhiều cơ hội hợp tác hấp dẫn
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Làm đẹp</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V12a9 9 0 018.999-8.999c4.686 0 8.5 3.814 8.5 8.5L21 12v3.546z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">F&B</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Du lịch</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Giải trí</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Cafe</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Gia đình</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Công nghệ</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v.5A3.5 3.5 0 0011.5 10h1A3.5 3.5 0 0016 6.5V6H8z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Kinh doanh</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0v.5A3.5 3.5 0 0011.5 10h1A3.5 3.5 0 0016 6.5V6H8z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Tuyển dụng</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <span className="text-xs text-center text-gray-700 font-medium">Nhà quảng cáo</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Chiến dịch KOC marketing</h2>
            <Button variant="outline" asChild>
              <Link to="/campaigns">Xem tất cả</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.length > 0
              ? featuredCampaigns.map((campaign) => {
                  const daysLeft = Math.max(
                    0,
                    Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                  )
                  const statusBadge = getStatusBadge(campaign.status, daysLeft)

                  return (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-2xl border-0 shadow-sm"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden rounded-xl mx-3 mt-3">
                        <img
                          src={campaign.image || "/cosmetic-lipstick-beauty.png"}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{campaign.merchant?.charAt(0) || "M"}</span>
                          </div>
                          <span className="text-gray-600 text-sm font-medium">{campaign.merchant}</span>
                        </div>

                        <CardTitle className="text-base font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                          {campaign.title}
                        </CardTitle>

                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>
                              {campaign.selectedKocs?.length || 0}/{campaign.kocNeeded}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              Còn{" "}
                              {Math.max(
                                0,
                                Math.ceil(
                                  (new Date(campaign.deadline).getTime() - new Date().getTime()) /
                                    (1000 * 60 * 60 * 24),
                                ),
                              )}{" "}
                              ngày
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>Toàn quốc</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs ${statusBadge.color} text-white px-2 py-1 rounded-full font-medium border-0`}
                            >
                              {statusBadge.text}
                            </Badge>
                            <div className="flex gap-1">
                              <PlatformIcon platform="tiktok" />
                              <PlatformIcon platform="facebook" />
                              <PlatformIcon platform="instagram" />
                            </div>
                          </div>
                          <Badge className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold">
                            {campaign.reward}.000đ
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                            asChild
                          >
                            <Link to={`/campaigns/${campaign.id}`}>Chi tiết</Link>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 text-xs bg-pink-500 hover:bg-pink-600 text-white font-medium"
                            asChild
                          >
                            <Link to={`/campaigns/${campaign.id}/apply`}>Ứng tuyển</Link>
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })
              : [
                  {
                    id: "static-1",
                    merchant: "Maybelline Vietnam",
                    title: "Review son môi Maybelline SuperStay Matte Ink",
                    reward: "800",
                    category: "Làm đẹp",
                    status: "recruiting",
                    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    selectedKocs: Array(89).fill(null),
                    kocNeeded: 100,
                    image: "/red-maybelline-lipstick.png",
                  },
                  {
                    id: "static-2",
                    merchant: "NƯỚC MẮM CHIN-SU",
                    title: "Tặng 1.400.000đ khi mua sản phẩm và review trên TikTok",
                    reward: "1,400",
                    category: "Đồ ăn, thức uống",
                    status: "active",
                    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
                    selectedKocs: Array(156).fill(null),
                    kocNeeded: 110,
                    image: "/vietnamese-fish-sauce.png",
                  },
                  {
                    id: "static-3",
                    merchant: "Bảo Xuân",
                    title: "Tặng 800.000đ và 02 sản phẩm Bảo Xuân Gold + 01 sản phẩm Bảo Xuân Nano",
                    reward: "800",
                    category: "Sức khỏe",
                    status: "selection",
                    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                    selectedKocs: Array(171).fill(null),
                    kocNeeded: 30,
                    image: "/golden-supplement-package.png",
                  },
                ].map((campaign) => {
                  const daysLeft = Math.max(
                    0,
                    Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                  )
                  const statusBadge = getStatusBadge(campaign.status, daysLeft)

                  return (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-2xl border-0 shadow-sm"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden rounded-xl mx-3 mt-3">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{campaign.merchant?.charAt(0) || "M"}</span>
                          </div>
                          <span className="text-gray-600 text-sm font-medium">{campaign.merchant}</span>
                        </div>

                        <CardTitle className="text-base font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                          {campaign.title}
                        </CardTitle>

                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>
                              {campaign.selectedKocs?.length || 0}/{campaign.kocNeeded}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              Còn{" "}
                              {Math.max(
                                0,
                                Math.ceil(
                                  (new Date(campaign.deadline).getTime() - new Date().getTime()) /
                                    (1000 * 60 * 60 * 24),
                                ),
                              )}{" "}
                              ngày
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>Toàn quốc</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs ${statusBadge.color} text-white px-2 py-1 rounded-full font-medium border-0`}
                            >
                              {statusBadge.text}
                            </Badge>
                            <div className="flex gap-1">
                              <PlatformIcon platform="tiktok" />
                              <PlatformIcon platform="facebook" />
                              <PlatformIcon platform="instagram" />
                            </div>
                          </div>
                          <Badge className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold">
                            {campaign.reward}.000đ
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                            asChild
                          >
                            <Link to={`/campaigns/${campaign.id}`}>Chi tiết</Link>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 text-xs bg-pink-500 hover:bg-pink-600 text-white font-medium"
                            asChild
                          >
                            <Link to={`/campaigns/${campaign.id}/apply`}>Ứng tuyển</Link>
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  )
                })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">IKK trong con số</h2>
            <p className="text-xl text-gray-600">Nền tảng KOC marketing đáng tin cậy nhất Việt Nam</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "#ff0086" }}>
                50K+
              </div>
              <p className="text-gray-600 text-lg">KOCs hoạt động</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "#ff0086" }}>
                1,200+
              </div>
              <p className="text-gray-600 text-lg">Thương hiệu đối tác</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "#ff0086" }}>
                10M+
              </div>
              <p className="text-gray-600 text-lg">Lượt reach hàng tháng</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: "#ff0086" }}>
                98.5%
              </div>
              <p className="text-gray-600 text-lg">Độ hài lòng khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Câu chuyện thành công</h2>
            <p className="text-xl text-gray-600">Nghe từ những KOCs và thương hiệu thành công</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "IKK đã giúp tôi kiếm được thu nhập ổn định từ việc tạo nội dung. Các chiến dịch đều chất lượng và thanh toán đúng hạn."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Linh Nguyen</div>
                  <div className="text-sm text-gray-600">Beauty KOC • 50K followers</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Nền tảng này rất dễ sử dụng và hiệu quả. Chúng tôi đã tìm được nhiều KOC phù hợp cho thương hiệu."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trung Le</div>
                  <div className="text-sm text-gray-600">Marketing Manager • L'Oreal Vietnam</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "ROI từ các chiến dịch KOC trên IKK vượt xa mong đợi. Đây là kênh marketing không thể thiếu."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Mai Pham</div>
                  <div className="text-sm text-gray-600">Brand Director • Highlands Coffee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Bắt đầu hành trình của bạn ngay hôm nay</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng KOC và thương hiệu lớn nhất Việt Nam. Tạo ra những chiến dịch thành công và thu nhập bền vững.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link to="/koc-app">Đăng ký KOC</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link to="/brand-dashboard">Đăng ký thương hiệu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: "#ff0086" }}
                >
                  IKK
                </div>
                <span className="font-bold text-xl">IKK Platform</span>
              </div>
              <p className="text-gray-400 mb-6">
                Nền tảng kết nối KOC và thương hiệu hàng đầu Việt Nam, tạo ra những chiến dịch marketing hiệu quả và sáng tạo.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dành cho KOC</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/koc/register" className="block hover:text-gray-300">
                  Đăng ký KOC
                </Link>
                <Link to="/koc/campaigns" className="block hover:text-gray-300">
                  Chiến dịch KOC
                </Link>
                <Link to="/koc/ranking" className="block hover:text-gray-300">
                  Bảng xếp hạng
                </Link>
                <Link to="/koc/community" className="block hover:text-gray-300">
                  Cộng đồng
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dành cho Publisher</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/affiliate/register" className="block hover:text-gray-300">
                  Đăng ký Affiliate
                </Link>
                <Link to="/affiliate/campaigns" className="block hover:text-gray-300">
                  Chiến dịch Affiliate
                </Link>
                <Link to="/affiliate/tools" className="block hover:text-gray-300">
                  Công cụ
                </Link>
                <Link to="/affiliate/analytics" className="block hover:text-gray-300">
                  Analytics
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/help" className="block hover:text-gray-300">
                  Trung tâm trợ giúp
                </Link>
                <Link to="/contact" className="block hover:text-gray-300">
                  Liên hệ
                </Link>
                <Link to="/terms" className="block hover:text-gray-300">
                  Điều khoản
                </Link>
                <Link to="/privacy" className="block hover:text-gray-300">
                  Chính sách bảo mật
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 IKK Platform. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}