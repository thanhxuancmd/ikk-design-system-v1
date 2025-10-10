"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  HiOutlineUsers as HiUsers, 
  HiOutlineArrowTrendingUp as HiArrowTrendingUp, 
  HiOutlineTrophy as HiTrophy, 
  HiOutlineBolt as HiBolt,
  HiOutlineRectangleGroup as HiRectangleGroup,
  HiOutlineCursorArrowRays as HiCursorArrowRays,
  HiOutlineCog6Tooth as HiCog6Tooth,
  HiOutlineQuestionMarkCircle as HiQuestionMarkCircle,
  HiOutlineShieldCheck as HiShieldCheck,
  HiOutlineBuildingOffice2 as HiBuildingOffice2,
  HiOutlineBell as HiBell,
  HiOutlineWallet as HiWallet,
  HiOutlineBookOpen as HiBookOpen,
  HiOutlineEye as HiEye,
  HiOutlineHeart as HiHeart,
  HiOutlineLink as HiLink,
  HiOutlineMegaphone as HiMegaphone,
  HiOutlineCurrencyDollar as HiCurrencyDollar,
  HiOutlineSignal as HiSignal,
  HiOutlineUserPlus as HiUserPlus,
  HiOutlineCheckCircle as HiCheckCircle,
  HiOutlineExclamationTriangle as HiExclamationTriangle,
  HiOutlineShoppingBag as HiShoppingBag,
  HiOutlineServer as HiServer,
  HiOutlineCube as HiCube,
  HiOutlineChartBar as HiChartBar,
  HiOutlineUserCircle as HiUserCircle,
  HiOutlineDocumentText as HiDocumentText,
  HiOutlineArrowPath as HiArrowPath,
  HiOutlineArrowDownTray as HiArrowDownTray
} from "react-icons/hi2"
import { Link, useLocation } from "wouter"
import { useIKKPlatform } from "@/contexts/ikk-platform-context"
import { cn } from "@/lib/utils"
import IKKAdminLayout from "@/components/ikk-admin-layout"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const adminMenuItems = [
  {
    title: "Dashboard Admin",
    href: "/admin",
    icon: HiRectangleGroup,
  },
  {
    title: "Quản lý Chiến dịch",
    href: "/admin/campaigns",
    icon: HiCursorArrowRays,
    submenu: [
      { title: "Thêm chiến dịch", href: "/admin/campaigns/new" },
      { title: "KOC Marketing", href: "/admin/campaigns/koc" },
      { title: "Affiliate hỗ trợ", href: "/admin/campaigns/affiliate" },
      { title: "Phân tích Chiến dịch", href: "/admin/campaigns/analytics" },
      { title: "Quản lý Ngân sách", href: "/admin/campaigns/budget" },
    ],
  },
  {
    title: "Quản lý Thương hiệu",
    href: "/admin/brands",
    icon: HiBuildingOffice2,
    submenu: [
      { title: "Dashboard Thương hiệu", href: "/admin/brands/dashboard" },
      { title: "Quản lý Danh mục", href: "/admin/brands/categories" },
      { title: "Xác minh Thương hiệu", href: "/admin/brands/verification" },
      { title: "Quản lý Hợp đồng", href: "/admin/brands/contracts" },
      { title: "Hiệu suất Thương hiệu", href: "/admin/brands/performance" },
    ],
  },
  {
    title: "Quản lý nội dung",
    href: "/admin/content",
    icon: HiEye,
    submenu: [
      { title: "Hàng đợi Kiểm duyệt", href: "/admin/content/queue" },
      { title: "Kiểm duyệt AI", href: "/admin/content/ai" },
      { title: "Báo cáo Vi phạm", href: "/admin/content/violations" },
      { title: "Hướng dẫn Nội dung", href: "/admin/content/guidelines" },
      { title: "Lịch sử Kiểm duyệt", href: "/admin/content/history" },
    ],
  },
  {
    title: "Quản lý KOC",
    href: "/admin/koc",
    icon: HiUsers,
    submenu: [
      { title: "Dashboard KOC", href: "/admin/koc/dashboard" },
      { title: "Hệ thống Xếp hạng KOC", href: "/admin/koc/ranking" },
      { title: "Theo dõi Hiệu suất", href: "/admin/koc/performance" },
      { title: "Quản lý Cấp bậc", href: "/admin/koc/tiers" },
      { title: "Hệ thống Xác minh", href: "/admin/koc/verification" },
    ],
  },
  {
    title: "Analytics & Báo cáo",
    href: "/admin/analytics",
    icon: HiArrowTrendingUp,
    submenu: [
      { title: "Phân tích Thời gian thực", href: "/admin/analytics/realtime" },
      { title: "Báo cáo Nâng cao", href: "/admin/analytics/reports" },
      { title: "Chỉ số Hiệu suất", href: "/admin/analytics/performance" },
      { title: "Phân tích ROI", href: "/admin/analytics/roi" },
    ],
  },
  {
    title: "Quản lý Tài chính & Thanh toán",
    href: "/admin/financial",
    icon: HiWallet,
    submenu: [
      { title: "Dashboard Tài chính", href: "/admin/financial/dashboard" },
      { title: "Dashboard Thanh toán", href: "/admin/payments/dashboard" },
      { title: "Hệ thống Ví Điểm", href: "/admin/financial/points" },
      { title: "Quản lý Giao dịch", href: "/admin/financial/transactions" },
      { title: "Xử lý Thanh toán", href: "/admin/payments/processing" },
      { title: "Yêu cầu Rút tiền", href: "/admin/payments/withdrawals" },
      { title: "Phương thức Thanh toán", href: "/admin/payments/methods" },
      { title: "Báo cáo Doanh thu", href: "/admin/financial/revenue" },
      { title: "Báo cáo Tài chính", href: "/admin/payments/reports" },
    ],
  },
  {
    title: "Thông báo & Liên lạc",
    href: "/admin/communications",
    icon: HiBell,
    submenu: [
      { title: "Trung tâm Thông báo", href: "/admin/communications/notifications" },
      { title: "Chat Thời gian thực", href: "/admin/communications/chat" },
      { title: "Tin nhắn Quảng bá", href: "/admin/communications/broadcast" },
      { title: "Mẫu Email", href: "/admin/communications/templates" },
    ],
  },
  {
    title: "Quản lý Hệ thống",
    href: "/admin/system",
    icon: HiCog6Tooth,
    submenu: [
      { title: "Tình trạng Hệ thống", href: "/admin/system/health" },
      { title: "Giám sát Hiệu suất", href: "/admin/system/performance" },
      { title: "Quản lý API", href: "/admin/system/api" },
      { title: "Cài đặt Tích hợp", href: "/admin/system/integrations" },
      { title: "Cài đặt Bảo mật", href: "/admin/system/security" },
    ],
  },
  {
    title: "Support & Trợ giúp",
    href: "/admin/support",
    icon: HiQuestionMarkCircle,
    submenu: [
      { title: "Phiếu Hỗ trợ", href: "/admin/support/tickets" },
      { title: "Quản lý FAQ", href: "/admin/support/faq" },
      { title: "Hướng dẫn Người dùng", href: "/admin/support/guides" },
      { title: "Tài liệu Hệ thống", href: "/admin/support/docs" },
    ],
  },
]

