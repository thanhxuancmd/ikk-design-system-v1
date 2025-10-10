import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Megaphone,
  Download,
  Plus,
  TrendingUp,
  Activity,
  Users,
  DollarSign,
  Search,
  RefreshCw,
  Play,
  Pause,
  Trash2,
  Tag,
  Eye,
  Edit3,
  MoreHorizontal,
  Heart,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Settings,
  Save
} from "lucide-react"
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa"
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import IKKAdminLayout from "@/components/ikk-admin-layout"

export default function AdminCampaignsPage() {
  const [campaignTab, setCampaignTab] = useState<'all' | 'active' | 'draft' | 'completed' | 'paused'>('all');
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="shadow-sm border border-gray-100">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="heading-campaign-management">Quản lý chiến dịch</h2>
                  <p className="text-sm text-gray-600">Quản lý toàn bộ chiến dịch marketing, theo dõi tiến độ và phân tích hiệu suất</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2" data-testid="button-export-campaigns">
                  <Download className="w-4 h-4" />
                  Xuất dữ liệu
                </Button>
                <Button 
                  className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2"
                  onClick={() => setShowCampaignForm(!showCampaignForm)}
                  data-testid="button-create-campaign"
                >
                  <Plus className="w-4 h-4" />
                  Tạo chiến dịch mới
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-blue-500 text-white hover:bg-blue-500">Tổng</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-total-campaigns">348</p>
                <p className="text-sm text-gray-600">Tổng chiến dịch</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +24 chiến dịch mới tháng này
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-500 text-white hover:bg-green-500">Active</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-active-campaigns">156</p>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
                <p className="text-xs text-green-600 mt-2">89 chiến dịch đang tuyển KOC</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-purple-500 text-white hover:bg-purple-500">KOC</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-koc-participants">2,847</p>
                <p className="text-sm text-gray-600">KOC tham gia</p>
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +342 KOC tuần này
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-orange-500 text-white hover:bg-orange-500">Budget</Badge>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1" data-testid="stat-total-budget">12.4B</p>
                <p className="text-sm text-gray-600">Tổng ngân sách (VNĐ)</p>
                <p className="text-xs text-gray-600 mt-2">8.7B đã chi tiêu (70%)</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex items-center gap-1 overflow-x-auto">
                {[
                  { key: 'all', label: 'Tất cả', count: 348 },
                  { key: 'active', label: 'Đang chạy', count: 156 },
                  { key: 'draft', label: 'Nháp', count: 42 },
                  { key: 'completed', label: 'Hoàn thành', count: 128 },
                  { key: 'paused', label: 'Tạm dừng', count: 22 }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCampaignTab(tab.key as any)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      campaignTab === tab.key
                        ? 'border-[#ff0086] text-[#ff0086]'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    data-testid={`tab-${tab.key}`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên chiến dịch, mã, thương hiệu..."
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] text-sm"
                      data-testid="input-search-campaign"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-category">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="beauty">Làm đẹp</SelectItem>
                      <SelectItem value="fashion">Thời trang</SelectItem>
                      <SelectItem value="food">Ẩm thực</SelectItem>
                      <SelectItem value="tech">Công nghệ</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-platform">
                      <SelectValue placeholder="Nền tảng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Select>
                    <SelectTrigger className="bg-white" data-testid="select-date-range">
                      <SelectValue placeholder="Thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 ngày qua</SelectItem>
                      <SelectItem value="30days">30 ngày qua</SelectItem>
                      <SelectItem value="90days">90 ngày qua</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1">
                  <Button variant="outline" className="w-full" data-testid="button-reset-filter">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]"
                  data-testid="checkbox-select-all"
                />
                <span className="text-sm text-gray-600">Chọn tất cả</span>
                <div className="h-4 w-px bg-gray-300"></div>
                <Button variant="ghost" size="sm" className="text-sm" data-testid="button-bulk-activate">
                  <Play className="w-4 h-4 mr-1" />
                  Kích hoạt
                </Button>
                <Button variant="ghost" size="sm" className="text-sm" data-testid="button-bulk-pause">
                  <Pause className="w-4 h-4 mr-1" />
                  Tạm dừng
                </Button>
                <Button variant="ghost" size="sm" className="text-sm text-red-600" data-testid="button-bulk-delete">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-10</span> trong <span className="font-semibold">156</span> chiến dịch
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-campaigns">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-12 px-4 py-3">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Chiến dịch</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Thương hiệu</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Tiến độ</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">KOC</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Ngân sách</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Performance</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[
                      {
                        id: 'CPG-001',
                        name: 'Review Son Môi Maybelline SuperStay Matte Ink',
                        brand: 'Maybelline New York',
                        brandLogo: 'M',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 75,
                        kocJoined: 89,
                        kocTarget: 100,
                        budget: '85,000,000',
                        spent: '63,750,000',
                        reach: '245K',
                        engagement: '18.5K',
                        conversion: '4.2%'
                      },
                      {
                        id: 'CPG-002',
                        name: 'Unboxing & Tutorial Kem Nền L\'Oréal Paris Infallible',
                        brand: 'L\'Oréal Paris',
                        brandLogo: 'L',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 60,
                        kocJoined: 72,
                        kocTarget: 120,
                        budget: '120,000,000',
                        spent: '72,000,000',
                        reach: '189K',
                        engagement: '14.2K',
                        conversion: '3.8%'
                      },
                      {
                        id: 'CPG-003',
                        name: 'Trải nghiệm Serum Dưỡng Da The Ordinary Niacinamide',
                        brand: 'The Ordinary',
                        brandLogo: 'TO',
                        status: 'recruiting',
                        statusText: 'Tuyển KOC',
                        statusColor: 'bg-blue-100 text-blue-700',
                        progress: 35,
                        kocJoined: 42,
                        kocTarget: 80,
                        budget: '65,000,000',
                        spent: '0',
                        reach: '0',
                        engagement: '0',
                        conversion: '0%'
                      },
                      {
                        id: 'CPG-004',
                        name: 'Review Combo Skincare Cocoon Vietnam',
                        brand: 'Cocoon Vietnam',
                        brandLogo: 'CV',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 90,
                        kocJoined: 95,
                        kocTarget: 100,
                        budget: '95,000,000',
                        spent: '85,500,000',
                        reach: '312K',
                        engagement: '28.4K',
                        conversion: '5.1%'
                      },
                      {
                        id: 'CPG-005',
                        name: 'Makeup Tutorial với Bảng Phấn Mắt Focallure',
                        brand: 'Focallure',
                        brandLogo: 'F',
                        status: 'completed',
                        statusText: 'Hoàn thành',
                        statusColor: 'bg-gray-100 text-gray-700',
                        progress: 100,
                        kocJoined: 60,
                        kocTarget: 60,
                        budget: '48,000,000',
                        spent: '48,000,000',
                        reach: '178K',
                        engagement: '15.8K',
                        conversion: '4.5%'
                      },
                      {
                        id: 'CPG-006',
                        name: 'Check-in Spa & Facial Treatment Mây Spa',
                        brand: 'Mây Spa',
                        brandLogo: 'MS',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 55,
                        kocJoined: 33,
                        kocTarget: 50,
                        budget: '75,000,000',
                        spent: '41,250,000',
                        reach: '156K',
                        engagement: '12.1K',
                        conversion: '3.6%'
                      },
                      {
                        id: 'CPG-007',
                        name: 'Review Nước Hoa Chanel N°5 Limited Edition',
                        brand: 'Chanel',
                        brandLogo: 'C',
                        status: 'paused',
                        statusText: 'Tạm dừng',
                        statusColor: 'bg-yellow-100 text-yellow-700',
                        progress: 25,
                        kocJoined: 15,
                        kocTarget: 40,
                        budget: '150,000,000',
                        spent: '37,500,000',
                        reach: '89K',
                        engagement: '6.2K',
                        conversion: '2.8%'
                      },
                      {
                        id: 'CPG-008',
                        name: 'Thử Thách 7 Ngày Với Sữa Rửa Mặt CeraVe',
                        brand: 'CeraVe',
                        brandLogo: 'Ce',
                        status: 'active',
                        statusText: 'Đang chạy',
                        statusColor: 'bg-green-100 text-green-700',
                        progress: 45,
                        kocJoined: 54,
                        kocTarget: 90,
                        budget: '72,000,000',
                        spent: '32,400,000',
                        reach: '198K',
                        engagement: '16.7K',
                        conversion: '4.0%'
                      }
                    ].map((campaign, idx) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 transition-colors" data-testid={`row-campaign-${idx + 1}`}>
                        <td className="px-4 py-4">
                          <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">{campaign.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {campaign.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{campaign.brandLogo}</span>
                            </div>
                            <span className="text-sm text-gray-900">{campaign.brand}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={campaign.statusColor}>
                            {campaign.statusText}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-32">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-2" />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{campaign.kocJoined}/{campaign.kocTarget}</p>
                            <p className="text-xs text-gray-500">KOC tham gia</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{parseInt(campaign.budget).toLocaleString()}</p>
                            <p className="text-xs text-gray-500">
                              Đã chi: {parseInt(campaign.spent).toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Eye className="w-3 h-3 text-blue-600" />
                              <span className="text-gray-900">{campaign.reach}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Heart className="w-3 h-3 text-pink-600" />
                              <span className="text-gray-900">{campaign.engagement}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <TrendingUp className="w-3 h-3 text-green-600" />
                              <span className="text-gray-900">{campaign.conversion}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-view-${idx + 1}`}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-edit-${idx + 1}`}>
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-more-${idx + 1}`}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Hiệu suất chiến dịch</h3>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="7 ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 ngày</SelectItem>
                      <SelectItem value="30days">30 ngày</SelectItem>
                      <SelectItem value="90days">90 ngày</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { day: 'T2', reach: 45, engagement: 12 },
                      { day: 'T3', reach: 52, engagement: 15 },
                      { day: 'T4', reach: 48, engagement: 13 },
                      { day: 'T5', reach: 61, engagement: 18 },
                      { day: 'T6', reach: 55, engagement: 16 },
                      { day: 'T7', reach: 67, engagement: 21 },
                      { day: 'CN', reach: 72, engagement: 24 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="reach" stackId="1" stroke="#8b5cf6" fill="#c4b5fd" />
                      <Area type="monotone" dataKey="engagement" stackId="1" stroke="#ff0086" fill="#fbb6ce" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top thương hiệu</h3>
                <div className="space-y-3">
                  {[
                    { brand: 'Maybelline', campaigns: 24, budget: '2.1B', color: 'from-pink-500 to-rose-500' },
                    { brand: 'L\'Oréal Paris', campaigns: 18, budget: '1.8B', color: 'from-purple-500 to-indigo-500' },
                    { brand: 'Cocoon Vietnam', campaigns: 15, budget: '1.2B', color: 'from-green-500 to-emerald-500' },
                    { brand: 'The Ordinary', campaigns: 12, budget: '980M', color: 'from-blue-500 to-cyan-500' },
                    { brand: 'CeraVe', campaigns: 10, budget: '750M', color: 'from-orange-500 to-amber-500' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
                          <p className="text-xs text-gray-600">{item.campaigns} chiến dịch</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{item.budget}</p>
                        <p className="text-xs text-gray-500">VNĐ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-10</span> trong tổng số <span className="font-semibold">156</span> chiến dịch
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="button-prev-page">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]" data-testid="button-page-1">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-2">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="button-page-3">
                  3
                </Button>
                <span className="px-2 text-gray-500">...</span>
                <Button variant="outline" size="sm" data-testid="button-page-16">
                  16
                </Button>
                <Button variant="outline" size="sm" data-testid="button-next-page">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Campaign Form Modal */}
            {showCampaignForm && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCampaignForm(false)}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Tạo chiến dịch mới</h3>
                        <p className="text-sm text-gray-600">Điền thông tin để tạo chiến dịch marketing</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowCampaignForm(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#ff0086]" />
                        Thông tin cơ bản
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tên chiến dịch</label>
                          <input
                            type="text"
                            placeholder="Nhập tên chiến dịch..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-campaign-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
                          <Select>
                            <SelectTrigger data-testid="select-brand">
                              <SelectValue placeholder="Chọn thương hiệu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maybelline">Maybelline</SelectItem>
                              <SelectItem value="loreal">L'Oréal Paris</SelectItem>
                              <SelectItem value="cocoon">Cocoon Vietnam</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                          <Select>
                            <SelectTrigger data-testid="select-category-form">
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beauty">Làm đẹp</SelectItem>
                              <SelectItem value="fashion">Thời trang</SelectItem>
                              <SelectItem value="food">Ẩm thực</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chiến dịch</label>
                          <textarea
                            rows={4}
                            placeholder="Nhập mô tả chi tiết về chiến dịch..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086] resize-none"
                            data-testid="textarea-campaign-description"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#ff0086]" />
                        Chi tiết chiến dịch
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng KOC</label>
                          <input
                            type="number"
                            placeholder="Nhập số lượng..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-koc-count"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngân sách (VNĐ)</label>
                          <input
                            type="text"
                            placeholder="Nhập ngân sách..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-budget"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-start-date"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0086]/20 focus:border-[#ff0086]"
                            data-testid="input-end-date"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nền tảng</label>
                          <div className="flex flex-wrap gap-3">
                            {[
                              { name: 'TikTok', icon: FaTiktok, color: 'bg-black' },
                              { name: 'Instagram', icon: FaInstagram, color: 'bg-pink-500' },
                              { name: 'YouTube', icon: FaYoutube, color: 'bg-red-500' },
                              { name: 'Facebook', icon: FaFacebookF, color: 'bg-blue-600' }
                            ].map((platform) => (
                              <label key={platform.name} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-[#ff0086] cursor-pointer transition-colors">
                                <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded" />
                                <platform.icon className={`w-4 h-4 text-white ${platform.color} p-0.5 rounded`} />
                                <span className="text-sm text-gray-700">{platform.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCampaignForm(false)}
                        data-testid="button-cancel-form"
                      >
                        Hủy bỏ
                      </Button>
                      <Button variant="outline" data-testid="button-save-draft">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu nháp
                      </Button>
                      <Button 
                        className="bg-[#ff0086] hover:bg-[#e6007a] text-white"
                        data-testid="button-create-campaign-submit"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Tạo chiến dịch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </IKKAdminLayout>
  )
}
