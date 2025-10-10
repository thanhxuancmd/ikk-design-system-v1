import { FaTiktok } from "react-icons/fa"
import {
  Eye,
  Heart,
  Users,
  Video,
  TrendingUp,
  DollarSign,
  Search,
  Filter,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import IKKAdminLayout from "@/components/ikk-admin-layout"

export default function TikTokCampaignsPage() {
  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-tiktok-campaign-management">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-tiktok-campaigns">Quản lý chiến dịch TikTok</h2>
            <p className="text-gray-600" data-testid="text-tiktok-subtitle">Theo dõi và quản lý hiệu suất các chiến dịch TikTok của thương hiệu</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-tiktok">
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc nâng cao</span>
              </span>
            </button>
            <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-create-tiktok-campaign">
              <span className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Tạo chiến dịch TikTok</span>
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng chiến dịch</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-tiktok-campaigns">24</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% so với tháng trước
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <FaTiktok className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng lượt xem</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-tiktok-views">8.5M</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +28% engagement
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tương tác trung bình</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-avg-tiktok-engagement">5.2%</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Cao hơn 3.1% trung bình
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doanh thu tạo ra</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="stat-tiktok-revenue">420M VNĐ</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ROI 3.2x
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm chiến dịch TikTok..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors"
                data-testid="input-search-tiktok-campaigns"
              />
            </div>
            
            <Select>
              <SelectTrigger className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors" data-testid="select-tiktok-status">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="draft">Nháp</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] transition-colors" data-testid="select-tiktok-category">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="beauty">Làm đẹp</SelectItem>
                <SelectItem value="fashion">Thời trang</SelectItem>
                <SelectItem value="food">Ẩm thực</SelectItem>
                <SelectItem value="tech">Công nghệ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'tt-1',
              title: 'Beauty Challenge #GlowUp2025',
              brand: 'L\'Oréal Paris Vietnam',
              status: 'active',
              views: '2.8M',
              engagement: '6.2%',
              revenue: '125M VNĐ',
              kocs: 18,
              videos: 42,
              avatar: 'LP',
              color: 'from-pink-400 to-rose-400'
            },
            {
              id: 'tt-2',
              title: 'Fashion Haul TikTok Series',
              brand: 'Nike Vietnam',
              status: 'active',
              views: '1.9M',
              engagement: '4.8%',
              revenue: '89M VNĐ',
              kocs: 12,
              videos: 28,
              avatar: 'NK',
              color: 'from-orange-400 to-red-400'
            },
            {
              id: 'tt-3',
              title: 'TikTok Food Review Campaign',
              brand: 'Grab Food',
              status: 'active',
              views: '3.2M',
              engagement: '7.1%',
              revenue: '156M VNĐ',
              kocs: 25,
              videos: 68,
              avatar: 'GF',
              color: 'from-green-400 to-emerald-400'
            },
            {
              id: 'tt-4',
              title: 'Tech Unboxing Series',
              brand: 'Samsung Electronics',
              status: 'completed',
              views: '1.4M',
              engagement: '5.3%',
              revenue: '78M VNĐ',
              kocs: 8,
              videos: 16,
              avatar: 'SE',
              color: 'from-blue-400 to-indigo-400'
            },
            {
              id: 'tt-5',
              title: 'Skincare Routine Challenge',
              brand: 'The Face Shop',
              status: 'active',
              views: '2.1M',
              engagement: '6.8%',
              revenue: '98M VNĐ',
              kocs: 15,
              videos: 34,
              avatar: 'TF',
              color: 'from-purple-400 to-violet-400'
            },
            {
              id: 'tt-6',
              title: 'TikTok Dance Challenge',
              brand: 'Pepsi Vietnam',
              status: 'draft',
              views: '-',
              engagement: '-',
              revenue: '0 VNĐ',
              kocs: 0,
              videos: 0,
              avatar: 'PV',
              color: 'from-blue-500 to-cyan-500'
            }
          ].map((campaign) => (
            <Card key={campaign.id} className="bg-white border-gray-100 hover:shadow-xl transition-all duration-300 group" data-testid={`card-tiktok-campaign-${campaign.id}`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${campaign.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                      {campaign.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                      <p className="text-xs text-gray-500">{campaign.brand}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge className={`
                    ${campaign.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${campaign.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${campaign.status === 'draft' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                    border
                  `} data-testid={`badge-status-${campaign.id}`}>
                    {campaign.status === 'active' && 'Đang hoạt động'}
                    {campaign.status === 'completed' && 'Đã hoàn thành'}
                    {campaign.status === 'draft' && 'Nháp'}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Eye className="w-3 h-3" />
                      <span>Lượt xem</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.views}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Heart className="w-3 h-3" />
                      <span>Engagement</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.engagement}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Users className="w-3 h-3" />
                      <span>KOC</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.kocs}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                      <Video className="w-3 h-3" />
                      <span>Video</span>
                    </div>
                    <div className="font-bold text-gray-900">{campaign.videos}</div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="pt-4 border-t border-gray-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Doanh thu</span>
                    <span className="text-sm font-bold text-[#ff0086]">{campaign.revenue}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-gray-50 transition-colors"
                    data-testid={`button-view-${campaign.id}`}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Xem chi tiết
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#ff0086] hover:bg-[#e6007a] text-white transition-colors"
                    data-testid={`button-manage-${campaign.id}`}
                  >
                    Quản lý
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TikTok Performance Chart */}
        <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Hiệu suất TikTok theo thời gian</h3>
              <p className="text-sm text-gray-600">Theo dõi xu hướng lượt xem và engagement</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">7 ngày</button>
              <button className="px-3 py-1 text-xs font-medium bg-[#ff0086] text-white rounded-lg">30 ngày</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">90 ngày</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'T2', views: 65, engagement: 45 },
              { day: 'T3', views: 78, engagement: 52 },
              { day: 'T4', views: 92, engagement: 68 },
              { day: 'T5', views: 88, engagement: 61 },
              { day: 'T6', views: 95, engagement: 72 },
              { day: 'T7', views: 100, engagement: 85 },
              { day: 'CN', views: 85, engagement: 58 }
            ].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-pink-500 to-rose-500 rounded-t-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.views}%` }}
                    title={`Views: ${data.views}%`}
                  />
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 cursor-pointer"
                    style={{ height: `${data.engagement}%` }}
                    title={`Engagement: ${data.engagement}%`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-[#ff0086] to-pink-400 rounded"></div>
              <span className="text-xs text-gray-600">Lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-400 rounded"></div>
              <span className="text-xs text-gray-600">Tương tác</span>
            </div>
          </div>
        </div>
      </div>
    </IKKAdminLayout>
  )
}
