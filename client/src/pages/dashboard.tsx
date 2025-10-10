import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  BarChart3,
  ShoppingCart,
  Target
} from 'lucide-react';

// Mock data for dashboard
const mockData = {
  referrals: {
    total: 12,
    active: 8,
    commission: 2450000
  },
  performance: {
    clicks: 12543,
    conversions: 287,
    conversionRate: 2.29,
    totalEarnings: 15420000
  },
  campaigns: [
    {
      id: 1,
      title: "Review son môi Maybelline SuperStay",
      brand: "Maybelline",
      reward: "800P",
      participants: "89/100",
      deadline: "3 ngày",
      status: "active"
    },
    {
      id: 2,
      title: "Trải nghiệm ứng dụng TPBank",
      brand: "TPBank", 
      reward: "1,200P",
      participants: "45/80",
      deadline: "5 ngày",
      status: "recruiting"
    },
    {
      id: 3,
      title: "Check-in Highlands Coffee",
      brand: "Highlands Coffee",
      reward: "500P + Voucher 200K",
      participants: "156/200", 
      deadline: "7 ngày",
      status: "active"
    }
  ],
  recentOrders: [
    {
      id: "ORD-001",
      product: "Son môi Maybelline SuperStay",
      customer: "Nguyễn Thị Mai",
      commission: "125,000 VNĐ",
      status: "completed",
      date: "Hôm nay"
    },
    {
      id: "ORD-002", 
      product: "Kem nền L'Oreal Paris",
      customer: "Trần Văn Nam",
      commission: "89,000 VNĐ",
      status: "pending",
      date: "Hôm qua"
    },
    {
      id: "ORD-003",
      product: "Phấn phủ Maybelline FitMe",
      customer: "Lê Thị Hương",
      commission: "67,000 VNĐ", 
      status: "completed",
      date: "2 ngày trước"
    }
  ]
};

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
              {mockData.referrals.total}
            </div>
            <div className="text-sm text-muted-foreground">Tổng giới thiệu</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
              {mockData.referrals.active}
            </div>
            <div className="text-sm text-muted-foreground">Đang hoạt động</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ff0086" }}>
              {mockData.referrals.commission.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Hoa hồng (đ)</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <code className="flex-1 text-sm">https://ikk.vn/ref/admin123</code>
          <Button size="sm" variant="outline" data-testid="button-copy-referral">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PerformanceOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.performance.clicks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +12% từ tuần trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.performance.conversions}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +8% từ tuần trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockData.performance.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +0.3% từ tuần trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(mockData.performance.totalEarnings / 1000000).toFixed(1)}M</div>
          <p className="text-xs text-muted-foreground">VNĐ tổng thu nhập</p>
        </CardContent>
      </Card>
    </div>
  );
}

function TopCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chiến dịch nổi bật</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.campaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">{campaign.title}</h4>
                <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{campaign.participants}</span>
                  <span>{campaign.deadline}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{campaign.reward}</p>
                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                  {campaign.status === 'active' ? 'Đang chạy' : 'Tuyển KOC'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockData.recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">{order.product}</h4>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{order.commission}</p>
                <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="mt-1">
                  {order.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-muted-foreground">Chào mừng trở lại! Đây là tổng quan hiệu suất của bạn.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PerformanceOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReferralSection />
              <TopCampaigns />
            </div>

            <RecentOrders />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tất cả chiến dịch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>KOC: {campaign.participants}</span>
                          <span>Deadline: {campaign.deadline}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{campaign.reward}</p>
                        <Button variant="outline" size="sm" className="mt-2" data-testid={`button-join-${campaign.id}`}>
                          Tham gia
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <RecentOrders />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất theo thời gian</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Clicks tuần này</span>
                        <span>2,543</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Conversions tuần này</span>
                        <span>67</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Earnings tuần này</span>
                        <span>1.2M VNĐ</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>TikTok</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Instagram</span>
                        <span>30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Facebook</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}