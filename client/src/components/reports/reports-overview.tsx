"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, ShoppingCart, MousePointer, TrendingUp, Calendar, ArrowUpRight, Eye, Users, Clock } from "lucide-react"
import { Link as WouterLink } from "wouter"

const reportTypes = [
  {
    id: "orders",
    name: "Báo cáo đơn hàng",
    description: "Chi tiết từng đơn hàng, trạng thái duyệt, hoa hồng và lý do từ chối",
    icon: ShoppingCart,
    gradient: "from-blue-500 to-indigo-600",
    href: "/reports/orders",
    stats: { total: "1,247", pending: "89", approved: "1,098", rejected: "60" },
    category: "Đơn hàng & Hoa hồng",
    priority: "high"
  },
  {
    id: "traffic",
    name: "Click & Traffic",
    description: "Phân tích traffic, click chất lượng, browser và thiết bị",
    icon: MousePointer,
    gradient: "from-green-500 to-emerald-600",
    href: "/reports/traffic",
    stats: { clicks: "45,230", quality: "42,180", users: "38,920", cr: "2.76%" },
    category: "Traffic & Analytics",
    priority: "medium"
  },
  {
    id: "campaigns",
    name: "Báo cáo chiến dịch",
    description: "Hiệu suất theo từng chiến dịch: CVR, EPC, approval rate",
    icon: BarChart3,
    gradient: "from-[#ff0086] to-pink-600",
    href: "/reports/campaigns",
    stats: { campaigns: "12", active: "8", avgCvr: "2.31%", avgEpc: "1,850đ" },
    category: "Chiến dịch KOC",
    priority: "high"
  },
  {
    id: "utm",
    name: "Báo cáo UTM",
    description: "Phân tích hiệu suất theo UTM source, medium, campaign, content",
    icon: TrendingUp,
    gradient: "from-orange-500 to-amber-600",
    href: "/reports/utm",
    stats: { sources: "15", mediums: "8", campaigns: "23", bestCvr: "4.2%" },
    category: "UTM & Attribution",
    priority: "low"
  },
]

export default function ReportsOverview() {
  return (
    <div className="space-y-12">
      {/* IKK Style Header Section */}
      <section className="text-center">
        <div className="inline-flex items-center space-x-2 bg-[#ff0086]/10 text-[#ff0086] px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics Dashboard</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Báo cáo & Phân tích <span className="text-[#ff0086]">Chuyên sâu</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Theo dõi hiệu suất chi tiết với các báo cáo real-time và insights sâu sắc. 
          Phân tích toàn diện từ chiến dịch KOC đến traffic và conversion.
        </p>
      </section>

      {/* IKK Style Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#ff0086]/30 p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">+12%</Badge>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
          <p className="text-sm text-gray-600 font-medium">Tổng đơn hàng</p>
          <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#ff0086]/30 p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">+8%</Badge>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">45.2K</div>
          <p className="text-sm text-gray-600 font-medium">Tổng clicks</p>
          <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#ff0086]/30 p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">+0.3%</Badge>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">2.76%</div>
          <p className="text-sm text-gray-600 font-medium">Conversion Rate</p>
          <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#ff0086]/30 p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">+15%</Badge>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">15.4M</div>
          <p className="text-sm text-gray-600 font-medium">Hoa hồng tháng</p>
          <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
        </div>
      </section>

      {/* IKK Style Report Types */}
      <section>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Loại báo cáo chuyên sâu</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Chọn loại báo cáo phù hợp để phân tích dữ liệu chi tiết và đưa ra quyết định kinh doanh thông minh</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {reportTypes.map((report) => {
            const IconComponent = report.icon
            return (
              <WouterLink key={report.id} href={report.href}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#ff0086]/30 hover:-translate-y-1 p-6 group cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${report.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#ff0086] transition-colors">{report.name}</h4>
                          {report.priority === 'high' && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Ưu tiên</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{report.category}</p>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{report.description}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#ff0086] transition-colors" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {report.id === "orders" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-gray-900">{report.stats.total}</div>
                          <div className="text-xs text-gray-600 font-medium">Tổng đơn hàng</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-orange-600">{report.stats.pending}</div>
                          <div className="text-xs text-orange-600 font-medium">Chờ duyệt</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{report.stats.approved}</div>
                          <div className="text-xs text-green-600 font-medium">Đã duyệt</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-red-600">{report.stats.rejected}</div>
                          <div className="text-xs text-red-600 font-medium">Từ chối</div>
                        </div>
                      </>
                    )}

                    {report.id === "traffic" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-gray-900">{report.stats.clicks}</div>
                          <div className="text-xs text-gray-600 font-medium">Total Clicks</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{report.stats.quality}</div>
                          <div className="text-xs text-green-600 font-medium">Click chất lượng</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-600">{report.stats.users}</div>
                          <div className="text-xs text-blue-600 font-medium">Unique Users</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-purple-600">{report.stats.cr}</div>
                          <div className="text-xs text-purple-600 font-medium">Conversion Rate</div>
                        </div>
                      </>
                    )}

                    {report.id === "campaigns" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-gray-900">{report.stats.campaigns}</div>
                          <div className="text-xs text-gray-600 font-medium">Tổng chiến dịch</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{report.stats.active}</div>
                          <div className="text-xs text-green-600 font-medium">Đang chạy</div>
                        </div>
                        <div className="bg-pink-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-[#ff0086]">{report.stats.avgCvr}</div>
                          <div className="text-xs text-[#ff0086] font-medium">CVR Trung bình</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-600">{report.stats.avgEpc}</div>
                          <div className="text-xs text-blue-600 font-medium">EPC Trung bình</div>
                        </div>
                      </>
                    )}

                    {report.id === "utm" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-gray-900">{report.stats.sources}</div>
                          <div className="text-xs text-gray-600 font-medium">UTM Sources</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-orange-600">{report.stats.mediums}</div>
                          <div className="text-xs text-orange-600 font-medium">UTM Mediums</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-purple-600">{report.stats.campaigns}</div>
                          <div className="text-xs text-purple-600 font-medium">UTM Campaigns</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{report.stats.bestCvr}</div>
                          <div className="text-xs text-green-600 font-medium">Best CVR</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg flex items-center justify-center space-x-2">
                    <span>Xem báo cáo chi tiết</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </WouterLink>
            )
          })}
        </div>
      </section>
    </div>
  )
}