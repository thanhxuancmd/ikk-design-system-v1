import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Users,
  Target,
  DollarSign,
  Calendar,
  Eye,
  TrendingUp,
  Edit,
  Trash2,
  Play,
  Pause,
  Settings,
  BarChart3,
  MessageSquare,
  Star
} from 'lucide-react';

// Mock advertiser data
const mockAdvertiserData = {
  overview: {
    activeCampaigns: 8,
    totalSpent: 25400000,
    totalReach: 156000,
    averageCTR: 2.8,
    totalKOCs: 234,
    totalConversions: 1876
  },
  campaigns: [
    {
      id: 1,
      title: "Launch chiến dịch review son môi Maybelline SuperStay",
      brand: "Maybelline Vietnam",
      budget: 50000000,
      spent: 32000000,
      category: "Làm đẹp",
      status: "active",
      kocJoined: 89,
      kocTarget: 100,
      reach: 45600,
      conversions: 287,
      ctr: 2.9,
      startDate: "15/08/2025",
      endDate: "30/08/2025",
      requirements: [
        "Nữ, 18-35 tuổi",
        "Có kinh nghiệm review mỹ phẩm", 
        "Tối thiểu 5K followers"
      ],
      platforms: ["TikTok", "Instagram"],
      reward: "800P per review"
    },
    {
      id: 2,
      title: "Quảng bá ứng dụng mobile banking TPBank",
      brand: "TPBank",
      budget: 80000000,
      spent: 45000000,
      category: "Tài chính",
      status: "active",
      kocJoined: 45,
      kocTarget: 80,
      reach: 28900,
      conversions: 156,
      ctr: 1.8,
      startDate: "10/08/2025",
      endDate: "25/08/2025",
      requirements: [
        "18-45 tuổi",
        "Có tài khoản ngân hàng",
        "Biết sử dụng smartphone"
      ],
      platforms: ["TikTok", "Instagram", "Facebook"],
      reward: "1,200P per install + review"
    },
    {
      id: 3,
      title: "Campaign check-in và review Highlands Coffee",
      brand: "Highlands Coffee",
      budget: 30000000,
      spent: 18000000,
      category: "F&B",
      status: "completed",
      kocJoined: 156,
      kocTarget: 200,
      reach: 67200,
      conversions: 423,
      ctr: 3.2,
      startDate: "01/08/2025",
      endDate: "15/08/2025",
      requirements: [
        "Yêu thích cà phê",
        "Có thể đến cửa hàng",
        "Tạo video review"
      ],
      platforms: ["TikTok", "Instagram"],
      reward: "500P + Voucher 200K"
    }
  ],
  kocApplications: [
    {
      id: 1,
      campaignId: 1,
      kocName: "Nguyễn Thị Mai",
      kocFollowers: 12500,
      kocPlatforms: ["TikTok", "Instagram"],
      applicationDate: "20/08/2025",
      status: "pending",
      previousWork: 5,
      rating: 4.8
    },
    {
      id: 2,
      campaignId: 1,
      kocName: "Trần Văn Nam",
      kocFollowers: 8900,
      kocPlatforms: ["TikTok"],
      applicationDate: "19/08/2025", 
      status: "approved",
      previousWork: 12,
      rating: 4.9
    },
    {
      id: 3,
      campaignId: 2,
      kocName: "Lê Thị Hương",
      kocFollowers: 15600,
      kocPlatforms: ["Instagram", "Facebook"],
      applicationDate: "18/08/2025",
      status: "rejected",
      previousWork: 3,
      rating: 4.2
    }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 text-white">Đang chạy</Badge>;
    case "completed":
      return <Badge className="bg-blue-500 text-white">Hoàn thành</Badge>;
    case "paused":
      return <Badge className="bg-yellow-500 text-white">Tạm dừng</Badge>;
    case "pending":
      return <Badge className="bg-orange-500 text-white">Chờ duyệt</Badge>;
    case "approved":
      return <Badge className="bg-green-500 text-white">Đã duyệt</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 text-white">Từ chối</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

function AdvertiserOverview() {
  const { overview } = mockAdvertiserData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chiến dịch đang chạy</CardTitle>
          <Play className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overview.activeCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +2 chiến dịch mới tuần này
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng chi tiêu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(overview.totalSpent / 1000000).toFixed(1)}M</div>
          <p className="text-xs text-muted-foreground">VNĐ trong tháng này</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng reach</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(overview.totalReach / 1000).toFixed(0)}K</div>
          <p className="text-xs text-muted-foreground">người đã xem</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CTR trung bình</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overview.averageCTR}%</div>
          <p className="text-xs text-muted-foreground">click-through rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">KOCs tham gia</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overview.totalKOCs}</div>
          <p className="text-xs text-muted-foreground">KOCs đang hoạt động</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overview.totalConversions}</div>
          <p className="text-xs text-muted-foreground">tổng chuyển đổi</p>
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Quản lý Chiến dịch</h3>
        <Button data-testid="button-create-campaign">
          <Plus className="h-4 w-4 mr-2" />
          Tạo chiến dịch mới
        </Button>
      </div>

      <div className="space-y-4">
        {mockAdvertiserData.campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">{campaign.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{campaign.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {campaign.startDate} - {campaign.endDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {campaign.platforms.map((platform, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(campaign.status)}
                  <Button variant="ghost" size="sm" data-testid={`button-edit-${campaign.id}`}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {campaign.status === 'active' ? (
                    <Button variant="ghost" size="sm" data-testid={`button-pause-${campaign.id}`}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" data-testid={`button-play-${campaign.id}`}>
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    {(campaign.spent / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Đã chi / {(campaign.budget / 1000000).toFixed(1)}M
                  </div>
                  <Progress 
                    value={(campaign.spent / campaign.budget) * 100} 
                    className="h-2 mt-1" 
                  />
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {campaign.kocJoined}/{campaign.kocTarget}
                  </div>
                  <div className="text-xs text-muted-foreground">KOCs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {campaign.reach.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {campaign.conversions}
                  </div>
                  <div className="text-xs text-muted-foreground">Conversions</div>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Reward: </span>
                    <span className="text-primary">{campaign.reward}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" data-testid={`button-view-kocs-${campaign.id}`}>
                      <Users className="h-4 w-4 mr-1" />
                      Xem KOCs
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-analytics-${campaign.id}`}>
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function KOCApplications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Đơn ứng tuyển KOC
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAdvertiserData.kocApplications.map((application) => (
            <div key={application.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold">{application.kocName}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {application.kocFollowers.toLocaleString()} followers
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {application.rating}/5.0
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      {application.previousWork} chiến dịch trước
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {application.kocPlatforms.map((platform, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-2">
                    {application.applicationDate}
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </div>
              
              {application.status === 'pending' && (
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    data-testid={`button-reject-${application.id}`}
                  >
                    Từ chối
                  </Button>
                  <Button 
                    size="sm" 
                    data-testid={`button-approve-${application.id}`}
                  >
                    Duyệt
                  </Button>
                </div>
              )}

              {application.status === 'approved' && (
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Nhắn tin
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Xem profile
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CreateCampaignForm() {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    budget: '',
    description: '',
    requirements: '',
    platforms: [] as string[],
    reward: '',
    startDate: '',
    endDate: '',
    kocTarget: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = ['Làm đẹp', 'F&B', 'Thời trang', 'Công nghệ', 'Du lịch', 'Tài chính', 'Gaming', 'E-commerce'];
  const platforms = ['TikTok', 'Instagram', 'Facebook', 'YouTube'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo chiến dịch mới</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tên chiến dịch *</Label>
            <Input
              id="title"
              placeholder="VD: Review son môi Maybelline SuperStay"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              data-testid="input-campaign-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Tên thương hiệu *</Label>
            <Input
              id="brand"
              placeholder="VD: Maybelline Vietnam"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              data-testid="input-brand-name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Danh mục *</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)} data-testid="select-category">
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Ngân sách (VNĐ) *</Label>
            <Input
              id="budget"
              placeholder="VD: 50000000"
              type="number"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              data-testid="input-budget"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Platforms *</Label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform}
                type="button"
                size="sm"
                variant={formData.platforms.includes(platform) ? "default" : "outline"}
                onClick={() => {
                  const newPlatforms = formData.platforms.includes(platform)
                    ? formData.platforms.filter(p => p !== platform)
                    : [...formData.platforms, platform];
                  handleInputChange('platforms', newPlatforms);
                }}
                data-testid={`button-platform-${platform.toLowerCase()}`}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Mô tả chiến dịch *</Label>
          <Textarea
            id="description"
            placeholder="Mô tả chi tiết về chiến dịch, yêu cầu đối với KOC..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            data-testid="textarea-description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reward">Phần thưởng</Label>
            <Input
              id="reward"
              placeholder="VD: 800P"
              value={formData.reward}
              onChange={(e) => handleInputChange('reward', e.target.value)}
              data-testid="input-reward"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Ngày bắt đầu</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              data-testid="input-start-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Ngày kết thúc</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              data-testid="input-end-date"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            variant="outline" 
            className="flex-1"
            data-testid="button-save-draft"
          >
            Lưu nháp
          </Button>
          <Button 
            className="flex-1"
            data-testid="button-create-campaign"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo chiến dịch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdvertiserPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advertiser Dashboard</h1>
            <p className="text-muted-foreground">Quản lý chiến dịch và theo dõi hiệu suất KOC</p>
          </div>
          <Button data-testid="button-create-new-campaign">
            <Plus className="h-4 w-4 mr-2" />
            Tạo chiến dịch mới
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
            <TabsTrigger value="koc-applications">KOC Applications</TabsTrigger>
            <TabsTrigger value="create">Tạo chiến dịch</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdvertiserOverview />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignManagement />
          </TabsContent>

          <TabsContent value="koc-applications" className="space-y-6">
            <KOCApplications />
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <CreateCampaignForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}