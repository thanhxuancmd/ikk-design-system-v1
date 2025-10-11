import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Copy,
  Link,
  Search,
  FileText,
  Zap,
  Heart,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  Award,
  MessageCircle,
  Bell,
  LayoutDashboard, 
  Target, 
  Wrench, 
  BarChart3, 
  CreditCard, 
  HelpCircle, 
  Gift,
  Link2,
  Settings,
  MousePointer,
  ShoppingCart,
  Share2,
} from "lucide-react"
import { Link as WouterLink, useLocation } from "wouter"

// Removed duplicate menuItems - using from shared Sidebar component

const kocPersonalData = {
  // KOC Personal Stats
  myCampaigns: 12,
  activeCampaigns: 3,
  completedCampaigns: 9,
  myContent: 47,
  myFollowers: 15800,
  myTotalViews: 285000,
  myTotalLikes: 12400,
  myEngagementRate: 7.8,
  totalRewards: 2450000,
  pendingRewards: 890000,
  totalPoints: 3420,
  currentLevel: "Gold",
  completionRate: 92.5,
  averageRating: 4.7,
}

// Removed local Sidebar - using shared component

function KOCDashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard KOC của tôi</h2>
          <p className="text-gray-600 mt-1">Theo dõi tiến trình và thành tích cá nhân của bạn</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Level: {kocPersonalData.currentLevel}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Cập nhật lần cuối:</span>
            <span className="font-medium">{new Date().toLocaleString("vi-VN")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Chiến dịch của tôi</CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kocPersonalData.myCampaigns}</div>
            <p className="text-xs opacity-90 mt-1">
              <span className="bg-white/20 px-2 py-1 rounded-full">
                {kocPersonalData.activeCampaigns} đang chạy
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Content đã tạo</CardTitle>
            <FileText className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kocPersonalData.myContent}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5 content tuần này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tổng lượt xem</CardTitle>
            <Eye className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kocPersonalData.myTotalViews / 1000).toFixed(0)}K</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Engagement: {kocPersonalData.myEngagementRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tổng thưởng</CardTitle>
            <Gift className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kocPersonalData.totalRewards / 1000000).toFixed(1)}M</div>
            <p className="text-xs opacity-90 mt-1">
              <span className="bg-white/20 px-2 py-1 rounded-full">
                {kocPersonalData.totalPoints} điểm
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KOCQuickActions() {
  return (
    <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" style={{ color: "#ff0086" }} />
          <span>Thao tác nhanh</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WouterLink href="/dashboard/campaigns">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent hover:bg-pink-50 border-gray-200 hover:border-pink-200 transition-colors" data-testid="button-search-campaigns">
              <Search className="h-6 w-6" style={{ color: "#ff0086" }} />
              <span className="text-sm">Tìm chiến dịch</span>
            </Button>
          </WouterLink>

          <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent hover:bg-pink-50 border-gray-200 hover:border-pink-200 transition-colors" data-testid="button-submit-content">
            <FileText className="h-6 w-6" style={{ color: "#ff0086" }} />
            <span className="text-sm">Nộp content</span>
          </Button>

          <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent hover:bg-pink-50 border-gray-200 hover:border-pink-200 transition-colors" data-testid="button-view-rewards">
            <Gift className="h-6 w-6" style={{ color: "#ff0086" }} />
            <span className="text-sm">Xem phần thưởng</span>
          </Button>

          <WouterLink href="/dashboard/reports">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent hover:bg-pink-50 border-gray-200 hover:border-pink-200 transition-colors" data-testid="button-my-reports">
              <BarChart3 className="h-6 w-6" style={{ color: "#ff0086" }} />
              <span className="text-sm">Báo cáo của tôi</span>
            </Button>
          </WouterLink>
        </div>
      </CardContent>
    </Card>
  )
}

