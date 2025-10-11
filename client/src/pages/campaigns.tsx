"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Clock,
  MapPin,
  Search,
  Filter,
  Plus,
  TrendingUp,
  Star,
  Heart,
  PlusCircle,
  Bookmark,
  Share2,
  CheckCircle,
  ShoppingBag,
  Shirt,
  Target,
  DollarSign,
  X,
} from "lucide-react"
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa"
import { Link } from "wouter"
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
  if (status === "completed") return { text: "kết thúc", color: "bg-gray-500" }
  if (status === "pending") return { text: "đánh giá", color: "bg-yellow-500" }
  if (status === "content_creation") return { text: "đăng bài", color: "bg-blue-500" }
  if (status === "selection") return { text: "tuyển chọn", color: "bg-purple-500" }
  if (status === "recruiting") return { text: "đang tuyển KOC", color: "bg-blue-500" }
  if (status === "active") return { text: "đang hoạt động", color: "bg-green-500" }
  if (daysLeft <= 7) return { text: `D-${daysLeft}`, color: "bg-red-500" }
  return { text: "đang tuyển KOC", color: "bg-blue-500" }
}

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
    case 'Review': return <Star className="w-4 h-4 text-amber-500" />;
    case 'Unboxing': return <ShoppingBag className="w-4 h-4 text-blue-500" />;
    case 'Check-in': return <MapPin className="w-4 h-4 text-green-500" />;
    case 'Styling': return <Shirt className="w-4 h-4 text-purple-500" />;
    default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
  }
};

