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

const menuItems = [
  {
    title: "Tổng quan",
    href: "/brand-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chiến dịch",
    href: "/dashboard/campaigns",
    icon: Target,
    submenu: [
      { title: "Quản lý chiến dịch", href: "/dashboard/campaigns" },
      { title: "Tạo chiến dịch mới", href: "/dashboard/campaigns/new" },
      { title: "Chiến dịch KOC", href: "/dashboard/campaigns/koc" },
      { title: "Chiến dịch Affiliate", href: "/dashboard/campaigns/affiliate" },
    ],
  },
  {
    title: "Quản lý KOC",
    href: "/dashboard/koc-management",
    icon: Users,
    submenu: [
      { title: "Tìm kiếm KOC", href: "/dashboard/koc-search" },
      { title: "Hồ sơ KOC", href: "/dashboard/koc-profiles" },
      { title: "Xếp hạng KOC", href: "/dashboard/koc-ranking" },
      { title: "Hợp đồng", href: "/dashboard/koc-contracts" },
    ],
  },
  {
    title: "Nội dung",
    href: "/dashboard/content",
    icon: Eye,
    submenu: [
      { title: "Duyệt nội dung", href: "/dashboard/content-approval" },
      { title: "Thư viện nội dung", href: "/dashboard/content-library" },
      { title: "Hướng dẫn tạo nội dung", href: "/dashboard/content-guidelines" },
    ],
  },
  {
    title: "Báo cáo",
    href: "/dashboard/reports",
    icon: BarChart3,
    submenu: [
      { title: "Hiệu suất chiến dịch", href: "/dashboard/reports/campaigns" },
      { title: "Phân tích ROI", href: "/dashboard/reports/roi" },
      { title: "Báo cáo KOC", href: "/dashboard/reports/koc" },
      { title: "Engagement Analytics", href: "/dashboard/reports/engagement" },
    ],
  },
  {
    title: "Ngân sách",
    href: "/dashboard/budget",
    icon: DollarSign,
    submenu: [
      { title: "Quản lý ngân sách", href: "/dashboard/budget-management" },
      { title: "Thanh toán KOC", href: "/dashboard/payments" },
      { title: "Báo cáo chi phí", href: "/dashboard/budget-reports" },
    ],
  },
  {
    title: "Cài đặt",
    href: "/dashboard/settings",
    icon: Settings,
    submenu: [
      { title: "Thông tin thương hiệu", href: "/dashboard/brand-profile" },
      { title: "Cài đặt chiến dịch", href: "/dashboard/campaign-settings" },
      { title: "Quản lý người dùng", href: "/dashboard/user-management" },
    ],
  },
]

const kpiData = {
  totalClicks: 12543,
  totalConversions: 287,
  totalCommission: 15420000,
  conversionRate: 2.29,
  epc: 1230000,
  totalReach: 2850000,
  totalEngagement: 118500,
  engagementRate: 4.16,
  totalKOCs: 1247,
  activeCampaigns: 8,
  contentPieces: 342,
  avgCostPerEngagement: 130000,
  brandMentions: 892,
  totalBudget: 45000000,
  budgetUsed: 32500000,
  avgROI: 3.2,
  totalPartners: 156,
  pendingApprovals: 23,
  contentApprovalRate: 94.5,
}