function MyAchievements() {
  const achievements = [
    { icon: Award, title: "Top Content Creator", description: "Top 10% tháng này", earned: true, color: "#ff0086" },
    { icon: Star, title: "Perfect Rating", description: "5 sao từ nhãn hàng", earned: true, color: "#ffc107" },
    { icon: TrendingUp, title: "Growth Champion", description: "Tăng trưởng 50%+", earned: false, color: "#6c757d" },
  ]
  
  return (
    <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" style={{ color: "#ff0086" }} />
          Thành tích của tôi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
                {kocPersonalData.currentLevel}
              </div>
              <div className="text-sm text-muted-foreground">Level hiện tại</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
                {kocPersonalData.totalPoints}
              </div>
              <div className="text-sm text-muted-foreground">Điểm tích lũy</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
                {kocPersonalData.averageRating}
              </div>
              <div className="text-sm text-muted-foreground">Đánh giá TB</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <IconComponent className="h-6 w-6" style={{ color: achievement.earned ? achievement.color : '#6c757d' }} />
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                  {achievement.earned && <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân bố trạng thái đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff0086" }}></div>
              <span className="text-sm">Đã duyệt</span>
            </div>
            <span className="font-semibold">156</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Tạm duyệt</span>
            </div>
            <span className="font-semibold">89</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-sm">Đã hủy</span>
            </div>
            <span className="font-semibold">42</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Công cụ nhanh
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Link className="h-5 w-5" style={{ color: "#ff0086" }} />
          <span className="text-sm">Product Link</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Link className="h-5 w-5" style={{ color: "#ff0086" }} />
          <span className="text-sm">Deep Link</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Search className="h-5 w-5" style={{ color: "#ff0086" }} />
          <span className="text-sm">Tìm Chiến dịch</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <FileText className="h-5 w-5" style={{ color: "#ff0086" }} />
          <span className="text-sm">Báo cáo</span>
        </Button>
      </CardContent>
    </Card>
  )
}

function KOCMarketingStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">156</div>
              <div className="text-sm text-muted-foreground">Chiến dịch KOC</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">2,847</div>
              <div className="text-sm text-muted-foreground">KOCs hoạt động</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">12.5M</div>
              <div className="text-sm text-muted-foreground">Tổng reach</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">4.2%</div>
              <div className="text-sm text-muted-foreground">Engagement rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AffiliateMarketingStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-muted-foreground">Chiến dịch Affiliate</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-muted-foreground">Publishers</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">3.8%</div>
              <div className="text-sm text-muted-foreground">Conversion rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">2.4B₫</div>
              <div className="text-sm text-muted-foreground">Doanh thu</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KOCQuickTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          Công cụ KOC
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Search className="h-5 w-5 text-pink-500" />
          <span className="text-sm">Tìm KOC</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <FileText className="h-5 w-5 text-pink-500" />
          <span className="text-sm">Báo cáo Content</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Eye className="h-5 w-5 text-pink-500" />
          <span className="text-sm">Analytics</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Users className="h-5 w-5 text-pink-500" />
          <span className="text-sm">Quản lý KOC</span>
        </Button>
      </CardContent>
    </Card>
  )
}

function AffiliateQuickTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5 text-blue-500" />
          Công cụ Affiliate
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Link className="h-5 w-5 text-blue-500" />
          <span className="text-sm">Product Link</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Link className="h-5 w-5 text-blue-500" />
          <span className="text-sm">Deep Link</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <Search className="h-5 w-5 text-blue-500" />
          <span className="text-sm">Tìm Chiến dịch</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
          <FileText className="h-5 w-5 text-blue-500" />
          <span className="text-sm">Báo cáo</span>
        </Button>
      </CardContent>
    </Card>
  )
}

