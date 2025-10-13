import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Calendar,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  BarChart3
} from "lucide-react"
import { AppleMetricCard, AppleTabs } from "@/components/apple"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import IKKAdminLayout from "@/components/ikk-admin-layout"

export default function AdminFinancialPage() {
  const [selectedFinancialTab, setSelectedFinancialTab] = useState<'overview' | 'income' | 'expenses'>('overview')

  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="shadow-sm border border-gray-100">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff0086] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="heading-financial">Quản lý tài chính</h2>
                  <p className="text-sm text-gray-600">Theo dõi doanh thu, chi phí và các giao dịch tài chính</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2" data-testid="button-filter">
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </Button>
                <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2" data-testid="button-export">
                  <Download className="w-4 h-4" />
                  Xuất báo cáo
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Financial Overview Metrics - with explicit i18n props */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* IKK usage (Vietnamese) - demonstrates i18n prop usage */}
              <AppleMetricCard
                title="Tổng doanh thu (VNĐ)"
                value="856.4M"
                change={15.3}
                trend="up"
                changeLabel="so với tháng trước"
                locale="vi-VN"
                description="Tăng so với tháng trước"
                icon={<DollarSign className="w-5 h-5 text-green-600" />}
                valueTestId="stat-revenue"
              />
              {/* External dev would use:
                <AppleMetricCard 
                  title="Total Revenue (USD)"
                  value="856.4M"
                  change={15.3}
                  trend="up"
                  changeLabel="vs last month"
                  locale="en-US"
                  icon={<DollarSign className="w-5 h-5 text-green-600" />}
                />
              */}

              <AppleMetricCard
                title="Tổng chi phí (VNĐ)"
                value="324.2M"
                change={8.2}
                trend="up"
                changeLabel="so với tháng trước"
                locale="vi-VN"
                description="Bao gồm marketing, vận hành"
                icon={<CreditCard className="w-5 h-5 text-red-600" />}
                valueTestId="stat-expenses"
              />

              <AppleMetricCard
                title="Lợi nhuận ròng (VNĐ)"
                value="532.2M"
                change={22.8}
                trend="up"
                changeLabel="so với tháng trước"
                locale="vi-VN"
                description="Tăng trưởng mạnh"
                icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                valueTestId="stat-profit"
              />

              <AppleMetricCard
                title="Công nợ chưa thanh toán (VNĐ)"
                value="128.6M"
                description="12 giao dịch đang chờ"
                locale="vi-VN"
                icon={<AlertCircle className="w-5 h-5 text-orange-600" />}
                valueTestId="stat-outstanding"
              />
            </div>

            {/* Date Range & Period Selector */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Khoảng thời gian:</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Select defaultValue="month">
                    <SelectTrigger className="w-40 bg-white" data-testid="select-period">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">7 ngày qua</SelectItem>
                      <SelectItem value="month">30 ngày qua</SelectItem>
                      <SelectItem value="quarter">90 ngày qua</SelectItem>
                      <SelectItem value="year">12 tháng qua</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                    01-09-2025 - 30-09-2025
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <AppleTabs
                tabs={[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'income', label: 'Thu nhập' },
                  { id: 'expenses', label: 'Chi phí' }
                ]}
                activeTab={selectedFinancialTab}
                onChange={(tabId) => setSelectedFinancialTab(tabId as 'overview' | 'income' | 'expenses')}
                variant="underline"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main Revenue Chart */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Biểu đồ doanh thu và chi phí</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Doanh thu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Chi phí</span>
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: 'T3', revenue: 680, expenses: 280 },
                        { month: 'T4', revenue: 720, expenses: 295 },
                        { month: 'T5', revenue: 750, expenses: 305 },
                        { month: 'T6', revenue: 790, expenses: 310 },
                        { month: 'T7', revenue: 820, expenses: 318 },
                        { month: 'T8', revenue: 840, expenses: 320 },
                        { month: 'T9', revenue: 856, expenses: 324 }
                      ]}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorExpenses)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Phân bổ chi phí</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Marketing', value: 145, color: '#ff0086' },
                          { name: 'Hoa hồng KOC', value: 98, color: '#8b5cf6' },
                          { name: 'Vận hành', value: 52, color: '#3b82f6' },
                          { name: 'Khác', value: 29, color: '#6b7280' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {[
                          { name: 'Marketing', value: 145, color: '#ff0086' },
                          { name: 'Hoa hồng KOC', value: 98, color: '#8b5cf6' },
                          { name: 'Vận hành', value: 52, color: '#3b82f6' },
                          { name: 'Khác', value: 29, color: '#6b7280' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { name: 'Marketing', value: '145M', color: 'bg-[#ff0086]', percent: '45%' },
                    { name: 'Hoa hồng KOC', value: '98M', color: 'bg-purple-500', percent: '30%' },
                    { name: 'Vận hành', value: '52M', color: 'bg-blue-500', percent: '16%' },
                    { name: 'Khác', value: '29M', color: 'bg-gray-500', percent: '9%' }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{item.value}</span>
                        <span className="text-gray-500">{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Giao dịch gần đây</h3>
                <Button variant="ghost" size="sm" className="text-[#ff0086]" data-testid="button-view-all">
                  Xem tất cả
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-transactions">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Ngày</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Mô tả</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Loại</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Số tiền</th>
                      <th className="text-left py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
                      <th className="text-right py-3 px-6 text-xs font-semibold text-gray-700 uppercase">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        id: 1,
                        date: '28/09/2025',
                        description: 'Hoa hồng chiến dịch #CH-2025-089',
                        detail: 'KOC: Sam Official',
                        type: 'income',
                        typeText: 'Thu nhập',
                        amount: '+45,800,000',
                        status: 'completed',
                        statusText: 'Đã thanh toán'
                      },
                      {
                        id: 2,
                        date: '27/09/2025',
                        description: 'Chi phí quảng cáo TikTok',
                        detail: 'Chiến dịch: Beauty Fall 2025',
                        type: 'expense',
                        typeText: 'Chi phí',
                        amount: '-12,500,000',
                        status: 'completed',
                        statusText: 'Đã thanh toán'
                      },
                      {
                        id: 3,
                        date: '25/09/2025',
                        description: 'Thanh toán affiliate tháng 8',
                        detail: '256 đơn hàng thành công',
                        type: 'income',
                        typeText: 'Thu nhập',
                        amount: '+89,200,000',
                        status: 'processing',
                        statusText: 'Đang xử lý'
                      },
                      {
                        id: 4,
                        date: '24/09/2025',
                        description: 'Phí dịch vụ nền tảng',
                        detail: 'Tháng 9/2025',
                        type: 'expense',
                        typeText: 'Chi phí',
                        amount: '-8,900,000',
                        status: 'completed',
                        statusText: 'Đã thanh toán'
                      },
                      {
                        id: 5,
                        date: '22/09/2025',
                        description: 'Hợp đồng thương hiệu L\'Oréal',
                        detail: 'Hợp tác quý 4/2025',
                        type: 'income',
                        typeText: 'Thu nhập',
                        amount: '+156,000,000',
                        status: 'pending',
                        statusText: 'Chờ xác nhận'
                      }
                    ].map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors" data-testid={`row-transaction-${transaction.id}`}>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-900">{transaction.date}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.detail}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {transaction.typeText}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount} VNĐ
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={
                            transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                            transaction.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-orange-100 text-orange-700'
                          }>
                            {transaction.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                            {transaction.status === 'processing' && <Clock className="w-3 h-3 mr-1 inline" />}
                            {transaction.status === 'pending' && <AlertTriangle className="w-3 h-3 mr-1 inline" />}
                            {transaction.statusText}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-view-${transaction.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Hiển thị <span className="font-semibold">1-5</span> trong tổng số <span className="font-semibold">48</span> giao dịch
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
                  <Button variant="outline" size="sm" data-testid="button-next-page">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </IKKAdminLayout>
  )
}