function AdminSidebar() {
  const [location] = useLocation()

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <Link href="/home">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
              <HiShieldCheck className="text-white h-4 w-4" />
            </div>
            <span className="font-semibold text-gray-900">Admin Portal</span>
          </div>
        </Link>

        <nav className="space-y-1">
          {adminMenuItems.map((item) => (
            <div key={item.href}>
              <Link href={item.href}>
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
              </Link>

              {item.submenu && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href}>
                      <div
                        className={`block px-3 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md cursor-pointer ${
                          location === subItem.href && "text-[#ff0086] bg-pink-50"
                        }`}
                      >
                        {subItem.title}
                      </div>
                    </Link>
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

function SuperAdminOverview() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl lg:text-3xl font-bold text-gray-900">Super Admin Dashboard</h2>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">Quản trị tổng thể nền tảng IKK Marketing & KOC</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Realtime</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Cập nhật lần cuối:</span>
            <span className="sm:hidden">Cập nhật:</span>
            <span className="font-medium">{new Date().toLocaleString("vi-VN", { 
              hour: '2-digit', 
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit'
            })}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-[#ff0086] to-pink-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Tổng người dùng</CardTitle>
            <HiUsers className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">15.2K</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              +18% tháng này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Tổng KOCs</CardTitle>
            <HiHeart className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">2.8K</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              +12% tuần này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Thương hiệu</CardTitle>
            <HiBuildingOffice2 className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">147</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              +8 mới tháng này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Chiến dịch</CardTitle>
            <HiCursorArrowRays className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">189</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              +15 đang chạy
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Doanh thu</CardTitle>
            <HiTrophy className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">18.7B₫</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              +28% tháng này
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium opacity-90">Hệ thống</CardTitle>
            <HiBolt className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">99.98%</div>
            <p className="text-xs opacity-90 mt-1">
              <HiArrowTrendingUp className="inline h-3 w-3 mr-1" />
              Uptime 30 ngày
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="heading-super-admin">Tổng quan hệ thống</h2>
          <p className="text-gray-600" data-testid="text-super-admin-subtitle">Giám sát và quản lý toàn diện nền tảng</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-refresh-data">
            <span className="flex items-center space-x-2">
              <HiArrowPath className="w-4 h-4" />
              <span>Làm mới</span>
            </span>
          </button>
          <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-export-report">
            <span className="flex items-center space-x-2">
              <HiArrowDownTray className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </span>
          </button>
        </div>
      </div>

      {/* System Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng người dùng</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="stat-total-users">12,458</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <HiArrowTrendingUp className="w-3 h-3" />
                  +342 người dùng mới
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <HiUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Chiến dịch hoạt động</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="stat-active-campaigns">1,247</p>
                <p className="text-xs text-gray-500 mt-1">89 chiến dịch mới</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <HiMegaphone className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Doanh thu tháng này</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="stat-monthly-revenue">8.4B VNĐ</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <HiArrowTrendingUp className="w-3 h-3" />
                  +24.5% so với tháng trước
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <HiCurrencyDollar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tình trạng hệ thống</p>
                <p className="text-2xl font-bold text-green-600" data-testid="stat-system-status">99.8%</p>
                <p className="text-xs text-gray-500 mt-1">Uptime 30 ngày</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <HiSignal className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row - Combined Revenue & User Growth */}
      <div className="grid grid-cols-1 gap-6">
        {/* Combined Performance Chart */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1" data-testid="heading-performance-chart">Hiệu suất tổng quan</h3>
                <p className="text-sm text-gray-500">Doanh thu và tăng trưởng người dùng</p>
              </div>
              <Select>
                <SelectTrigger className="w-32" data-testid="select-performance-period">
                  <SelectValue placeholder="7 ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 ngày</SelectItem>
                  <SelectItem value="30days">30 ngày</SelectItem>
                  <SelectItem value="90days">90 ngày</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={[
                { day: 'T2', revenue: 580, users: 42 },
                { day: 'T3', revenue: 720, users: 58 },
                { day: 'T4', revenue: 650, users: 45 },
                { day: 'T5', revenue: 890, users: 67 },
                { day: 'T6', revenue: 1100, users: 89 },
                { day: 'T7', revenue: 950, users: 72 },
                { day: 'CN', revenue: 780, users: 54 }
              ]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0086" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff0086" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#888" 
                  tick={{ fill: '#666', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#ff0086" 
                  tick={{ fill: '#ff0086', fontSize: 12 }}
                  axisLine={{ stroke: '#ff0086' }}
                  label={{ value: 'Doanh thu (triệu VNĐ)', angle: -90, position: 'insideLeft', fill: '#ff0086' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#6366f1" 
                  tick={{ fill: '#6366f1', fontSize: 12 }}
                  axisLine={{ stroke: '#6366f1' }}
                  label={{ value: 'Người dùng mới', angle: 90, position: 'insideRight', fill: '#6366f1' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => {
                    if (value === 'revenue') return 'Doanh thu (triệu VNĐ)'
                    if (value === 'users') return 'Người dùng mới'
                    return value
                  }}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="users" 
                  fill="url(#colorUsers)" 
                  radius={[8, 8, 0, 0]}
                  name="users"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff0086" 
                  strokeWidth={3}
                  dot={{ fill: '#ff0086', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#ff0086' }}
                  name="revenue"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Feed */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="heading-activity-feed">
              <HiBell className="w-5 h-5 text-[#ff0086]" />
              Hoạt động gần đây
            </h3>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: 'user',
                  message: 'Người dùng mới đăng ký: nguyen.van.a@email.com',
                  time: '2 phút trước',
                  icon: HiUserPlus,
                  color: 'text-blue-600'
                },
                {
                  id: 2,
                  type: 'campaign',
                  message: 'Chiến dịch "Summer Sale 2025" đã được phê duyệt',
                  time: '15 phút trước',
                  icon: HiCheckCircle,
                  color: 'text-green-600'
                },
                {
                  id: 3,
                  type: 'payment',
                  message: 'Thanh toán 45.5M VNĐ từ Brand "L\'Oréal"',
                  time: '32 phút trước',
                  icon: HiCurrencyDollar,
                  color: 'text-green-600'
                },
                {
                  id: 4,
                  type: 'alert',
                  message: 'Cảnh báo: CPU usage cao (85%) trên Server 03',
                  time: '1 giờ trước',
                  icon: HiExclamationTriangle,
                  color: 'text-orange-600'
                },
                {
                  id: 5,
                  type: 'brand',
                  message: 'Thương hiệu "Nike Vietnam" yêu cầu xác thực',
                  time: '2 giờ trước',
                  icon: HiShoppingBag,
                  color: 'text-purple-600'
                }
              ].map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors" data-testid={`activity-${activity.id}`}>
                  <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health Indicators */}
        <Card className="bg-white border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" data-testid="heading-system-health">
              <HiServer className="w-5 h-5 text-[#ff0086]" />
              Tình trạng hệ thống
            </h3>
            <div className="space-y-4">
              {[
                { name: 'API Server', status: 'online', uptime: '99.9%', response: '45ms' },
                { name: 'Database', status: 'online', uptime: '99.8%', response: '12ms' },
                { name: 'CDN', status: 'online', uptime: '100%', response: '8ms' },
                { name: 'Payment Gateway', status: 'online', uptime: '99.7%', response: '120ms' }
              ].map((service, index) => (
                <div key={index} className="space-y-2" data-testid={`service-${index}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${service.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-green-200 border">
                      {service.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 ml-4">
                    <span>Uptime: {service.uptime}</span>
                    <span>Response: {service.response}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium text-gray-900">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="font-medium text-gray-900">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Storage Usage</span>
                    <span className="font-medium text-gray-900">38%</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Metrics */}
      <Card className="bg-white border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-platform-metrics">
            <HiChartBar className="w-5 h-5 text-[#ff0086]" />
            Chỉ số nền tảng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">KOC hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-active-koc">3,456</p>
                </div>
                <HiUserCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thương hiệu đối tác</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-partner-brands">142</p>
                </div>
                <HiShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Giao dịch thành công</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-transactions">28,945</p>
                </div>
                <HiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sản phẩm trên nền tảng</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-products">156,789</p>
                </div>
                <HiCube className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng lượt xem</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-views">45.2M</p>
                </div>
                <HiEye className="w-8 h-8 text-pink-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tỷ lệ chuyển đổi</p>
                  <p className="text-2xl font-bold text-gray-900" data-testid="metric-conversion">12.8%</p>
                </div>
                <HiChartBar className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card className="bg-white border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2" data-testid="heading-admin-actions">
            <HiCog6Tooth className="w-5 h-5 text-[#ff0086]" />
            Thao tác quản trị
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-manage-users">
                <HiUsers className="w-6 h-6 text-blue-600" />
                <span>Quản lý người dùng</span>
              </Button>
            </Link>
            <Link href="/admin/campaigns">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-manage-campaigns">
                <HiMegaphone className="w-6 h-6 text-purple-600" />
                <span>Quản lý chiến dịch</span>
              </Button>
            </Link>
            <Link href="/admin/financial">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-financial-reports">
                <HiDocumentText className="w-6 h-6 text-green-600" />
                <span>Báo cáo tài chính</span>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2" data-testid="button-system-settings">
                <HiCog6Tooth className="w-6 h-6 text-gray-600" />
                <span>Cài đặt hệ thống</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SuperAdminMonitoring() {
  const topPerformingContent = [
    { title: "Review son môi Maybelline SuperStay", views: "156K", engagement: "12.3K", koc: "@beauty_minh" },
    { title: "Unboxing skincare Innisfree", views: "89K", engagement: "8.7K", koc: "@skincare_lover" },
    { title: "Tutorial makeup với NARS", views: "67K", engagement: "5.4K", koc: "@makeup_pro" },
  ]

  return (
    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HiArrowTrendingUp className="h-5 w-5 text-gray-700" />
          Content Hiệu suất Cao
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformingContent.map((content, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-sm mb-2">{content.title}</div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{content.views} views</span>
                <span>{content.engagement} engagement</span>
              </div>
              <div className="text-xs mt-1" style={{ color: "#ff0086" }}>{content.koc}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminPage() {
  const { campaigns } = useIKKPlatform()

  return (
    <IKKAdminLayout>
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <SuperAdminOverview />
        <SuperAdminDashboard />
        <SuperAdminMonitoring />
      </div>
    </IKKAdminLayout>
  )
}
