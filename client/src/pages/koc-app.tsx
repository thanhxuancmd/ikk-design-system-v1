import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Star,
  TrendingUp,
  Award,
  MessageCircle,
  Bell,
  Eye,
  Heart,
  Play,
  Calendar,
  MapPin,
  Clock,
  Target,
  Gift,
  DollarSign,
  Camera,
  Video,
  Share2
} from "lucide-react";

// Mock KOC data
const mockKOCData = {
  profile: {
    name: "Nguyễn Minh Anh",
    email: "minhanh@example.com",
    avatar: "/placeholder-user.jpg",
    followers: {
      facebook: 15000,
      instagram: 25000,
      tiktok: 45000,
      youtube: 8000,
    },
    categories: ["Làm đẹp", "Fashion", "Lifestyle"],
    location: "TP.HCM",
    rating: 4.8,
    completedCampaigns: 24,
    totalPoints: 12500,
    level: "Micro",
    joinedDate: "2023-06-15",
    isVerified: true,
  },
  stats: {
    totalReach: 89000,
    totalEngagement: 3200,
    campaignsCompleted: 24,
    averageRating: 4.8,
    totalEarnings: 8500000
  },
  activeCampaigns: [
    {
      id: 1,
      title: "Review son môi Maybelline SuperStay",
      brand: "Maybelline Vietnam",
      reward: "800P",
      deadline: "30/08/2025",
      status: "content_creation",
      progress: 60,
      requirements: [
        "Tạo 1 video TikTok review chi tiết",
        "Đăng story Instagram với hashtag",
        "Tag 3 bạn bè trong bài viết"
      ],
      platforms: ["TikTok", "Instagram"]
    },
    {
      id: 2,
      title: "Check-in Highlands Coffee",
      brand: "Highlands Coffee",
      reward: "500P + Voucher 200K",
      deadline: "05/09/2025",
      status: "pending",
      progress: 20,
      requirements: [
        "Check-in tại cửa hàng Highlands",
        "Chụp ảnh với sản phẩm",
        "Viết review chi tiết"
      ],
      platforms: ["Instagram", "Facebook"]
    }
  ],
  availableCampaigns: [
    {
      id: 3,
      title: "Trải nghiệm kem nền L'Oreal Paris",
      brand: "L'Oreal Paris",
      reward: "1200P",
      participants: "23/50",
      deadline: "7 ngày",
      category: "Làm đẹp",
      requirements: ["Nữ 18-35 tuổi", "Da hỗn hợp/nhờn", "5K+ followers"],
      platforms: ["TikTok", "Instagram", "YouTube"]
    },
    {
      id: 4,
      title: "Review nước hoa Chanel",
      brand: "Chanel",
      reward: "2000P",
      participants: "12/30",
      deadline: "5 ngày",
      category: "Làm đẹp",
      requirements: ["Nữ 25-45 tuổi", "Yêu thích nước hoa", "10K+ followers"],
      platforms: ["Instagram", "YouTube"]
    }
  ],
  recentEarnings: [
    {
      campaign: "Foundation FitMe review",
      amount: 800,
      date: "25/08/2025",
      status: "completed"
    },
    {
      campaign: "Highlands Coffee check-in",
      amount: 500,
      date: "22/08/2025", 
      status: "completed"
    },
    {
      campaign: "Bonus tháng 8",
      amount: 1500,
      date: "20/08/2025",
      status: "completed"
    }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "content_creation":
      return <Badge className="bg-blue-500 text-white">Đang tạo content</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500 text-white">Chờ duyệt</Badge>;
    case "completed":
      return <Badge className="bg-green-500 text-white">Hoàn thành</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 text-white">Từ chối</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const PlatformIcon = ({ platform }: { platform: string }) => {
  const iconStyle = "w-4 h-4 rounded-sm p-0.5 text-white text-xs font-bold";
  
  switch (platform.toLowerCase()) {
    case "tiktok":
      return <div className={`${iconStyle} bg-black`}>TT</div>;
    case "instagram": 
      return <div className={`${iconStyle} bg-gradient-to-r from-purple-500 to-pink-500`}>IG</div>;
    case "facebook":
      return <div className={`${iconStyle} bg-blue-600`}>FB</div>;
    case "youtube":
      return <div className={`${iconStyle} bg-red-600`}>YT</div>;
    default:
      return <div className={`${iconStyle} bg-gray-500`}>{platform.slice(0, 2).toUpperCase()}</div>;
  }
};

function KOCProfile() {
  const { profile } = mockKOCData;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{profile.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              {profile.isVerified && (
                <Badge className="bg-blue-500 text-white text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{profile.email}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {profile.rating}/5.0
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                {profile.location}
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-purple-500" />
                Level {profile.level}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-pink-600">
              {profile.followers.tiktok.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">TikTok</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {profile.followers.instagram.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Instagram</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {profile.followers.facebook.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Facebook</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">
              {profile.followers.youtube.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">YouTube</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.categories.map((category, idx) => (
            <Badge key={idx} variant="outline">{category}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KOCStats() {
  const { stats } = mockKOCData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold">{(stats.totalReach / 1000).toFixed(0)}K</div>
          <div className="text-xs text-muted-foreground">Total Reach</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold">{(stats.totalEngagement / 1000).toFixed(1)}K</div>
          <div className="text-xs text-muted-foreground">Engagement</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">{stats.campaignsCompleted}</div>
          <div className="text-xs text-muted-foreground">Campaigns</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
          <div className="text-2xl font-bold">{stats.averageRating}</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">{(stats.totalEarnings / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-muted-foreground">Earnings</div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActiveCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Chiến dịch đang tham gia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockKOCData.activeCampaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{campaign.title}</h4>
                  <p className="text-muted-foreground">{campaign.brand}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Deadline: {campaign.deadline}
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4" />
                      {campaign.reward}
                    </div>
                  </div>
                </div>
                {getStatusBadge(campaign.status)}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Tiến độ hoàn thành</span>
                  <span>{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Yêu cầu:</p>
                <ul className="text-sm space-y-1">
                  {campaign.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {campaign.platforms.map((platform, idx) => (
                    <PlatformIcon key={idx} platform={platform} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" data-testid={`button-upload-content-${campaign.id}`}>
                    <Camera className="h-4 w-4 mr-1" />
                    Upload Content
                  </Button>
                  <Button size="sm" data-testid={`button-view-details-${campaign.id}`}>
                    Chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AvailableCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Chiến dịch có sẵn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockKOCData.availableCampaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{campaign.category}</Badge>
                    <div className="text-xs text-muted-foreground">
                      {campaign.participants} • Còn {campaign.deadline}
                    </div>
                  </div>
                  <h4 className="font-semibold">{campaign.title}</h4>
                  <p className="text-muted-foreground">{campaign.brand}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary text-lg">{campaign.reward}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Yêu cầu:</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.requirements.map((req, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {campaign.platforms.map((platform, idx) => (
                    <PlatformIcon key={idx} platform={platform} />
                  ))}
                </div>
                <Button size="sm" data-testid={`button-apply-${campaign.id}`}>
                  Ứng tuyển
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentEarnings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Thu nhập gần đây
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockKOCData.recentEarnings.map((earning, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{earning.campaign}</p>
                <p className="text-xs text-muted-foreground">{earning.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+{earning.amount}P</p>
                <Badge variant="outline" className="text-xs">
                  {earning.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function KOCAppPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">IKK</span>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              IKK KOC App
            </CardTitle>
            <p className="text-gray-600">Đăng nhập để bắt đầu kiếm tiền từ nội dung</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                data-testid="input-password"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => setIsLoggedIn(true)}
              data-testid="button-login"
            >
              Đăng nhập
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Chưa có tài khoản? </span>
              <Button variant="link" className="p-0">Đăng ký ngay</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              KOC Dashboard
            </h1>
            <p className="text-muted-foreground">Quản lý và theo dõi các chiến dịch của bạn</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">MA</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="active">Đang tham gia</TabsTrigger>
            <TabsTrigger value="available">Có sẵn</TabsTrigger>
            <TabsTrigger value="earnings">Thu nhập</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <KOCProfile />
            <KOCStats />
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <ActiveCampaigns />
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <AvailableCampaigns />
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <RecentEarnings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}