export default function CampaignsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState<string[]>([])
  const [favoriteCampaigns, setFavoriteCampaigns] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  const campaigns = [
    {
      id: "static-1",
      merchant: "Maybelline Vietnam",
      title: "Review son môi Maybelline SuperStay Matte Ink",
      reward: "2,000,000 VNĐ",
      category: "Beauty & Fashion",
      status: "recruiting",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(89).fill(null),
      kocNeeded: 100,
      image: "/red-maybelline-lipstick.png",
      brandLogo: "/maybelline-logo.png",
      participants: "67/100",
      statusColor: "bg-blue-500",
      daysLeft: 3,
      description: "Review chi tiết dòng son lì lâu trôi với nhiều màu sắc mới",
      engagement: "12.5K",
      countdown: "Còn 3 ngày",
      timeCommitment: "3-5 ngày",
      campaignType: "Review",
      platforms: ["instagram", "tiktok", "youtube"],
      location: "Hồ Chí Minh",
      isUrgent: true
    },
    {
      id: "static-2", 
      merchant: "NƯỚC MẮM CHIN-SU",
      title: "Tặng 1.400.000đ khi mua sản phẩm và review trên TikTok",
      reward: "1,400,000 VNĐ",
      category: "Food & Lifestyle",
      status: "active",
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(156).fill(null),
      kocNeeded: 110,
      image: "/vietnamese-fish-sauce.png",
      brandLogo: "/chinsu-logo.png",
      participants: "156/110",
      statusColor: "bg-green-500",
      daysLeft: 1,
      description: "Review sản phẩm nước mắm truyền thống Việt Nam",
      engagement: "8.9K",
      countdown: "Còn 1 ngày",
      timeCommitment: "5-7 ngày",
      campaignType: "Check-in",
      platforms: ["tiktok", "facebook", "instagram"],
      location: "Toàn quốc",
      isUrgent: true
    },
    {
      id: "static-3",
      merchant: "Bảo Xuân",
      title: "Tặng 800.000đ và 02 sản phẩm Bảo Xuân Gold + 01 sản phẩm Bảo Xuân Nano",
      reward: "800,000 VNĐ",
      category: "Health & Fitness",
      status: "selection",
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(171).fill(null),
      kocNeeded: 30,
      image: "/golden-supplement-package.png",
      brandLogo: "/baoxuan-logo.png",
      participants: "171/30",
      statusColor: "bg-purple-500",
      daysLeft: 5,
      description: "Trải nghiệm sản phẩm chăm sóc sức khỏe cao cấp",
      engagement: "6.7K",
      countdown: "Còn 5 ngày",
      timeCommitment: "7-10 ngày",
      campaignType: "Review",
      platforms: ["instagram", "facebook", "tiktok"],
      location: "Hà Nội",
      isUrgent: false
    },
    {
      id: "static-4",
      merchant: "TPBank",
      title: "Trải nghiệm ứng dụng ngân hàng TPBank và nhận thưởng",
      reward: "1,200,000 VNĐ",
      category: "Technology",
      status: "recruiting",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(45).fill(null),
      kocNeeded: 80,
      image: "/banking-app-interface.png",
      brandLogo: "/tpbank-logo.png",
      participants: "45/80",
      statusColor: "bg-blue-500",
      daysLeft: 7,
      description: "Trải nghiệm app mobile banking hiện đại",
      engagement: "4.2K",
      countdown: "Còn 7 ngày",
      timeCommitment: "3-5 ngày",
      campaignType: "Review",
      platforms: ["instagram", "tiktok"],
      location: "Toàn quốc",
      isUrgent: false
    },
    {
      id: "static-5",
      merchant: "Highlands Coffee",
      title: "Check-in và review Highlands Coffee tại cửa hàng",
      reward: "500,000 VNĐ",
      category: "Food & Lifestyle",
      status: "active",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(156).fill(null),
      kocNeeded: 200,
      image: "/highlands-coffee-shop.png",
      brandLogo: "/highlands-logo.png",
      participants: "156/200",
      statusColor: "bg-green-500",
      daysLeft: 4,
      description: "Check-in và review trải nghiệm coffee",
      engagement: "14.7K",
      countdown: "Còn 4 ngày",
      timeCommitment: "2-3 ngày",
      campaignType: "Check-in",
      platforms: ["instagram", "facebook", "tiktok"],
      location: "Đà Nẵng",
      isUrgent: false
    },
    {
      id: "static-6",
      merchant: "Unilever Vietnam",
      title: "Review dầu gội Clear Men Deep Clean và chia sẻ trải nghiệm",
      reward: "600",
      category: "Làm đẹp",
      status: "recruiting",
      deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(67).fill(null),
      kocNeeded: 150,
      image: "/clear-men-shampoo.png",
    },
    {
      id: "static-7",
      merchant: "Samsung Vietnam",
      title: "Trải nghiệm và review Galaxy S24 Ultra trong 7 ngày",
      reward: "2,000",
      category: "Công nghệ",
      status: "selection",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(23).fill(null),
      kocNeeded: 50,
      image: "/samsung-galaxy-phone.png",
    },
    {
      id: "static-8",
      merchant: "Vinamilk",
      title: "Review sữa tươi Vinamilk và tạo video sáng tạo",
      reward: "900",
      category: "Đồ ăn, thức uống",
      status: "recruiting",
      deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(134).fill(null),
      kocNeeded: 180,
      image: "/vinamilk-fresh-milk.png",
    },
    {
      id: "static-9",
      merchant: "Nike Vietnam",
      title: "Review giày thể thao Nike Air Max và tạo outfit phối đồ",
      reward: "1,500",
      category: "Thời trang",
      status: "active",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      selectedKocs: Array(78).fill(null),
      kocNeeded: 120,
      image: "/nike-air-max-shoes.png",
    }
  ]

  // Helper functions
  const toggleBookmark = (campaignId: string) => {
    setBookmarkedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const toggleFavorite = (campaignId: string) => {
    setFavoriteCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        campaign.title.toLowerCase().includes(searchLower) ||
        campaign.merchant.toLowerCase().includes(searchLower) ||
        campaign.category.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Show favorites filter
    if (showFavorites && !favoriteCampaigns.includes(campaign.id)) {
      return false
    }
    if (selectedFilter === "joined") {
      // Lọc các chiến dịch đã tham gia (giả lập)
      return false
    }
    if (selectedFilter === "rewards") {
      // Lọc các chiến dịch săn thưởng (giả lập)
      return false
    }
    if (selectedCategory !== "all" && campaign.category !== selectedCategory) {
      return false
    }
    if (selectedStatus !== "all" && campaign.status !== selectedStatus) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Chiến dịch KOC đặc sắc</h1>
                <Badge className="bg-[#ff0086] text-white">{campaigns.filter(c => c.status === 'recruiting' || c.status === 'active').length} khả dụng</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  className={`${showFavorites ? 'bg-[#ff0086] text-white' : 'bg-white border border-[#ff0086] text-[#ff0086]'} hover:bg-[#e6007a] hover:text-white`}
                  onClick={() => setShowFavorites(!showFavorites)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${showFavorites ? 'fill-current' : ''}`} />
                  {showFavorites ? 'Tất cả' : 'Yêu thích'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm chiến dịch theo tên thương hiệu, sản phẩm..."
                  className="pl-10 pr-10 h-12 rounded-xl border-2 border-gray-200 focus:border-[#ff0086] bg-white"
                  data-testid="input-search-campaigns"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Controls */}
              <div className="flex gap-3">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[180px] h-12 rounded-xl border-2 border-gray-200">
                    <SelectValue placeholder="Loại chiến dịch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả chiến dịch</SelectItem>
                    <SelectItem value="joined">Đã tham gia</SelectItem>
                    <SelectItem value="rewards">Săn thưởng</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px] h-12 rounded-xl border-2 border-gray-200">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Làm đẹp">Làm đẹp</SelectItem>
                    <SelectItem value="Đồ ăn, thức uống">F&B</SelectItem>
                    <SelectItem value="Sức khỏe">Sức khỏe</SelectItem>
                    <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                    <SelectItem value="Thời trang">Thời trang</SelectItem>
                    <SelectItem value="Tài chính">Tài chính</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px] h-12 rounded-xl border-2 border-gray-200">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="recruiting">Đang tuyển</SelectItem>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="selection">Tuyển chọn</SelectItem>
                    <SelectItem value="completed">Kết thúc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>


        {/* Campaign Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {showFavorites ? "Chiến dịch yêu thích" :
                   selectedFilter === "all" ? "Chiến dịch KOC đặc sắc" : 
                   selectedFilter === "joined" ? "Chiến dịch đã tham gia" :
                   "Săn thưởng chiến dịch"}
                </h2>
                {(searchTerm || showFavorites) && (
                  <p className="text-sm text-gray-600 mt-1">
                    {searchTerm && `Tìm kiếm: "${searchTerm}" • `}
                    {filteredCampaigns.length} kết quả
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-transparent" 
                  data-testid="button-reset-filters" 
                  onClick={() => {
                    setSelectedFilter("all")
                    setSelectedCategory("all")
                    setSelectedStatus("all")
                    setSearchTerm("")
                    setShowFavorites(false)
                  }}
                >
                  Xóa bộ lọc
                </Button>
                <Button variant="outline" asChild data-testid="button-view-active-campaigns">
                  <Link href="/dashboard/campaigns?filter=active">Đang hoạt động</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(selectedFilter === "joined" || selectedFilter === "rewards") ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    {selectedFilter === "joined" ? "Bạn chưa tham gia chiến dịch nào" : "Không có chiến dịch săn thưởng nào hiện tại"}
                  </p>
                </div>
              ) : (
                filteredCampaigns.map((campaign) => {
                  const statusBadge = getStatusBadge(campaign.status, campaign.daysLeft || 0)

                  return (
                    <Link key={campaign.id} href={`/campaigns/${campaign.id}/apply`}>
                      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden"
                        data-testid={`campaign-card-${campaign.id}`}>
                        {/* Campaign Image */}
                        <div className="relative overflow-hidden">
                          <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                            <img 
                              src={campaign.image || "/cosmetic-lipstick-beauty.png"} 
                              alt={campaign.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/cosmetic-lipstick-beauty.png";
                              }}
                            />
                          </div>
                          
                          {/* Status Badge & Platforms */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {/* Compact Status Badge */}
                              <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${statusBadge.color}`}>
                                <span>{statusBadge.text}</span>
                              </div>
                              {/* Days Left Indicator */}
                              {(campaign.daysLeft || 0) <= 7 && (
                                <div className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-yellow-400 text-gray-900 shadow-sm">
                                  {campaign.daysLeft || 0} ngày
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {(campaign.platforms || []).slice(0, 2).map((platform, idx) => (
                                <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  {getPlatformIcon(platform)}
                                </div>
                              ))}
                              {(campaign.platforms || []).length > 2 && (
                                <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  <span className="text-xs font-bold text-gray-600">+{(campaign.platforms || []).length - 2}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Brand with Logo and Campaign Type */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {/* Brand Logo */}
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                  src={campaign.brandLogo} 
                                  alt={campaign.merchant}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                      (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                  }}
                                />
                                {/* Fallback for missing logo */}
                                <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                                  {(campaign.merchant || 'C').charAt(0)}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">{campaign.merchant || 'Thương hiệu'}</span>
                                <span className="text-xs text-gray-500">{campaign.category || 'Danh mục'}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getCampaignTypeIcon(campaign.campaignType || 'Review')}
                              <span className="text-xs font-medium text-gray-600">{campaign.campaignType || 'Review'}</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                            {campaign.title}
                          </h3>
                          
                          {/* Reward Info - Premium Style */}
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
                          
                          {/* Campaign Meta Info */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-3">
                                <div className={`flex items-center space-x-1 ${(campaign.daysLeft || 0) <= 7 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    {(campaign.daysLeft || 0) <= 7 
                                      ? `Còn ${campaign.daysLeft || 0} ngày` 
                                      : campaign.deadline
                                    }
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-3 h-3 text-red-500" />
                                  <span>{campaign.engagement}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-xs font-medium text-[#ff0086]">
                                <Clock className="w-3 h-3" />
                                <span>{campaign.countdown}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Location */}
                          <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                            <MapPin className="w-3 h-3 text-blue-500" />
                            <span>{campaign.location}</span>
                          </div>
                          
                          {/* Action Buttons - Premium Style */}
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                              <PlusCircle className="w-4 h-4" />
                              <span>Ứng tuyển</span>
                            </button>
                            <button 
                              className={`p-2 border rounded-lg transition-colors group ${
                                bookmarkedCampaigns.includes(campaign.id) 
                                  ? 'border-[#ff0086] bg-pink-50' 
                                  : 'border-gray-300 hover:border-[#ff0086]'
                              }`}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                toggleBookmark(campaign.id)
                              }}
                            >
                              <Bookmark className={`w-4 h-4 transition-colors ${
                                bookmarkedCampaigns.includes(campaign.id)
                                  ? 'text-[#ff0086] fill-current'
                                  : 'text-gray-600 group-hover:text-[#ff0086]'
                              }`} />
                            </button>
                            <button 
                              className={`p-2 border rounded-lg transition-colors group ${
                                favoriteCampaigns.includes(campaign.id) 
                                  ? 'border-[#ff0086] bg-pink-50' 
                                  : 'border-gray-300 hover:border-[#ff0086]'
                              }`}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                toggleFavorite(campaign.id)
                              }}
                            >
                              <Heart className={`w-4 h-4 transition-colors ${
                                favoriteCampaigns.includes(campaign.id)
                                  ? 'text-red-500 fill-current'
                                  : 'text-gray-600 group-hover:text-[#ff0086]'
                              }`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Enhanced Statistics & CTA Section - Moved to bottom */}
            <div className="mt-16 pt-12 border-t border-gray-100">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'recruiting' || c.status === 'active').length}</div>
                    <div className="text-xs text-gray-600">Chiến dịch khả dụng</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">15.2K</div>
                    <div className="text-xs text-gray-600">KOC tham gia</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">45B+</div>
                    <div className="text-xs text-gray-600">Tổng giải thưởng</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">850M</div>
                    <div className="text-xs text-gray-600">Lượt tiếp cận</div>
                  </div>
                </div>
                
                <div className="text-center border-t border-gray-100 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng tham gia chiến dịch?</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Khám phá các chiến dịch phù hợp và bắt đầu kiếm thu nhập từ việc chia sẻ sản phẩm
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                      <PlusCircle className="w-4 h-4" />
                      <span>Tìm chiến dịch phù hợp</span>
                    </button>
                    <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-6 py-3 rounded-lg font-semibold transition-colors">
                      Hướng dẫn cho KOC mới
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Load More */}
            {selectedFilter === "all" && filteredCampaigns.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="bg-transparent" data-testid="button-load-more">
                  Xem thêm chiến dịch
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}