import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HiChartBar,
  HiEye,
  HiHeart,
  HiCurrencyDollar,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiCalendar,
  HiChevronDown,
  HiArrowDownTray,
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiShoppingBag
} from "react-icons/hi2"
import { Target } from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import { AppleMetricCard, AppleTabs } from "@/components/apple"

export default function AdminAnalyticsPage() {
  const [selectedReportTab, setSelectedReportTab] = useState<'overview' | 'revenue' | 'performance'>('overview')

  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with HiChartBar Icon */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-analytics">
                  Analytics & Báo cáo
                </CardTitle>
                <p className="text-sm text-gray-600" data-testid="subtitle-analytics">
                  Theo dõi hiệu suất và phân tích dữ liệu chi tiết
                </p>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-analytics">
                  <HiChartBar className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Overview Metrics - Using AppleMetricCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <AppleMetricCard
                title="Tổng lượt xem"
                value="2,456,789"
                change={12.5}
                trend="up"
                icon={<HiEye className="w-5 h-5 text-blue-600" />}
                valueTestId="value-metric-views"
              />
              
              <AppleMetricCard
                title="Tỷ lệ tương tác"
                value="8.42%"
                change={2.3}
                trend="up"
                icon={<HiHeart className="w-5 h-5 text-pink-600" />}
                valueTestId="value-metric-engagement"
              />
              
              <AppleMetricCard
                title="Tổng doanh thu"
                value="456,780,000"
                prefix="đ"
                change={18.7}
                trend="up"
                icon={<HiCurrencyDollar className="w-5 h-5 text-green-600" />}
                valueTestId="value-metric-revenue"
              />
              
              <AppleMetricCard
                title="Tốc độ tăng trưởng"
                value="+24.8%"
                description="Tháng này"
                icon={<HiArrowTrendingUp className="w-5 h-5 text-purple-600" />}
                valueTestId="value-metric-growth"
              />
            </div>

            {/* Time Period & Actions */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {/* Date Range Selector */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <HiCalendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700" data-testid="text-date-range">01-09-2025 - 30-09-2025</span>
                  <HiChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {/* Time Period Dropdown */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-700" data-testid="text-time-period">Theo Tháng</span>
                  <HiChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Export Button */}
              <Button 
                className="bg-[#ff0086] hover:bg-[#e6007a] text-white flex items-center gap-2"
                data-testid="btn-export-report"
              >
                <HiArrowDownTray className="w-4 h-4" />
                Xuất báo cáo
              </Button>
            </div>

            {/* Apple HIG Tabs */}
            <div className="mb-6">
              <AppleTabs
                tabs={[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'revenue', label: 'Phân tích doanh thu' },
                  { id: 'performance', label: 'Hiệu suất KOC' }
                ]}
                activeTab={selectedReportTab}
                onChange={(tabId) => setSelectedReportTab(tabId as 'overview' | 'revenue' | 'performance')}
                variant="underline"
              />
            </div>

            {/* Charts Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng hoạt động 7 ngày qua</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4" data-testid="chart-trends">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart
                    data={[
                      { date: '24/9', views: 42000, engagement: 3500 },
                      { date: '25/9', views: 45000, engagement: 3800 },
                      { date: '26/9', views: 48000, engagement: 4000 },
                      { date: '27/9', views: 52000, engagement: 4400 },
                      { date: '28/9', views: 55000, engagement: 4600 },
                      { date: '29/9', views: 58000, engagement: 4900 },
                      { date: '30/9', views: 62000, engagement: 5200 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#ff0086"
                      strokeWidth={2}
                      name="Lượt xem"
                      dot={{ fill: '#ff0086', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Tương tác"
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#ff0086] rounded-full"></div>
                    <span className="text-xs text-gray-600">Lượt xem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Tương tác</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-analytics">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Chỉ số</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Giá trị hiện tại</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">So với tháng trước</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thay đổi</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mục tiêu</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Views */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-views">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <HiEye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-views">Lượt xem</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-views">2,456,789</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-views">2,182,945</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-views">
                        <HiArrowTrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+12.5%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-views">2,500,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="cell-status-views">
                        Gần đạt
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 2: Clicks */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-clicks">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-clicks">Số click</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-clicks">186,523</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-clicks">145,892</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-clicks">
                        <HiArrowTrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+27.9%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-clicks">150,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-clicks">
                        <HiCheckCircle className="w-3 h-3 mr-1 inline" />
                        Đạt mục tiêu
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 3: Orders */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-orders">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <HiShoppingBag className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-orders">Đơn hàng</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-orders">12,456</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-orders">10,234</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-orders">
                        <HiArrowTrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+21.7%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-orders">11,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="cell-status-orders">
                        <HiCheckCircle className="w-3 h-3 mr-1 inline" />
                        Đạt mục tiêu
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 4: Revenue */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-revenue">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <HiCurrencyDollar className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-revenue">Doanh thu</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-revenue">đ456,780,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-revenue">đ384,920,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-green-600" data-testid="cell-change-revenue">
                        <HiArrowTrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+18.7%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-revenue">đ500,000,000</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="cell-status-revenue">
                        Gần đạt
                      </Badge>
                    </td>
                  </tr>

                  {/* Row 5: ROI */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50" data-testid="row-metric-roi">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <HiArrowTrendingUp className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-900" data-testid="cell-name-roi">ROI</span>
                        <HiInformationCircle className="w-3 h-3 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="cell-current-roi">245%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-previous-roi">312%</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-red-600" data-testid="cell-change-roi">
                        <HiArrowTrendingDown className="w-4 h-4" />
                        <span className="text-sm font-medium">-21.5%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600" data-testid="cell-target-roi">300%</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="cell-status-roi">
                        <HiExclamationCircle className="w-3 h-3 mr-1 inline" />
                        Cần cải thiện
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </IKKAdminLayout>
  )
}