function Sidebar() {
  const [location] = useLocation()

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IKK</span>
          </div>
          <span className="font-semibold text-gray-900">Brand Portal</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.href}>
              <WouterLink href={item.href}>
                <div
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    location === item.href
                      ? "bg-pink-50 text-[#ff0086] border-r-2 border-[#ff0086]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </div>
              </WouterLink>

              {item.submenu && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <WouterLink key={subItem.href} href={subItem.href}>
                      <div
                        className={`block px-3 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer ${
                          location === subItem.href && "text-[#ff0086] bg-pink-50"
                        }`}
                      >
                        {subItem.title}
                      </div>
                    </WouterLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Brand Management Dashboard</h2>
          <p className="text-gray-600 mt-1">Quản lý chiến dịch thương hiệu và hợp tác với KOC</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Cập nhật lần cuối:</span>
          <span className="font-medium">{new Date().toLocaleString("vi-VN")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Ngân sách khả dụng</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((kpiData.totalBudget - kpiData.budgetUsed) / 1000000).toFixed(1)}M₫</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Còn lại {Math.round(((kpiData.totalBudget - kpiData.budgetUsed) / kpiData.totalBudget) * 100)}% ngân sách
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Chiến dịch đang chạy</CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.activeCampaigns}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 chiến dịch tuần này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Đối tác KOC</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalPartners}</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              {kpiData.pendingApprovals} đang chờ duyệt
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">ROI Trung bình</CardTitle>
            <Award className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.avgROI}x</div>
            <p className="text-xs opacity-90 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Tăng 0.2x so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Thao tác nhanh</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WouterLink href="/dashboard/campaigns/new">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent">
              <Target className="h-6 w-6" />
              <span className="text-sm">Tạo Chiến dịch</span>
            </Button>
          </WouterLink>

          <WouterLink href="/dashboard/koc-search">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span className="text-sm">Tìm KOC</span>
            </Button>
          </WouterLink>

          <WouterLink href="/dashboard/reports">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Báo cáo ROI</span>
            </Button>
          </WouterLink>

          <WouterLink href="/dashboard/content-approval">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center space-y-2 bg-transparent">
              <Eye className="h-6 w-6" />
              <span className="text-sm">Duyệt Nội dung</span>
            </Button>
          </WouterLink>
        </div>
      </CardContent>
    </Card>
  )
}

function ReferralSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Link giới thiệu
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
              12
            </div>
            <div className="text-sm text-muted-foreground">Tổng giới thiệu</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
              8
            </div>
            <div className="text-sm text-muted-foreground">Đang hoạt động</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
              2.450.000
            </div>
            <div className="text-sm text-muted-foreground">Hoa hồng (đ)</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <code className="flex-1 text-sm">https://ikk.vn/ref/admin123</code>
          <Button size="sm" variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
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

function BrandMarketingStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">{kpiData.activeCampaigns}</div>
              <div className="text-sm text-muted-foreground">Chiến dịch đang chạy</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">{kpiData.totalPartners}</div>
              <div className="text-sm text-muted-foreground">Đối tác KOC</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">{(kpiData.budgetUsed / 1000000).toFixed(1)}M₫</div>
              <div className="text-sm text-muted-foreground">Ngân sách đã dùng</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-pink-600">{kpiData.contentApprovalRate}%</div>
              <div className="text-sm text-muted-foreground">Tỷ lệ duyệt content</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ContentManagementStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{kpiData.contentPieces}</div>
              <div className="text-sm text-muted-foreground">Nội dung đã tạo</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{kpiData.pendingApprovals}</div>
              <div className="text-sm text-muted-foreground">Chờ duyệt</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{kpiData.contentApprovalRate}%</div>
              <div className="text-sm text-muted-foreground">Tỷ lệ duyệt</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{kpiData.brandMentions}</div>
              <div className="text-sm text-muted-foreground">Brand mentions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BrandQuickTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-pink-500" />
          Công cụ Thương hiệu
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <WouterLink href="/dashboard/koc-search">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <Search className="h-5 w-5 text-pink-500" />
            <span className="text-sm">Tìm KOC</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/campaigns/new">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <Target className="h-5 w-5 text-pink-500" />
            <span className="text-sm">Tạo Chiến dịch</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/content-approval">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <Eye className="h-5 w-5 text-pink-500" />
            <span className="text-sm">Duyệt Content</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/budget-management">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <DollarSign className="h-5 w-5 text-pink-500" />
            <span className="text-sm">Quản lý Ngân sách</span>
          </Button>
        </WouterLink>
      </CardContent>
    </Card>
  )
}

function ContentQuickTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-500" />
          Quản lý Nội dung
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <WouterLink href="/dashboard/content-approval">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <Eye className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Duyệt Nội dung</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/content-library">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <FileText className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Thư viện</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/content-guidelines">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <Settings className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Hướng dẫn</span>
          </Button>
        </WouterLink>
        <WouterLink href="/dashboard/reports/engagement">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent w-full">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <span className="text-sm">Phân tích</span>
          </Button>
        </WouterLink>
      </CardContent>
    </Card>
  )
}

function TopCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Chiến dịch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: "Review son môi Maybelline", reward: "800P", participants: "89/100" },
            { name: "Trải nghiệm TPBank", reward: "1,200P", participants: "45/80" },
            { name: "Check-in Highlands Coffee", reward: "500P", participants: "156/200" },
          ].map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{campaign.name}</div>
                <div className="text-sm text-muted-foreground">{campaign.participants}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold" style={{ color: "#ff0086" }}>{campaign.reward}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { id: "#12345", status: "Đã duyệt", amount: "2,450,000₫", date: "15/08/2024" },
            { id: "#12346", status: "Tạm duyệt", amount: "1,200,000₫", date: "14/08/2024" },
            { id: "#12347", status: "Đã hủy", amount: "850,000₫", date: "13/08/2024" },
          ].map((order, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-muted-foreground">{order.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{order.amount}</div>
                <div className="text-sm text-muted-foreground">{order.status}</div>
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




export default function BrandDashboardPage() {
  const user = {
    email: "dev@ikk.vn",
    role: "koc", // Updated role to reflect KOC focus
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Brand Management Portal</h1>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-pink-500" />
                  <span className="text-sm text-gray-600">Premium Brand Account</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    5
                  </span>
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-700">Xin chào, {user.email}</span>
                {user.role === "admin" && (
                  <WouterLink href="/admin">
                    <span className="text-sm hover:text-gray-800" style={{ color: "#ff0086" }}>
                      Admin Panel
                    </span>
                  </WouterLink>
                )}
                <span className="text-sm text-gray-500">(Brand Mode)</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <DashboardOverview />
            <QuickActions />

            <Tabs defaultValue="campaigns" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="campaigns" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Quản lý Chiến dịch
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Quản lý Nội dung
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Phân tích & Báo cáo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="campaigns" className="space-y-6">
                <BrandMarketingStats />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <TopCampaigns />
                    <OrderStatusChart />
                    <ReferralSection />
                  </div>
                  <div className="space-y-6">
                    <RecentOrders />
                    <NewsUpdates />
                    <BrandQuickTools />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <ContentManagementStats />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <TopCampaigns />
                    <OrderStatusChart />
                    <ReferralSection />
                  </div>
                  <div className="space-y-6">
                    <RecentOrders />
                    <NewsUpdates />
                    <ContentQuickTools />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium opacity-90">Tổng Click</CardTitle>
                      <MousePointer className="h-4 w-4 opacity-90" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.totalClicks.toLocaleString()}</div>
                      <p className="text-xs opacity-90 mt-1">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +12% so với tuần trước
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium opacity-90">Chuyển đổi</CardTitle>
                      <ShoppingCart className="h-4 w-4 opacity-90" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.totalConversions.toLocaleString()}</div>
                      <p className="text-xs opacity-90 mt-1">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +8% so với tuần trước
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium opacity-90">Hoa hồng</CardTitle>
                      <DollarSign className="h-4 w-4 opacity-90" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{(kpiData.totalCommission / 1000000).toFixed(1)}M₫</div>
                      <p className="text-xs opacity-90 mt-1">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +15% so với tuần trước
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium opacity-90">Conversion Rate</CardTitle>
                      <BarChart3 className="h-4 w-4 opacity-90" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.conversionRate}%</div>
                      <p className="text-xs opacity-90 mt-1">
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                        +0.3% so với tuần trước
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <RecentOrders />
                  <NewsUpdates />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}