function MyCampaigns() {
  const myCampaignData = [
    { name: "Review son môi Maybelline", status: "Hoàn thành", reward: "800P", rating: 4.8, deadline: "Hoàn thành 3 ngày trước" },
    { name: "Trải nghiệm TPBank", status: "Đang chạy", reward: "1,200P", rating: null, deadline: "5 ngày nữa" },
    { name: "Check-in Highlands Coffee", status: "Đang chạy", reward: "500P + Voucher 200K", rating: null, deadline: "7 ngày nữa" },
  ]
  
  return (
    <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" style={{ color: "#ff0086" }} />
          Chiến dịch của tôi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myCampaignData.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{campaign.deadline}</div>
                {campaign.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{campaign.rating}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold" style={{ color: "#ff0086" }}>{campaign.reward}</div>
                <Badge className={campaign.status === "Hoàn thành" ? "bg-green-100 text-green-800 mt-1" : "bg-blue-100 text-blue-800 mt-1"}>
                  {campaign.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MyRecentActivities() {
  const myActivities = [
    { id: "ACT-001", activity: "Nộp content Review Maybelline", status: "Đã duyệt", reward: "+800P", date: "15/08/2024" },
    { id: "ACT-002", activity: "Apply chiến dịch TPBank", status: "Chờ duyệt", reward: "1,200P", date: "14/08/2024" },
    { id: "ACT-003", activity: "Hoàn thành check-in Highlands", status: "Đã duyệt", reward: "+500P + Voucher", date: "13/08/2024" },
  ]
  
  return (
    <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" style={{ color: "#ff0086" }} />
          Hoạt động gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{activity.activity}</div>
                <div className="text-sm text-muted-foreground">{activity.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold" style={{ color: "#ff0086" }}>{activity.reward}</div>
                <Badge className={activity.status === "Đã duyệt" ? "bg-green-100 text-green-800 mt-1" : "bg-yellow-100 text-yellow-800 mt-1"}>
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function NewsUpdates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cập nhật tin tức</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: "Chương trình KOC tháng 8", date: "2 ngày trước" },
            { title: "Cập nhật chính sách hoa hồng", date: "1 tuần trước" },
            { title: "Workshop content marketing", date: "2 tuần trước" },
          ].map((news, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="font-medium">{news.title}</div>
              <div className="text-sm text-muted-foreground">{news.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}




export default function DashboardPage() {
  const user = {
    email: "dev@ikk.vn",
    role: "koc", // Updated role to reflect KOC focus
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Tổng quan Dashboard</h1>
                <Badge className="bg-[#ff0086] text-white">KOC & Affiliate Platform</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Xin chào, {user.email}</span>
                {user.role === "admin" && (
                  <WouterLink href="/admin">
                    <span className="text-sm hover:text-gray-800" style={{ color: "#ff0086" }}>
                      Admin Panel
                    </span>
                  </WouterLink>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <KOCDashboardOverview />
            <KOCQuickActions />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Tổng quan
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Chiến dịch của tôi
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Thành tích & Phần thưởng
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <MyCampaigns />
                    <MyRecentActivities />
                  </div>
                  <div className="space-y-6">
                    <MyAchievements />
                    <NewsUpdates />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <MyCampaigns />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <OrderStatusChart />
                    <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Search className="h-5 w-5" style={{ color: "#ff0086" }} />
                          Tìm chiến dịch mới
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-6">
                          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-600 mb-4">Khám phá các chiến dịch mới phù hợp với bạn</p>
                          <WouterLink href="/dashboard/campaigns">
                            <Button className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg transition-shadow" data-testid="button-browse-campaigns">
                              Duyệt chiến dịch
                            </Button>
                          </WouterLink>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MyAchievements />
                  <Card className="rounded-xl border shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5" style={{ color: "#ff0086" }} />
                        Phần thưởng chờ nhận
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center py-4">
                          <div className="text-3xl font-bold" style={{ color: "#ff0086" }}>
                            {(kocPersonalData.pendingRewards / 1000000).toFixed(1)}M₫
                          </div>
                          <p className="text-gray-600 mt-2">Tổng giá trị chờ nhận</p>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            { campaign: "Review Maybelline", reward: "800P", status: "Chờ duyệt" },
                            { campaign: "Check-in Highlands", reward: "Voucher 200K", status: "Sẵn sàng" },
                            { campaign: "TPBank Content", reward: "1,200P", status: "Chờ hoàn thành" }
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{item.campaign}</div>
                                <div className="text-sm text-muted-foreground">{item.status}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold" style={{ color: "#ff0086" }}>{item.reward}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-lg transition-shadow" data-testid="button-claim-rewards">
                          Nhận phần thưởng
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}